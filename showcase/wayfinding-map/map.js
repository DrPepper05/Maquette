(function () {
  'use strict';

  const STEP_CARDS = [
    {
      num: '01',
      spec: 'Diagnose · 20 min',
      taglineBadge: 'The Intake',
      title: 'The Brief',
      headline: 'Tell us what is stuck.',
      desc: 'A short call and four plain fields. No 50-page RFPs, no sales decks. We read the raw operational friction together and isolate what done looks like.',
      tags: '✦ 20 min intake · Zero jargon',
      palette: ['#110f13', '#1f1814', '#332219', '#d47860'],
      accentColor: '#d47860'
    },
    {
      num: '02',
      spec: 'Scale 1:1 · Free',
      taglineBadge: 'The Prototype',
      title: 'The Maquette',
      headline: 'A working prototype in about a week.',
      desc: 'A tangible, clickable scale model with live screens and functioning button paths. You click through it with your team before signing anything.',
      tags: '✦ 100% free · Zero obligation',
      palette: ['#12100d', '#241c12', '#3d2e18', '#f88847'],
      accentColor: '#f88847'
    },
    {
      num: '03',
      spec: 'Cadence · 7 days',
      taglineBadge: 'The Build',
      title: 'The Sprints',
      headline: 'Weekly live demos, zero fog.',
      desc: 'Every Friday at 16:00 CET, you receive a working build to click and test. Autonomous agents do routine work; senior engineers craft every key decision.',
      tags: '✦ Weekly Friday demos · Transparent code',
      palette: ['#0c1420', '#142236', '#1c3654', '#38bdf8'],
      accentColor: '#38bdf8'
    },
    {
      num: '04',
      spec: 'Deed · 100% owned',
      taglineBadge: 'The Handover',
      title: 'The Model',
      headline: 'You own the finished product.',
      desc: 'Source code, Figma design tokens, database credentials, and serverless pipelines. Standard documented stacks with 100% client copyright and zero lock-in.',
      tags: '✦ 100% deed of ownership · No lock-in',
      palette: ['#0d1411', '#15241b', '#1f3b2c', '#34d399'],
      accentColor: '#34d399'
    }
  ];

  const STAGE_META = [
    { num: '01', name: 'The Brief · Diagnose', clarity: 25 },
    { num: '02', name: 'The Maquette · Free Model', clarity: 50 },
    { num: '03', name: 'The Sprints · Weekly Build', clarity: 75 },
    { num: '04', name: 'The Model · Full Ownership', clarity: 100 }
  ];

  const PAD = 40;
  const A = 4.0, K = 0, OM = 0.62;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);

  /* Shared WebGL context for liquid cloth simulation */
  const glc = document.createElement("canvas");
  const gl = glc.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true });
  let prog, loc = {};

  if (gl) {
    const VS = `attribute vec2 a_uv;
    uniform vec2 u_size,u_cvs,u_off;uniform float u_pad,u_wallW,u_wallH,u_t,u_f,u_calm,u_A,u_K,u_OM;
    varying vec2 v_uv,v_p;
    float H(vec2 p){
      float tt=u_t*u_OM;
      vec2 q=p*0.0045;
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
        vec2 d=(p-c)/(260.+60.*fi);
        h+=1.6*(0.6+0.4*sin(tt*1.3+fi*2.))*exp(-dot(d,d))*(i==1?-1.:1.);
      }
      return u_A*u_f*br*h*0.6;
    }
    void main(){
      vec2 c=u_size*.5,r=a_uv*u_size,p=u_off+r;
      float z=H(p);
      vec2 lat=vec2(H(p+vec2(137.,53.)),H(p+vec2(-91.,211.)))*.16;
      float s=(1.+0.025*u_calm)*(1.+z/1100.);
      vec2 sc=c+(r-c)*s+vec2(z*.38,-z*.14)+lat+u_pad;
      gl_Position=vec4(sc.x/u_cvs.x*2.-1.,1.-sc.y/u_cvs.y*2.,0.,1.);
      v_uv=a_uv;v_p=p;
    }`;

    const FS = `precision highp float;
    uniform sampler2D u_tex;uniform vec2 u_size;uniform float u_rad,u_wallW,u_wallH,u_t,u_f,u_A,u_K,u_OM;
    varying vec2 v_uv,v_p;
    float H(vec2 p){
      float tt=u_t*u_OM;
      vec2 q=p*0.0045;
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
        vec2 d=(p-c)/(260.+60.*fi);
        h+=1.6*(0.6+0.4*sin(tt*1.3+fi*2.))*exp(-dot(d,d))*(i==1?-1.:1.);
      }
      return u_A*u_f*br*h*0.6;
    }
    void main(){
      vec2 p_box=abs((v_uv-0.5)*u_size)-(u_size*0.5-vec2(u_rad));
      float dist=length(max(p_box,0.0))+min(max(p_box.x,p_box.y),0.0)-u_rad;
      if(dist>=0.5) discard;
      float edgeAlpha=smoothstep(0.5,-0.5,dist);

      float e=3.;
      float gx=(H(v_p+vec2(e,0.))-H(v_p-vec2(e,0.)))/(2.*e);
      float gy=(H(v_p+vec2(0.,e))-H(v_p-vec2(e,0.)))/(2.*e);
      vec3 n=normalize(vec3(-gx*1.25,-gy*1.25,1.));
      vec2 uv=clamp(v_uv-vec2(gx,gy)*3.6/u_size,0.002,0.998);
      vec3 col=texture2D(u_tex,uv).rgb;

      /* Silk lighting: balanced highlights and shadows */
      vec3 L=normalize(vec3(-.45,-.35,.82));
      float sh=(dot(n,L)-L.z)*1.8;
      col=mix(col,vec3(sh>0.?1.:0.),min(.30,abs(sh)));
      vec3 H2=normalize(vec3(-.14,-.02,1.));
      col+=vec3(pow(max(dot(n,H2),0.),450.)*.28);

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

    ["u_size","u_cvs","u_off","u_pad","u_wallW","u_wallH","u_t","u_f","u_calm","u_A","u_K","u_OM","u_rad","u_tex"].forEach(n => loc[n] = gl.getUniformLocation(prog, n));
    loc.a = gl.getAttribLocation(prog, "a_uv");
    gl.enableVertexAttribArray(loc.a);
    gl.uniform1f(loc.u_A, A);
    gl.uniform1f(loc.u_K, K);
    gl.uniform1f(loc.u_OM, OM);
    gl.uniform1f(loc.u_pad, PAD);
    gl.uniform1i(loc.u_tex, 0);
  }

  // DOM elements
  const rowContainer = document.getElementById("dnaRowContainer");
  const cardsRow = document.getElementById("cardsRow");
  const cardWrappers = document.querySelectorAll(".card-wrapper");
  const dnaSvg = document.getElementById("dnaSvg");
  const dnaSinglePath = document.getElementById("dnaSinglePath");
  const dnaNodesGroup = document.getElementById("dnaNodesGroup");
  const pills = document.querySelectorAll(".station-pill");
  const clarityFill = document.getElementById("clarityFill");
  const clarityText = document.getElementById("clarityText");
  const currentStageName = document.getElementById("currentStageName");

  // Initialize cards
  const cardElements = document.querySelectorAll('.card-cloth');
  const cards = Array.from(cardElements).map((el, idx) => {
    const data = STEP_CARDS[idx];
    el.tabIndex = 0;
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", data.title + ": " + data.headline);

    const cv = document.createElement("canvas");
    el.appendChild(cv);

    const link = document.createElement("a");
    link.className = "card-cloth-link";
    link.href = "#contact";
    link.setAttribute("aria-label", "Explore " + data.title);
    el.appendChild(link);

    const o = {
      el,
      cv,
      ctx: cv.getContext("2d"),
      data,
      idx,
      calm: 0,
      target: 0,
      vis: true,
      tex: null
    };

    const on = () => {
      if (o.hover) return;
      o.hover = true;
      o.target = 1;
      setActiveStep(idx);
    };
    const off = () => {
      if (!o.hover) return;
      o.hover = false;
      o.target = 0;
    };

    el.addEventListener("pointerenter", on);
    el.addEventListener("pointerleave", off);
    el.addEventListener("focus", on);
    el.addEventListener("blur", off);

    return o;
  });

  function setActiveStep(index) {
    if (index < 0 || index >= cards.length) return;
    const meta = STAGE_META[index];

    // Update active class on cards
    cards.forEach((c, i) => {
      c.el.classList.toggle('active', i === index);
    });

    // Update nav pills
    pills.forEach((p, i) => {
      p.classList.toggle('active', i === index);
      p.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    // Update SVG DNA nodes
    const nodes = dnaNodesGroup.querySelectorAll('.dna-station-node');
    nodes.forEach((node, i) => {
      node.classList.toggle('active', i === index);
    });

    // Update progress bar
    if (clarityFill && clarityText) {
      clarityFill.style.width = meta.clarity + '%';
      clarityText.textContent = meta.clarity + '%';
    }

    // Update HUD stage text
    if (currentStageName) {
      currentStageName.textContent = `Step ${meta.num}: ${meta.name}`;
    }
  }

  // Pill click handlers
  pills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveStep(idx);
      if (cards[idx]) cards[idx].target = 1;
    });
  });

  function wrapText(g, text, maxW) {
    const words = text.split(" "), lines = [];
    let line = "";
    for (const wd of words) {
      const tryL = line ? line + " " + wd : wd;
      if (g.measureText(tryL).width > maxW && line) {
        lines.push(line);
        line = wd;
      } else {
        line = tryL;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function roundRect(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.lineTo(x + w - r, y);
    g.quadraticCurveTo(x + w, y, x + w, y + r);
    g.lineTo(x + w, y + h - r);
    g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    g.lineTo(x + r, y + h);
    g.quadraticCurveTo(x, y + h, x, y + h - r);
    g.lineTo(x, y + r);
    g.quadraticCurveTo(x, y, x + r, y);
    g.closePath();
  }

  function makeTex(o) {
    const D = dpr(), w = o.w, h = o.h;
    if (w <= 0 || h <= 0) return;

    const tex = document.createElement("canvas");
    tex.width = Math.ceil(w * D);
    tex.height = Math.ceil(h * D);
    const g = tex.getContext("2d");
    g.scale(D, D);

    const d = o.data;
    const rad = 20;

    // 1. Deep lacquer base gradient
    const bgGrad = g.createLinearGradient(0, 0, w * 0.35, h);
    bgGrad.addColorStop(0, d.palette[0]);
    bgGrad.addColorStop(0.55, d.palette[1]);
    bgGrad.addColorStop(1, d.palette[0]);
    g.fillStyle = bgGrad;
    g.fillRect(0, 0, w, h);

    // 2. Ambient luminous glow pool
    const glow = g.createRadialGradient(
      w * 0.8, h * 0.25, 10,
      w * 0.8, h * 0.25, Math.max(w, h) * 0.85
    );
    glow.addColorStop(0, d.palette[2] + "40");
    glow.addColorStop(0.5, d.palette[1] + "1c");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = glow;
    g.fillRect(0, 0, w, h);

    // 3. Deep museum vignette
    const vig = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.84);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(0.68, "rgba(0,0,0,0.36)");
    vig.addColorStop(1, "rgba(0,0,0,0.76)");
    g.fillStyle = vig;
    g.fillRect(0, 0, w, h);

    // 4. Subtle inner frame border
    roundRect(g, 1, 1, w - 2, h - 2, rad - 1);
    g.strokeStyle = "rgba(245, 241, 233, 0.12)";
    g.lineWidth = 1;
    g.stroke();

    roundRect(g, 2, 2, w - 4, h - 4, rad - 2);
    g.strokeStyle = (d.accentColor || "#d47860") + "18";
    g.lineWidth = 1;
    g.stroke();

    // 5. Render typography on canvas
    const padX = Math.round(Math.min(30, Math.max(18, w * 0.08)));
    const padY = Math.round(Math.min(28, Math.max(18, h * 0.08)));
    let y = padY + 12;

    // Header: Number + Kicker + Spec
    g.font = "700 12px 'DM Mono', monospace";
    g.fillStyle = d.accentColor || "#d47860";
    g.fillText(d.num, padX, y);

    g.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.65)";
    g.fillText("·  " + d.taglineBadge, padX + 32, y);

    g.textAlign = "right";
    g.font = "600 10.5px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.52)";
    g.fillText(d.spec, w - padX, y);
    g.textAlign = "left";

    // Hairline divider
    y += 16;
    g.beginPath();
    g.moveTo(padX, y);
    g.lineTo(w - padX, y);
    g.strokeStyle = "rgba(245, 241, 233, 0.08)";
    g.lineWidth = 1;
    g.stroke();

    // Title
    y += 32;
    g.font = "700 23px 'Bricolage Grotesque', sans-serif";
    g.fillStyle = "#f5f1e9";
    g.fillText(d.title, padX, y);

    // Headline
    y += 24;
    g.font = "600 13px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.95)";
    const hLines = wrapText(g, d.headline, w - padX * 2);
    hLines.forEach(l => {
      g.fillText(l, padX, y);
      y += 18;
    });

    // Story Description
    y += 10;
    g.font = "400 11.5px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.72)";
    const dLines = wrapText(g, d.desc, w - padX * 2);
    dLines.forEach(l => {
      if (y < h - 42) {
        g.fillText(l, padX, y);
        y += 17;
      }
    });

    // Footer Tag
    const footY = h - padY;
    g.beginPath();
    g.moveTo(padX, footY - 16);
    g.lineTo(w - padX, footY - 16);
    g.strokeStyle = "rgba(245, 241, 233, 0.08)";
    g.lineWidth = 1;
    g.stroke();

    g.font = "600 10.5px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "#f88847";
    g.fillText(d.tags, padX, footY);

    g.textAlign = "right";
    g.font = "700 11px 'DM Mono', monospace";
    g.fillStyle = "#f5f1e9";
    g.fillText("↗", w - padX, footY);
    g.textAlign = "left";

    o.tex = tex;

    if (gl) {
      if (o.glTex) gl.deleteTexture(o.glTex);
      o.glTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, o.glTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    if (reduce) draw(o, 3);
  }

  function meshFor(o) {
    if (!gl) return;
    const nx = Math.min(80, Math.ceil(o.w / 12)), ny = Math.min(80, Math.ceil(o.h / 12));
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
    if (o.vbo) {
      gl.deleteBuffer(o.vbo);
      gl.deleteBuffer(o.ibo);
    }
    o.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, o.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    o.ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ix, gl.STATIC_DRAW);
    o.count = ix.length;
  }

  let wallW = 1, wallH = 1;

  /* ============================================================ */
  /* DYNAMIC DNA SINGLE SINE WAVE PATH CALCULATION               */
  /* ============================================================ */
  function updateDnaPath() {
    if (!rowContainer || !cardsRow || !dnaSvg || !dnaSinglePath) return;

    const rowBox = rowContainer.getBoundingClientRect();
    const scrollW = Math.max(cardsRow.scrollWidth, rowBox.width);
    const scrollH = rowBox.height;

    // Ensure SVG covers full scrollable extent
    dnaSvg.style.width = scrollW + "px";
    dnaSvg.style.height = scrollH + "px";
    dnaSvg.setAttribute("viewBox", `0 0 ${scrollW} ${scrollH}`);

    // Sample the 4 card wrappers
    const points = [];
    cardWrappers.forEach((wrap, i) => {
      const box = wrap.getBoundingClientRect();
      const cx = (box.left - rowBox.left) + rowContainer.scrollLeft + box.width / 2;
      
      // Card 0 & 2 (step-up): wave crests right above Card top
      // Card 1 & 3 (step-down): wave troughs right below Card bottom
      const isUp = (i % 2 === 0);
      const cy = isUp
        ? (box.top - rowBox.top) - 16
        : (box.bottom - rowBox.top) + 16;

      points.push({ x: cx, y: cy, isUp, idx: i });
    });

    if (points.length < 4) return;

    // Construct smooth continuous sine wave through points
    const p0 = points[0], p1 = points[1], p2 = points[2], p3 = points[3];
    const yMid = (p0.y + p1.y) / 2;

    // Start before Card 1
    let d = `M 0,${yMid.toFixed(1)} `;
    d += `C ${(p0.x * 0.4).toFixed(1)},${yMid.toFixed(1)} ${(p0.x * 0.7).toFixed(1)},${p0.y.toFixed(1)} ${p0.x.toFixed(1)},${p0.y.toFixed(1)} `;

    // Between Card 0 (up) and Card 1 (down): tight swoop through gap
    const dx01 = p1.x - p0.x;
    d += `C ${(p0.x + dx01 * 0.5).toFixed(1)},${p0.y.toFixed(1)} ${(p1.x - dx01 * 0.5).toFixed(1)},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)} `;

    // Between Card 1 (down) and Card 2 (up): tight swoop through gap
    const dx12 = p2.x - p1.x;
    d += `C ${(p1.x + dx12 * 0.5).toFixed(1)},${p1.y.toFixed(1)} ${(p2.x - dx12 * 0.5).toFixed(1)},${p2.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} `;

    // Between Card 2 (up) and Card 3 (down): tight swoop through gap
    const dx23 = p3.x - p2.x;
    d += `C ${(p2.x + dx23 * 0.5).toFixed(1)},${p2.y.toFixed(1)} ${(p3.x - dx23 * 0.5).toFixed(1)},${p3.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)} `;

    // End after Card 3
    const dxEnd = scrollW - p3.x;
    d += `C ${(p3.x + dxEnd * 0.35).toFixed(1)},${p3.y.toFixed(1)} ${(p3.x + dxEnd * 0.65).toFixed(1)},${yMid.toFixed(1)} ${scrollW.toFixed(1)},${yMid.toFixed(1)}`;

    dnaSinglePath.setAttribute("d", d);

    // Update / generate station waypoint nodes
    if (dnaNodesGroup) {
      dnaNodesGroup.innerHTML = "";
      points.forEach((pt, i) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "dna-station-node" + (i === 0 ? " active" : ""));
        g.setAttribute("data-index", String(i));
        g.setAttribute("transform", `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`);

        // Pulsing dashed ring
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute("class", "dna-node-ring");
        ring.setAttribute("r", "18");

        // Solid station circle
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("class", "dna-node-circle");
        circle.setAttribute("r", "12");

        // Step number
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("class", "dna-node-num");
        text.textContent = STEP_CARDS[i].num;

        g.appendChild(ring);
        g.appendChild(circle);
        g.appendChild(text);

        g.addEventListener("click", () => {
          setActiveStep(i);
          if (cards[i]) cards[i].target = 1;
        });

        dnaNodesGroup.appendChild(g);
      });
    }
  }

  function buildAll() {
    wallW = rowContainer ? (rowContainer.offsetWidth || 1) : window.innerWidth;
    wallH = rowContainer ? (rowContainer.offsetHeight || 1) : 500;
    const D = dpr();
    let mw = 1, mh = 1;

    cards.forEach(o => {
      const e = o.el;
      o.w = e.offsetWidth;
      o.h = e.offsetHeight;
      o.x = e.offsetLeft;
      o.y = e.offsetTop;
      o.pw = Math.ceil((o.w + PAD * 2) * D);
      o.ph = Math.ceil((o.h + PAD * 2) * D);
      o.cv.style.width = (o.w + PAD * 2) + "px";
      o.cv.style.height = (o.h + PAD * 2) + "px";
      o.cv.width = o.pw;
      o.cv.height = o.ph;
      mw = Math.max(mw, o.pw);
      mh = Math.max(mh, o.ph);
    });

    if (gl) {
      glc.width = mw;
      glc.height = mh;
    }

    cards.forEach(o => {
      meshFor(o);
      makeTex(o);
    });

    updateDnaPath();
  }

  function draw(o, t) {
    if (!o.tex) return;
    const g = o.ctx, f = 1 - 0.92 * o.calm;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, o.pw, o.ph);

    if (!gl || !o.glTex) {
      const D = dpr(), rad = 20 * D;
      g.save();
      roundRect(g, PAD * D, PAD * D, o.w * D, o.h * D, rad);
      g.clip();
      g.drawImage(o.tex, PAD * D, PAD * D, o.w * D, o.h * D);
      g.restore();
      return;
    }

    gl.viewport(0, 0, o.pw, o.ph);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(loc.u_size, o.w, o.h);
    gl.uniform2f(loc.u_cvs, o.w + PAD * 2, o.h + PAD * 2);
    gl.uniform2f(loc.u_off, o.x, o.y);
    gl.uniform1f(loc.u_wallW, wallW);
    gl.uniform1f(loc.u_wallH, wallH);
    gl.uniform1f(loc.u_t, t);
    gl.uniform1f(loc.u_f, f);
    gl.uniform1f(loc.u_calm, o.calm);
    gl.uniform1f(loc.u_rad, 20.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, o.vbo);
    gl.vertexAttribPointer(loc.a, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.ibo);
    gl.bindTexture(gl.TEXTURE_2D, o.glTex);

    gl.drawElements(gl.TRIANGLES, o.count, gl.UNSIGNED_SHORT, 0);
    g.drawImage(glc, 0, glc.height - o.ph, o.pw, o.ph, 0, 0, o.pw, o.ph);
  }

  let raf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(buildAll);
  });

  if (rowContainer) {
    rowContainer.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateDnaPath);
    }, { passive: true });
  }

  buildAll();
  if (document.fonts) document.fonts.ready.then(buildAll);

  let animating = false;
  function startAnimating() {
    if (animating || reduce) return;
    animating = true;
    requestAnimationFrame(loop);
  }

  function loop(ms) {
    const t = ms / 1000;
    for (const o of cards) {
      o.calm += (o.target - o.calm) * (o.target ? 0.16 : 0.07);
      if (o.vis) draw(o, t);
    }
    if (animating) requestAnimationFrame(loop);
  }

  startAnimating();
  setActiveStep(0);
})();
