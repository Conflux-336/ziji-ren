import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const WORKSPACE = path.resolve(ROOT, '..');
const CURRENT_OUT = path.join(ROOT, 'assets', 'irasutoya');
const NEXT_OUT = path.join(WORKSPACE, 'next-work-assets', 'irasutoya');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const BOY_PAGE = 'https://www.irasutoya.com/2018/03/blog-post_5.html';
const GIRL_PAGE = 'https://www.irasutoya.com/2018/03/blog-post_58.html';
const G = 'https://blogger.googleusercontent.com/img/b';

const BOYS = [
  ['color1_white', '白い髪の男の子', `${G}/R29vZ2xl/AVvXsEjyVsSDYpi718tLbhyphenhyphenq4eiGPCwLHh-KPAtxKuTtxV6zcGwvQ7iOJ0K8BMnQJLMBe_0mRNjbA2TWXs7jO8JzdN-mJ85eiwqCuGm-lm96qDrFxMXMIIJy_X7kkRxRUcmsQR_gBPUbJXRJ1G8/s400/character_boy_color1_white.png`],
  ['color2_red', '赤い髪の男の子', `${G}/R29vZ2xl/AVvXsEjfnbN1kgCgSM-ng9BZCV59DDUAgobQMgaC2x_vEBm8YkrSzjjzqbLGpSOp9gF5Wvpo5FLxDvrlK78NJV3B62NXYywiryV9rFyPavU4e42ouLSoCI1sNo-MchZZzlYG-jI4EixdPEGDi8I/s400/character_boy_color2_red.png`],
  ['color3_orange', 'オレンジの髪の男の子', `${G}/R29vZ2xl/AVvXsEgMidG4NQFgHCzN5T57Caej4pIqIL7itfQjg36yxcAW8oLjznvaNWQkuAzsmpoSiN5G8fnsq7WhYlye_XGPNWR4gWTO2LlDxCbSRw50EEANvyG0tUq4QeYyqJgQ5hRfvyiwEb9ynRAQbII/s400/character_boy_color3_orange.png`],
  ['color4_yellow', '黄色い髪の男の子', `${G}/R29vZ2xl/AVvXsEiIXQhoX2Z99H0dpMm0tEU2UMCU6JV1_KDDy8tCHFJn2drF8_C0ATgpiKRtjdOHj57lmpT_M79LkGZywETM1svbsK3h-5gpDp7fyu5_mlAMpSvGaCkJp8aE37W_ijh4gALLFVJUB7G8mtg/s400/character_boy_color4_yellow.png`],
  ['color5_green', '緑の髪の男の子', `${G}/R29vZ2xl/AVvXsEgACVjvN7J73q7gQdXY99GECw3LQQIVm9GHgc_KT78JA7WtmwbyIadwbT5ZsKfb_pfKJF4eu0ZnINTOwbdGa2iWJT3nHJBH88Eg10FdwfeQ9j8oeAxAF6RX3GnCuCLPXC3WBwTqgByJbfU/s400/character_boy_color5_green.png`],
  ['color6_blue', '青い髪の男の子', `${G}/R29vZ2xl/AVvXsEiWPikzbFQ-HjbSCmvw3g587gM8bCzsT7BQsO5pHi9ioqjMqXrIUqRsp3HLyMlzua232oc6QrRgSvFOWLMyf0jwzn3ubS2gMnad-MNphU07mDsFSG11FIYYkkAvmE4UlE2gLMB2b3XNEZY/s400/character_boy_color6_blue.png`],
  ['color7_purple', '紫の髪の男の子', `${G}/R29vZ2xl/AVvXsEhN-f2Gxbar4hYHNgmqB68KIXI5qxUpZUsINo1ilPo4uxZpsfgX_AVId1XNvJ1bMLk2_oKMkhmKqPGOZt8MPfaQgUtVTZIalUILcPg4pZ4oMCnCB9w6b2-PzfMbV5CaOPCGtb2UctdEsoI/s400/character_boy_color7_purple.png`],
  ['color8_brown', '茶色い髪の男の子', `${G}/R29vZ2xl/AVvXsEitnsqN4hMF-EhgGo0yM2xplmi4qQcw7Y6MXRJAU4PIEWhquf_GvYzb7RZ3ONIJyGGWAeqjhy9txrsdiqeELLLQgHpVG4H70HWHGIpgfDExg3F6RuorhnBw_IT2SesY-IRJ_FPLEw76LEk/s400/character_boy_color8_brown.png`],
  ['color9_pink', 'ピンクの髪の男の子', `${G}/R29vZ2xl/AVvXsEj8xiArt5HCoA_CVVaLCq36UjjU_ftyd2HZGyCg-cwJJqRozKfoJ7S-TV_YaYc2Rgr4cFnkpJaO3vDW-HP9_HFXShKJgxro4iuKeg2_06PXDTXHmc9GU6_0W9FC-VBj5Th2yn0xfJjv6vM/s400/character_boy_color9_pink.png`],
];

const GIRLS = [
  ['color1_white', '白い髪の女の子', `${G}/R29vZ2xl/AVvXsEgqC3nhhYaEwxB5t2QVqm3dhf8CNwhfmslih4E160B89kdfDKhaw_ZxZNAj05iaSxlC5UBSDJMwl4ckLpCr-vMJ9DNlG7hVfFVtY5teOXRRCRUGHLmdadCDvSf3y82QRyCWdV4LyQ2_6M4/s400/character_girl_color1_white.png`],
  ['color2_red', '赤い髪の女の子', `${G}/R29vZ2xl/AVvXsEgb9xHneNMhP3ZVUE3CR-5lwGBjZQVb2thMyC2_2jndrBh_usQvQUajSc8yxSPb7Jf8Xix8CdXSCgzMfWlbOzJBgvNuO1njE7IkjVN2BNovgc2Vn89_uXU1DDqutszaU1OTRWHvwpi57pQ/s400/character_girl_color2_red.png`],
  ['color3_orange', 'オレンジの髪の女の子', `${G}/R29vZ2xl/AVvXsEj9O89dn8GhDMB2XOiXka7_f6QehFXFH_xefIwwOvWfbubT10XvMZ34YMvvlZtnM4BYplk4HmK_deOmBYcn0n4Zy628g_2pl9uSuTQU-b6yfcu2DJO6_70omzpci890RfmxQDtHW2D4qCw/s400/character_girl_color3_orange.png`],
  ['color4_yellow', '黄色い髪の女の子', `${G}/R29vZ2xl/AVvXsEjMog7MZJ-5KNvGOSKfvARWepEioZsjaxwccak2zVAu0wvGkWrDW5D8veVsd2sBSO1MDVCrEe6bx8MOA3sDFn41MMZWawHNEfZW4QPhl86aXo4Gxrg0wFRSksFgCyTuvnnMCGYz31d3S0E/s400/character_girl_color4_yellow.png`],
  ['color5_green', '緑の髪の女の子', `${G}/R29vZ2xl/AVvXsEh5ATTduUNI0AnOXVPWrqEaebLXCbryH2hUGkAUuZJ4EwkTT-4zMDgUbBIyMTR_3gtCsIfjr43cVMxlg3iLpQn48OSzwD04rn2tWh8dj8Q2YGaUPAPdCYN8ihbkQjGoEB21aoHcHWfopzY/s400/character_girl_color5_green.png`],
  ['color6_blue', '青い髪の女の子', `${G}/R29vZ2xl/AVvXsEhsW3430C9IxqbcD7hyphenhyphenSmp4JBnh0VlQZUOOYzewFIAf0eQLwlcWM2-gptOxcNwBw2tg7f-pmrNwCTRIfp-XgiVnnRqNU9YRExuOaqOMdxLNKznosFRLms5fUzY9d0xPqfXjNcrDkU9ZKdc/s400/character_girl_color6_blue.png`],
  ['color7_purple', '紫の髪の女の子', `${G}/R29vZ2xl/AVvXsEgq88bOnuVFeinEVCNpkPRQP9SAAuOGpAU9F-wo8thvRSZNznE8mpRgPjJj_NNd63vwynVaJkdYHdvjevlbVVz8_YwAlXIGfKaQ5k7sZBV9brO_Nx1JraAt_UlU0Sq-2_oUkjKCsvAb6g0/s400/character_girl_color7_purple.png`],
  ['color8_brown', '茶色い髪の女の子', `${G}/R29vZ2xl/AVvXsEi2a4axuINMmjXu97NLycJ5EtTbD6YGiVCZ2HTKhf1RiNCB2BvGwSReXrlPP5R3OxHASiOMg1l9cet1UWIDiTMmXEXwZMof_7yU22M-zvkRKcnHxUIt4x0-yPG19kp_IsbN4UjnujwQVww/s400/character_girl_color8_brown.png`],
  ['color9_pink', 'ピンクの髪の女の子', `${G}/R29vZ2xl/AVvXsEjONG0yJ7LNh7T3jT_MGdld3JpIttqymiksK_s5_jucEvYMOwULddvOEt047zy_vkSakxlhmZX4mBqESd0WaVmE_inHXVZd7IlkCn6A3ESQua0CKDcVplcXh-vdfnH81kRvZNJ8RB37Ygc/s400/character_girl_color9_pink.png`],
];

const CURRENT = [
  ...BOYS.map(([, title, image], i) => ({ id: `a${String(i + 1).padStart(2, '0')}`, title, page: BOY_PAGE, image })),
  ...GIRLS.map(([, title, image], i) => ({ id: `a${String(i + 10).padStart(2, '0')}`, title, page: GIRL_PAGE, image })),
];

const FUTURE = [
  { id: 'n01', title: '黒い髪の男の子', page: BOY_PAGE, image: `${G}/R29vZ2xl/AVvXsEgKm1v1NZfQDYxjXhOJZxdGMzff1-pRVIojAUTzdapA4FySgjo0mcLaLhJ4fL1Q5BQmgp2_KDhbkx11TaNY3ijlMPkTbXnoWqfO6EzJzL6xnsuv8xYLXCe1NjUGccOIBO53FxX_HXXOkCM/s400/character_boy_normal.png` },
  { id: 'n02', title: '黒い髪の女の子', page: GIRL_PAGE, image: `${G}/R29vZ2xl/AVvXsEhrf9En3MJtd5ZzEa1Ky0jrp9rxFSTlwU30lzOToxwyVnSd7mprvlkTfhHuDDXFJfcAfF6o7oLbdQ_HL1OkA7n7M_rAVJTHOwg6pc-LO_QwoVEnqT1W3Lhk-KpbE62dvm_yvmu4qgDnass/s400/character_girl_normal.png` },
  { id: 'n03', page: 'https://www.irasutoya.com/2014/04/blog-post_9667.html' },
  { id: 'n04', page: 'https://www.irasutoya.com/2017/06/blog-post_98.html' },
  { id: 'n05', page: 'https://www.irasutoya.com/2013/12/blog-post_8725.html' },
  { id: 'n06', title: '男性アイドルグループ', page: 'https://www.irasutoya.com/2013/12/blog-post_6040.html', image: `${G}/R29vZ2xl/AVvXsEigL0X0XMN0jmcHTR7mZO67yHJFag7P92j-TIqhfyqig0hWT3egh263xJrYfB81z3O5ABV8FSSWiorcxpCWpXYjZuCbegBafNR5ILq_m8JneGCVL8vOUBKjgBP73dArx3AJG8c9weWDOlMK/s800/idol_man.png` },
  { id: 'n07', page: 'https://www.irasutoya.com/2014/09/blog-post_308.html' },
  { id: 'n08', page: 'https://www.irasutoya.com/2016/07/blog-post_464.html' },
  { id: 'n09', page: 'https://www.irasutoya.com/2016/09/blog-post_605.html' },
  { id: 'n10', page: 'https://www.irasutoya.com/2016/09/blog-post_709.html' },
  { id: 'n11', page: 'https://www.irasutoya.com/2017/03/blog-post_9.html' },
  { id: 'n12', page: 'https://www.irasutoya.com/2019/09/blog-post_14.html' },
  { id: 'n13', page: 'https://www.irasutoya.com/2019/08/blog-post_25.html' },
  { id: 'n14', page: 'https://www.irasutoya.com/2020/11/blog-post_738.html' },
  { id: 'n15', page: 'https://www.irasutoya.com/2024/10/blog-post_206.html' },
  { id: 'n16', page: 'https://www.irasutoya.com/2022/06/blog-post_22.html' },
  { id: 'n17', page: 'https://www.irasutoya.com/2021/10/blog-post_31.html' },
  { id: 'n18', page: 'https://www.irasutoya.com/2021/01/blog-post_718.html' },
];

function hasAlpha(buf) {
  const colorType = buf[25];
  return colorType === 4 || colorType === 6 || (colorType === 3 && buf.includes(Buffer.from('tRNS')));
}

async function download(url, file) {
  let buf;
  try {
    buf = await readFile(file);
    if (buf.subarray(0, 8).toString('hex') === '89504e470d0a1a0a') return buf;
  } catch {}
  const candidates = [url, url.replace(/\/s\d+\//, '/s320/'), url.replace(/\/s\d+\//, '/s200/')];
  let lastError;
  for (const candidate of [...new Set(candidates)]) {
    const requestUrl = candidate.includes('blogger.googleusercontent.com')
      ? `https://images.weserv.nl/?url=${encodeURIComponent(candidate)}&output=png`
      : candidate;
    try {
      const response = await fetch(requestUrl, { signal: AbortSignal.timeout(35000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      buf = Buffer.from(await response.arrayBuffer());
      if (buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error(`not a PNG (${buf.length} bytes)`);
      if (!hasAlpha(buf)) throw new Error('no alpha channel');
      await writeFile(file, buf);
      return buf;
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`${file}: ${lastError?.message || 'download failed'}`);
}

async function resolveMainImage(entry) {
  if (entry.image) return entry;
  const response = await fetch(entry.page, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`${entry.id}: source page HTTP ${response.status}`);
  const html = await response.text();
  const title = html.match(/<meta content='([^']+)' name='twitter:title'\/>/)?.[1];
  const image = html.match(/<meta content='([^']+)' name='twitter:image:src'\/>/)?.[1];
  if (!title || !image || !image.includes('blogger.googleusercontent.com')) throw new Error(`${entry.id}: main image not found`);
  return { ...entry, title, image };
}

async function downloadBatch(entries, out) {
  await mkdir(out, { recursive: true });
  const cacheFile = path.join(out, 'source-cache.json');
  let cache = {};
  try {
    cache = JSON.parse(await readFile(cacheFile, 'utf8'));
  } catch {}
  const manifest = [];
  for (const source of entries) {
    const entry = source.image ? source : cache[source.id] || await resolveMainImage(source);
    const buf = await download(entry.image, path.join(out, `${entry.id}.png`));
    if (!hasAlpha(buf)) throw new Error(`${entry.id}: no alpha channel`);
    const item = {
      id: entry.id,
      file: `${entry.id}.png`,
      title: entry.title,
      page: entry.page,
      image: entry.image,
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
      bytes: buf.length,
    };
    manifest.push(item);
    cache[entry.id] = item;
    await writeFile(cacheFile, JSON.stringify(cache, null, 2) + '\n');
    console.log(`${entry.id}  ${String(item.width).padStart(4)}x${String(item.height).padEnd(4)}  ${entry.title}`);
    await new Promise(resolve => setTimeout(resolve, 350));
  }
  return manifest;
}

async function main() {
  if (CURRENT.length !== 18 || FUTURE.length !== 18) throw new Error('each batch must contain exactly 18 assets');
  const current = await downloadBatch(CURRENT, CURRENT_OUT);
  const future = await downloadBatch(FUTURE, NEXT_OUT);
  const allUrls = [...current, ...future].map(entry => entry.image);
  if (new Set(allUrls).size !== allUrls.length) throw new Error('duplicate source image across batches');

  const previous = JSON.parse(await readFile(path.join(CURRENT_OUT, 'manifest.json'), 'utf8'));
  const base = previous.assets.filter(entry => !/^a\d\d$/.test(entry.id));
  const merged = [...base, ...current.map(entry => ({ ...entry, usedIn: ['partner-badge-portrait-pool'] }))];
  if (merged.length !== 35) throw new Error(`current game must contain 35 assets, got ${merged.length}`);
  await writeFile(path.join(CURRENT_OUT, 'manifest.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    license: 'いらすとや 利用規約: 35 distinct assets in one work; paid license required before commercial publication',
    count: merged.length,
    assets: merged,
  }, null, 2) + '\n');
  await writeFile(path.join(NEXT_OUT, 'manifest.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    license: 'いらすとや 利用規約: independent next-work batch; 18 distinct assets; confirm current terms before use',
    note: 'Independent source archive for a separate future work; not referenced by ziji-ren.',
    count: future.length,
    assets: future,
  }, null, 2) + '\n');
  console.log(`done: current game=${merged.length}, next work=${future.length}`);
}

main().catch(error => { console.error(error); process.exit(1); });
