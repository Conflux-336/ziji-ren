import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'assets', 'irasutoya');
const run = promisify(execFile);

const G = 'https://blogger.googleusercontent.com/img/b';
const PAGES = {
  man: 'https://www.irasutoya.com/2015/10/blog-post_59.html',
  woman: 'https://www.irasutoya.com/2015/10/blog-post_29.html',
  hr: 'https://www.irasutoya.com/2018/10/blog-post_287.html',
  gift: 'https://www.irasutoya.com/2019/05/blog-post_0.html',
  carton: 'https://www.irasutoya.com/2017/12/blog-post_626.html',
  calendar: 'https://www.irasutoya.com/2020/12/blog-post_799.html',
  hanko: 'https://www.irasutoya.com/2014/01/blog-post_7163.html',
  cherry: 'https://www.irasutoya.com/2012/11/blog-post_6.html',
};

const ASSETS = [
  ['p01', '会社員（男性）01', PAGES.man, `${G}/R29vZ2xl/AVvXsEhT3bCfYbCLsr8Wmynowd5God6hK0ZgpKA0NWq2zTb0Cvp4vPap16iCa3h-8LYCPCdeZm4huFg_6MyeOw1atT6YtDoaAzwx7OOxmfbXjJV7TFDqk6_bZHFa_AmUzJnXIYWwq_xbhFTYAy0/s1600/icon_business_man01.png`],
  ['p02', '会社員（男性）06', PAGES.man, `${G}/R29vZ2xl/AVvXsEgihk4O8sN3g8jx55g1SQqu6ZJm7SXuAh56-bC0yhG2aRAEbfQFykisP8-_hkiahTFj7NW6P3FsrTIx7NCp33SPcifmfg-2NZAkDZ_P48uteOGUXRBqYCSzdQ0YSBQ-5305NEYg2cNXC3I/s1600/icon_business_man06.png`],
  ['p03', '会社員（男性）09', PAGES.man, `${G}/R29vZ2xl/AVvXsEiGVUV9Q5nBg-TUVA9KXk5n2W4p-Mv3C952z1Q39Hr_iJa98Bd7ZlrPMvUG4kQp8jwrPD3H91awbqoC8u2dmTY8dkS_NOuHLBE5oDrDkmiw1Zuwao2rO7rwiFbwDKg3TazqbsrXcM1CVfI/s1600/icon_business_man09.png`],
  ['p04', '会社員（男性）12', PAGES.man, `${G}/R29vZ2xl/AVvXsEieb4aP0qvt-O3bcNvmJsfGnifkfNVrvuZ-bKPUhzF4B9N4fmi1jZZXmt1KCxdl4_MJ0JxNglllhpfUAV4u9myNmSSpq2FkW2zoDWGcWcMMMQS_m7UJI0f3KrPSPN_oqagHuFufsTnZvWM/s1600/icon_business_man12.png`],
  ['p05', '会社員（男性）15', PAGES.man, `${G}/R29vZ2xl/AVvXsEhvJ0hFx6OmEDqjydjDKYr8HQMbiGBewqTjJH-FRrIpZ1Xb3mFxGqko6jcbHqBCOZ0BkvUAc6IGo1aMfjCQTclZmknYxe3r9pSQSTspmfppMEadgwyuLDsOj3mhQRCgVIRCGcER0uE-4sU/s1600/icon_business_man15.png`],
  ['p06', '会社員（女性）01', PAGES.woman, `${G}/R29vZ2xl/AVvXsEg3nSkij_LFMlJXuJhdVCnVBHcnpfQZhKEc_IyBMzf5KVNS2d-xYbWTO0GgwqK3zay8hyphenhyphen3HKUp1XtYvtrY0EPQuNsm9NA9NcU7We4U0JRfxtfB1gpADXL0Os1wgbGmKiiAvCXXBEgB6OdA/s1600/icon_business_woman01.png`],
  ['p07', '会社員（女性）04', PAGES.woman, `${G}/R29vZ2xl/AVvXsEgWmX7QY-HZMc2pj01KPxjvVQydjsGm0OCRRlDXWZDysJi71ixlv9mgJHbSIPVsMXhuE9SEemrO5EMke340xbgufZfx9j6t3f0KV3pH5d9mK7ZmO-8_3xNgA_3i38bPIQJBTPQMciJGHcg/s1600/icon_business_woman04.png`],
  ['p08', '会社員（女性）07', PAGES.woman, `${G}/R29vZ2xl/AVvXsEgHnz3TQbNpLPkKcdzo6KKEyKVABXlkJEFTZQsggic6P2ibdKKQhAuRFEDskUyNop7Hy2ngQrFwovk2NAdY-G9FzE5_aLYJBDY3wKhT2_t5VPnTj1cF1izEEw26oVPr__QOhCOYUxHzges/s1600/icon_business_woman07.png`],
  ['p09', '会社員（女性）12', PAGES.woman, `${G}/R29vZ2xl/AVvXsEiYWbdQhyHMqiPP2tkHj_1omhGwejH9RJC4V1Uegp4CxMm2TGcwk_V_PaLxRXtQ3UzalwxU0I_VjdR5cIww1vrEwJ-ooU9HkQeUwQ-DRFJw8_79T3Ou5iE86BljUxbQJDj7UhS5D1R0kbc/s1600/icon_business_woman12.png`],
  ['p10', '会社員（女性）14', PAGES.woman, `${G}/R29vZ2xl/AVvXsEgA4Es8MWGq99hdcgSN4b1M5btvPTlgBdPZlANNNr2iChGyMfD2lucYftryO1815QtJ0c-3Iing9i0I6iOLsWyHMxCrLMHnBX3SIlDhLjJCr4XHxsaFuJjuOoSv3IyU0MmCW3Aq2S0NPTQ/s1600/icon_business_woman14.png`],
  ['hr01', '上司と部下（注意）', PAGES.hr, `${G}/R29vZ2xl/AVvXsEgjkf0K2OcHLWwnTvtVhZmHt-rSX45nhwQMYhD8BwbC9m_4Zj2_BY2gTGTaABAhGfPZe6FXd-Z1QSeA2L6ygUHPE9jF0VKM9tEUwfuIA2nz9cVY5uAw7wAtdW9yrnqbHPf8j83qo0L8rrus/s1600/joushi_buka_women1_shikaru.png`],
  ['hr02', '上司と部下（激怒）', PAGES.hr, `${G}/R29vZ2xl/AVvXsEj4SJlQgh4LwnzqP1xxmiwmrvrKZzueSHacOMsNh7gQNhHF7CQ-MMbMZyFMnT_RhLzY7VNvl2-0HeUcsNx-k2qPQfHp44MegR0PSRGSdHFcz9ERDAHeX1Se6zcFrck8O3QZjgw9sVV50uJi/s1600/joushi_buka_women3_gekido.png`],
  ['gift', '掛け紙付きの贈り物', 'https://www.irasutoya.com/2019/06/blog-post_104.html', `${G}/R29vZ2xl/AVvXsEj6oL4dfcy6HSA4KWPxqYOkrwKWpFFzvpKE0btPAJxU7hU8o-J01zDZphy0Rz8q8kBCr7bV85ArqKraRV81ajx0kZLp56jaPAMj1EP6Gy_GYYhOT6xElZcQqpMWuNwignhyphenhyphenGFVdoefgg2Ia/s1600/okurimono_kakegami.png`],
  ['carton', '段ボール箱（開）', PAGES.carton, `${G}/R29vZ2xl/AVvXsEjn56xFADmTvfXmLbr8DgFLLsyKlhSIoKPc3rMNFQcFr5hrxVWKOFltWJlxCSwYkpkD9-0vHhEyoRtelOztWAASX1_v6RfZm1U1fuK5KQCqNXYIl4kayPjGmctem6F95zAbyrTSYzGo4WY/s1600/box_danbo-ru_open.png`],
  ['calendar', 'カレンダー（予定なし）', PAGES.calendar, `${G}/R29vZ2xl/AVvXsEgeCvHe4DqYS4xrc9oaSLYmgeYQ_EcCMcKKCq-JQ94N8VpYXJq_qaN9SgWjXNCJWuWlXZocJ3YMgnhHByVv3RSzGWkU3YYKkofQo76O1ink3F_PlBtQVFgvU-x5Bo5pdUuJLNSD-TKzWfTp/s1600/calender_schedule_empty.png`],
  ['hanko', '朱肉（印泥）', PAGES.hanko, `${G}/R29vZ2xl/AVvXsEi1L1Z7o2GFvZPYRWB_miLKQvyOX66NjKOL3UMqqqgrY7Xn3rAGchxfrF7D7ScxzeI56zw-QpBgAir-WwT-9MyZ6rMPcNF_5nnG7ztK8emJBqFzZI5LinxqjWJQ_iUkDbeJETr5mXNiBuUa/s1600/hanko_syuniku.png`],
  ['cherry', 'さくらんぼ', PAGES.cherry, `${G}/R29vZ2xl/AVvXsEjPnJeVFfDEUh7NowLv4_yT57_VnhQvM4zECVxWdcslhuUoGjV2GGJSBisrIe6OTlj0kL0zxERIamJ0Gi0LI07xeELfWzSz_IVT-wWVrvlJT8LYbouFGoaQRoYG4hstUmPxYn5cE0eM6-F4/s1600/fruit_cherry.png`],
];

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

async function download(url, file) {
  try {
    const existing = await readFile(file);
    if (existing.subarray(0, 8).toString('hex') === '89504e470d0a1a0a') return existing;
  } catch {}
  const { stdout } = await run('curl', ['-fsL', '--retry', '3', '--retry-delay', '2', '--retry-all-errors', '--max-time', '45', '-A', UA, '-e', 'https://www.irasutoya.com/', url], {
    encoding: 'buffer',
    maxBuffer: 32 * 1024 * 1024,
  });
  const buf = Buffer.from(stdout);
  if (buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error(`${file}: not a PNG (${buf.length} bytes)`);
  await writeFile(file, buf);
  return buf;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  if (ASSETS.length > 20) throw new Error(`asset cap exceeded: ${ASSETS.length}`);
  const manifest = [];
  for (const [id, title, page, url] of ASSETS) {
    const buf = await download(url, path.join(OUT, `${id}.png`));
    const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
    manifest.push({ id, file: `${id}.png`, title, page, image: url, width: w, height: h, bytes: buf.length });
    console.log(`${id.padEnd(9)} ${String(w).padStart(4)}x${String(h).padEnd(4)} ${(buf.length / 1024).toFixed(0)}KB  ${title}`);
    await new Promise(r => setTimeout(r, 500));
  }
  await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    license: 'いらすとや 利用規約: free for personal/commercial use, no attribution required, paid license needed for 21+ distinct assets per work',
    count: manifest.length,
    assets: manifest,
  }, null, 2) + '\n');
  console.log(`done: ${manifest.length} assets`);
}

main().catch(err => { console.error(err); process.exit(1); });
