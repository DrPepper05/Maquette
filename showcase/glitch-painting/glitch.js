/* ===== Glitch Painting — standalone Canvas 2D signal displacement ===== */
(function () {
  var PROJECTS = window.LAB_PROJECTS;
  var canvas = document.getElementById('glitchCanvas');
  var shell = document.getElementById('glitchStage');
  if (!PROJECTS || !PROJECTS.length || !canvas || !shell) return;

  var ctx = canvas.getContext('2d', { alpha: false });
  var numEl = document.getElementById('glitchNum');
  var nameEl = document.getElementById('glitchTitle');
  var catEl = document.getElementById('glitchCategory');
  var tagEl = document.getElementById('glitchTag');
  var countEl = document.getElementById('glitchCount');
  var liveEl = document.getElementById('glitchLive');
  var triggerBtn = document.getElementById('glitchTrigger');
  var intensityEl = document.getElementById('glitchIntensity');
  var prevBtn = document.getElementById('glitchPrev');
  var nextBtn = document.getElementById('glitchNext');

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = PROJECTS.length;
  var active = 0;
  var base = 0.35;
  var I = 0.35;
  var burst = 0;
  var forced = 0;
  var nextBurst = 0;
  var now = 0;
  var lastT = 0;
  var raf = 0;
  var running = false;
  var inView = true;
  var W = 1;
  var H = 1;
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var baseC = document.createElement('canvas');
  var redC = document.createElement('canvas');
  var cyanC = document.createElement('canvas');
  var img = null;
  var loadToken = 0;
  var current = PROJECTS[0];
  var noisePattern = null;
  var seed = Math.random() * 1000;

  function mod(v, n) { return ((v % n) + n) % n; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function rand() {
    seed = (seed * 16807 + 194517) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  function makeNoise() {
    var c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    var g = c.getContext('2d');
    var data = g.createImageData(128, 128);
    for (var i = 0; i < data.data.length; i += 4) {
      var v = Math.random() * 255;
      data.data[i] = v;
      data.data[i + 1] = v;
      data.data[i + 2] = v;
      data.data[i + 3] = 255;
    }
    g.putImageData(data, 0, 0);
    noisePattern = ctx.createPattern(c, 'repeat');
  }

  function tint(src, color, dest) {
    dest.width = src.width;
    dest.height = src.height;
    var g = dest.getContext('2d');
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, dest.width, dest.height);
    g.drawImage(src, 0, 0);
    g.globalCompositeOperation = 'multiply';
    g.fillStyle = color;
    g.fillRect(0, 0, dest.width, dest.height);
    g.globalCompositeOperation = 'source-over';
  }

  function drawPlaceholder(g) {
    var grad = g.createLinearGradient(0, 0, W * 0.4, H);
    grad.addColorStop(0, current.palette[0]);
    grad.addColorStop(0.6, current.palette[1]);
    grad.addColorStop(1, current.palette[3]);
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);

    g.strokeStyle = 'rgba(255,255,255,0.06)';
    g.lineWidth = Math.max(1, dpr);
    for (var x = 0; x < W; x += 64 * dpr) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, H);
      g.stroke();
    }
    for (var y = 0; y < H; y += 64 * dpr) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(W, y);
      g.stroke();
    }

    g.fillStyle = 'rgba(245,241,233,0.3)';
    g.font = '500 ' + Math.round(13 * dpr) + 'px "DM Mono", monospace';
    g.fillText('ACQUIRING SIGNAL', W * 0.5 - 80 * dpr, H * 0.5);
  }

  function buildBase() {
    baseC.width = W;
    baseC.height = H;
    var g = baseC.getContext('2d');
    g.clearRect(0, 0, W, H);

    if (img && img.complete && img.naturalWidth > 0) {
      var iRatio = img.naturalWidth / img.naturalHeight;
      var sRatio = W / H;
      var sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (iRatio > sRatio) {
        sw = img.naturalHeight * sRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / sRatio;
        sy = (img.naturalHeight - sh) / 2;
      }
      g.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      var wash = g.createLinearGradient(0, 0, 0, H);
      wash.addColorStop(0, 'rgba(7,6,8,0.18)');
      wash.addColorStop(1, 'rgba(7,6,8,0.32)');
      g.fillStyle = wash;
      g.fillRect(0, 0, W, H);
    } else {
      drawPlaceholder(g);
    }

    tint(baseC, '#ff233d', redC);
    tint(baseC, '#00e6ff', cyanC);
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * dpr));
    H = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }
    buildBase();
    draw(now || performance.now(), true);
  }

  function setProject(i) {
    active = mod(i, N);
    current = PROJECTS[active];
    numEl.textContent = pad(active + 1);
    nameEl.textContent = current.title;
    catEl.textContent = current.category + ' · ' + current.year;
    tagEl.textContent = current.tagline;
    countEl.textContent = pad(active + 1) + ' — ' + pad(N);
    shell.style.setProperty('--accent', current.lineColor);
    canvas.setAttribute('aria-label', current.title + ' — glitch artwork, ' + current.category);
    liveEl.textContent = (active + 1) + ' of ' + N + ': ' + current.title + ', ' + current.category + ', ' + current.year + '.';

    var token = ++loadToken;
    img = null;
    buildBase();
    burst = 0.9;
    nextBurst = now + 2200 + rand() * 2600;
    var nextImg = new Image();
    nextImg.onload = function () {
      if (token !== loadToken) return;
      img = nextImg;
      buildBase();
      burst = Math.max(burst, 0.8);
      if (reduce) draw(performance.now(), true);
    };
    nextImg.src = current.dataUri || ('../../assets/projects/' + current.img);
    if (nextImg.complete && nextImg.naturalWidth > 0) {
      img = nextImg;
      buildBase();
      burst = Math.max(burst, 0.8);
    }

    if (reduce) draw(performance.now(), true);
  }

  function draw(time, force) {
    if (!force && (!W || !H)) return;
    now = time;

    if (!reduce && !force) {
      if (time > nextBurst) {
        burst = 1;
        nextBurst = time + 2500 + rand() * 3400;
      }
      var dt = lastT ? Math.min((time - lastT) / 1000, 0.05) : 0.016;
      lastT = time;
      burst *= Math.exp(-dt * 2.7);
    }
    if (reduce) burst = 0;
    I = clamp(base + burst * 0.95 + forced, 0, 1.35);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);

    ctx.drawImage(baseC, 0, 0);

    if (I > 0.015) {
      var slices = Math.round(3 + I * 15);
      var maxShift = W * 0.075 * I;
      for (var s = 0; s < slices; s++) {
        var sy = rand() * H;
        var sh = (0.006 + rand() * 0.055) * H;
        if (sy + sh > H) sh = H - sy;
        var dx = (rand() - 0.5) * 2 * maxShift;
        var dy = (rand() - 0.5) * H * 0.012 * I;
        ctx.save();
        ctx.globalAlpha = 0.55 + rand() * 0.45;
        if (I > 0.55 && rand() < 0.14) {
          ctx.filter = 'invert(1)';
        }
        ctx.drawImage(baseC, 0, sy, W, sh, dx, sy + dy, W, sh);
        ctx.restore();
      }

      var off = (1 + I * W * 0.013) * (rand() < 0.5 ? -1 : 1);
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.38 + I * 0.22;
      ctx.drawImage(redC, -off, 0);
      ctx.globalAlpha = 0.34 + I * 0.2;
      ctx.drawImage(cyanC, off, 0);
      ctx.globalCompositeOperation = 'source-over';

      if (I > 0.22) {
        var blocks = Math.round(1 + I * 4);
        for (var b = 0; b < blocks; b++) {
          var bx = rand() * W;
          var by = rand() * H;
          var bw = (0.02 + rand() * 0.2) * W;
          var bh = (0.002 + rand() * 0.018) * H;
          ctx.globalCompositeOperation = rand() < 0.5 ? 'difference' : 'screen';
          ctx.globalAlpha = 0.15 + rand() * 0.35;
          ctx.fillStyle = rand() < 0.6 ? current.lineColor : 'rgba(255,255,255,0.9)';
          ctx.fillRect(bx, by, bw, bh);
        }
        ctx.globalCompositeOperation = 'source-over';

        var barY = rand() * H;
        ctx.globalAlpha = 0.1 + I * 0.16;
        ctx.fillStyle = rand() < 0.5 ? '#ff233d' : '#00e6ff';
        ctx.fillRect(0, barY, W, (1 + rand() * 2) * dpr);
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.08 + I * 0.12;
      if (noisePattern) {
        ctx.fillStyle = noisePattern;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
  }

  function loop(time) {
    raf = 0;
    if (!inView || document.hidden) {
      running = false;
      lastT = 0;
      return;
    }
    draw(time, false);
    if (!reduce) raf = requestAnimationFrame(loop);
  }

  function start() {
    if (reduce || running) return;
    running = true;
    lastT = 0;
    raf = requestAnimationFrame(loop);
  }

  function burstNow() {
    burst = 1;
    nextBurst = now + 2400 + rand() * 3000;
    forced = 0;
    if (reduce) {
      forced = 0.75;
      draw(performance.now(), true);
      clearTimeout(burstNow._t);
      burstNow._t = setTimeout(function () {
        forced = 0;
        draw(performance.now(), true);
      }, 220);
      return;
    }
    start();
  }

  triggerBtn.addEventListener('click', burstNow);

  intensityEl.addEventListener('input', function () {
    base = clamp(parseInt(intensityEl.value, 10) / 100, 0, 1);
    I = base + burst * 0.95 + forced;
    if (reduce) draw(performance.now(), true);
    else start();
  });

  prevBtn.addEventListener('click', function () { setProject(active - 1); start(); });
  nextBtn.addEventListener('click', function () { setProject(active + 1); start(); });

  canvas.addEventListener('click', burstNow);

  window.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); setProject(active + 1); start(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); setProject(active - 1); start(); }
    else if ((e.key === ' ' && tag !== 'button' && tag !== 'a') || e.key === 'g' || e.key === 'G') {
      e.preventDefault();
      burstNow();
    }
  });

  window.addEventListener('resize', resize);

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

  makeNoise();
  setProject(0);
  resize();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (!img) {
        buildBase();
        draw(performance.now(), true);
      }
    });
  }
})();
