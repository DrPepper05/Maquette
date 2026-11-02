(function () {
  'use strict';

  const painting = document.getElementById('arPainting');
  const surface = document.getElementById('arPaintingSurface');
  const canvas = document.getElementById('arClothCanvas');
  if (!painting || !surface || !canvas) return;

  const PAD = 40;
  const AMPLITUDE = 3.0;
  const OMEGA = 0.6;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

  const texCanvas = document.createElement('canvas');
  let texReady = false;

  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 128;
  noiseCanvas.height = 128;
  (function makeNoise() {
    const ng = noiseCanvas.getContext('2d');
    const img = ng.createImageData(128, 128);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = 20;
    }
    ng.putImageData(img, 0, 0);
  })();

  function roundRect(g, x, y, w, h, r) {
    r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function pillow(g, x, y, w, h, rot, top, bottom) {
    g.save();
    g.translate(x + w / 2, y + h / 2);
    g.rotate(rot);
    roundRect(g, -w / 2, -h / 2, w, h, w * 0.18);
    const grad = g.createLinearGradient(0, -h / 2, 0, h / 2);
    grad.addColorStop(0, top);
    grad.addColorStop(1, bottom);
    g.fillStyle = grad;
    g.fill();
    g.strokeStyle = 'rgba(255, 214, 150, 0.16)';
    g.lineWidth = 1;
    g.stroke();
    g.restore();
  }

  function sofa(g, w, h) {
    const sw = w * 0.64;
    const sh = h * 0.35;
    const x = (w - sw) / 2 - w * 0.012;
    const y = h * 0.505;
    const rr = Math.max(8, w * 0.022);

    g.save();
    g.translate(x + sw * 0.5, y + sh * 0.97);
    g.scale(1, 0.18);
    const shadow = g.createRadialGradient(0, 0, 0, 0, 0, sw * 0.58);
    shadow.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
    shadow.addColorStop(0.55, 'rgba(0, 0, 0, 0.34)');
    shadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    g.fillStyle = shadow;
    g.beginPath();
    g.arc(0, 0, sw * 0.58, 0, Math.PI * 2);
    g.fill();
    g.restore();

    const leatherTop = '#7c4a2c';
    const leatherMid = '#4d2d1c';
    const leatherDark = '#24150e';

    g.save();
    g.shadowColor = 'rgba(0, 0, 0, 0.55)';
    g.shadowBlur = w * 0.045;
    g.shadowOffsetY = h * 0.025;
    roundRect(g, x + sw * 0.05, y + sh * 0.02, sw * 0.9, sh * 0.58, rr);
    const back = g.createLinearGradient(0, y, 0, y + sh * 0.6);
    back.addColorStop(0, leatherTop);
    back.addColorStop(0.48, leatherMid);
    back.addColorStop(1, leatherDark);
    g.fillStyle = back;
    g.fill();
    g.restore();

    const gap = sw * 0.018;
    const cw = (sw * 0.84 - gap * 2) / 3;
    for (let i = 0; i < 3; i++) {
      const cx = x + sw * 0.08 + i * (cw + gap);
      const cy = y + sh * 0.09;
      const ch = sh * 0.43;
      const cg = g.createLinearGradient(0, cy, 0, cy + ch);
      cg.addColorStop(0, i === 1 ? '#895332' : '#7e4b2d');
      cg.addColorStop(0.55, '#5a341f');
      cg.addColorStop(1, '#321d13');
      roundRect(g, cx, cy, cw, ch, rr * 0.75);
      g.fillStyle = cg;
      g.fill();

      g.beginPath();
      g.moveTo(cx + cw * 0.08, cy + 2);
      g.quadraticCurveTo(cx + cw * 0.5, cy - ch * 0.05, cx + cw * 0.92, cy + 2);
      g.strokeStyle = 'rgba(255, 205, 132, 0.2)';
      g.lineWidth = Math.max(1, w * 0.003);
      g.stroke();

      g.beginPath();
      g.moveTo(cx + cw * 0.5, cy + ch * 0.12);
      g.lineTo(cx + cw * 0.5, cy + ch * 0.92);
      g.strokeStyle = 'rgba(20, 10, 6, 0.16)';
      g.lineWidth = 1;
      g.stroke();
    }

    roundRect(g, x, y + sh * 0.5, sw, sh * 0.38, rr);
    const base = g.createLinearGradient(0, y + sh * 0.48, 0, y + sh * 0.9);
    base.addColorStop(0, '#5d3620');
    base.addColorStop(0.65, '#3a2217');
    base.addColorStop(1, '#1d110a');
    g.fillStyle = base;
    g.fill();

    const sg = sw * 0.016;
    const scw = (sw * 0.78 - sg * 2) / 3;
    for (let i = 0; i < 3; i++) {
      const cx = x + sw * 0.11 + i * (scw + sg);
      const cy = y + sh * 0.52;
      const ch = sh * 0.22;
      const cg = g.createLinearGradient(0, cy, 0, cy + ch);
      cg.addColorStop(0, '#70442a');
      cg.addColorStop(0.48, '#4b2c1b');
      cg.addColorStop(1, '#2c1a11');
      roundRect(g, cx, cy, scw, ch, rr * 0.65);
      g.fillStyle = cg;
      g.fill();
      g.beginPath();
      g.moveTo(cx + scw * 0.06, cy + 1);
      g.quadraticCurveTo(cx + scw * 0.5, cy - 3, cx + scw * 0.94, cy + 1);
      g.strokeStyle = 'rgba(255, 205, 132, 0.16)';
      g.lineWidth = 1;
      g.stroke();
    }

    for (let side = 0; side < 2; side++) {
      const ax = side ? x + sw * 0.9 : x;
      const ay = y + sh * 0.35;
      const aw = sw * 0.11;
      const ah = sh * 0.48;
      roundRect(g, ax, ay, aw, ah, aw * 0.5);
      const ag = g.createLinearGradient(ax, ay, ax + aw, ay + ah);
      ag.addColorStop(0, '#7d4b2c');
      ag.addColorStop(0.55, '#4a2b1b');
      ag.addColorStop(1, '#22140d');
      g.fillStyle = ag;
      g.fill();
      g.beginPath();
      g.moveTo(side ? ax + aw - 1 : ax + 1, ay + ah * 0.15);
      g.lineTo(side ? ax + aw - 1 : ax + 1, ay + ah * 0.85);
      g.strokeStyle = 'rgba(255, 196, 110, 0.22)';
      g.lineWidth = 1.4;
      g.stroke();
    }

    g.fillStyle = '#0e0906';
    roundRect(g, x + sw * 0.14, y + sh * 0.84, w * 0.012, sh * 0.14, 2);
    g.fill();
    roundRect(g, x + sw * 0.83, y + sh * 0.84, w * 0.012, sh * 0.14, 2);
    g.fill();

    pillow(g, x + sw * 0.14, y + sh * 0.16, sw * 0.15, sh * 0.24, -0.18, '#8c402c', '#4a1e13');
    pillow(g, x + sw * 0.71, y + sh * 0.19, sw * 0.14, sh * 0.22, 0.16, '#6d6444', '#302a16');
  }

  function paintArtwork(w, h) {
    const D = dpr();
    const W = Math.round(w * D);
    const H = Math.round(h * D);
    if (!W || !H) return;

    texCanvas.width = W;
    texCanvas.height = H;
    const g = texCanvas.getContext('2d');
    g.setTransform(D, 0, 0, D, 0, 0);
    g.clearRect(0, 0, w, h);

    // Wall
    const wall = g.createLinearGradient(0, 0, w * 0.22, h);
    wall.addColorStop(0, '#39281c');
    wall.addColorStop(0.5, '#211710');
    wall.addColorStop(1, '#120d09');
    g.fillStyle = wall;
    g.fillRect(0, 0, w, h);

    // Warm light pool
    const pool = g.createRadialGradient(w * 0.72, h * 0.2, 0, w * 0.72, h * 0.2, w * 0.9);
    pool.addColorStop(0, 'rgba(255, 203, 120, 0.55)');
    pool.addColorStop(0.35, 'rgba(248, 136, 71, 0.24)');
    pool.addColorStop(1, 'rgba(248, 136, 71, 0)');
    g.fillStyle = pool;
    g.fillRect(0, 0, w, h);

    // Arched window with afternoon light
    const wx = w * 0.605;
    const wy = h * 0.09;
    const ww = w * 0.285;
    const wh = h * 0.56;
    const wr = ww * 0.5;

    function windowPath() {
      g.beginPath();
      g.moveTo(wx, wy + wh);
      g.lineTo(wx, wy + wr);
      g.arc(wx + wr, wy + wr, wr, Math.PI, 0);
      g.lineTo(wx + ww, wy + wh);
      g.closePath();
    }

    g.save();
    windowPath();
    const win = g.createLinearGradient(wx, wy, wx + ww, wy + wh);
    win.addColorStop(0, '#ffe2a6');
    win.addColorStop(0.35, '#e2a856');
    win.addColorStop(0.7, '#a86d33');
    win.addColorStop(1, '#5f3c1f');
    g.fillStyle = win;
    g.fill();
    g.clip();
    const wg = g.createRadialGradient(wx + wr, wy + wh * 0.2, 0, wx + wr, wy + wh * 0.2, ww);
    wg.addColorStop(0, 'rgba(255, 245, 214, 0.85)');
    wg.addColorStop(1, 'rgba(255, 245, 214, 0)');
    g.fillStyle = wg;
    g.fillRect(wx, wy, ww, wh);
    g.strokeStyle = 'rgba(36, 22, 12, 0.8)';
    g.lineWidth = Math.max(2, w * 0.0055);
    g.beginPath();
    g.moveTo(wx + ww * 0.5, wy);
    g.lineTo(wx + ww * 0.5, wy + wh);
    g.moveTo(wx, wy + wh * 0.52);
    g.lineTo(wx + ww, wy + wh * 0.52);
    g.stroke();
    g.restore();

    g.save();
    windowPath();
    g.strokeStyle = 'rgba(255, 225, 160, 0.34)';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();

    g.fillStyle = 'rgba(52, 32, 17, 0.9)';
    g.fillRect(wx - ww * 0.04, wy + wh - 2, ww * 1.08, Math.max(4, h * 0.012));

    // Floor and rug
    const fy = h * 0.66;
    const floor = g.createLinearGradient(0, fy, 0, h);
    floor.addColorStop(0, '#2a1b12');
    floor.addColorStop(0.4, '#1b120c');
    floor.addColorStop(1, '#0c0806');
    g.fillStyle = floor;
    g.fillRect(0, fy, w, h - fy);

    g.save();
    g.translate(w * 0.48, h * 0.84);
    g.scale(1, 0.28);
    const rug = g.createRadialGradient(0, 0, 0, 0, 0, w * 0.42);
    rug.addColorStop(0, 'rgba(126, 85, 46, 0.45)');
    rug.addColorStop(0.65, 'rgba(82, 55, 33, 0.3)');
    rug.addColorStop(1, 'rgba(82, 55, 33, 0)');
    g.fillStyle = rug;
    g.beginPath();
    g.arc(0, 0, w * 0.42, 0, Math.PI * 2);
    g.fill();
    g.restore();

    g.strokeStyle = 'rgba(248, 136, 71, 0.1)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(0, fy);
    g.lineTo(w, fy);
    g.stroke();

    sofa(g, w, h);

    // Loose upholstery brushwork
    g.save();
    const rngS = mulberry32(77);
    for (let i = 0; i < 44; i++) {
      const bx = w * (0.22 + rngS() * 0.56);
      const by = h * (0.55 + rngS() * 0.22);
      g.globalAlpha = 0.035 + rngS() * 0.06;
      g.strokeStyle = rngS() > 0.5 ? 'rgba(255, 196, 110, 1)' : 'rgba(40, 18, 10, 1)';
      g.lineWidth = 1 + rngS() * 3;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(bx, by);
      g.quadraticCurveTo(bx + (rngS() - 0.5) * 20, by + 4 + rngS() * 8, bx + (rngS() - 0.5) * 30, by + 10 + rngS() * 12);
      g.stroke();
    }
    g.restore();

    // Light falling through the room
    g.save();
    g.globalCompositeOperation = 'screen';
    const beam = g.createLinearGradient(wx, wy, w * 0.24, h * 0.84);
    beam.addColorStop(0, 'rgba(255, 214, 150, 0.16)');
    beam.addColorStop(1, 'rgba(255, 214, 150, 0)');
    g.fillStyle = beam;
    g.beginPath();
    g.moveTo(wx + ww * 0.1, wy + wh * 0.25);
    g.lineTo(wx + ww * 0.8, wy + wh * 0.35);
    g.lineTo(w * 0.28, h * 0.88);
    g.lineTo(w * 0.12, h * 0.72);
    g.closePath();
    g.globalAlpha = 0.6;
    g.fill();
    g.restore();

    // Loose brushwork
    const rng = mulberry32(1337);
    const colors = [
      'rgba(248, 136, 71, 1)',
      'rgba(212, 120, 96, 1)',
      'rgba(245, 225, 184, 1)',
      'rgba(18, 10, 6, 1)',
      'rgba(120, 64, 38, 1)'
    ];
    for (let i = 0; i < 240; i++) {
      const bx = rng() * w;
      const by = rng() * h;
      const len = 8 + rng() * 60;
      g.save();
      g.translate(bx, by);
      g.rotate((rng() - 0.5) * 0.9);
      g.globalAlpha = 0.015 + rng() * 0.045;
      g.strokeStyle = colors[(rng() * colors.length) | 0];
      g.lineWidth = 0.7 + rng() * 4;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(-len / 2, 0);
      g.quadraticCurveTo(0, (rng() - 0.5) * 8, len / 2, (rng() - 0.5) * 3);
      g.stroke();
      g.restore();
    }

    // Canvas weave
    g.save();
    g.globalAlpha = 0.028;
    g.strokeStyle = '#f5e1c0';
    g.lineWidth = 0.5;
    for (let x = 0; x < w; x += 4) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, h);
      g.stroke();
    }
    for (let y = 0; y < h; y += 4) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(w, y);
      g.stroke();
    }
    g.restore();

    // Grain
    g.fillStyle = g.createPattern(noiseCanvas, 'repeat');
    g.fillRect(0, 0, w, h);

    // Vignette
    const vig = g.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.2, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(0.7, 'rgba(0, 0, 0, 0.18)');
    vig.addColorStop(1, 'rgba(0, 0, 0, 0.62)');
    g.fillStyle = vig;
    g.fillRect(0, 0, w, h);

    texReady = true;
  }

  /* WebGL cloth simulation */
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
        vec2 d=(p-c)/(260.+60.*fi);
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
        vec2 d=(p-c)/(260.+60.*fi);
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

      vec3 L=normalize(vec3(-.45,-.35,.82));
      float sh=(dot(n,L)-L.z)*1.6;
      col=mix(col,vec3(sh>0.?1.:0.),min(.16,abs(sh)));
      vec3 H2=normalize(vec3(-.14,-.02,1.));
      col+=vec3(pow(max(dot(n,H2),0.),380.)*.1);

      gl_FragColor=vec4(clamp(col,0.,1.)*edgeAlpha,edgeAlpha);
    }`;

    const sh = (type, src) => {
      const o = gl.createShader(type);
      gl.shaderSource(o, src);
      gl.compileShader(o);
      return o;
    };

    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    ['u_size', 'u_cvs', 'u_off', 'u_pad', 'u_wallW', 'u_wallH', 'u_t', 'u_f', 'u_calm', 'u_A', 'u_OM', 'u_rad', 'u_tex'].forEach(n => {
      loc[n] = gl.getUniformLocation(prog, n);
    });
    loc.a = gl.getAttribLocation(prog, 'a_uv');
    gl.enableVertexAttribArray(loc.a);
    gl.uniform1f(loc.u_A, AMPLITUDE);
    gl.uniform1f(loc.u_OM, OMEGA);
    gl.uniform1f(loc.u_pad, PAD);
    gl.uniform1i(loc.u_tex, 0);
  }

  function meshFor(w, h) {
    if (!gl) return;
    const nx = Math.min(120, Math.ceil(w / 10));
    const ny = Math.min(80, Math.ceil(h / 10));
    const v = new Float32Array((nx + 1) * (ny + 1) * 2);
    const ix = new Uint16Array(nx * ny * 6);
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
        const a = j * (nx + 1) + i;
        const b = a + 1;
        const c = a + nx + 1;
        const d = c + 1;
        ix[k++] = a;
        ix[k++] = b;
        ix[k++] = c;
        ix[k++] = b;
        ix[k++] = d;
        ix[k++] = c;
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
  let calm = 0;
  let calmTarget = 0;

  function build() {
    cardW = surface.offsetWidth || 440;
    cardH = surface.offsetHeight || 352;
    const D = dpr();
    pw = Math.ceil((cardW + PAD * 2) * D);
    ph = Math.ceil((cardH + PAD * 2) * D);

    canvas.style.width = (cardW + PAD * 2) + 'px';
    canvas.style.height = (cardH + PAD * 2) + 'px';
    canvas.width = pw;
    canvas.height = ph;

    meshFor(cardW, cardH);
    paintArtwork(cardW, cardH);

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

    if (reduce || !gl) draw(0);
  }

  function draw(t) {
    if (!texReady) return;

    if (!gl || !glTex) {
      const g = canvas.getContext('2d');
      if (!g) return;
      const D = dpr();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, pw, ph);
      g.save();
      roundRect(g, PAD * D, PAD * D, cardW * D, cardH * D, 2 * D);
      g.clip();
      g.drawImage(texCanvas, PAD * D, PAD * D, cardW * D, cardH * D);
      g.restore();
      return;
    }

    const f = 1 - 0.9 * calm;
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
    gl.uniform1f(loc.u_rad, 2.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(loc.a, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bindTexture(gl.TEXTURE_2D, glTex);

    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  }

  let inView = !('IntersectionObserver' in window);
  let running = false;

  function start() {
    if (running || reduce || !gl) return;
    running = true;
    requestAnimationFrame(loop);
  }

  function loop(ms) {
    if (!inView) {
      running = false;
      return;
    }
    const t = ms / 1000;
    calm += (calmTarget - calm) * (calmTarget ? 0.14 : 0.06);
    draw(t);
    requestAnimationFrame(loop);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      if (inView) start();
    }, { threshold: 0.01 }).observe(painting);
  }

  painting.addEventListener('pointerenter', () => { calmTarget = 0.9; });
  painting.addEventListener('pointerleave', () => { calmTarget = 0; });

  let resizeRaf = 0;
  let lastW = 0;
  let lastH = 0;
  new ResizeObserver(() => {
    const nw = surface.offsetWidth;
    const nh = surface.offsetHeight;
    if (nw === lastW && nh === lastH) return;
    lastW = nw;
    lastH = nh;
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      build();
      if (!reduce && inView) start();
    });
  }).observe(surface);

  build();
  if (document.fonts) document.fonts.ready.then(build);
  start();
})();

(function () {
  const mv = document.getElementById('headless-mv');
  const launchBtn = document.getElementById('btn-launch-ar');
  const btnLabel = document.getElementById('btn-label');
  const qrImg = document.getElementById('qr-img');
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Populate dynamic high-res QR code
  const targetUrl = window.location.href;
  qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=161005&margin=10&data=' + encodeURIComponent(targetUrl);

  // On mobile devices, emphasize the direct button
  if (isMobile) {
    btnLabel.textContent = 'Plasează în camera ta (atinge pentru lansare)';
    launchBtn.style.animation = 'pulse 2s infinite';
  }

  // Launch Native AR Action
  launchBtn.addEventListener('click', function () {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      // Native Apple Quick Look Bridge
      const anchor = document.createElement('a');
      anchor.setAttribute('rel', 'ar');
      anchor.setAttribute('href', 'https://code4fukui.github.io/vr-kanazawa-it/sofa_r-nakagawa532.usdz');
      const img = document.createElement('img');
      img.setAttribute('src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"/>');
      anchor.appendChild(img);
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => anchor.remove(), 100);
    } else if (isMobile) {
      // Android WebXR / Scene Viewer
      mv.activateAR();
    } else {
      // Desktop: highlight the QR code
      qrImg.parentElement.style.transform = 'scale(1.06)';
      qrImg.parentElement.style.transition = 'transform 0.25s ease';
      setTimeout(() => {
        qrImg.parentElement.style.transform = 'scale(1)';
      }, 300);
    }
  });
})();
