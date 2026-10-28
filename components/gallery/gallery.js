(function(){
/* Collection presentation:
 * Integrated 3D crumpled paper physics & opening animation ported from reference.
 * - Sine wave 3D strand positioning preserved
 * - Project color palettes preserved
 * - Active painting slightly rotated towards viewer preserved
 * - Fluid domain-warped folds, iso-contour scan lines, holographic rim glow, and opening un-crumple transition
 */
var PROJECTS = [
  {
    slug: 'northwind',
    title: 'Northwind',
    client: 'Northwind Logistics',
    year: 2026,
    category: 'Fleet Logistics Software',
    headline: 'Real-time telematics and autonomous freight dispatch operating system.',
    story: 'Replaced five legacy spreadsheet tools and manual radio dispatch with a single real-time control room. Automatically maps optimal transit routes, monitors cold-chain cargo temperatures every 30 seconds, and reroutes drivers around port congestion without dispatcher intervention.',
    palette: ['#0c1424', '#1e3a5f', '#38bdf8', '#070b14'],
    lineColor: '#38bdf8',
    tagline: 'Fleet operations, one screen.'
  },
  {
    slug: 'lumen',
    title: 'Lumen',
    client: 'Lumen Clinics',
    year: 2026,
    category: 'Clinical Booking Platform',
    headline: 'Automated patient triage, consent intake, and multi-practitioner booking.',
    story: 'Designed a calm, high-conversion patient booking platform for multi-location aesthetic clinics. Features interactive clinician availability calendars, automated digital pre-care consent forms, and zero-wait mobile check-ins that eliminated phone booking queues entirely.',
    palette: ['#250f14', '#782830', '#e0a458', '#120609'],
    lineColor: '#e0a458',
    tagline: 'Care that books itself.'
  },
  {
    slug: 'forge',
    title: 'Forge',
    client: 'Forge Industrial',
    year: 2025,
    category: 'Industrial Automation',
    headline: 'Autonomous supplier document extraction, SAP audit, and bank settlement.',
    story: 'Engineered an end-to-end invoice automation system for precision metal fabrication plants. Ingests supplier delivery receipts and invoices, cross-references line items against warehouse POs in SAP, and triggers bank payment disbursements with zero human paperwork.',
    palette: ['#141316', '#5c5248', '#ff6b35', '#0a090b'],
    lineColor: '#ff6b35',
    tagline: '14 hours of paperwork, zero.'
  },
  {
    slug: 'verdant',
    title: 'Verdant',
    client: 'Verdant Foods Direct',
    year: 2025,
    category: 'E-Commerce Platform',
    headline: 'Direct-to-consumer organic grocery and recurring harvest crate marketplace.',
    story: 'Built a high-performance headless culinary e-commerce store with custom subscription harvest crates. Features sub-second product filtering, live greenhouse inventory sync, recurring weekly orders, and a frictionless slide-out pantry crate builder.',
    palette: ['#0d1a14', '#2d5e3e', '#a3e635', '#060e0a'],
    lineColor: '#a3e635',
    tagline: 'Fresh, fast, headless.'
  },
  {
    slug: 'atlas',
    title: 'Atlas',
    client: 'Atlas Finance',
    year: 2025,
    category: 'Fintech Billing Engine',
    headline: 'International subscription billing and automated chargeback recovery.',
    story: 'Constructed an international revenue infrastructure engine for high-growth B2B subscriptions. Handles multi-currency SEPA and card settlements, automatically recovers failed customer payments via intelligent retry algorithms, and tracks cohort churn in real time.',
    palette: ['#140e1c', '#54417a', '#c084fc', '#09060e'],
    lineColor: '#c084fc',
    tagline: 'Billing without the sprawl.'
  }
];

var N = PROJECTS.length;
var PATH = {gap:31, amp:11, freq:(2*Math.PI)/N};
var TWIST = (8*Math.PI)/N;

function wrap(v,n){return ((v+n/2)%n+n)%n-n/2;}
function smooth(a,b,x){var t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);}
function smoothstep(val,min,max){var x=Math.max(0,Math.min(1,(val-min)/(max-min)));return x*x*(3-2*x);}
function ease(x){return x*x*x*(x*(x*6-15)+10);} // Quintic smootherstep from reference
function mod(v,n){return ((v%n)+n)%n;}
function pad(n){return String(n).padStart(2,'0');}

function artCss(p){
  return 'radial-gradient(120% 90% at 22% 18%, '+p.palette[2]+'40, transparent 62%),radial-gradient(100% 80% at 78% 82%, '+p.palette[1]+'66, transparent 58%),radial-gradient(60% 45% at 60% 35%, '+p.palette[2]+'22, transparent 70%),linear-gradient(165deg, '+p.palette[0]+', '+p.palette[3]+')';
}

function strand(phase,A){
  var pts=[],aspect=1.6;
  for(var o=-6.5;o<=6.5;o+=.08){
    var x=50+o*PATH.gap,y=50+Math.sin(o*PATH.freq)*PATH.amp;
    var dx=PATH.gap*aspect,dy=Math.cos(o*PATH.freq)*PATH.amp*PATH.freq;
    var len=Math.hypot(dx,dy),tw=Math.sin(o*TWIST+phase)*A;
    pts.push((pts.length?'L':'M')+(x-(dy/len)*tw/aspect).toFixed(2)+' '+(y+(dx/len)*tw).toFixed(2));
  }
  return pts.join(' ');
}

var stage = document.getElementById('showcase');
if(stage){
  var trackEl = document.getElementById('galleryTrack');
  var heroIntroEl = document.getElementById('heroIntro');
  var heroScrimEl = document.getElementById('heroScrim');
  var showcaseTopEl = document.getElementById('showcaseTop');
  var showcaseControlsEl = document.getElementById('showcaseControls');
  var metaEl = document.getElementById('meta');
  var heroScrollCueEl = document.getElementById('heroScrollCue');

  var piecesEl = document.getElementById('pieces');
  var roomEl = document.getElementById('room');
  var trailG = document.getElementById('trailG');
  var trailA = document.getElementById('trailA');
  var trailB = document.getElementById('trailB');
  var trailC = document.getElementById('trailC');
  var canvas = document.getElementById('crumple');
  var metaInner = document.getElementById('metaInner');
  var metaKick = document.getElementById('metaKick');
  var metaTitle = document.getElementById('metaTitle');
  var metaDesc = document.getElementById('metaDesc');
  var stackEl = document.getElementById('stack');
  var countEl = document.getElementById('count');
  var liveEl = document.getElementById('live');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  trailA.setAttribute('d',strand(0,2.4));
  trailB.setAttribute('d',strand(Math.PI,2.4));
  trailC.setAttribute('d',strand(0,0));

  var cards = [], active = -1, flatOn = true;
  var progress = 0, target = 0, velocity = 0;
  var userBaseTarget = 0;
  var dockProgress = 0, centerShiftPx = 0, centerShiftYPx = 0, lastVisual = 1e9, lastShift = 1e9, lastShiftY = 1e9, lastDock = -1;
  var W = 1, H = 1, gapPx = 1, ampPx = 1, fit = 1, xU = 1, yU = 1;
  var dragging = false, moved = false, pointerId = null, startX = 0, startY = 0, dragPx = 0, suppressClick = false;
  var gl = false, renderer = null, scene = null, camera = null, meshes = [];
  var startTime = performance.now(), inView = true, running = false, lastT = 0;
  var trailLock = false;
  var currentProjectBg = '';

  /* ------------------------------------------------------------------ */
  /* Crumpled Paper Shaders from reference                              */
  /* ------------------------------------------------------------------ */
  var NOISE_GLSL = `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
float hash11(float n){ return fract(sin(n*127.1)*43758.5453); }
`;

  var VERT = `
uniform float uTime;
uniform float uCrumple;
uniform float uGlitch;
uniform float uSeed;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vViewPos;
varying float vH;
varying float vWob;

${NOISE_GLSL}

vec4 sheet(vec2 p){
  vec3 q = vec3(p * 1.65 + uSeed * 13.7, uTime * 0.06);
  vec2 w = vec2(snoise(q * 0.7 + 3.1), snoise(q * 0.7 + 9.7)) * 0.55;
  q.xy += w;
  float h = snoise(q) * 0.62 + snoise(q * 2.05 + 5.3) * 0.27 + snoise(q * 3.6 + 1.7) * 0.08;
  vec2 lat = vec2(snoise(q + vec3(21.0, 0.0, 0.0)), snoise(q + vec3(0.0, 37.0, 0.0))) * 0.05;
  vec3 pos = vec3(p * (1.0 - 0.1 * uCrumple) + lat * uCrumple, h * 0.36 * uCrumple);
  return vec4(pos, h);
}

void main(){
  vec2 p = position.xy * (1.0 / 2.6);
  float e = 0.0035;
  vec4 a = sheet(p);
  vec3 b = sheet(p + vec2(e, 0.0)).xyz;
  vec3 c = sheet(p + vec2(0.0, e)).xyz;
  vec3 n = normalize(cross(b - a.xyz, c - a.xyz));

  vec3 pos = a.xyz * 2.6;

  float band = floor(p.y * 16.0 + floor(uTime * 14.0));
  float r = hash11(band);
  if (r > 0.74) pos.x += (hash11(band + 7.0) - 0.5) * 0.52 * uGlitch;

  vUv = uv;
  vH = a.w;
  vWob = snoise(vec3(uv * vec2(3.2, 4.0) + uSeed * 5.0, uTime * 0.09)) * 0.5 + 0.5;
  vN = normalMatrix * n;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

  var FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform float uTime;
uniform float uCrumple;
uniform float uGlitch;
uniform float uReveal;
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uLight;
uniform vec3 uAccent;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vViewPos;
varying float vH;
varying float vWob;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main(){
  vec3 n = normalize(vN);
  bool front = gl_FrontFacing;
  if (!front) n = -n;

  // Physical Archival Exhibition Board signed distance field (crisp 18px refined corners)
  vec2 pBox = abs(vUv - 0.5) - (vec2(0.5, 0.5) - vec2(0.024));
  float dRound = length(max(pBox, 0.0)) + min(max(pBox.x, pBox.y), 0.0) - 0.024;
  float e = -dRound;

  // Soft organic paper edge modulated by physical folds when crumpled
  float cut = uCrumple * (0.012 + 0.045 * vWob);
  float alpha = smoothstep(cut, cut + 0.004, e);
  if (alpha < 0.01) discard;

  // Paper lighting: half-lambert mapped through project palette ramp
  vec3 L = normalize(vec3(-0.35, 0.55, 0.75));
  vec3 V = normalize(-vViewPos);
  float diff = pow(dot(n, L) * 0.5 + 0.5, 1.35);
  float ao = smoothstep(-0.75, 0.55, vH);
  float shade = clamp(diff * mix(1.0, 0.35 + 0.9 * ao, uCrumple), 0.0, 1.0);
  vec3 col = shade < 0.5
    ? mix(uDeep, uMid, shade * 2.0)
    : mix(uMid, uLight, (shade - 0.5) * 2.0);

  // Exhibition board artwork texture
  vec3 t = texture2D(uTex, vUv).rgb;
  vec3 lit = t * mix(0.85 + 0.15 * shade, 1.0, smoothstep(0.3, 1.0, uReveal));
  col = mix(col, lit, uReveal);

  // Fine archival paper tooth texture
  col *= 0.985 + 0.03 * hash21(vUv * 850.0);

  // Topographic fold iso-contour elevation lines + travelling scan light on crumpled paper
  float hv = vH * 10.0;
  float f = fract(hv);
  float d = min(f, 1.0 - f);
  float line = 1.0 - smoothstep(0.0, fwidth(hv) * 1.3, d);
  float scan = exp(-pow((vUv.y - fract(uTime * 0.11)) * 8.0, 2.0));
  col += uAccent * line * uCrumple * (0.22 + 0.95 * scan);

  // 3D paper fold Fresnel rim glow when crumpled
  float fres = pow(1.0 - abs(dot(n, V)), 2.5);
  col += uAccent * fres * 0.28 * uCrumple;

  // Subtle physical paper stock edge bevel (clean 1px natural highlight, zero digital ticks/neon glow)
  float bevel = smoothstep(0.0, 0.003, e - cut) * (1.0 - smoothstep(0.003, 0.008, e - cut));
  col += vec3(0.12) * bevel * (0.6 + 0.4 * shade);

  if (!front) col *= 0.62;

  gl_FragColor = vec4(col, alpha);
}
`;

  /* ------------------------------------------------------------------ */
  /* Card Texture Generator (Big Description & Clear Platform Header)  */
  /* ------------------------------------------------------------------ */
  function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    var curY = y;
    for (var n = 0; n < words.length; n++) {
      var testLine = line + (line ? ' ' : '') + words[n];
      var metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n];
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
    return curY + lineHeight;
  }

  function createCardTexture(project) {
    var cv = document.createElement('canvas');
    cv.width = 1024;
    cv.height = 1312;
    var ctx = cv.getContext('2d');
    var W = cv.width, H = cv.height;

    var tex = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    var isMobile = (window.innerWidth <= 820);
    tex.anisotropy = isMobile ? 1 : 4;

    function renderCard(img) {
      ctx.save();
      ctx.clearRect(0, 0, W, H);

      // Archival Board substrate clip (crisp 24px corner radius)
      roundRect(ctx, 4, 4, W - 8, H - 8, 24);
      ctx.clip();

      // Deep matte obsidian / museum archival board ground
      var bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#131117');
      bg.addColorStop(0.55, '#0e0d12');
      bg.addColorStop(1, '#070709');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Subtle atmospheric warmth in palette tone
      var glow = ctx.createRadialGradient(W * 0.5, H * 0.22, 40, W * 0.5, H * 0.22, W * 0.85);
      glow.addColorStop(0, project.palette[1] + '26');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // --- Mounted Artwork Viewport (Upper Section, Top-Aligned) ---
      var padX = 40;
      var padTop = 36;
      var artW = W - padX * 2; // 944px
      var artH = 700;          // 700px
      var artR = 14;

      // Soft physical mounting drop shadow behind screenshot
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 10;
      roundRect(ctx, padX, padTop, artW, artH, artR);
      ctx.fillStyle = '#0a090d';
      ctx.fill();
      ctx.restore();

      // Clip and draw screenshot image (top-aligned so headers, carts, logos are clear!)
      ctx.save();
      roundRect(ctx, padX, padTop, artW, artH, artR);
      ctx.clip();

      if (img && img.complete && img.naturalWidth > 0) {
        var imgRatio = img.naturalWidth / img.naturalHeight;
        var artRatio = artW / artH;
        var sx = 0, sy = 0, sWidth = img.naturalWidth, sHeight = img.naturalHeight;

        if (imgRatio > artRatio) {
          sWidth = img.naturalHeight * artRatio;
          sx = (img.naturalWidth - sWidth) / 2;
        } else {
          sHeight = img.naturalWidth / artRatio;
          sy = 0; // Top-aligned so site navigation & cart drawer are front and center!
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, padX, padTop, artW, artH);

        // Delicate top edge vignette
        var innerShadow = ctx.createLinearGradient(padX, padTop, padX, padTop + 20);
        innerShadow.addColorStop(0, 'rgba(0,0,0,0.18)');
        innerShadow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = innerShadow;
        ctx.fillRect(padX, padTop, artW, 20);
      } else {
        var fb = ctx.createLinearGradient(padX, padTop, padX + artW, padTop + artH);
        fb.addColorStop(0, project.palette[0]);
        fb.addColorStop(1, project.palette[3]);
        ctx.fillStyle = fb;
        ctx.fillRect(padX, padTop, artW, artH);
      }
      ctx.restore();

      // Crisp 1px mounting frame around screenshot
      roundRect(ctx, padX, padTop, artW, artH, artR);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // --- Lower Story Section: Clean, Prominent, Big Text (No Small Pills) ---
      var ty = padTop + artH + 34; // ~770px
      var lineCol = project.lineColor || project.palette[2];

      // 1. Prominent Platform Type Tag (BIGGER, HIGH-VISIBILITY, NOT A DESIGN PILL)
      ctx.font = '800 21px "DM Mono", monospace';
      ctx.fillStyle = lineCol;
      ctx.letterSpacing = '0.06em';
      ctx.fillText(project.category.toUpperCase(), padX, ty + 24);

      // Client Name on Right
      ctx.font = '600 15px "DM Mono", monospace';
      ctx.fillStyle = 'rgba(245, 241, 233, 0.5)';
      ctx.textAlign = 'right';
      ctx.letterSpacing = '0.04em';
      ctx.fillText(project.client.toUpperCase(), padX + artW, ty + 24);
      ctx.textAlign = 'left';

      // 2. Project Title
      ctx.font = '800 50px "Bricolage Grotesque", sans-serif';
      ctx.fillStyle = '#f5f1e9';
      ctx.letterSpacing = '-0.02em';
      ctx.fillText(project.title, padX, ty + 80);

      // 3. Headline Scope
      ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(245, 241, 233, 0.9)';
      ctx.letterSpacing = '-0.01em';
      ctx.fillText(project.headline, padX, ty + 122);

      // Hairline divider
      ctx.fillStyle = 'rgba(245, 241, 233, 0.1)';
      ctx.fillRect(padX, ty + 148, artW, 1);

      // 4. The Main Description (MADE BIGGER, COMFORTABLE TO READ, NO SMALL TEXT)
      ctx.font = '400 23px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(245, 241, 233, 0.88)';
      wrapText(ctx, project.story, padX, ty + 196, artW, 38);

      // Subtle Outer Archival Board Bevel
      roundRect(ctx, 4, 4, W - 8, H - 8, 24);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    }

    renderCard(null);

    var img = new Image();
    var isPreview = typeof window !== 'undefined' && window.location.pathname.indexOf('/preview/') !== -1;
    var imgPath = (isPreview ? '../' : '') + 'assets/projects/' + project.slug + '.jpg';
    img.onload = function() {
      renderCard(img);
      tex.needsUpdate = true;
    };
    img.src = imgPath;

    return tex;
  }

  /* ------------------------------------------------------------------ */
  /* DOM Card Placeholders                                              */
  /* ------------------------------------------------------------------ */
  PROJECTS.forEach(function(p, i){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'artwork';
    var isPreview = typeof window !== 'undefined' && window.location.pathname.indexOf('/preview/') !== -1;
    var imgPath = (isPreview ? '../' : '') + 'assets/projects/' + p.slug + '.jpg';
    b.style.backgroundImage = 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(' + imgPath + '), ' + artCss(p);
    b.style.backgroundSize = 'cover';
    b.style.backgroundPosition = 'center';
    b.style.borderRadius = '20px';
    b.style.overflow = 'hidden';
    b.setAttribute('aria-label', 'Show ' + p.title + ': ' + p.tagline);
    b.setAttribute('aria-roledescription', 'artwork');
    b.addEventListener('click', function(){
      if (suppressClick) return;
      if (i === active) {
        toggleActiveFlat();
      } else {
        go(i);
      }
    });
    piecesEl.appendChild(b);
    cards.push(b);
  });

  var autoPlayEnabled = false;
  var autoPlayTimer = null;

  function toggleActiveFlat(){
    flatOn = !flatOn;
    var targetMesh = meshes.find(function(m){ return m.index === active; });
    if(targetMesh){
      targetMesh.burst = 1; // Glitch kick on toggle
    }
  }

  function setActive(i, animate){
    i = mod(i, N);
    if(i === active) return;
    var prevActive = active;
    active = i;
    var p = PROJECTS[i];
    var lineCol = p.lineColor || p.palette[2];
    metaKick.textContent = (p.category || p.badge).toUpperCase() + ' · ' + p.year;
    metaDesc.textContent = p.headline || (p.client + ' — ' + p.tagline);
    metaTitle.textContent = p.title;
    metaDesc.textContent = p.client + ' — ' + p.tagline;
    if (countEl) countEl.textContent = pad(i + 1) + ' — ' + pad(N);
    if (stackEl) stackEl.textContent = p.label || p.category;
    currentProjectBg = 'radial-gradient(65% 58% at 50% 42%, ' + p.palette[1] + '77, transparent 72%), radial-gradient(80% 65% at 75% 35%, rgba(200, 138, 88, 0.32), transparent 72%), radial-gradient(70% 60% at 20% 70%, rgba(232, 158, 40, 0.22), transparent 68%)';
    if (roomEl) {
      roomEl.style.background = currentProjectBg;
    }
    trailG.style.stroke = lineCol;
    if (metaKick) metaKick.style.color = lineCol;

    cards.forEach(function(c, k){
      if(k === i){ c.setAttribute('aria-current', 'true'); c.tabIndex = 0; }
      else { c.removeAttribute('aria-current'); c.tabIndex = -1; }
    });

    liveEl.textContent = (i + 1) + ' of ' + N + ': ' + p.title + ', ' + p.category + ', ' + p.year + '. ' + p.tagline;

    // Trigger glitch burst when newly active painting opens
    var newMesh = meshes.find(function(m){ return m.index === i; });
    if(newMesh && prevActive !== -1){
      newMesh.burst = 1;
    }

    if(animate && !reduce && metaInner.animate){
      metaInner.animate([
        {opacity: 0, transform: 'translateY(12px)'},
        {opacity: 1, transform: 'translateY(0)'}
      ], {duration: 700, easing: 'cubic-bezier(.16,1,.3,1)'});
    }
  }

  function isGalleryInView(){
    if(!trackEl) return true;
    var r = trackEl.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }

  function advanceAutoPlay(){
    if(document.hidden || dragging || !autoPlayEnabled) return;
    if(!isGalleryInView()) return;
    userBaseTarget = Math.round(userBaseTarget) + 1;
    target = userBaseTarget;
    flatOn = true;
    setActive(Math.round(target), true);
    if(!running) start();
    if(reduce){ progress = target; velocity = 0; update(performance.now(), 0); }
  }

  function go(i){
    var base = Math.round(userBaseTarget);
    userBaseTarget = i + Math.round((base - i) / N) * N;
    target = userBaseTarget;
    flatOn = true;
    setActive(i, true);
    autoPlayEnabled = true;
    resetAutoPlay();
    if(!running) start();
    if(reduce){ progress = target; velocity = 0; update(performance.now(), 0); }
  }

  function next(d){
    userBaseTarget = Math.round(userBaseTarget) + d;
    target = userBaseTarget;
    flatOn = true;
    setActive(Math.round(target), true);
    autoPlayEnabled = true;
    resetAutoPlay();
    if(!running) start();
    if(reduce){ progress = target; velocity = 0; update(performance.now(), 0); }
  }

  function startAutoPlay(delay){
    if(reduce) return;
    stopAutoPlay();
    var interval = (typeof delay === 'number') ? delay : 3600;
    autoPlayTimer = setTimeout(function tick(){
      advanceAutoPlay();
      if(autoPlayEnabled){
        autoPlayTimer = setTimeout(tick, 3600);
      }
    }, interval);
  }

  function stopAutoPlay(){
    if(autoPlayTimer){
      clearTimeout(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay(){
    stopAutoPlay();
    if(autoPlayEnabled){
      startAutoPlay(3600);
    }
  }

  function canWebGL2(){
    try { return !!document.createElement('canvas').getContext('webgl2') || !!document.createElement('canvas').getContext('webgl'); }
    catch(e){ return false; }
  }

  function initGL(){
    if(reduce || !window.THREE || !canWebGL2()){
      canvas.style.display = 'none';
      return;
    }
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
      });
    } catch(e) {
      renderer = null;
      canvas.style.display = 'none';
      return;
    }

    try {
      var isMobile = (window.innerWidth <= 820);
      renderer.setPixelRatio(isMobile ? Math.min(devicePixelRatio || 1, 1.0) : Math.min(devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
      camera.position.z = 8;

      var geom = isMobile
        ? new THREE.PlaneGeometry(2.6, 3.328, 12, 16)
        : new THREE.PlaneGeometry(2.6, 3.328, 64, 82);

      PROJECTS.forEach(function(p, i){
        var tex = createCardTexture(p);
        var mat = new THREE.ShaderMaterial({
          vertexShader: VERT,
          fragmentShader: FRAG,
          side: THREE.DoubleSide,
          transparent: true,
          uniforms: {
            uTime: { value: 0 },
            uCrumple: { value: (i === 0 ? 0 : 1) },
            uGlitch: { value: 0 },
            uReveal: { value: (i === 0 ? 1 : 0.05) },
            uSeed: { value: i * 7.3 + 1.2 },
            uTex: { value: tex },
            uDeep: { value: new THREE.Color('#0d0c0e') },
            uMid: { value: new THREE.Color(p.palette[0]) },
            uLight: { value: new THREE.Color(p.palette[1]) },
            uAccent: { value: new THREE.Color(p.lineColor || p.palette[2]) }
          }
        });
        mat.extensions = { derivatives: true };

        var mesh = new THREE.Mesh(geom, mat);
        mesh.frustumCulled = false;
        scene.add(mesh);
        meshes.push({
          mesh: mesh,
          index: i,
          project: p,
          curFlat: (i === 0 ? 1 : 0),
          burst: 0,
          nextGlitch: 2.0 + Math.random() * 2.5,
          gStart: -10,
          gDur: 0.3
        });
      });

      gl = true;
      stage.classList.add('has-gl');
    } catch(e) {
      gl = false;
      renderer = null;
      canvas.style.display = 'none';
      stage.classList.remove('has-gl');
    }
  }

  var cachedTotalTravel = 0, cachedTrackTop = 0;
  var lastHeroTransform = '', lastHeroOpacity = '', lastHeroPe = '';
  var lastControlsOp = '';

  function updateScroll(){
    var isMobile = (window.innerWidth <= 820);
    if(isMobile){
      dockProgress = 1;
      centerShiftPx = 0;
      centerShiftYPx = 0;
      target = userBaseTarget;
      if(heroIntroEl && (heroIntroEl.style.transform || heroIntroEl.style.opacity)){
        heroIntroEl.style.transform = '';
        heroIntroEl.style.opacity = '';
        heroIntroEl.style.pointerEvents = '';
      }
      return;
    }

    if(!trackEl) return;
    var totalTravel = cachedTotalTravel;
    if(totalTravel <= 0){
      dockProgress = 1;
      centerShiftPx = 0;
      centerShiftYPx = 0;
      target = userBaseTarget;
      return;
    }

    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var scrolled = Math.max(0, Math.min(totalTravel, scrollY - cachedTrackTop));

    var lockTravel = Math.min(200, totalTravel * 0.25);
    var dockTravel = Math.max(1, totalTravel - lockTravel);
    var dockRatio = Math.min(1, scrolled / dockTravel);
    dockProgress = dockRatio * dockRatio * (3 - 2 * dockRatio);

    var maxShiftPx = (W > 900) ? W * 0.22 : ((W > 600) ? W * 0.13 : 0);
    centerShiftPx = maxShiftPx * (1 - dockProgress);
    centerShiftYPx = 0;

    // Scroll has NO effect on carousel rotation
    target = userBaseTarget;

    // Hero text scrolls UP naturally during docking
    if(heroIntroEl){
      var textScrollY = scrolled * 1.25;
      var textOpacity = Math.max(0, 1 - (scrolled / (dockTravel * 0.75)));
      var roundedOp = textOpacity.toFixed(3);
      var transStr = 'translate3d(0,calc(-50% - ' + textScrollY.toFixed(1) + 'px),0)';

      if(transStr !== lastHeroTransform){
        lastHeroTransform = transStr;
        heroIntroEl.style.transform = transStr;
      }
      if(roundedOp !== lastHeroOpacity){
        lastHeroOpacity = roundedOp;
        heroIntroEl.style.opacity = roundedOp;
      }
      var pe = textOpacity > 0.05 ? 'auto' : 'none';
      if(pe !== lastHeroPe){
        lastHeroPe = pe;
        heroIntroEl.style.pointerEvents = pe;
      }
    }

    // Scrim fades out as carousel centers (desktop only)
    if(heroScrimEl){
      var scrimOpacity = Math.max(0, 1 - dockProgress * 1.2).toFixed(3);
      if(heroScrimEl.__op !== scrimOpacity){
        heroScrimEl.__op = scrimOpacity;
        heroScrimEl.style.opacity = scrimOpacity;
      }
    }

    // Controls & top brand fade in as carousel centers
    var controlsOpacity = Math.max(0, Math.min(1, (dockProgress - 0.25) / 0.75)).toFixed(2);
    if(controlsOpacity !== lastControlsOp){
      lastControlsOp = controlsOpacity;
      if(showcaseControlsEl) showcaseControlsEl.style.opacity = controlsOpacity;
      if(metaEl) metaEl.style.opacity = controlsOpacity;
      if(stackEl) stackEl.style.opacity = controlsOpacity;
      if(showcaseTopEl) showcaseTopEl.style.opacity = controlsOpacity;
    }

    // Auto-play: Only enable once docking has completed (dockProgress >= 0.95)
    if(dockProgress >= 0.95){
      if(!autoPlayEnabled){
        autoPlayEnabled = true;
        startAutoPlay(2200);
      }
    } else {
      if(autoPlayEnabled && scrollY < 20){
        autoPlayEnabled = false;
        stopAutoPlay();
      }
    }
  }

  var lastMeasureW = 0, lastMeasureH = 0;
  function measure(){
    var r = stage.getBoundingClientRect();
    var nw = Math.max(1, r.width);
    var nh = Math.max(1, r.height);
    if(lastMeasureW > 0 && Math.abs(nw - lastMeasureW) < 2 && Math.abs(nh - lastMeasureH) < 120){
      return;
    }
    lastMeasureW = nw;
    lastMeasureH = nh;
    W = nw;
    H = nh;

    if(trackEl){
      var rTrack = trackEl.getBoundingClientRect();
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      cachedTrackTop = rTrack.top + scrollY;
      cachedTotalTravel = Math.max(0, trackEl.offsetHeight - window.innerHeight);
    }

    var baseH = H * 0.577, baseW = H * 0.472;
    fit = Math.min(1, (W * 0.8) / baseW);
    stage.style.setProperty('--card-w', (baseW * fit).toFixed(1) + 'px');
    stage.style.setProperty('--card-h', (baseH * fit).toFixed(1) + 'px');
    gapPx = W * PATH.gap / 100;
    ampPx = H * PATH.amp / 100;
    if(renderer){
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      if (camera.aspect < 1.0) {
        // In portrait mode, push camera back slightly so the card doesn't overflow horizontally
        camera.position.z = 8 + (1.0 - camera.aspect) * 6.0;
      } else {
        camera.position.z = 8;
      }
      camera.updateProjectionMatrix();
      var vh = 2 * camera.position.z * Math.tan((camera.fov / 2) * Math.PI / 180);
      xU = PATH.gap / 100 * vh * camera.aspect;
      yU = PATH.amp / 100 * vh;
    }
    updateScroll();
    lastVisual = 1e9;
    lastShift = 1e9;
    lastShiftY = 1e9;
    lastDock = -1;
    update(performance.now(), 0);
  }

  function update(now, dt){
    updateScroll();
    if(reduce){ progress = target; velocity = 0; }
    else if(dt > 0){
      dt = Math.min(dt, 0.033);
      var k = 26, c = 10.2;
      var f = -k * (progress - target) - c * velocity;
      velocity += f * dt;
      progress += velocity * dt;
      if(Math.abs(progress - target) < 0.0005 && Math.abs(velocity) < 0.001){
        progress = target;
        velocity = 0;
      }
    }
    var visual = progress - (dragging ? dragPx / gapPx : 0);

    // Camera offset matches DOM shift
    if(camera && renderer){
      var vh = 2 * camera.position.z * Math.tan((camera.fov / 2) * Math.PI / 180);
      var unitsPerPixel = (vh * camera.aspect) / W;
      camera.position.x = -centerShiftPx * unitsPerPixel;
      camera.position.y = (centerShiftYPx || 0) * unitsPerPixel;
    }

    var bgCardBlur = (1 - dockProgress) * 12;
    var isMobile = (window.innerWidth <= 820);

    // Position DOM interactive targets along the sine path. Skip all style
    // writes when nothing moved, so an idle carousel costs no style recalcs.
    if(visual !== lastVisual || centerShiftPx !== lastShift || centerShiftYPx !== lastShiftY || dockProgress !== lastDock){
      lastVisual = visual;
      lastShift = centerShiftPx;
      lastShiftY = centerShiftYPx;
      lastDock = dockProgress;

      for(var i = 0; i < cards.length; i++){
        var o = wrap(i - visual, N), a = Math.abs(o);
        var x = o * gapPx + centerShiftPx, y = Math.sin(o * PATH.freq) * ampPx + (centerShiftYPx || 0);
        var op = gl ? 1 : Math.max(0, 1 - (a - 1.2));
        var card = cards[i];

        if(a > (isMobile ? 1.6 : 3.2)){
          if(card.style.opacity !== '0') card.style.opacity = '0';
          continue;
        }

        card.style.transform = isMobile
          ? 'translate3d(-50%,-50%,0) translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + (1 - Math.min(a, 1.6) * 0.14).toFixed(3) + ')'
          : 'translate3d(-50%,-50%,0) translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) rotateY(' + (-o * 12).toFixed(2) + 'deg) scale(' + (1 - Math.min(a, 1.6) * 0.14).toFixed(3) + ')';
        card.style.opacity = op.toFixed(3);
        card.style.zIndex = 100 - Math.round(a * 10);

        // With WebGL active these DOM cards are transparent hit targets, so CSS
        // filters would cost a full repaint every frame for zero visual gain.
        var cardB = 0;
        if(!gl && a >= 0.32 && bgCardBlur >= 0.1){
          cardB = Math.round(Math.min(12, bgCardBlur * Math.min(1.2, a * 1.2)) * 2) / 2;
        }
        if(card.__blur !== cardB){
          card.__blur = cardB;
          card.style.filter = cardB ? 'blur(' + cardB + 'px)' : 'none';
        }
      }

      // SVG DNA trail in sync (desktop only)
      if(!isMobile && trailG){
        var shiftSvgPercent = (centerShiftPx / W) * 100;
        var shiftSvgYPercent = ((centerShiftYPx || 0) / H) * 100;
        trailG.setAttribute('transform', 'translate(' + (shiftSvgPercent - wrap(visual, N) * PATH.gap).toFixed(2) + ' ' + shiftSvgYPercent.toFixed(2) + ')');
      }
    }

    // Render 3D Three.js crumpled paper meshes & opening animation
    if(renderer && scene){
      var t = (now - startTime) / 1000;
      var timeDelta = Math.min(dt || 0.016, 0.05);

      for(var m = 0; m < meshes.length; m++){
        var item = meshes[m], mesh = item.mesh, idx = item.index;
        var o2 = wrap(idx - visual, N), a2 = Math.abs(o2);

        // Center piece opens smoothly into crisp flat sheet; background pieces crumple
        var isCenter = (a2 < 0.35);
        var targetFlat = (isCenter && flatOn) ? 1 : 0;

        // Opening animation with quintic smootherstep ease
        item.curFlat += (targetFlat - item.curFlat) * (1 - Math.exp(-timeDelta * 4.2));
        if(Math.abs(targetFlat - item.curFlat) < 0.001) item.curFlat = targetFlat;
        var e = ease(item.curFlat);

        // Glitch burst on transition
        if(t > item.nextGlitch){
          item.gStart = t;
          item.gDur = 0.2 + Math.random() * 0.25;
          item.nextGlitch = t + 3.0 + Math.random() * 4.5;
        }
        var gx = (t - item.gStart) / item.gDur;
        var periodic = (gx >= 0 && gx < 1) ? (1 - gx) * (0.65 + 0.35 * Math.sin(t * 85)) : 0;
        item.burst *= Math.exp(-timeDelta * 3.5);
        var glitchVal = Math.max(periodic * 0.8, item.burst) * (reduce ? 0 : 0.85);

        mesh.material.uniforms.uTime.value = t;
        mesh.material.uniforms.uCrumple.value = (1 - e);
        mesh.material.uniforms.uGlitch.value = glitchVal;
        mesh.material.uniforms.uReveal.value = 0.05 + 0.95 * smoothstep(item.curFlat, 0.18, 0.92);

        // Keep our exact sine track positioning!
        mesh.visible = isMobile ? (a2 < 0.8) : (a2 < 2.1);
        mesh.position.set(o2 * xU, -Math.sin(o2 * PATH.freq) * yU, -a2 * 0.6);

        // Keep the painting slightly rotated at us (active piece at slight stylish gallery angle)
        var rotY = -o2 * 0.45 - 0.14; // -0.14 rad (~-8°) tilts slightly towards viewer
        var rotX = 0.05;
        var rotZ = (1 - (1 - e)) * -0.04;

        // Subtle breathing float from reference crumpled animation
        var k = 1 - e * 0.85;
        mesh.position.y += Math.sin(t * 0.8 + idx) * 0.035 * (0.3 + 0.7 * k);
        mesh.position.x += Math.sin(t * 0.37 + 1.3 + idx) * 0.015 * k;
        mesh.rotation.y = rotY + Math.sin(t * 0.31 + idx) * 0.035 * k;
        mesh.rotation.x = rotX + Math.sin(t * 0.23 + 0.7 + idx) * 0.02 * k;
        mesh.rotation.z = rotZ + Math.sin(t * 0.17 + 2.1 + idx) * 0.02 * k;
        mesh.scale.setScalar(fit * (1 - Math.min(a2, 1) * 0.1) * (0.92 + 0.08 * e));
      }
      renderer.render(scene, camera);
    }

    var nearestIndex = mod(Math.round(visual), N);
    if(nearestIndex !== active){
      setActive(nearestIndex, true);
    }
  }

  function loop(now){
    if(!inView || document.hidden){ running = false; lastT = 0; return; }
    var dt = lastT ? (now - lastT) / 1000 : 0;
    lastT = now;
    try {
      update(now, dt);
    } catch(err) {
      // Never let one bad frame permanently kill the carousel loop.
      console.error('[gallery] frame error', err);
    }
    if(running) requestAnimationFrame(loop);
  }

  function start(){
    if(running || reduce) return;
    running = true;
    lastT = 0;
    requestAnimationFrame(loop);
  }

  window.addEventListener('scroll', function(){
    if(reduce){
      update(performance.now(), 0);
    } else if(!running && inView){
      start();
    }
  }, {passive:true});

  if(heroScrollCueEl){
    function scrollToGallery(){
      var isMobile = (window.innerWidth <= 820);
      if(isMobile && stage){
        stage.scrollIntoView({behavior:'smooth'});
        return;
      }
      var totalTravel = cachedTotalTravel || (trackEl ? trackEl.offsetHeight - window.innerHeight : 0);
      var lockTravel = Math.min(200, totalTravel * 0.25);
      var dockTravel = Math.max(1, totalTravel - lockTravel);
      var targetY = cachedTrackTop + dockTravel + 15;
      window.scrollTo({top:targetY, behavior:'smooth'});
    }
    heroScrollCueEl.addEventListener('click', scrollToGallery);
    heroScrollCueEl.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); scrollToGallery(); }
    });
  }

  stage.addEventListener('mouseenter', function(){
    stopAutoPlay();
  });
  stage.addEventListener('mouseleave', function(){
    if(autoPlayEnabled) startAutoPlay(2400);
  });

  stage.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight'){ e.preventDefault(); next(1); }
    else if(e.key === 'ArrowLeft'){ e.preventDefault(); next(-1); }
  });

  stage.addEventListener('wheel', function(e){
    if(e.ctrlKey) return;
    // Only treat the gesture as horizontal when it is clearly horizontal;
    // trackpads often emit a little deltaX during a normal vertical scroll and
    // swallowing those events is what made the page feel stuck.
    var horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5;
    var d = horizontal ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if(!d || trailLock || Math.abs(d) < 24) return;
    e.preventDefault();
    trailLock = true;
    next(d > 0 ? 1 : -1);
    setTimeout(function(){ trailLock = false; }, 450);
  }, {passive:false});

  function onPointerMove(e){
    if(!dragging || e.pointerId !== pointerId) return;
    var dx = e.clientX - startX, dy = e.clientY - startY;
    if(!moved){
      if(Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)){
        moved = true;
        piecesEl.classList.add('dragging');
      } else if(Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)){
        finishDrag(e);
        return;
      }
    }
    if(moved){
      dragPx = dx;
      if(e.cancelable) e.preventDefault();
    }
  }

  function finishDrag(e){
    if(!dragging || (e && e.pointerId !== pointerId)) return;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', finishDrag);
    window.removeEventListener('pointercancel', finishDrag);

    var dx = dragPx;
    if(moved){
      var visual = progress - dx / (gapPx || 1);
      progress = visual;
      velocity = 0;
      var base = Math.round(visual);
      if(Math.abs(dx) > 80) base = dx < 0 ? Math.ceil(visual) : Math.floor(visual);
      userBaseTarget = base;
      target = userBaseTarget;
      flatOn = true;
      setActive(Math.round(target), true);
      dragPx = 0;
      suppressClick = true;
      setTimeout(function(){ suppressClick = false; }, 120);
      autoPlayEnabled = true;
      resetAutoPlay();
      if(reduce) update(performance.now(), 0);
    } else {
      dragPx = 0;
    }
    dragging = false;
    moved = false;
    pointerId = null;
    piecesEl.classList.remove('dragging');
  }

  piecesEl.addEventListener('pointerdown', function(e){
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    pointerId = e.pointerId;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startY = e.clientY;
    dragPx = 0;
    window.addEventListener('pointermove', onPointerMove, {passive:false});
    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', finishDrag);
  });

  canvas.addEventListener('webglcontextlost', function(e){
    e.preventDefault();
    gl = false;
    renderer = null;
    canvas.style.display = 'none';
    stage.classList.remove('has-gl');
    lastVisual = 1e9;
    update(performance.now(), 0);
  });

  prevBtn.addEventListener('click', function(){ next(-1); });
  nextBtn.addEventListener('click', function(){ next(1); });

  document.addEventListener('visibilitychange', function(){
    if(!document.hidden && autoPlayEnabled){ start(); startAutoPlay(2000); }
    else { stopAutoPlay(); }
  });

  initGL();
  measure();
  setActive(0, false);
  start();
  if(reduce) update(performance.now(), 0);

  if('ResizeObserver' in window){ new ResizeObserver(measure).observe(stage); }
  else { addEventListener('resize', measure); }

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      es.forEach(function(e){
        inView = e.isIntersecting;
        if(inView){ start(); if(autoPlayEnabled && !autoPlayTimer) startAutoPlay(2200); }
        else { stopAutoPlay(); }
      });
    }, {threshold:0}).observe(stage);
  }
}
})();
