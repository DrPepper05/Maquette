# Maquette — Identitate vizuală

> Document intern. Sursa de adevăr pentru culoare, tipografie și componente.
> Perechea lui: `docs/positioning.md` (ce vindem) și `docs/voice.md` (cum vorbim).
> Rescris integral la redesign-ul din 2026-08-24.

---

## 1. Conceptul — prospectul tipărit, cu ecrane live

**„Printed prospectus, live screens."** Pagina e deschisă, pe un ton de hârtie caldă, condusă de tipografie: scara, aliniamentul și liniile subțiri fac toată structura. **Singurele obiecte întunecate de pe pagină sunt ecranele live** — HTML și SVG care rulează — încadrate ca figuri într-un document de specificație, cu legendă mono dedesubt.

Site-ul împrumută gramatica vizuală a propriului livrabil: secțiuni numerotate, hairline-uri, etichete mono, figuri legendate. Nu desenează nimic arhitectural — nu ilustrează numele.

**De ce ține unde v5 a căzut:** dovada (cod care rulează) devine singurul punct de contrast maxim de pe pagină, deci privirea cade exact pe ea. Complexitatea vizuală scade — o textură, un singur fundal, zero dispozitive concurente. Iar registrul deschis e diferențiat: studioul de software implicit în 2026 e întunecat.

### Cinci versiuni abandonate și de ce

| | Ce era | De ce a picat |
|---|---|---|
| v1 | Hârtie de calc, grilă milimetrică, axonometrie | „Zici că e site de construcții" |
| v2 | Obiect 3D wireframe condus de scroll | „Animația nu își are sensul" |
| v3 | Același obiect, randat offline | „Oribil. Nu-mi place ideea în sine." |
| v4 | Întuneric curat, carduri, pastile | Corect, dar generic. Nu e memorabil. |
| v5 | Peretele galeriei: perete granulat, plăci montate, carteluri, inventar, parallax | Respins în bloc de utilizator: structură, design și mesaj. Prea multe dispozitive — totul concura cu totul. |

**Cauza comună la v1–v3: am ilustrat numele.** La v5: am îngrămădit dispozitive. Regula care rămâne: **meșteșug înalt + complexitate joasă** *(Kuric et al., 2023)*.

---

## 2. Cele trei mișcări de design — listă închisă

Nu se adaugă a patra. Când o pagină pare goală, se lucrează la tipografie și spațiere, nu se inventează decor.

**1. Secțiuni numerotate ca un document de specificație.**
Fiecare secțiune se deschide cu un index mono roșu + titlul mono al secțiunii + o linie subțire pe toată lățimea:

```
01 — MECHANISM ─────────────────────────────────────
```

Implementat în `SectionHead.astro`. Numerotarea e continuă pe pagină (01–06 pe homepage).

**2. Figuri întunecate cu ecrane live.**
`Figure.astro`: ramă `--scr-bg` cu colțuri rotunjite, conținut = componentă din `screens/`, legendă mono dedesubt:

```
FIG. 01 · BLUEPRINT — FUNCTIONAL SPECIFICATION
Deliverable · sample — Document, 24 pp. · 2026
```

Ecranele **sunt cod care rulează, nu capturi** — pentru un studio de software, adevărat într-un fel în care o poză nu e. **Diagramele au fost scoase de pe site** (decizie utilizator, 2026-08-24) — singurul ecran rămas e documentul BlueprintDoc.

> ⚠️ **Capcană Astro (rămâne valabilă dacă revin ecrane SVG):** un bloc `<style>` în `<defs>` într-o componentă `.astro` e extras și scopat — selectorii nu mai ajung la SVG. Stilurile SVG stau ca **atribute de prezentare**, răspândite din obiecte JS.

**Câmpul `kind` al legendei are exact trei valori. Nu e text liber.** Vine din `copy.kinds`:

| Valoare | Când |
|---|---|
| `Deliverable · sample` | Un exemplu din ce primește clientul |
| `Capability demonstration` | Construit de noi ca să arătăm ce știm |
| `Delivered project` | Muncă livrată, cu acord scris. **Încă nefolosită.** |

**3. Roșul doar ca punctuație.**
Unde are voie roșul — listă închisă: indexul de secțiune · **un singur buton primar pe ecran** · sublinierea linkurilor la hover · punctul din wordmark · accentele din interiorul ecranelor întunecate.
**Nu are voie:** titluri, text curent, fundaluri mari, chenare.

---

## 3. Culoarea

```css
:root {
  /* ── hârtia ── */
  --paper:    #F4F2ED;   /* fundalul paginii — alb cald */
  --paper-2:  #ECE9E2;   /* blocuri adâncite, câmpuri de formular */
  --hairline: #D8D5CC;   /* linii, chenare */

  /* ── cerneala ── */
  --ink: #141412;        /* titluri, text principal — 15,6:1 */
  --mid: #5C5A54;        /* text secundar — 6,5:1 */

  /* ── accentul ── */
  --red: #B34530;        /* 5,7:1 pe hârtie — are voie să fie text la ≥14px */

  /* ── scopate pe ramele .screen (moștenite din v5, neschimbate) ── */
  --scr-bg:  #0F1013;
  --scr-hi:  #F2F0EC;
  --scr-mid: #8B8F94;
  --scr-low: #5C6066;
  --scr-edge:#24262A;
  --scr-red: #D9573A;
}
```

Familia de roșu e continuitatea cu v5. Regula de contrast a peretelui moare odată cu peretele: pe hârtie, `#B34530` trece de 4,5:1 și poate fi text de etichetă.

---

## 4. Tipografia

Rămân **Figtree + JetBrains Mono** — sunt live, gratuite, corecte pentru registru. (Versiunile vechi ale documentului spuneau IBM Plex; site-ul a livrat mereu Figtree. Nepotrivirea se rezolvă aici, în favoarea a ce rulează.)

| Rol | Familie | Setare |
|---|---|---|
| Display | Figtree 700 | `clamp(44px, 7.5vw, 104px)` · `-0.035em` · `line-height 1.02` · `text-wrap: balance` |
| H2 | Figtree 700 | `clamp(28px, 3.6vw, 48px)` · `-0.028em` |
| H3 | Figtree 600 | 20px · `-0.016em` |
| Text | Figtree 400 | 16–17px · `line-height 1.6` · max **62ch** |
| **Etichetă / legendă** | **JetBrains Mono 500** | 11–13px · MAJUSCULE · `+0.12em` |

Eticheta mono cu majuscule și spațiere rămâne **semnătura registrului**: indexuri de secțiune, legende de figuri, prețuri, stadii, date.

**Fonturile se self-hostează** prin API-ul de fonturi al Astro — CDN-ul Google era render-blocking și cel mai mare cost de LCP din site.

---

## 5. Spațiere și scară

- Bază de 8px.
- Ritm de secțiune: `--sec: clamp(96px, 12vw, 160px)`.
- Conținut: max 1200px; proză: 62ch.
- Layout aliniat la stânga. Nimic centrat în afara ecranelor din figuri.

---

## 6. Mișcarea — totul nativ, ~250 de octeți de JS

Sistemul din v5 se păstrează integral (era deja corect):

| | Ce face | Cost |
|---|---|---|
| `@view-transition { navigation: auto }` | Tranziții între pagini. Firefox: nimic, navigare normală. | **0 KB** |
| Secvența de deschidere | Cinci elemente din hero, decalaj 70ms, sub o secundă, doar pe homepage. `[data-seq]` / `[data-seq-i]`. | **0 KB** |
| `animation-timeline: view()` | Aparițiile `.rise`. Rulează în compozitor, nu atinge INP. | **0 KB** |

Un `IntersectionObserver` de ~250 de octeți în `Base.astro` preia `.rise` unde `animation-timeline` lipsește. **Deriva plăcilor a murit odată cu plăcile.** Excepția de asamblare pentru diagrama Before/After a fost anulată odată cu diagrama (2026-08-24) — regula „nimic care se construiește pe ecran" rămâne fără excepții.

Reveal-urile se retunează subtil: opacitate + 10px, nu 16px.

**Timing:** intră → `ease-out`; hover → `ease`. Curbe: `cubic-bezier(.23,1,.32,1)` deschidere, `cubic-bezier(.16,1,.3,1)` reveal. UI sub 300ms; reveal 400–700ms; stagger 30–80ms.

**Semne de amator, de evitat explicit:** `ease-in` pe ceva care intră · `transition: all` · `scale(0) → scale(1)` · animarea lui `height`/`top` în loc de `transform` · reveal care se repetă la fiecare reintrare.

**Lista neagră:** Lenis · GSAP și ScrollTrigger (50,7 KB gzip; licență Webflow revocabilă) · split-text pe caractere · preloader cu procent · scroll orizontal · cursor custom · butoane magnetice · Three.js · Rive · Lottie · Theatre.js · Spline. Și nimic care se construiește pe ecran.

**`prefers-reduced-motion`** oprește tot și lasă conținutul vizibil. Gate-ul `html.js-anim` face ca, fără JS, nimic să nu pornească ascuns.

---

## 7. Componente

**Buton primar (`.btn`)** — `--red` plin, text alb cald, `border-radius` mic (6px), padding `13px 24px`, 15px/600. Unul singur vizibil per ecran.

**Buton secundar / link (`.lnk`)** — text `--ink` cu subliniere `--hairline`; la hover sublinierea devine `--red`.

**Etichetă (`.lbl`)** — JetBrains Mono 11px/500, majuscule, `+0.12em`, `--mid`. Varianta roșie doar în locurile permise (§2.3).

**Antet de secțiune (`SectionHead.astro`)** — index mono roșu + titlu mono + hairline care umple restul.

**Figura (`Figure.astro`)** — rama întunecată + legenda. Props: `index`, `title`, `kind` (din `copy.kinds`), `tech`.

**Câmp de formular (`.fld`)** — fundal `--paper-2`, chenar `--hairline`, `border-radius` 6px, focus `--red`. **O singură definiție, în global.css.**

---

## 8. Logo — de făcut

Neschimbat: wordmark „Maquette" cu punct roșu final; monogram după validarea OSIM. Nu se plătește nimic pe logo înainte de verificarea mărcii. Până atunci, wordmark-ul text e logo-ul.

---

## 9. Lista neagră vizuală

Nu apar niciodată pe site:
- Gradient în hero · glow difuz · „card care plutește" cu umbră mare
- Emoji ca marcatori de secțiune
- Totul centrat — layoutul e aliniat la stânga
- Iconițe de bibliotecă generică
- Randări 3D, mockup-uri de laptop, poze de stock
- Texturi și granulații pe fundal (au murit cu v5)
