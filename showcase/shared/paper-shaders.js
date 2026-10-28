/* Shared GLSL for the crumpled-paper component (Three.js r128). */
(function () {
  var NOISE_GLSL = `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
float hash11(float n){ return fract(sin(n*127.1)*43758.5453); }
`;

  var VERT = `
uniform float uTime;
uniform float uCrumple;
uniform float uGlitch;
uniform float uSeed;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vViewPos;
varying float vH;
varying float vWob;

${NOISE_GLSL}

vec4 sheet(vec2 p){
  vec3 q = vec3(p * 1.65 + uSeed * 13.7, uTime * 0.06);
  vec2 w = vec2(snoise(q * 0.7 + 3.1), snoise(q * 0.7 + 9.7)) * 0.55;
  q.xy += w;
  float h = snoise(q) * 0.62 + snoise(q * 2.05 + 5.3) * 0.27 + snoise(q * 3.6 + 1.7) * 0.08;
  vec2 lat = vec2(snoise(q + vec3(21.0, 0.0, 0.0)), snoise(q + vec3(0.0, 37.0, 0.0))) * 0.05;
  vec3 pos = vec3(p * (1.0 - 0.1 * uCrumple) + lat * uCrumple, h * 0.36 * uCrumple);
  return vec4(pos, h);
}

void main(){
  vec2 p = position.xy * (1.0 / 2.6);
  float e = 0.0035;
  vec4 a = sheet(p);
  vec3 b = sheet(p + vec2(e, 0.0)).xyz;
  vec3 c = sheet(p + vec2(0.0, e)).xyz;
  vec3 n = normalize(cross(b - a.xyz, c - a.xyz));

  vec3 pos = a.xyz * 2.6;

  float band = floor(p.y * 16.0 + floor(uTime * 14.0));
  float r = hash11(band);
  if (r > 0.74) pos.x += (hash11(band + 7.0) - 0.5) * 0.52 * uGlitch;

  vUv = uv;
  vH = a.w;
  vWob = snoise(vec3(uv * vec2(3.2, 4.0) + uSeed * 5.0, uTime * 0.09)) * 0.5 + 0.5;
  vN = normalMatrix * n;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

  var FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform float uTime;
uniform float uCrumple;
uniform float uGlitch;
uniform float uReveal;
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uLight;
uniform vec3 uAccent;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vViewPos;
varying float vH;
varying float vWob;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main(){
  vec3 n = normalize(vN);
  bool front = gl_FrontFacing;
  if (!front) n = -n;

  // Physical Archival Exhibition Board signed distance field (crisp 18px refined corners)
  vec2 pBox = abs(vUv - 0.5) - (vec2(0.5, 0.5) - vec2(0.024));
  float dRound = length(max(pBox, 0.0)) + min(max(pBox.x, pBox.y), 0.0) - 0.024;
  float e = -dRound;

  // Soft organic paper edge modulated by physical folds when crumpled
  float cut = uCrumple * (0.012 + 0.045 * vWob);
  float alpha = smoothstep(cut, cut + 0.004, e);
  if (alpha < 0.01) discard;

  // Paper lighting: half-lambert mapped through project palette ramp
  vec3 L = normalize(vec3(-0.35, 0.55, 0.75));
  vec3 V = normalize(-vViewPos);
  float diff = pow(dot(n, L) * 0.5 + 0.5, 1.35);
  float ao = smoothstep(-0.75, 0.55, vH);
  float shade = clamp(diff * mix(1.0, 0.35 + 0.9 * ao, uCrumple), 0.0, 1.0);
  vec3 col = shade < 0.5
    ? mix(uDeep, uMid, shade * 2.0)
    : mix(uMid, uLight, (shade - 0.5) * 2.0);

  // Exhibition board artwork texture
  vec3 t = texture2D(uTex, vUv).rgb;
  vec3 lit = t * mix(0.85 + 0.15 * shade, 1.0, smoothstep(0.3, 1.0, uReveal));
  col = mix(col, lit, uReveal);

  // Fine archival paper tooth texture
  col *= 0.985 + 0.03 * hash21(vUv * 850.0);

  // Topographic fold iso-contour elevation lines + travelling scan light on crumpled paper
  float hv = vH * 10.0;
  float f = fract(hv);
  float d = min(f, 1.0 - f);
  float line = 1.0 - smoothstep(0.0, fwidth(hv) * 1.3, d);
  float scan = exp(-pow((vUv.y - fract(uTime * 0.11)) * 8.0, 2.0));
  col += uAccent * line * uCrumple * (0.22 + 0.95 * scan);

  // 3D paper fold Fresnel rim glow when crumpled
  float fres = pow(1.0 - abs(dot(n, V)), 2.5);
  col += uAccent * fres * 0.28 * uCrumple;

  // Subtle physical paper stock edge bevel (clean 1px natural highlight, zero digital ticks/neon glow)
  float bevel = smoothstep(0.0, 0.003, e - cut) * (1.0 - smoothstep(0.003, 0.008, e - cut));
  col += vec3(0.12) * bevel * (0.6 + 0.4 * shade);

  if (!front) col *= 0.62;

  gl_FragColor = vec4(col, alpha);
}
`;

  window.LAB_PAPER = { NOISE_GLSL: NOISE_GLSL, VERT: VERT, FRAG: FRAG };
})();
