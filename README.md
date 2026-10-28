# Maquette — Website & Modular Component Architecture

> **From foggy idea to finished product.**  
> Curated website with cursive editorial typography (`Instrument Serif` italic), continuous narrative flow, 3D WebGL simulations (`Three.js`), and a fully decoupled component architecture designed for AI agent collaboration.

---

## 📁 Project Architecture

Every component of the website is **separated and isolated** into its own folder with its own HTML snippet, dedicated CSS, optional JavaScript, documentation, and a **standalone runnable preview (`index.html`)**. This allows any human developer or AI agent to work on an individual section in total isolation without side effects.

```
site_maquette/
├── archive/                   # Preserved original reference files and source zip
├── components/                # Independent, self-contained components
│   ├── header/                # Fixed navigation with cursive logo & frosted glass
│   │   ├── header.html        # Markup snippet
│   │   ├── header.css         # Component styling
│   │   ├── index.html         # Standalone runnable preview
│   │   └── README.md          # Agent documentation
│   ├── story/                 # "From Foggy Idea to Finished Product" WebGL particle walkthrough
│   │   ├── story.html         # Markup & clarity meter
│   │   ├── story.css          # Sticky stage & narrative panel styles
│   │   ├── story.js           # Three.js 5-state particle fog-to-product simulation
│   │   ├── index.html         # Standalone runnable preview
│   │   └── README.md          # Agent documentation
│   ├── services/              # "Three wings, one team" (Websites, Automations, Software)
│   │   ├── services.html      # Continuous row markup & category tags
│   │   ├── services.css       # Row hover physics & typography
│   │   ├── index.html         # Standalone runnable preview
│   │   └── README.md          # Agent documentation
│   ├── gallery/               # "The Collection" 3D project showcase carousel
│   │   ├── gallery.html       # Carousel markup & metadata HUD
│   │   ├── gallery.css        # 3D perspective & controls styling
│   │   ├── gallery.js         # Three.js shader, drag physics & case studies
│   │   ├── index.html         # Standalone runnable preview
│   │   └── README.md          # Agent documentation
│   ├── why/                   # "How we work with you" (3 value cards)
│   │   ├── why.html           # 3-pillar card markup
│   │   ├── why.css            # Minimalist card styling & elevations
│   │   ├── index.html         # Standalone runnable preview
│   │   └── README.md          # Agent documentation
│   ├── faq/                   # "Visitor information" accordions
│   │   ├── faq.html           # Semantic <details>/<summary> markup
│   │   ├── faq.css            # Cursive titles & rotatable + indicators
│   │   ├── index.html         # Standalone runnable preview
│   │   └── README.md          # Agent documentation
│   ├── contact/               # Prototype request form & briefing invite
│   │   ├── contact.html       # 4-field inquiry form markup
│   │   ├── contact.css        # Input styling & responsive layout
│   │   ├── contact.js         # Submission feedback handler
│   │   ├── index.html         # Standalone runnable preview
│   │   └── README.md          # Agent documentation
│   ├── album/                 # "Selected Projects" album hero alternative
│   │   ├── album.html         # Markup & thumbnail strip
│   │   ├── album.css          # Styling & hero transitions
│   │   ├── album.js           # Auto-cycling & blur reveal
│   │   └── index.html         # Standalone runnable preview
│   └── footer/                # Quiet closing bar
│       ├── footer.html        # Footer markup
│       ├── footer.css         # Styling
│       ├── index.html         # Standalone runnable preview
│       └── README.md          # Agent documentation
├── showcase/                  # Interactive Component Showcase & Motion Lab
│   ├── index.html             # Living visual gallery & showcase hub
│   ├── catalog.css            # Showcase presentation styling & effects
│   ├── carousel/              # 3D crumpled paper collection carousel (Hero)
│   ├── story-paper/           # The original 3D crumpled paper story ("Your business runs on crumpled paper")
│   ├── wave-paintings/        # Sine-wave drifting painting carousel
│   ├── crumpled-paper/        # Real-time WebGL paper crumple & unfold specimen card
│   ├── glitch-painting/       # RGB channel split & scanline burst study
│   ├── liquid-cloth/          # Fluid silk drape shader simulation
│   └── shared/                # Shared lab shaders, styles & project data
├── preview/                   # Centralized component preview suite
│   ├── index.html             # Component Catalog & Showroom
│   ├── header.html            # Mirrored component preview
│   ├── story.html             # Mirrored component preview
│   ├── services.html          # Mirrored component preview
│   ├── gallery.html           # Mirrored component preview
│   ├── why.html               # Mirrored component preview
│   ├── faq.html               # Mirrored component preview
│   ├── contact.html           # Mirrored component preview
│   ├── footer.html            # Mirrored component preview
│   └── album.html             # Mirrored component preview
├── assets/                    # Shared image assets & photography
│   └── projects/              # Project artwork images (Northwind, Forge, Atlas, Lumen, Verdant)
├── src/
│   └── layout.html            # Master layout shell with typography & Three.js CDN
├── styles/
│   └── base.css               # Design system tokens, cursive font config & reset
├── build.mjs                  # Assembles all components into root index.html
├── preview.mjs                # Compiles all preview pages and catalog
├── index.html                 # Compiled production website
├── package.json               # NPM scripts
└── .gitignore                 # Clean repository rules
```

---

## 🎨 Design & Curation Improvements

1. **Cursive Editorial Typography**:
   - Swapped rigid, generic sans-serif fonts for elegant Google Fonts:
     - Headings & Logo: `Instrument Serif` (italic 400).
     - Body & UI: `Instrument Sans` (400, 500, 600).
     - Accents & Code: `DM Mono`.
2. **Continuous Narrative Flow**:
   - Integrated the **Foggy Idea to Finished Product** journey: *"From foggy idea to finished product. Tell us what is stuck. In about a week we turn it into a working prototype, free."*
   - Real-time interactive 3D WebGL particle simulation (`Three.js`) where thousands of floating fog particles respond to mouse/touch fluid dynamics and transform across scroll through 5 stages (Fog → Scribble → Wireframe Blueprint → Build Grid → Finished Product with 100% idea clarity).
   - The former crumpled paper variant is safely preserved as an alternative in `archive/variants/story-crumpled-paper/`.
3. **Portfolio Gallery Visual Standard Across All Sections**:
   - Elevated every section of the website to match the luxury aesthetic of the portfolio showcase:
     - **Chamber Atmospheres (`--tint`)**: Each section has its own cinematic color room (The Studio in deep navy `#141d2e`, The Promise in moss emerald `#12211a`, Visitor Info in royal amethyst `#1d1626`, The Salon in ember burgundy `#2b1216`), paired with subtle SVG film noise grain.
     - **Exhibition Artwork Pieces (`.piece`)**: Museum-grade card art with multi-stop generative gradients, inset lighting borders, and deep 3D drop shadows (`box-shadow: inset 0 0 0 1px rgba(236,231,223,.08), inset 0 0 70px rgba(0,0,0,.35), 0 34px 70px -24px rgba(0,0,0,.7)`).
     - **Curated Headers & Counters**: Standardized `.rtop` header bar with cursive italic brand title on the left (`.sc-brand`) and uppercase tracked monospace category kicker on the right (`.sc-kicker`), concluding with monospace tabular counters (`.sc-count`).
     - **Typography**: Cursive/italic `Instrument Serif` headlines throughout, seamlessly unified with `Instrument Sans` and `DM Mono`.

---

## 🤖 Working with AI Agents on Components

When directing an AI agent to update any section of the website:

1. **Point the agent to the component folder**:
   > *"Agent, please open `components/services/` and add a new row item for 'Mobile Apps'."*
2. **The agent can edit only that component**:
   - Markup: `components/<name>/<name>.html`
   - Styling: `components/<name>/<name>.css`
   - Logic: `components/<name>/<name>.js`
3. **The agent can test its changes immediately**:
   - Open `components/<name>/index.html` in a browser — it loads in total isolation with all fonts and tokens applied.
4. **Compile to the master website**:
   - Run `npm run build` or `node build.mjs`.

---

## 🚀 Commands

| Command | Action |
| --- | --- |
| `npm run build` | Compiles all components into root `index.html` |
| `npm run preview` | Rebuilds all component previews and `preview/index.html` |
| `npm run dev` | Runs both `build` and `preview` |
