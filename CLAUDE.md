# Maquette — imaginea completă

Site-ul și fațada firmei **EUDAIMONIA AI TECH S.R.L.**, care operează comercial sub numele **Maquette**.

> **Redesign 2026-08-24.** Utilizatorul a respins integral versiunea „peretele galeriei" — structură, design, mesaj („mesajul e fără sens și stângaci"). Deciziile noi, luate explicit: site **doar în engleză**, **puține pagini scurte**, identitate vizuală **nouă** („prospect tipărit"), iar **Lab-ul se publică** (Declutter + GigTim). Versiunea veche e păstrată în git, commit `pre-redesign`.

> **Revizie de conținut 2026-08-25 (decizie explicită a utilizatorului).** Site-ul trebuie să susțină outreach-ul cu propuneri (automatizări, site-uri, aplicații — inclusiv AR). Patru decizii:
> 1. **Zero prețuri și zero termene autoimpuse pe site** — inclusiv 450 € și „5 zile" de la Blueprint. „Prețul diferă de la client la client." Anulează strategia de publicare bazată pe TrustRadius/NN-g (cercetarea rămâne consemnată mai jos, marcată ca înlocuită).
> 2. **`/services` separat de `/blueprint`** — pagină proprie cu cele trei tipuri de propuneri; homepage-ul rămâne introducere scurtă.
> 3. **`/lab` devine `/projects`** — expoziție: un proiect pe ecran, mare, cu vizual, cu butoane **Contact + Comment + Like** (comentariile și like-urile prin servicii externe, gate-uite pe env).
> 4. **AR/3D devine ofertă numită** (ex.: vizualizator AR de mobilă) — anulează regula din 2026-08-24 „AR nu apare ca serviciu".

---

## Ce e firma

Studio de software care vinde servicii la contract, în România și internațional. **O singură persoană** — dimensiunea nu se dezvăluie nicăieri, dar **nu se fabrică nimic fals**.

**Povestea, într-o frază:** luăm o idee neclară, îi dăm formă, apoi o construim.
**Tagline:** *"First the model. Then the system."* — pe site e kicker deasupra titlului, nu titlu. Un tagline de brand nu spune ce faci și cui; titlul trebuie s-o spună.

Numele vine din macheta pe care arhitectul o construiește înainte de clădire. Alternative respinse cu motiv: *Vizar* (coliziuni), *Contur* (prea comun), *Soleia* (domeniu ocupat).

**Limba site-ului: engleză.** Decizie 2026-08-24. ICP-ul principal din `docs/positioning.md` rămâne IMM-ul românesc — tensiune asumată: engleza servește Segmentul B și citește a competență pentru decidentul din Segmentul A. De revizuit dacă outreach-ul RO suferă. Boilerplate-ul RO din `docs/voice.md` rămâne pentru email și oferte.

---

## Regula de aur — se aplică la fiecare text scris vreodată

> **Nu afirmăm niciodată ceva fals. Doar nu dezvăluim dimensiunea.**

**Interzis, fără excepții:** echipă inventată (nume, poze), logo-uri de clienți fără acord scris, testimoniale nescrise de client, „X ani experiență" sau „X+ proiecte" umflate, sediu care nu există, certificări inexistente.

**Permis:** „noi" pe site și în oferte, „eu" în conversație directă (email, telefon, întâlnire). Proces documentat, termene, garanții.

**Consecință de structură:** nu există pagină „Echipa". Răspunsul la „câți sunteți?" stă pe `/contact`, lângă formular.

Motivul e practic, nu moral: piața B2B din România e mică și oamenii vorbesc. În plus, publicitatea înșelătoare e sancționabilă (Legea 158/2008).

---

## Ofertele

**Regula de publicare (2026-08-25): pe site nu apare nicio cifră și niciun termen autoimpus.** Serviciile se prezintă pe `/services` (Automations · Websites & web apps · Apps incl. AR/3D viewers), fiecare cu CTA. Mecanismul care rămâne vizibil peste tot: *„30 de minute → un interval; Blueprint → cifra fermă, care ține"*. Scara internă de prețuri trăiește doar în `docs/positioning.md`.

> **Înlocuit (2026-08-25), păstrat pentru istoric.** Strategia veche publica prețurile: rate card cu intervale pe homepage + 450 € fix pe `/blueprint`. Baza ei: TrustRadius (2.185 cumpărători B2B: „preț pe site" = factorul #1 la 71%; studiile de caz ultimele, la 9%), NN/g (cine ascunde costul pare „evaziv"; prescripția — interval pe scenariu tipic), G2 (61% mai puțin probabil să cumpere dacă dau date înainte de preț). Utilizatorul a decis explicit contra: prețul diferă per client și nu se afișează. Riscul cunoscut al deciziei: fără cifre, „you leave with a number" e singurul diferențiator rămas — se ține proeminent pe `/`, `/services` și `/blueprint`.

**Mecanismul care vinde Blueprint-ul (fără cifră):** prețul lui se spune în discuție, iar taxa se scade **integral** din proiectul de construcție. Documentul rămâne al clientului, inclusiv ca să-l ducă la altă firmă — exact frica asta blochează semnătura. Reversarea riscului stă **lângă buton** (tiparul Jonathan Stark / roadmapping). Clauza „în 60 de zile" a coborât din site în contract.

**Scara de prețuri urcă pe dovadă, nu pe dorință** — dar e integral internă (positioning.md §3b). Primele proiecte sub preț **doar** cu clauză în contract: drept de publicare + testimonial semnat în 30 de zile.

**AR / 3D: ofertă numită din 2026-08-25** (anulează regula „nu apare ca serviciu" din 2026-08-24). Pe `/services`, secțiunea Apps o spune direct: „your product in the customer's room, at true scale". Demo-ul real din `~/Desktop/upwork/Mobila` rămâne link privat pentru outreach; pe site nu se arată niciun ecran AR fals — fără captură reală, secțiunea rămâne text.

---

## Identitatea vizuală — prospectul tipărit

**Conceptul: „printed prospectus, live screens."** Pagină deschisă, ton de hârtie caldă, condusă de tipografie — iar **singurele obiecte întunecate sunt ecranele live**, încadrate ca figuri într-un document de specificație. Site-ul împrumută gramatica vizuală a propriului livrabil: secțiuni numerotate, linii subțiri, etichete mono, figuri cu legendă.

**De ce ține:** inversează complet site-ul vechi; nu ilustrează numele (capcana care a omorât v1–v3); e diferențiat — registrul implicit al studiourilor de software în 2026 e întunecat; și pune dovada (cod care rulează) în singurul loc întunecat de pe pagină, deci privirea cade pe ea.

> ⚠️ **Cinci versiuni au picat. Nu le repeta.**
> v1 hârtie de calc și axonometrie („site de construcții") · v2 obiect 3D condus de scroll · v3 același obiect randat offline („oribil") · v4 întuneric curat cu carduri (generic) · **v5 peretele galeriei cu plăci montate** — respins de utilizator în bloc: „nu-mi place structura, designul, mesajul; mesajul e fără sens și stângaci". Aglomerat: inventar, cheie de etichete, carteluri, parallax — totul concura cu totul.
> **Cauza comună la v1–v3: am ilustrat numele.** La v5: prea multe dispozitive. Combinația validată de dovezi rămâne **meșteșug înalt + complexitate joasă** *(Kuric et al., 2023)*.

**Mișcările de design — „ficțiunea documentului, mobilată complet" (revizuit 2026-08-24):**
1. **Secțiuni numerotate** — index mono roșu + titlu mono + hairline, plus același index ca **filigran uriaș** (Figtree 300, cerneală ~6%) în spatele conținutului.
2. **Figuri întunecate cu ecrane live** — `Figure.astro`: ramă întunecată, **crop marks** la colțuri, legendă mono. Câmpul `kind` păstrează exact trei valori; `delivered` nu se folosește fără acord scris.
3. **Roșul ca punctuație + o singură detonare pe pagină** — un bloc full-bleed roșu, exact unul: CTA-ul pe homepage, garanția pe `/blueprint`, CTA-ul pe `/services`; pe `/projects` roșul stă în butoanele Contact ale exponatelor, fără bloc. Plus `::selection` roșie, rigla de progres, ștampila.
4. **Mobilierul documentului** — cod de document + data reviziei (din build) pe fiecare pagină, header sticky cu riglă de progres, cuprins cu puncte de ghidaj în subsol, **ștampila onestității** `DELIVERED PROJECTS · 00` (o instanță, se actualizează când realitatea se schimbă), un cuvânt mono îmbinat în titlul hero.
Detalii și rațiunea (cercetarea U.S. Graphics / „finish the document fiction") în `docs/brand.md`.

**Paletă:** hârtie `#F4F2ED` · blocuri `#ECE9E2` · cerneală `#141412` · secundar `#5C5A54` · linii `#D8D5CC` · roșu `#B34530` (5,7:1 pe hârtie — are voie să fie text la ≥14px). În rame `.screen`: fundal `#0F1013`, text `#F2F0EC`/`#8B8F94`, roșu `#D9573A`.

**Tipografie:** Figtree (titluri, text) + JetBrains Mono (etichete, legende — MAJUSCULE, `+0.12em`). Display: `clamp(44px, 7.5vw, 104px)`, `-0.035em`, 700, `text-wrap: balance`. Fonturile se self-hostează (nu CDN Google render-blocking).

**Mișcare: totul nativ, ~250 de octeți de JS.** `@view-transition` · secvența de deschidere pe homepage (5 elemente, 70ms) · `animation-timeline: view()` cu fallback IntersectionObserver. Reveal-uri subtile: opacitate + 10px. Curbe: `cubic-bezier(.23,1,.32,1)` intrare, `.16,1,.3,1` reveal. UI sub 300ms.

**Nu se adaugă, cu motiv:** Lenis · split-text · preloader · scroll orizontal · cursor custom · Rive/Lottie. **Diagramele au fost scoase de pe site** (decizie utilizator, 2026-08-24) — diagrama Before/After a fost ștearsă împreună cu excepția ei de asamblare la scroll.

**Excepție, datată 2026-08-24 (revizuită 2026-08-26; REINSTAURATĂ 2026-08-27 pe branch-ul `dive-canvas`, la cererea utilizatorului, după ce variantele „calme" de pe `redesign-paper` nu au convins):** homepage-ul are un `MaquetteCanvas.astro` — Three.js, fixed în spatele conținutului — cu **patru pagini întunecate ale prospectului** plutind în spațiu, ESTOMPATE (blur — pete abstracte de text). Fiecare pagină cu dive poartă copy-ul REAL al secțiunii ei (`CanvasTexture` din `copy.ts`, fonturile site-ului; a patra pagină e un cuprins). Pe secțiune, pagina zboară înăuntru și **parchează la mărimea textului** — NICIODATĂ full-screen (poza de parcare se calculează din camera vie: texturi pictate la 2×, parcare la ~1,12× din mărimea 1:1, plafonat la ~94vw/90vh; hârtia rămâne vizibilă în jur) — blur-ul se rezolvă în text clar („animația de apariție a textului"), apoi la plecare se estompează înapoi și **pagina pleacă împreună cu textul**. Textul HTML al §01–§03 e ascuns cât rulează canvasul (o singură scriere la boot — nimic per-frame, deci zero jitter) și rămâne în DOM pentru layout/SEO/no-JS/reduced-motion. Poza de apropiere pornește de DEPARTE și MIC — mărimea aparentă crește monoton până la parcare, nu o depășește niciodată (feedback 2026-08-26: „textul de pe card venea mai mare decât textul real"). Scrollul e legat prin **GSAP ScrollTrigger** cu `scrub: 0.35` (catch-up scurt, nu raw — pașii discreți de rotiță se leagă într-o mișcare). **Fără snap și fără portal DOM** — ambele scoase la cererea utilizatorului (2026-08-25: clicul „nu e smooth", crossfade-ul „causes lag"); platoul lat al timeline-ului (±0.22 din înălțimea viewportului în jurul centrului) e cel care ține starea acoperită sub scroll liber. Cronologia se măsoară din DOM la fiecare refresh, nu se hard-codează. Efectul cerut explicit de utilizator nu era realizabil cu setul „nimic care se construiește pe ecran" — regula rămâne valabilă pentru orice altceva. Detalii în `docs/brand.md` §6. **Geamănul DOM (2026-08-26):** cât timp pagina e parcată exact (platoul trapezoidului), un geamăn DOM fix — conținutul HTML REAL al secțiunii, reparentat la boot și recolorat pe paleta de ecran — apare printr-un fade de 150ms peste card: text nativ de clar, linkuri clicabile, selectabil; dispare înainte ca cardul să se miște. Tipografia geamănului e blocată pe constantele pictorului (px logici, scalați cu --pgs), pictorii folosesc numele REALE (hash-uite de Astro) ale fonturilor și aceleași lățimi de frângere — crossfade-ul nu re-așază textul. WebGL-ul deține fiecare cadru în mișcare; DOM-ul deține doar starea parcată. **Extins 2026-08-26:** și §04 (obiecția) are pagina lui cu dive complet — cinci pagini în scenă; finalul (linii + particule) rulează între plecarea paginii §04 și CTA. **Pe celelalte pagini limbajul de card continuă STATIC:** `.float-card` (legănare lentă + tilt spre cursor, JS-ul mic din Base; tăcut la reduced-motion, tilt doar la pointer fin) pe ramele figurilor (`/projects`, `/blueprint`) și, cu skin-ul `.card-lite` (paper-2 + hairline + radius), pe blocurile de ofertă din `/services` și formularul din `/contact`. Niciodată pe un element cu `.rise` (ambele scriu `transform`) și niciodată pe blocurile roșii. **Cardul-pagină pe taburi (2026-08-26):** pe sub-pagini, TOT blocul de conținut al unei secțiuni e un card plutitor, cu mini-carduri GOALE, blurate, plutind în hârtia din jur (`AmbientCards`, pur CSS) — ecoul paginilor de pe homepage. Două suprafețe, împărțite deliberat până alege utilizatorul: `.card-page` (întunecat) pe `/projects` + `/contact`, `.card-page-lite` (hârtie ridicată) pe `/services` + `/blueprint` — schimbarea e un nume de clasă. Pe `/projects` cardul e un ALBUM: coperta sus (câmpul `cover` din copy.ts când există fotografia; până atunci ecranul live, tăiat full-bleed și atenuat), numele pe scrim, banda de info + acțiunile dedesubt; când apare fotografia, ecranul live coboară ca insert mic în bandă — dovada „cod care rulează" rămâne. **Reflexia „holo" (2026-08-26):** la hover, cardurile au un luciu care urmărește cursorul + un strat de puncte (halftone) dezvăluit doar în jurul lui — foarte subtil, gen folie de carte de joc; `screen` pe cardurile întunecate (overlay e invizibil pe #0F1013), blend normal + puncte de cerneală pe cele deschise; condus de --glare/--mx/--my din JS-ul din Base, cu micro-scale la hover. Legănarea implicită a cardurilor: 6-8px.

Detaliile complete în `docs/brand.md`.

---

## Tonul

Concret, nu grandios. Propoziții sub 20 de cuvinte. Onest despre limite. Fără exclamări, emoji, majuscule de accent, întrebări retorice.

**Listă neagră, fără excepții:** soluții inovatoare · sinergie · transformare digitală · partenerul tău de încredere · pasionați de tehnologie · soluții la cheie · valoare adăugată · de ultimă generație · *innovative solutions · seamless · cutting-edge · leverage · unlock · empower · client-centric*.

**Glosar fix (EN):** Blueprint (mereu majusculă) · *system*, nu "solution" · *build*, nu "develop" · *client*, nu "partner" · *price*, nu "investment" · *model*, nu "mockup/wireframe".

---

## Stack și structură

**Astro 5 + Tailwind v4**, static, **doar engleză**, pagini la rădăcină.

```
src/
  copy.ts               ← TOT textul. Se editează aici, nu în pagini.
  styles/global.css     ← tokenii din docs/brand.md + componentele, în @layer components
  layouts/Base.astro    ← head, navigație, subsol, fallback-ul IO
  components/           ← Figure (rama + legenda), SectionHead (index numerotat), ExhibitActions (contact/like/comment)
  components/screens/   ← ecrane live: BlueprintDoc, DeclutterApp, GigTimDoc
  pages/                ← index · services · blueprint · projects · contact · privacy
workers/likes/          ← Cloudflare Worker-ul contorului de like-uri (deploy manual, nu în build)
```

**De ce structura asta:** o singură sursă de adevăr pentru text (`copy.ts`); cu o singură limbă, conținutul paginii stă direct în fișierul de rută — stratul `components/pages/` a fost eliminat odată cu bilingvismul.

**Atenție la cascadă:** clasele proprii (`.btn`, `.lbl`, `.fld`…) stau în `@layer components`, ca utilitarele Tailwind să le poată suprascrie.

**Paginile:** `/` · `/services` · `/blueprint` · `/projects` · `/contact` · `/privacy`.
Navigația: **Services · Blueprint · Projects · Contact** + butonul CTA. **Toate butoanele roșii CTA duc la `/contact`** (rezolvat 2026-08-25 — hero-ul trimitea inconsecvent la `/blueprint`); `/blueprint` se atinge prin linkuri text.
`/cum-lucram` s-a pliat în `/contact` (regulile de lucru + răspunsul la „câți sunteți?"). `/lab` are redirect spre `/projects`; vechile URL-uri `/ro/*` și `/en/*` au redirect în `astro.config.mjs`.

**Ordinea secțiunilor pe homepage — revizuit 2026-08-25 (fără prețuri; scheletul de slide-uri și id-urile `s01…cta` rămân identice pentru canvas):**
1. **Hero** — ce facem și pentru cine, în 10 secunde *(NN/g)*. Tagline-ul e kicker, nu titlu. Butonul roșu → `/contact`; linkul secundar → `/blueprint`.
2. **Ce construim** — aceleași rânduri `.rate-row` cu puncte de ghidaj, dar coloana din dreapta e etichetă mono de categorie, nu preț. Ultimul rând: „See the services →" → `/services`. Nota de sub: fără prețuri de meniu, cifra fermă după 30 de minute.
3. **Blueprint-ul** — o singură propoziție + link către `/blueprint`. Mecanismul complet trăiește acolo, nu pe homepage.
4. **Dovada** — două carduri de produs cu etichete de stadiu adevărate + ștampila; linkul → `/projects` („See the exhibition").
5. **O singură obiecție** — „unde sunt studiile de caz?", fix înainte de CTA.
6. **CTA** (blocul roșu).

**Ierarhia textului:** ce trebuie văzut e mare (afirmații-cheie, etichete de stadiu); explicațiile sunt scurte și secundare. Corp 17px+, ritm aerisit. Utilizatorul s-a pierdut în versiunea densă — nu se coboară înapoi.

⚠️ Ordinea nu e testată empiric nicăieri — e tipar convergent (Stark, Designjoy, NanoGlobals), nu dovadă. Măsurate sunt doar cele 10 secunde și avantajul copy-ului scurt (Unbounce: sub ~100 de cuvinte pe secțiune convertește ~2×).

**`/services` (nou, 2026-08-25):** gramatica prospectului, doar text — fără figuri (niciun ecran AR fals). 01 Automations · 02 Websites & web apps · 03 Apps incl. AR/3D viewers · 04 How pricing works (mecanismul: 30 de minute → interval; Blueprint → cifră fermă) · blocul roșu CTA.

**`/blueprint` poartă toată greutatea de convingere** (ordinea Stark, revizuită 2026-08-25 — fără cifră și fără „5 zile"): durere → ce primești → procesul (pași `01–04`, fără zile) → **garanția** (blocul roșu: „taxa se scade integral din build" + „documentul rămâne al tău") + CTA lipit → **livrabilul-mostră arătat** (BlueprintDoc) → toate cele 7 întrebări → al doilea CTA. Fișa de fapte spune mecanismul prețului („quoted up front, fixed once agreed"), nu cifra. Pagină lungă e OK aici; concizia e regulă de homepage.

**Comenzi:** `npm run dev` · `npm run build` · `npm run preview`

---

## Ce NU e terminat

| | Blocat de |
|---|---|
| **Logo** (wordmark + monogram) | Verificarea **OSIM / EUIPO** pe „Maquette". Nu se plătește nimic înainte. |
| **Datele din subsol** — nr. ONRC, sediu | De completat de utilizator. Obligatorii legal înainte de publicare. |
| **Formularul de contact** | Postează la endpoint-ul din `PUBLIC_FORM_ENDPOINT`; fără variabilă setată, pagina arată adresa de email în loc de formular. De creat cont Formspree/Resend. |
| **Comentariile de pe `/projects`** | Cont cusdis.com → app-id → `PUBLIC_CUSDIS_APP_ID`. Fără variabilă, butonul Comment nu se randează. Moderarea (aprobarea comentariilor) e în sarcina utilizatorului. |
| **Like-urile de pe `/projects`** | Worker-ul din `workers/likes/` de deployat pe Cloudflare (KV namespace + `wrangler deploy`) → URL-ul în `PUBLIC_LIKES_ENDPOINT`. Fără variabilă, butonul Like nu se randează. |
| **`/privacy`** | Scrisă minimal și adevărat (zero cookie-uri, zero analytics). **De revizuit de utilizator înainte de publicare.** |
| **Domeniile** | `maquette.ro`, `maquettesoftware.com`, `.studio`, `.dev` + apărare de tipar. |
| **Email pe domeniu** | Zoho sau Google Workspace. Gmail pe cartea de vizită omoară credibilitatea. |

---

## Projects (fost Lab) — Declutter și GigTim

**Publicat din 2026-08-24**; **din 2026-08-25 pagina e `/projects` și e expoziție**: un exponat pe ecran (`min-height: 100svh`), nume mare, etichetă de stadiu, o figură mare cu ecran live, un paragraf-teză, o notă, apoi acțiunile — **Contact (buton roșu) + Like + Comment**. Cardurile de pe homepage trimit aici.

**Vizualurile de lansare sunt ecrane DOM în stilul casei** (nu există capturi în `public/img/`): `DeclutterApp.astro` (UI-ul prototipului — captură, grupare, banda „returns before your session") și `GigTimDoc.astro` (o pagină din **propriul Blueprint al lui GigTim**, în gramatica BlueprintDoc — vizualul onest pentru „being scoped"). Ambele `kind: demo`; se înlocuiesc cu capturi reale în același slot de figură când există.

**Like + Comment sunt gate-uite pe env**, ca formularul: `PUBLIC_LIKES_ENDPOINT` (Cloudflare Worker + KV, sursa în `workers/likes/`) și `PUBLIC_CUSDIS_APP_ID` (Cusdis — găzduit, gratuit, anonim, cu moderare; SDK-ul se încarcă doar la primul clic pe Comment). Fără variabile setate se randează doar Contact — zero JS de terți. Contoarele pornesc de la `00` — zeroul onest e mișcarea brandului; **nu se seedează niciodată cifre false**. Comentariile apar doar după aprobare în inbox-ul Cusdis; microcopy-ul „Comments appear after review" e obligatoriu, altfel widgetul pare stricat.

Eticheta de stadiu de pe fiecare proiect **trebuie să rămână adevărată**. Un `/projects` care minte despre stadiu e mai rău decât unul inexistent.

**Rama de mesaj:** produsele proprii nu sunt un pivot — sunt dovada procesului. „Ne trecem propriile idei prin exact Blueprint-ul pe care îl vindem." GigTim, fiind *în conturare*, e demonstrația vie a ofertei plătite.

### Declutter — *prototip*

Aplicație pentru gândurile pe care vrei să le spui la terapie și pe care le uiți până ajungi acolo. **Declanșatorul e ședința de terapie** — asta e produsul. Un gând nu se arhivează, se întoarce înainte de ședință, grupat.

**Stadiu real:** capturarea și gruparea funcționează; reluarea înainte de ședință e în lucru.

**Constrângere serioasă:** conținutul e **dată privind sănătatea**, articolul 9 GDPR. Criptare, stocare în UE, zero tracking publicitar, niciun model antrenat pe conținut. Tratat corect, e cel mai bun argument din pagină — un terapeut întreabă unde stau datele pacienților lui.

### GigTim — *în conturare* ✓ confirmat de utilizator (2026-08-24)

Platformă prin care studenții găsesc joburi scurte. Firmele pun anunțuri, oamenii le iau.

**Stadiu:** în conturare — trece prin exact procesul pe care îl vindem, Blueprint înainte de prima linie de cod.

**Partea grea nu e aplicația, e primul oraș.** Marketplace fără densitate locală nu funcționează. Un singur campus și un singur cartier, nu lansare națională.

**Expunere juridică reală:** munca scurtă în România are formă legală — zilier (Legea 52/2011), PFA sau CDD. Forma juridică se decide în Blueprint, nu după lansare.

**Cererea de pe `/projects`, în ordinea asta:** psihoterapeuți testeri pentru Declutter (principal, cu buton) → colaboratori plătiți (secundar) → investiție (o propoziție, fără buton). O cerere de investiție pusă în față sună a nevoie de bani.

> ⚠️ **Riscul asumat:** două produse + servicii + Blueprint = patru lucruri sub un brand. Mitigarea rămâne strictă: o singură promisiune primară pe homepage, proiectele apar acolo doar ca dovadă de capacitate (o secțiune, două carduri), cererile stau exclusiv în `/projects`.

---

## Ordinea de atac — următoarele 90 de zile

1. Site-ul terminat și publicat. E simultan fațada, portofoliul și dovada că știi să faci site-uri.
2. Demo-ul AR pregătit ca link privat.
3. Email rece către firma de mobilă, cu demo-ul ca deschizător → Blueprint sau proiect direct.
4. **Primele 2 proiecte cu clauză de publicare + testimonial.** Singurul obiectiv real al primelor 3 luni: nu bani, ci dovadă.
5. Upwork în paralel — finanțare, nu strategie.

---

## Documentele

- `docs/positioning.md` — ce vindem, cui, la ce preț, politica „noi"
- `docs/voice.md` — tagline, boilerplate RO/EN, ton, 9 obiecții cu răspuns scris
- `docs/brand.md` — conceptul „prospect tipărit", culoare, tipografie, componente, listă neagră
- `docs/site-map.md` — structura fiecărei pagini și copy-ul

Când ceva se schimbă, se schimbă **în documente întâi**, apoi în cod.
