/* ===== Album Hero: Featured artwork + thumbnail strip + scroll-driven reveal ===== */
(function () {
  /* Same project data as gallery.js – single source of truth */
  var PROJECTS = [
    { slug: 'northwind', title: 'Northwind', client: 'Northwind Logistics', year: 2026, category: 'Software', stack: ['Next.js', 'Postgres', 'tRPC'], palette: ['#141d2e', '#3f6fa3', '#d9915b', '#0a0f1a'], tagline: 'Fleet operations, one screen.' },
    { slug: 'lumen', title: 'Lumen', client: 'Lumen Clinics', year: 2026, category: 'Website', stack: ['Next.js', 'Sanity'], palette: ['#2b1216', '#8e2f35', '#e0a458', '#15080b'], tagline: 'Care that books itself.' },
    { slug: 'forge', title: 'Forge', client: 'Forge Industrial', year: 2025, category: 'Automation', stack: ['Python', 'n8n', 'AWS'], palette: ['#1c1a1e', '#7a6e62', '#c4552c', '#0d0b0e'], tagline: '14 hours of paperwork, zero.' },
    { slug: 'verdant', title: 'Verdant', client: 'Verdant Foods', year: 2025, category: 'Website', stack: ['Astro', 'Shopify'], palette: ['#12211a', '#3e7a52', '#c3d97a', '#08120d'], tagline: 'Fresh, fast, headless.' },
    { slug: 'atlas', title: 'Atlas', client: 'Atlas Finance', year: 2025, category: 'Software', stack: ['React', 'Node', 'Stripe'], palette: ['#1d1626', '#6f5a9e', '#dcc9a2', '#0e0a14'], tagline: 'Billing without the sprawl.' }
  ];

  function artCss(p) {
    return 'radial-gradient(120% 90% at 22% 18%, ' + p.palette[2] + '40, transparent 62%), ' +
      'radial-gradient(100% 80% at 78% 82%, ' + p.palette[1] + '66, transparent 58%), ' +
      'radial-gradient(60% 45% at 60% 35%, ' + p.palette[2] + '22, transparent 70%), ' +
      'linear-gradient(165deg, ' + p.palette[0] + ', ' + p.palette[3] + ')';
  }

  var painting = document.getElementById('albumPainting');
  var thumbsEl = document.getElementById('albumThumbs');
  var metaKick = document.getElementById('albumMetaKick');
  var metaTitle = document.getElementById('albumMetaTitle');
  var metaDesc = document.getElementById('albumMetaDesc');
  var scrollHint = document.getElementById('albumScrollHint');
  var albumSection = document.getElementById('album');

  if (!painting || !thumbsEl || !albumSection) return;

  var currentIdx = 0;

  /* ── Build thumbnail strip ── */
  PROJECTS.forEach(function (p, i) {
    var thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'album-thumb' + (i === 0 ? ' active' : '');
    thumb.style.backgroundImage = artCss(p);
    thumb.setAttribute('aria-label', 'Show ' + p.title);
    thumb.addEventListener('click', function () { selectProject(i); });
    thumbsEl.appendChild(thumb);
  });

  /* ── Set featured painting ── */
  function selectProject(idx) {
    currentIdx = idx;
    var p = PROJECTS[idx];
    painting.style.backgroundImage = artCss(p);
    if (metaKick) metaKick.textContent = p.category + ' · ' + p.year;
    if (metaTitle) metaTitle.textContent = p.title;
    if (metaDesc) metaDesc.textContent = p.client + ' — ' + p.tagline;

    /* Update active thumb */
    var thumbs = thumbsEl.querySelectorAll('.album-thumb');
    for (var i = 0; i < thumbs.length; i++) {
      thumbs[i].classList.toggle('active', i === idx);
    }
  }

  /* Initialize with first project */
  selectProject(0);

  /* ── Scroll-driven effects ── */
  function onScroll() {
    var rect = albumSection.getBoundingClientRect();
    var vh = window.innerHeight;

    /* Progress: 0 at top, 1 when the section has scrolled away */
    var scrolled = -rect.top;
    var progress = Math.max(0, Math.min(1, scrolled / (vh * 0.4)));

    /* Unblur painting based on scroll */
    if (progress > 0.15) {
      painting.classList.add('revealed');
    } else {
      painting.classList.remove('revealed');
    }

    /* Hide scroll hint after scrolling */
    if (scrollHint) {
      if (progress > 0.08) {
        scrollHint.classList.add('hidden');
      } else {
        scrollHint.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  /* ── Auto-cycle featured artwork every 4s when in view ── */
  var autoTimer = null;
  function startAuto() {
    if (autoTimer) return;
    autoTimer = setInterval(function () {
      selectProject((currentIdx + 1) % PROJECTS.length);
    }, 4000);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) startAuto();
        else stopAuto();
      });
    }, { threshold: 0.3 }).observe(albumSection);
  } else {
    startAuto();
  }

  /* Pause auto-cycle on manual thumb click */
  thumbsEl.addEventListener('click', function () {
    stopAuto();
    setTimeout(startAuto, 8000);
  });
})();
