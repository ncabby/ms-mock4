import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Find next screenshot number
const existing = fs.readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'));
let maxNum = 0;
for (const f of existing) {
  const match = f.match(/^screenshot-(\d+)/);
  if (match) maxNum = Math.max(maxNum, parseInt(match[1]));
}
const num = maxNum + 1;
const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;
const filepath = path.join(screenshotDir, filename);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 500));
  // Scroll through the page to trigger IntersectionObserver reveals
  await page.evaluate(async () => {
    const delay = (ms) => new Promise(r => setTimeout(r, ms));
    const step = Math.floor(window.innerHeight * 0.5);
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      await delay(150);
    }
    // Force-reveal any remaining elements
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    window.scrollTo(0, 0);
    await delay(500);
  });
  await page.screenshot({ path: filepath, fullPage: true });
  console.log(`Screenshot saved: ${filepath}`);
  await browser.close();
})();
