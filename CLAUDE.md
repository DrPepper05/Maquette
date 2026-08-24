# Maquette — imaginea completă

Site-ul și fațada firmei **EUDAIMONIA AI TECH S.R.L.**, care operează comercial sub numele **Maquette**.

> **Redesign 2026-08-24.** Utilizatorul a respins integral versiunea „peretele galeriei" — structură, design, mesaj („mesajul e fără sens și stângaci"). Deciziile noi, luate explicit: site **doar în engleză**, **puține pagini scurte**, identitate vizuală **nouă** („prospect tipărit"), iar **Lab-ul se publică** (Declutter + GigTim). Versiunea veche e păstrată în git, commit `pre-redesign`.

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

| | Preț | Publicat pe site? |
|---|---|---|
| **Blueprint** — conturarea ideii, 5 zile, preț fix | 450 € | **Doar pe `/blueprint`** — nu pe homepage |
| **Aplicații și site-uri** | 1.200–2.000 € (Treapta 1) | **Da, ca interval pe scenariu tipic** |
| **Automatizări** | 800–1.500 € + 80 €/lună | **Da, ca interval pe scenariu tipic** |

**De ce așa.** TrustRadius, 2.185 de cumpărători B2B: „preț disponibil pe site" e factorul #1 la **71%**; studiile de caz sunt **ultimele, la 9%**. NN/g: firmele care ascund costul sunt percepute ca „evazive"; când cifra exactă e imposibilă, prescripția e **interval pe scenariu tipic**. G2: 61% sunt mai puțin probabil să cumpere dacă trebuie să dea date înainte de preț.
⚠️ Seturile alea de date chestionează cumpărători la 20–100× dimensiunea unui angajament de 450–2.000 €. Mecanismul se transferă; procentele nu.

**Unde stă cifra.** Homepage-ul nu conține `450` nicăieri — duce doar mecanismul. Ancorare: prima cifră văzută ancorează tot studioul; cu 450 pe homepage, o construcție de 12.000 € sună a salt. Pe `/blueprint` cifra stă mare și fără scuze.

**Mecanismul care vinde Blueprint-ul:** taxa se scade **integral** din proiectul de construcție, dacă începe în 60 de zile. Și se spune explicit că documentul rămâne al clientului, inclusiv ca să-l ducă la altă firmă. Exact frica asta blochează semnătura. Reversarea riscului stă **lângă preț și lângă buton**, nu într-o secțiune separată (tiparul Jonathan Stark / roadmapping).

**Scara de prețuri urcă pe dovadă, nu pe dorință.** Treapta 2 la 2 studii de caz publicate; Treapta 3 la 5 proiecte + 2 abonamente. Primele proiecte sub preț **doar** cu clauză în contract: drept de publicare + testimonial semnat în 30 de zile.

**AR / 3D:** capabilitate reală (demo în `~/Desktop/upwork/Mobila`), dar **nu apare ca serviciu**. O singură propoziție de acoperire pe homepage, în secțiunea „What we build", ca demo-ul trimis pe email să nu pară împrumutat.

---

## Identitatea vizuală — prospectul tipărit

**Conceptul: „printed prospectus, live screens."** Pagină deschisă, ton de hârtie caldă, condusă de tipografie — iar **singurele obiecte întunecate sunt ecranele live**, încadrate ca figuri într-un document de specificație. Site-ul împrumută gramatica vizuală a propriului livrabil: secțiuni numerotate, linii subțiri, etichete mono, figuri cu legendă.

**De ce ține:** inversează complet site-ul vechi; nu ilustrează numele (capcana care a omorât v1–v3); e diferențiat — registrul implicit al studiourilor de software în 2026 e întunecat; și pune dovada (cod care rulează) în singurul loc întunecat de pe pagină, deci privirea cade pe ea.

> ⚠️ **Cinci versiuni au picat. Nu le repeta.**
> v1 hârtie de calc și axonometrie („site de construcții") · v2 obiect 3D condus de scroll · v3 același obiect randat offline („oribil") · v4 întuneric curat cu carduri (generic) · **v5 peretele galeriei cu plăci montate** — respins de utilizator în bloc: „nu-mi place structura, designul, mesajul; mesajul e fără sens și stângaci". Aglomerat: inventar, cheie de etichete, carteluri, parallax — totul concura cu totul.
> **Cauza comună la v1–v3: am ilustrat numele.** La v5: prea multe dispozitive. Combinația validată de dovezi rămâne **meșteșug înalt + complexitate joasă** *(Kuric et al., 2023)*.

**Cele trei mișcări de design — listă închisă, nu se adaugă a patra:**
1. **Secțiuni numerotate ca un document de specificație** — index mono (`01 — MECHANISM`) + linie subțire pe toată lățimea.
2. **Figuri întunecate cu ecrane live** — `Figure.astro`: ramă întunecată rotunjită, legendă mono (`FIG. 01 · DELIVERABLE — SAMPLE`). Ecranele sunt HTML/SVG care rulează, nu capturi. Câmpul `kind` păstrează exact trei valori (`Deliverable · sample`, `Capability demonstration`, `Delivered project`) — ultima nu se folosește fără acord scris de publicare.
3. **Roșul doar ca punctuație** — indexuri de secțiune, un singur buton primar pe ecran, sublinierea linkurilor, punctul din wordmark. Atât.

**Paletă:** hârtie `#F4F2ED` · blocuri `#ECE9E2` · cerneală `#141412` · secundar `#5C5A54` · linii `#D8D5CC` · roșu `#B34530` (5,7:1 pe hârtie — are voie să fie text la ≥14px). În rame `.screen`: fundal `#0F1013`, text `#F2F0EC`/`#8B8F94`, roșu `#D9573A`.

**Tipografie:** Figtree (titluri, text) + JetBrains Mono (etichete, legende — MAJUSCULE, `+0.12em`). Display: `clamp(44px, 7.5vw, 104px)`, `-0.035em`, 700, `text-wrap: balance`. Fonturile se self-hostează (nu CDN Google render-blocking).

**Mișcare: totul nativ, ~250 de octeți de JS.** `@view-transition` · secvența de deschidere pe homepage (5 elemente, 70ms) · `animation-timeline: view()` cu fallback IntersectionObserver. Reveal-uri subtile: opacitate + 10px. Curbe: `cubic-bezier(.23,1,.32,1)` intrare, `.16,1,.3,1` reveal. UI sub 300ms.

**Nu se adaugă, cu motiv:** GSAP/ScrollTrigger (50,7 KB gzip pentru un classList.add; licență Webflow revocabilă) · Lenis · split-text · preloader · scroll orizontal · cursor custom · Three.js · Rive/Lottie · nimic care se construiește pe ecran. **Diagramele au fost scoase de pe site** (decizie utilizator, 2026-08-24) — diagrama Before/After a fost ștearsă împreună cu excepția ei de asamblare la scroll; regula rămâne fără excepții.

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
  components/           ← Figure (rama + legenda), SectionHead (index numerotat)
  components/screens/   ← ecranul live: BlueprintDoc (mostra livrabilului)
  pages/                ← index · blueprint · lab · contact · privacy
```

**De ce structura asta:** o singură sursă de adevăr pentru text (`copy.ts`); cu o singură limbă, conținutul paginii stă direct în fișierul de rută — stratul `components/pages/` a fost eliminat odată cu bilingvismul.

**Atenție la cascadă:** clasele proprii (`.btn`, `.lbl`, `.fld`…) stau în `@layer components`, ca utilitarele Tailwind să le poată suprascrie.

**Paginile:** `/` · `/blueprint` · `/lab` · `/contact` · `/privacy`.
Navigația: **Blueprint · Lab · Contact** + butonul CTA.
`/servicii` s-a pliat în homepage (secțiunea „What we build"); `/cum-lucram` s-a pliat în `/contact` (regulile de lucru + răspunsul la „câți sunteți?"). Vechile URL-uri `/ro/*` și `/en/*` au redirect în `astro.config.mjs`.

**Ordinea secțiunilor pe homepage — 6, sub ~400 de cuvinte în total:**
1. **Hero** — ce facem și pentru cine, în 10 secunde *(NN/g)*. Tagline-ul e kicker, nu titlu.
2. **Mecanismul** — Blueprint în trei propoziții, fără cifră.
3. **Ce construim** — cele două servicii cu intervale pe scenariu tipic + propoziția de acoperire AR/3D.
4. **Dovada** — două carduri de produs (Declutter, GigTim) cu etichete de stadiu adevărate + „al treilea exponat e site-ul ăsta".
5. **O singură obiecție** — „unde sunt studiile de caz?", răspuns onest, fix înainte de CTA.
6. **CTA.**

⚠️ Ordinea nu e testată empiric nicăieri — e tipar convergent (Stark, Designjoy, NanoGlobals), nu dovadă. Măsurate sunt doar cele 10 secunde și avantajul copy-ului scurt (Unbounce: sub ~100 de cuvinte pe secțiune convertește ~2×).

**`/blueprint` poartă toată greutatea de convingere** (ordinea Stark): durere (doar text — diagrama a fost scoasă) → vis → ofertă (ce include / ce nu / prețul) → CTA + reversarea riscului lipită de el → **livrabilul-mostră arătat** (BlueprintDoc: „ăsta e ce primești") → toate cele 7 întrebări → al doilea CTA. Pagină lungă e OK aici; concizia e regulă de homepage.

**Comenzi:** `npm run dev` · `npm run build` · `npm run preview`

---

## Ce NU e terminat

| | Blocat de |
|---|---|
| **Logo** (wordmark + monogram) | Verificarea **OSIM / EUIPO** pe „Maquette". Nu se plătește nimic înainte. |
| **Datele din subsol** — nr. ONRC, sediu | De completat de utilizator. Obligatorii legal înainte de publicare. |
| **Formularul de contact** | Postează la endpoint-ul din `PUBLIC_FORM_ENDPOINT`; fără variabilă setată, pagina arată adresa de email în loc de formular. De creat cont Formspree/Resend. |
| **`/privacy`** | Scrisă minimal și adevărat (zero cookie-uri, zero analytics). **De revizuit de utilizator înainte de publicare.** |
| **Domeniile** | `maquette.ro`, `maquettesoftware.com`, `.studio`, `.dev` + apărare de tipar. |
| **Email pe domeniu** | Zoho sau Google Workspace. Gmail pe cartea de vizită omoară credibilitatea. |

---

## Lab — Declutter și GigTim

**Publicat din 2026-08-24**, prin decizia explicită a utilizatorului. `/lab` e indexată și legată din navigație. Cardurile de pe homepage trimit aici.

Eticheta de stadiu de pe fiecare proiect **trebuie să rămână adevărată**. Un `/lab` care minte despre stadiu e mai rău decât unul inexistent.

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

**Cererea de pe `/lab`, în ordinea asta:** psihoterapeuți testeri pentru Declutter (principal, cu buton) → colaboratori plătiți (secundar) → investiție (o propoziție, fără buton). O cerere de investiție pusă în față sună a nevoie de bani.

> ⚠️ **Riscul asumat:** două produse + servicii + Blueprint = patru lucruri sub un brand. Mitigarea rămâne strictă: o singură promisiune primară pe homepage, Lab-ul apare doar ca dovadă de capacitate (o secțiune, două carduri), cererile stau exclusiv în `/lab`.

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
