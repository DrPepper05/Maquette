(function() {
  const wall = document.getElementById("studioWall");
  if (!wall) return;

  const STUDIO_CARDS = [
    // --- WEBSITES CLUSTER ---
    {
      size: "big",
      num: "01",
      taglineBadge: "Digital Flagships",
      spec: "Hand-built · Sub-second",
      title: "Websites",
      headline: "Sites that explain what you sell and bring people to your door.",
      desc: "We design and engineer bespoke digital flagships with sub-second performance, bespoke animations, and headless CMS integrations. Built by hand, free from bloated templates.",
      pillars: [
        "Editorial company flagships & brand storytelling",
        "Headless shops, product catalogs & Stripe checkout",
        "Automated booking, triage & multilingual pages"
      ],
      tags: "100% ownership · Zero fog · Weekly sprints",
      palette: ["#0c1422", "#13233a", "#1e3a5f", "#38bdf8"],
      accentColor: "#38bdf8",
      service: "A website"
    },
    {
      size: "small",
      num: "01.A",
      taglineBadge: "Editorial & Story",
      spec: "Brand presence",
      title: "Company Sites",
      desc: "Distinctive digital presence that explains what you do with clarity and poise. Sub-second page loads with zero framework bloat.",
      tags: "Custom typography · Headless CMS · Sub-second",
      palette: ["#0a101b", "#111f30", "#182e47", "#38bdf8"],
      accentColor: "#38bdf8",
      service: "A website"
    },
    {
      size: "small",
      num: "01.B",
      taglineBadge: "Headless Commerce",
      spec: "Stripe integrated",
      title: "Shops & Checkouts",
      desc: "Frictionless product catalogs, custom slide-out carts, and instant checkout flows that turn browsers into buyers.",
      tags: "Instant checkout · Inventory sync · Headless",
      palette: ["#09111c", "#102033", "#17314e", "#38bdf8"],
      accentColor: "#38bdf8",
      service: "A website"
    },

    // --- AUTOMATIONS CLUSTER ---
    {
      size: "small",
      num: "02.A",
      taglineBadge: "LLM Workers",
      spec: "Autonomous triage",
      title: "AI Agents",
      desc: "Autonomous workers that ingest supplier PDFs, cross-reference invoices in your ERP, and prepare bank payouts with zero human paperwork.",
      tags: "Document extraction · Invoice audit · Smart triage",
      palette: ["#160c12", "#2c131f", "#47182b", "#e0a458"],
      accentColor: "#e0a458",
      service: "An automation"
    },
    {
      size: "small",
      num: "02.B",
      taglineBadge: "System Integration",
      spec: "Real-time sync",
      title: "Data Pipelines",
      desc: "Custom serverless background workers that replace fragile Zapier zaps. Bi-directional sync between your CRM, billing, and database.",
      tags: "Zero Zapier limits · Webhooks · Bank-grade security",
      palette: ["#170d13", "#2f1422", "#4b1b2f", "#e0a458"],
      accentColor: "#e0a458",
      service: "An automation"
    },
    {
      size: "big",
      num: "02",
      taglineBadge: "Autonomous Engines",
      spec: "Agents + scripts",
      title: "Automations",
      headline: "The repetitive work between your tools, eliminated.",
      desc: "End-to-end background workers that ingest documents, route customer leads, sync databases, and trigger actions. A human always approves the decisions that matter.",
      pillars: [
        "Autonomous supplier invoice extraction & ERP audits",
        "Lead routing, customer qualification & calendar booking",
        "Custom serverless scripts replacing expensive Zapier plans"
      ],
      tags: "14 hours of weekly spreadsheets · Zero",
      palette: ["#1a0e15", "#321320", "#551b2e", "#ff6b35"],
      accentColor: "#ff6b35",
      service: "An automation"
    },

    // --- SOFTWARE CLUSTER ---
    {
      size: "big",
      num: "03",
      taglineBadge: "Tailored Platforms",
      spec: "Built around you",
      title: "Software",
      headline: "Internal tools and portals built around how your team already works.",
      desc: "Custom web applications, client portals, and operational dashboards that replace fractured spreadsheets and off-the-shelf software sprawl. Built for speed and longevity.",
      pillars: [
        "Self-service client portals & interactive customer hubs",
        "Operational dashboards & unified company control rooms",
        "Custom workflow web apps tailored to your business rules"
      ],
      tags: "Zero monthly seat licenses · 100% code handover",
      palette: ["#151310", "#281e17", "#443123", "#d47860"],
      accentColor: "#d47860",
      service: "Custom software"
    },
    {
      size: "small",
      num: "03.A",
      taglineBadge: "Customer Hubs",
      spec: "Self-service",
      title: "Client Portals",
      desc: "Secure customer workspaces for project deliverables, contract approvals, invoice downloads, and status tracking in real time.",
      tags: "Role permissions · Secure auth · Custom domain",
      palette: ["#14110f", "#241b14", "#3d2a1d", "#d47860"],
      accentColor: "#d47860",
      service: "Custom software"
    },
    {
      size: "small",
      num: "03.B",
      taglineBadge: "Operations",
      spec: "Spreadsheet killer",
      title: "Internal Tools",
      desc: "Bespoke control rooms that turn five different spreadsheets into single-click workflows with audit logs and role management.",
      tags: "Custom dashboards · Fast search · Database views",
      palette: ["#13100e", "#221912", "#382619", "#d47860"],
      accentColor: "#d47860",
      service: "Custom software"
    }
  ];

  const PAD = 40, FR = 7;
  const A = 4.0, K = 0, OM = 0.62;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2.0);

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
      /* Exact rounded-corner distance test: discards right-angle corners */
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

      /* silk lighting: balanced highlights and shadows */
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

  /* Clear wall and create DOM elements */
  wall.innerHTML = "";
  const serviceSelect = document.getElementById('project');

  const cards = STUDIO_CARDS.map((data, idx) => {
    const el = document.createElement("div");
    el.className = "card-cloth";
    el.setAttribute("data-size", data.size);
    el.tabIndex = 0;
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", data.title + ": " + (data.headline || data.desc));

    const cv = document.createElement("canvas");
    el.appendChild(cv);

    const link = document.createElement("a");
    link.className = "card-cloth-link";
    link.href = "#contact";
    link.setAttribute("data-service", data.service);
    link.setAttribute("aria-label", "Request " + data.service + " Prototype");
    link.addEventListener('click', function() {
      if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().indexOf(data.service.toLowerCase()) !== -1) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
    el.appendChild(link);
    wall.appendChild(el);

    const o = {
      el,
      cv,
      ctx: cv.getContext("2d"),
      data,
      idx,
      calm: 0,
      target: 0,
      vis: true,
      tex: null,
      svgSeed: idx * 883 + 29
    };

    const on = () => {
      if (o.hover) return;
      o.hover = true;
      o.target = 1;
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

  function renderBigCardText(g, d, w, h) {
    const isNarrow = (w < 440);
    const padX = Math.round(Math.min(52, Math.max(isNarrow ? 24 : 30, w * 0.055)));
    const padY = Math.round(Math.min(48, Math.max(isNarrow ? 26 : 28, h * 0.06)));

    let y = padY + (isNarrow ? 12 : 14);

    // Header Row: Specimen Catalog & Kicker
    g.font = "700 13px 'DM Mono', monospace";
    g.fillStyle = d.accentColor || "#d47860";
    g.fillText(d.num, padX, y);

    g.font = isNarrow ? "600 11.5px 'Plus Jakarta Sans', sans-serif" : "600 12px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.70)";
    g.fillText("·  " + (d.taglineBadge || d.category || ""), padX + 36, y);

    if (!isNarrow) {
      g.textAlign = "right";
      g.font = "600 12px 'Plus Jakarta Sans', sans-serif";
      g.fillStyle = "rgba(245, 241, 233, 0.55)";
      g.fillText(d.spec, w - padX, y);
      g.textAlign = "left";
    }

    // Fine curatorial divider
    y += (isNarrow ? 16 : 20);
    g.beginPath();
    g.moveTo(padX, y);
    g.lineTo(w - padX, y);
    g.strokeStyle = "rgba(245, 241, 233, 0.08)";
    g.lineWidth = 1;
    g.stroke();

    // Major Title
    y += (isNarrow ? 38 : 48);
    const titleSize = isNarrow
      ? Math.round(Math.min(34, Math.max(28, w * 0.08)))
      : Math.round(Math.min(48, Math.max(34, w * 0.052)));
    g.font = "700 " + titleSize + "px 'Bricolage Grotesque', sans-serif";
    g.fillStyle = "#f5f1e9";
    g.fillText(d.title, padX, y);

    // Headline
    y += (isNarrow ? 24 : 28);
    g.font = isNarrow ? "500 14px 'Plus Jakarta Sans', sans-serif" : "500 15px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.95)";
    const hLines = wrapText(g, d.headline, w - padX * 2);
    const hLineH = isNarrow ? 20 : 23;
    hLines.forEach(l => {
      g.fillText(l, padX, y);
      y += hLineH;
    });

    // Story Description
    y += (isNarrow ? 8 : 10);
    g.font = isNarrow ? "400 12.5px 'Plus Jakarta Sans', sans-serif" : "400 13.5px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.72)";
    const dLines = wrapText(g, d.desc, w - padX * 2);
    const dLineH = isNarrow ? 18 : 21;
    dLines.forEach(l => {
      g.fillText(l, padX, y);
      y += dLineH;
    });

    // Footer divider position
    const footY = h - padY;
    const footDividerY = footY - (isNarrow ? 34 : 26);

    // Pillar Bullets
    if (d.pillars && d.pillars.length) {
      y += (isNarrow ? 14 : 16);
      const bulletMaxW = w - padX * 2 - 22;
      const pLineH = isNarrow ? 17 : 19;
      const pItemGap = isNarrow ? 8 : 8;
      const pFont = isNarrow ? "400 12px 'Plus Jakarta Sans', sans-serif" : "400 13px 'Plus Jakarta Sans', sans-serif";

      d.pillars.forEach((pText) => {
        g.font = pFont;
        const pLines = wrapText(g, pText, bulletMaxW);
        const blockH = pLines.length * pLineH;

        if (y + blockH < footDividerY - 10) {
          g.font = "600 11px 'Plus Jakarta Sans', sans-serif";
          g.fillStyle = d.accentColor || "#d47860";
          g.fillText("✦", padX, y);

          g.font = pFont;
          g.fillStyle = "rgba(245, 241, 233, 0.86)";
          pLines.forEach((pl, lineIdx) => {
            g.fillText(pl, padX + 18, y + lineIdx * pLineH);
          });

          y += blockH + pItemGap;
        }
      });
    }

    // Footer Row
    g.beginPath();
    g.moveTo(padX, footDividerY);
    g.lineTo(w - padX, footDividerY);
    g.strokeStyle = "rgba(245, 241, 233, 0.08)";
    g.lineWidth = 1;
    g.stroke();

    if (isNarrow) {
      g.font = "600 11px 'Plus Jakarta Sans', sans-serif";
      g.fillStyle = "#f88847";
      let tagText = d.tags;
      const maxTagW = w - padX * 2;
      if (g.measureText(tagText).width > maxTagW) {
        while (tagText.length > 8 && g.measureText(tagText + "…").width > maxTagW) {
          tagText = tagText.slice(0, -1);
        }
        tagText += "…";
      }
      g.fillText(tagText, padX, footY - 12);

      g.font = "700 12px 'Plus Jakarta Sans', sans-serif";
      g.fillStyle = "#f5f1e9";
      g.fillText("Request prototype ↗", padX, footY + 8);
    } else {
      g.font = "600 11.5px 'Plus Jakarta Sans', sans-serif";
      g.fillStyle = "#f88847";
      g.fillText(d.tags, padX, footY);

      g.textAlign = "right";
      g.font = "700 12px 'Plus Jakarta Sans', sans-serif";
      g.fillStyle = "#f5f1e9";
      g.fillText("Request prototype ↗", w - padX, footY);
      g.textAlign = "left";
    }
  }

  function renderSmallCardText(g, d, w, h) {
    const padX = Math.round(Math.min(38, Math.max(22, w * 0.055)));
    const padY = Math.round(Math.min(36, Math.max(22, h * 0.10)));

    let y = padY + 8;

    // Header Row: Specimen Catalog & Kicker
    g.font = "700 12px 'DM Mono', monospace";
    g.fillStyle = d.accentColor || "#d47860";
    g.fillText(d.num, padX, y);

    if (w >= 340) {
      g.textAlign = "right";
      g.font = "600 11px 'Plus Jakarta Sans', sans-serif";
      g.fillStyle = "rgba(245, 241, 233, 0.62)";
      g.fillText(d.taglineBadge, w - padX, y);
      g.textAlign = "left";
    }

    // Fine curatorial divider
    y += 16;
    g.beginPath();
    g.moveTo(padX, y);
    g.lineTo(w - padX, y);
    g.strokeStyle = "rgba(245, 241, 233, 0.08)";
    g.lineWidth = 1;
    g.stroke();

    // Title
    y += 32;
    const titleSize = Math.round(Math.min(28, Math.max(22, w * 0.048)));
    g.font = "700 " + titleSize + "px 'Bricolage Grotesque', sans-serif";
    g.fillStyle = "#f5f1e9";
    g.fillText(d.title, padX, y);

    // Description
    y += 24;
    g.font = "400 12.5px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "rgba(245, 241, 233, 0.78)";
    const sLines = wrapText(g, d.desc, w - padX * 2);
    sLines.forEach(l => {
      if (y < h - 46) {
        g.fillText(l, padX, y);
        y += 19;
      }
    });

    // Footer Row
    const footY = h - padY + 4;
    g.font = "600 10.5px 'Plus Jakarta Sans', sans-serif";
    g.fillStyle = "#f88847";
    const tagText = (w < 340) ? d.tags.split(' · ')[0] : d.tags;
    g.fillText(tagText, padX, footY);

    g.textAlign = "right";
    g.font = "700 13px 'DM Mono', monospace";
    g.fillStyle = "#f5f1e9";
    g.fillText("↗", w - padX, footY);
    g.textAlign = "left";
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
    const isBig = (d.size === "big");
    const rad = isBig ? 26 : 22;

    // 1. Deep lacquer base gradient (full bleed so displaced shader UVs never sample black)
    const bgGrad = g.createLinearGradient(0, 0, w * 0.35, h);
    bgGrad.addColorStop(0, d.palette[0]);
    bgGrad.addColorStop(0.55, d.palette[1]);
    bgGrad.addColorStop(1, d.palette[0]);
    g.fillStyle = bgGrad;
    g.fillRect(0, 0, w, h);

    // 2. Ambient luminous glow pool
    const glow = g.createRadialGradient(
      isBig ? w * 0.78 : w * 0.82,
      isBig ? h * 0.30 : h * 0.28,
      10,
      isBig ? w * 0.78 : w * 0.82,
      isBig ? h * 0.30 : h * 0.28,
      Math.max(w, h) * 0.90
    );
    glow.addColorStop(0, d.palette[2] + "48");
    glow.addColorStop(0.5, d.palette[1] + "22");
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

    // 4. Subtle inner museum frame hairline border
    roundRect(g, 1, 1, w - 2, h - 2, rad - 1);
    g.strokeStyle = "rgba(245, 241, 233, 0.12)";
    g.lineWidth = 1;
    g.stroke();

    roundRect(g, 2, 2, w - 4, h - 4, rad - 2);
    g.strokeStyle = (d.accentColor || "#d47860") + "1a";
    g.lineWidth = 1;
    g.stroke();

    // 5. Render typography
    if (isBig) {
      renderBigCardText(g, d, w, h);
    } else {
      renderSmallCardText(g, d, w, h);
    }

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
    const nx = Math.min(100, Math.ceil(o.w / 10)), ny = Math.min(100, Math.ceil(o.h / 10));
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

  function buildAll() {
    wallW = wall.offsetWidth || 1;
    wallH = wall.offsetHeight || 1;
    const D = dpr();
    let mw = 1, mh = 1;

    cards.forEach(o => {
      const e = o.el;
      o.w = e.offsetWidth;
      o.h = e.offsetHeight;
      if (!o.w || !o.h) return;
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
      if (!o.w || !o.h) return;
      meshFor(o);
      makeTex(o);
      if (reduce || !gl) {
        draw(o, 0);
      }
    });
  }

  function draw(o, t) {
    if (!o.tex) return;
    const g = o.ctx, f = 1 - 0.92 * o.calm;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, o.pw, o.ph);

    if (!gl || !o.glTex) {
      const D = dpr(), rad = (o.data.size === "big" ? 26 : 22) * D;
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
    gl.uniform1f(loc.u_rad, o.data.size === "big" ? 26.0 : 22.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, o.vbo);
    gl.vertexAttribPointer(loc.a, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.ibo);
    gl.bindTexture(gl.TEXTURE_2D, o.glTex);

    gl.drawElements(gl.TRIANGLES, o.count, gl.UNSIGNED_SHORT, 0);
    g.drawImage(glc, 0, glc.height - o.ph, o.pw, o.ph, 0, 0, o.pw, o.ph);
  }

  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      const o = cards.find(c => c.el === e.target);
      if (o) o.vis = e.isIntersecting;
    });
  }, { rootMargin: "120px" });

  cards.forEach(o => io.observe(o.el));

  let raf = 0;
  let lastWallW = 0, lastWallH = 0;
  new ResizeObserver(() => {
    const nw = wall.offsetWidth;
    const nh = wall.offsetHeight;
    if (lastWallW > 0 && Math.abs(nw - lastWallW) < 2 && Math.abs(nh - lastWallH) < 120) return;
    lastWallW = nw;
    lastWallH = nh;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(buildAll);
  }).observe(wall);

  buildAll();
  if (document.fonts) document.fonts.ready.then(buildAll);

  const countEl = document.getElementById("servicesCount");
  if (countEl) {
    countEl.textContent = "01 — 03 · Three Disciplines";
  }

  let wallVisible = false;
  let animating = false;

  function startAnimating() {
    if (animating || reduce) return;
    animating = true;
    requestAnimationFrame(loop);
  }

  function loop(ms) {
    if (!wallVisible) { animating = false; return; }
    const t = ms / 1000;
    for (const o of cards) {
      o.calm += (o.target - o.calm) * (o.target ? 0.16 : 0.07);
      if (o.vis && o.w > 0 && o.h > 0) draw(o, t);
    }
    if (animating) requestAnimationFrame(loop);
  }

  if (reduce) {
    // Render static frame for reduced motion
    wallVisible = true;
    cards.forEach(o => draw(o, 0));
  } else if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      wallVisible = entries[0].isIntersecting;
      if (wallVisible) startAnimating();
    }, { rootMargin: '200px' }).observe(wall);
  } else {
    wallVisible = true;
    startAnimating();
  }
})();
