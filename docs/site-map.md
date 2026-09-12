# Maquette — Arhitectura site-ului și textele

> Document intern. Structura fiecărei pagini + direcția de copy, în engleză (limba site-ului din 2026-08-24).
> Scris după regulile din `docs/voice.md`. Ofertele din `docs/positioning.md`. Vizualul din `docs/brand.md`.
> **Revizuit 2026-08-25:** zero prețuri și zero termene autoimpuse pe site · `/services` separat · `/lab` → `/projects` (expoziție cu Contact/Comment/Like) · AR ca ofertă numită.

---

## 1. Structura

Site **doar în engleză**, pagini la rădăcină. Șase rute:

| Rută | Rol | Buget de text |
|---|---|---|
| `/` | Vitrina: ce facem, Blueprint-ul, dovada, o obiecție, CTA | 6 secțiuni, ≤400 de cuvinte |
| `/services` | Cele trei tipuri de propuneri + mecanismul de preț | ~450 de cuvinte |
| `/blueprint` | Pagina de vânzare a primului pas. Fără cifră, fără zile | ~1.200 de cuvinte |
| `/projects` | Expoziția: Declutter și GigTim, un exponat pe ecran + cererile | ~500 de cuvinte |
| `/contact` | Formular + regulile de lucru + „câți sunteți?" | ~200 de cuvinte |
| `/privacy` | Politica minimă și adevărată (acoperă și comentariile/like-urile) | scurtă |

**Navigație — patru intrări + butonul:** Services · Blueprint · Projects · Contact · **[Start with a Blueprint]** (singurul buton roșu de pe ecran). **Toate butoanele roșii CTA duc la `/contact`**; `/blueprint` se atinge prin linkuri text.

**În subsol:** cuprinsul (Services · Blueprint · Projects · Contact · Privacy) · datele firmei · ANPC / ODR.

**Redirecturi** (`astro.config.mjs`): `/lab` → `/projects` · `/ro/lab`, `/en/lab` → `/projects` · `/ro/servicii`, `/en/services` → `/services` · restul `/ro/*`, `/en/*` ca înainte.

**Nu există:** pagină „Echipa", pagină „Tehnologii", blog, comutator de limbă, **nicio cifră de preț și niciun termen autoimpus**.

---

## 2. Homepage — 5 secțiuni (hero + 3 + CTA din 2026-09-12), ≤300 de cuvinte

Scheletul de slide-uri și id-urile (`hero`, `s01`–`s04`, `cta`, `s0N-inner`) **nu se schimbă** — canvas-ul își măsoară cronologia din ele.

### 01 — Hero *(revizuit 2026-09-12 — decizia utilizatorului: „too much words for the landing page… essence… in the first 30s figure out what Maquette does". Titlul = problema + promisiunea; lede-ul = ce, pentru cine, cum.)*

> `FIRST THE MODEL. THEN THE SYSTEM.` *(kicker mono)*
>
> # Custom software for growing companies, modelled before it is built.
>
> Automations, web apps and AR product viewers for small and mid-sized companies. Modelled first, built second, priced before you commit.
>
> **[Start with a Blueprint → /contact]**  [How every build starts → /blueprint]

### 02 — WHAT WE BUILD *(2026-09-12, runda a doua: TABEL DE SPECIFICAȚIE — meniul cu leadere și etichete-categorie în dreapta „doesn't make sense")*

> ## Automations, web systems, apps.
>
> | AUTOMATIONS | Quotes, invoices, reports and hand-offs that run without a person |
> | WEB SYSTEMS | Websites, catalogues and client portals your own team edits |
> | APPS & AR | Mobile and desktop apps; your product in the customer’s room, at true scale |
> | ANYTHING ELSE | **See the services →** |
>
> No price list — every build is quoted for the company it is for. Thirty minutes gives you a real range; the Blueprint gives you the firm number.

### 03 — THE BLUEPRINT *(o propoziție; mecanismul complet pe /blueprint)*

> ## See the whole system before you commit to it — spec, architecture, a clickable prototype, a firm price. The document stays yours.
>
> [What is in a Blueprint →](/blueprint)

### 04 — PROOF

> ## Our own products go through the same Blueprint.
>
> **Declutter** `PROTOTYPE` — For the thoughts you meant to bring to therapy and forgot. Health data, treated as such: encrypted, stored in the EU, never used to train a model.
> **GigTim** `BEING SCOPED` — Short shifts for students. Spec, architecture and numbers first — no code until the model holds.
>
> Ștampila `DELIVERED PROJECTS · 00` + „The third exhibit is this site, designed and built by hand." · **[See the exhibition →](/projects)**

*(05 — obiecția „Where are the case studies?" a fost SCOASĂ 2026-09-12 la cererea utilizatorului. Homepage = hero + 3 secțiuni + CTA.)*

### 06 — CTA (blocul roșu)

> ## Thirty minutes. You leave with a real range.
> No sales deck. You tell us what hurts; we tell you what fixing it would cost and how long it would take — even if we never work together.
>
> **[Start with a Blueprint → /contact]**

---

## 3. `/services` — cele trei propuneri *(pagină nouă, 2026-08-25)*

Gramatica prospectului, **doar text — fără figuri** (niciun ecran AR fals; singurele ecrane de pe site rămân pe `/blueprint` și `/projects`). Un bloc roșu: CTA-ul final.

> `SERVICES`
> # Automation, web systems, and apps — each built from a model first.
> Three kinds of work, one process: we define the system with you, then build it in phases. No menu prices — every build is quoted for the client it is for.

**01 — Automations** — munca făcută de mână, făcută de sistem: oferte/facturi/rapoarte care se generează singure, două sisteme legate (ERP ↔ site ↔ email ↔ sheets), stocuri și notificări sincronizate. Se vinde în ore economisite (positioning.md). Link „Talk to us →" → `/contact`.

**02 — Websites & web apps** — site de prezentare cu CMS editabil de client, cataloage și portaluri de client cu panou de administrare, aplicații web pe procesul clientului, performanță reală pe telefon. Link → `/contact`.

**03 — Apps, including AR product viewers** — aplicații mobile și desktop; vizualizatorul AR numit direct: „your product in the customer's room, at true scale — a couch seen from the product page, before it is bought". Configuratoare 3D legate de opțiunile reale de produs. Link → `/contact`.

**04 — How pricing works** — înlocuitorul rate card-ului: niciun build nu costă la fel, deci site-ul nu are meniu de prețuri; 30 de minute → un interval de care putem răspunde; cifra exactă → din Blueprint, „quoted up front, fixed once agreed". Link → `/blueprint`.

**CTA roșu:** „Thirty minutes, and you leave with a real range." → `/contact`.

---

## 4. `/blueprint` — pagina de vânzare *(revizuită 2026-08-25: fără 450 €, fără „5 zile")*

Ordinea Stark: durere → ce primești → procesul → **garanția (blocul roșu) + CTA lipit** → livrabilul-mostră → întrebări → CTA.

### Hero + fișa produsului

> `HOW EVERY BUILD STARTS`
> # Find out exactly what it will cost before you commit to it.
> The Blueprint is the model of your project: a spec, an architecture, a clickable prototype and a real number. You do it before committing to anything large.
>
> | Scope | One system, defined together |
> | Who works on it | One person, start to finish |
> | Result | Spec, architecture, prototype, estimate |
> | The price | Quoted up front, fixed once agreed |

Fișa spune **mecanismul** prețului, nu cifra. Rândurile `Commitment / 5 working days` și `Price / €450` au fost șterse.

### 01 Durerea · 02 Cele cinci livrabile — neschimbate.

### 03 Procesul *(fost „The five days" — pași mono, fără zile)*

> | 01 | A long conversation. We ask the uncomfortable questions now, not in three months. |
> | 02 | We write the spec and the architecture. You get a draft and you correct it. |
> | 03 | The prototype. |
> | 04 | The estimate, the plan, the risks. We walk through them together, point by point. |

### 04 Garanția *(blocul roșu — fost „The price")*

> ## The Blueprint fee comes off the build entirely.
> If we go on to build together, the Blueprint cost you nothing.
>
> **If you decide not to build with us, the document is still yours.** You can take it to your own team or to another firm. *(neschimbat)*
>
> **[Start with a Blueprint → /contact]**

Cifra uriașă și „within 60 days" au fost scoase — clauza de 60 de zile trăiește în contract.

### 05 Livrabilul-mostră (BlueprintDoc) · 06 Pentru cine e / nu e — neschimbate.

### 07 Întrebările — toate cele 7; singura schimbare: finalul ultimei („best €450 you can spend" → „the cheapest way to find out").

### CTA final — neschimbat.

---

## 5. `/projects` — expoziția *(fost `/lab`, restructurat 2026-08-25)*

> `THE EXHIBITION`
> # Two projects, shown as they are.
> We run our own ideas through the process we sell: model first, phases, honest stage labels.

**Un exponat pe ecran** (`.exhibit`, `min-height: 100svh`, centrat): index `01/02` + „EXHIBIT" (SectionHead) → numele mare + eticheta de stadiu (adevărată, obligatoriu) → **figura mare** cu ecranul live → paragraful-teză → nota (Declutter: date de sănătate; GigTim: forma juridică) → **acțiunile**.

| Exponat | Stadiu | Vizual de lansare |
|---|---|---|
| Declutter | `Prototype · updated August 2026` | `DeclutterApp.astro` — UI-ul prototipului: captură, grupuri, banda „returns before your session". `kind: demo` |
| GigTim | `Being scoped · going through its own Blueprint` | `GigTimDoc.astro` — o pagină din propriul lui Blueprint (gramatica BlueprintDoc, cutia „Open questions"). `kind: demo` |

Capturile reale (`public/img/…`) intră în același slot de figură când există.

**Acțiunile (`ExhibitActions.astro`):** Contact (`.btn` roșu → `/contact`, mereu) · Like (`♥ NN`, doar cu `PUBLIC_LIKES_ENDPOINT`) · Comment (deschide firul Cusdis, doar cu `PUBLIC_CUSDIS_APP_ID`). Fără variabile → doar Contact, zero JS de terți. Sub fir: „Comments appear after review."

**Cererile, în ordinea asta, exclusiv aici (neschimbate):** psihoterapeuți (buton) → colaboratori plătiți → investiție (o propoziție, fără buton).

---

## 6. `/contact`

Neschimbat: formular (postează la `PUBLIC_FORM_ENDPOINT`; fără variabilă — adresa de email; niciodată `action="#"`) + „How working with us goes" + răspunsul la „How many of you are there?".

**Telefon (2026-08-31):** sub formular/email, un rând „Or call `NUMĂR`" (`tel:`-link) — randat **doar** cu `PUBLIC_PHONE` setat, ca restul integrărilor. Motiv: B2B-ul românesc închide la telefon; email-only citește distant. Fără variabilă, nimic nu se afișează — nu se inventează un număr.

---

## 7. `/privacy`

Adevărul simplu: zero cookie-uri, zero analytics; datele din formular folosite doar ca să răspundem. **Nou (2026-08-25):** o secțiune despre like-uri și comentarii pe `/projects` — like-ul stochează un număr și un semn în browserul vizitatorului, nimic identificabil; comentariile sunt găzduite de Cusdis, se încarcă doar la deschidere, apar după aprobare; dacă nu se văd, nu rulează. Referința „the Lab" → „the projects page".

**De revizuit de utilizator înainte de publicare.**

---

## 8. Subsolul

Neschimbat ca reguli (fără „©/Made with ❤️"); cuprinsul include acum Services și Projects.

---

## 9. Ce trebuie să existe înainte de lansare

- [ ] Datele SRL-ului pentru subsol (ONRC, sediu)
- [ ] `PUBLIC_FORM_ENDPOINT` setat (Formspree/Resend) — altfel se afișează emailul
- [ ] `PUBLIC_PHONE` setat (număr real) — altfel `/contact` nu arată telefon
- [ ] `PUBLIC_CUSDIS_APP_ID` setat (cont cusdis.com) — altfel nu există Comment; moderarea e a utilizatorului
- [ ] `PUBLIC_LIKES_ENDPOINT` setat (worker-ul din `workers/likes/` deployat pe Cloudflare) — altfel nu există Like
- [ ] `/privacy` revizuită de utilizator
- [ ] Email pe domeniu
- [ ] Etichetele de stadiu din `/projects` verificate încă o dată față de realitate
