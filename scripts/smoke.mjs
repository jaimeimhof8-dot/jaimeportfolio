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

await browser.close();
console.log(results.join('\n'));
process.exitCode = results.some((r) => r.startsWith('FAIL')) ? 1 : 0;
