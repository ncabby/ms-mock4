#!/usr/bin/env node
/**
 * Build the Main Sail WordPress theme.
 *
 * Assembles wp-theme/dist/main-sail/ from:
 *   - authored static theme files in wp-theme/src/
 *   - the repo's hand-coded HTML pages, transformed into pixel-exact PHP templates
 *   - css/, js/main.js, brand_assets/ copied verbatim
 * Then writes wp-theme/dist/main-sail.zip (uploadable via Appearance > Themes > Add New).
 *
 * Run: node wp-theme/build-theme.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const THEME = path.join(DIST, 'main-sail');
const CUTOVER = path.join(DIST, 'cutover-content');

// repo HTML file -> output PHP path inside the theme (home is special: front-page.php).
const MARKETING = {
  'index.html': 'front-page.php',
  'careers.html': 'router-pages/careers.php',
  'contact.html': 'router-pages/contact.php',
  'contract-vehicles.html': 'router-pages/contract-vehicles.php',
  'data-analytics.html': 'router-pages/data-analytics.php',
  'digital-engineering-manufacturing.html': 'router-pages/digital-engineering-manufacturing.php',
  'enterprise-it.html': 'router-pages/enterprise-it.php',
  'intelligent-automation.html': 'router-pages/intelligent-automation.php',
  'maintenance-logistics-optimization.html': 'router-pages/maintenance-logistics-optimization.php',
  'program-support.html': 'router-pages/program-support.php',
  'privacy-policy.html': 'router-pages/privacy-policy.php',
};

const OPS = ['cmmc-2-0.html', 'corporate-compliance.html', 'main-sail-bwxt.html'];

const URI = '<?php echo MAINSAIL_URI; ?>';
const HOME = '<?php echo MAINSAIL_HOME; ?>';

const CUTOVER_README = `# Main Sail theme — cutover runbook

Recon (verified by owner, 2026-06-07):
- WordPress 7.0, PHP 8.2.31 (theme requires PHP 8.0+ — OK).
- Active theme / rollback target: **Bento 2.5** (stays installed; reactivate to roll back in one click).
- Permalinks: \`/%category%/%postname%\` — pretty permalinks ON. WP **Pages** resolve at \`/slug/\`
  regardless of the category prefix, and the theme router matches on the path, so this is fine.
- Upload Theme button: present. Plugin install: allowed.
- Microsoft 365 mail: **SMTP AUTH** available (no OAuth needed) — simplest WP Mail SMTP path.
- GA4/GTM: none yet (add later via a head/footer-scripts plugin or a small mu-plugin; the theme
  no longer hardcodes analytics).
- Canonical host: **www.mainsailgroup.com**. Staging clone: \`https://www.mainsailgroup.com/staging\`
  (DB \`pmohelpd_wpmainsailgroup\`, prefix \`wpstg0_\`, path \`/home1/pmohelpd/public_html/staging/\`).
  Internal links use the \`MAINSAIL_HOME\` prefix, so navigation works under \`/staging\` AND at root.

## Plugins to install (all free)
1. **WP Staging** — clone live → /staging for a real-PHP rehearsal.
2. **UpdraftPlus** — full off-site backup immediately before cutover.
3. **Redirection** — the legacy→new 301 map (built from a Search Console / old-sitemap crawl).
4. **WP Mail SMTP** — route wp_mail() through Microsoft 365 (SMTP AUTH; dest msail@mainsailgroup.com).
Already present: Yoast SEO (kept; the theme silences it on the 11 hardcoded pages and lets it own
the Operations pages), LightStart (reused as the cutover maintenance shield).

## Routing model
- 11 marketing slugs are **force-owned** by the theme (hardcoded, pixel-exact):
  / (home), /careers, /contact, /contract-vehicles, /data-analytics,
  /digital-engineering-manufacturing, /enterprise-it, /intelligent-automation,
  /maintenance-logistics-optimization, /program-support, /privacy-policy.
- 3 theme-baked 301s: /what-we-do → /digital-engineering-manufacturing,
  /enterprise-technology → /enterprise-it,
  /digital-maintenance-logistics → /maintenance-logistics-optimization.
- Operations pages (native WP Pages, Gutenberg, branded by page.php): **cmmc-2-0**,
  **corporate-compliance**, **main-sail-bwxt**, + any future page. Unlisted from nav by design.
  Keep \`/cmmc-2-0\` and \`/corporate-compliance\` slugs EXACT (legal/contract references).

## Seeding the Operations pages
\`*.content.html\` here are the current page bodies, extracted for reference. At cutover, for each:
create/edit the WP Page at the exact slug, paste the prose/tables/links into Gutenberg (Code editor
or paste-to-blocks). Re-upload any images to the Media Library, OR reference them from the bundled
theme copy at \`/wp-content/themes/main-sail/brand_assets/...\`. \`cmmc-2-0\` likely already exists as a
legacy Page → edit it. Verify every external link (CMMC PDF, acq.osd.mil, federalregister.gov; and
the 9 corporate-compliance policy links) still opens in a new tab.

## Cutover ceremony (weekend / low-traffic; rehearse in WP Staging first)
1. UpdraftPlus full backup, off-site.
2. Confirm rollback target = Bento 2.5 (installed, not deleted).
3. WP Mail SMTP pre-configured + a test email delivered.
4. LightStart maintenance mode ON.
5. Appearance → Themes → Add New → Upload Theme → \`main-sail.zip\` → Activate.
6. Create/seed the 3 Operations Pages at their exact slugs.
7. Settings → Permalinks → Save (flush rewrites — REQUIRED or new URLs 404).
8. Smoke test (see below).
9. Go → LightStart OFF.  No-go → reactivate Bento 2.5 (one click; UpdraftPlus restore if needed).
Post: regenerate Yoast sitemap, resubmit to Search Console, load the legacy 301 map into Redirection,
canary the site for a day.

## Smoke test (run on /staging, then again on live after cutover)
- All 11 marketing URLs render pixel-exact; mega-nav (desktop + mobile) and footer work.
- 3 ops pages render branded; external links open in a new tab.
- 3 redirects 301 to the right targets.
- /contact form: valid submit → email arrives at msail@mainsailgroup.com + success banner;
  empty submit → field error; mailto: backstop visible.
- A random unknown URL shows the branded 404.
`;

// ---- helpers ---------------------------------------------------------------

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, s) { mkdirp(path.dirname(p)); fs.writeFileSync(p, s); }

function copyDir(from, to) {
  mkdirp(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

/** Drop the head asset <link>s and footer <script> we now enqueue in functions.php. */
function stripManagedAssets(html) {
  return html
    .split('\n')
    .filter((line) => {
      if (/rel="preconnect"/.test(line) && /(fonts\.googleapis\.com|fonts\.gstatic\.com)/.test(line)) return false;
      if (/fonts\.googleapis\.com\/css2/.test(line) && /rel="stylesheet"/.test(line)) return false;
      if (/href="\/css\/styles\.css"/.test(line)) return false;
      if (/<script[^>]*src="\/js\/main\.js"/.test(line)) return false;
      return true;
    })
    .join('\n');
}

/** Rewrite theme-asset and internal-link paths so they resolve under the theme dir / home subpath. */
function rewritePaths(s) {
  // Theme assets: full URL to the theme directory (correct at any request path / subdir).
  s = s.replace(/(src|href)="\/brand_assets\//g, `$1="${URI}/brand_assets/`);
  // Internal page links: prefix with the home path ('' on root, '/staging' in a clone).
  s = s.replace(/href="\//g, `href="${HOME}/`);
  return s;
}

function phpGuard(note) {
  return `<?php if ( ! defined( 'ABSPATH' ) ) { exit; } /* Main Sail — ${note} (generated by build-theme.mjs; edit the source HTML, not this file). */ ?>\n`;
}

/** Transform a full marketing HTML document into a standalone PHP template. */
function transformPage(html, { isContact = false } = {}) {
  let s = stripManagedAssets(html);
  s = s.replace('</head>', '  <?php wp_head(); ?>\n</head>');
  s = s.replace('</body>', '  <?php wp_footer(); ?>\n</body>');
  s = rewritePaths(s);

  if (isContact) s = contactMods(s);

  return phpGuard(isContact ? 'contact template' : 'hardcoded marketing template') + s;
}

function contactMods(s) {
  // Contact form submits to Web3Forms over HTTPS — no DNS records and no host SMTP needed.
  // AJAX keeps the success/error banner inline (works identically on /staging and live, no
  // per-environment config). The access key is public by design (it lives in the form markup).
  const WEB3FORMS_KEY = '69f668b7-fd6a-4c0c-932b-c7b59db61fe7';

  const bannerStyle =
    '  <style>.form-banner{padding:1rem 1.25rem;border-radius:10px;margin-bottom:1.5rem;font-weight:600;line-height:1.5}' +
    '.form-banner-success{background:rgba(25,123,189,.1);color:#125E8A;border:1px solid rgba(25,123,189,.3)}' +
    '.form-banner-error{background:#fff4f2;color:#9b2c1c;border:1px solid #f0c4bb}</style>\n';
  s = s.replace('  <?php wp_head(); ?>\n</head>', bannerStyle + '  <?php wp_head(); ?>\n</head>');

  const formNeedle = '<form action="#" method="POST">';
  if (!s.includes(formNeedle)) throw new Error('contact: form needle not found');
  s = s.replace(
    formNeedle,
    `<form id="ms-contact-form" action="https://api.web3forms.com/submit" method="POST">\n` +
      `            <input type="hidden" name="access_key" value="${WEB3FORMS_KEY}">\n` +
      `            <input type="hidden" name="subject" value="New inquiry from the Main Sail website">\n` +
      `            <input type="hidden" name="from_name" value="Main Sail Website">\n` +
      `            <input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" style="display:none !important;">`
  );

  // Keep the inquiry type out of the email Subject (the hidden "subject" field owns it).
  s = s.replace(
    '<select id="subject" name="subject" class="form-select" required>',
    '<select id="subject" name="inquiry_type" class="form-select" required>'
  );

  const h3Needle = '<h3 style="margin-bottom:var(--space-xl);">Send Us a Message</h3>';
  if (!s.includes(h3Needle)) throw new Error('contact: h3 needle not found');
  s = s.replace(
    h3Needle,
    `${h3Needle}\n          <div id="ms-contact-status" class="form-banner" role="status" style="display:none;"></div>`
  );

  const script = `<script>
  (function(){
    var form=document.getElementById('ms-contact-form'); if(!form) return;
    var box=document.getElementById('ms-contact-status');
    function show(ok,msg){ box.textContent=msg; box.className='form-banner '+(ok?'form-banner-success':'form-banner-error'); box.style.display='block'; box.scrollIntoView({behavior:'smooth',block:'center'}); }
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('button[type=submit]'); if(btn){btn.disabled=true;}
      fetch(form.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)})
        .then(function(r){return r.json();})
        .then(function(j){ if(j.success){ show(true,'Thank you — your message has been sent. We respond within one business day.'); form.reset(); } else { show(false,'Sorry, we could not send your message. Please email msail@mainsailgroup.com directly.'); } })
        .catch(function(){ show(false,'Network error. Please email msail@mainsailgroup.com directly.'); })
        .then(function(){ if(btn){btn.disabled=false;} });
    });
  })();
</script>`;
  s = s.replace('  <?php wp_footer(); ?>\n</body>', '  ' + script + '\n  <?php wp_footer(); ?>\n</body>');

  return s;
}

/** Build header.php + footer.php partials (for ops/fallback templates) from a neutral page. */
function buildPartials(neutralHtml) {
  const skip = neutralHtml.indexOf('<a class="skip-link"');
  const mainIdx = neutralHtml.indexOf('id="main"');
  if (skip < 0 || mainIdx < 0) throw new Error('partials: markers not found');
  const sectionStart = neutralHtml.lastIndexOf('<section', mainIdx);
  let headerChunk = neutralHtml.slice(skip, sectionStart).trimEnd();
  headerChunk = headerChunk.replace(/<!--[^]*?-->\s*$/, '').trimEnd();

  const fStart = neutralHtml.indexOf('<footer');
  const fEnd = neutralHtml.indexOf('</footer>') + '</footer>'.length;
  let footerChunk = neutralHtml.slice(fStart, fEnd);

  headerChunk = rewritePaths(headerChunk);
  footerChunk = rewritePaths(footerChunk);

  const headerPhp =
    phpGuard('site header partial') +
    `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  ${headerChunk}
`;

  const footerPhp =
    phpGuard('site footer partial') +
    `  ${footerChunk}
  <?php wp_footer(); ?>
</body>
</html>
`;

  return { headerPhp, footerPhp };
}

/** Extract inner content (between header and footer) of an ops page for Gutenberg seeding. */
function opsSeed(html) {
  const start = html.indexOf('<section id="main"');
  const end = html.indexOf('<footer');
  if (start < 0 || end < 0) throw new Error('opsSeed: markers not found');
  return html.slice(start, end).trim();
}

// ---- build -----------------------------------------------------------------

console.log('• cleaning dist/');
rmrf(DIST);
mkdirp(THEME);
mkdirp(CUTOVER);

console.log('• copying authored theme files (src/)');
copyDir(SRC, THEME);

console.log('• copying assets (css, js/main.js, brand_assets)');
mkdirp(path.join(THEME, 'css'));
fs.copyFileSync(path.join(REPO, 'css/styles.css'), path.join(THEME, 'css/styles.css'));
mkdirp(path.join(THEME, 'js'));
fs.copyFileSync(path.join(REPO, 'js/main.js'), path.join(THEME, 'js/main.js')); // hero-webgl.js is dead; omitted.
copyDir(path.join(REPO, 'brand_assets'), path.join(THEME, 'brand_assets'));

console.log('• screenshot.jpg');
fs.copyFileSync(path.join(REPO, 'brand_assets/home-hero.jpg'), path.join(THEME, 'screenshot.jpg'));

console.log('• transforming marketing pages -> PHP templates');
for (const [htmlFile, outRel] of Object.entries(MARKETING)) {
  const html = read(path.join(REPO, htmlFile));
  const php = transformPage(html, { isContact: htmlFile === 'contact.html' });
  write(path.join(THEME, outRel), php);
  // Guard: no managed asset or unrewritten root paths leaked through.
  if (/href="\/css\/styles\.css"|src="\/js\/main\.js"|src="\/brand_assets\//.test(php)) {
    throw new Error(`leak in ${outRel}`);
  }
  console.log(`   ${htmlFile} -> ${outRel}`);
}

console.log('• building header.php / footer.php from cmmc-2-0.html (neutral nav, is-scrolled, canonical footer)');
const { headerPhp, footerPhp } = buildPartials(read(path.join(REPO, 'cmmc-2-0.html')));
write(path.join(THEME, 'header.php'), headerPhp);
write(path.join(THEME, 'footer.php'), footerPhp);

console.log('• ops-page seed content (reference for Stage-2 Gutenberg migration)');
for (const f of OPS) {
  const slug = f.replace(/\.html$/, '');
  write(path.join(CUTOVER, `${slug}.content.html`), opsSeed(read(path.join(REPO, f))));
}

console.log('• cutover runbook');
write(path.join(CUTOVER, 'README-CUTOVER.md'), CUTOVER_README);

console.log('• zipping');
rmrf(path.join(DIST, 'main-sail.zip'));
execSync('zip -qr main-sail.zip main-sail', { cwd: DIST, stdio: 'inherit' });

// summary
const count = (dir) => {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? count(path.join(dir, e.name)) : 1;
  }
  return n;
};
const zipSize = (fs.statSync(path.join(DIST, 'main-sail.zip')).size / 1024 / 1024).toFixed(2);
console.log(`\n✓ built main-sail/ (${count(THEME)} files), main-sail.zip = ${zipSize} MB`);
console.log(`  theme:   ${THEME}`);
console.log(`  zip:     ${path.join(DIST, 'main-sail.zip')}`);
console.log(`  cutover: ${CUTOVER}`);
