(function () {
  'use strict';

  const PLATES = [
    {
      num: '01',
      roman: 'PLATE I',
      caput: 'Caput I · The Survey',
      title: 'You show us the mess.',
      lead: 'A 20-minute conversation and four form fields. No jargon, no RFPs. We read your raw processes, sticky notes, and spreadsheet mazes together to isolate what is genuinely stuck.',
      marginalia: 'Survey Observation: Every enduring structure begins with an honest survey of the existing terrain and its real bottlenecks.',
      badgeText: 'Field Survey · Unsorted Fog',
      badgeClass: '',
      ledger: [
        { label: 'Time Investment', val: '20 minutes' },
        { label: 'Client Prereq', val: 'Zero preparation' },
        { label: 'Initial Deliverable', val: 'Target scope perimeter' },
        { label: 'Next Protocol', val: 'Maquette Commissioning' }
      ],
      svgContent: `
        <svg viewBox="0 0 280 180" fill="none">
          <circle cx="50" cy="50" r="3.5" fill="#c88a58" opacity="0.7"/>
          <circle cx="95" cy="35" r="4.5" fill="#c88a58"/>
          <circle cx="45" cy="115" r="3" fill="#c88a58" opacity="0.6"/>
          <circle cx="130" cy="70" r="5" fill="#e89e28"/>
          <circle cx="85" cy="135" r="3.5" fill="#c88a58"/>
          <circle cx="145" cy="125" r="4" fill="#c88a58" opacity="0.7"/>
          <path d="M45,115 L50,50 L95,35 L145,70 L145,125 L85,135 Z" stroke="#c88a58" stroke-width="1.2" stroke-dasharray="4 4"/>
          <line x1="145" y1="85" x2="225" y2="85" stroke="#e89e28" stroke-width="1.5" stroke-dasharray="3 3"/>
          <polygon points="225,85 215,80 215,90" fill="#e89e28"/>
          <circle cx="240" cy="85" r="16" stroke="#e89e28" stroke-width="1.2"/>
          <text x="240" y="89" fill="#e89e28" font-family="'DM Mono'" font-size="9" text-anchor="middle">BRIEF</text>
        </svg>
      `
    },
    {
      num: '02',
      roman: 'PLATE II',
      caput: 'Caput II · The Maquette',
      title: 'We smooth it into a plan.',
      lead: 'In about a week, you receive a real, clickable scale model of your website, automation, or software. With live screens, responsive layouts, and functioning button paths. If it is not what you need, you keep the conversation and we part as friends.',
      marginalia: 'Plate Note II.A: Scale models allow tactile testing before committing construction capital. Admission is free by design.',
      badgeText: '✦ Free Admission · $0.00 Obligation',
      badgeClass: '',
      ledger: [
        { label: 'Turnaround', val: '~5 to 7 business days' },
        { label: 'Model Scale', val: '1:1 Interactive prototype' },
        { label: 'Financial Cost', val: '$0.00 · Truly free' },
        { label: 'Risk to Client', val: 'Zero commitment' }
      ],
      svgContent: `
        <svg viewBox="0 0 280 180" fill="none">
          <rect x="25" y="20" width="230" height="135" rx="8" stroke="#e89e28" stroke-width="1.2" fill="#141217"/>
          <line x1="25" y1="42" x2="255" y2="42" stroke="rgba(245,241,233,0.15)" stroke-width="1"/>
          <circle cx="40" cy="31" r="3" fill="#e89e28"/>
          <circle cx="52" cy="31" r="3" fill="rgba(245,241,233,0.3)"/>
          <circle cx="64" cy="31" r="3" fill="rgba(245,241,233,0.3)"/>
          <rect x="40" y="56" width="60" height="28" rx="4" fill="rgba(232,158,40,0.15)" stroke="#e89e28" stroke-width="0.8"/>
          <rect x="40" y="94" width="90" height="10" rx="3" fill="rgba(245,241,233,0.2)"/>
          <rect x="40" y="112" width="120" height="8" rx="2" fill="rgba(245,241,233,0.1)"/>
          <rect x="40" y="126" width="70" height="8" rx="2" fill="rgba(245,241,233,0.1)"/>
          <polygon points="180,95 195,115 186,117 192,130 185,133 179,120 172,126" fill="#e89e28"/>
          <circle cx="180" cy="95" r="10" stroke="#e89e28" stroke-width="1" stroke-dasharray="2 2"/>
        </svg>
      `
    },
    {
      num: '03',
      roman: 'PLATE III',
      caput: 'Caput III · The Assembly',
      title: 'The plan stands up.',
      lead: 'Once you approve the maquette, construction begins in transparent, weekly cycles. Every Friday at 16:00 CET, you receive a working build to click and test. Autonomous agents do the routine code scaffolding; senior developers review and decide every architectural decision.',
      marginalia: 'Plate Note III.B: Scaffolding and verification logs are submitted at seven-day intervals. Zero opaque development periods.',
      badgeText: '✦ Transparent Assembly · Weekly Ship',
      badgeClass: '',
      ledger: [
        { label: 'Demo Cadence', val: 'Every Friday live' },
        { label: 'Inspection Room', val: 'Shared direct channel' },
        { label: 'Crafting Engine', val: 'AI speed + Senior craft' },
        { label: 'Surprise Index', val: 'Zero surprises' }
      ],
      svgContent: `
        <svg viewBox="0 0 280 180" fill="none">
          <g stroke="#38bdf8" stroke-width="1.2">
            <rect x="30" y="115" width="65" height="30" rx="4" fill="rgba(56,189,248,0.1)"/>
            <text x="62" y="133" fill="#38bdf8" font-family="'DM Mono'" font-size="8.5" text-anchor="middle">WK 01</text>
            <rect x="105" y="85" width="65" height="60" rx="4" fill="rgba(56,189,248,0.15)"/>
            <text x="137" y="118" fill="#38bdf8" font-family="'DM Mono'" font-size="8.5" text-anchor="middle">WK 02</text>
            <rect x="180" y="50" width="65" height="95" rx="4" fill="rgba(56,189,248,0.22)"/>
            <text x="212" y="100" fill="#38bdf8" font-family="'DM Mono'" font-size="8.5" text-anchor="middle">WK 03</text>
          </g>
          <path d="M62,115 L105,85 L180,50 L212,35" stroke="#e89e28" stroke-width="1.5" stroke-dasharray="3 3"/>
          <circle cx="212" cy="35" r="4" fill="#e89e28"/>
        </svg>
      `
    },
    {
      num: '04',
      roman: 'PLATE IV',
      caput: 'Caput IV · The Deed',
      title: 'You own the model.',
      lead: 'Full handover of keys and deeds. Source code, design files, serverless pipelines, and database credentials are completely yours. Plain, documented code that any software developer or team can immediately pick up. Support after launch is optional.',
      marginalia: 'Colophon IV: Complete title and copyright transfer. The client holds 100% of keys, repository origins, and design tokens.',
      badgeText: '✦ 100% Deed of Ownership · Zero Lock-In',
      badgeClass: 'emerald',
      ledger: [
        { label: 'Code Title', val: '100% Client copyright' },
        { label: 'Vendor Lock-in', val: 'Zero proprietary locks' },
        { label: 'Archival Manual', val: 'Full deployment guide' },
        { label: 'Maintenance', val: 'Optional retainer' }
      ],
      svgContent: `
        <svg viewBox="0 0 280 180" fill="none">
          <rect x="40" y="25" width="200" height="130" rx="10" stroke="#34d399" stroke-width="1.2" fill="#131614"/>
          <rect x="52" y="37" width="176" height="106" rx="6" stroke="rgba(52,211,153,0.3)" stroke-width="1" stroke-dasharray="4 4"/>
          <circle cx="140" cy="72" r="14" stroke="#e89e28" stroke-width="1.5"/>
          <circle cx="140" cy="72" r="6" stroke="#e89e28" stroke-width="1"/>
          <line x1="140" y1="86" x2="140" y2="114" stroke="#e89e28" stroke-width="2"/>
          <line x1="140" y1="102" x2="149" y2="102" stroke="#e89e28" stroke-width="2"/>
          <line x1="140" y1="110" x2="147" y2="110" stroke="#e89e28" stroke-width="2"/>
          <text x="140" y="132" fill="#34d399" font-family="'DM Mono'" font-size="8" letter-spacing="2" text-anchor="middle">100% YOUR PROPERTY</text>
        </svg>
      `
    }
  ];

  let currentPlateIndex = 0;

  // DOM Elements
  const binder = document.getElementById('monographBinder');
  const thumbTabs = document.querySelectorAll('.thumb-tab');
  const btnPrev = document.getElementById('btnPrevPage');
  const btnNext = document.getElementById('btnNextPage');
  const pageIndicator = document.getElementById('pageIndicator');
  const modeSpreadBtn = document.getElementById('modeSpread');
  const modeLeporelloBtn = document.getElementById('modeLeporello');

  // Spread Page DOM Elements
  const pageCaput = document.getElementById('pageCaput');
  const pageRoman = document.getElementById('pageRoman');
  const pageTitle = document.getElementById('pageTitle');
  const pageLead = document.getElementById('pageLead');
  const pageMarginalia = document.getElementById('pageMarginalia');
  const plateBadge = document.getElementById('plateBadge');
  const plateDiagram = document.getElementById('plateDiagram');
  const plateLedger = document.getElementById('plateLedger');
  const platePageNum = document.getElementById('platePageNum');

  function renderPlate(index) {
    if (index < 0 || index >= PLATES.length) return;
    currentPlateIndex = index;
    const p = PLATES[index];

    // Left Page Content
    if (pageCaput) pageCaput.textContent = p.caput;
    if (pageRoman) pageRoman.textContent = p.roman;
    if (pageTitle) pageTitle.textContent = p.title;
    if (pageLead) pageLead.textContent = p.lead;
    if (pageMarginalia) pageMarginalia.innerHTML = `<em>${p.roman}</em> ${p.marginalia}`;

    // Right Page Content
    if (plateBadge) {
      plateBadge.textContent = p.badgeText;
      plateBadge.className = 'plate-seal-badge ' + (p.badgeClass || '');
    }
    if (plateDiagram) {
      plateDiagram.innerHTML = p.svgContent;
    }
    if (plateLedger) {
      plateLedger.innerHTML = p.ledger.map(item => `
        <div class="ledger-item">
          <dt>${item.label}</dt>
          <dd>${item.val}</dd>
        </div>
      `).join('');
    }
    if (platePageNum) {
      platePageNum.textContent = `${p.num} · 04`;
    }

    // Update Thumb Tabs
    thumbTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    // Update Controller Navigation
    if (pageIndicator) {
      pageIndicator.textContent = `Plate ${p.num} of 04`;
    }
    if (btnPrev) btnPrev.disabled = (index === 0);
    if (btnNext) btnNext.disabled = (index === PLATES.length - 1);
  }

  // Event Handlers for Navigation
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentPlateIndex > 0) renderPlate(currentPlateIndex - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentPlateIndex < PLATES.length - 1) renderPlate(currentPlateIndex + 1);
    });
  }

  thumbTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => renderPlate(idx));
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (binder.classList.contains('view-leporello')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (currentPlateIndex < PLATES.length - 1) renderPlate(currentPlateIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (currentPlateIndex > 0) renderPlate(currentPlateIndex - 1);
    }
  });

  // Mode Switcher (Monograph vs Leporello)
  if (modeSpreadBtn && modeLeporelloBtn && binder) {
    modeSpreadBtn.addEventListener('click', () => {
      modeSpreadBtn.classList.add('active');
      modeLeporelloBtn.classList.remove('active');
      binder.classList.remove('view-leporello');
      if (btnPrev) btnPrev.style.display = 'grid';
      if (btnNext) btnNext.style.display = 'grid';
      if (pageIndicator) pageIndicator.style.display = 'block';
    });

    modeLeporelloBtn.addEventListener('click', () => {
      modeLeporelloBtn.classList.add('active');
      modeSpreadBtn.classList.remove('active');
      binder.classList.add('view-leporello');
      if (btnPrev) btnPrev.style.display = 'none';
      if (btnNext) btnNext.style.display = 'none';
      if (pageIndicator) pageIndicator.style.display = 'none';
    });
  }

  // Initial render
  renderPlate(0);
})();
