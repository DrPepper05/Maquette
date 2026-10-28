/* ===== Crumpled Paper — standalone Three.js shader painting ===== */
(function () {
  var PROJECTS = window.LAB_PROJECTS;
  var SHADERS = window.LAB_PAPER;
  var canvas = document.getElementById('paperCanvas');
  var shell = document.getElementById('paperStage');
  if (!PROJECTS || !PROJECTS.length || !canvas || !shell) return;

  var roomEl = document.getElementById('paperRoom');
  var fallbackEl = document.getElementById('paperFallback');
  var numEl = document.getElementById('paperNum');
  var nameEl = document.getElementById('paperTitle');
  var catEl = document.getElementById('paperCategory');
  var tagEl = document.getElementById('paperTag');
  var countEl = document.getElementById('paperCount');
  var liveEl = document.getElementById('paperLive');
  var crumpleBtn = document.getElementById('paperCrumpleBtn');
  var glitchBtn = document.getElementById('paperGlitchBtn');
  var prevBtn = document.getElementById('paperPrev');
  var nextBtn = document.getElementById('paperNext');

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = PROJECTS.length;
  var active = 0;
  var flat = true;
  var targetFlat = 1;
  var curFlat = 1;
  var glitchBurst = 0;
  var gStart = -10;
  var gDur = 0.3;
  var nextGlitch = 2.8 + Math.random() * 2.6;
  var tiltX = 0;
  var tiltY = 0;
  var tiltTargetX = 0;
  var tiltTargetY = 0;
  var startTime = performance.now();
  var lastT = 0;
  var raf = 0;
  var running = false;
  var inView = true;
  var loadToken = 0;
  var currentImg = null;

  var renderer, scene, camera, mesh, texture;
  var W = 1;
  var H = 1;

  function mod(v, n) { return ((v % n) + n) % n; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function smoothstep(v, a, b) {
    var x = Math.max(0, Math.min(1, (v - a) / (b - a)));
    return x * x * (3 - 2 * x);
  }
  function ease(x) { return x * x * x * (x * (x * 6 - 15) + 10); }

  function wrapText(g, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    var curY = y;
    for (var i = 0; i < words.length; i++) {
      var test = line + (line ? ' ' : '') + words[i];
      if (g.measureText(test).width > maxWidth && i > 0) {
        g.fillText(line, x, curY);
        line = words[i];
        curY += lineHeight;
      } else {
        line = test;
      }
    }
    g.fillText(line, x, curY);
    return curY + lineHeight;
  }

  function roundRect(g, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + r, y, r);
    g.closePath();
  }

  function drawCard(g, p, img) {
    var CW = 1024;
    var CH = 1312;
    g.clearRect(0, 0, CW, CH);

    var bg = g.createLinearGradient(0, 0, CW * 0.35, CH);
    bg.addColorStop(0, p.palette[0]);
    bg.addColorStop(0.55, p.palette[1]);
    bg.addColorStop(1, p.palette[0]);
    g.fillStyle = bg;
    g.fillRect(0, 0, CW, CH);

    var glow = g.createRadialGradient(CW * 0.78, CH * 0.28, 10, CW * 0.78, CH * 0.28, CW * 0.95);
    glow.addColorStop(0, p.palette[2] + '46');
    glow.addColorStop(0.5, p.palette[1] + '22');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = glow;
    g.fillRect(0, 0, CW, CH);

    var vig = g.createRadialGradient(CW / 2, CH / 2, CH * 0.25, CW / 2, CH / 2, CH * 0.78);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(0.7, 'rgba(0,0,0,0.3)');
    vig.addColorStop(1, 'rgba(0,0,0,0.72)');
    g.fillStyle = vig;
    g.fillRect(0, 0, CW, CH);

    var padX = 40;
    var padTop = 36;
    var artW = CW - padX * 2;
    var artH = 760;
    var artR = 14;

    g.save();
    g.shadowColor = 'rgba(0,0,0,0.72)';
    g.shadowBlur = 26;
    g.shadowOffsetY = 10;
    roundRect(g, padX, padTop, artW, artH, artR);
    g.fillStyle = '#08070a';
    g.fill();
    g.restore();

    g.save();
    roundRect(g, padX, padTop, artW, artH, artR);
    g.clip();

    if (img && img.complete && img.naturalWidth > 0) {
      var iRatio = img.naturalWidth / img.naturalHeight;
      var aRatio = artW / artH;
      var sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (iRatio > aRatio) {
        sw = img.naturalHeight * aRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / aRatio;
        sy = 0;
      }
      g.drawImage(img, sx, sy, sw, sh, padX, padTop, artW, artH);

      var edge = g.createLinearGradient(padX, padTop, padX, padTop + 20);
      edge.addColorStop(0, 'rgba(0,0,0,0.2)');
      edge.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = edge;
      g.fillRect(padX, padTop, artW, 20);
    } else {
      var fb = g.createRadialGradient(padX + artW * 0.4, padTop + artH * 0.35, 40, padX + artW * 0.5, padTop + artH * 0.5, artW * 0.7);
      fb.addColorStop(0, (p.palette[2] || '#e89e28') + 'dd');
      fb.addColorStop(0.35, p.palette[1] || '#1e3a5f');
      fb.addColorStop(0.75, p.palette[0] || '#0c1424');
      fb.addColorStop(1, p.palette[3] || '#070b14');
      g.fillStyle = fb;
      g.fillRect(padX, padTop, artW, artH);
    }
    g.restore();

    roundRect(g, padX, padTop, artW, artH, artR);
    g.strokeStyle = 'rgba(255,255,255,0.09)';
    g.lineWidth = 1;
    g.stroke();

    var ty = padTop + artH + 34;
    var lineCol = p.lineColor;

    g.font = '800 21px "DM Mono", monospace';
    g.fillStyle = lineCol;
    g.letterSpacing = '0.06em';
    g.fillText(p.category.toUpperCase(), padX, ty + 24);

    g.font = '600 15px "DM Mono", monospace';
    g.fillStyle = 'rgba(245,241,233,0.5)';
    g.textAlign = 'right';
    g.letterSpacing = '0.04em';
    g.fillText(p.client.toUpperCase(), padX + artW, ty + 24);
    g.textAlign = 'left';

    g.font = '800 50px "Bricolage Grotesque", sans-serif';
    g.fillStyle = '#f5f1e9';
    g.letterSpacing = '-0.02em';
    g.fillText(p.title, padX, ty + 80);

    g.font = '600 24px "Plus Jakarta Sans", sans-serif';
    g.fillStyle = 'rgba(245,241,233,0.9)';
    g.letterSpacing = '-0.01em';
    g.fillText(p.headline, padX, ty + 122);

    g.fillStyle = 'rgba(245,241,233,0.1)';
    g.fillRect(padX, ty + 148, artW, 1);

    g.font = '400 23px "Plus Jakarta Sans", sans-serif';
    g.fillStyle = 'rgba(245,241,233,0.86)';
    g.letterSpacing = '0';
    wrapText(g, p.tagline + ' ' + p.client + ' — ' + p.headline, padX, ty + 194, artW, 38);

    roundRect(g, 4, 4, CW - 8, CH - 8, 24);
    g.strokeStyle = 'rgba(255,255,255,0.08)';
    g.lineWidth = 1.5;
    g.stroke();
  }

  function buildTexture(p) {
    var cv = document.createElement('canvas');
    cv.width = 1024;
    cv.height = 1312;
    var g = cv.getContext('2d');
    var src = p.dataUri || ('../../assets/projects/' + p.img);
    var token = ++loadToken;
    currentImg = null;

    var tex = new THREE.CanvasTexture(cv);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 4;

    var img = new Image();
    img.onload = function () {
      if (token !== loadToken) return;
      currentImg = img;
      drawCard(g, p, img);
      tex.needsUpdate = true;
    };
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      currentImg = img;
      drawCard(g, p, img);
      tex.needsUpdate = true;
    } else {
      drawCard(g, p, null);
    }

    return tex;
  }

  function roomFor(p) {
    return 'radial-gradient(60% 55% at 50% 45%, ' + p.palette[1] + '74, transparent 72%),' +
      'radial-gradient(75% 60% at 76% 32%, ' + p.palette[2] + '26, transparent 70%),' +
      'radial-gradient(60% 55% at 20% 72%, rgba(232,158,40,.10), transparent 68%)';
  }

  function setProject(i) {
    active = mod(i, N);
    var p = PROJECTS[active];
    numEl.textContent = pad(active + 1);
    nameEl.textContent = p.title;
    catEl.textContent = p.category + ' · ' + p.year;
    tagEl.textContent = p.tagline;
    countEl.textContent = pad(active + 1) + ' — ' + pad(N);
    roomEl.style.background = roomFor(p);
    shell.style.setProperty('--accent', p.lineColor);
    canvas.setAttribute('aria-label', p.title + ' — crumpled paper artwork, ' + p.category);
    liveEl.textContent = (active + 1) + ' of ' + N + ': ' + p.title + ', ' + p.category + ', ' + p.year + '.';

    if (mesh) {
      var u = mesh.material.uniforms;
      u.uMid.value.set(p.palette[0]);
      u.uLight.value.set(p.palette[1]);
      u.uAccent.value.set(p.lineColor);
      u.uSeed.value = active * 7.3 + 1.2;
      var next = buildTexture(p);
      var old = u.uTex.value;
      u.uTex.value = next;
      if (old) old.dispose();
    }

    flat = true;
    targetFlat = 1;
    if (reduce) curFlat = 1;
    updateCrumpleLabel();
    glitchBurst = 1;
    if (reduce) renderFrame(performance.now());
  }

  function updateCrumpleLabel() {
    crumpleBtn.textContent = flat ? 'Crumple' : 'Unfold';
    crumpleBtn.setAttribute('aria-pressed', flat ? 'false' : 'true');
  }

  function renderFrame(now) {
    if (!renderer || !mesh) return;
    var t = (now - startTime) / 1000;

    if (reduce) {
      curFlat = targetFlat;
      glitchBurst = 0;
    }

    var e = ease(curFlat);
    var k = 1 - e * 0.85;
    tiltX += (tiltTargetX - tiltX) * 0.06;
    tiltY += (tiltTargetY - tiltY) * 0.06;

    mesh.position.y = Math.sin(t * 0.8) * 0.035 * (0.3 + 0.7 * k);
    mesh.position.x = Math.sin(t * 0.37 + 1.3) * 0.015 * k;
    mesh.rotation.y = -0.14 + tiltX * 0.18 + Math.sin(t * 0.31) * 0.035 * k;
    mesh.rotation.x = 0.05 + tiltY * 0.12 + Math.sin(t * 0.23 + 0.7) * 0.02 * k;
    mesh.rotation.z = Math.sin(t * 0.17 + 2.1) * 0.02 * k;

    var u = mesh.material.uniforms;
    u.uTime.value = t;
    u.uCrumple.value = 1 - e;
    u.uGlitch.value = glitchValue(t);
    u.uReveal.value = 0.05 + 0.95 * smoothstep(curFlat, 0.18, 0.92);

    renderer.render(scene, camera);
  }

  function glitchValue(t) {
    if (reduce) return 0;
    if (t > nextGlitch) {
      gStart = t;
      gDur = 0.2 + Math.random() * 0.25;
      nextGlitch = t + 3.4 + Math.random() * 4.2;
    }
    var gx = (t - gStart) / gDur;
    var periodic = (gx >= 0 && gx < 1) ? (1 - gx) * (0.65 + 0.35 * Math.sin(t * 85)) : 0;
    return Math.max(periodic * 0.8, glitchBurst) * 0.85;
  }

  function update(now, dt) {
    if (!reduce) {
      curFlat += (targetFlat - curFlat) * (1 - Math.exp(-dt * 4.2));
      if (Math.abs(targetFlat - curFlat) < 0.001) curFlat = targetFlat;
      glitchBurst *= Math.exp(-dt * 3.5);
    }
    renderFrame(now);
  }

  function loop(now) {
    raf = 0;
    if (!inView || document.hidden) {
      running = false;
      lastT = 0;
      return;
    }
    var dt = lastT ? (now - lastT) / 1000 : 0;
    lastT = now;
    update(now, Math.min(dt || 0.016, 0.05));
    if (!reduce) raf = requestAnimationFrame(loop);
  }

  function start() {
    if (reduce || running) return;
    running = true;
    lastT = 0;
    raf = requestAnimationFrame(loop);
  }

  function measure() {
    if (!renderer) return;
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderFrame(performance.now());
  }

  function init() {
    if (!window.THREE || !SHADERS) {
      fallbackEl.hidden = false;
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
    } catch (err) {
      fallbackEl.hidden = false;
      canvas.style.display = 'none';
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.z = 8;

    var p = PROJECTS[active];
    texture = buildTexture(p);

    var geom = new THREE.PlaneGeometry(2.6, 3.328, 64, 82);
    var mat = new THREE.ShaderMaterial({
      vertexShader: SHADERS.VERT,
      fragmentShader: SHADERS.FRAG,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uCrumple: { value: 0 },
        uGlitch: { value: 0 },
        uReveal: { value: 1 },
        uSeed: { value: 1.2 },
        uTex: { value: texture },
        uDeep: { value: new THREE.Color('#0d0c0e') },
        uMid: { value: new THREE.Color(p.palette[0]) },
        uLight: { value: new THREE.Color(p.palette[1]) },
        uAccent: { value: new THREE.Color(p.lineColor) }
      }
    });
    mat.extensions = { derivatives: true };

    mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);
    canvas.dataset.engine = 'webgl';

    setProject(0);
    measure();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (!mesh) return;
        var current = PROJECTS[active];
        var cv = mesh.material.uniforms.uTex.value.image;
        if (!cv) return;
        drawCard(cv.getContext('2d'), current, currentImg);
        mesh.material.uniforms.uTex.value.needsUpdate = true;
        if (reduce) renderFrame(performance.now());
      });
    }

    if ('ResizeObserver' in window) {
      new ResizeObserver(measure).observe(canvas);
    } else {
      window.addEventListener('resize', measure);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) start();
      }, { threshold: 0 }).observe(shell);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        running = false;
        lastT = 0;
      } else if (inView) {
        start();
      }
    });

    start();
    renderFrame(performance.now());
  }

  /* ---------- controls ---------- */
  crumpleBtn.addEventListener('click', function () {
    flat = !flat;
    targetFlat = flat ? 1 : 0;
    if (reduce) curFlat = targetFlat;
    updateCrumpleLabel();
    glitchBurst = Math.max(glitchBurst, 0.55);
    start();
    if (reduce) renderFrame(performance.now());
  });

  glitchBtn.addEventListener('click', function () {
    glitchBurst = 1;
    gStart = (performance.now() - startTime) / 1000;
    gDur = 0.32;
    start();
    if (reduce) {
      var u = mesh && mesh.material.uniforms;
      if (u) {
        u.uGlitch.value = 0.7;
        renderer.render(scene, camera);
        setTimeout(function () {
          if (u) u.uGlitch.value = 0;
          renderer.render(scene, camera);
        }, 180);
      }
    }
  });

  prevBtn.addEventListener('click', function () { setProject(active - 1); start(); });
  nextBtn.addEventListener('click', function () { setProject(active + 1); start(); });

  canvas.addEventListener('pointerdown', function () { canvas.focus({ preventScroll: true }); });
  shell.addEventListener('pointermove', function (e) {
    var r = shell.getBoundingClientRect();
    tiltTargetX = ((e.clientX - r.left) / r.width) * 2 - 1;
    tiltTargetY = ((e.clientY - r.top) / r.height) * 2 - 1;
  });
  shell.addEventListener('pointerleave', function () {
    tiltTargetX = 0;
    tiltTargetY = 0;
  });

  window.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); setProject(active + 1); start(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); setProject(active - 1); start(); }
    else if (e.key === ' ' && tag !== 'button' && tag !== 'a') {
      e.preventDefault();
      crumpleBtn.click();
    } else if (e.key === 'g' || e.key === 'G') {
      glitchBtn.click();
    }
  });

  init();
})();
