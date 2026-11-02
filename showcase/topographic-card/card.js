(function () {
  'use strict';

  const STATIONS = [
    {
      num: '01',
      tag: '01',
      title: 'Tell us what you need',
      desc: "Tell us what you want to build. We'll figure out the best way to make it happen.",
      meta: '01 · Tell us what you need',
      color: '#d47860'
    },
    {
      num: '02',
      tag: '02',
      title: 'Try a free demo',
      desc: 'We build a working demo for you to try. Test it yourself before you commit.',
      free: true,
      meta: '02 · Try a free demo (Free)',
      color: '#f88847'
    },
    {
      num: '03',
      tag: '03',
      title: 'Build it together',
      desc: 'We build your product with you, sharing progress every week. You stay in control of every decision.',
      meta: '03 · Build it together',
      color: '#38bdf8'
    },
    {
      num: '04',
      tag: '04',
      title: "It's all yours",
      desc: 'You get the code, accounts, and documentation. Everything belongs to you, with no vendor lock-in.',
      meta: "04 · It's all yours",
      color: '#34d399'
    }
  ];

  // DOM elements
  const mapCloth = document.getElementById('mapCloth');
  const canvas = document.getElementById('clothCanvas');
  const cols = document.getElementById('cols');
  const pb = document.getElementById('pb');
  const pp = document.getElementById('pp');
  const pills = document.querySelectorAll('.station-pill');
  const clarityFill = document.getElementById('clarityFill');
  const clarityText = document.getElementById('clarityText');
  const currentStageName = document.getElementById('currentStageName');
  const compassRose = document.getElementById('compassRose');

  if (!mapCloth || !canvas || !cols) return;

  const PAD = 40;
  const A = 3.6, OM = 0.62;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);

  // Sine Wave Formula: Y(f) for the process trace
  const Y = f => 0.42 + 0.10 * Math.sin(f * Math.PI * 2.2);

  // Populate the 4 Station interactive columns
  cols.innerHTML = STATIONS.map((s, i) => `
    <button type="button" class="st" data-index="${i}" aria-label="Station ${i + 1}: ${s.title}" style="--st-color: ${s.color};">
      <span class="node" style="top:${(Y((i + 0.5) / 4) * 100).toFixed(2)}%">
        <u></u><i></i><b>${i + 1}</b>
      </span>
      ${s.free ? `<span class="free" style="top:${(Y(0.375) * 100).toFixed(2)}%">free</span>` : ''}
      <span class="st-tag">${s.tag}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </button>
  `).join('');

  const sts = Array.from(cols.children);

  // Precalculate trace path points and cumulative arc-lengths
  const pts = [];
  for (let k = 0; k <= 240; k++) {
    const f = k / 240;
    pts.push([f * 1200, Y(f) * 500]);
  }
  const d = 'M ' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L ');
  pb.setAttribute('d', d);
  pp.setAttribute('d', d);

  let tot = 0;
  const cum = pts.map((p, k) => k ? (tot += Math.hypot(p[0] - pts[k - 1][0], p[1] - pts[k - 1][1])) : 0);
  const frac = i => cum[Math.round((i + 0.5) / 4 * 240)] / tot;

  let cur = 0;
  let calm = 0, calmTarget = 0;

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

    // Update nav pills
    pills.forEach((p, k) => {
      p.classList.toggle('active', k === cur);
      p.setAttribute('aria-selected', k === cur ? 'true' : 'false');
    });

    // Update HUD progress bar
    const pct = (cur + 1) * 25;
    if (clarityFill && clarityText) {
      clarityFill.style.width = pct + '%';
      clarityText.textContent = pct + '%';
    }

    // Update HUD stage text
    if (currentStageName) {
      currentStageName.textContent = station.meta;
    }

    // Subtle compass reaction
    if (compassRose) {
      const angle = [15, 60, 115, 175][cur];
      compassRose.style.transform = `rotate(${angle}deg)`;
      compassRose.style.transition = 'transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)';
    }
  }

  // Column button event listeners
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
      if (k.key === 'ArrowRight') {
        go(cur + 1);
        sts[cur].focus({ preventScroll: true });
      }
      if (k.key === 'ArrowLeft') {
        go(cur - 1);
        sts[cur].focus({ preventScroll: true });
      }
    });
  });

  // Nav pill click listeners
  pills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      go(idx);
      calmTarget = 1;
    });
  });

  // Global arrow navigation
  window.addEventListener('keydown', e => {
    if (e.target && e.target.closest && e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  });

  /* ============================================================ */
  /* TOPOGRAPHIC PAPER TEXTURE (PROCEDURAL CONTOURS)              */
  /* Maquette Studio Palette: Bronze, Gold, Cyan, Emerald         */
  /* ============================================================ */
  // Base colors for each station: deep museum lacquer tints
  const BC = [
    [20, 16, 22], // 01 Intake: warm deep charcoal
    [22, 18, 14], // 02 Maquette: deep amber charcoal
    [14, 22, 32], // 03 Sprints: deep navy charcoal
    [13, 22, 18]  // 04 Handover: deep emerald charcoal
  ];

  // Contour line colors: Studio accent tones
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

    const F = new Float32Array(W * H);
    const ux = 12 / W, uy = 5 / H;

    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        F[j * W + i] = field(i * ux, j * uy) * 16;
      }
    }

    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        const k = j * W + i;
        const u = i / W * 4;
        const p = Math.min(3, Math.floor(u));
        const pf = u - p;

        const n = F[k];
        const fw = Math.abs(F[Math.min(W * H - 1, k + 1)] - n) + Math.abs(F[Math.min(W * H - 1, k + W)] - n);
        const c = ln(n, fw, 0.8) * 0.34;
        const ci = ln(n / 5, fw / 5, 1.3) * 0.55;

        // Attenuate contour lines in text zone (lower 65%) for perfect readability
        const yFrac = j / H;
        const lineFade = yFrac < 0.35 ? 1.0 : Math.max(0.12, 1.0 - Math.pow((yFrac - 0.35) / 0.65, 1.3) * 0.88);
        const lineVal = (c + ci) * lineFade;

        // Subtle fold crease shading
        const fold = (pf - 0.5) * 0.2 * (p % 2 ? -1 : 1);
        const shade = 1 + fold + (n / 16 - 0.5) * 0.25;
        const gx = Math.min(ln(i * ux * 2, ux * 2, 0.5) + ln(j * uy * 2, uy * 2, 0.5), 1) * 0.05;
        const crease = 1 - Math.min(1, Math.min(pf, 1 - pf) * W / sc / 3);
        const g = (Math.random() - 0.5) * 4; // Fine grain noise

        for (let ch = 0; ch < 3; ch++) {
          let v = BC[p][ch] * shade + LC[p][ch] * lineVal + 245 * gx + g;
          if (crease > 0) v *= 1 - crease * 0.35;
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

      /* Silk highlights and gentle shadows */
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
    const nx = Math.min(100, Math.ceil(w / 12)), ny = Math.min(60, Math.ceil(h / 12));
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
    gl.uniform1f(loc.u_rad, 22.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(loc.a, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bindTexture(gl.TEXTURE_2D, glTex);

    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  }

  let raf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(build);
  });

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
    draw(t);
    if (animating) requestAnimationFrame(loop);
  }

  start();
  go(0);
})();
