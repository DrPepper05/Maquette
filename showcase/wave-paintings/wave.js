/* ===== Waving Paintings — standalone sine-wave presentation ===== */
(function () {
  var stage = document.getElementById('waveStage');
  var PROJECTS = window.LAB_PROJECTS;
  if (!stage || !PROJECTS || !PROJECTS.length) return;

  var cardsEl = document.getElementById('waveCards');
  var roomEl = document.getElementById('waveRoom');
  var trailG = document.getElementById('waveTrailG');
  var trailA = document.getElementById('waveTrailA');
  var trailB = document.getElementById('waveTrailB');
  var trailC = document.getElementById('waveTrailC');
  var numEl = document.getElementById('waveNum');
  var nameEl = document.getElementById('waveName');
  var catEl = document.getElementById('waveCat');
  var tagEl = document.getElementById('waveTag');
  var countEl = document.getElementById('waveCount');
  var liveEl = document.getElementById('waveLive');
  var prevBtn = document.getElementById('wavePrev');
  var nextBtn = document.getElementById('waveNext');

  var N = PROJECTS.length;
  var PATH = { gap: 31, amp: 8.5, freq: (Math.PI * 2) / N };
  var TWIST = (8 * Math.PI) / N;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 1;
  var H = 1;
  var gapPx = 1;
  var ampPx = 1;
  var progress = 0;
  var target = 0;
  var velocity = 0;
  var baseTarget = 0;
  var active = -1;
  var dragging = false;
  var moved = false;
  var pointerId = null;
  var startX = 0;
  var startY = 0;
  var dragPx = 0;
  var suppressClick = false;
  var lastT = 0;
  var rafId = 0;
  var inView = true;
  var autoTimer = 0;
  var hoverCount = 0;
  var wheelLock = false;
  var cards = [];

  function mod(v, n) { return ((v % n) + n) % n; }
  function wrap(v, n) { return ((v + n / 2) % n + n) % n - n / 2; }
  function pad(n) { return String(n).padStart(2, '0'); }

  function strand(phase, amp) {
    var pts = [];
    for (var o = -6.5; o <= 6.5; o += 0.08) {
      var x = 50 + o * PATH.gap;
      var y = 50 + Math.sin(o * PATH.freq) * PATH.amp;
      var dx = PATH.gap * 1.6;
      var dy = Math.cos(o * PATH.freq) * PATH.amp * PATH.freq;
      var len = Math.hypot(dx, dy) || 1;
      var tw = Math.sin(o * TWIST + phase) * amp;
      pts.push((pts.length ? 'L' : 'M') + (x - (dy / len) * tw / 1.6).toFixed(2) + ' ' + (y + (dx / len) * tw).toFixed(2));
    }
    return pts.join(' ');
  }

  trailA.setAttribute('d', strand(0, 2.4));
  trailB.setAttribute('d', strand(Math.PI, 2.4));
  trailC.setAttribute('d', strand(0, 0));

  function build() {
    PROJECTS.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'wave-card';
      b.setAttribute('aria-label', 'Show ' + p.title + ': ' + p.tagline);
      var imgSrc = p.dataUri || ('../../assets/projects/' + p.img);
      var artBg = 'radial-gradient(120% 90% at 22% 18%, ' + p.palette[2] + '40, transparent 62%), radial-gradient(100% 80% at 78% 82%, ' + p.palette[1] + '66, transparent 58%), linear-gradient(165deg, ' + p.palette[0] + ', ' + p.palette[3] + ')';
      b.innerHTML =
        '<span class="wave-card-frame" style="background: ' + artBg + '">' +
          '<img src="' + imgSrc + '" alt="' + p.title + '" draggable="false" loading="' + (i < 2 ? 'eager' : 'lazy') + '">' +
        '</span>' +
        '<span class="wave-card-label"><span><b>' + p.title + '</b><em>' + p.category + '</em></span><span>' + pad(i + 1) + '</span></span>';

      b.addEventListener('click', function () {
        if (suppressClick) return;
        if (i === active) return;
        goTo(i);
      });
      b.addEventListener('pointerenter', function () { hoverCount++; stopAuto(); });
      b.addEventListener('pointerleave', function () { hoverCount = Math.max(0, hoverCount - 1); startAuto(900); });
      b.addEventListener('focus', function () { hoverCount++; stopAuto(); });
      b.addEventListener('blur', function () { hoverCount = Math.max(0, hoverCount - 1); startAuto(900); });

      cardsEl.appendChild(b);
      cards.push(b);
    });
  }

  function roomFor(p) {
    return 'radial-gradient(60% 55% at 50% 45%, ' + p.palette[1] + '80, transparent 72%),' +
      'radial-gradient(75% 60% at 78% 30%, ' + p.palette[2] + '26, transparent 70%),' +
      'radial-gradient(60% 55% at 20% 70%, rgba(248, 136, 71,.10), transparent 68%)';
  }

  function setActive(i, announce) {
    i = mod(i, N);
    if (i === active) return;
    active = i;
    var p = PROJECTS[i];
    numEl.textContent = pad(i + 1);
    nameEl.textContent = p.title;
    catEl.textContent = p.category + ' · ' + p.year;
    tagEl.textContent = p.tagline;
    countEl.textContent = pad(i + 1) + ' — ' + pad(N);
    stage.style.setProperty('--accent', p.lineColor);
    roomEl.style.background = roomFor(p);

    cards.forEach(function (c, k) {
      if (k === i) c.setAttribute('aria-current', 'true');
      else c.removeAttribute('aria-current');
    });

    if (announce !== false) {
      liveEl.textContent = (i + 1) + ' of ' + N + ': ' + p.title + ', ' + p.category + ', ' + p.year + '. ' + p.tagline;
    }
  }

  function goTo(i) {
    var base = Math.round(baseTarget);
    baseTarget = i + Math.round((base - i) / N) * N;
    target = baseTarget;
    setActive(i);
    startAuto(2500);
    ensureLoop();
    if (reduce) { progress = target; velocity = 0; render(performance.now()); }
  }

  function next(d) {
    baseTarget = Math.round(baseTarget) + d;
    target = baseTarget;
    setActive(Math.round(target));
    startAuto(2500);
    ensureLoop();
    if (reduce) { progress = target; velocity = 0; render(performance.now()); }
  }

  function stopAuto() {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = 0;
    }
  }

  function startAuto(delay) {
    stopAuto();
    if (reduce || !inView || document.hidden || dragging || hoverCount > 0) return;
    autoTimer = setTimeout(function () {
      next(1);
      startAuto(4200);
    }, delay || 4200);
  }

  function measure() {
    var r = stage.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    var mobile = W < 720;
    var ratio = 0.72;
    var ch = mobile
      ? Math.min(H * 0.36, (W * 0.62) / ratio)
      : Math.min(H * 0.52, 460, (W * 0.3) / ratio);
    ch = Math.max(148, ch);
    var cw = ch * ratio;
    stage.style.setProperty('--cw', cw.toFixed(1) + 'px');
    stage.style.setProperty('--ch', ch.toFixed(1) + 'px');
    gapPx = mobile ? W * 0.66 : W * 0.315;
    ampPx = H * (mobile ? 0.05 : 0.085);
    render(performance.now());
  }

  function render(now) {
    var t = now / 1000;
    var visual = progress - (dragging ? dragPx / (gapPx || 1) : 0);

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var o = wrap(i - visual, N);
      var a = Math.abs(o);

      if (a > 2.7) {
        if (card.__hidden !== true) {
          card.style.opacity = '0';
          card.style.visibility = 'hidden';
          card.__hidden = true;
        }
        continue;
      }
      if (card.__hidden) {
        card.style.visibility = 'visible';
        card.__hidden = false;
      }

      var x = o * gapPx;
      var floatY = Math.sin(t * 0.75 + i * 1.7) * 3.4 * (1 - Math.min(a, 1) * 0.45);
      var y = Math.sin(o * PATH.freq) * ampPx + floatY;
      var scale = 1 - Math.min(a, 1.8) * 0.16;
      var rotY = -o * 13;
      var rotZ = o * 1.3 + Math.sin(t * 0.5 + i) * 0.55;

      card.style.transform =
        'translate3d(-50%,-50%,0) translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) ' +
        'rotateY(' + rotY.toFixed(2) + 'deg) rotateZ(' + rotZ.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';

      var op = a < 1.05 ? 1 : Math.max(0, 1 - (a - 1.05) * 1.35);
      card.style.opacity = op.toFixed(3);
      card.style.zIndex = String(100 - Math.round(a * 10));

      var blur = a < 0.4 ? 0 : Math.round(Math.min(4.5, (a - 0.4) * 2.4) * 4) / 4;
      var filt = blur
        ? 'blur(' + blur + 'px) brightness(' + (1 - Math.min(0.3, a * 0.1)).toFixed(2) + ')'
        : 'none';
      if (card.__filt !== filt) {
        card.__filt = filt;
        card.style.filter = filt;
      }
    }

    var shift = wrap(visual, N) * PATH.gap;
    trailG.setAttribute('transform', 'translate(' + (-shift).toFixed(2) + ' 0)');
  }

  function update(now, dt) {
    if (reduce) {
      progress = target;
      velocity = 0;
    } else if (dt > 0) {
      dt = Math.min(dt, 0.033);
      var k = 26;
      var c = 10.2;
      var f = -k * (progress - target) - c * velocity;
      velocity += f * dt;
      progress += velocity * dt;
      if (Math.abs(progress - target) < 0.0005 && Math.abs(velocity) < 0.001) {
        progress = target;
        velocity = 0;
      }
    }
    render(now);
  }

  function loop(now) {
    rafId = 0;
    if (!inView || document.hidden) {
      lastT = 0;
      return;
    }
    var dt = lastT ? (now - lastT) / 1000 : 0;
    lastT = now;
    update(now, dt);
    if (!reduce) rafId = requestAnimationFrame(loop);
  }

  function ensureLoop() {
    if (!rafId && !reduce) rafId = requestAnimationFrame(loop);
  }

  function onScrollIdle() {
    if (inView) ensureLoop();
  }

  function finishDrag(e) {
    if (!dragging || e.pointerId !== pointerId) return;
    if (moved) {
      var visual = progress - dragPx / (gapPx || 1);
      progress = visual;
      velocity = 0;
      var base = Math.round(visual);
      if (Math.abs(dragPx) > 80) base = dragPx < 0 ? Math.ceil(visual) : Math.floor(visual);
      baseTarget = base;
      target = baseTarget;
      setActive(Math.round(target));
      dragPx = 0;
      suppressClick = true;
      setTimeout(function () { suppressClick = false; }, 140);
      startAuto(2500);
      if (reduce) { progress = target; render(performance.now()); }
    } else {
      dragPx = 0;
    }
    dragging = false;
    moved = false;
    pointerId = null;
    stage.classList.remove('is-dragging');
    ensureLoop();
  }

  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    moved = false;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    dragPx = 0;
    stopAuto();
    stage.focus({ preventScroll: true });
  });

  window.addEventListener('pointermove', function (e) {
    if (!dragging || e.pointerId !== pointerId) return;
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    if (!moved) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        moved = true;
        stage.classList.add('is-dragging');
      } else if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
        dragging = false;
        pointerId = null;
        dragPx = 0;
        startAuto(2500);
        return;
      }
    }
    if (moved) {
      dragPx = dx;
      if (e.cancelable) e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', finishDrag);

  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (wheelLock) return;
    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 16) return;
    wheelLock = true;
    next(d > 0 ? 1 : -1);
    setTimeout(function () { wheelLock = false; }, 460);
  }, { passive: false });

  stage.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      next(-1);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      next(1);
    }
  });

  prevBtn.addEventListener('click', function () { next(-1); });
  nextBtn.addEventListener('click', function () { next(1); });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopAuto();
      lastT = 0;
    } else {
      startAuto(1200);
      ensureLoop();
    }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) {
        ensureLoop();
        startAuto(1200);
      } else {
        stopAuto();
      }
    }, { threshold: 0 }).observe(stage);
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(measure).observe(stage);
  } else {
    window.addEventListener('resize', measure);
  }

  build();
  setActive(0, false);
  measure();
  render(performance.now());
  ensureLoop();
  startAuto(1800);

  if (reduce) {
    progress = target = baseTarget;
    render(performance.now());
  } else {
    window.addEventListener('scroll', onScrollIdle, { passive: true });
  }
})();
