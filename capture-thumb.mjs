// One-off: capture the home page top fold as the WordPress theme thumbnail
// (recommended 1200x900). Saves brand_assets/theme-screenshot.jpg.
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, 'brand_assets', 'theme-screenshot.jpg');
const url = process.argv[2] || 'http://localhost:3000';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => document.fonts && document.fonts.ready);
await new Promise((r) => setTimeout(r, 800));
// Top fold only (theme thumbnails show the top of the page).
await page.screenshot({ path: out, type: 'jpeg', quality: 88, clip: { x: 0, y: 0, width: 1200, height: 900 } });
console.log('saved', out);
await browser.close();
