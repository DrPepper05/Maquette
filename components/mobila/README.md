# Mobila WebAR Component (Romanian)

A standalone, handoff-ready copy of the `/mobila` page. It is kept outside the deployed route folders so it can be sent to Claude (or any collaborator) and modified without affecting the live page.

## Purpose

A private 1:1 WebAR furniture prototype with Romanian copy. It combines:

- A WebGL "waving painting" hero rendered on a canvas.
- A museum-style AR label with a dynamic QR code.
- A native AR launch button (Apple Quick Look on iOS, Google WebXR / Scene Viewer on Android).
- A responsive mobile layout that shows the AR test card before the story copy.

## Files

- `index.html` — fully self-contained runnable preview (inline CSS and JS). Open it directly in a browser, or send this single file to Claude for changes.
- `mobila.html` — the component markup only (ambient layers, header, story column, AR card, footer, hidden `<model-viewer>`).
- `mobila.css` — extracted styles for the component.
- `mobila.js` — extracted behavior: the painting WebGL/2D renderer, QR generation, and AR launch logic.
- `README.md` — this file.

`index.html` is a snapshot of `/mobila/index.html`, so it is the easiest file to hand off. The split files are provided for modular editing or integration into another page.

## Sending to Claude

Attach `index.html` on its own: it contains the markup, styles, and scripts in one file, so changes can be made and previewed without assembling anything. Attach the whole `mobila/` folder (or `components/mobila-component.zip`) only if you want the modular versions too.

## External dependencies

No build step and no local packages. The page loads:

- Google Fonts: Bricolage Grotesque, Plus Jakarta Sans, DM Mono.
- `@google/model-viewer` 3.5.0 from the Google CDN.
- QR images from `api.qrserver.com`.
- A sample sofa model (`.glb` / `.usdz`) from `code4fukui.github.io`.

Camera AR requires HTTPS and a supported mobile browser. On desktop, the launch button highlights the QR code instead.

## Preview

Open `index.html` directly in a browser. For the split version, serve the folder over HTTP:

```bash
npx -y serve components/mobila
```

## Editing notes

- All visible copy is Romanian; keep `<html lang="ro">` if you continue localizing.
- The mobile breakpoint is `960px`. Below it, the AR card is moved above the story and the QR block is hidden.
- The AR button uses `id="btn-launch-ar"` and the label uses `id="btn-label"`.
- The demo model URLs are inside the hidden `<model-viewer>` element and the AR launch handler; replace them with your own assets when adapting the component.
