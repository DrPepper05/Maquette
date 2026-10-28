import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (file) => readFileSync(join(root, file), 'utf8').trim();

const components = {
  header: {
    title: 'Header Navigation',
    styles: ['components/header/header.css'],
    scripts: ['components/header/header.js'],
    includeHeader: false,
    three: false
  },
  story: {
    title: 'Story: Foggy Idea to Finished Product',
    styles: ['components/story/story.css'],
    scripts: ['components/story/story.js'],
    includeHeader: true,
    three: true
  },
  services: {
    title: 'Wings / Services',
    styles: ['components/services/services.css'],
    scripts: ['components/services/services.js'],
    includeHeader: false,
    three: false
  },
  gallery: {
    title: 'Collection 3D Showcase (Hero)',
    styles: ['components/gallery/gallery.css'],
    scripts: ['components/gallery/gallery.js'],
    includeHeader: true,
    three: true
  },
  why: {
    title: 'Why / How We Work With You',
    styles: ['components/why/why.css'],
    scripts: ['components/why/why.js'],
    includeHeader: false,
    three: false
  },
  faq: {
    title: 'Visitor Information / FAQ',
    styles: ['components/faq/faq.css'],
    scripts: [],
    includeHeader: false,
    three: false
  },
  contact: {
    title: 'Contact & Prototype Request',
    styles: ['components/contact/contact.css'],
    scripts: ['components/contact/contact.js'],
    includeHeader: false,
    three: false
  },
  footer: {
    title: 'Footer',
    styles: ['components/footer/footer.css'],
    scripts: [],
    includeHeader: false,
    three: false
  },
  album: {
    title: 'Selected Projects Album (Hero Alternative)',
    styles: ['components/album/album.css'],
    scripts: ['components/album/album.js'],
    includeHeader: true,
    three: false
  }
};

mkdirSync(join(root, 'preview'), { recursive: true });

function buildPreview(name) {
  const config = components[name];
  if (!config) {
    console.error(`Unknown component "${name}". Use one of: ${Object.keys(components).join(', ')}`);
    return false;
  }

  const styles = [
    '../styles/base.css',
    ...(config.includeHeader ? ['../components/header/header.css'] : []),
    ...config.styles.map((file) => `../${file}`)
  ];

  const body = [
    config.includeHeader ? read('components/header/header.html') : '',
    read(`components/${name}/${name}.html`)
  ].filter(Boolean).join('\n');

  const scripts = [
    config.three ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>' : '',
    ...config.scripts.map((file) => `<script src="../${file}"></script>`)
  ].filter(Boolean).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${config.title} preview – Maquette</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
${styles.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n')}
<style>
  /* Standalone preview bar */
  .preview-banner {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 176, 32, 0.15);
    border-bottom: 1px solid rgba(255, 176, 32, 0.3);
    backdrop-filter: blur(10px);
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
  }
  .preview-banner a {
    color: var(--gold);
    text-decoration: none;
    font-weight: 600;
  }
  .preview-banner a:hover {
    text-decoration: underline;
  }
</style>
</head>
<body>
<div class="site-backdrop" id="siteBackdrop" aria-hidden="true">
  <div class="site-room" id="globalRoom"></div>
  <div class="site-grain"></div>
  <div class="site-shade"></div>
</div>
<div class="preview-banner">
  <span>Previewing component: <strong>${config.title}</strong> (<code>${name}</code>)</span>
  <a href="index.html">← Back to Component Catalog</a>
</div>
${body}
${scripts}
</body>
</html>
`;

  writeFileSync(join(root, 'preview', `${name}.html`), html + '\n');
  console.log(`✓ Built preview/${name}.html`);
  return true;
}

function buildCatalog() {
  const listItems = Object.keys(components).map((name) => {
    const c = components[name];
    return `
      <div class="catalog-card">
        <div class="card-head">
          <span class="mono">${name}</span>
          <h3><a href="${name}.html">${c.title}</a></h3>
        </div>
        <p>Isolated component preview with live styles, fonts, and scripts.</p>
        <div class="card-links">
          <a class="btn-sm" href="${name}.html" target="_blank">Open Preview ↗</a>
          <a class="btn-sm ghost" href="../components/${name}/index.html" target="_blank">Component Folder View ↗</a>
        </div>
      </div>
    `;
  }).join('\n');

  const catalogHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Component Catalog – Maquette</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles/base.css">
<style>
  body {
    padding: 60px 0 100px;
  }
  .catalog-header {
    margin-bottom: 48px;
    border-bottom: 1px solid var(--line);
    padding-bottom: 32px;
  }
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
  .catalog-card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 0.3s ease, transform 0.3s ease;
  }
  .catalog-card:hover {
    border-color: rgba(255, 176, 32, 0.35);
    transform: translateY(-2px);
  }
  .card-head h3 {
    margin: 8px 0 12px;
    font-size: 1.8rem;
  }
  .card-head a {
    text-decoration: none;
  }
  .card-head a:hover {
    color: var(--gold);
  }
  .catalog-card p {
    color: var(--mute);
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
  .card-links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .btn-sm {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    background: var(--gold);
    color: #1a1205;
    transition: opacity 0.2s ease;
  }
  .btn-sm:hover {
    opacity: 0.9;
  }
  .btn-sm.ghost {
    background: transparent;
    color: var(--bone);
    border: 1px solid var(--line);
  }
  .btn-sm.ghost:hover {
    border-color: var(--bone);
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="catalog-header">
    <span class="mono">Maquette Architecture</span>
    <h1 style="margin: 12px 0 16px;">Component Catalog</h1>
    <p style="color: var(--mute); font-size: 1.15rem; max-width: 60ch;">
      Every website component is isolated and runnable independently so you or any AI agent can inspect, develop, and preview each component in separation.
    </p>
    <div style="margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
      <a class="btn" href="../index.html">View Full Website ↗</a>
      <a class="btn ghost" href="../showcase/index.html">Component Showcase &amp; Lab ↗</a>
    </div>
  </div>

  <div class="catalog-grid">
    ${listItems}
  </div>
</div>
</body>
</html>
`;

  writeFileSync(join(root, 'preview', 'index.html'), catalogHtml + '\n');
  console.log('✓ Built preview/index.html (Component Catalog)');
}

const arg = process.argv[2];
if (!arg || arg === 'all') {
  Object.keys(components).forEach(buildPreview);
  buildCatalog();
} else {
  buildPreview(arg);
}
