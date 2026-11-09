import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (file) => readFileSync(join(root, file), 'utf8').trim();

const styles = [
  'styles/base.css',
  'components/header/header.css',
  'components/gallery/gallery.css',
  'components/services/services.css',
  'components/why/why.css',
  'components/faq/faq.css',
  'components/contact/contact.css',
  'components/footer/footer.css'
];

const sections = [
  'gallery',
  'services',
  'why',
  'faq',
  'contact'
];

const scripts = [
  'components/header/header.js',
  'components/gallery/gallery.js',
  'components/services/services.js',
  'components/why/why.js',
  'components/contact/contact.js'
];

const styleBlock = styles.map((file) =>
  `<style data-component="${file}">\n${read(file)}\n</style>`
).join('\n');

const sectionBlock = sections.map((name) =>
  `<!-- component: ${name} -->\n${read(`components/${name}/${name}.html`)}`
).join('\n\n');

const scriptBlock = scripts.map((file) =>
  `<script data-component="${file}">\n${read(file)}\n</script>`
).join('\n');

const html = read('src/layout.html')
  .replace('<!-- build:styles -->', styleBlock)
  .replace('<!-- build:header -->', `<!-- component: header -->\n${read('components/header/header.html')}`)
  .replace('<!-- build:sections -->', sectionBlock)
  .replace('<!-- build:footer -->', `<!-- component: footer -->\n${read('components/footer/footer.html')}`)
  .replace('<!-- build:scripts -->', scriptBlock);

writeFileSync(join(root, 'index.html'), html + '\n');
console.log('✓ Successfully compiled index.html with integrated 3D gallery hero.');

// Also populate dist/ for GitHub Pages / static deployment
const distDir = join(root, 'dist');
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'index.html'), html + '\n');

const cpOptions = {
  recursive: true,
  filter: (src) => !src.includes('node_modules') && !src.includes('.DS_Store')
};

for (const dir of ['assets', 'components', 'styles', 'showcase', 'preview', 'furniture']) {
  const srcPath = join(root, dir);
  if (existsSync(srcPath)) {
    cpSync(srcPath, join(distDir, dir), cpOptions);
  }
}

// Publish Mobila/ under lowercase /mobila only. GitHub Pages can't hold two
// folders that differ just by case (Mobila + mobila) — one of them gets dropped.
if (existsSync(join(root, 'Mobila'))) {
  cpSync(join(root, 'Mobila'), join(distDir, 'mobila'), cpOptions);
}

// 404 page: old mixed-case links (e.g. /Mobila/) redirect to the lowercase path.
writeFileSync(join(distDir, '404.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found – Maquette</title>
<script>
  var p = location.pathname, l = p.toLowerCase();
  if (p !== l) location.replace(l + location.search + location.hash);
</script>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; text-align: center; padding: 0 16px; font-family: 'Plus Jakarta Sans', sans-serif; }
  h1 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; }
</style>
</head>
<body>
<main>
  <h1>Page not found</h1>
  <p><a href="/">Back to Maquette</a></p>
</main>
</body>
</html>
`);

// Cloudflare: send old capitalized /Mobila links to /mobila
writeFileSync(join(distDir, '_redirects'), '/Mobila /mobila/ 301\n/Mobila/* /mobila/:splat 301\n');

// Ensure GitHub Pages serves all assets correctly and custom domain is preserved
writeFileSync(join(distDir, '.nojekyll'), '');
writeFileSync(join(distDir, 'CNAME'), 'maquette.ro\n');
console.log('✓ Successfully populated dist/ directory for deployment.');
