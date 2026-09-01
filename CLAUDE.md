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

> **Înlocuit (2026-08-25), păstrat pentru istoric.** Strategia veche publica prețurile: rate card cu intervale pe homepage + 450 € fix pe `/blueprint`. Baza ei: TrustRadius (2.185 cumpărători B2B: „preț pe site" = factorul #1 la 71%; studiile de caz ultimele, la 9%), NN/g (cine ascunde costul pare „evaziv"; prescripția — interval pe scenariu tipic), G2 (61% mai puțin probabil să cumpere dacă dau date înainte de preț). Utilizatorul a decis explicit contra: prețul diferă per client și nu se afișează. Riscul cunoscut al deciziei: fără cifre, promisiunea celor 30 de minute e singurul diferențiator rămas — se ține proeminent pe `/`, `/services` și `/blueprint`. **Formulare aliniată 2026-08-31:** mecanismul e „30 de minute → un interval real; Blueprint → cifra fermă" — copy-ul spune acum „you leave with a real range" peste tot (vechiul „you leave with a number" + „the firm number comes after a 30-minute call" promiteau cifra fermă după apel, contrazicând mecanismul și pagina de contact).

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

**Excepție, datată 2026-08-24 (revizuită 2026-08-26; REINSTAURATĂ 2026-08-27 pe branch-ul `dive-canvas`, la cererea utilizatorului, după ce variantele „calme" de pe `redesign-paper` nu au convins):** homepage-ul are un `MaquetteCanvas.astro` — Three.js, fixed în spatele conținutului — cu **patru pagini întunecate ale prospectului** plutind în spațiu, fiecare purtând o **COPERTĂ-ALBUM desenată** (2026-08-28, decizia utilizatorului — copertele blur-only citeau ca „simple carduri"; detalii mai jos) cât timp e departe, și ESTOMPATĂ (blur — pete abstracte de text) doar în timpul apropierii. Fiecare pagină cu dive poartă copy-ul REAL al secțiunii ei (`CanvasTexture` din `copy.ts`, fonturile site-ului; a patra pagină e un cuprins). Pe secțiune, pagina zboară înăuntru și **parchează la mărimea textului** — NICIODATĂ full-screen (poza de parcare se calculează din camera vie: texturi pictate la 2×, parcare la ~1,12× din mărimea 1:1, plafonat la ~94vw/90vh; hârtia rămâne vizibilă în jur) — blur-ul se rezolvă în text clar („animația de apariție a textului"), apoi la plecare se estompează înapoi și **pagina pleacă împreună cu textul**. Textul HTML al §01–§03 e ascuns cât rulează canvasul (o singură scriere la boot — nimic per-frame, deci zero jitter) și rămâne în DOM pentru layout/SEO/no-JS/reduced-motion. Poza de apropiere pornește de DEPARTE și MIC — mărimea aparentă crește monoton până la parcare, nu o depășește niciodată (feedback 2026-08-26: „textul de pe card venea mai mare decât textul real"). Scrollul e legat prin **GSAP ScrollTrigger** cu `scrub: 0.25` (catch-up scurt, nu raw — pașii discreți de rotiță se leagă într-o mișcare; strâns 2026-08-28 de la 0,35 pentru responsivitate). **Snap REINSTAURAT 2026-08-27 ca „idle-settle"** (anulează scoaterea din 2026-08-25, când clicul „nu era smooth"; opririle mid-flight se simțeau aleatorii): `snap`-ul din ScrollTrigger pe trigger-ul existent — „fast reaction → small animation" (feedback 2026-08-27): pornit la 0,05s după ultimul input, glisare 0,5–0,85s `power3.out` (viteză maximă din prima clipă, aterizare moale), anulat instant de orice input, zonă moartă pe platou (cine e parcat nu e mișcat), topul hero-ului și fundul paginii = puncte de odihnă FĂRĂ zonă moartă (nicio zonă liberă — titlul tăiat și blocul roșu pe jumătate ieșit arătau stricat), nearest-center ne-direcțional; țintele = centrele măsurate din `buildTimeline()`. Geamănul DOM se aliniază pe verticală prin AUTO-CALIBRARE în `layoutPages()` (sonda inline-block = baseline-ul real al titlului, adus pe baseline-ul pictorului; vechiul padding fix lăsa textul cu ~38px logici mai sus). Pe §03 calibrarea merge invers și mai departe (2026-08-28): ștampila, coloanele de produs și rândul de jos se MĂSOARĂ din geamăn (cutie, rotație, fonturi, baseline-uri, line-height) și pictorul le redesenează din valorile măsurate — ștampila pictată din constante proprii (12/32px, −2,3°, cutie fixă) diferea de `.stamp` (10/28px, −5°) și „teleporta" la crossfade. **Copertele-album (2026-08-28):** cele patru pagini cu dive poartă o copertă în limbajul copertelor de pe `/projects` (numeral-filigran uriaș, caption tip placă cu index roșu, hairline, cruci-datum, un motiv house-illustration per secțiune — meniu cu leadere / cartuș de titlu / plăci-ecou + conturul ștampilei / cadru gol de studiu-de-caz; roșul limitat la indexul plăcii) cât timp e departe, parcată-alături sau în final. La apropiere coperta se topește (`melt`) în fața de blur existentă — fundal comun opac, deci fără flash — care apoi se rezolvă normal în text clar; parcarea rămâne identică pixel cu pixel (a treia față, `fMatC`, e 0 acolo). TOC (`pSide`) nu primește copertă — se comportă deja ca una. Opacitățile „departe" au crescut ca desenul să se vadă — re-măsurate 2026-08-30, la .50 compunerea `alpha:true` peste hârtia pală spăla coperta spre gri ilizibil: `OP.hidden` ui .22→**.86**, edge .65→.60; `OP.dim` .35→**.68**. **Pas ghidat (2026-08-27; din 2026-08-28 la FIECARE încărcare — flag-ul `mq:toured` „o dată per vizitator" SCOS la cererea utilizatorului: „vreau mereu animația când deschid site-ul"):** slide-deck la fiecare deschidere a homepage-ului — un gest = o secțiune pe `tourEase` (runda a 5-a, 2026-08-28: in-out CURSIV — 10% out-quad + 90% sine in-out; mișcările mari ale cardului stau la capetele distanței vii, deci timpul se concentrează acolo — desprinderea ~610ms, andocarea ~637ms, mijloacele mici ~330ms — viteza aparentă a cardului ≈ constantă; easing-urile „atac agil" erau corecte doar cât platourile înghețate mâncau capetele; ritm ~0,29·F/s, clamp 1,6–2,8s), deltele de rotiță se ACUMULEAZĂ (prag cumulat >6 — pragul per-eveniment înghițea swipe-urile blânde de trackpad), **excizia platourilor din tween** (2026-08-28: ±PK în jurul unei secțiuni parcate = cadre identice pixel-cu-pixel prin construcție, deci tween-ul animă doar distanța VIE — micro-dash 0,15s la plecare = fereastra de fade a geamănului, TELEPORT invizibil peste platoul de sosire în onComplete; înainte, coada ease-ului se târa ~1,1s peste platoul de sosire înghețat; durata scalează cu distanța vie, ~0,31·F/s, clamp 1,5–2,6s; hero/CTA n-au platou, deci nici dash/teleport), inputul suplimentar din tranziție ignorat, înapoi permis în același ritm, linkurile din nav + tastatura funcționează; la CTA turul se încheie DOAR pentru vizualizarea curentă — scroll liber + idle-settle până la următoarea încărcare; idle-settle DEZARMAT (`tourOn`) cât durează turul, altfel cei doi magneți se bat. Platoul e din nou ±0.22·viewport (deriva la ±0.16 reparată), ferestrele dive-urilor se ating exact (A=0.50·F). **Portalul DOM rămâne scos** (crossfade-ul „causes lag"). Cronologia se măsoară din DOM la fiecare refresh, nu se hard-codează. Efectul cerut explicit de utilizator nu era realizabil cu setul „nimic care se construiește pe ecran" — regula rămâne valabilă pentru orice altceva. Detalii în `docs/brand.md` §6. **Geamănul DOM (2026-08-26):** cât timp pagina e parcată exact (platoul trapezoidului), un geamăn DOM fix — conținutul HTML REAL al secțiunii, reparentat la boot și recolorat pe paleta de ecran — apare printr-un fade de 150ms peste card: text nativ de clar, linkuri clicabile, selectabil; dispare înainte ca cardul să se miște. Tipografia geamănului e blocată pe constantele pictorului (px logici, scalați cu --pgs), pictorii folosesc numele REALE (hash-uite de Astro) ale fonturilor și aceleași lățimi de frângere — crossfade-ul nu re-așază textul. WebGL-ul deține fiecare cadru în mișcare; DOM-ul deține doar starea parcată. **Extins 2026-08-26:** și §04 (obiecția) are pagina lui cu dive complet — cinci pagini în scenă; finalul (linii + particule) rulează între plecarea paginii §04 și CTA. **Pe celelalte pagini limbajul de card continuă STATIC:** `.float-card` (legănare lentă + tilt spre cursor, JS-ul mic din Base; tăcut la reduced-motion, tilt doar la pointer fin) pe ramele figurilor (`/projects`, `/blueprint`) și, cu skin-ul `.card-lite` (paper-2 + hairline + radius), pe blocurile de ofertă din `/services` și formularul din `/contact`. Niciodată pe un element cu `.rise` (ambele scriu `transform`) și niciodată pe blocurile roșii. **Cardul-pagină pe taburi (2026-08-26):** pe sub-pagini, TOT blocul de conținut al unei secțiuni e un card plutitor, cu mini-carduri GOALE, blurate, plutind în hârtia din jur (`AmbientCards`, pur CSS) — ecoul paginilor de pe homepage. Două suprafețe, împărțite deliberat până alege utilizatorul: `.card-page` (întunecat) pe `/projects` + `/contact`, `.card-page-lite` (hârtie ridicată) pe `/services` + `/blueprint` — schimbarea e un nume de clasă. Pe `/projects` cardul e ALBUMUL PĂTRAT cu flip descris la secțiunea Projects (2026-08-28): fața = doar coperta-ilustrație + nume + „View more", spatele = tot textul + acțiunile. **Reflexia „holo" (2026-08-26):** la hover, cardurile au un luciu care urmărește cursorul + un strat de puncte (halftone) dezvăluit doar în jurul lui — foarte subtil, gen folie de carte de joc; `screen` pe cardurile întunecate (overlay e invizibil pe #0F1013), blend normal + puncte de cerneală pe cele deschise; condus de --glare/--mx/--my din JS-ul din Base, cu micro-scale la hover. Legănarea implicită a cardurilor: 6-8px.

**Corecturi 2026-08-31 (audit UI/UX):**
1. **Canvasul rulează doar la viewport ≥1024px.** Sub prag, `boot()` iese devreme și homepage-ul redă HTML-ul static normal (aceeași cale ca no-JS/reduced-motion) — pagina parcată scala textul la ~6-9px pe telefon, ilizibil; formula de parcare (`texW·1.12`, plafon `.94·vw`) dă text lizibil doar de la ~1200px în sus.
2. **Canvasul se estompează complet peste footer** (`footFade` în render, măsurat din `footer.offsetTop` la fiecare refresh): clusterul final plutea PESTE textul juridic din subsol și îl făcea ilizibil.
3. **Hero-ul face fade la exit** (CSS `animation-timeline: view()`, doar `[data-seq] .slide-inner` + `.scroll-cue`): butonul roșu al hero-ului rămânea vizibil peste cardul parcat al §01 în timpul tranziției.
4. **Paginile §02 și §04 sunt mai scunde** (pAdm 7×3.4, pObj 7.5×2.5, era 4.3/4.37): parcau cu jumătatea de jos goală — „slide neterminat".
5. **Afirmația „about 250 bytes of JavaScript" a fost scoasă din copy** (`proof.exhibit`): falsă de când homepage-ul livrează Three.js + GSAP (~684 KB build). Regula de aur se aplică și aici — era singura afirmație verificabilă în 10 secunde din DevTools. Nota „~250 de octeți" de mai sus rămâne doar ca buget al mișcării native non-canvas.

**Re-coregrafie 2026-09-01 — „călătoria camerei" (aprobată explicit de utilizator, după feedback: „mișcări mari… cardurile vin din spate în față și se mișcă mult în timp scurt; nu simt animația fluidă, continuă. Pare programatică").** Cauzele vechiului dive: cardurile zburau ELE prin scenă (SCATTER → closeup → parcare), easing in-out PE SEGMENT (viteza cădea la zero la fiecare keyframe — pompaj), camera pompa r 28→7→11→7 identic de patru ori, lerp-uri în linie dreaptă, zero anticipare. Noua gramatică: **paginile stau NEMIȘCATE ca stații într-o arhivă întunecată** (șir șerpuit pe −z, ~14 unități între ele, învăluite de ceață `FogExp2 .022`), iar **CAMERA alunecă pe o singură spline Catmull-Rom** (centripetal, parametrizare pe lungime de arc — viteză aproape constantă în tranzit, smoothstep pe fiecare tronson = C1, viteză zero la ambele capete), andocând la fiecare stație; privirea face hold → pan → lock (ținta veche 10%, blocată pe următoarea de la 55% din tranzit) — **pagina următoare se vede în ceață înainte s-o atingi**. După §04 camera se ridică și se retrage; paginile se ÎNTORC spre ea (slerp scroll-driven, zero cât e ceva parcat) și liniile roșii se desenează între stații. Hero = cadru larg de deschidere pe axa arhivei. **Stațiile sunt PRE-SCALATE la scara de parcare** (aceeași formulă ca `parkPose`, recalculată la fiecare refresh) și waypointul de andocare = stație + normală·PARK_DIST, deci corecția cT la andocare e ~zero prin construcție — platourile rămân exact înghețate (excizia turului intactă), iar mărimea aparentă a paginii care vine crește monoton prin construcție (distanța scade monoton — assert temporar de dev). **`sceneAt(sp)` e unica funcție de scenă**: render-ul și sampler-ul turului (arcEase) o folosesc amândoi — nu mai pot diverge; ponderea pan/zoom în sampler a urcat .3→.5 (aproape toată mișcarea e acum de tip calm). Banking-ul de cameră a fost respins deliberat (parkPose copiază quaternionul camerei — orice roll ar roti cardul care andochează). Fața clară (`fMatS`) are `fog:false` ca crossfade-ul cu geamănul să rămână bit-exact; TOC-ul (pSide) își arată fața CLARĂ mereu (e trecut la ~2,6u — blur-ul de aproape ar părea stricat). Șterse: SCATTER/ASIDE/FINAL/closeup, kf*/camKF/interpKF/interpCam/OP/row/mono. Neatinse: parcarea + geamănul DOM, melt/resolve, turul (un gest = o secțiune), idle-settle, gate-ul mobil <1024px, footFade, demand rendering.

**Scoaterea pasului ghidat, 2026-09-01 (decizia utilizatorului: „do industry standard approach… why restrict the users") — anulează turul din 2026-08-27/28.** Slide-deck-ul (un gest = o secțiune, input interceptat, arcEase, excizia platourilor, dash/teleport — ~200 de linii) a fost ȘTERS. Justificarea lui originală a murit cu re-coregrafia: turul garanta că vezi doar cadre „autorizate" pentru că vechiul zbor de carduri arăta stricat la opriri mid-flight; în călătoria camerei ORICE poziție de scroll e un cadru compus prin construcție. Ce rămâne: scroll liber nativ + scrub 0,25s (pașii de rotiță se leagă în mișcare continuă) + **idle-settle-ul permanent înarmat** (nu mai există `tourOn` care să-l dezarmeze) — cine se oprește în tranzit e glisat magnetic la cel mai apropiat punct de odihnă. Costul asumat: se pierde ritmul autorat — un flick rapid traversează tot în ~2s, dar trece prin aceleași cadre. Varianta de mijloc (tur doar la prima vizită) respinsă: utilizatorul a refuzat flag-ul „o dată per vizitator" încă din 2026-08-28, iar două modele de input întreținute pe veci nu merită diferența.

**Pista de scroll (2026-09-01, la câteva minute după scoaterea turului — feedback: „I get in an instant and everything teleports… I scroll like I usually do and don't encounter any animation").** Cauza: fiecare tranzit avea doar ~0,56 viewporturi de scroll (~500px) — un flick obișnuit înghițea o secțiune întreagă; turul masca asta convertind gestul într-un tween de 2-3s. Fixul standard al scrollytelling-ului: (1) **§01–§04 primesc `min-height: 250svh`** printr-o clasă `mq-journey` pe `<html>`, pusă DOAR de `boot()`-ul canvasului (mobil <1024, no-JS și reduced-motion rămân la înălțimea naturală; clasa se scoate la `astro:before-swap`) — un tranzit ajunge la ~2 viewporturi de drum, pagina ~12 viewporturi; totul e re-măsurat de buildTimeline prin construcție. Hero și CTA rămân la 100svh (sunt conținut real, nu pistă). (2) **`scrub` 0,25→0,8**: fără tur, scrub-ul e singura netezire — flick-ul rapid se redă ca un glide de ~1s, nu ca teleport (0,25 fusese ales când turul conducea mișcarea și scrub-ul doar îl urmărea). Platourile (±0,22·viewport) rămân neschimbate în px absoluți — dwell-ul de citit nu s-a lungit, doar drumul dintre stații. (3) **Idle-settle cu rază de captură** (±0,5·viewport în jurul punctelor de odihnă): pe pista lungă, magnetul „nearest-center" necondiționat TRĂGEA ÎNAPOI orice flick care nu trecea de jumătatea tranzitului (verificat: scroll 400px → smuls înapoi la 0). Oprirea în afara razei rămâne pe loc — orice cadru e compus prin construcție, deci mid-transit nu mai e o stare „stricată" care să ceară rezolvare. (4) **Plecarea din §01 + fade-ul de proximitate** (feedback: „I don't like how section one goes away… pretty weird when you scroll fast"): camera pleca din dock₀ TĂIND pe lângă placa §01 la ~1,2u — cea mai lată placă mătura marginea cadrului în loc să se retragă. Arcul M₀₁ e acum o RETRAGERE laterală-sus la aceeași adâncime (−3.5, 3.8, 3) — placa se îndepărtează întâi, ca la celelalte secțiuni, iar traversarea planului ei cade la mijlocul tranzitului, cu privirea deja pe §02 — iar plăcile ne-parcate primesc un fade de proximitate `ss((d−2.5)/2)` — orice placă pe lângă care camera trece aproape se dizolvă în urmă, nu mătură ecranul; pragul stă sub distanța minimă de apropiere cu cT=0 (~5,2u), deci nu clipește la predarea către blend-ul de parcare.

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
| **Telefonul de pe `/contact`** | Se randează doar cu `PUBLIC_PHONE` setat (număr real, de completat de utilizator). B2B-ul românesc închide la telefon — email-only citește „prea mari pentru tine" sau „nu-s de aici" (audit 2026-08-31). |
| **Comentariile de pe `/projects`** | Cont cusdis.com → app-id → `PUBLIC_CUSDIS_APP_ID`. Fără variabilă, butonul Comment nu se randează. Moderarea (aprobarea comentariilor) e în sarcina utilizatorului. |
| **Like-urile de pe `/projects`** | Worker-ul din `workers/likes/` de deployat pe Cloudflare (KV namespace + `wrangler deploy`) → URL-ul în `PUBLIC_LIKES_ENDPOINT`. Fără variabilă, butonul Like nu se randează. |
| **`/privacy`** | Scrisă minimal și adevărat (zero cookie-uri, zero analytics). **De revizuit de utilizator înainte de publicare.** |
| **Domeniile** | `maquette.ro`, `maquettesoftware.com`, `.studio`, `.dev` + apărare de tipar. |
| **Email pe domeniu** | Zoho sau Google Workspace. Gmail pe cartea de vizită omoară credibilitatea. |

---

## Projects (fost Lab) — Declutter și GigTim

**Publicat din 2026-08-24**; **din 2026-08-25 pagina e `/projects` și e expoziție**: un exponat pe ecran (`min-height: 100svh`), nume mare, etichetă de stadiu, o figură mare cu ecran live, un paragraf-teză, o notă, apoi acțiunile — **Contact (buton roșu) + Like + Comment**. Cardurile de pe homepage trimit aici.

**Cardul-exponat PĂTRAT, o singură vedere (2026-08-28, decizia utilizatorului — înlocuiește albumul înalt din 2026-08-27):** cardul e pătrat (`aspect-ratio: 1`, lățime `min(100%, 100svh − 170px)`, `.flip-inner` absolut în pătrat — altfel min-height-ul conținutului învinge aspect-ratio), încape într-o singură vedere, fără scroll. **FAȚA e doar coperta:** ilustrația SVG proprie full-bleed + marca de planșă (FIG. mono, sus) + numele mare + eticheta de stadiu + butonul **„View more"** (proeminent — hârtie pe întuneric, `.btn-view`; roșul rămâne rezervat Contact). **SPATELE (la flip 180° pe Y, 0,7s, reduced-motion = instant) ține TOT textul:** teza, secțiunile din `more` (grilă 2 coloane) și acțiunile (Contact/Like/Comment) jos — fața/spatele `inert` alternativ; rotația pe `.flip-inner`, legănarea `.float-card` pe wrapper, niciodată același element. Copertele: `public/img/declutter-cover.svg` (supraîncărcarea cognitivă: ghem → poartă → trei grupuri) și `gigtim-cover.svg` (hartă de campus, pinuri, tichete de schimb) — compuse PĂTRAT (viewBox 1000×1000, treimea de jos calmă, sub scrim + titlu); ilustrații declarate, NU capturi false. **Ecranele DOM live** (`DeclutterApp.astro`, `GigTimDoc.astro`) NU mai apar pe card — rămân doar fallback de copertă când `cover` e gol; dacă dovada „cod care rulează" trebuie să revină pe /projects, se discută un slot nou.

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
