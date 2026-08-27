/**
 * maquette-ambient.ts — the prospectus pages as AMBIENT BACKDROP.
 * ────────────────────────────────────────────────────────────────
 * Five dark pages float scattered in 3D behind the paper, permanently
 * BLURRED — abstract smudges of the site's real copy (painted from
 * copy.ts with the site's fonts, so the shapes are honest, but never
 * legible and never meant to be). The homepage echo of AmbientCards.
 *
 * Motion contract (docs/brand.md §6): one ease-out settle at load,
 * slow per-page drift, and a gentle parallax that is a pure function
 * of scrollY — native scrolling is never altered. The camera holds one
 * pose. The HTML content never leaves the document; nothing is ever
 * reparented, parked, or hidden. The dive/park system this replaced
 * lives in git history (removed 2026-08-26 after external review).
 *
 * Loaded via dynamic import from MaquetteCanvas.astro, homepage only,
 * behind a width/pointer/reduced-motion gate — phones never download
 * this chunk.
 */
import * as THREE from 'three';
import { copy } from '../copy';

export function boot() {
  const cv = document.getElementById('mq-c') as HTMLCanvasElement | null;
  if (!cv || (cv as any).__mq) return;
  (cv as any).__mq = true;

  // ─── Palette ───
  const P = { paper: 0xF4F2ED, ink: 0x141412, mid: 0x5C5A54, hl: 0xD8D5CC, red: 0xB34530, scr: 0x0F1013 };

  // ─── Renderer / Scene / Camera / Lights ───
  // alpha:true + no scene background: the document's real --paper shows
  // through, so the canvas "paper" can't drift from the CSS paper via tone
  // mapping. dpr capped at 1.5 — retina fill cost drops ~44%, MSAA stays.
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' });
  R.setSize(innerWidth, innerHeight);
  R.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  R.toneMapping = THREE.ACESFilmicToneMapping;
  R.toneMappingExposure = 1.15;

  const S = new THREE.Scene();
  S.fog = new THREE.FogExp2(P.paper, 0.008);

  const cam = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.1, 400);
  S.add(new THREE.AmbientLight(0xffffff, 0.95));
  const sun = new THREE.DirectionalLight(0xfff8ee, 2.0); sun.position.set(20, 35, 25); S.add(sun);
  const fill = new THREE.DirectionalLight(0xe0e6ff, 0.6); fill.position.set(-15, 12, -10); S.add(fill);

  const root = new THREE.Group();
  S.add(root);

  // ═══════════════════════════════════════════════════════════════
  //  PAGE FACES — real copy from copy.ts, drawn with the site's own
  //  faces, then blurred once. The smudges are shapes of true text
  //  (honesty rule respected) even though nothing is readable.
  // ═══════════════════════════════════════════════════════════════

  const SCR = { bg: '#0F1013', hi: '#F2F0EC', body: '#C7CACF', mid: '#8B8F94', ln: '#262B33', red: '#D9573A' };
  // Astro's font loader registers faces under HASHED family names — the
  // canvas must use the same resolved names or it silently falls back to
  // a metrically different system font.
  function realFamily(cssVar: string, fb: string) {
    const probe = document.createElement('span');
    probe.style.fontFamily = `var(${cssVar})`;
    document.body.appendChild(probe);
    const fam = getComputedStyle(probe).fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
    probe.remove();
    return fam ? `"${fam}", ${fb}` : fb;
  }
  const F_HEAD = realFamily('--font-figtree', 'system-ui, sans-serif');
  const F_MONO = realFamily('--font-jbmono', 'ui-monospace, monospace');
  type Ctx = CanvasRenderingContext2D;
  function bar(c: Ctx, x: number, y: number, w: number, h: number, r: number, fillC: string) {
    c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = fillC; c.fill();
  }
  function wrapText(c: Ctx, text: string, maxW: number): string[] {
    const out: string[] = []; let cur = '';
    for (const w of text.split(' ')) {
      const t = cur ? cur + ' ' + w : w;
      if (c.measureText(t).width > maxW && cur) { out.push(cur); cur = w; }
      else cur = t;
    }
    if (cur) out.push(cur);
    return out;
  }
  // Numbered kicker + hairline — same furniture as SectionHead.
  function kicker(c: Ctx, x: number, y: number, idx: string, label: string, W: number, MR: number, size = 15) {
    (c as any).letterSpacing = '2px';
    c.font = `600 ${size}px ${F_MONO}`;
    c.fillStyle = SCR.red; c.fillText(idx, x, y);
    const iw = c.measureText(idx).width + size;
    c.fillStyle = SCR.mid; c.fillText(label.toUpperCase(), x + iw, y);
    const lw = c.measureText(label.toUpperCase()).width;
    (c as any).letterSpacing = '0px';
    c.strokeStyle = SCR.ln; c.lineWidth = 2;
    c.beginPath(); c.moveTo(x + iw + lw + 28, y - size * .3); c.lineTo(W - MR, y - size * .3); c.stroke();
  }
  function heading(c: Ctx, x: number, y: number, text: string, size: number, maxW: number, color = SCR.hi): number {
    (c as any).letterSpacing = `${(size * -.028).toFixed(1)}px`;
    c.font = `700 ${size}px ${F_HEAD}`;
    c.fillStyle = color;
    const lh = Math.round(size * 1.14);
    const top = y - ASC(size);
    const lines = wrapText(c, text, maxW);
    for (const line of lines) { c.fillText(line, x, y); y += lh; }
    (c as any).letterSpacing = '0px';
    return top + lines.length * lh;
  }
  function leader(c: Ctx, x1: number, x2: number, y: number) {
    c.strokeStyle = SCR.ln; c.lineWidth = 2; c.setLineDash([2, 8]);
    c.beginPath(); c.moveTo(x1, y); c.lineTo(x2, y); c.stroke();
    c.setLineDash([]);
  }

  const ASC = (size: number) => Math.round(size * .91);
  function pageTop(c: Ctx, W: number, MR: number, idx: string, label: string, hSize: number) {
    const ML = Math.round(W * .15), PT = Math.round(W * .04);
    kicker(c, ML, PT + 19, idx, label, W, MR);
    return { ML, hBase: PT + 25 + 42 + ASC(hSize) };
  }
  function drawLink(c: Ctx, x: number, base: number, text: string, alignRight = 0) {
    c.font = `600 15px ${F_HEAD}`;
    const lw = c.measureText(text).width;
    if (alignRight) x = alignRight - lw - 24;
    c.fillStyle = SCR.hi; c.fillText(text, x, base);
    c.fillStyle = SCR.red; c.fillText('→', x + lw + 10, base);
    c.strokeStyle = SCR.ln; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(x, base + 9); c.lineTo(x + lw + 24, base + 9); c.stroke();
  }

  // ── §01 page — the what-we-build menu (tags, not prices) ──
  function paintSec01(c: Ctx, W: number, H: number) {
    const t = copy.home.build, MR = Math.round(W * .15);
    const { ML, hBase } = pageTop(c, W, MR, '01', t.label, 72);
    const hBottom = heading(c, ML, hBase, t.h, 72, W - ML - MR);
    const rowsTop = hBottom + 48;
    const rows: [string, string, string][] = [...t.rows, [t.customWhat, t.customCta + ' →', '']];
    c.lineWidth = 2;
    for (let i = 0; i < rows.length; i++) {
      const top = rowsTop + i * 62, y = top + 36;
      c.strokeStyle = SCR.ln;
      c.beginPath(); c.moveTo(ML, top); c.lineTo(W - MR, top); c.stroke();
      const last = i === rows.length - 1;
      (c as any).letterSpacing = '-0.2px';
      c.font = `600 17px ${F_HEAD}`; c.fillStyle = SCR.hi;
      c.fillText(rows[i][0], ML, y);
      (c as any).letterSpacing = '0px';
      const ww = c.measureText(rows[i][0]).width;
      c.font = `600 17px ${F_MONO}`; c.fillStyle = last ? SCR.red : SCR.hi;
      const pw = c.measureText(rows[i][1]).width;
      c.fillText(rows[i][1], W - MR - pw, y);
      leader(c, ML + ww + 24, W - MR - pw - 24, y - 5);
      if (rows[i][2]) {
        c.font = `500 11px ${F_MONO}`; c.fillStyle = SCR.mid;
        const sw = c.measureText(rows[i][2].toUpperCase()).width;
        c.fillText(rows[i][2].toUpperCase(), W - MR - sw, y + 20);
      }
    }
    const rateBottom = rowsTop + rows.length * 62;
    c.strokeStyle = SCR.ln;
    c.beginPath(); c.moveTo(ML, rateBottom); c.lineTo(W - MR, rateBottom); c.stroke();
    c.font = `400 15.5px ${F_HEAD}`; c.fillStyle = SCR.mid;
    let ny = rateBottom + 32 + 19;
    const noteW = c.measureText('0').width * 60;
    for (const line of wrapText(c, t.note, noteW)) { c.fillText(line, ML, ny); ny += 26; }
  }

  // ── §02 page — the Blueprint sentence ──
  function paintSec02(c: Ctx, W: number, H: number) {
    const t = copy.home.mech, MR = Math.round(W * .15);
    const { ML, hBase } = pageTop(c, W, MR, '02', t.label, 52);
    const hBottom = heading(c, ML, hBase, t.h, 52, W - ML - MR);
    drawLink(c, ML, hBottom + 32 + 19, t.link);
  }

  // ── §03 page — proof, landscape: heading left, stamp right, the two
  // product columns beneath ──
  function paintSec03(c: Ctx, W: number, H: number) {
    const t = copy.home.proof, MR = Math.round(W * .15);
    const { ML, hBase } = pageTop(c, W, MR, '03', t.label, 48);
    const hBottom = heading(c, ML, hBase, t.h, 48, W - ML - MR - 282);
    c.save();
    c.translate(W - MR - 130, hBase + 22); c.rotate(-.04);
    c.strokeStyle = SCR.red; c.lineWidth = 2.5;
    c.beginPath(); c.roundRect(-125, -46, 250, 92, 10); c.stroke();
    (c as any).letterSpacing = '1.5px';
    c.font = `600 12px ${F_MONO}`; c.fillStyle = SCR.red; c.textAlign = 'center';
    c.fillText(t.stamp[0].toUpperCase(), 0, -18);
    c.font = `700 32px ${F_MONO}`; c.fillText(t.stamp[1], 0, 16);
    c.font = `600 10px ${F_MONO}`; c.fillText(t.stamp[2].toUpperCase(), 0, 36);
    c.textAlign = 'left'; (c as any).letterSpacing = '0px';
    c.restore();
    const gap = 56, colW = (W - ML - MR - gap) / 2;
    const colsTop = hBottom + 40;
    let gridBottom = colsTop;
    t.cards.forEach((card, i) => {
      const x = ML + i * (colW + gap);
      c.strokeStyle = SCR.ln; c.lineWidth = 2;
      c.beginPath(); c.moveTo(x, colsTop); c.lineTo(x + colW, colsTop); c.stroke();
      c.font = `700 28px ${F_HEAD}`; c.fillStyle = SCR.hi;
      const nBase = colsTop + 22 + 46;
      c.fillText(card.name, x, nBase);
      const nw = c.measureText(card.name).width;
      (c as any).letterSpacing = '1.5px';
      c.font = `600 11px ${F_MONO}`; c.fillStyle = SCR.mid;
      c.fillText(card.stage.toUpperCase(), x + nw + 18, nBase - 2);
      (c as any).letterSpacing = '0px';
      c.font = `400 16px ${F_HEAD}`; c.fillStyle = SCR.mid;
      let py = colsTop + 22 + 52 + 12 + 20;
      for (const line of wrapText(c, card.p, colW)) { c.fillText(line, x, py); py += 26; }
      gridBottom = Math.max(gridBottom, py - 26 + 8 + 22);
    });
    const bBase = gridBottom + 62 + 19;
    c.font = `400 15.5px ${F_HEAD}`; c.fillStyle = SCR.mid;
    let ey = bBase;
    for (const line of wrapText(c, t.exhibit, 470)) { c.fillText(line, ML, ey); ey += 26; }
    drawLink(c, 0, bBase, t.link, W - MR);
  }

  // ── §04 page — the objection, before the CTA ──
  function paintSec04(c: Ctx, W: number, H: number) {
    const t = copy.home.objection, MR = Math.round(W * .15);
    const { ML, hBase } = pageTop(c, W, MR, '04', t.label, 48);
    const hBottom = heading(c, ML, hBase, t.h, 48, W - ML - MR);
    c.font = `400 17px ${F_HEAD}`; c.fillStyle = SCR.mid;
    const proseW = c.measureText('0').width * 62;
    let py = hBottom + 24 + 20;
    for (const line of wrapText(c, t.p, proseW)) { c.fillText(line, ML, py); py += 28; }
  }

  // ── TOC page — the prospectus contents ──
  function paintToc(c: Ctx, W: number, H: number) {
    const ML = Math.round(W * .16), MR = ML;
    bar(c, ML, 74, 22, 22, 7, SCR.red);
    c.font = `700 26px ${F_HEAD}`; c.fillStyle = SCR.hi;
    c.fillText('Maquette.', ML + 36, 95);
    (c as any).letterSpacing = '2px';
    c.font = `600 12px ${F_MONO}`; c.fillStyle = SCR.mid;
    c.fillText('CONTENTS', ML, 190);
    (c as any).letterSpacing = '0px';
    c.strokeStyle = SCR.ln; c.lineWidth = 2;
    c.beginPath(); c.moveTo(ML + 92, 186); c.lineTo(W - MR, 186); c.stroke();
    const items: [string, string][] = [
      ['01', copy.home.build.label],
      ['02', copy.home.mech.label],
      ['03', copy.home.proof.label],
      ['04', copy.home.objection.label],
    ];
    let y = 260;
    for (const [idx, label] of items) {
      c.font = `500 15px ${F_MONO}`; c.fillStyle = SCR.red;
      c.fillText(idx, ML, y);
      c.font = `500 19px ${F_HEAD}`; c.fillStyle = SCR.body;
      c.fillText(label, ML + 44, y);
      const lw = c.measureText(label).width;
      leader(c, ML + 44 + lw + 18, W - MR, y - 5);
      y += 64;
    }
    c.font = `500 15px ${F_HEAD}`; c.fillStyle = SCR.red;
    c.fillText(copy.cta + '  →', ML, H - 84);
  }

  // Rounded-corner shape/box — the screens read as rounded cards, not slabs.
  function roundedShape(w: number, h: number, r: number) {
    const rr = Math.min(r, w / 2, h / 2);
    const hw = w / 2 - rr, hh = h / 2 - rr;
    const shape = new THREE.Shape();
    shape.moveTo(-hw, -h / 2);
    shape.lineTo(hw, -h / 2);
    shape.absarc(hw, -hh, rr, -Math.PI / 2, 0, false);
    shape.lineTo(w / 2, hh);
    shape.absarc(hw, hh, rr, 0, Math.PI / 2, false);
    shape.lineTo(-hw, h / 2);
    shape.absarc(-hw, hh, rr, Math.PI / 2, Math.PI, false);
    shape.lineTo(-w / 2, -hh);
    shape.absarc(-hw, -hh, rr, Math.PI, Math.PI * 1.5, false);
    return shape;
  }
  function roundedBox(w: number, h: number, depth: number, r: number, seg = 6) {
    const geo = new THREE.ExtrudeGeometry(roundedShape(w, h, r), { depth, bevelEnabled: false, curveSegments: seg });
    geo.translate(0, 0, -depth / 2);
    return geo;
  }

  // ═══════════════════════════════════════════════════════════════
  //  PANEL FACTORY — one permanently blurred face per page. Painted at
  //  1× (the blur melts any extra resolution); canvases + painters are
  //  kept so the faces repaint once the real fonts finish loading.
  // ═══════════════════════════════════════════════════════════════

  interface Panel {
    group: THREE.Group;
    bMat: THREE.MeshPhysicalMaterial;
    eMat: THREE.LineBasicMaterial;
    fMat: THREE.MeshBasicMaterial;
    seed: number;
    w1: number; w2: number; // drift frequencies
  }

  interface TexJob {
    cnv: HTMLCanvasElement; bcnv: HTMLCanvasElement;
    paint: (c: Ctx, W: number, H: number) => void;
    blur: THREE.CanvasTexture; blurPx: number;
  }
  const texJobs: TexJob[] = [];
  function paintJob(j: TexJob) {
    const c = j.cnv.getContext('2d')!;
    c.setTransform(1, 0, 0, 1, 0, 0);
    const W = j.cnv.width, H = j.cnv.height;
    c.fillStyle = SCR.bg; c.fillRect(0, 0, W, H);
    j.paint(c, W, H);
    const bc = j.bcnv.getContext('2d')!;
    bc.filter = 'none';
    bc.fillStyle = SCR.bg; bc.fillRect(0, 0, j.bcnv.width, j.bcnv.height);
    bc.filter = `blur(${j.blurPx}px)`;
    bc.drawImage(j.cnv, 0, 0);
    bc.filter = 'none';
    j.blur.needsUpdate = true;
  }
  function screenTex(w: number, h: number, ppu: number, paint: (c: Ctx, W: number, H: number) => void) {
    const cnv = document.createElement('canvas');
    cnv.width = Math.round(w * ppu); cnv.height = Math.round(h * ppu);
    const bcnv = document.createElement('canvas');
    bcnv.width = cnv.width; bcnv.height = cnv.height;
    const blur = new THREE.CanvasTexture(bcnv);
    blur.colorSpace = THREE.SRGBColorSpace;
    blur.anisotropy = Math.min(8, R.capabilities.getMaxAnisotropy());
    const job: TexJob = { cnv, bcnv, paint, blur, blurPx: Math.round(ppu / 11) };
    paintJob(job);
    texJobs.push(job);
    return job;
  }
  function repaintTextures() { for (const j of texJobs) paintJob(j); }

  // ShapeGeometry UVs are raw x/y coords — normalize to 0…1.
  function faceGeo(w: number, h: number, r: number) {
    const g = new THREE.ShapeGeometry(roundedShape(w, h, r), 8);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) + w / 2) / w, (uv.getY(i) + h / 2) / h);
    return g;
  }

  // Static opacities — the whole backdrop register: ghostly, the WebGL
  // sibling of .mini-card (opacity ~.12 + blur) on the sub-pages. The
  // display heading is near-black ink — any darker and a page under it
  // would eat the text's contrast. Tuned against the paper.
  const OP = { body: .3, edge: .42, face: .32 };

  function mkPanel(w: number, h: number, d: number, ppu: number, paint: (c: Ctx, W: number, H: number) => void): Panel {
    const g = new THREE.Group();
    const bMat = new THREE.MeshPhysicalMaterial({
      color: P.scr, roughness: .18, metalness: .7, clearcoat: .05,
      transparent: true, opacity: 0, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
    });
    const eMat = new THREE.LineBasicMaterial({ color: P.ink, transparent: true, opacity: 0 });
    const rad = Math.min(w, h) * .07;
    const box = roundedBox(w, h, d, rad);
    g.add(new THREE.Mesh(box, bMat));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(box), eMat));
    const job = screenTex(w, h, ppu, paint);
    const fGeo = faceGeo(w, h, rad);
    const fMat = new THREE.MeshBasicMaterial({ map: job.blur, toneMapped: false, transparent: true, opacity: 0 });
    const face = new THREE.Mesh(fGeo, fMat);
    face.position.z = d / 2 + .008;
    g.add(face);
    root.add(g);
    const seed = Math.random() * 100;
    return { group: g, bMat, eMat, fMat, seed, w1: .6 + Math.random() * .25, w2: .45 + Math.random() * .2 };
  }

  // ═══════════════════════════════════════════════════════════════
  //  CREATE PANELS + COMPANION ANCHORS
  // ═══════════════════════════════════════════════════════════════

  const panels = [
    mkPanel(10, 5.7, .12, 128, paintSec01),
    mkPanel(7, 4.3, .10, 160, paintSec02),
    mkPanel(2.8, 6, .10, 192, paintToc),
    mkPanel(7.5, 4.37, .08, 160, paintSec03),
    mkPanel(7.5, 4.37, .08, 160, paintSec04),
  ];

  // Resting camera basis (r=44, h=14, angle 2.0, lookAt(0,2,0)) — constants.
  const CAM_R = 44, CAM_H = 14, CAM_A = 2.0;
  const LOOK = new THREE.Vector3(0, 2, 0);
  const REST = new THREE.Vector3(Math.cos(CAM_A) * CAM_R, CAM_H, Math.sin(CAM_A) * CAM_R);
  const V_DIR = LOOK.clone().sub(REST).normalize();
  const V_RIGHT = new THREE.Vector3().crossVectors(V_DIR, new THREE.Vector3(0, 1, 0)).normalize();
  const V_UP = new THREE.Vector3().crossVectors(V_RIGHT, V_DIR).normalize();
  const HALF_H = REST.distanceTo(LOOK) * Math.tan(THREE.MathUtils.degToRad(16));
  const WPP = () => (2 * HALF_H) / innerHeight;   // world units per CSS px at the LOOK plane

  // ── COMPANIONS — each page hovers BEHIND its own section, on the side
  // OPPOSITE that section's card (§01 card left → page right, etc.); the
  // portrait TOC page keeps the hero company. Anchored in DOCUMENT space:
  // the page scrolls 1:1 with its section (the lerped sy adds a small
  // organic trailing). A pure function of scrollY — no scroll hijacking.
  const COMPANIONS = [
    { id: 's01', side: 1, yaw: -.25, s: .9 },
    { id: 's02', side: -1, yaw: .25, s: 1 },
    { id: 'hero', side: 1, yaw: -.2, s: .85 },   // the TOC page — hero's companion
    { id: 's03', side: 1, yaw: -.25, s: .8 },
    { id: 's04', side: -1, yaw: .25, s: .75 },
  ];
  const anchorEls = COMPANIONS.map((c) => document.getElementById(c.id));
  const anchorY = COMPANIONS.map(() => 0);       // doc-space center of each anchor, px
  const measureAnchors = () => anchorEls.forEach((el, i) => {
    if (el) anchorY[i] = el.offsetTop + el.offsetHeight / 2;
  });
  const _anchor = new THREE.Vector3();
  function anchorPose(i: number, syNow: number) {
    const halfW = HALF_H * (innerWidth / innerHeight);
    const screenYpx = anchorY[i] - syNow - innerHeight / 2;
    return _anchor.copy(LOOK)
      .addScaledVector(V_RIGHT, COMPANIONS[i].side * .58 * halfW)
      .addScaledVector(V_UP, -screenYpx * WPP())
      .addScaledVector(V_DIR, 3);                // a touch past the LOOK plane — fog softens it
  }

  // ── INTRO — "the descent". The pages hang in a tall COLUMN above the
  // scene; the camera starts high, among them, and rides down with them
  // (they fall too, slower — the camera overtakes them, so in frame they
  // rise and sweep past the viewer). As the camera passes a page's
  // layer, it peels off and glides down into its document anchor. The
  // pages fly near-solid and relax to the ghost register on landing.
  // One-shot, ~3.2s, crane feel (ease-in-out). v1 of this intro started
  // the cards BEHIND the camera and was invisible — never again.
  const T_CAM = 3.2;                              // camera descent duration
  const DROP = 64;                                // camera start height, world units along view-up
  const FALL = 10;                                // how far the pages themselves fall during the descent
  const STACK_H = [16, 26, 36, 46, 56];           // each page's layer in the column
  const STACK = COMPANIONS.map((c, i) =>
    LOOK.clone()
      .addScaledVector(V_UP, STACK_H[i])
      .addScaledVector(V_RIGHT, c.side * (4.2 + (i % 3) * .8))
      .addScaledVector(V_DIR, [2, -2, 1, 3, -1][i]),
  );
  const STACK_TILT = COMPANIONS.map((c, i) => ({
    rx: (i % 2 ? -.14 : .1),
    ry: c.side * .35,
    rz: (i % 2 ? .1 : -.12),
  }));
  // A page peels off when the camera's view actually PASSES its layer
  // (not on a wall-clock stagger — with an eased camera those two drift
  // apart and the frame goes empty mid-flight). peelT records the moment
  // of passage; the glide to the anchor then takes ~1.4s.
  const peelT = COMPANIONS.map(() => -1);

  // ═══════════════════════════════════════════════════════════════
  //  INPUT + RENDER — no scroll library: the parallax is a pure
  //  function of scrollY (lerped), the drift a pure function of time.
  // ═══════════════════════════════════════════════════════════════

  let tmx = 0, tmy = 0, smx = 0, smy = 0;
  const onMM = (e: MouseEvent) => { tmx = (e.clientX / innerWidth - .5) * 2; tmy = (e.clientY / innerHeight - .5) * 2; };
  addEventListener('mousemove', onMM, { passive: true });
  let maxScroll = 1;
  const measure = () => {
    maxScroll = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    measureAnchors();
  };
  function onR() { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); R.setSize(innerWidth, innerHeight); measure(); }
  addEventListener('resize', onR);
  measure();

  // Layout settles late (fonts) — repaint the pages with the real faces.
  (document as any).fonts?.ready?.then(() => { repaintTextures(); measure(); });

  const t0 = performance.now();
  let fid = 0;
  let sy = scrollY;

  const eo3 = (v: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, v)), 3);
  const eo2 = (v: number) => { const x = Math.max(0, Math.min(1, v)); return 1 - (1 - x) * (1 - x); };
  const _ip = new THREE.Vector3(), _camP = new THREE.Vector3(), _camT = new THREE.Vector3();

  function render() {
    fid = requestAnimationFrame(render);
    const t = (performance.now() - t0) / 1000;
    // The crane starts moving IMMEDIATELY and decelerates onto the rest
    // pose (quad-out). An ease-in start left the frame empty mid-flight.
    const eu = eo2(t / T_CAM);
    const drop = DROP * (1 - eu);
    const bloom = Math.min(t / .3, 1);    // no pop on the first frames

    sy += (scrollY - sy) * .06;

    smx += (tmx - smx) * .04;
    smy += (tmy - smy) * .04;

    // The backdrop bows out over the last ~1.4 viewports: the red CTA and
    // the footer own the end of the document alone.
    const endFade = Math.max(0, Math.min(1, (maxScroll - sy) / (innerHeight * 1.4)));

    for (let i = 0; i < panels.length; i++) {
      const p = panels[i];
      const c = COMPANIONS[i], tl = STACK_TILT[i];
      // the page's own fall while it still hangs in the column
      _ip.copy(STACK[i]).addScaledVector(V_UP, -FALL * eu);
      // peel-off: the moment the camera's view passes this page's layer,
      // it detaches and glides down into its document anchor
      const hNow = STACK_H[i] - FALL * eu;
      if (peelT[i] < 0 && drop * .86 <= hNow + 3) peelT[i] = t;
      const pe = peelT[i] < 0 ? 0 : eo3((t - peelT[i]) / 1.4);
      const a = anchorPose(i, sy);
      const px = _ip.x + (a.x - _ip.x) * pe;
      const py = _ip.y + (a.y - _ip.y) * pe;
      const pz = _ip.z + (a.z - _ip.z) * pe;
      // near-solid in flight (~2.7× the ghost register), ghost on landing
      const m = (1 + 1.7 * (1 - pe)) * bloom * endFade;
      p.group.position.set(px, py + Math.sin(t * p.w1 + p.seed) * .35 * pe, pz);
      p.group.rotation.set(
        tl.rx * (1 - pe),
        c.yaw * pe + tl.ry * (1 - pe),
        tl.rz * (1 - pe) + Math.sin(t * p.w2 + p.seed) * .02 * pe,
      );
      p.group.scale.setScalar(c.s + (1.1 - c.s) * (1 - pe));
      p.bMat.opacity = OP.body * m;
      p.eMat.opacity = Math.min(1, OP.edge * m);
      p.fMat.opacity = OP.face * m;
    }

    // Camera: the crane ride — starts DROP units up, among the pages,
    // and decelerates down onto the rest pose; the look target rides
    // slightly below its layer (a gentle downward pitch), landing exactly
    // on LOOK. Mouse sway fades in as it lands.
    const cA = CAM_A + smx * .06 * eu;
    _camP.set(Math.cos(cA) * CAM_R, CAM_H + smy * -.8 * eu, Math.sin(cA) * CAM_R)
      .addScaledVector(V_UP, drop);
    cam.position.copy(_camP);
    _camT.copy(LOOK).addScaledVector(V_UP, drop * .86);
    cam.lookAt(_camT);

    R.render(S, cam);
  }
  render();

  // Cleanup (no-op under plain MPA navigation; fires if a client router is ever added)
  document.addEventListener('astro:before-swap', () => {
    cancelAnimationFrame(fid);
    removeEventListener('resize', onR);
    removeEventListener('mousemove', onMM);
    R.dispose();
    (cv as any).__mq = false;
  }, { once: true });
}
