# Maquette — Arhitectura site-ului și textele

> Document intern. Structura fiecărei pagini + textele finale.
> Scris după regulile din `docs/voice.md`. Ofertele din `docs/positioning.md`. Vizualul din `docs/brand.md`.

---

## 1. Structura

Site bilingv, `/ro/…` și `/en/…`, cu `hreflang` reciproc pe fiecare pagină. Româna e limba implicită.

**Navigație — cinci intrări, nu mai multe:**

| RO | EN | Rol |
|---|---|---|
| Blueprint | Blueprint | Produsul de intrare. Merită loc în navigație, e cel mai important lucru de pe site. |
| Servicii | Services | Ce construim după machetă. |
| Lucrări | Work | Dovada. |
| Lab | Lab | Produsele proprii. |
| Contact | Contact | — |

**În subsol, nu în navigație:** Cum lucrăm · Politica de confidențialitate · Datele firmei · ANPC / SOL · LinkedIn.

Butonul roșu din bara de sus: **„Începe cu un Blueprint" / "Start with a Blueprint"**. Singurul buton roșu de pe ecran, mereu.

**Nu există:** pagină „Echipa", pagină „Tehnologii", blog (până nu ai ce scrie), pagină de AR.

---

## 2. Homepage

### Secțiunea 1 — Hero
> `STUDIO DE SOFTWARE` *(etichetă mono roșie)*
>
> # Întâi macheta. Apoi sistemul.
>
> *First the model. Then the system.* *(serif italic — singurul loc de pe site)*
>
> Transformăm idei neclare în sisteme care funcționează. Începem cu macheta — specificație, arhitectură și un prototip clicabil, la preț fix. Apoi construim.
>
> `├─────── 5 ZILE LUCRĂTOARE ───────┤` *(linie de cotă — momentul cotat nr. 1)*
>
> **[Începe cu un Blueprint]**  [Cum lucrăm]

**EN**
> `SOFTWARE STUDIO`
> # First the model. Then the system.
> We turn unclear ideas into working systems. We start with the model — spec, architecture and a clickable prototype, at a fixed price. Then we build.
> `├─────── 5 WORKING DAYS ───────┤`
> **[Start with a Blueprint]**  [How we work]

### Secțiunea 2 — Teza
Un singur paragraf, tipografie mare, fără card. Ăsta e argumentul care vinde Blueprint-ul.

> ## Proiectele software nu eșuează la programare.
> Eșuează la început, când nimeni nu a scris clar ce trebuie construit. Se pleacă de la o discuție și o estimare aproximativă, iar peste trei luni ies la iveală lucrurile care nu fuseseră spuse. De asta primul lucru pe care îl vindem nu e cod.

**EN**
> ## Software projects don't fail in the coding.
> They fail at the start, when nobody has written down clearly what needs to exist. It begins with a conversation and a rough estimate, and three months later the unspoken assumptions surface. That's why the first thing we sell isn't code.

### Secțiunea 3 — Cum decurge
Trei pași, numerotați. **Numerotarea e legitimă aici** — chiar e o secvență, nu decor.

| | RO | EN |
|---|---|---|
| 01 | **Macheta** — 5 zile. Ideea devine specificație, arhitectură, prototip și un cost real. | **The model** — 5 days. The idea becomes a spec, an architecture, a prototype and a real number. |
| 02 | **Construcția** — pe faze, cu un termen pe care îl poți verifica săptămânal. | **The build** — in phases, with a deadline you can check every week. |
| 03 | **Mentenanța** — monitorizare, ajustări, un raport lunar. Nu dispărem după lansare. | **Upkeep** — monitoring, adjustments, a monthly report. We don't disappear at launch. |

### Secțiunea 4 — Cele trei servicii
Trei coli pe masă. Fiecare: etichetă mono, titlu, o propoziție, linie de preț. Doar Blueprint are cifră.

### Secțiunea 5 — Lucrări
Două studii de caz, format scurt: ce era problema → ce am construit → ce s-a schimbat. Link către `/lucrari`.

> ⚠️ **Secțiunea nu se publică goală.** Dacă la lansare nu există niciun studiu de caz cu acord de publicare, se scoate din homepage complet. Un „portofoliu în curând" e mai rău decât lipsa lui.

### Secțiunea 6 — Lab
O propoziție, fără cerere, fără CTA roșu:
> Construim și produse proprii. Acum lucrăm la **Declutter**. → *Vezi ce e în lucru*

Rolul ei pe homepage e strict de dovadă de capacitate. Cererile stau în `/lab`.

### Secțiunea 7 — Contact
> ## Ai o idee care încă nu are formă?
> Treizeci de minute, fără obligații. Pleci cu un interval de preț real, chiar dacă nu lucrăm împreună.
>
> **[Începe cu un Blueprint]**

---

## 3. `/blueprint` — cea mai importantă pagină de pe site

Aici se face vânzarea. Homepage-ul doar trimite aici.

### Hero
> `PREȚ FIX · 5 ZILE LUCRĂTOARE`
> # Plătești puțin ca să afli exact ce urmează să coste.
> Blueprint-ul e macheta proiectului tău: specificație, arhitectură, prototip clicabil și un cost real. Îl faci înainte să te angajezi la ceva mare.

**EN**
> `FIXED PRICE · 5 WORKING DAYS`
> # Pay a little to find out exactly what it will cost.

### Ce primești — cinci livrabile
1. **Specificație funcțională** — ce face sistemul, pentru cine, în ce ordine. Scrisă pe limba ta, nu în jargon.
2. **Arhitectură tehnică** — ce componente, ce tehnologii, ce se integrează cu ce.
3. **Prototip clicabil** — nu o poză. Îl parcurgi și îl arăți echipei tale.
4. **Estimare pe faze** — cu interval, nu cu un singur număr. Un singur număr e mereu o minciună.
5. **Plan de execuție și riscuri** — ce se poate strica și ce facem dacă se strică.

### Cum decurg cele cinci zile
| | |
|---|---|
| Ziua 1 | Discuție lungă. Îți pun întrebările incomode acum, nu peste trei luni. |
| Ziua 2–3 | Scriu specificația și arhitectura. Primești o versiune intermediară și o corectezi. |
| Ziua 4 | Prototipul. |
| Ziua 5 | Estimarea, planul, riscurile. Le parcurgem împreună, punct cu punct. |

### Prețul
> `├──────── 450 € ────────┤` *(momentul cotat nr. 2)*
>
> **Se scade integral din proiectul de construcție**, dacă acesta începe în 60 de zile. Dacă mergem mai departe împreună, Blueprint-ul nu te-a costat nimic.

### Blocul cu hașură — cel care închide vânzarea
> **Dacă alegi să nu construiești cu noi, documentul rămâne al tău.**
> Îl poți duce la echipa ta internă sau la altă firmă. Îl vindem așa pentru că un client care se simte prins nu e un client bun — nici pentru el, nici pentru noi.

### Întrebări
Trei, luate cuvânt cu cuvânt din `docs/voice.md`:
- „De ce să plătesc pentru un Blueprint? Alții îmi dau ofertă gratis."
- „De ce nu construiți voi tot?"
- „Ce se întâmplă dacă dispăreți?"

---

## 4. `/servicii`

Hero scurt, apoi cele două servicii de construcție, fiecare cu: ce e, pentru cine, ce primești, cum se măsoară rezultatul. Fără preț — „Estimare fermă după o discuție de 30 de minute".

**La final, linia de acoperire** — o singură propoziție, fără titlu, fără card:
> Lucrăm și pe zone mai specializate — configuratoare de produs, vizualizare 3D și AR, integrări cu echipamente. Dacă ai ceva neobișnuit, întreabă.

**EN**
> We also work on more specialised things — product configurators, 3D and AR visualisation, hardware integrations. If you have something unusual, ask.

---

## 5. `/lucrari`

Un studiu de caz per pagină. Structură fixă:
`Problema` → `Ce am construit` → `Ce s-a schimbat` → `Cât a durat` → `Ce am folosit`

**Regula fără excepții:** nimic nu se publică fără acord scris de la client. Fără acord — se anonimizează („organizație de formare profesională, ~400 de cursanți") și se scot logo, nume și capturi identificabile.

---

## 6. `/lab` — nu se publică fără discuție

### Ce e Lab-ul
> ## Construim și pentru noi.
> Lab-ul e locul unde ținem produsele proprii. Nu e un proiect secundar — e felul în care testăm pe pielea noastră ce le cerem clienților să facă: să înceapă cu macheta, să livreze pe faze, să măsoare.

**EN**
> ## We build for ourselves too.
> The Lab is where our own products live. It isn't a side project — it's how we test on ourselves what we ask clients to do: start with the model, ship in phases, measure.

### Declutter

> `PROTOTIP · ACTUALIZAT AUGUST 2026` *(etichetă mono — stadiul e obligatoriu și trebuie să fie adevărat)*
>
> ## Declutter
> ### Gândurile pe care vrei să le spui la terapie, și pe care le uiți până ajungi acolo.
>
> **Problema.** Între două ședințe trec două săptămâni. În timpul ăsta îți trec prin cap exact lucrurile despre care ai vrea să vorbești — de obicei în autobuz, la trei dimineața, sau în mijlocul unei certuri. Când ajungi în cabinet, nu mai ții minte niciunul. Rămâi cu „nu știu, a fost o săptămână ok".
>
> **Teza.** Un gând nu trebuie arhivat, trebuie să se întoarcă atunci când contează. Declutter îl notezi în trei secunde și ți-l dă înapoi înainte de ședință, grupat, nu ca o listă de 40 de notițe.
>
> **Unde e acum.** Prototip funcțional pe capturare și grupare. Reluarea înainte de ședință e în lucru.
>
> **Ce urmează.** Testare cu psihoterapeuți reali, pe pacienți reali, înainte de orice funcție nouă.

**Blocul de date — nu e mărunțiș juridic, e argumentul de vânzare către terapeuți:**
> **Ce notezi acolo sunt date privind sănătatea.** Le tratăm ca atare: criptate, stocate în Uniunea Europeană, fără instrumente de urmărire pentru publicitate, și niciun model nu e antrenat pe conținutul tău. Un terapeut nu te întreabă ce funcții ai — te întreabă unde stau datele pacienților lui.

### Cererea — în ordinea asta, cu greutățile astea

**Principal, cu buton:**
> **Caut 3–5 psihoterapeuți** care să pună mâna pe prototip și să-mi spună unde greșesc. Nu cer bani și nu cer timp mult — o oră, o dată.
> **[Scrie-mi]**

**Secundar, text simplu:**
> Dacă lucrezi în design de produs sau mobile și subiectul ți se pare interesant, scrie-mi. Colaborăm punctual, plătit.

**Terțiar, o singură propoziție, fără buton, la final:**
> Pentru discuții de investiție: [email].

> 📌 **De ce ordinea asta.** Terapeuții sunt simultan validarea produsului și canalul de distribuție — un terapeut cu 30 de pacienți e 30 de utilizatori. O cerere de testare sună a tracțiune. O cerere de investiție pusă în față sună a nevoie de bani, iar un client de servicii care o citește se întreabă dacă mai ești acolo peste șase luni.

---

## 7. `/cum-lucram`

Pagina care înlocuiește „Echipa". Conține: procesul pe faze, ce primești la fiecare pas, cum comunicăm și cât de des, ce se întâmplă dacă întârziem, ce se întâmplă cu codul și cu accesele, garanții.

Aici stă și răspunsul la „câți sunteți?", nu ascuns, ci ca secțiune proprie — din `docs/voice.md`.

---

## 8. `/contact`

Formular scurt: nume · firmă · ce vrei să construiești (text liber) · buget aproximativ (interval, opțional) · email.

Sub formular:
> Răspund în aceeași zi lucrătoare. Dacă preferi să vorbim direct: [telefon].

**Fără:** hartă, ore de program inventate, chat live, „echipa noastră îți va răspunde în 24-48h".

---

## 9. Subsolul

- Denumirea juridică a SRL-ului · CUI · nr. înregistrare ONRC · sediu — **obligatoriu legal**
- Politica de confidențialitate (GDPR) · Politica de cookie-uri
- ANPC și SOL — linkuri obligatorii
- „Maquette e numele comercial al [denumire SRL]."
- Fără: „© 2026 Toate drepturile rezervate. Made with ❤️".

---

## 10. Ce trebuie să existe înainte de lansare

- [ ] Cel puțin un studiu de caz cu acord scris — altfel secțiunea „Lucrări" se scoate
- [ ] Datele SRL-ului pentru subsol
- [ ] Politica de confidențialitate scrisă, nu copiată
- [ ] Email pe domeniu
- [ ] `/lab` — **discutat și aprobat separat înainte de publicare**
- [ ] Toate cele 5 momente cotate numărate: hero, prețul Blueprint, +max 2
