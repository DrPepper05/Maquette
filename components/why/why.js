(function () {
  'use strict';

  const STATIONS = [
    {
      num: '01',
      tag: '01',
      title: 'Tell us about your brand',
      desc: "Share what your brand stands for and what you'd like to achieve. We'll take it from there.",
      color: '#d47860'
    },
    {
      num: '02',
      tag: '02',
      title: 'See your free demo',
      desc: 'We design a custom demo tailored to your brand. Explore it, evaluate the quality, and decide if our approach is right for you.',
      free: true,
      color: '#f88847'
    },
    {
      num: '03',
      tag: '03',
      title: 'Build it together',
      desc: 'We build with you, sharing progress every week. You stay in control of every detail and decision.',
      color: '#38bdf8'
    },
    {
      num: '04',
      tag: '04',
      title: "It's all yours",
      desc: 'You get the code, accounts, and documentation. Everything belongs to you, with no vendor lock-in.',
      color: '#34d399'
    }
  ];

  const mapCloth = document.getElementById('whyMapCloth');
  const canvas = document.getElementById('whyClothCanvas');
  const cols = document.getElementById('whyCols');
  const pb = document.getElementById('whyPb');
  const pp = document.getElementById('whyPp');
  const whyCount = document.getElementById('whyCount');
  const compassRose = document.getElementById('whyCompassRose');

  if (!mapCloth || !canvas || !cols || !pb || !pp) return;

  const PAD = 40;
  const A = 3.6, OM = 0.62;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);

  let sts = [];
  const pts = [];
  let tot = 0, cum = [];
  const frac = i => (cum.length && tot > 0) ? cum[Math.round((i + 0.5) / 4 * 240)] / tot : 0;
  let cur = 0;
  let calm = 0, calmTarget = 0;
  let lastIsMobile = null;

  function setupPathAndStations() {
    const isMobile = (window.innerWidth <= 860);
    if (isMobile === lastIsMobile) return;
    lastIsMobile = isMobile;

    const traceSvg = document.getElementById('whyTraceSvg');

    if (isMobile) {
      // 90-degree rotated serpentine road map: flows vertically from top to bottom
      // X_m oscillates between ~11% and ~17% from the left edge
      const X_m = f => 0.14 + 0.035 * Math.sin(f * Math.PI * 2.2);

      if (traceSvg) {
        traceSvg.setAttribute('viewBox', '0 0 500 1100');
      }

      // Generate vertical S-curve path
      pts.length = 0;
      for (let k = 0; k <= 240; k++) {
        const f = k / 240;
        pts.push([X_m(f) * 500, f * 1100]);
      }
      const d = 'M ' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L ');
      pb.setAttribute('d', d);
      pp.setAttribute('d', d);

      // Stations with vertical positioning and text to the right
      cols.innerHTML = STATIONS.map((s, i) => {
        const f = (i + 0.5) / 4;
        const topPct = (f * 100).toFixed(2);
        const nodeLeftPct = (X_m(f) * 100).toFixed(2);
        return `
          <button type="button" class="why-st why-st-v" data-index="${i}" aria-label="Step ${i + 1}: ${s.title}" style="--st-color: ${s.color}; top: ${topPct}%;">
            <span class="why-node" style="left: ${nodeLeftPct}%;">
              <u></u><i></i><b>${i + 1}</b>
            </span>
            <div class="why-st-body">
              <div class="why-st-head">
                <span class="why-tag">${s.tag}</span>
                ${s.free ? `<span class="why-free-badge">free</span>` : ''}
              </div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>
          </button>
        `;
      }).join('');

    } else {
      // Desktop horizontal sine wave
      const Y_d = f => 0.42 + 0.10 * Math.sin(f * Math.PI * 2.2);

      if (traceSvg) {
        traceSvg.setAttribute('viewBox', '0 0 1200 500');
      }

      pts.length = 0;
      for (let k = 0; k <= 240; k++) {
        const f = k / 240;
        pts.push([f * 1200, Y_d(f) * 500]);
      }
      const d = 'M ' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L ');
      pb.setAttribute('d', d);
      pp.setAttribute('d', d);

      cols.innerHTML = STATIONS.map((s, i) => `
        <button type="button" class="why-st" data-index="${i}" aria-label="Step ${i + 1}: ${s.title}" style="--st-color: ${s.color};">
          <span class="why-node" style="top:${(Y_d((i + 0.5) / 4) * 100).toFixed(2)}%">
            <u></u><i></i><b>${i + 1}</b>
          </span>
          ${s.free ? `<span class="why-free" style="top:${(Y_d(0.375) * 100).toFixed(2)}%">free</span>` : ''}
          <div class="why-st-body">
            <span class="why-tag">${s.tag}</span>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
        </button>
      `).join('');
    }

    tot = 0;
    cum = pts.map((p, k) => k ? (tot += Math.hypot(p[0] - pts[k - 1][0], p[1] - pts[k - 1][1])) : 0);

    sts = Array.from(cols.children);
    sts.forEach((e, i) => {
      e.addEventListener('click', () => {
        go(i);
        calmTarget = 1;
      });
      e.addEventListener('pointerenter', () => {
        go(i);
        calmTarget = 1;
      });
      e.addEventListener('pointerleave', () => {
        calmTarget = 0;
      });
      e.addEventListener('focus', () => {
        go(i);
        calmTarget = 1;
      });
      e.addEventListener('blur', () => {
        calmTarget = 0;
      });
      e.addEventListener('keydown', k => {
        if (k.key === 'ArrowRight' || k.key === 'ArrowDown') {
          go(cur + 1);
          if (sts[cur]) sts[cur].focus({ preventScroll: true });
        }
        if (k.key === 'ArrowLeft' || k.key === 'ArrowUp') {
          go(cur - 1);
          if (sts[cur]) sts[cur].focus({ preventScroll: true });
        }
      });
    });

    go(cur);
  }

  function go(i) {
    cur = Math.max(0, Math.min(3, i));
    const station = STATIONS[cur];

    // Update active class on columns
    sts.forEach((e, k) => {
      e.classList.toggle('on', k === cur);
      e.classList.toggle('done', k < cur);
    });

    // Advance golden progress line
    pp.style.strokeDashoffset = 1 - frac(cur);

    // Update count footer
    if (whyCount) {
      whyCount.textContent = `0${cur + 1} — 04 · ${station.title}`;
    }

    // Subtle compass reaction
    if (compassRose) {
      const angle = [15, 60, 115, 175][cur];
      compassRose.style.transform = `rotate(${angle}deg)`;
      compassRose.style.transition = 'transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)';
    }
  }

  // Global arrow navigation when inside or near the section
  mapCloth.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  });

  /* ============================================================ */
  /* TOPOGRAPHIC PAPER TEXTURE (PROCEDURAL CONTOURS)              */
  /* Maquette Studio Palette: Bronze, Gold, Cyan, Emerald         */
  /* ============================================================ */
  const BC = [
    [20, 16, 22], // 01 Intake: warm deep charcoal
    [22, 18, 14], // 02 Maquette: deep amber charcoal
    [14, 22, 32], // 03 Sprints: deep navy charcoal
    [13, 22, 18]  // 04 Handover: deep emerald charcoal
  ];

  const LC = [
    [212, 120, 96], // 01 Bronze #d47860
    [248, 136, 71], // 02 Gold #f88847
    [56, 189, 248], // 03 Cyan #38bdf8
    [52, 211, 153]  // 04 Emerald #34d399
  ];

  function field(x, y) {
    return 0.5 + 0.2 * Math.sin(x * 1.1 + Math.sin(y * 1.6) * 1.3) +
           0.2 * Math.sin(y * 1.2 + x * 0.5 + Math.sin(x * 0.8) * 1.4) +
           0.1 * Math.sin((x + y) * 2.3) +
           0.06 * Math.sin(x * 3.7 + y * 2.9);
  }

  function ln(v, fw, w) {
    const f = v - Math.floor(v);
    const d = Math.min(f, 1 - f) / Math.max(fw, 1e-4);
    return d >= w + 0.8 ? 0 : d <= w - 0.5 ? 1 : 1 - (d - (w - 0.5)) / 1.3;
  }

  const texCanvas = document.createElement('canvas');
  let texReady = false;

  function paintTopographicTexture(w, h) {
    const sc = dpr();
    const W = Math.round(w * sc);
    const H = Math.round(h * sc);
    if (!W || !H) return;

    texCanvas.width = W;
    texCanvas.height = H;
    const ctx = texCanvas.getContext('2d');
    const img = ctx.createImageData(W, H);
    const D = img.data;

    const isMobile = (w <= 860);

    const F = new Float32Array(W * H);
    // On mobile, zoom in the background so contour lines are wider, bolder and more spacious
    const ux = isMobile ? (2.4 / W) : (12 / W);
    const uy = isMobile ? (6.0 / H) : (5 / H);
    const scaleField = isMobile ? 10 : 16;

    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        F[j * W + i] = field(i * ux, j * uy) * scaleField;
      }
    }

    for (let j = 0; j < H; j++) {
      const yFrac = j / H;
      // On mobile, color transitions flow vertically down (Bronze -> Gold -> Cyan -> Emerald)
      // Smooth interpolation across the 4 stations
      const uY = Math.max(0, Math.min(3, (yFrac - 0.125) / 0.25));

      for (let i = 0; i < W; i++) {
        const k = j * W + i;
        const u = isMobile ? uY : Math.min(3, Math.max(0, (i / W) * 3.99));
        const p0 = Math.min(3, Math.floor(u));
        const p1 = Math.min(3, p0 + 1);
        const pf = u - p0;
        const blend = pf * pf * (3 - 2 * pf); // Smooth hermite blend

        const n = F[k];
        const fw = Math.abs(F[Math.min(W * H - 1, k + 1)] - n) + Math.abs(F[Math.min(W * H - 1, k + W)] - n);
        const c = ln(n, fw, 0.8) * 0.36;
        const ci = ln(n / 4, fw / 4, 1.3) * 0.58;

        // On mobile, full line vibrancy across the entire width of the card (no black cutout)
        const lineFade = isMobile ? 0.95 : (yFrac < 0.35 ? 1.0 : Math.max(0.12, 1.0 - Math.pow((yFrac - 0.35) / 0.65, 1.3) * 0.88));
        const lineVal = (c + ci) * lineFade;

        // Subtle fold crease shading
        const fold = (pf - 0.5) * 0.16 * (p0 % 2 ? -1 : 1);
        const shade = 1 + fold + (n / scaleField - 0.5) * 0.22;
        const gx = Math.min(ln(i * ux * 2, ux * 2, 0.5) + ln(j * uy * 2, uy * 2, 0.5), 1) * 0.04;
        const crease = 1 - Math.min(1, Math.min(pf, 1 - pf) * (isMobile ? H : W) / sc / 3);
        const g = (Math.random() - 0.5) * 3; // Fine grain noise

        for (let ch = 0; ch < 3; ch++) {
          const baseC = BC[p0][ch] * (1 - blend) + BC[p1][ch] * blend;
          const lineC = LC[p0][ch] * (1 - blend) + LC[p1][ch] * blend;
          let v = baseC * shade + lineC * lineVal + 245 * gx + g;
          if (crease > 0) v *= 1 - crease * 0.25;
          D[k * 4 + ch] = Math.min(255, Math.max(0, v));
        }

        // Card outer border hairline
        if (i < 2 || j < 2 || i > W - 3 || j > H - 3) {
          D[k * 4 + 0] = 232;
          D[k * 4 + 1] = 158;
          D[k * 4 + 2] = 40;
        }

        D[k * 4 + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    texReady = true;
  }

  /* ============================================================ */
  /* WEBGL LIQUID CLOTH SIMULATION                               */
  /* ============================================================ */
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true });
  let prog, loc = {};
  let vbo = null, ibo = null, count = 0;
  let glTex = null;

  if (gl) {
    const VS = `attribute vec2 a_uv;
    uniform vec2 u_size,u_cvs,u_off;uniform float u_pad,u_wallW,u_wallH,u_t,u_f,u_calm,u_A,u_OM;
    varying vec2 v_uv,v_p;
    float H(vec2 p){
      float tt=u_t*u_OM;
      vec2 q=p*0.0035;
      q+=0.8*vec2(sin(q.y*1.7+tt*0.41+1.3),sin(q.x*1.9-tt*0.37));
      q+=0.35*vec2(sin(q.y*3.7-tt*0.63),sin(q.x*4.1+tt*0.57+2.));
      float h=sin(q.x*2.1+sin(q.y*1.6+tt*0.5)*1.5+tt*0.3)
             +0.8*sin(q.y*2.6+sin(q.x*1.3-tt*0.45)*1.7-tt*0.25)
             +0.5*sin((q.x-q.y)*3.3+tt*0.7);
      float br=0.65+0.35*sin(tt*0.9+sin(p.x*0.003)*2.+p.y*0.002);
      vec2 W=vec2(u_wallW,u_wallH);
      for(int i=0;i<3;i++){
        float fi=float(i);
        vec2 c=W*(0.5+0.42*vec2(sin(tt*(0.23+0.07*fi)+fi*2.1),cos(tt*(0.19+0.05*fi)+fi*1.3)));
        vec2 d=(p-c)/(280.+60.*fi);
        h+=1.5*(0.6+0.4*sin(tt*1.3+fi*2.))*exp(-dot(d,d))*(i==1?-1.:1.);
      }
      return u_A*u_f*br*h*0.55;
    }
    void main(){
      vec2 c=u_size*.5,r=a_uv*u_size,p=u_off+r;
      float z=H(p);
      vec2 lat=vec2(H(p+vec2(137.,53.)),H(p+vec2(-91.,211.)))*.14;
      float s=(1.+0.02*u_calm)*(1.+z/1200.);
      vec2 sc=c+(r-c)*s+vec2(z*.35,-z*.12)+lat+u_pad;
      gl_Position=vec4(sc.x/u_cvs.x*2.-1.,1.-sc.y/u_cvs.y*2.,0.,1.);
      v_uv=a_uv;v_p=p;
    }`;

    const FS = `precision highp float;
    uniform sampler2D u_tex;uniform vec2 u_size;uniform float u_rad,u_wallW,u_wallH,u_t,u_f,u_A,u_OM;
    varying vec2 v_uv,v_p;
    float H(vec2 p){
      float tt=u_t*u_OM;
      vec2 q=p*0.0035;
      q+=0.8*vec2(sin(q.y*1.7+tt*0.41+1.3),sin(q.x*1.9-tt*0.37));
      q+=0.35*vec2(sin(q.y*3.7-tt*0.63),sin(q.x*4.1+tt*0.57+2.));
      float h=sin(q.x*2.1+sin(q.y*1.6+tt*0.5)*1.5+tt*0.3)
             +0.8*sin(q.y*2.6+sin(q.x*1.3-tt*0.45)*1.7-tt*0.25)
             +0.5*sin((q.x-q.y)*3.3+tt*0.7);
      float br=0.65+0.35*sin(tt*0.9+sin(p.x*0.003)*2.+p.y*0.002);
      vec2 W=vec2(u_wallW,u_wallH);
      for(int i=0;i<3;i++){
        float fi=float(i);
        vec2 c=W*(0.5+0.42*vec2(sin(tt*(0.23+0.07*fi)+fi*2.1),cos(tt*(0.19+0.05*fi)+fi*1.3)));
        vec2 d=(p-c)/(280.+60.*fi);
        h+=1.5*(0.6+0.4*sin(tt*1.3+fi*2.))*exp(-dot(d,d))*(i==1?-1.:1.);
      }
      return u_A*u_f*br*h*0.55;
    }
    void main(){
      vec2 p_box=abs((v_uv-0.5)*u_size)-(u_size*0.5-vec2(u_rad));
      float dist=length(max(p_box,0.0))+min(max(p_box.x,p_box.y),0.0)-u_rad;
      if(dist>=0.5) discard;
      float edgeAlpha=smoothstep(0.5,-0.5,dist);

      float e=3.;
      float gx=(H(v_p+vec2(e,0.))-H(v_p-vec2(e,0.)))/(2.*e);
      float gy=(H(v_p+vec2(0.,e))-H(v_p-vec2(e,0.)))/(2.*e);
      vec3 n=normalize(vec3(-gx*1.2,-gy*1.2,1.));
      vec2 uv=clamp(v_uv-vec2(gx,gy)*3.2/u_size,0.002,0.998);
      vec3 col=texture2D(u_tex,uv).rgb;

      /* Silk highlights and soft shadows */
      vec3 L=normalize(vec3(-.45,-.35,.82));
      float sh=(dot(n,L)-L.z)*1.6;
      col=mix(col,vec3(sh>0.?1.:0.),min(.26,abs(sh)));
      vec3 H2=normalize(vec3(-.14,-.02,1.));
      col+=vec3(pow(max(dot(n,H2),0.),380.)*.24);

      gl_FragColor=vec4(clamp(col,0.,1.)*edgeAlpha,edgeAlpha);
    }`;

    const sh = (t, src) => {
      const o = gl.createShader(t);
      gl.shaderSource(o, src);
      gl.compileShader(o);
      return o;
    };
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    ['u_size','u_cvs','u_off','u_pad','u_wallW','u_wallH','u_t','u_f','u_calm','u_A','u_OM','u_rad','u_tex'].forEach(n => loc[n] = gl.getUniformLocation(prog, n));
    loc.a = gl.getAttribLocation(prog, 'a_uv');
    gl.enableVertexAttribArray(loc.a);
    gl.uniform1f(loc.u_A, A);
    gl.uniform1f(loc.u_OM, OM);
    gl.uniform1f(loc.u_pad, PAD);
    gl.uniform1i(loc.u_tex, 0);
  }

  function meshFor(w, h) {
    if (!gl) return;
    const nx = Math.min(130, Math.ceil(w / 12)), ny = Math.min(75, Math.ceil(h / 12));
    const v = new Float32Array((nx + 1) * (ny + 1) * 2), ix = new Uint16Array(nx * ny * 6);
    let k = 0;
    for (let j = 0; j <= ny; j++) {
      for (let i = 0; i <= nx; i++) {
        v[k++] = i / nx;
        v[k++] = j / ny;
      }
    }
    k = 0;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        ix[k++] = a; ix[k++] = b; ix[k++] = c;
        ix[k++] = b; ix[k++] = d; ix[k++] = c;
      }
    }
    if (vbo) {
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ibo);
    }
    vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ix, gl.STATIC_DRAW);
    count = ix.length;
  }

  let cardW = 1, cardH = 1, pw = 1, ph = 1;

  function build() {
    cardW = mapCloth.offsetWidth || 1000;
    cardH = mapCloth.offsetHeight || 440;
    const D = dpr();
    pw = Math.ceil((cardW + PAD * 2) * D);
    ph = Math.ceil((cardH + PAD * 2) * D);

    canvas.style.width = (cardW + PAD * 2) + 'px';
    canvas.style.height = (cardH + PAD * 2) + 'px';
    canvas.width = pw;
    canvas.height = ph;

    meshFor(cardW, cardH);
    paintTopographicTexture(cardW, cardH);

    if (gl && texReady) {
      if (glTex) gl.deleteTexture(glTex);
      glTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, glTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
  }

  function draw(t) {
    if (!gl || !glTex) return;
    const f = 1 - 0.92 * calm;

    gl.viewport(0, 0, pw, ph);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(loc.u_size, cardW, cardH);
    gl.uniform2f(loc.u_cvs, cardW + PAD * 2, cardH + PAD * 2);
    gl.uniform2f(loc.u_off, 0, 0);
    gl.uniform1f(loc.u_wallW, cardW);
    gl.uniform1f(loc.u_wallH, cardH);
    gl.uniform1f(loc.u_t, t);
    gl.uniform1f(loc.u_f, f);
    gl.uniform1f(loc.u_calm, calm);
    gl.uniform1f(loc.u_rad, 20.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(loc.a, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bindTexture(gl.TEXTURE_2D, glTex);

    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  }

  let inView = true;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        inView = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(mapCloth);
  }

  let raf = 0;
  let lastWhyW = window.innerWidth;
  let lastWhyH = window.innerHeight;
  window.addEventListener('resize', () => {
    const nw = window.innerWidth;
    const nh = window.innerHeight;
    if (nw === lastWhyW && Math.abs(nh - lastWhyH) < 120) return;
    lastWhyW = nw;
    lastWhyH = nh;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      setupPathAndStations();
      build();
    });
  });

  setupPathAndStations();
  build();
  if (document.fonts) document.fonts.ready.then(build);

  let animating = false;
  function start() {
    if (animating || reduce) return;
    animating = true;
    requestAnimationFrame(loop);
  }

  function loop(ms) {
    const t = ms / 1000;
    calm += (calmTarget - calm) * (calmTarget ? 0.16 : 0.07);
    if (inView) draw(t);
    if (animating) requestAnimationFrame(loop);
  }

  start();
  go(0);
})();
