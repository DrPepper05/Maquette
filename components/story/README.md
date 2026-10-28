# Story Component ("From Foggy Idea to Finished Product")

## Purpose
The primary hero walkthrough section for Maquette. Features an interactive WebGL particle simulation (`Three.js`) where thousands of floating fog particles respond to mouse/touch interactions, and transform through 5 states across scroll:
1. **Fog** (`Fig. 1: The brief`): A cloud of particles that parts when touched.
2. **Scribble** (`Fig. 1: The brief`): Concentrated organic curves representing raw thoughts.
3. **Wireframe** (`Fig. 2: The maquette`): Geometrical blueprint lines outlining the application.
4. **Build** (`Fig. 3: The build`): High-density particle grid filling in interface components.
5. **Finished Product** (`Fig. 4: The handover`): The complete, high-fidelity Northwind UI rendered with Instrument Serif cursive typography, glowing with 100% idea clarity.

## Files
- `story.html`: HTML markup for the sticky stage, HUD clarity meter, and walkthrough narrative panels.
- `story.css`: Styling for sticky stage, lighting pool, HUD clarity meter, and panel heights.
- `story.js`: WebGL particle shaders, mouse fluid physics, canvas texture generation, and scroll listener.
- `index.html`: Fully self-contained runnable preview.

## Note on Variants
The crumpled paper variant is archived in `archive/variants/story-crumpled-paper/`. This active component uses the foggy particle simulation.

## Preview
Open `index.html` directly in your browser or run `npm run preview`.
