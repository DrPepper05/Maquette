/* ===== Story: From Foggy Idea to Finished Product WebGL Particles ===== */
(function() {
  if (!window.THREE) return;
  var cv = document.getElementById('gl');
  var story = document.getElementById('story');
  var stage = document.getElementById('stage');
  var bar = document.getElementById('bar');
  var pct = document.getElementById('pct');
  var lt = document.getElementById('lt');
  var ld = document.getElementById('ld');
  if (!cv || !story || !stage) return;

  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var R;
  try {
    R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: false });
  } catch (e) {
    return;
  }

  R.setClearColor(0x0e0d0f, 1);
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  var VH = 2 * 6 * Math.tan(THREE.MathUtils.degToRad(20));
  var VW = VH;
  var asp = 1;
  cam.position.z = 6;

  var CW = 680, CH = 460, SC = 2, PW = 3.4, PH = 2.3, G = null, plane = null, PP = innerHeight;
  var U = {
    uS: { value: 0 },
    uT: { value: 0 },
    uK: { value: 1000 },
    uSc: { value: 1 },
    uTouch: { value: 1 },
    uFin: { value: 0 },
    uHon: { value: 1 },
    uM: { value: new THREE.Vector3(99, 99, 0) },
    uHole: { value: new THREE.Vector2() },
    uHR: { value: new THREE.Vector2(1, 1) }
  };

  /* One particle set, five states: fog, scribble, wireframe, build, finished product. */
  var VS = `attribute vec3 p1,p2,p3;attribute vec4 aC;attribute float aD;
uniform float uS,uT,uK,uSc,uTouch,uFin,uHon;uniform vec3 uM;uniform vec2 uHole,uHR;
varying vec4 vC;varying float vSoft,vSq;
float st(float k){float f=clamp(uS-k,0.,1.),a=aD*.3;return smoothstep(a,a+.7,f);}
void main(){
float f1=st(0.),f2=st(1.),f3=st(2.),fog=1.-f1;
vec3 p=mix(mix(mix(position,p1,f1),p2,f2),p3,f3);
float sz=mix(mix(mix(.26,.013,f1),.011,f2),.031,f3),al=mix(mix(mix(.03,.9,f1),.95,f2),aC.a,f3);
vec3 c=mix(mix(mix(vec3(.62,.6,.58),vec3(.93,.9,.87),f1),vec3(1.,.69,.125),f2),aC.rgb,f3);
float amp=.3*fog;
p+=vec3(sin(p.y*1.3+uT*.06+aD*20.),sin(p.z*1.7+p.x*.9+uT*.05+aD*13.),sin(p.x*1.1+uT*.045+aD*7.))*amp;
vec2 d=p.xy-uM.xy;p.xy+=d*exp(-dot(d,d)/.4)*.9*uTouch;
vec4 wp=modelMatrix*vec4(p,1.);
al*=mix(1.,smoothstep(.7,1.1,length((wp.xy-uHole)/uHR)),fog*uHon);
al*=1.-uFin;
vec4 mv=modelViewMatrix*vec4(p,1.);
gl_PointSize=clamp(sz*uSc*uK/-mv.z,1.,64.);
gl_Position=projectionMatrix*mv;
if(al<.002)gl_Position=vec4(9.,9.,9.,1.);
vC=vec4(c,al);vSoft=fog;vSq=f3;}`;

  var FS = `varying vec4 vC;varying float vSoft,vSq;
void main(){vec2 c=gl_PointCoord*2.-1.;float r=length(c);
float m=mix(1.-smoothstep(.55,1.,r),exp(-r*r*4.),vSoft);m=mix(m,1.,vSq);
gl_FragColor=vec4(vC.rgb,vC.a*m);}`;

  /* The finished product: drawn with Instrument Serif cursive and Instrument Sans */
  function rr(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }

  function dot(g, x, y, r, c) {
    g.fillStyle = c;
    g.beginPath();
    g.arc(x, y, r, 0, 6.283);
    g.fill();
  }

  function drawUI(g) {
    var F = "'Plus Jakarta Sans',-apple-system,system-ui,sans-serif", S = "'Bricolage Grotesque',sans-serif", ink = '#17151a', card = '#faf7f2', gold = '#e89e28', bronze = '#c88a58', copper = '#c47a46', grey = '#6f6a62';
    g.setTransform(SC, 0, 0, SC, 0, 0);
    g.clearRect(0, 0, CW, CH);
    g.save();
    rr(g, 0, 0, CW, CH, 22);
    g.clip();
    g.fillStyle = '#ece7df';
    g.fillRect(0, 0, CW, CH);
    g.fillStyle = '#ddd6c8';
    g.fillRect(0, 0, CW, 40);
    ['#17151a', '#8a847b', '#c9c2b4'].forEach(function(c, i) { dot(g, 20 + i * 16, 20, 5, c); });
    g.fillStyle = card;
    rr(g, 84, 9, 360, 22, 11);
    g.fill();
    g.fillStyle = '#8a847b';
    g.font = '400 11px ' + F;
    g.fillText('northwind.co', 100, 24);
    dot(g, 50, 66, 9, gold);
    g.fillStyle = ink;
    g.font = 'italic 18px ' + S;
    g.fillText('Northwind', 66, 71);
    g.fillStyle = grey;
    g.font = '500 12px ' + F;
    ['Services', 'Work', 'Pricing'].forEach(function(t, i) { g.fillText(t, 330 + i * 66, 71); });
    g.fillStyle = ink;
    rr(g, 548, 52, 92, 28, 14);
    g.fill();
    g.fillStyle = '#ece7df';
    g.font = '600 12px ' + F;
    g.fillText('Book a call', 564, 70);

    g.fillStyle = ink;
    g.font = 'italic 36px ' + S;
    g.fillText('Your orders,', 40, 150);
    g.fillText('finally in order.', 40, 198);

    g.fillStyle = grey;
    g.font = '400 13px ' + F;
    g.fillText('We turn the mess behind your business', 40, 236);
    g.fillText('into one simple tool your team will use.', 40, 254);

    g.fillStyle = gold;
    rr(g, 40, 274, 132, 38, 19);
    g.fill();
    g.fillStyle = ink;
    g.font = '600 13px ' + F;
    g.textAlign = 'center';
    g.fillText('Start free', 106, 298);
    g.textAlign = 'left';

    g.fillStyle = ink;
    g.font = '500 12px ' + F;
    g.fillText('See how it works  \u2192', 188, 298);

    var gr = g.createLinearGradient(392, 104, 640, 304);
    gr.addColorStop(0, gold);
    gr.addColorStop(1, copper);
    g.fillStyle = gr;
    rr(g, 392, 104, 248, 200, 18);
    g.fill();

    g.save();
    rr(g, 392, 104, 248, 200, 18);
    g.clip();
    dot(g, 560, 150, 78, 'rgba(255,255,255,.28)');
    dot(g, 430, 290, 64, 'rgba(23,21,26,.12)');
    g.restore();

    g.fillStyle = card;
    rr(g, 412, 236, 150, 56, 12);
    g.fill();
    dot(g, 434, 264, 6, bronze);
    g.fillStyle = ink;
    g.font = '600 12px ' + F;
    g.fillText('Order #2041', 448, 261);
    g.fillStyle = '#8a847b';
    g.font = '400 11px ' + F;
    g.fillText('Shipped today', 448, 277);

    g.fillStyle = ink;
    rr(g, 560, 120, 64, 26, 13);
    g.fill();
    g.fillStyle = '#ece7df';
    g.font = '600 11px ' + F;
    g.fillText('+18%', 577, 137);

    [['Orders in one place', 'All channels, one list.', gold], ['Fewer manual steps', 'Routine work runs itself.', bronze], ['Built around you', 'Made for your team.', copper]].forEach(function(c, i) {
      var x = 40 + i * 208;
      g.fillStyle = card;
      rr(g, x, 330, 184, 100, 14);
      g.fill();
      dot(g, x + 28, 358, 12, c[2]);
      g.fillStyle = ink;
      g.font = '600 13px ' + F;
      g.fillText(c[0], x + 16, 396);
      g.fillStyle = grey;
      g.font = '400 11px ' + F;
      g.fillText(c[1], x + 16, 413);
    });
    g.restore();
  }

  function gen() {
    var N = innerWidth < 820 ? 7000 : 14000;
    var rs = 11, i;
    var rnd = function() {
      rs |= 0; rs = rs + 0x6D2B79F5 | 0;
      var t = Math.imul(rs ^ rs >>> 15, 1 | rs);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };

    var cvs = document.createElement('canvas');
    cvs.width = CW * SC;
    cvs.height = CH * SC;
    var g = cvs.getContext('2d');
    drawUI(g);

    var px = g.getImageData(0, 0, CW * SC, CH * SC).data;
    var lx = function(c) { return (c / CW - 0.5) * PW; };
    var ly = function(c) { return (0.5 - c / CH) * PH; };
    var P0 = new Float32Array(N * 3), P1 = new Float32Array(N * 3), P2 = new Float32Array(N * 3), P3 = new Float32Array(N * 3), CC = new Float32Array(N * 4), D = new Float32Array(N);
    var bl = [], b;
    for (b = 0; b < 8; b++) bl.push([(rnd() - 0.5) * 7, (rnd() - 0.5) * 4.4, (rnd() - 0.5) * 1.4, 0.6 + rnd() * 0.7]);
    function gs() { return (rnd() + rnd() + rnd() - 1.5) * 1.6; }

    /* wireframe outlines of every block */
    var segs = [], tot = 0, W = [[0, 0, 680, 460], [0, 0, 680, 40], [84, 9, 360, 22], [40, 52, 110, 28], [548, 52, 92, 28], [40, 118, 320, 96], [40, 222, 300, 36], [40, 274, 132, 38], [392, 104, 248, 200], [412, 236, 150, 56], [560, 120, 64, 26], [40, 330, 184, 100], [248, 330, 184, 100], [456, 330, 184, 100]];
    for (i = 0; i < 3; i++) W.push([56 + i * 208, 346, 24, 24]);
    W.forEach(function(r) { var x = r[0], y = r[1], w = r[2], h = r[3]; segs.push([x, y, x + w, y], [x + w, y, x + w, y + h], [x + w, y + h, x, y + h], [x, y + h, x, y]); });
    [[40, 150, 330, 150], [40, 198, 350, 198], [40, 236, 340, 236], [40, 254, 300, 254]].forEach(function(l) { segs.push(l); });
    segs.forEach(function(s) { s.push(Math.hypot(s[2] - s[0], s[3] - s[1])); tot += s[4]; });
    var si = 0, acc = 0;

    /* build grid */
    var cols = Math.floor(Math.sqrt(N * CW / CH)), rows = Math.floor(N / cols), nC = cols * rows, perm = [];
    for (i = 0; i < nC; i++) perm.push(i);
    for (i = nC - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), q = perm[i]; perm[i] = perm[j]; perm[j] = q; }

    for (i = 0; i < N; i++) {
      var k = i * 3, x, y, a = (i + rnd() * 0.5) / N * 6.2832;
      if (rnd() < 0.3) {
        x = (rnd() - 0.5) * 8.4;
        y = (rnd() - 0.5) * 5.6;
        P0[k + 2] = (rnd() - 0.5) * 2.4;
      } else {
        b = bl[Math.floor(rnd() * 8)];
        x = b[0] + gs() * b[3];
        y = b[1] + gs() * b[3] * 0.8;
        P0[k + 2] = b[2] + gs() * 0.4;
      }
      P0[k] = x; P0[k + 1] = y;
      P1[k] = Math.sin(a * 7 + 1) * 0.9 + Math.sin(a * 11 + 2) * 0.55 + Math.sin(a * 17 + 4) * 0.25 + (rnd() - 0.5) * 0.02;
      P1[k + 1] = Math.sin(a * 9 + 3) * 0.6 + Math.sin(a * 13) * 0.35 + Math.sin(a * 19 + 1) * 0.2 + (rnd() - 0.5) * 0.02;
      P1[k + 2] = Math.sin(a * 5) * 0.15;
      var d = (i + rnd()) / N * tot;
      while (acc + segs[si][4] < d && si < segs.length - 1) { acc += segs[si][4]; si++; }
      var s = segs[si], t = Math.min(1, (d - acc) / s[4]);
      P2[k] = lx(s[0] + (s[2] - s[0]) * t);
      P2[k + 1] = ly(s[1] + (s[3] - s[1]) * t);
      P2[k + 2] = 0.02 + (rnd() - 0.5) * 0.02;
      var u, v;
      if (i < nC) {
        var cl = perm[i];
        u = (cl % cols + 0.5 + (rnd() - 0.5) * 0.8) / cols;
        v = (Math.floor(cl / cols) + 0.5 + (rnd() - 0.5) * 0.8) / rows;
      } else {
        u = rnd(); v = rnd();
      }
      P3[k] = (u - 0.5) * PW;
      P3[k + 1] = (0.5 - v) * PH;
      P3[k + 2] = 0;
      var o = ((Math.min(CH * SC - 1, v * CH * SC | 0)) * CW * SC + Math.min(CW * SC - 1, u * CW * SC | 0)) * 4;
      CC[i * 4] = px[o] / 255;
      CC[i * 4 + 1] = px[o + 1] / 255;
      CC[i * 4 + 2] = px[o + 2] / 255;
      CC[i * 4 + 3] = px[o + 3] / 255;
      D[i] = rnd();
    }

    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(P0, 3));
    geo.setAttribute('p1', new THREE.BufferAttribute(P1, 3));
    geo.setAttribute('p2', new THREE.BufferAttribute(P2, 3));
    geo.setAttribute('p3', new THREE.BufferAttribute(P3, 3));
    geo.setAttribute('aC', new THREE.BufferAttribute(CC, 4));
    geo.setAttribute('aD', new THREE.BufferAttribute(D, 1));

    var pts = new THREE.Points(geo, new THREE.ShaderMaterial({
      vertexShader: VS,
      fragmentShader: FS,
      uniforms: U,
      transparent: true,
      depthWrite: false,
      depthTest: false
    }));
    pts.frustumCulled = false;
    pts.renderOrder = 1;

    var tex = new THREE.CanvasTexture(cvs);
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;

    plane = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false
    }));
    plane.renderOrder = 2;

    G = new THREE.Group();
    G.add(pts, plane);
    scene.add(G);
    if (calm) draw(0);
  }

  function sm(a, b, x) {
    var t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  var px = 0, py = 0, hasP = 0, mx = 0, my = 0, shown = -1, stg = -1, fxs = '', tmp = new THREE.Vector3();
  window.addEventListener('pointermove', function(e) {
    px = e.clientX / innerWidth * 2 - 1;
    py = -(e.clientY / innerHeight * 2 - 1);
    hasP = 1;
  });
  document.documentElement.addEventListener('mouseleave', function() { hasP = 0; });

  var LB = [
    ['Fig. 1: The brief', 'A foggy idea, on loan from you. Please touch it.'],
    ['Fig. 1: The brief', 'Still a scribble. This is where every project starts.'],
    ['Fig. 2: The maquette', 'The scribble, drawn as a plan. Free of charge.'],
    ['Fig. 3: The build', 'The plan, filling in.'],
    ['Fig. 4: The handover', 'The finished product, yours to keep.']
  ];

  function draw(now) {
    if (!G) return;
    var t = calm ? 0 : now / 1000;
    var s = Math.min(4, Math.max(0, -story.getBoundingClientRect().top / PP));
    var mob = asp < 1;
    var pxs = mob ? 0 : 1;
    var fin = sm(3.05, 3.95, s);

    U.uS.value = s;
    U.uT.value = t;
    U.uFin.value = fin;
    U.uTouch.value = 1 - sm(0.5, 1.3, s);
    plane.material.opacity = fin;

    mx += (px * hasP - mx) * 0.05;
    my += (py * hasP - my) * 0.05;

    var sc = mob ? VW * 0.86 / PW : Math.min(VW * 0.44 / PW, VH * 0.62 / PH);
    G.scale.setScalar(sc);
    U.uSc.value = sc;
    G.position.set(pxs * VW * 0.26, mob ? VH * 0.17 : 0, 0);

    if (mob) {
      U.uHole.value.set(0, -VH * 0.3);
      U.uHR.value.set(VW * 0.6, VH * 0.3);
    } else {
      U.uHole.value.set(-pxs * VW * 0.235, 0);
      U.uHR.value.set(VW * 0.24, VH * 0.55);
    }
    G.updateMatrixWorld();

    if (hasP && !calm) {
      tmp.set(px * VW / 2, py * VH / 2, 0);
      G.worldToLocal(tmp);
      U.uM.value.copy(tmp);
    } else {
      U.uM.value.set(99, 99, 0);
    }

    var fx = (50 + pxs * 25).toFixed(1) + '%';
    var gl = sm(2, 4, s).toFixed(2);
    if (fx + gl !== fxs) {
      fxs = fx + gl;
      stage.style.setProperty('--fx', fx);
      stage.style.setProperty('--gl', gl);
    }

    R.render(scene, cam);

    var cl = Math.round(100 * s / 4);
    if (cl !== shown && pct && bar) {
      shown = cl;
      pct.textContent = cl + '%';
      bar.style.width = cl + '%';
    }

    var k = Math.min(4, Math.round(s));
    if (k !== stg && lt && ld) {
      stg = k;
      lt.textContent = LB[k][0];
      ld.textContent = LB[k][1];
    }
  }

  function size() {
    var w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    PP = (document.querySelector('#story .panel') || {}).offsetHeight || h;
    R.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    R.setSize(w, h, false);
    cam.aspect = asp = w / h;
    cam.updateProjectionMatrix();
    VW = VH * asp;
    U.uK.value = h * R.getPixelRatio() / (2 * Math.tan(THREE.MathUtils.degToRad(20)));
    if (calm) draw(0);
  }

  size();
  window.addEventListener('resize', size);

  var go = false;
  function init() {
    if (go) return;
    go = true;
    gen();
  }

  var fl = document.fonts && document.fonts.load ? Promise.all([
    document.fonts.load("700 28px 'Bricolage Grotesque'"),
    document.fonts.load("600 14px 'Plus Jakarta Sans'")
  ]).catch(function() {}) : Promise.resolve();

  Promise.race([fl, new Promise(function(r) { setTimeout(r, 2500); })]).then(init);

  if (!calm) {
    (function loop(now) {
      var r = story.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) draw(now);
      requestAnimationFrame(loop);
    })(0);
  } else {
    window.addEventListener('scroll', function() { draw(0); }, { passive: true });
  }
})();
