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

## 2. Mișcările de design — ficțiunea documentului, mobilată complet

Revizuit 2026-08-24, după cercetarea „max quality": site-urile memorabile din registrul ăsta (U.S. Graphics Company mai presus de toate) câștigă **terminând conceptul de document, nu adăugând evenimente vizuale**. Mișcările de mai jos sunt lista închisă. Când o pagină pare goală, se lucrează la tipografie și spațiere, nu se inventează decor.

**Mobilierul documentului** (toate în mono, toate adevărate):
- ~~Cod de document + revizie pe fiecare pagină~~ — **scos la cererea utilizatorului (2026-08-24): „useless", strica centrarea hero-ului.** Nu se readuce fără cerere explicită.
- **Rigla de progres**: header sticky cu un hairline care se umple cu roșu pe măsură ce documentul e citit (`animation-timeline: scroll()`, 0 KB).
- **Cuprins cu puncte de ghidaj** în subsol — dispozitivul de încredere al cărții tipărite.
- **Semne de registru (crop marks)** la colțurile figurilor.
- **Ștampila onestității** — o singură instanță pe site, rotită, chenar roșu: `DELIVERED PROJECTS · 00`. Zero-ul e cel mai onest lucru de pe pagină; ștampila îl face memorabil. Se actualizează când realitatea se schimbă.
- **Numeralul-filigran**: indexul secțiunii, uriaș (Figtree 300, cerneală la ~6%), în spatele conținutului.
- **Un singur bloc roșu pe pagină** — registrul (2026-08-25): `/` CTA-ul final · `/blueprint` garanția („taxa se scade integral") · `/services` CTA-ul final · `/projects` fără bloc — roșul stă în butoanele Contact ale exponatelor. Full-bleed `#B34530` cu text de hârtie. Restul paginii ține disciplina — de-aia detonează blocul. Niciodată două pe aceeași pagină.
- **Îmbinarea mono în titlu**: un singur cuvânt pe titlu, maxim, setat în JetBrains Mono în interiorul display-ului Figtree.

**1. Secțiuni numerotate ca un document de specificație.**
Fiecare secțiune se deschide cu un index mono roșu + titlul mono al secțiunii + o linie subțire pe toată lățimea, iar același index apare ca filigran uriaș în spatele conținutului:

```
01 — MECHANISM ─────────────────────────────────────
```

Implementat în `SectionHead.astro`. Numerotarea e continuă pe pagină.

**2. Figuri întunecate cu ecrane live.**
`Figure.astro`: ramă `--scr-bg` cu colțuri rotunjite, conținut = componentă din `screens/`, legendă mono dedesubt:

```
FIG. 01 · BLUEPRINT — FUNCTIONAL SPECIFICATION
Deliverable · sample — Document, 24 pp. · 2026
```

Ecranele **sunt cod care rulează, nu capturi** — pentru un studio de software, adevărat într-un fel în care o poză nu e. **Diagramele au fost scoase de pe site** (decizie utilizator, 2026-08-24). Ecranele existente (2026-08-25): `BlueprintDoc` (pe `/blueprint`), `DeclutterApp` (UI-ul prototipului, pe `/projects`) și `GigTimDoc` (o pagină din propriul Blueprint al lui GigTim — vizualul onest pentru „being scoped", pe `/projects`). Figurile exponatelor acceptă în același slot o captură reală (`<img src="/img/…">`) când există una — legenda rămâne adevărată.

> ⚠️ **Capcană Astro (rămâne valabilă dacă revin ecrane SVG):** un bloc `<style>` în `<defs>` într-o componentă `.astro` e extras și scopat — selectorii nu mai ajung la SVG. Stilurile SVG stau ca **atribute de prezentare**, răspândite din obiecte JS.

**Câmpul `kind` al legendei are exact trei valori. Nu e text liber.** Vine din `copy.kinds`:

| Valoare | Când |
|---|---|
| `Deliverable · sample` | Un exemplu din ce primește clientul |
| `Capability demonstration` | Construit de noi ca să arătăm ce știm |
| `Delivered project` | Muncă livrată, cu acord scris. **Încă nefolosită.** |

**3. Roșul ca punctuație — plus o singură detonare pe pagină.**
Unde are voie roșul — listă închisă: indexul de secțiune · **un singur buton primar pe ecran** · sublinierea linkurilor la hover · punctul din wordmark · accentele din interiorul ecranelor întunecate · rigla de progres · chenarul ștampilei · starea „liked" a butonului Like de pe `/projects` · `::selection` (fundal roșu, text de hârtie) · **și cel mult un bloc full-bleed roșu pe pagină** (registrul din §2, mobilierul).
**Nu are voie:** titluri, text curent, al doilea bloc pe aceeași pagină.

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

Un `IntersectionObserver` de ~250 de octeți în `Base.astro` preia `.rise` unde `animation-timeline` lipsește. Excepția de asamblare pentru diagrama Before/After a fost anulată odată cu diagrama (2026-08-24).

> **Notă de branch (2026-08-27):** pe `dive-canvas` versiunea de mai jos — dive/park, cea numită „haotică" de recenzia externă — e REINSTAURATĂ la cererea utilizatorului, după ce variantele calme (ambient, poartă, carduri + coborâre) de pe `redesign-paper` nu au convins. Istoricul acelor variante stă în commit-ul `calm homepage` de pe `redesign-paper`.

**Excepție, datată 2026-08-24 (revizuită 2026-08-26) — `MaquetteCanvas.astro`.** Homepage-ul are un fundal Three.js fixed: **patru pagini întunecate ale prospectului** plutesc împrăștiate în spațiu, ESTOMPATE (variantă de textură cu `blur` — pete abstracte de text, nimic lizibil de departe). Fiecare secțiune e un slide de `100svh` (`.slide`, conținut centrat cu flex; `min-height`, nu `height`). Fiecare secțiune de conținut are pagina ei: §01, §02, §03 — cu copy-ul REAL din `copy.ts`, desenat cu fonturile site-ului pe `CanvasTexture` (repictat pe `fonts.ready`); a patra pagină e un cuprins și nu se rezolvă niciodată din blur. Pe secțiune, pagina zboară înăuntru și **parchează la mărimea textului, nu pe tot ecranul** („park pose", calculată din camera vie: texturi pictate la 2×, parcare la ~1,12× din mărimea 1:1, plafonat ~94vw și centrat pe **zona vizibilă de sub headerul sticky** — înălțimea se plafonează la `viewport − header − 24px`, altfel headerul opac tăia partea de sus a cardului; hârtia rămâne vizibilă în jurul paginii parcate. Ca plafonul să nu micșoreze textul, paddingul pictat de sus a scăzut de la 7% la 4% din lățimea paginii, iar geometria cardurilor a scăzut cu aceeași diferență), blur-ul se dizolvă în text clar (crossfade între două fețe, estompat/clar), iar la plecare textul se estompează la loc și **pagina pleacă împreună cu el**. Fără pin, fără fade separat pe HTML: **textura paginii E textul vizibil al §01–§03** — inner-ele HTML sunt ascunse o singură dată la boot (zero scrieri per-frame, zero jitter) și rămân în DOM pentru layout, SEO și no-JS/reduced-motion, unde stau vizibile normal. Poza de apropiere pornește de DEPARTE și MIC (în spatele originii), deci mărimea aparentă a paginii crește monoton spre parcare și nu depășește niciodată mărimea textului final (feedback 2026-08-26). Placa de față și remaparea `.mq-portal-on` au murit odată cu textul HTML vizibil; istoricul rundelor respinse (fundal full-screen + text pin-uit; machete UI de dashboard) rămâne în git. **Geamănul DOM (2026-08-26):** cât timp pagina e parcată exact (platoul trapezoidului), un geamăn DOM fix — conținutul HTML REAL al secțiunii, reparentat la boot și recolorat pe paleta de ecran — apare printr-un fade de 150ms peste card: text nativ de clar, linkuri clicabile, selectabil; dispare înainte ca cardul să se miște. Tipografia geamănului e blocată pe constantele pictorului (px logici, scalați cu --pgs), pictorii folosesc numele REALE (hash-uite de Astro) ale fonturilor și aceleași lățimi de frângere — crossfade-ul nu re-așază textul. WebGL-ul deține fiecare cadru în mișcare; DOM-ul deține doar starea parcată. **Ștampila se auto-calibrează (2026-08-28):** pictorul §03 nu mai desenează ștampila din constante proprii — `layoutPages()` măsoară geometria REALĂ a ștampilei din geamăn (cutia, rotația, fontul/letter-spacing-ul și baseline-ul fiecărui rând, cu sonda inline-block și rotația suspendată pe durata măsurării) și pictorul o redesenează identic din valorile măsurate; înainte, cele două ștampile difereau (12/32px vs 10/28px, −2,3° vs −5°, cutie fixă 250×92 vs auto-dimensionată de flex) și crossfade-ul de parcare le arăta „teleportându-se" una în alta. **Copertele-album (2026-08-28):** cele patru pagini cu dive nu mai plutesc departe ca pete oarbe de blur — cât timp sunt departe, parcate-alături sau în final, fiecare poartă o COPERTĂ desenată în limbajul copertelor de pe `/projects` (numeral-filigran uriaș al secțiunii, caption tip placă — index roșu + etichetă mono cu majuscule, `letter-spacing` 3px — un hairline, 2-3 cruci-datum, și un motiv mic de ilustrație-casă unic per secțiune: 01 rânduri de meniu cu leader-uri punctate, 02 un cartuș de titlu tip planșă cu cotă, 03 două plăci-ecou + conturul ștampilei (punctat, NU roșu — ștampila roșie rămâne instanță unică), 04 un cadru gol punctat pentru studiul de caz lipsă). Roșul e limitat la indexul plăcii — o singură pată pe copertă. La apropiere, coperta se topește în fața estompată existentă (`melt = eo(cl((cT-.12)/.33))`, plată la cT .45), care apoi se rezolvă normal în text clar (`resolve`, cT .55→.90) — cele două canvasuri au același fundal opac `#0F1013`, deci topirea nu produce flash. Parcarea (cT=1) rămâne identică pixel cu pixel: `melt`=1, `resolve`=1, fața clară singură — exact ca înainte. La plecare, albumul se închide în oglindă. A treia față per pagină (`fMatC`, material fără variantă blur, pictat la rezoluție 1× — nu se parchează niciodată la 1:1, deci nu are nevoie de 2×) e opțională în `mkPanel`; pagina TOC (`pSide`) n-o primește — deja se comportă ca o copertă de album. Opacitățile „departe" au crescut ca desenul să se vadă — și au fost re-măsurate a doua oară (2026-08-30): la .50 renderer-ul (`alpha:true`, compus peste hârtia pală) spăla toată coperta spre gri uniform, aproape ilizibil (verificat: coperta pictată corect pe canvas, doar compunerea la .50 peste hârtie o ștergea — nu era un bug de desen). `OP.hidden` ui .22→**.86**, edge .65→.60; `OP.dim` ui .35→**.68** (coperta „închisă pe raft" în faza de alături, încă limpede). **Extins 2026-08-26:** și §04 (obiecția) are pagina lui cu dive complet — cinci pagini în scenă; finalul (linii + particule) rulează între plecarea paginii §04 și CTA. **Pe celelalte pagini limbajul de card continuă STATIC:** `.float-card` (legănare lentă + tilt spre cursor, JS-ul mic din Base; tăcut la reduced-motion, tilt doar la pointer fin) pe ramele figurilor (`/projects`, `/blueprint`) și, cu skin-ul `.card-lite` (paper-2 + hairline + radius), pe blocurile de ofertă din `/services` și formularul din `/contact`. Niciodată pe un element cu `.rise` (ambele scriu `transform`) și niciodată pe blocurile roșii. **Cardul-pagină pe taburi (2026-08-26):** pe sub-pagini, TOT blocul de conținut al unei secțiuni e un card plutitor, cu mini-carduri GOALE, blurate, plutind în hârtia din jur (`AmbientCards`, pur CSS) — ecoul paginilor de pe homepage. Două suprafețe, împărțite deliberat până alege utilizatorul: `.card-page` (întunecat) pe `/projects` + `/contact`, `.card-page-lite` (hârtie ridicată) pe `/services` + `/blueprint` — schimbarea e un nume de clasă. Pe `/projects` cardul e ALBUMUL PĂTRAT cu flip (2026-08-28, descris în CLAUDE.md la secțiunea Projects): fața = doar coperta-ilustrație SVG + nume + „View more"; spatele (flip 180° pe Y) = tot textul + acțiunile. **Reflexia „holo" (2026-08-26):** la hover, cardurile au un luciu care urmărește cursorul + un strat de puncte (halftone) dezvăluit doar în jurul lui — foarte subtil, gen folie de carte de joc; `screen` pe cardurile întunecate (overlay e invizibil pe #0F1013), blend normal + puncte de cerneală pe cele deschise; condus de --glare/--mx/--my din JS-ul din Base, cu micro-scale la hover. Legănarea implicită a cardurilor: 6-8px.

Legătura scroll → animație e prin **GSAP ScrollTrigger** cu `scrub: 0.25` pe un tween-proxy (strâns 2026-08-28 de la 0,35 — „partea de animație nu se simte responsivă") — un catch-up scurt, standardul industriei: pașii discreți ai rotiței se leagă într-o mișcare continuă, fără să se simtă desincronizat (un `scrub` numeric pe un trigger fără animație nu face nimic — de aici proxy-ul). **Snap: REINSTAURAT 2026-08-27 ca „idle-settle"** (pe `dive-canvas`, la cererea utilizatorului — opririle mid-flight lăsau scena într-o poză intermediară care se simțea aleatorie; anulează decizia din 2026-08-25, când clicul „nu era smooth" și trei încercări au picat pe rând: `scroll-snap` nativ, magnet `scrollTo` propriu, `snap`-ul din ScrollTrigger). Contractul anti-clic al versiunii noi, punct cu punct: reacție aproape instant, glisare blândă — „fast reaction → small animation" (feedback 2026-08-27; varianta cu delay 0,25s + `inOut` se citea ca „stai pe loc, apoi zvâcnește"): pornește la 0,05s după ultimul eveniment de scroll (inerția de trackpad/touch resetează ceasul, deci nu prinde niciodată gestul din mers), glisează 0,5–0,85s cu `power3.out` — viteză maximă din prima clipă, aterizare lungă și moale, înmuiată în plus de scrub-ul existent · orice input al utilizatorului omoară tween-ul instant — utilizatorul câștigă mereu · zonă moartă pe platou: cine e deja parcat (geamănul aprins) nu e mișcat deloc · **topul hero-ului și fundul paginii (footerul întreg) sunt puncte de odihnă fără zonă moartă** — nu mai există nicio zonă liberă, pentru că ambele resturi arătau stricat (titlul hero tăiat sub header; blocul roșu pe jumătate ieșit din ecran peste footer) · ne-direcțional: nearest-center, împingerile mici se relaxează înapoi ca un magnet. **Pasul ghidat (2026-08-27, decizie explicită a utilizatorului — suprascrie ghidajul anti-scrolljacking; din 2026-08-28 rulează la FIECARE încărcare a homepage-ului):** de fiecare dată când se deschide homepage-ul — reload, tab nou, revenire — scrollul e slide-deck — UN gest (notch de rotiță, swipe, săgeată/PgDn/Space) = O tranziție completă de secțiune pe `tourEase` — din 2026-08-28 (runda a cincea) un in-out CURSIV: 10% ease-out quad + 90% sine in-out. Rațiunea: mișcările MARI ale cardului (desprinderea din parcare și andocarea) stau la CAPETELE distanței vii (zonele de blend ±[PK..C], ~25% din scroll fiecare), iar mijlocul (zbor lateral / apropiere de departe) are mișcare aparentă mică — o croazieră plată grăbea mișcările mari și târa restul („small movements really slow, big movements very fast — sloppy"). In-out-ul concentrează timpul la capete (fiecare blend ~33% din durată; măsurat: ~610ms desprinderea, ~637ms andocarea, mijloacele ~320-345ms) și vârful de viteză (~1,45× media) cade pe cele mai mici delte de poză → viteza aparentă a cardului rămâne aproape constantă. Istoric easing-uri respinse pe rând: `power2.inOut` (stătea la start, zbura prin mijloc — pe vremea tween-ului cu platouri), blend 35% quad (leneș la start), blend 45% out-cubic „atac agil" (corect cât platourile mâncau capetele; greșit după excizie — grăbea blend-urile). Ritmul: ~0,29·F/s pe distanța vie, clamp 1,6–2,8s (secțiune→secțiune ≈1,95s + dash). Inputul suplimentar din timpul tranziției e ignorat, oricât ar scrolla; înapoi se poate, în același ritm. Deltele de rotiță se ACUMULEAZĂ (prag cumulat >6, resetat la schimbare de direcție sau la >400ms pauză) — un swipe blând de trackpad pornește cu delte de 1–3 per eveniment, iar pragul vechi per-eveniment (>4) îl înghițea întreg („scrollez puțin și stă pe loc", 2026-08-28). **Excizia platourilor din tween (2026-08-28, a patra rundă de responsivitate — „remove those frames where the card just stays"):** în jurul fiecărei secțiuni parcate, ±PK de scroll randează cadre IDENTICE pixel-cu-pixel prin construcție (camera plată la ±PK, cardul pinned de parkPose, toate celelalte track-uri constante; diferă doar procentul din HUD și rigla de progres — verificat prin pixel-diff). Tween-ul turului animă deci DOAR distanța vie dintre marginile platourilor: la plecare, un micro-dash fix de 0,15s traversează platoul propriu — exact fereastra de fade-out a geamănului DOM, ca textul clar să nu fantomeze peste un card care se mișcă; la sosire, platoul se TELEPORTEAZĂ în onComplete (cadre identice, salt invizibil), iar geamănul intră prin fade peste cardul parcat, ca la idle-settle. Coada de aterizare a ease-ului cade acum pe mișcarea de andocare (blend-ul h→1 se termină fix la marginea platoului) — înainte, tween-ul cu durată fixă își petrecea ~40% din timp (~1,1s) târându-se peste platoul de sosire înghețat. Durata scalează cu distanța vie ca ritmul de croazieră aprobat să se păstreze (~0,31·F/s, clamp 1,5–2,6s): secțiune→secțiune ≈1,8s (+0,15 dash), hero→§01 ≈2,5s. Hero și CTA n-au platou de card → fără dash/teleport pe partea lor. Măsurat: zero ferestre de îngheț >100ms în croazieră (înainte: ~1,1s). Scăpările păstrate din ghidajul de accesibilitate: linkurile din navigație rămân clicabile (se interceptează doar inputul de scroll) și tastatura funcționează ca gesturi. Atingerea CTA-ului încheie turul **doar pentru vizualizarea curentă** — de acolo, scroll liber + idle-settle până la următoarea încărcare, când turul rulează din nou. (Flag-ul `localStorage: mq:toured` „o singură dată per vizitator" a fost SCOS 2026-08-28, la cererea utilizatorului: „vreau mereu, când deschid site-ul, să am animația".) Cât rulează turul, magnetul idle-settle stă deoparte (`tourOn`) — doi magneți care scriu scrollul se bat între ei (verificat: turul se bloca ~600ms la start). Reduced-motion nu ajunge niciodată aici (canvasul nu bootează). Limită cunoscută: trasul de scrollbar ocolește turul — comun tuturor implementărilor slide-deck. Țintele sunt centrele măsurate în `buildTimeline()` (citite prin closure), deci fiecare `ScrollTrigger.refresh` le resincronizează gratuit. Odată cu asta: platoul parcat e din nou **±0.22·viewport** (codul alunecase la ±0.16 — deriva față de documentul ăsta e reparată), ferestrele dive-urilor se ating exact (A = 0.50·F, suprapunerea de 0.10·F scoasă), iar retragerea camerei la mijlocul dintre secțiuni e înmuiată (r=16→11, h=6→4) ca pauza scurtă dinaintea glisării să arate a cadru compus, nu a orbită abandonată. **Fără portal DOM** (scos tot atunci — crossfade-ul compozita trei straturi full-screen și se simțea ca lag). Nicio fracțiune de scroll nu e hard-codată: totul se generează din DOM (`buildTimeline()`, re-rulat la fiecare `ScrollTrigger.refresh`), cu fazele dive-ului la fracțiuni fixe de viewport-height în jurul centrului fiecărui slide — aliniat pe orice ecran, prin construcție. Igienă de performanță, verificată: dpr max 1,5 · `alpha: true` fără `Scene.background` (hârtia canvasului = hârtia CSS, fără derivă ACES) · zero alocări per frame în buclele calde · scrieri DOM doar la schimbare · render sărit când scena e static-idle.

**Corecturi, datate 2026-08-31 (audit UI/UX pe site-ul randat):** (1) canvasul pornește doar la viewport **≥1024px** — sub prag `boot()` iese devreme și homepage-ul redă HTML-ul static (aceeași cale ca no-JS/reduced-motion): formula de parcare (`texW·1,12`, plafon `.94·vw`) scala textul parcat la ~6-9px pe telefon, ilizibil, cu ~70% din ecran hârtie goală; (2) **`footFade`** — canvasul (panouri, linii, particule, grilă, cruci, lumina roșie) se estompează la zero pe măsură ce footerul intră în viewport (măsurat din `footer.offsetTop` la fiecare refresh): clusterul final plutea peste textul juridic din subsol; (3) **hero-ul face fade la exit** (CSS `animation-timeline: view()` pe `[data-seq] .slide-inner` și `.scroll-cue`, `animation-range: exit`): butonul roșu al hero-ului trecea peste cardul parcat al §01 în tranziție; (4) paginile **§02 (7×3,4)** și **§04 (7,5×2,5)** au scăzut de la 4,3/4,37 înălțime — parcau cu jumătatea de jos goală, „slide neterminat"; conținutul pictat rămâne identic, doar cutia s-a strâns pe el.

Aceasta e o excepție cerută explicit de utilizator, nu o alunecare tăcută: efectul de zoom-spre-fundal nu era realizabil cu setul nativ de mai jos. Regula „nimic care se construiește pe ecran" rămâne valabilă pentru orice altceva de pe site. (Odată cu revizia de conținut din 2026-08-25, pagina §01 de pe cardul canvas-ului e meniul de servicii fără prețuri — se repictează singură din `copy.ts`; eticheta HUD a secțiunii 01 spune `SERVICES`, nu `RATE CARD`.)

**A doua excepție de JS, datată 2026-08-25 — acțiunile exponatelor de pe `/projects`.** Like (fetch către `PUBLIC_LIKES_ENDPOINT`, contor mono, guard în `localStorage`) și Comment (SDK-ul Cusdis, ~5 KB, încărcat **doar la primul clic** pe buton — zero JS de terți la load). Ambele gate-uite pe env: fără variabile setate, se randează doar butonul Contact. Contoarele pornesc de la `00` — zeroul onest; nu se seedează. Microcopy obligatoriu sub fir: „Comments appear after review."

Reveal-urile se retunează subtil: opacitate + 10px, nu 16px.

**Timing:** intră → `ease-out`; hover → `ease`. Curbe: `cubic-bezier(.23,1,.32,1)` deschidere, `cubic-bezier(.16,1,.3,1)` reveal. UI sub 300ms; reveal 400–700ms; stagger 30–80ms.

**Semne de amator, de evitat explicit:** `ease-in` pe ceva care intră · `transition: all` · `scale(0) → scale(1)` · animarea lui `height`/`top` în loc de `transform` · reveal care se repetă la fiecare reintrare.

**Lista neagră:** Lenis · split-text pe caractere · preloader cu procent · scroll orizontal · cursor custom · butoane magnetice · Rive · Lottie · Theatre.js · Spline. Și nimic care se construiește pe ecran — cu excepția datată mai sus (care include Three.js și GSAP ScrollTrigger, ambele doar pentru `MaquetteCanvas`; nu se folosesc în altă parte a site-ului).

**`prefers-reduced-motion`** oprește tot și lasă conținutul vizibil. Gate-ul `html.js-anim` face ca, fără JS, nimic să nu pornească ascuns.

---

## 7. Componente

**Buton primar (`.btn`)** — `--red` plin, text alb cald, `border-radius` mic (6px), padding `13px 24px`, 15px/600. Unul singur vizibil per ecran.

**Buton secundar / link (`.lnk`)** — text `--ink` cu subliniere `--hairline`; la hover sublinierea devine `--red`.

**Etichetă (`.lbl`)** — JetBrains Mono 11px/500, majuscule, `+0.12em`, `--mid`. Varianta roșie doar în locurile permise (§2.3).

**Antet de secțiune (`SectionHead.astro`)** — index mono roșu + titlu mono + hairline care umple restul.

**Figura (`Figure.astro`)** — rama întunecată + legenda. Props: `index`, `title`, `kind` (din `copy.kinds`), `tech`.

**Câmp de formular (`.fld`)** — fundal `--paper-2`, chenar `--hairline`, `border-radius` 6px, focus `--red`. **O singură definiție, în global.css.**

**Exponatul (`/projects`, 2026-08-25)** — secțiune `.exhibit` de `min-height: 100svh`, conținut centrat: `SectionHead` cu index + „EXHIBIT", numele proiectului la scară display, eticheta de stadiu, `Figure` mare cu ecranul live, paragraful-teză, nota, apoi `ExhibitActions.astro` (Contact `.btn` roșu · Like `.act` · Comment `.act`). `.act` e buton mono pe hairline; starea „liked" trece pe `--red`.

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
