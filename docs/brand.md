# Maquette — Identitate vizuală

> Document intern. Sursa de adevăr pentru culoare, tipografie și componente.
> Perechea lui: `docs/positioning.md` (ce vindem) și `docs/voice.md` (cum vorbim).

---

## 1. Conceptul — expoziția

**Peretele galeriei, cu lucrări montate pe el.** Peretele e granulat și deschis; lucrările sunt panouri întunecate cu colțuri rotunde, iar fâșia de perete vizibilă pe margine e ce le face să pară *montate*, nu lipite.

Pagina e zonată: **negru → sală → negru**. Hero-ul stă pe negru. Secțiunea de dovadă e un panou mare granulat, cu colțuri rotunde, montat pe negru — o încăpere în care intri. Motivul „colț rotund + fâșie de fundal" apare de două ori, la două scări.

### Patru versiuni abandonate și de ce

| | Ce era | De ce a picat |
|---|---|---|
| v1 | Hârtie de calc, grilă milimetrică, axonometrie | „Zici că e site de construcții" |
| v2 | Obiect 3D wireframe condus de scroll | „Animația nu își are sensul" |
| v3 | Același obiect, randat offline cu materiale reale | „Oribil. Nu-mi place ideea în sine." |
| v4 | Întuneric curat, carduri, pastile | Corect, dar generic. Nu e memorabil. |

**Cauza comună la primele trei: am ilustrat numele.** Maquette → machetă → arhitectură → construcții. Studiourile bune nu își ilustrează numele.

**De ce expoziția ține unde celelalte au căzut:** rezolvă simultan problema vizuală și pe cea de conținut. Nu mai avem nevoie de o ilustrație abstractă care să reprezinte ceva — plăcile *sunt* lucrări expuse. Site-ul devine literalmente portofoliul, ceea ce era oricum singurul argument disponibil.

**Referințe de layout:** [unveil.fr](https://unveil.fr), [pacomepertant.com](https://pacomepertant.com) — album în poziționare complexă, asimetrică. Atenție: alea sunt portofolii de artiști vizuali, cu douăzeci de imagini spectaculoase. Noi avem zero. Layoutul e recuperabil **doar** dacă plăcile sunt lucruri reale; umplut cu imagini generate, iese moodboard de student.

---

## 2. Ecranele din plăci sunt cod care rulează

Nu capturi. Documentul Blueprint, raportul lunar și diagrama sunt HTML și SVG live, în `src/components/screens/`. Mai crispe, mai ușoare, responsive — și, pentru un studio de software, adevărate într-un fel în care o poză nu e.

Diagramele **nu** se fotografiază niciodată. Rămân SVG scris de mână, inline, fără librărie de grafuri.

> ⚠️ **Capcană Astro.** Un bloc `<style>` pus în `<defs>` într-o componentă `.astro` e extras și scopat de Astro — selectorii nu mai ajung la elementele SVG, nodurile ies negre și textul invizibil. Stilurile SVG stau ca **atribute de prezentare**, răspândite din obiecte JS. Vezi `BeforeAfter.astro`.

---

## 3. Culoarea — regula 60 / 30 / 10

Paleta e **întunecată, angajată** — nu există variantă deschisă și nu există comutator. Wireframe-ul luminos are nevoie de fundal negru; pe hârtie, același obiect ar arăta a plan de arhitect.

```css
:root {
  color-scheme: dark;

  /* ── 60% · fundalul ── */
  --ink:    #0B0C0F;   /* cel mai adânc — pânza 3D */
  --ground: #101318;   /* fundalul paginii */
  --panel:  #161A20;   /* carduri */
  --edge:   #252A33;   /* chenare, hairline */

  /* ── 30% · textul ── */
  --t-hi:  #EFEBE3;    /* titluri, text principal */
  --t-mid: #9BA1AA;    /* text secundar */
  --t-low: #6A707A;    /* etichete mono */

  /* ── 10% · creionul roșu ── */
  --red:      #B34530;   /* fundal plin · alb pe el 5.5:1 */
  --red-line: #D9573A;   /* linii, cote, wireframe accentuat */
  --red-soft: rgba(217, 87, 58, .12);
  --red-glow: rgba(217, 87, 58, .40);
  --on-red:   #FBF7F3;
}
```

Roșul e același din familia aleasă la Pasul 4 (`#8E3620` pe fundal deschis), urcat în luminozitate pentru a rămâne vizibil pe negru. Pe întuneric, liniile roșii citesc a **telemetrie**, nu a plan de arhitect — exact schimbarea de registru urmărită.

### Regula care ține cei 10%
> **Maxim un buton roșu vizibil pe ecran.** Al doilea buton e mereu fantomă.

### Unde are voie roșul — listă închisă
1. Butonul principal
2. Liniile de cotă
3. Punctul din wordmark
4. Hașura la 45° și liniile accentuate din obiectul 3D (2 plăci din 7, rândul activ din interfața finală)
5. Starea activă din navigație

**Nu are voie:** titluri, text curent, chenarele panourilor, fundaluri mari.

---

## 3. Tipografia — familia IBM Plex

Aleasă pentru că e o superfamilie construită de o companie de inginerie: se leagă natural de registrul de desen tehnic. Evită deliberat Inter și Space Grotesk, fonturile după care se recunoaște de la distanță un site generat automat.

| Rol | Familie | Setare |
|---|---|---|
| Display | IBM Plex Sans 600 | `clamp(38px, 7vw, 76px)` · `-0.035em` · `line-height 1.02` · `text-wrap: balance` |
| Titlu secțiune | IBM Plex Sans 600 | 21px · `-0.018em` |
| Text | IBM Plex Sans 400 | 16–17px · `line-height 1.6` · max **65ch** |
| **Cotă și etichetă** | **IBM Plex Mono 500** | 11–13px · MAJUSCULE · `+0.10em` |
| Tagline | IBM Plex Serif 400 italic | **un singur loc pe site** — sub titlul din hero |

Eticheta mono cu majuscule și spațiere e **semnătura registrului**. E ce transformă o pagină obișnuită într-un desen tehnic. Se folosește pentru: numere de secțiune, cote, prețuri, unități, stări.

---

## 4. Elementele grafice

**1. Obiectul care se asamblează** — vezi §1 și §5. E elementul principal; restul îl susțin.

**2. Linia de cotă** — linie `--red-line` cu capete verticale și etichetă mono centrată, cu un `box-shadow` slab care o face să pară incandescentă pe negru. **Maxim 3–4 pe tot site-ul.**

**3. Panoul** — `--panel` pe `--ground`, chenar 1px `--edge`, `border-radius: 0`. Fără umbre difuze mari, fără carduri care plutesc.

**4. Hașura la 45°** — `repeating-linear-gradient` cu `--red-soft` și bordură stângă de 2px. Pentru teză și pentru blocurile care închid o vânzare.

**5. Eticheta mono** — MAJUSCULE, `+0.12em`, `--t-low`. Pe fundal întunecat citește a telemetrie. E ce ține site-ul în registrul „instrument", nu „broșură".

**Eliminate din v1:** grila milimetrică de fundal, coala de hârtie, vederile ortogonale de clădire, silueta de scară.

---

## 5. Mișcarea

**Obiectul 3D e condus de scroll, nu de timp.** Progresul secțiunii `[data-story]` (0 → 1) conduce trei tranziții suprapuse: împrăștiat→stivă (0–0.42), apar suprafețele (0.40–0.70), stivă→ecran (0.70–1). Urmărire moale (`p += (target - p) * 0.075`) ca scroll-ul să nu smucească.

**Distanța camerei se calculează, nu se ghicește** — din lățimea pe care obiectul trebuie s-o încapă, corectată după raportul pânzei. Fără asta, obiectul iese din cadru pe ecrane late și se pierde în el pe cele înguste.

**Degradare, în ordine:**
- `prefers-reduced-motion: reduce` → fără 3D, fără stingerea bătăilor
- lățime sub 860px → fără 3D; rămâne SVG-ul izometric static
- WebGL indisponibil sau eroare la import → același SVG

Three.js se încarcă prin `await import('three')`, deci nu intră în bundle-ul inițial și nu se descarcă deloc pe mobil. **~720 KB necomprimat, ~180 KB gzip** — cost real, plătit doar pe desktop, doar pe homepage.

**Interzis:** particule, parallax, tilt 3D pe carduri, glow difuz, elemente care plutesc permanent după ce povestea s-a încheiat.

---

## 6. Componente

**Buton principal** — `--red` plin, text `--on-red`, padding `12px 22px`, 15px/500, colțuri drepte, fără umbră. Focus: `outline: 2px solid var(--g900)` cu `offset: 2px`.

**Buton secundar** — transparent, text `--g900`, chenar `--g200`.

**Etichetă (`.lbl`)** — Plex Mono 11px/500, majuscule, `+0.10em`, `--g400`. Varianta roșie doar în cele 5 locuri permise.

**Antet de secțiune** — titlu mono la stânga, linie `--g200` care umple spațiul, etichetă mono la dreapta. Ca antetul unei planșe.

---

## 7. Logo — de făcut

Nu e desenat încă. Direcția:
- **Wordmark:** „Maquette" în Plex Sans 600, `-0.02em`, cu punct roșu final (`Maquette.`) — punctul e cota, semnul că desenul e terminat
- **Monogram:** „M" construit ca vedere axonometrică — două fețe și o muchie, ca o machetă de carton văzută din colț
- Livrat ca SVG, o singură culoare + varianta cu punct roșu, versiuni pentru fundal deschis și întunecat

Se execută după validarea OSIM pe nume — nu se plătește nimic pe un logo înainte de verificarea mărcii.

---

## 8. Lista neagră

Nu apar niciodată pe site:
- Colțuri rotunjite mari (`rounded-lg` și peste)
- Gradient în hero
- Emoji ca marcatori de secțiune
- Totul centrat — layoutul e aliniat la stânga, asimetric
- Umbre difuze mari, „card care plutește"
- Iconițe de bibliotecă generică
- Randări 3D, mockup-uri de laptop, poze de stock cu oameni la birou


---

## 8. Peretele sălii

```css
--wall:        #A9A69F;   /* peretele granulat */
--on-wall:     #161613;   /* text pe perete — 6.3:1 */
--on-wall-mid: #33322E;   /* text secundar pe perete — 4.6:1 */
--wall-rule:   rgba(22,22,19,.22);
--plate:       #0F1013;   /* lucrarea montată */
--plate-edge:  rgba(255,255,255,.09);
--r-hall: 32px;  --r-plate: 14px;
```

**Granulația:** `feTurbulence` inline ca data-URI pe `.hall::after`, `mix-blend-mode: multiply`, `opacity: .34`. ~400 de octeți, zero cereri de rețea, niciun fișier de textură.

### Regula de accent pe perete — obligatorie

`#B34530` pe `#A9A69F` dă contrast **1.9:1**. Ilizibil.

> **Pe perete, roșul nu are voie să fie text.** Rămâne doar ca punct plin sau linie subțire. Textul pe perete e negrul de mai sus. Roșul se întoarce la lucru pe plăci și pe fundalul negru, unde funcționează.

---

## 9. Placa și cartelul

Sub fiecare lucrare stă un **cartel** — eticheta printată de muzeu. Patru rânduri, JetBrains Mono, negru pe perete:

```
01 ─────────────────────
BLUEPRINT — SPECIFICAȚIE FUNCȚIONALĂ
Livrabil · exemplu
Document, 24 p. · 2026
```

**Câmpul `kind` are exact trei valori. Nu e text liber.** Vine din `copy.gallery.kinds`.

| Valoare | Când | Cine se califică acum |
|---|---|---|
| `Livrabil · exemplu` | Un exemplu din ce primește clientul | Documentul Blueprint |
| `Demonstrație de capabilitate` | Construit de noi ca să arătăm ce știm | Raportul, diagrama |
| `Proiect livrat` | Muncă livrată unui client, cu acord scris | **Nicio placă. Încă.** |

Două dispozitive fac sistemul lizibil în loc să-l lase afirmat:
- **Inventarul**, sus-dreapta pe perete: lucrări expuse 03 · demonstrații 02 · livrabile 01 · **proiecte livrate 00**. Zero-ul e cel mai onest lucru de pe pagină.
- **Cheia etichetelor**, pictată direct pe perete: ce înseamnă fiecare tip și că niciunul nu e încă „proiect livrat".

---

## 10. Agățarea în salon

`.salon` e o grilă de 12 coloane. Fiecare placă își declară locul prin props pe `Plate.astro`: `col`, `span`, `off` (decalajul vertical — asta creează agățarea), `row`, `speed`, `bleed`.

**Reguli care împiedică albumul să devină aleatoriu:**
- Rândurile nu se aliniază niciodată. Fiecare placă vecină are alt `off`.
- Cel puțin o placă e `bleed` și atinge marginea sălii, cu colțurile pătrate pe partea aia. Un bleed care se oprește cu 8px înainte arată a greșeală, nu a intenție.
- Scări alternante. Niciodată trei plăci de aceeași mărime la rând.
- Sub 900px totul se prăbușește într-o coloană, cu indentare alternantă de 22px ca ecou al ritmului. Cartelurile rămân.

---

## 11. Mișcarea — totul nativ

**Ce s-a scos și de ce.** GSAP + ScrollTrigger + Lenis erau **50,7 KB gzip pe fiecare pagină**, față de 2–5 KB de HTML și 5,8 KB de CSS. JS-ul de animație era de 5–10× cât restul paginii, iar ce cumpăra era un `classList.add('in')` și un parallax de 40px.

Diagnosticul care contează: **site-ul nu părea generic fiindcă îi lipseau biblioteci.** Bundle-ul de la unveil.fr, dezasamblat, are un vocabular de animație format aproape integral din `gsap.to(el, {opacity: 1, ease: "power1.inOut", duration: .75, stagger: .05})`. Fără split-text, fără scale, fără clip-path. Fade-uri de opacitate. Sofisticarea stă în orchestrare și tipografie.

**Cele trei tehnici care le înlocuiesc:**

| | Ce face | Cost |
|---|---|---|
| `@view-transition { navigation: auto }` | Tranziții între pagini. Nativ în Chrome 126+ și Safari 18.2+; în Firefox nu face nimic, navigarea rămâne normală. | **0 KB** |
| Secvența de deschidere | Cinci elemente din hero, decalaj 70ms, sub o secundă, doar pe homepage. `[data-seq]` / `[data-seq-i]`. Nu preloader. | **0 KB** |
| `animation-timeline: view()` | Aparițiile `.rise` și deriva plăcilor din salon. Rulează în compozitor — nu atinge main thread-ul, deci nu atinge INP. | **0 KB** |

Un `IntersectionObserver` de ~250 de octeți în `Base.astro` preia `.rise` doar unde `animation-timeline` lipsește. Deriva se calculează în `Plate.astro`: `--drift = (1 - speed) × 460px`.

**Referință de timing.** Intră sau iese → `ease-out`. Se mută pe ecran → `ease-in-out`. Hover → `ease`. Curbe folosite: `cubic-bezier(.23,1,.32,1)` la deschidere, `cubic-bezier(.16,1,.3,1)` la reveal. UI sub 300ms; reveal 400–700ms; stagger 30–80ms.

**Semne de amator, de evitat explicit:** `ease-in` pe ceva care intră · `transition: all` · `scale(0) → scale(1)` (nimic real nu apare din nimic; pornește de la 0.9–0.97) · animarea lui `height` sau `top` în loc de `transform` · reveal care se repetă la fiecare reintrare în viewport.

**Lista neagră:** Lenis (5,4 KB ca să lupți cu scroll-ul nativ; semnătura agenției generice din 2021) · GSAP și ScrollTrigger (45 KB pentru ce face CSS nativ; și e licență Webflow proprietară, revocabilă, nu open source) · split-text pe caractere · preloader cu procent · scroll orizontal · cursor custom · butoane magnetice · Three.js · Rive · Lottie · Theatre.js (ultimul release mai 2024) · Spline. Și nimic care se construiește pe ecran.

**`prefers-reduced-motion`** oprește secvența, aparițiile, deriva și tranzițiile de pagină, și lasă tot conținutul vizibil. Gate-ul `html.js-anim` din `<head>` face ca, fără JS, nimic să nu pornească ascuns.

**De rezolvat separat, cu impact mai mare pe LCP decât orice decizie de aici:** fonturile se încarcă render-blocking de pe CDN-ul Google. Astro are API de fonturi self-hostate.
