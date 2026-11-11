/* 三语（zh/en/ja）专项回归：字典结构 + 运行时切换 + 持久化 + 截图。
 * 前置：http://localhost:8137/ 与 CDP 9222 已启动。 */
import { writeFile, readFile } from 'node:fs/promises';
import vm from 'node:vm';

/* ---------- 1. 字典结构完整性（node 侧） ---------- */
const code = await readFile(new URL('../i18n.js', import.meta.url), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const I18N = sandbox.window.I18N;

function leafPaths(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) out.push(...leafPaths(v, p));
    else out.push(p);
  }
  return out;
}
const basePaths = leafPaths(I18N.zh);
const structErrors = [];
for (const l of ['en', 'ja']) {
  const have = new Set(leafPaths(I18N[l]));
  for (const p of basePaths) if (!have.has(p)) structErrors.push(`${l} missing ${p}`);
  // 数组长度一致（names/roles/titles/drill/bots）
  for (const p of basePaths) {
    const zv = p.split('.').reduce((o, k) => o[k], I18N.zh);
    const lv = p.split('.').reduce((o, k) => o[k], I18N[l]);
    if (Array.isArray(zv) && zv.length !== lv.length) structErrors.push(`${l} ${p} length ${lv.length} != ${zv.length}`);
  }
}
console.log('dict paths:', basePaths.length, '| structure errors:', structErrors.length);

/* ---------- CDP 封装 ---------- */
const BASE = 'http://localhost:8137/';
const target = await (await fetch('http://localhost:9222/json/new?' + encodeURIComponent(BASE), { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let seq = 0;
const pending = new Map();
const waiters = new Map();
const issues = [];
ws.onmessage = e => {
  const msg = JSON.parse(e.data);
  if (msg.id) {
    const it = pending.get(msg.id); if (!it) return; pending.delete(msg.id);
    if (msg.error) it.reject(new Error(JSON.stringify(msg.error))); else it.resolve(msg.result);
    return;
  }
  if (msg.method === 'Runtime.exceptionThrown') issues.push(msg.params.exceptionDetails.text);
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
    issues.push(msg.params.args.map(a => a.value || a.description || '').join(' '));
  }
  const list = waiters.get(msg.method);
  if (list) { waiters.delete(msg.method); list.forEach(r => r()); }
};
const send = (method, params = {}) => new Promise((res, rej) => {
  const id = ++seq; pending.set(id, { resolve: res, reject: rej });
  ws.send(JSON.stringify({ id, method, params }));
});
const ev = name => new Promise(r => {
  const list = waiters.get(name) || []; list.push(r); waiters.set(name, list);
});
async function evx(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function nav() {
  const loaded = ev('Page.loadEventFired');
  await send('Page.navigate', { url: BASE });
  await loaded; await sleep(500);
}
async function shot(path) {
  await evx(`(()=>{let s=document.getElementById('nm');if(!s){s=document.createElement('style');s.id='nm';s.textContent='*{transition:none!important;animation:none!important}';document.head.appendChild(s);}})()`);
  await sleep(60);
  const r = await send('Page.captureScreenshot', { format: 'png' });
  await writeFile(path, Buffer.from(r.data, 'base64'));
}
const vp = (w, h, m) => send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: m });

const report = { structErrors, issues };
try {
  await send('Page.enable'); await send('Runtime.enable');
  await vp(1440, 900, false);
  await nav();
  await evx('localStorage.clear()'); await nav();

  /* 2. 三语标题页静态文本 */
  report.title = {};
  for (const l of ['zh', 'en', 'ja']) {
    await evx(`__ZJ.setLang('${l}')`);
    report.title[l] = await evx(`({
      lang:document.documentElement.lang,
      title:document.title,
      h1:document.querySelector('h1').textContent,
      sub:document.querySelector('.sub').textContent,
      lede:document.querySelector('.lede').textContent,
      rules:[...document.querySelectorAll('.rItem b')].map(x=>x.textContent),
      stamp:document.querySelector('.tRuleStamp').textContent,
      start:document.getElementById('startBtn').textContent
    })`);
    await shot(`/tmp/zj-i18n-title-${l}.png`);
  }

  /* 3. 英文界面不得出现汉字（DOM 可见文本） */
  await evx(`__ZJ.setLang('en')`);
  report.cjkInEnglish = await evx(`(function(){
    const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const hits=new Set();let n;
    while(n=walk.nextNode()){
      const p=n.parentElement;
      if(!p||p.closest('script,style'))continue;
      let el=p,visible=true;
      while(el){if(el.hidden||getComputedStyle(el).display==='none'||getComputedStyle(el).visibility==='hidden'){visible=false;break;}el=el.parentElement;}
      if(visible&&/[\\u4e00-\\u9fff]/.test(n.textContent)&&n.textContent.trim())hits.add(n.textContent.trim());
    }
    return [...hits];
  })()`);

  /* 4. 游戏中切换：同 seed 重建，工牌文本跟随语言 */
  await evx(`__ZJ.setLang('zh');__ZJ.showTitle();__ZJ.begin({drill:false});__ZJ.demo('ft')`);
  const before = await evx(`({seed:__ZJ.G.cur.data.seed,entity:__ZJ.G.cur.data.entity,name:__ZJ.G.cur.data.name})`);
  await evx(`__ZJ.setLang('en')`);
  report.inGame = { before, after: await evx(`({
    seed:__ZJ.G.cur.data.seed, entity:__ZJ.G.cur.data.entity, name:__ZJ.G.cur.data.name,
    staffTag:document.querySelector('.nameStrip i').textContent,
    entityLabel:document.querySelector('.contract span').textContent,
    cards:document.querySelectorAll('#stage .mc:not(.back)').length
  })`) };
  await shot('/tmp/zj-i18n-ingame-en.png');
  await evx(`__ZJ.setLang('ja')`);
  report.inGame.ja = await evx(`({seed:__ZJ.G.cur.data.seed,entity:__ZJ.G.cur.data.entity,staffTag:document.querySelector('.nameStrip i').textContent})`);
  await shot('/tmp/zj-i18n-ingame-ja.png');

  /* 5. 结算页切换 */
  await evx(`__ZJ.setLang('en');__ZJ.setTime(0);__ZJ.finish()`);
  await sleep(2600);
  report.result = await evx(`({visible:!document.getElementById('result').hidden,kicker:document.querySelector('.resKicker').textContent,unit:document.querySelector('.resScore small').textContent,btns:[...document.querySelectorAll('.resBtns button')].map(b=>b.textContent)})`);
  await evx(`__ZJ.setLang('ja')`);
  report.result.ja = await evx(`({kicker:document.querySelector('.resKicker').textContent,title:document.querySelector('.resTitle').textContent})`);
  await shot('/tmp/zj-i18n-result-ja.png');

  /* 6. 榜单切换 */
  await evx(`document.getElementById('resRank').click();__ZJ.setLang('en')`);
  report.rank = await evx(`({visible:!document.getElementById('rank').hidden,tabs:[...document.querySelectorAll('.tabs button')].map(b=>b.textContent),rows:document.querySelectorAll('#rankBody table tr').length,zenRow:document.querySelector('.zenRow').textContent})`);
  await shot('/tmp/zj-i18n-rank-en.png');

  /* 7. 海报三语重绘 */
  report.poster = {};
  for (const l of ['zh', 'en', 'ja']) {
    await evx(`(async()=>{await __ZJ.openPoster();__ZJ.setLang('${l}')})()`);
    await sleep(150);
    report.poster[l] = await evx(`({len:document.getElementById('pcv').toDataURL().length})`);
    await shot(`/tmp/zj-i18n-poster-${l}.png`);
  }

  /* 8. 持久化：reload 后保持日语 */
  await evx(`__ZJ.setLang('ja')`);
  await nav();
  report.persistence = await evx(`({stored:localStorage.getItem('zj_lang'),h1:document.querySelector('h1').textContent,htmlLang:document.documentElement.lang})`);

  /* 9. 移动端竖屏标题三语 */
  await vp(390, 844, true);
  await nav();
  for (const l of ['zh', 'en', 'ja']) {
    await evx(`__ZJ.setLang('${l}')`);
    await shot(`/tmp/zj-i18n-mobile-${l}.png`);
  }
  report.mobile = await evx(`({h1:document.querySelector('h1').textContent,langBtn:!!document.getElementById('langBtn')})`);

  console.log(JSON.stringify(report, null, 2));
  const fail = structErrors.length || issues.length || (report.cjkInEnglish || []).length;
  console.log(fail ? '\nI18N CHECK FAILED' : '\nI18N CHECK PASSED');
} finally {
  ws.close();
  await fetch('http://localhost:9222/json/close/' + target.id);
}
