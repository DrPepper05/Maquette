# Story Component

## Purpose
The hero section and continuous interactive narrative of the site. Features sticky viewport WebGL simulation (`Three.js`) where crumpled paper unfolds into a flat maquette, transitions into a wireframe blueprint, rises as a dimensional product model, and glows with 100% idea clarity.

## Files
- `story.html`: Markup containing the `#stage` canvas container, HUD clarity meter, and alternating text panels (`.panel.l` / `.panel.r`).
- `story.css`: Styling for sticky stage, lighting pool, HUD meter, alternating panels, and responsive mobile collapse.
- `story.js`: WebGL shader material and scroll-driven animation logic (`Three.js`).
- `index.html`: Fully self-contained runnable preview file.

## Key Elements
- `#gl`: The WebGL canvas rendered by `story.js`.
- `.meter` / `#bar` / `#pct`: Real-time "idea clarity" progress meter.
- `.label` / `#lt` / `#ld`: Dynamic figure legend captions ("Fig. 1: The brief" ... "Fig. 4: The handover").
- `.panel.l` & `.panel.r`: Alternating narrative panels designed for smooth reading flow.

## Preview
Open `index.html` directly in any web browser or run `npm run preview`.
