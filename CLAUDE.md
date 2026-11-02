# CLAUDE.md

Instructions for Claude Code sessions working in this repository.

## Typography — closed set, no exceptions

The site loads exactly three typefaces (declared in the font `<link>` in `index.html`'s `<head>`, and duplicated in every other entry point — `Mobila/`, `furniture/`, `components/mobila/`, each `showcase/*` page):

- **Bricolage Grotesque** — display typeface: `h1`–`h3`, card/section titles.
- **Plus Jakarta Sans** — body copy, UI text, buttons.
- **DM Mono** — small monospace labels and data only (not prose — see the ban below for its main misuse).

Never add a fourth typeface: no new Google Fonts family, no custom `@font-face`, no system-font override for a one-off section. If a section needs a different feel, get it from weight, size, tracking, or color within these three — not a new font import. This applies to every file that duplicates the font `<link>`, not just `styles/base.css`.

## Banned pattern: monospace dot-separated "eyebrow" labels

Do not use this pattern anywhere, including new sections or components:

> `WEBSITES · AUTOMATIONS · SOFTWARE`
> `100% OWNERSHIP · ZERO FOG · WEEKLY SPRINTS`

Recognize it by these traits together, regardless of class name: **uppercase + DM Mono (monospace) + wide letter-spacing (~0.2em or more) + short phrases joined by " · "**. In this codebase it's the `.eyebrow` and `.mono` classes in `styles/base.css`, used across `components/{contact,faq,services,why,mobila}` and the header tagline.

**Why:** explicitly flagged by the user (2026-11-03) as reading like generic AI-generated filler ("vibe-coded"), not this site's own voice.

**How to apply:** don't introduce new instances of this look in any future work. This is a forward-looking rule, not a cleanup instruction — existing instances stay until the user separately asks for them to be removed or restyled.
