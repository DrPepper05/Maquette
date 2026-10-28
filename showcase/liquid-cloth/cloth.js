/* ===== Liquid Cloth — standalone WebGL silk poster ===== */
(function () {
  var PROJECTS = window.LAB_PROJECTS;
  var frame = document.getElementById('clothFrame');
  var canvas = document.getElementById('clothCanvas');
  var shell = document.getElementById('clothStage');
  if (!PROJECTS || !PROJECTS.length || !frame || !canvas || !shell) return;

  var ctx = canvas.getContext('2d');
  var roomEl = document.getElementById('clothRoom');
  var glowEl = document.getElementById('clothGlow');
  var numEl = document.getElementById('clothNum');
  var nameEl = document.getElementById('clothTitle');
  var catEl = document.getElementById('clothCategory');
  var tagEl = document.getElementById('clothTag');
  var countEl = document.getElementById('clothCount');
  var liveEl = document.getElementById('clothLive');
  var stillBtn = document.getElementById('clothStill');
  var glitchBtn = document.getElementById('clothGlitch');
  var motionEl = document.getElementById('clothMotion');
  var prevBtn = document.getElementById('clothPrev');
  var nextBtn = document.getElementById('clothNext');

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = PROJECTS.length;
  var active = 0;
  var current = PROJECTS[0];
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var pad = 40;
  var w = 1;
  var h = 1;
  var pw = 1;
  var ph = 1;
  var calm = 0;
  var hovering = false;
  var still = false;
  var motion = 0.65;
  var glVal = 0;
  var gStart = null;
  var gDur = 0.6;
  var gAmp = 1;
  var gp = 0;
  var nextGlitch = 0;
  var time = 0;
  var lastT = 0;
  var raf = 0;
  var animating = false;
  var inView = true;
  var img = null;
  var loadToken = 0;
  var texC = document.createElement('canvas');
  var glc = document.createElement('canvas');
  var gl = glc.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true });
  var glOK = !!gl;
  var prog = null;
  var loc = {};
  var glTex = null;
  var vbo = null;
  var ibo = null;
  var count = 0;
  var seed = Math.random() * 1000;

  var A = 4.0;
  var OM = 0.62;
  var RAD = 22;

  function mod(v, n) { return ((v % n) + n) % n; }
  function pad2(n) { return String(n).padStart(2, '0'); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function rand() {
    seed = (seed * 16807 + 194517) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  var VS = `attribute vec2 a_uv;
  uniform vec2 u_size,u_cvs,u_off;
  uniform float u_pad,u_wallW,u_wallH,u_t,u_f,u_calm,u_A,u_OM,u_gl,u_gs;
  varying vec2 v_uv,v_p;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
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
    float bd=floor(r.y/18.);float hb=hash(vec2(bd,u_gs+3.));
    sc.x+=step(.7,hb)*(hash(vec2(bd,u_gs))-.5)*60.*u_gl;
    gl_Position=vec4(sc.x/u_cvs.x*2.-1.,1.-sc.y/u_cvs.y*2.,0.,1.);
    v_uv=a_uv;v_p=p;
  }`;

  var FS = `precision highp float;
  uniform sampler2D u_tex;uniform vec2 u_size;uniform float u_rad,u_wallW,u_wallH,u_t,u_f,u_A,u_OM,u_gl,u_gs,u_gp;
  varying vec2 v_uv,v_p;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
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

    float e=3.,G=u_gl;
    float gx=(H(v_p+vec2(e,0.))-H(v_p-vec2(e,0.)))/(2.*e);
    float gy=(H(v_p+vec2(0.,e))-H(v_p-vec2(e,0.)))/(2.*e);
    vec3 n=normalize(vec3(-gx*1.25,-gy*1.25,1.));
    vec2 uv=v_uv-vec2(gx,gy)*3.6/u_size;
    float bf=floor(v_uv.y*u_size.y/6.);
    float hb=hash(vec2(bf,u_gs));
    uv.x+=step(1.-.45*G,hb)*(hash(vec2(bf,u_gs+7.))-.5)*.2*G;
    vec2 blk=floor(v_uv*u_size/vec2(28.,18.));
    float hk=hash(blk+u_gs*3.1);
    float bad=step(1.-.15*G,hk);
    vec2 pq=(floor(uv*u_size/12.)+.5)*7./u_size;
    uv=mix(uv,pq,bad);
    uv=clamp(uv,0.002,0.998);
    float sp=G*.022*(.4+hash(vec2(u_gs,3.)));
    vec3 col=vec3(texture2D(u_tex,clamp(uv+vec2(sp,0.),0.002,0.998)).r,texture2D(u_tex,uv).g,texture2D(u_tex,clamp(uv-vec2(sp,0.),0.002,0.998)).b);
    col=mix(col,col.gbr*1.25+vec3(.0,.08,.1),bad*step(.5,hash(blk+9.)));
    col=mix(col,vec3(1.,.1,.5)*(.4+.6*col.r),bad*step(.82,hash(blk+4.)));
    vec3 L=normalize(vec3(-.45,-.35,.82));
    float sh=(dot(n,L)-L.z)*1.8;
    col=mix(col,vec3(sh>0.?1.:0.),min(.30,abs(sh)));
    vec3 H2=normalize(vec3(-.14,-.02,1.));
    col+=vec3(pow(max(dot(n,H2),0.),450.)*.28);
    col*=1.-G*.28*step(.5,fract(v_uv.y*u_size.y/3.));
    col*=1.+(hash(vec2(u_gs,1.))-.5)*.35*G;
    col+=vec3(0.,.3,.38)*G*.22;
    float bar=smoothstep(.04,0.,abs(v_uv.y-u_gp));
    col+=vec3(.15,.95,1.)*bar*.55*step(.001,G);
    gl_FragColor=vec4(clamp(col,0.,1.)*edgeAlpha,edgeAlpha);
  }`;

  function shader(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  function initGL() {
    if (!gl) return;
    try {
      prog = gl.createProgram();
      var vs = shader(gl.VERTEX_SHADER, VS);
      var fs = shader(gl.FRAGMENT_SHADER, FS);
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        glOK = false;
        gl = null;
        return;
      }
      gl.useProgram(prog);
      var names = ['u_size', 'u_cvs', 'u_off', 'u_pad', 'u_wallW', 'u_wallH', 'u_t', 'u_f',
        'u_calm', 'u_A', 'u_OM', 'u_gl', 'u_gs', 'u_gp', 'u_rad', 'u_tex'];
      for (var i = 0; i < names.length; i++) loc[names[i]] = gl.getUniformLocation(prog, names[i]);
      loc.a = gl.getAttribLocation(prog, 'a_uv');
      gl.enableVertexAttribArray(loc.a);
      gl.uniform1f(loc.u_A, A);
      gl.uniform1f(loc.u_OM, OM);
      gl.uniform1i(loc.u_tex, 0);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    } catch (err) {
      glOK = false;
      gl = null;
    }
  }

  function wrapText(g, text, maxW) {
    var words = text.split(' ');
    var lines = [];
    var line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(test).width > maxW && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function roundRect(g, x, y, rw, rh, r) {
    if (rw < 2 * r) r = rw / 2;
    if (rh < 2 * r) r = rh / 2;
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + rw, y, x + rw, y + rh, r);
    g.arcTo(x + rw, y + rh, x, y + rh, r);
    g.arcTo(x, y + rh, x, y, r);
    g.arcTo(x, y, x + r, y, r);
    g.closePath();
  }

  function drawTexture() {
    if (w < 2 || h < 2) return;
    var p = current;
    texC.width = Math.ceil(w * dpr);
    texC.height = Math.ceil(h * dpr);
    var g = texC.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);

    var bg = g.createLinearGradient(0, 0, w * 0.35, h);
    bg.addColorStop(0, p.palette[0]);
    bg.addColorStop(0.55, p.palette[1]);
    bg.addColorStop(1, p.palette[0]);
    g.fillStyle = bg;
    g.fillRect(0, 0, w, h);

    if (img && img.complete && img.naturalWidth > 0) {
      var iRatio = img.naturalWidth / img.naturalHeight;
      var cRatio = w / h;
      var sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (iRatio > cRatio) {
        sw = img.naturalHeight * cRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / cRatio;
        sy = 0;
      }
      g.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }

    var glow = g.createRadialGradient(w * 0.78, h * 0.24, 10, w * 0.78, h * 0.24, w * 0.95);
    glow.addColorStop(0, p.palette[2] + '3c');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = glow;
    g.fillRect(0, 0, w, h);

    var scrim = g.createLinearGradient(0, h * 0.34, 0, h);
    scrim.addColorStop(0, 'rgba(7,6,8,0)');
    scrim.addColorStop(0.48, 'rgba(7,6,8,0.42)');
    scrim.addColorStop(0.78, 'rgba(7,6,8,0.86)');
    scrim.addColorStop(1, 'rgba(7,6,8,0.97)');
    g.fillStyle = scrim;
    g.fillRect(0, 0, w, h);

    var padX = clamp(Math.round(w * 0.06), 18, 32);
    var topY = clamp(Math.round(w * 0.06), 18, 30);

    g.font = '600 9px "DM Mono", monospace';
    g.fillStyle = p.lineColor;
    g.fillText(pad2(active + 1) + ' / ' + pad2(N), padX, topY + 8);
    g.textAlign = 'right';
    g.fillStyle = 'rgba(245,241,233,0.6)';
    g.fillText('MAQUETTE / LAB', w - padX, topY + 8);
    g.textAlign = 'left';
    g.fillStyle = 'rgba(245,241,233,0.12)';
    g.fillRect(padX, topY + 20, w - padX * 2, 1);

    var footY = h - padX;
    g.font = '700 8px "DM Mono", monospace';
    g.fillStyle = '#e89e28';
    g.fillText('ARCHIVAL POSTER · 2026', padX, footY);
    g.textAlign = 'right';
    g.fillStyle = 'rgba(245,241,233,0.82)';
    g.fillText('CASE STUDY ↗', w - padX, footY);
    g.textAlign = 'left';

    var tagY = footY - 22;
    g.font = '500 8.5px "DM Mono", monospace';
    g.fillStyle = 'rgba(245,241,233,0.5)';
    g.fillText(p.tagline.toUpperCase(), padX, tagY);

    var divY = tagY - 16;
    g.fillStyle = 'rgba(245,241,233,0.14)';
    g.fillRect(padX, divY, w - padX * 2, 1);

    var headY = divY - 12;
    var headSize = clamp(Math.round(w * 0.035), 12, 15);
    g.font = '500 ' + headSize + 'px "Plus Jakarta Sans", sans-serif';
    g.fillStyle = 'rgba(245,241,233,0.88)';
    var headLines = wrapText(g, p.headline, w - padX * 2).slice(0, 2);
    for (var i = 0; i < headLines.length; i++) {
      g.fillText(headLines[i], padX, headY - (headLines.length - 1 - i) * (headSize + 5));
    }

    var titleY = headY - Math.min(headLines.length, 2) * (headSize + 5) - 14;
    var titleSize = clamp(Math.round(w * 0.088), 30, 48);
    g.font = '700 ' + titleSize + 'px "Bricolage Grotesque", sans-serif';
    g.fillStyle = '#f5f1e9';
    g.letterSpacing = '-0.02em';
    g.fillText(p.title, padX, titleY);

    var catY = titleY - titleSize * 0.5 - 12;
    g.font = '600 7.5px "DM Mono", monospace';
    g.fillStyle = p.lineColor;
    g.letterSpacing = '0.08em';
    g.fillText(p.category.toUpperCase(), padX, catY);
    g.letterSpacing = '0';

    g.fillStyle = p.lineColor;
    g.fillRect(padX, titleY + 12, 26, 2);

    roundRect(g, 0.5, 0.5, w - 1, h - 1, RAD);
    g.strokeStyle = 'rgba(245,241,233,0.16)';
    g.lineWidth = 1;
    g.stroke();

    roundRect(g, 1.5, 1.5, w - 3, h - 3, RAD - 1);
    g.strokeStyle = p.lineColor + '22';
    g.lineWidth = 1;
    g.stroke();

    uploadTexture();
    if (!glOK || reduce) render(performance.now() / 1000, true);
  }

  function uploadTexture() {
    if (!glOK) return;
    if (glTex) gl.deleteTexture(glTex);
    glTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, glTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texC);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  function buildMesh() {
    if (!glOK) return;
    var nx = Math.min(90, Math.max(24, Math.ceil(w / 9)));
    var ny = Math.min(110, Math.max(24, Math.ceil(h / 9)));
    var v = new Float32Array((nx + 1) * (ny + 1) * 2);
    var ix = new Uint16Array(nx * ny * 6);
    var k = 0;
    for (var j = 0; j <= ny; j++) {
      for (var i = 0; i <= nx; i++) {
        v[k++] = i / nx;
        v[k++] = j / ny;
      }
    }
    k = 0;
    for (var jj = 0; jj < ny; jj++) {
      for (var ii = 0; ii < nx; ii++) {
        var a = jj * (nx + 1) + ii;
        var b = a + 1;
        var c = a + nx + 1;
        var d = c + 1;
        ix[k++] = a; ix[k++] = b; ix[k++] = c;
        ix[k++] = b; ix[k++] = d; ix[k++] = c;
      }
    }
    if (vbo) gl.deleteBuffer(vbo);
    if (ibo) gl.deleteBuffer(ibo);
    vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ix, gl.STATIC_DRAW);
    count = ix.length;
  }

  function rebuild() {
    var r = frame.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var cssPad = parseFloat(getComputedStyle(frame).getPropertyValue('--pad'));
    pad = isNaN(cssPad) ? 40 : cssPad;
    w = r.width;
    h = r.height;
    pw = Math.ceil((w + pad * 2) * dpr);
    ph = Math.ceil((h + pad * 2) * dpr);
    canvas.width = pw;
    canvas.height = ph;
    if (glOK) {
      glc.width = pw;
      glc.height = ph;
      buildMesh();
    }
    drawTexture();
    render(performance.now() / 1000, true);
  }

  function trigger(amp) {
    time = performance.now() / 1000;
    gStart = time;
    gDur = 0.52 + rand() * 0.22;
    gAmp = amp || 0.85;
    if (!glOK) {
      drawFallback();
      return;
    }
    if (reduce) {
      glVal = gAmp * 0.6;
      gp = 0.5;
      render(time, true);
      clearTimeout(trigger._t);
      trigger._t = setTimeout(function () {
        glVal = 0;
        render(performance.now() / 1000, true);
      }, 200);
    } else {
      start();
    }
  }

  function render(t, force) {
    if (!glOK) {
      drawFallback();
      return;
    }
    if (w < 2 || h < 2) return;
    var f = (1 - 0.92 * calm) * (0.05 + 0.95 * motion);
    var now = t;

    if (!reduce && !force) {
      if (now > nextGlitch) {
        trigger(0.42 + rand() * 0.32);
        nextGlitch = now + 3.8 + rand() * 4.2;
      }
      if (gStart != null) {
        var p = (now - gStart) / gDur;
        if (p >= 1) {
          glVal = 0;
          gStart = null;
        } else {
          glVal = gAmp * Math.pow(1 - p, 1.2);
          gp = p;
        }
      }
    }

    gl.viewport(0, 0, pw, ph);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);

    gl.uniform2f(loc.u_size, w, h);
    gl.uniform2f(loc.u_cvs, w + pad * 2, h + pad * 2);
    gl.uniform2f(loc.u_off, 0, 0);
    gl.uniform1f(loc.u_pad, pad);
    gl.uniform1f(loc.u_wallW, w);
    gl.uniform1f(loc.u_wallH, h);
    gl.uniform1f(loc.u_t, now);
    gl.uniform1f(loc.u_f, f);
    gl.uniform1f(loc.u_calm, calm);
    gl.uniform1f(loc.u_gl, glVal);
    gl.uniform1f(loc.u_gp, gp);
    gl.uniform1f(loc.u_gs, Math.floor(now * 22));
    gl.uniform1f(loc.u_rad, RAD);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(loc.a, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTex);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    ctx.drawImage(glc, 0, 0);
  }

  function drawFallback() {
    if (w < 2 || h < 2) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pw, ph);
    ctx.save();
    roundRect(ctx, pad * dpr, pad * dpr, w * dpr, h * dpr, RAD * dpr);
    ctx.clip();
    ctx.drawImage(texC, pad * dpr, pad * dpr, w * dpr, h * dpr);
    ctx.restore();
  }

  function start() {
    if (reduce || animating) return;
    if (!glOK) return;
    animating = true;
    lastT = 0;
    raf = requestAnimationFrame(loop);
  }

  function loop(ms) {
    raf = 0;
    if (!inView || document.hidden) {
      animating = false;
      lastT = 0;
      return;
    }
    var t = ms / 1000;
    var dt = lastT ? Math.min(t - lastT, 0.05) : 0.016;
    lastT = t;
    var target = (still || hovering) ? 1 : 0;
    calm += (target - calm) * (1 - Math.exp(-dt * (target ? 9 : 4)));
    render(t);
    animating = true;
    raf = requestAnimationFrame(loop);
  }

  function setProject(i) {
    active = mod(i, N);
    current = PROJECTS[active];
    numEl.textContent = pad2(active + 1);
    nameEl.textContent = current.title;
    catEl.textContent = current.category + ' · ' + current.year;
    tagEl.textContent = current.tagline;
    countEl.textContent = pad2(active + 1) + ' — ' + pad2(N);
    shell.style.setProperty('--accent', current.lineColor);
    roomEl.style.background =
      'radial-gradient(52% 55% at 58% 48%, ' + current.palette[1] + '8c, transparent 74%),' +
      'radial-gradient(70% 60% at 82% 24%, ' + current.palette[2] + '26, transparent 70%),' +
      'radial-gradient(55% 50% at 20% 78%, rgba(232,158,40,.10), transparent 68%)';
    glowEl.style.background =
      'radial-gradient(closest-side, ' + current.palette[2] + '4d, ' + current.palette[2] + '14 52%, transparent 74%),' +
      'radial-gradient(closest-side at 62% 68%, rgba(232,158,40,.18), transparent 70%)';
    frame.setAttribute('aria-label', current.title + ' — liquid cloth poster, ' + current.category);
    liveEl.textContent = (active + 1) + ' of ' + N + ': ' + current.title + ', ' + current.category + ', ' + current.year + '.';

    var token = ++loadToken;
    img = null;
    drawTexture();

    var nextImg = new Image();
    nextImg.onload = function () {
      if (token !== loadToken) return;
      img = nextImg;
      drawTexture();
      trigger(0.9);
    };
    nextImg.src = current.dataUri || ('../../assets/projects/' + current.img);
    if (nextImg.complete && nextImg.naturalWidth > 0) {
      img = nextImg;
      drawTexture();
    }

    trigger(0.9);
    start();
  }

  /* ---------- controls ---------- */
  stillBtn.addEventListener('click', function () {
    still = !still;
    stillBtn.setAttribute('aria-pressed', still ? 'true' : 'false');
    if (reduce) {
      calm = still ? 1 : 0;
      render(performance.now() / 1000, true);
    } else {
      start();
    }
  });

  glitchBtn.addEventListener('click', function () { trigger(1); });

  motionEl.addEventListener('input', function () {
    motion = clamp(parseInt(motionEl.value, 10) / 100, 0, 1);
    if (reduce) render(performance.now() / 1000, true);
    else start();
  });

  prevBtn.addEventListener('click', function () { setProject(active - 1); });
  nextBtn.addEventListener('click', function () { setProject(active + 1); });

  frame.addEventListener('pointerenter', function () {
    if (hovering) return;
    hovering = true;
    trigger(0.85);
    if (reduce) {
      calm = 1;
      render(performance.now() / 1000, true);
    } else {
      start();
    }
  });
  frame.addEventListener('pointerleave', function () {
    hovering = false;
    if (reduce) {
      calm = still ? 1 : 0;
      render(performance.now() / 1000, true);
    }
  });
  frame.addEventListener('focus', function () {
    hovering = true;
    trigger(0.7);
    start();
  });
  frame.addEventListener('blur', function () {
    hovering = false;
    start();
  });
  frame.addEventListener('click', function () { trigger(1); });

  window.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); setProject(active + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); setProject(active - 1); }
    else if (e.key === 'g' || e.key === 'G') { e.preventDefault(); trigger(1); }
    else if ((e.key === 's' || e.key === 'S') && tag !== 'button' && tag !== 'a') {
      e.preventDefault();
      stillBtn.click();
    }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) start();
    }, { rootMargin: '120px' }).observe(shell);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      animating = false;
      lastT = 0;
    } else if (inView) {
      start();
    }
  });

  var resizeRaf = 0;
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(rebuild);
    }).observe(frame);
  } else {
    window.addEventListener('resize', rebuild);
  }

  window.addEventListener('resize', function () {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(rebuild);
  });

  initGL();
  canvas.dataset.engine = glOK ? 'webgl' : 'canvas2d';
  setProject(0);
  rebuild();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (meshReady()) drawTexture();
    });
  }

  function meshReady() { return w > 2 && h > 2; }

  if (reduce) {
    calm = 0;
    render(performance.now() / 1000, true);
  } else {
    start();
  }
})();
