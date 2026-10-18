// Quick interaction test. Needs a running dev or preview server.
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
const check = (name, ok) => results.push(`${ok ? 'OK  ' : 'FAIL'} ${name}`);

// Hero: the grey name block opens while scrolling, on desktop and phone.
for (const [label, vp] of [['Desktop', { width: 1440, height: 900 }], ['Mobile', { width: 390, height: 844 }]]) {
  const page = await (await browser.newContext({ viewport: vp, isMobile: label === 'Mobile', hasTouch: label === 'Mobile' })).newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  check(`${label}: Hero-Fotos sichtbar`, await page.locator('.side--a .slide.is-on').isVisible());
  await page.evaluate(() => window.scrollTo(0, 1300));
  await page.waitForTimeout(400);
  const name = await page.evaluate(() => {
    const r = document.querySelector('#name').getBoundingClientRect();
    return r.top >= 0 && r.bottom <= innerHeight && +getComputedStyle(document.querySelector('.name-block')).opacity > 0.95;
  });
  check(`${label}: Name nach dem Scrollen in der Mitte`, name);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  check(`${label}: kein horizontales Scrollen`, !overflow);
  await page.close();
}

const desk = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await desk.goto(base + '/', { waitUntil: 'networkidle' });
check('4 Arbeiten auf der Startseite', (await desk.locator('#arbeiten .card').count()) === 4);
await desk.goto(base + '/projects/');
check('6 Arbeiten auf der Works-Seite', (await desk.locator('.card').count()) === 6);
check('Keine Strassenadresse', !/strasse \d/i.test(await desk.textContent('body')));
await desk.goto(base + '/contact/');
check('E-Mail richtig geschrieben', (await desk.textContent('.info')).includes('jaimeimhof8@gmail.com'));
check('Telefon-Link stimmt', (await desk.getAttribute('a[href^="tel:"]', 'href')) === 'tel:+41775256727');

await desk.goto(base + '/projects/ipa-derendinger/');
await desk.click('.yt-play');
const src = await desk.getAttribute('.yt iframe', 'src');
check('YouTube erst nach Klick (nocookie)', !!src && src.includes('youtube-nocookie.com/embed/SxO9FMYEWg8'));

// Phone: menu, console errors on all pages.
const phone = await (await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })).newPage();
const consoleErrors = [];
phone.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
phone.on('pageerror', (e) => consoleErrors.push(e.message));
const pages = ['/', '/projects/', '/projects/ipa-derendinger/', '/projects/event-video-gpmc/', '/projects/event-foto-blessthun/', '/projects/capoeira-capu/', '/projects/tunis-streetlife/', '/projects/tour-de-suisse/', '/about/', '/contact/'];
for (const path of pages) await phone.goto(base + path, { waitUntil: 'networkidle' });
check(`Keine Konsolenfehler${consoleErrors.length ? ': ' + consoleErrors.slice(0, 3).join(' | ') : ''}`, consoleErrors.length === 0);
await phone.goto(base + '/about/');
await phone.click('.menu-btn');
check('Handy-Menü öffnet', await phone.isVisible('#hauptmenue a[href="/projects/"]'));
await phone.goto(base + '/gibt-es-nicht/');
check('404-Seite', ((await phone.textContent('h1')) ?? '').includes('gibt es nicht'));
await phone.goto(base + '/robots.txt');
check('robots.txt mit Sitemap', ((await phone.textContent('body')) ?? '').includes('sitemap-index.xml'));

// Stage 2 features.
{
  const touch = await (await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })).newPage();
  await touch.goto(base + '/', { waitUntil: 'networkidle' });
  check('Touch: Scroll-Hinweis sichtbar, Maus-Symbol nicht', (await touch.locator('.scroll-hint').isVisible()) && !(await touch.locator('.mouse').isVisible()));
  check('Startseite: Arbeiten vor Wer bin ich', await touch.evaluate(() => !!(document.querySelector('#arbeiten').compareDocumentPosition(document.querySelector('.who')) & Node.DOCUMENT_POSITION_FOLLOWING)));
  await touch.goto(base + '/about/', { waitUntil: 'networkidle' });
  await touch.click('.menu-btn');
  await touch.keyboard.press('Escape');
  check('Menü: Escape schliesst und Fokus kehrt zurück', !(await touch.isVisible('#hauptmenue a[href="/projects/"]')) && (await touch.evaluate(() => document.activeElement?.classList.contains('menu-btn'))));
  await touch.click('.menu-btn');
  await touch.mouse.click(200, 600);
  check('Menü: Klick daneben schliesst', !(await touch.isVisible('#hauptmenue a[href="/projects/"]')));
  await touch.close();

  const d = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await d.goto(base + '/', { waitUntil: 'networkidle' });
  check('Maus: Maus-Symbol sichtbar, Scroll-Hinweis nicht', (await d.locator('.mouse').isVisible()) && !(await d.locator('.scroll-hint').isVisible()));
  await d.goto(base + '/about/', { waitUntil: 'networkidle' });
  const cv = await d.getAttribute('a[download]', 'href');
  const res = cv ? await d.request.get(base + cv) : null;
  check('Über mich: Lebenslauf-Download erreichbar (PDF)', !!res && res.ok() && (res.headers()['content-type'] ?? '').includes('pdf'));
  await d.goto(base + '/datenschutz/', { waitUntil: 'networkidle' });
  check('Datenschutz: Seite und Footer-Link', ((await d.textContent('h1')) ?? '').includes('Datenschutz') && (await d.locator('footer a[href="/datenschutz/"]').count()) === 1);
  await d.close();
}

// Classic, visible scrollbar (Windows/Linux desktop): headless Chrome hides it by default, so the check above never saw
// the 15 px overflow caused by 100vw. scrollWidth must not exceed clientWidth (the width without the scrollbar).
const classic = await chromium.launch({ channel: 'chrome', ignoreDefaultArgs: ['--hide-scrollbars'] });
for (const width of [1440, 1024]) {
  const page = await (await classic.newContext({ viewport: { width, height: 900 } })).newPage();
  for (const path of ['/', '/about/', '/projects/', '/projects/ipa-derendinger/', '/contact/']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const { sw, cw, bar } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, bar: innerWidth - document.documentElement.clientWidth }));
    check(`Sichtbare Scrollleiste ${width}px ${path}: kein seitliches Scrollen (${sw} / ${cw}, Leiste ${bar}px)`, bar > 0 && sw <= cw);
  }
  await page.close();
}
await classic.close();

await browser.close();
console.log(results.join('\n'));
process.exitCode = results.some((r) => r.startsWith('FAIL')) ? 1 : 0;
