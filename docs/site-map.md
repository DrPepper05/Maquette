# Maquette — Arhitectura site-ului și textele

> Document intern. Structura fiecărei pagini + textele finale, în engleză (limba site-ului din 2026-08-24).
> Scris după regulile din `docs/voice.md`. Ofertele din `docs/positioning.md`. Vizualul din `docs/brand.md`.

---

## 1. Structura

Site **doar în engleză**, pagini la rădăcină. Cinci rute:

| Rută | Rol | Buget de text |
|---|---|---|
| `/` | Vitrina: ce facem, mecanismul, serviciile, dovada, o obiecție, CTA | 6 secțiuni, ≤400 de cuvinte |
| `/blueprint` | Pagina de vânzare. Toată greutatea de convingere + cifra de 450 € | ~1.400 de cuvinte |
| `/lab` | Cele două produse în profunzime + cererile | ~600 de cuvinte |
| `/contact` | Formular + regulile de lucru + „câți sunteți?" | ~200 de cuvinte |
| `/privacy` | Politica minimă și adevărată | scurtă |

**Navigație — trei intrări + butonul:** Blueprint · Lab · Contact · **[Start with a Blueprint]** (singurul buton roșu de pe ecran).

**În subsol:** datele firmei · Privacy · ANPC / ODR.

**Redirecturi:** tot ce era `/ro/*` și `/en/*` trimite la echivalentul nou (vezi `astro.config.mjs`). `/ro/servicii` și `/en/services` → `/`; `/ro/cum-lucram` și `/en/how-we-work` → `/contact`.

**Nu există:** pagină „Echipa", pagină „Tehnologii", blog, pagină de AR, comutator de limbă.

---

## 2. Homepage — 6 secțiuni, ≤400 de cuvinte

### 01 — Hero

> `FIRST THE MODEL. THEN THE SYSTEM.` *(kicker mono — tagline-ul, demis din poziția de titlu)*
>
> # We build web apps and automations for companies that have outgrown spreadsheets.
>
> We start with the model, not the code — a fixed-price Blueprint before anything big.
>
> **[Start with a Blueprint]**  [Talk to us →]

Titlul spune **ce + pentru cine**. Tagline-ul singur nu trece testul de 10 secunde (NN/g) — un vizitator nu află din el că e un studio de software pentru firme.

### 02 — WHAT WE BUILD · rate card *(revizuit 2026-08-24: meniu de prețuri, nu proză)*

> ## What we build, and what it typically costs.
>
> | Presentation website, CMS included | €1,200 – 1,500 |
> | Catalogue or client portal, with admin panel | €1,500 – 2,000 |
> | Two systems connected — ERP ↔ website ↔ email | €800 – 1,100 · +€80/mo |
> | Quotes, invoices and reports that run themselves | €1,100 – 1,500 · +€80/mo |
> | Something specific — a configurator, 3D/AR, an unusual automation | **Talk to us** |
>
> Every figure is a typical scenario. The firm number comes after a 30-minute call — and it stays firm.

Rândurile au puncte de ghidaj (ca la cuprins), prețul mare în mono. Sub-intervalele sunt împărțiri ale Treaptei 1 (positioning.md). Rândul catch-all acoperă și demo-ul AR trimis pe email.

### 03 — THE BLUEPRINT *(comprimat: o propoziție, nu o secțiune grea — mecanismul complet stă pe /blueprint)*

> ## Every build starts with a Blueprint: five days, a fixed price, and a document that stays yours even if you build elsewhere.
>
> [See what's in it →](/blueprint)

Fără cifră — ancorarea rămâne regulă (vezi CLAUDE.md).

### 04 — PROOF

> ## We run our own ideas through the process we sell.
>
> **Declutter** — `PROTOTYPE` — The things you meant to say in therapy, and forget by the time you get there. What you write there is health data, and we treat it that way: encrypted, stored in the EU, no model trained on it.
>
> **GigTim** — `BEING SCOPED` — Short shifts for students. It goes through its own Blueprint first: spec, architecture and numbers before the first line of code.
>
> The third exhibit is this site — static, hand-written, about 250 bytes of JavaScript.
>
> [See the Lab →](/lab)

Etichetele de stadiu vin din realitate și se actualizează când realitatea se schimbă.

### 05 — THE QUESTION EVERYONE ASKS

> ## Where are the case studies?
> There aren't any yet — none we could publish with written client consent, and we don't publish without it. Until then we show working deliverables instead: a real Blueprint sample, two products of our own, and this site. The first delivered project goes up the day a client signs off.

### 06 — CTA

> ## Thirty minutes, and you leave with a number.
> No strings and no sales deck. You tell us what hurts, we tell you what it would cost and how long it would take — even if we never work together.
>
> **[Start with a Blueprint]**

---

## 3. `/blueprint` — pagina de vânzare (ordinea Stark)

Durere → vis → ofertă → CTA + reversarea riscului → livrabilul-mostră → întrebări → CTA.

### Hero + fișa produsului

> `FIXED PRICE · 5 WORKING DAYS`
> # Pay a little to find out exactly what it will cost.
> The Blueprint is the model of your project: a spec, an architecture, a clickable prototype and a real number. You do it before committing to anything large.
>
> | Commitment | 5 working days |
> | Price | **€450** |
> | Who works on it | One person, start to finish |
> | Result | Spec, architecture, prototype, figure |

Cifra apare aici din primul ecran — pe pagina de evaluare se afișează mare și fără scuze.

### Durerea

> ## Software projects don't fail in the coding.
> They fail at the start, when nobody has written down clearly what needs to exist. It begins with a conversation and a rough estimate, and three months later the unspoken assumptions surface. That is why the first thing we sell is not code.

*(Diagrama Before/After a fost scoasă — decizie utilizator, 2026-08-24. Secțiunea e doar text.)*

### Ce primești — cinci livrabile

1. **Functional spec** — what the system does, for whom, in what order. Written in your language, not in jargon.
2. **Technical architecture** — which components, which technologies, what integrates with what.
3. **Clickable prototype** — not a picture. You click through it and show it to your team.
4. **Phased estimate** — a range, not a single number. A single number is always a lie.
5. **Execution plan and risks** — what can break, and what we do when it does.

### Cele cinci zile

| Day 1 | A long conversation. We ask the uncomfortable questions now, not in three months. |
| Day 2–3 | We write the spec and the architecture. You get a draft and you correct it. |
| Day 4 | The prototype. |
| Day 5 | The estimate, the plan, the risks. We walk through them together, point by point. |

### Prețul + reversarea riscului (lipite)

> # €450
> It comes off the build entirely, if the build starts within 60 days. If we go on together, the Blueprint cost you nothing.
>
> **If you decide not to build with us, the document is still yours.** You can take it to your own team or to another firm. We sell it that way because a client who feels trapped isn't a good client — not for them, not for us.
>
> **[Start with a Blueprint]**

### Livrabilul-mostră

> ## This is what you receive.
> Figura 01: `BlueprintDoc` — p. 7 / 24 din specificația funcțională. Legendă: `Deliverable · sample`. Singura figură de pe site.

### Pentru cine e / nu e

`fitYes` / `fitNo` — neschimbate din copy-ul existent.

### Întrebări — toate cele 7

Cele 3 existente în EN + cele 4 portate din RO:

4. **"It's too expensive."** — Then we cut scope, not price. A Blueprint for a single feature costs less than one for the whole system. What we won't do is deliver the same thing cheaper — that would mean the original price was invented.
5. **"Can you start next week?"** — Usually not. We run one project at a time, so we don't do to you what firms juggling five at once do to their clients. You get the real date we can start — and if it doesn't work for you, you hear it in the first call.
6. **"Can you quote by email, without a call?"** — No. A price given without understanding what we are building is an invented number, and we would both find that out three months in. Thirty minutes is enough to give you a range we can stand behind.
7. **"What does a Blueprint NOT do?"** — It doesn't write production code and it doesn't ship your system. It is the document the system comes from. And it doesn't guarantee the project is worth building — if the analysis says it isn't, we tell you. That is the best €450 you can spend.

### CTA final

> ## Thirty minutes, and you leave with a number.
> **[Start with a Blueprint]**

---

## 4. `/lab`

Copy-ul EN existent supraviețuiește aproape intact — era cea mai bine scrisă pagină. Modificări: fără `noindex`, legată din navigație, lede-ul strâns cu o propoziție.

Structura per proiect: nume + etichetă de stadiu (adevărată, obligatoriu) → teza → Problema / Teza / Unde e / Ce urmează → nota de date (Declutter: GDPR art. 9) sau nota juridică (GigTim: forma legală a muncii scurte).

**Cererile, în ordinea asta, exclusiv aici:**
1. Principal, cu buton: **Looking for 3–5 psychotherapists** — to get their hands on the Declutter prototype and tell me where I am wrong. No money, not much time — one hour, once. **[Write to me]**
2. Secundar, text: colaboratori plătiți (design de produs, mobile).
3. Terțiar, o propoziție, fără buton: For investment conversations: [email].

---

## 5. `/contact`

Stânga — formular: Name · Company · Email · What you want to build („Two or three sentences are enough.") · Rough budget (opțional) · **[Send]**.
Formularul postează la `PUBLIC_FORM_ENDPOINT`; fără variabilă setată la build, în locul lui apare adresa de email. Niciodată `action="#"`.

Dreapta — **How working with us goes** (moștenit din fosta /cum-lucram, o linie fiecare):

> - **Communication** — one channel, and a written update every Friday. If we slip, you hear it the day it happens.
> - **Code and accounts** — the repository is on your account from day one. Servers and domains in your name, not ours.
> - **Payment** — in phases, never all at the end and never all up front.
> - **If we are late** — a deadline moves once, in writing, with the reason. A second slip means the extra cost is ours.

Apoi, ca secțiune proprie, răspunsul la **"How many of you are there?"** — textul canonic din `docs/voice.md`, neatins.

> We reply the same working day.

---

## 6. `/privacy`

Scrisă, nu copiată. Adevărul simplu: site-ul nu setează cookie-uri și nu rulează analytics; singurele date personale sunt cele trimise prin formular (nume, firmă, email, mesaj), folosite doar ca să răspundem; nu există banner de cookie-uri pentru că nu există cookie-uri. Operator: EUDAIMONIA AI TECH S.R.L. Angajamentele Declutter (art. 9) rămân pe `/lab`, unde sunt argument, nu boilerplate.

**De revizuit de utilizator înainte de publicare.**

---

## 7. Subsolul

- Denumirea juridică · CUI · nr. ONRC · sediu — **obligatoriu legal, de completat de utilizator**
- „Maquette is the trading name of EUDAIMONIA AI TECH S.R.L."
- Privacy · ANPC · ODR
- Fără: „© Toate drepturile rezervate. Made with ❤️".

---

## 8. Ce trebuie să existe înainte de lansare

- [ ] Datele SRL-ului pentru subsol (ONRC, sediu)
- [ ] `PUBLIC_FORM_ENDPOINT` setat (Formspree/Resend) — altfel se afișează emailul
- [ ] `/privacy` revizuită de utilizator
- [ ] Email pe domeniu
- [ ] Etichetele de stadiu din `/lab` verificate încă o dată față de realitate
