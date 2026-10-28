/* ===== Story 3D Crumpled Paper WebGL Simulation ===== */
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
  cam.position.z = 6;

  var COM = 'float rb(vec2 p,vec2 c,vec2 s,float r){vec2 q=abs(p-c)-s+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}' +
    'float cr(vec2 p,vec2 c,float r){return length(p-c)-r;}' +
    'float bx(vec2 p,vec2 c,vec2 s,float r,float h){return h*(1.-smoothstep(-.09,.09,rb(p,c,s,r)));}' +
    'float bf(vec2 p,vec2 c,vec2 s,float r,float h){return h*(1.-smoothstep(-.035,.035,rb(p,c,s,r)));}' +
    'float cyc(vec2 p,vec2 c,float r,float h){return h*(1.-smoothstep(-.03,.03,cr(p,c,r)));}' +
    'float blocks(vec2 p){float h=bx(p,vec2(0.,.98),vec2(1.5,.12),.06,.1);h=max(h,cyc(p,vec2(-1.36,.98),.06,.16));h=max(h,cyc(p,vec2(1.13,.98),.05,.16));h=max(h,cyc(p,vec2(1.27,.98),.05,.16));h=max(h,cyc(p,vec2(1.41,.98),.05,.16));h=max(h,bf(p,vec2(-.75,.52),vec2(.6,.07),.03,.3));h=max(h,bf(p,vec2(-.91,.34),vec2(.44,.07),.03,.3));h=max(h,bf(p,vec2(-1.03,.1),vec2(.3,.035),.02,.15));h=max(h,bf(p,vec2(-1.08,-.04),vec2(.25,.035),.02,.15));h=max(h,bf(p,vec2(-1.12,-.3),vec2(.21,.11),.06,.42));h=max(h,bx(p,vec2(.72,.45),vec2(.58,.4),.1,.18));h=max(h,bf(p,vec2(.45,.24),vec2(.05,.15),.05,.24));h=max(h,bf(p,vec2(.72,.3),vec2(.05,.21),.05,.26));h=max(h,bf(p,vec2(.99,.26),vec2(.05,.17),.05,.28));h=max(h,bx(p,vec2(-.95,-.78),vec2(.42,.3),.08,.3));h=max(h,bx(p,vec2(0.,-.78),vec2(.42,.3),.08,.3));h=max(h,bx(p,vec2(.95,-.78),vec2(.42,.3),.08,.3));h=max(h,cyc(p,vec2(-1.18,-.6),.07,.34));h=max(h,cyc(p,vec2(-.23,-.6),.07,.34));h=max(h,cyc(p,vec2(.72,-.6),.07,.34));h=max(h,bf(p,vec2(-.94,-.6),vec2(.13,.028),.02,.36));h=max(h,bf(p,vec2(-1.,-.7),vec2(.09,.028),.02,.36));h=max(h,bf(p,vec2(-.95,-.84),vec2(.2,.028),.02,.36));h=max(h,bf(p,vec2(.01,-.6),vec2(.13,.028),.02,.36));h=max(h,bf(p,vec2(-.05,-.7),vec2(.09,.028),.02,.36));h=max(h,bf(p,vec2(0.,-.84),vec2(.2,.028),.02,.36));h=max(h,bf(p,vec2(.96,-.6),vec2(.13,.028),.02,.36));h=max(h,bf(p,vec2(.9,-.7),vec2(.09,.028),.02,.36));h=max(h,bf(p,vec2(.95,-.84),vec2(.2,.028),.02,.36));return h;}';

  var VS = 'uniform float uFlat,uBuild,uR,uSeed;uniform vec2 uM;varying vec2 vP;varying vec3 vN;varying float vB;' + COM +
    'float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}' +
    'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hs(i),hs(i+vec2(1.,0.)),f.x),mix(hs(i+vec2(0.,1.)),hs(i+vec2(1.,1.)),f.x),f.y);}' +
    'float rid(vec2 p){float a=0.,w=.5;for(int i=0;i<4;i++){a+=w*(1.-abs(2.*vn(p)-1.));p=p*2.03+7.1;w*=.5;}return a;}' +
    'float kk(vec2 p){return (1.-uFlat)*smoothstep(uR*.3,uR*1.1,length(p-uM));}' +
    'vec3 T(vec2 p){float k=kk(p);vec2 w=(vec2(rid(p*1.6+3.1),rid(p*1.6+9.7))-.62)*.35*k;float z=(rid(p*1.35+uSeed)-.62)*.75*k+uBuild*blocks(p);return vec3(p+w,z);}' +
    'void main(){vec2 p=position.xy;vec3 a=T(p);float e=.02;vec3 n=normalize(cross(T(p+vec2(e,0.))-a,T(p+vec2(0.,e))-a));vN=normalMatrix*n;vP=p;vB=uBuild*blocks(p);gl_Position=projectionMatrix*modelViewMatrix*vec4(a,1.);}';

  var FS = 'uniform float uFlat,uWire,uBuild,uGlow,uT;varying vec2 vP;varying vec3 vN;varying float vB;' + COM +
    'void main(){vec3 N=normalize(vN);if(!gl_FrontFacing)N=-N;vec3 L=normalize(vec3(-.3,.5,.8));float d=max(dot(N,L),0.);float edge=pow(1.-clamp(N.z,0.,1.),1.4);' +
    'vec3 gold=vec3(1.,.69,.125),dg=vec3(.8,.45,.02),bone=vec3(.93,.9,.87),cy=vec3(.31,.89,.82),tl=vec3(.16,.62,.56),sky=vec3(.5,.7,.8);' +
    'vec3 col=bone*(.10+.85*d)+gold*edge*.22*(1.-uFlat);' +
    'float mnav=bx(vP,vec2(0.,.98),vec2(1.5,.12),.06,1.),mlg=cyc(vP,vec2(-1.36,.98),.06,1.),mnd=cyc(vP,vec2(1.13,.98),.05,1.)+cyc(vP,vec2(1.27,.98),.05,1.)+cyc(vP,vec2(1.41,.98),.05,1.);' +
    'float mh=bf(vP,vec2(-.75,.52),vec2(.6,.07),.03,1.)+bf(vP,vec2(-.91,.34),vec2(.44,.07),.03,1.),ms=bf(vP,vec2(-1.03,.1),vec2(.3,.035),.02,1.)+bf(vP,vec2(-1.08,-.04),vec2(.25,.035),.02,1.),mct=bf(vP,vec2(-1.12,-.3),vec2(.21,.11),.06,1.);' +
    'float mpn=bx(vP,vec2(.72,.45),vec2(.58,.4),.1,1.),mb=bf(vP,vec2(.45,.24),vec2(.05,.15),.05,1.)+bf(vP,vec2(.72,.3),vec2(.05,.21),.05,1.)+bf(vP,vec2(.99,.26),vec2(.05,.17),.05,1.);' +
    'float mc=bx(vP,vec2(-.95,-.78),vec2(.42,.3),.08,1.)+bx(vP,vec2(0.,-.78),vec2(.42,.3),.08,1.)+bx(vP,vec2(.95,-.78),vec2(.42,.3),.08,1.),md=cyc(vP,vec2(-1.18,-.6),.07,1.)+cyc(vP,vec2(-.23,-.6),.07,1.)+cyc(vP,vec2(.72,-.6),.07,1.);' +
    'float mls=bf(vP,vec2(-.94,-.6),vec2(.13,.028),.02,1.)+bf(vP,vec2(-1.,-.7),vec2(.09,.028),.02,1.)+bf(vP,vec2(-.95,-.84),vec2(.2,.028),.02,1.)+bf(vP,vec2(.01,-.6),vec2(.13,.028),.02,1.)+bf(vP,vec2(-.05,-.7),vec2(.09,.028),.02,1.)+bf(vP,vec2(0.,-.84),vec2(.2,.028),.02,1.)+bf(vP,vec2(.96,-.6),vec2(.13,.028),.02,1.)+bf(vP,vec2(.9,-.7),vec2(.09,.028),.02,1.)+bf(vP,vec2(.95,-.84),vec2(.2,.028),.02,1.);' +
    'vec3 bc=bone*(mnav+mh+ms+mc+mls)+gold*(mlg+mct)+sky*mpn+tl*(mnd+mb+md);float mk=smoothstep(.01,.05,vB);' +
    'col=mix(col,bc*(.2+.72*d),mk);col+=bc*uGlow*.25*mk;' +
    'float sd=rb(vP,vec2(0.,.98),vec2(1.5,.12),.06);sd=min(sd,rb(vP,vec2(-.75,.52),vec2(.6,.07),.03));sd=min(sd,rb(vP,vec2(-.91,.34),vec2(.44,.07),.03));sd=min(sd,rb(vP,vec2(-1.03,.1),vec2(.3,.035),.02));' +
    'sd=min(sd,rb(vP,vec2(-1.08,-.04),vec2(.25,.035),.02));sd=min(sd,rb(vP,vec2(-1.12,-.3),vec2(.21,.11),.06));sd=min(sd,rb(vP,vec2(.72,.45),vec2(.58,.4),.1));sd=min(sd,rb(vP,vec2(.45,.24),vec2(.05,.15),.05));' +
    'sd=min(sd,rb(vP,vec2(.72,.3),vec2(.05,.21),.05));sd=min(sd,rb(vP,vec2(.99,.26),vec2(.05,.17),.05));sd=min(sd,rb(vP,vec2(-.95,-.78),vec2(.42,.3),.08));sd=min(sd,rb(vP,vec2(0.,-.78),vec2(.42,.3),.08));' +
    'sd=min(sd,rb(vP,vec2(.95,-.78),vec2(.42,.3),.08));sd=min(sd,cr(vP,vec2(-1.36,.98),.06));sd=min(sd,min(cr(vP,vec2(1.13,.98),.05),cr(vP,vec2(1.27,.98),.05)));sd=min(sd,min(cr(vP,vec2(1.41,.98),.05),cr(vP,vec2(-1.18,-.6),.07)));' +
    'sd=min(sd,min(cr(vP,vec2(-.23,-.6),.07),cr(vP,vec2(.72,-.6),.07)));' +
    'sd=min(sd,rb(vP,vec2(-.94,-.6),vec2(.13,.028),.02));sd=min(sd,rb(vP,vec2(-1.,-.7),vec2(.09,.028),.02));sd=min(sd,rb(vP,vec2(-.95,-.84),vec2(.2,.028),.02));sd=min(sd,rb(vP,vec2(.01,-.6),vec2(.13,.028),.02));sd=min(sd,rb(vP,vec2(-.05,-.7),vec2(.09,.028),.02));' +
    'sd=min(sd,rb(vP,vec2(0.,-.84),vec2(.2,.028),.02));sd=min(sd,rb(vP,vec2(.96,-.6),vec2(.13,.028),.02));sd=min(sd,rb(vP,vec2(.9,-.7),vec2(.09,.028),.02));sd=min(sd,rb(vP,vec2(.95,-.84),vec2(.2,.028),.02));' +
    'float ao=(1.-smoothstep(0.,.18,sd))*uBuild;' +
    'float msh=max(max(bx(vP-vec2(.05,-.09),vec2(0.,.98),vec2(1.5,.12),.06,1.),bx(vP-vec2(.1,-.18),vec2(-.95,-.78),vec2(.42,.3),.08,1.)),max(max(bx(vP-vec2(.1,-.18),vec2(0.,-.78),vec2(.42,.3),.08,1.),bx(vP-vec2(.1,-.18),vec2(.95,-.78),vec2(.42,.3),.08,1.)),max(bx(vP-vec2(.1,-.15),vec2(-1.12,-.3),vec2(.21,.11),.06,1.),bx(vP-vec2(.14,-.22),vec2(.72,.45),vec2(.58,.4),.1,1.))));' +
    'col*=1.-(msh*uBuild*.32+ao*.2);' +
    'float ln=(1.-smoothstep(0.,.012,abs(sd)))*uWire*(1.-uBuild*.85);' +
    'vec2 g=abs(fract(vP*2.5)-.5);float gr=(1.-smoothstep(0.,.02,min(.5-g.x,.5-g.y)))*uWire*(1.-uBuild);' +
    'float sc=(1.-smoothstep(0.,.02,abs(vP.y-(fract(uT*.12)*3.2-1.6))))*uWire*(1.-uBuild);' +
    'col=mix(col,dg,ln*.95);col-=gr*.08;col+=cy*sc*.3;col+=gold*edge*uGlow*.3;gl_FragColor=vec4(col,1.);}';

  var mat = new THREE.ShaderMaterial({
    vertexShader: VS,
    fragmentShader: FS,
    side: THREE.DoubleSide,
    uniforms: {
      uFlat: { value: 0 },
      uWire: { value: 0 },
      uBuild: { value: 0 },
      uGlow: { value: 0 },
      uT: { value: 0 },
      uR: { value: 1 },
      uSeed: { value: 3.7 },
      uM: { value: new THREE.Vector2(9, 9) }
    }
  });

  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.6, 180, 130), mat);
  scene.add(mesh);

  var vw = 7.6, vh = 4.37, asp = 1.74;

  function size() {
    var w = cv.clientWidth, h = cv.clientHeight;
    R.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    R.setSize(w, h, false);
    asp = w / h;
    cam.aspect = asp;
    cam.updateProjectionMatrix();
    vh = 2 * 6 * Math.tan(THREE.MathUtils.degToRad(20));
    vw = vh * asp;
    if (calm) draw(0);
  }

  function sm(a, b, x) {
    var t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  var cx = 0, cy = 0, cr = 1, shown = -1, stg = -1, fxs = '';
  var LB = [
    ['Fig. 1: The brief', 'Crumpled paper that smooths itself out. No hands needed.'],
    ['Fig. 1: The brief', 'Still crumpled. This is where every project starts.'],
    ['Fig. 2: The maquette', 'Smoothed paper with a drawn plan. Free of charge.'],
    ['Fig. 3: The build', 'The plan, standing up.'],
    ['Fig. 4: The handover', 'Paper, code and keys. Yours to keep.']
  ];

  function draw(now) {
    var t = now / 1000;
    var s = Math.min(4, Math.max(0, -story.getBoundingClientRect().top / innerHeight));
    var tx = 9, ty = 9;
    if (!calm) {
      tx = Math.cos(t * 0.6) * 1.5 + Math.sin(t * 1.3) * 0.18;
      ty = Math.sin(t * 0.8) * 1 + Math.cos(t * 1.7) * 0.14;
    }
    cx += (tx - cx) * 0.07;
    cy += (ty - cy) * 0.07;
    cr += (1 - cr) * 0.08;

    var u = mat.uniforms;
    u.uM.value.set(cx, cy);
    u.uR.value = cr;
    u.uFlat.value = sm(1.25, 2.0, s);
    u.uWire.value = sm(1.7, 2.3, s);
    u.uBuild.value = sm(2.6, 3.3, s);
    u.uGlow.value = sm(3.6, 4.0, s) * (0.75 + 0.25 * Math.sin(t * 2));
    u.uT.value = t;

    var i = Math.min(3, Math.floor(s)), f = sm(0.1, 1, s - i);
    var sd = [1, -1, -1, 1, 1];
    var px = sd[i] + (sd[i + 1] - sd[i]) * f;
    var sc;

    if (asp < 1) {
      mesh.position.set(0, vh * 0.17 + (calm ? 0 : Math.sin(t * 0.55) * 0.05), 0);
      sc = Math.min(1, vw * 0.85 / 3.6);
      px = 0;
    } else {
      mesh.position.set(px * vw * 0.25, (calm ? 0 : Math.sin(t * 0.55) * 0.04), 0);
      sc = Math.min(1, vw * 0.44 / 3.6);
    }

    mesh.scale.setScalar(sc);
    mesh.rotation.set(
      -0.3 - 0.7 * sm(2.4, 3.3, s) + (calm ? 0 : Math.sin(t * 0.5) * 0.04),
      (calm ? 0 : Math.cos(t * 0.4) * 0.07),
      Math.sin(t * 0.35) * 0.5 * sm(2.8, 3.6, s) + (calm ? 0 : Math.sin(t * 0.6) * 0.03)
    );

    var fx = (50 + px * 25).toFixed(1) + '%';
    if (fx !== fxs) {
      fxs = fx;
      stage.style.setProperty('--fx', fx);
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

  size();
  window.addEventListener('resize', size);

  if (!calm) {
    (function loop(now) {
      var r = story.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) draw(now);
      requestAnimationFrame(loop);
    })(0);
  } else {
    draw(0);
    window.addEventListener('scroll', function() { draw(0); }, { passive: true });
  }
})();
