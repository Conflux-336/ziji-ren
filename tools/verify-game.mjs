import { writeFile } from 'node:fs/promises';

const BASE = 'http://localhost:8137/';
const target = await (await fetch('http://localhost:9222/json/new?' + encodeURIComponent(BASE), { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let seq = 0;
const pending = new Map();
const waiters = new Map();
const requests = [];
const consoleIssues = [];
ws.onmessage = event => {
  const msg = JSON.parse(event.data);
  if (msg.id) {
    const item = pending.get(msg.id);
    if (!item) return;
    pending.delete(msg.id);
    if (msg.error) item.reject(new Error(JSON.stringify(msg.error)));
    else item.resolve(msg.result);
    return;
  }
  if (msg.method === 'Network.requestWillBeSent') requests.push(msg.params.request.url);
  if (msg.method === 'Runtime.exceptionThrown') consoleIssues.push(msg.params.exceptionDetails.text);
  if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) {
    consoleIssues.push(msg.params.args.map(arg => arg.value || arg.description || '').join(' '));
  }
  const list = waiters.get(msg.method);
  if (list) {
    waiters.delete(msg.method);
    list.forEach(resolve => resolve(msg.params));
  }
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
function event(name) {
  return new Promise(resolve => {
    const list = waiters.get(name) || [];
    list.push(resolve);
    waiters.set(name, list);
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function navigate() {
  const loaded = event('Page.loadEventFired');
  await send('Page.navigate', { url: BASE });
  await loaded;
  await sleep(600);
}
async function shot(path) {
  await evaluate(`(()=>{const s=document.createElement('style');s.id='testNoMotion';s.textContent='*{transition:none!important;animation:none!important}';document.head.appendChild(s)})()`);
  await sleep(80);
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(path, Buffer.from(result.data, 'base64'));
  await evaluate(`document.getElementById('testNoMotion')?.remove()`);
}
async function viewport(width, height, mobile) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
}
const report = {};
try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await viewport(1440, 900, false);
  await navigate();

  report.title = await evaluate(`({rules:document.querySelectorAll('#title .rItem').length,art:[...document.querySelectorAll('.tScene img')].every(img=>img.complete&&img.naturalWidth>0),nonCommercial:document.querySelector('.ossBadge').textContent.includes('无盈利')})`);
  await shot('/tmp/zj-desktop-title-v2.png');

  report.sheet = await evaluate(`(()=>{
    __ZJ.sheet();
    return [...document.querySelectorAll('#sheet .mc')].map(el=>({
      cls:el.className,
      brand:el.querySelector('.bt b').textContent,
      entity:el.querySelector('.contract b').textContent,
      portrait:el.querySelector('img.pv').getAttribute('src'),
      labels:el.querySelectorAll('.tag,.sticker').length,
      caption:el.querySelector('.nameStrip i').textContent
    }));
  })()`);
  await shot('/tmp/zj-sheet-partner.png');
  await evaluate(`document.getElementById('sheet')?.remove()`);

  report.distribution = await evaluate(`(()=>{
    __ZJ.showTitle();__ZJ.begin({drill:false});
    const counts={},skins={},partnerPortraits=new Set(),ordinaryPortraits=new Set();
    for(let i=0;i<2000;i++){
      const type=__ZJ.demo();
      const el=document.querySelector('#stage .mc:not(.back)');
      counts[type]=(counts[type]||0)+1;
      (skins[type]||(skins[type]=new Set())).add([...el.classList].find(x=>/^t-/.test(x)));
      const src=el.querySelector('img.pv').getAttribute('src');
      (type==='pt'?partnerPortraits:ordinaryPortraits).add(src.split('/').pop());
    }
    return {counts,skins:Object.fromEntries(Object.entries(skins).map(([k,v])=>[k,[...v].sort()])),partnerPortraits:[...partnerPortraits].sort(),ordinaryPortraits:[...ordinaryPortraits].sort()};
  })()`);

  report.rules = await evaluate(`(()=>{
    const cases=[['ft',-1,true],['intern',-1,true],['pt',-1,true],['ins',1,true],['out',1,true],['sp',1,true],['pt',1,false],['out',-1,false]];
    return cases.map(([type,dir,expected])=>{
      __ZJ.showTitle();__ZJ.begin({drill:false});__ZJ.demo(type);__ZJ.commit(dir);
      return {type,dir,expected,score:Number(document.getElementById('cnt').textContent),toast:document.getElementById('toast').textContent};
    });
  })()`);

  await evaluate(`__ZJ.showTitle();__ZJ.begin({drill:false});for(let i=0;i<25;i++){__ZJ.demo('ft');__ZJ.commit(-1)}`);
  await sleep(700);
  report.unlimited = await evaluate(`({score:Number(document.getElementById('cnt').textContent),gifts:document.querySelectorAll('#giftStack .gift').length,animating:document.querySelectorAll('#giftStack .gift.gone').length,hidden:[...document.querySelectorAll('#giftStack .gift')].filter(el=>getComputedStyle(el).visibility==='hidden'||getComputedStyle(el).opacity==='0').length})`);

  report.penaltyBefore = await evaluate(`(()=>{__ZJ.showTitle();__ZJ.begin({drill:false});__ZJ.demo('pt');__ZJ.commit(1);const wrong=Number(document.getElementById('cnt').textContent);__ZJ.demo('ft');__ZJ.commit(-1);return {wrong,during:Number(document.getElementById('cnt').textContent),toast:document.getElementById('toast').textContent,countdownVisible:!document.getElementById('penalty').hidden,seconds:document.getElementById('penaltyNum').textContent}})()`);
  await shot('/tmp/zj-penalty-countdown.png');
  await sleep(4300);
  report.penaltyAfter = await evaluate(`(()=>{const countdownHidden=document.getElementById('penalty').hidden;__ZJ.demo('ft');__ZJ.commit(-1);return {score:Number(document.getElementById('cnt').textContent),countdownHidden}})()`);

  await navigate();
  await evaluate(`localStorage.clear();__ZJ.showTitle();__ZJ.begin({drill:true})`);
  report.drill = [];
  for (const dir of [-1, -1, -1, 1, 1, 1]) {
    report.drill.push(await evaluate(`({tip:document.getElementById('tip').textContent,entity:document.querySelector('#stage .mc:not(.back) .contract b').textContent})`));
    await evaluate(`__ZJ.commit(${dir})`);
    await sleep(430);
  }
  report.drillScore = await evaluate(`Number(document.getElementById('cnt').textContent)`);

  await evaluate(`__ZJ.finish()`);
  await sleep(2800);
  report.result = await evaluate(`({visible:!document.getElementById('result').hidden,score:document.querySelector('#result .resScore')?.textContent,best:localStorage.getItem('zj_best')})`);
  await shot('/tmp/zj-result-partner.png');
  await evaluate(`document.getElementById('resRank').click()`);
  report.rank = await evaluate(`({visible:!document.getElementById('rank').hidden,rows:document.querySelectorAll('#rankBody table.rank tr').length,local:document.querySelectorAll('#rankBody tr.me').length,demo:document.querySelector('#rank .demoTag').textContent})`);
  await shot('/tmp/zj-rank-partner.png');
  await evaluate(`document.getElementById('rankBack').click()`);
  report.rankBack = await evaluate(`!document.getElementById('result').hidden`);

  await evaluate(`__ZJ.showTitle();__ZJ.begin({drill:false});__ZJ.demo('pt')`);
  await sleep(350);
  await shot('/tmp/zj-desktop-partner.png');
  report.desktop = await evaluate(`({vw:innerWidth,vh:innerHeight,card:document.querySelector('#stage .mc:not(.back)').getBoundingClientRect().toJSON(),partner:document.querySelector('#stage .mc:not(.back)').classList.contains('partner'),persistentHints:document.querySelectorAll('#sides,.hint,.hrBubble').length})`);

  await evaluate(`(async()=>{await __ZJ.openPoster()})()`);
  await sleep(250);
  report.poster = await evaluate(`({visible:!document.getElementById('poster').hidden,pixels:document.getElementById('pcv').toDataURL().length,credit:(()=>{const c=document.getElementById('pcv');return c.width===1080&&c.height===1440})()})`);
  await shot('/tmp/zj-poster-partner.png');

  await evaluate(`__ZJ.showTitle();__ZJ.startZen()`);
  await sleep(200);
  report.zen = await evaluate(`({visible:!document.getElementById('zenFx').hidden,playing:document.getElementById('zenFx').classList.contains('play')})`);

  await viewport(390, 844, true);
  await navigate();
  await shot('/tmp/zj-mobile-title-partner.png');
  await evaluate(`__ZJ.begin({drill:false});__ZJ.demo('pt')`);
  await sleep(350);
  await shot('/tmp/zj-mobile-partner.png');
  report.mobile = await evaluate(`({vw:innerWidth,vh:innerHeight,portrait:document.body.classList.contains('portrait'),card:document.querySelector('#stage .mc:not(.back)').getBoundingClientRect().toJSON(),hud:document.getElementById('bar').getBoundingClientRect().toJSON(),partner:document.querySelector('#stage .mc:not(.back)').classList.contains('partner')})`);
  await evaluate(`__ZJ.commit(1)`);
  await sleep(100);
  report.mobilePenalty = await evaluate(`({visible:!document.getElementById('penalty').hidden,seconds:document.getElementById('penaltyNum').textContent,box:document.getElementById('penalty').getBoundingClientRect().toJSON()})`);
  await shot('/tmp/zj-mobile-penalty.png');

  report.externalRequests = [...new Set(requests.filter(url => /^https?:/.test(url) && !url.startsWith(BASE) && !url.startsWith('http://localhost:8137')))];
  report.consoleIssues = consoleIssues;
  console.log(JSON.stringify(report, null, 2));
} finally {
  ws.close();
  await fetch('http://localhost:9222/json/close/' + target.id);
}
