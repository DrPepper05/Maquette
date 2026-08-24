export const langs = ['ro', 'en'] as const;
export type Lang = (typeof langs)[number];

/** Perechea de rute pentru hreflang și pentru comutatorul de limbă. */
export const routes = {
  home:      { ro: '/ro/',              en: '/en/' },
  blueprint: { ro: '/ro/blueprint',     en: '/en/blueprint' },
  services:  { ro: '/ro/servicii',      en: '/en/services' },
  how:       { ro: '/ro/cum-lucram',    en: '/en/how-we-work' },
  contact:   { ro: '/ro/contact',       en: '/en/contact' },
  lab:       { ro: '/ro/lab',           en: '/en/lab' },
} as const;
export type RouteKey = keyof typeof routes;

export const copy = {
  ro: {
    htmlLang: 'ro',
    switchTo: 'EN',
    nav: [
      ['blueprint', 'Blueprint'],
      ['services', 'Servicii'],
      ['how', 'Cum lucrăm'],
      ['contact', 'Contact'],
    ] as [RouteKey, string][],
    cta: 'Începe cu un Blueprint',
    ctaGhost: 'Cum lucrăm',

    home: {
      title: 'Maquette — studio de software',
      desc: 'Transformăm idei neclare în sisteme care funcționează. Începem cu macheta: specificație, arhitectură și prototip, la preț fix. Apoi construim.',
      eyebrow: 'Studio de software',
      h1: 'Întâi macheta. Apoi sistemul.',
      tagline: 'First the model. Then the system.',
      lede: 'Construim aplicații, site-uri și automatizări pentru firme care au depășit Excel-ul și grupurile de WhatsApp, dar nu au încă un departament IT. Începem cu macheta, nu cu codul.',
      dim: '5 zile lucrătoare',

      /* Secțiunea 3 — mecanismul. Fără cifră: 450 pe homepage ancorează
         tot studioul la cea mai mică sumă pe care o ai. */
      mechLabel: 'Cum începe',
      mechH: 'Cinci zile, preț fix, și afli exact ce urmează să coste.',
      mechP: 'Blueprint-ul e macheta proiectului tău: specificație, arhitectură, un prototip clicabil și o estimare pe faze. Îl faci înainte să te angajezi la ceva mare.',
      mechPoints: [
        ['Preț fix', 'Știi cifra dinainte, nu după.'],
        ['Se scade integral', 'Din proiectul de construcție, dacă începe în 60 de zile.'],
        ['Documentul rămâne al tău', 'Chiar dacă alegi să nu construiești cu noi.'],
      ] as [string, string][],
      mechCta: 'Vezi ce conține',

      /* Secțiunea 7 — o singură obiecție, cea care blochează semnătura,
         plasată exact înainte de CTA. Restul stau pe /blueprint. */
      objLabel: 'Întrebarea pe care o pune toată lumea',
      thesisLabel: 'Teza',
      thesisH: 'Proiectele software nu eșuează la programare.',
      thesisP: 'Eșuează la început, când nimeni nu a scris clar ce trebuie construit. Se pleacă de la o discuție și o estimare aproximativă, iar peste trei luni ies la iveală lucrurile care nu fuseseră spuse. De asta primul lucru pe care îl vindem nu e cod.',

      howLabel: 'Cum decurge',
      howAside: 'Trei faze',
      steps: [
        ['01', 'Macheta', 'Cinci zile. Ideea devine specificație, arhitectură, prototip și un cost real.'],
        ['02', 'Construcția', 'Pe faze, cu un termen pe care îl poți verifica săptămânal.'],
        ['03', 'Mentenanța', 'Monitorizare, ajustări, un raport lunar. Nu dispărem după lansare.'],
      ],

      diagH: 'Așa arată o firmă înainte și după.',
      diagP: 'Nu e un caz de client — e felul în care ne uităm la un flux. Stânga: comenzile, stocul și facturile trec toate prin același om. Dreapta: aceeași firmă, legată. Diferența e măsurată în ore, nu în adjective.',
      proofLabel: 'Ce primești, concret',
      proofAside: 'Blueprint · exemplu real',
      proofH: 'Nu-ți cerem încredere. Îți arătăm livrabilul.',
      proofP: 'Ăsta e ce pleacă din mâna noastră după cinci zile. Nu un raport de zece pagini pe care nu-l citește nimeni — patru documente pe care le poți duce oriunde.',
      proofDocs: [
        ['01', 'Specificație funcțională', 'Ce face sistemul, pentru cine, în ce ordine.', ['Actori și roluri', 'Fluxuri principale, pas cu pas', 'Reguli de business, scrise explicit', 'Ce NU face sistemul în prima versiune']],
        ['02', 'Arhitectură tehnică', 'Ce componente, ce se integrează cu ce.', ['Diagrama componentelor', 'Ce tehnologii și de ce', 'Integrări cu sistemele existente', 'Unde stau datele']],
        ['03', 'Estimare pe faze', 'Cu interval, nu cu un singur număr.', ['Fazele, în ordinea livrării', 'Interval de cost per fază', 'Ce se poate tăia dacă bugetul e strâns', 'Ce se plătește când']],
        ['04', 'Riscuri', 'Ce se poate strica și ce facem atunci.', ['Riscurile ordonate după impact', 'Semnalul de alarmă pentru fiecare', 'Planul B, scris dinainte']],
      ] as [string, string, string, string[]][],
      proofNote: 'Documentul rămâne al tău chiar dacă nu construim împreună.',
      servLabel: 'Ce facem',
      servAside: 'Trei servicii',
      services: [
        ['01 · Preț fix', 'Blueprint', 'Specificație, arhitectură, prototip clicabil și un cost real. În cinci zile.', 'Cinci zile, preț fix', ''],
        ['02 · Pe proiect', 'Aplicații și site-uri', 'Aplicații web, site-uri și cataloage, panouri de administrare, zone de client.', 'De obicei', '1.200 – 2.000 €'],
        ['03 · Cu abonament', 'Automatizări', 'Legăm sistemele care azi nu vorbesc între ele. Vândute în ore economisite.', 'De obicei', '800 – 1.500 €'],
      ],

      labLine: 'Construim și produse proprii. Acum lucrăm la Declutter și GigTim.',
      labLink: 'Vezi ce e în lucru',

      endH: 'Treizeci de minute, și pleci cu o cifră.',
      endP: 'Fără obligații și fără prezentare de vânzări. Îmi spui ce te doare, îți spun cât ar costa și cât ar dura — chiar dacă nu lucrăm împreună.',
    },

    /* ═══ SALA — inventarul lucrărilor expuse ═══
       Regulă: câmpul `kind` are exact trei valori. `delivered` nu se pune
       pe nicio placă până nu există acord scris de publicare de la client. */
    gallery: {
      label: 'Livrabilul',


      keyLabel: 'Cheia etichetelor',
      key: [
        ['Livrabil · exemplu', '', 'Un exemplu din ce primește clientul, construit din livrabilul real.'],
        ['Demonstrație de capabilitate', '', 'Construit de noi, ca să arătăm ce știm să facem.'],
        ['Proiect livrat', 'Nicio lucrare din sală nu poartă încă eticheta asta.', 'O va purta prima pe care o publicăm cu acord scris de la client.'],
      ] as [string, string, string][],

      kinds: {
        deliverable: 'Livrabil · exemplu',
        demo: 'Demonstrație de capabilitate',
        delivered: 'Proiect livrat',
      },

      plates: {
        doc:    { title: 'Blueprint — specificație funcțională', tech: 'Document, 24 p. · 2026' },
        report: { title: 'Raport lunar de automatizare',        tech: 'HTML, date simulate · 2026' },
        flow:   { title: 'Înainte / După — fluxul comenzilor',   tech: 'SVG scris de mână · 2026' },
      },

      screens: {
        doc: {
          bar: 'Blueprint · specificație funcțională',
          page: 'p. 7 / 24',
          sec: '3.2 — Fluxul comenzii',
          h: 'De la cerere de ofertă la comandă confirmată',
          steps: [
            ['Clientul trimite cererea', 'prin formular sau email.', 'client'],
            ['Sistemul verifică stocul', 'pentru fiecare poziție și marchează ce lipsește.', 'automat'],
            ['Comercialul completează', 'termenul de livrare pentru pozițiile lipsă.', 'comercial'],
            ['Oferta pleacă', 'ca PDF, cu valabilitate 14 zile.', 'automat'],
            ['La acceptare', 'se creează comanda în ERP și se rezervă stocul.', 'automat'],
          ] as [string, string, string][],
          outT: 'Ce NU face versiunea 1',
          out: [
            'Nu calculează discounturi pe volum — se pun manual',
            'Nu emite factura; doar pregătește datele pentru ea',
            'Nu are aplicație de mobil',
          ],
        },
        report: {
          bar: 'Automatizări', month: 'Iulie 2026',
          big: '38', unit: 'ore economisite', delta: '+6 h față de iunie',
          axisA: 'Dec', axisB: 'Iul',
          thRun: 'Rulare', thDur: 'Durată',
          rows: [
            ['Sincronizare stoc', '2,4 s', true],
            ['Ofertă #4182', '1,1 s', true],
            ['Import furnizor', 'eroare', false],
            ['Raport zilnic', '0,8 s', true],
          ] as [string, string, boolean][],
        },
        flow: {
          bar: 'Diagnostic · fluxul comenzilor', side: 'Înainte / După',
          before: 'ÎNAINTE', after: 'DUPĂ',
          orders: 'COMENZI', erp: 'ERP', stockBad: 'EXCEL STOC', stock: 'STOC',
          quotes: 'OFERTE', invoices: 'FACTURI', bus: 'MAGISTRALĂ', decide: 'DECIDE',
          person: '1 PERSOANĂ', personSub: 'copiază tot',
          eManual: 'copiat manual', eRetyped: 'reintrodus', eAuto: 'automat',
          sumBefore: '≈ 12 H / SĂPT.', sumBeforeSub: 'pierdute pe reintroducere',
          sumAfter: '≈ 2 H / SĂPT.', sumAfterSub: 'doar deciziile',
          hint: '← trage lateral',
        },
      },
    },

    blueprint: {
      title: 'Blueprint — Maquette',
      desc: 'Cinci zile, preț fix. Specificație, arhitectură, prototip clicabil și un cost real. Se scade integral din proiectul de construcție.',
      eyebrow: 'Preț fix · 5 zile lucrătoare',
      h1: 'Plătești puțin ca să afli exact ce urmează să coste.',
      lede: 'Blueprint-ul e macheta proiectului tău: specificație, arhitectură, prototip clicabil și un cost real. Îl faci înainte să te angajezi la ceva mare.',

      getLabel: 'Ce primești',
      getAside: 'Cinci livrabile',
      deliverables: [
        ['Specificație funcțională', 'Ce face sistemul, pentru cine, în ce ordine. Scrisă pe limba ta, nu în jargon.'],
        ['Arhitectură tehnică', 'Ce componente, ce tehnologii, ce se integrează cu ce.'],
        ['Prototip clicabil', 'Nu o poză. Îl parcurgi și îl arăți echipei tale.'],
        ['Estimare pe faze', 'Cu interval, nu cu un singur număr. Un singur număr e mereu o minciună.'],
        ['Plan de execuție și riscuri', 'Ce se poate strica și ce facem dacă se strică.'],
      ],

      daysLabel: 'Cele cinci zile',
      days: [
        ['Ziua 1', 'Discuție lungă. Îți pun întrebările incomode acum, nu peste trei luni.'],
        ['Ziua 2–3', 'Scriu specificația și arhitectura. Primești o versiune intermediară și o corectezi.'],
        ['Ziua 4', 'Prototipul.'],
        ['Ziua 5', 'Estimarea, planul, riscurile. Le parcurgem împreună, punct cu punct.'],
      ],

      priceLabel: 'Prețul',
      priceDim: '450 €',
      priceP: 'Se scade integral din proiectul de construcție, dacă acesta începe în 60 de zile. Dacă mergem mai departe împreună, Blueprint-ul nu te-a costat nimic.',

      keepH: 'Dacă alegi să nu construiești cu noi, documentul rămâne al tău.',
      keepP: 'Îl poți duce la echipa ta internă sau la altă firmă. Îl vindem așa pentru că un client care se simte prins nu e un client bun — nici pentru el, nici pentru noi.',

      factsLabel: 'Pe scurt',
      facts: [
        ['Angajament', '5 zile lucrătoare'],
        ['Preț', '450 €'],
        ['Cine lucrează', 'Un singur om, de la început la final'],
        ['Rezultat', 'Specificație, arhitectură, prototip, cifră'],
      ] as [string, string][],

      fitLabel: 'Pentru cine e și pentru cine nu e',
      fitYes: ['Ai o idee care încă nu are formă și vrei să afli ce costă înainte să te angajezi.', 'Ai primit oferte care diferă de trei ori între ele și nu știi pe care s-o crezi.', 'Ai un sistem care merge, dar nu știi ce trebuie schimbat ca să scaleze.'],
      fitNo: ['Vrei un preț pe email, fără discuție. Nu pot da o cifră reală fără să înțeleg ce construiesc.', 'Vrei plata integral la final. Lucrăm pe faze, în ambele sensuri.', 'Ai deja patru furnizori pe același proiect. Nu intru al cincilea.'],

      qLabel: 'Întrebări',
      questions: [
        ['De ce să plătesc pentru un Blueprint? Alții îmi dau ofertă gratis.', 'Și noi îți dăm o estimare gratis, după o discuție de 30 de minute. Diferența e ce primești pe bani: oferta gratis e un număr pe care nimeni nu-l poate garanta, pentru că nimeni nu a analizat nimic. Blueprint-ul e documentul din care iese numărul — și rămâne al tău.'],
        ['De ce nu construiți voi tot?', 'Construim, și în majoritatea cazurilor asta se și întâmplă. Dar Blueprint-ul nu te obligă. E documentul tău: îl poți duce la echipa ta internă sau la altă firmă.'],
        ['Ce se întâmplă dacă dispăreți?', 'Codul stă în repository-ul tău, pe contul tău, de la prima zi. Documentația de instalare și rulare face parte din livrare. Și nu folosim nimic exotic — orice dezvoltator obișnuit poate prelua proiectul.'],
        ['E prea scump.', 'Atunci tăiem din scop, nu din preț. Un Blueprint pe o singură funcție costă mai puțin decât unul pe tot sistemul. Ce nu fac e să livrez același lucru mai ieftin — asta ar însemna că prețul inițial era inventat.'],
        ['Puteți începe săptămâna viitoare?', 'De obicei nu. Am un singur proiect în lucru la un moment dat, ca să nu îți fac ție ce fac firmele care iau cinci deodată. Îți spun data reală la care pot începe, iar dacă nu îți convine, îți spun asta din prima discuție.'],
        ['Îmi dați un preț pe email, fără discuție?', 'Nu. Un preț dat fără să știu ce construiesc e un număr inventat, iar amândoi l-am descoperi peste trei luni. Treizeci de minute sunt suficiente ca să îți dau un interval pe care îl pot susține.'],
        ['Ce NU face un Blueprint?', 'Nu scrie cod de producție și nu îți livrează sistemul. E documentul din care iese sistemul. Și nu garantează că proiectul merită făcut — dacă din analiză iese că nu, îți spun, și ăsta e cel mai bun 450 € pe care l-ai cheltuit.'],
      ],
    },

    services: {
      title: 'Servicii — Maquette',
      desc: 'Aplicații web, site-uri și automatizări pentru firme care au depășit Excel-ul și WhatsApp-ul.',
      eyebrow: 'După machetă',
      h1: 'Ce construim.',
      lede: 'Lucrăm cu firme care au depășit faza de Excel și WhatsApp, dar nu au încă un departament IT. Un preț. Un termen. Un om responsabil, de la început până la final.',
      items: [
        {
          label: 'Pe proiect',
          h: 'Aplicații și site-uri',
          p: 'Site de prezentare sau catalog, aplicații web, zone de client, panouri de administrare. Bilingv, cu CMS ca să poți edita singur, SEO tehnic și performanță reală.',
          list: ['Catalog căutabil, cu filtrare', 'Panou de administrare pe măsura fluxului tău', 'Integrare cu sistemele pe care le ai deja', 'Performanță sub o secundă pe telefon'],
          price: 'Un catalog căutabil cu panou de administrare, la o firmă de ~50 de angajați: de obicei între 1.200 și 2.000 €. Cifra fermă vine după o discuție de 30 de minute.',
        },
        {
          label: 'Cu abonament',
          h: 'Automatizări',
          p: 'Legăm sistemele care azi nu vorbesc între ele: ERP, site, email, foi de calcul. Generare automată de oferte și facturi, notificări, sincronizare de stocuri, raportare care se face singură.',
          list: ['Ofertele pleacă în minute, nu în ore', 'Stocuri sincronizate, fără dublă introducere', 'Rapoarte lunare fără intervenție', 'Mentenanță și monitorizare incluse în abonament'],
          price: 'Legarea ERP-ului cu site-ul și generarea automată a ofertelor: de obicei între 800 și 1.500 €, plus 80 €/lună mentenanță și monitorizare. Cifra fermă vine după o discuție de 30 de minute.',
        },
      ],
      howSold: 'Cum se măsoară',
      howSoldP: 'Nu vindem funcții, vindem ore economisite. Punem cifrele tale pe hârtie înainte să începem — dacă nu iese, îți spunem că nu merită.',
      catchAll: 'Lucrăm și pe zone mai specializate — configuratoare de produs, vizualizare 3D și AR, integrări cu echipamente. Dacă ai ceva neobișnuit, întreabă.',
    },


    how: {
      title: 'Cum lucrăm — Maquette',
      desc: 'Procesul, termenele, comunicarea, ce se întâmplă cu codul și cu accesele.',
      eyebrow: 'Procesul',
      h1: 'Cum lucrăm.',
      lede: 'Fără surprize e mai important decât fără greșeli. Aici scrie exact ce se întâmplă, în ce ordine, și ce faci dacă nu se întâmplă.',
      blocks: [
        ['Comunicarea', 'Un canal, nu cinci. O actualizare scrisă în fiecare vineri, cu ce s-a făcut, ce urmează și ce te blochează pe tine. Dacă întârziem, afli în ziua în care se întâmplă, nu la termen.'],
        ['Codul și accesele', 'Repository-ul e pe contul tău de la prima zi. Serverele, domeniile și conturile sunt pe numele firmei tale, nu pe al nostru. Nu te legăm de noi prin dependență.'],
        ['Plata', 'Pe faze, niciodată integral la final și niciodată integral în avans. Fiecare fază are un livrabil pe care îl poți verifica înainte să plătești următoarea.'],
        ['Dacă întârziem', 'Termenul se renegociază o singură dată, în scris, cu motivul. A doua întârziere înseamnă că am estimat prost — și atunci costul suplimentar e al nostru, nu al tău.'],
      ],
      sizeH: 'Câți sunteți?',
      sizeP: 'Suntem un studio mic, intenționat. Lucrez direct cu tine pe proiect — nu treci prin trei straturi de account manageri și nimic nu se pierde pe drum. Pentru părțile specializate aducem colaboratori. Ce contează pentru tine e că ai un singur om responsabil de la început până la final, și un plan cu termene pe care îl poți verifica săptămânal.',
    },

    contact: {
      title: 'Contact — Maquette',
      desc: 'Treizeci de minute, fără obligații.',
      eyebrow: 'Contact',
      h1: 'Treizeci de minute, fără obligații.',
      lede: 'Pleci cu un interval de preț real, chiar dacă nu lucrăm împreună.',
      fName: 'Nume', fCompany: 'Firma', fEmail: 'Email',
      fWhat: 'Ce vrei să construiești', fWhatHint: 'Două-trei fraze sunt suficiente.',
      fBudget: 'Buget aproximativ', fBudgetHint: 'Opțional. Un interval, nu o cifră.',
      fSend: 'Trimite',
      after: 'Răspund în aceeași zi lucrătoare.',
    },

    lab: {
      title: 'Lab — Maquette',
      desc: 'Produsele proprii, în lucru.',
      eyebrow: 'Produse proprii',
      h1: 'Construim și pentru noi.',
      lede: 'Lab-ul e locul unde ținem produsele proprii. Nu e un proiect secundar — e felul în care testăm pe pielea noastră ce le cerem clienților să facă: să înceapă cu macheta, să livreze pe faze, să măsoare.',
      projLabel: 'În lucru acum',

      projects: [
        {
          name: 'Declutter',
          stage: 'Prototip · actualizat august 2026',
          h: 'Gândurile pe care vrei să le spui la terapie, și pe care le uiți până ajungi acolo.',
          blocks: [
            ['Problema', 'Între două ședințe trec două săptămâni. În timpul ăsta îți trec prin cap exact lucrurile despre care ai vrea să vorbești — de obicei în autobuz, la trei dimineața, sau în mijlocul unei certuri. Când ajungi în cabinet, nu mai ții minte niciunul. Rămâi cu „nu știu, a fost o săptămână ok".'],
            ['Teza', 'Un gând nu trebuie arhivat, trebuie să se întoarcă atunci când contează. Îl notezi în trei secunde și îți vine înapoi înainte de ședință, grupat — nu ca o listă de patruzeci de notițe.'],
            ['Unde e acum', 'Prototip funcțional pe capturare și grupare. Reluarea înainte de ședință e în lucru.'],
            ['Ce urmează', 'Testare cu psihoterapeuți reali, pe pacienți reali, înainte de orice funcție nouă.'],
          ] as [string, string][],
          noteH: 'Ce notezi acolo sunt date privind sănătatea.',
          noteP: 'Le tratăm ca atare: criptate, stocate în Uniunea Europeană, fără instrumente de urmărire pentru publicitate, și niciun model nu e antrenat pe conținutul tău. Un terapeut nu te întreabă ce funcții ai — te întreabă unde stau datele pacienților lui.',
        },
        {
          name: 'GigTim',
          stage: 'În conturare · trece prin propriul Blueprint',
          h: 'Joburi scurte pentru studenți. Firma pune anunțul, studentul îl ia.',
          blocks: [
            ['Problema', 'Un restaurant are nevoie de doi oameni sâmbătă seara. Un depozit are nevoie de patru, joi, pentru inventar. Îi caută pe grupuri de Facebook și prin cunoscuți, iar o parte nu se prezintă. De partea cealaltă, un student care are trei ore libere marți nu are unde să le vândă.'],
            ['Teza', 'Cererea și oferta există amândouă și se ratează una pe alta din lipsă de canal. Un anunț de trei rânduri, publicat în două minute, luat de cineva în cinci.'],
            ['Unde e acum', 'În conturare. Trece prin exact procesul pe care îl vindem: specificație, arhitectură și cifre înainte de prima linie de cod.'],
            ['Partea grea', 'Nu aplicația, ci primul oraș. Un marketplace fără densitate locală nu funcționează — un student intră, vede trei anunțuri și nu se mai întoarce. Deci întâi un singur campus și un singur cartier, nu o lansare națională.'],
          ] as [string, string][],
          noteH: 'Munca scurtă are o formă legală în România.',
          noteP: 'Zilier, PFA sau contract pe perioadă determinată — fiecare cu obligații diferite pentru firma care angajează. O platformă care intermediază muncă nu poate ocoli asta. De aceea forma juridică se decide în Blueprint, nu după lansare.',
        },
      ],

      askLabel: 'Cum poți ajuta',
      ask1H: 'Caut 3–5 psihoterapeuți',
      ask1P: 'care să pună mâna pe prototipul Declutter și să-mi spună unde greșesc. Nu cer bani și nu cer timp mult — o oră, o dată.',
      ask1Cta: 'Scrie-mi',
      ask2: 'Dacă lucrezi în design de produs sau mobile și vreunul dintre subiecte ți se pare interesant, scrie-mi. Colaborăm punctual, plătit.',
      ask3: 'Pentru discuții de investiție:',
    },

    footer: {
      legalName: 'EUDAIMONIA AI TECH S.R.L.',
      cui: 'CUI 52005701',
      onrc: 'J__/____/____',
      seat: 'Sediu: —',
      brandNote: 'Maquette este numele comercial al EUDAIMONIA AI TECH S.R.L.',
      privacy: 'Politica de confidențialitate',
      cookies: 'Politica de cookie-uri',
      how: 'Cum lucrăm',
      anpc: 'ANPC', sol: 'SOL',
    },
  },

  en: {
    htmlLang: 'en',
    switchTo: 'RO',
    nav: [
      ['blueprint', 'Blueprint'],
      ['services', 'Services'],
      ['how', 'How we work'],
      ['contact', 'Contact'],
    ] as [RouteKey, string][],
    cta: 'Start with a Blueprint',
    ctaGhost: 'How we work',

    home: {
      title: 'Maquette — software studio',
      desc: 'We turn unclear ideas into working systems. We start with the model: spec, architecture and a prototype, at a fixed price. Then we build.',
      eyebrow: 'Software studio',
      h1: 'First the model. Then the system.',
      tagline: 'Întâi macheta. Apoi sistemul.',
      lede: 'We build applications, websites and automations for companies that have outgrown spreadsheets and group chats but have no IT department yet. We start with the model, not the code.',
      dim: '5 working days',

      /* Section 3 — the mechanism. No figure: see the Romanian block. */
      mechLabel: 'How it starts',
      mechH: 'Five days, a fixed price, and you know exactly what comes next.',
      mechP: 'The Blueprint is the model of your project: a spec, an architecture, a clickable prototype and a phased estimate. You do it before committing to anything large.',
      mechPoints: [
        ['Fixed price', 'You know the figure up front, not after.'],
        ['Deducted in full', 'From the build project, if it starts within 60 days.'],
        ['The document stays yours', 'Even if you choose not to build with us.'],
      ] as [string, string][],
      mechCta: 'See what is in it',

      objLabel: 'The question everyone asks',
      thesisLabel: 'The thesis',
      thesisH: "Software projects don't fail in the coding.",
      thesisP: 'They fail at the start, when nobody has written down clearly what needs to exist. It begins with a conversation and a rough estimate, and three months later the unspoken assumptions surface. That is why the first thing we sell is not code.',

      howLabel: 'How it goes',
      howAside: 'Three phases',
      steps: [
        ['01', 'The model', 'Five days. The idea becomes a spec, an architecture, a prototype and a real number.'],
        ['02', 'The build', 'In phases, with a deadline you can check every week.'],
        ['03', 'Upkeep', "Monitoring, adjustments, a monthly report. We don't disappear at launch."],
      ],

      diagH: 'This is a company before and after.',
      diagP: 'Not a client case — it is how we look at a flow. Left: orders, stock and invoices all pass through the same person. Right: the same company, connected. The difference is measured in hours, not adjectives.',
      proofLabel: 'What you actually get',
      proofAside: 'Blueprint · real deliverable',
      proofH: "We don't ask for trust. We show you the deliverable.",
      proofP: "This is what leaves our hands after five days. Not a ten-page report nobody reads — four documents you can take anywhere.",
      proofDocs: [
        ['01', 'Functional spec', 'What the system does, for whom, in what order.', ['Actors and roles', 'Main flows, step by step', 'Business rules, written out', 'What the system does NOT do in v1']],
        ['02', 'Technical architecture', 'Which components, what integrates with what.', ['Component diagram', 'Which technologies and why', 'Integrations with what you already run', 'Where the data lives']],
        ['03', 'Phased estimate', 'A range, not a single number.', ['Phases, in delivery order', 'Cost range per phase', 'What can be cut if budget is tight', 'What gets paid when']],
        ['04', 'Risks', 'What can break, and what we do then.', ['Risks ordered by impact', 'The early warning for each', 'Plan B, written in advance']],
      ] as [string, string, string, string[]][],
      proofNote: 'The document stays yours even if we never build together.',
      servLabel: 'What we do',
      servAside: 'Three services',
      services: [
        ['01 · Fixed price', 'Blueprint', 'Spec, architecture, a clickable prototype and a real number. In five days.', 'Five days, fixed price', ''],
        ['02 · Per project', 'Apps and websites', 'Web applications, websites and catalogues, admin panels, client portals.', 'Typically', '€1,200 – 2,000'],
        ['03 · With upkeep', 'Automations', "We connect the systems that don't talk to each other today. Sold in hours saved.", 'Typically', '€800 – 1,500'],
      ],

      labLine: 'We build our own products too. Right now that means Declutter and GigTim.',
      labLink: 'See what is in progress',

      endH: "Have an idea that doesn't have a shape yet?",
      endP: 'No strings and no sales deck. You tell us what hurts, we tell you what it would cost and how long it would take — even if we never work together.',
    },

    /* ═══ THE HALL — see the Romanian block for the labelling rule ═══ */
    gallery: {
      label: 'The deliverable',


      keyLabel: 'Key to the labels',
      key: [
        ['Deliverable · sample', '', 'A sample of what the client receives, built from the real deliverable.'],
        ['Capability demonstration', '', 'Built by us, to show what we know how to do.'],
        ['Delivered project', 'No work in this hall carries that label yet.', 'The first one we publish with written client consent will.'],
      ] as [string, string, string][],

      kinds: {
        deliverable: 'Deliverable · sample',
        demo: 'Capability demonstration',
        delivered: 'Delivered project',
      },

      plates: {
        doc:    { title: 'Blueprint — functional specification', tech: 'Document, 24 pp. · 2026' },
        report: { title: 'Monthly automation report',            tech: 'HTML, simulated data · 2026' },
        flow:   { title: 'Before / After — the order flow',      tech: 'Hand-written SVG · 2026' },
      },

      screens: {
        doc: {
          bar: 'Blueprint · functional specification',
          page: 'p. 7 / 24',
          sec: '3.2 — The order flow',
          h: 'From quote request to confirmed order',
          steps: [
            ['The client sends the request', 'through the form or by email.', 'client'],
            ['The system checks stock', 'for every line and flags what is missing.', 'automatic'],
            ['Sales fills in', 'the delivery date for the missing lines.', 'sales'],
            ['The quote goes out', 'as a PDF, valid for 14 days.', 'automatic'],
            ['On acceptance', 'the order is created in the ERP and stock is reserved.', 'automatic'],
          ] as [string, string, string][],
          outT: 'What version 1 does NOT do',
          out: [
            'It does not compute volume discounts — those are entered by hand',
            'It does not issue the invoice; it only prepares the data for it',
            'It has no mobile app',
          ],
        },
        report: {
          bar: 'Automations', month: 'July 2026',
          big: '38', unit: 'hours saved', delta: '+6 h on June',
          axisA: 'Dec', axisB: 'Jul',
          thRun: 'Run', thDur: 'Duration',
          rows: [
            ['Stock sync', '2.4 s', true],
            ['Quote #4182', '1.1 s', true],
            ['Supplier import', 'error', false],
            ['Daily report', '0.8 s', true],
          ] as [string, string, boolean][],
        },
        flow: {
          bar: 'Diagnostic · the order flow', side: 'Before / After',
          before: 'BEFORE', after: 'AFTER',
          orders: 'ORDERS', erp: 'ERP', stockBad: 'STOCK XLS', stock: 'STOCK',
          quotes: 'QUOTES', invoices: 'INVOICES', bus: 'BUS', decide: 'DECIDES',
          person: '1 PERSON', personSub: 'copies everything',
          eManual: 'copied by hand', eRetyped: 're-entered', eAuto: 'automatic',
          sumBefore: '≈ 12 H / WEEK', sumBeforeSub: 'lost to re-entry',
          sumAfter: '≈ 2 H / WEEK', sumAfterSub: 'decisions only',
          hint: '← drag sideways',
        },
      },
    },

    blueprint: {
      title: 'Blueprint — Maquette',
      desc: 'Five days, fixed price. Spec, architecture, clickable prototype and a real number. It comes off the build entirely.',
      eyebrow: 'Fixed price · 5 working days',
      h1: 'Pay a little to find out exactly what it will cost.',
      lede: 'The Blueprint is the model of your project: a spec, an architecture, a clickable prototype and a real number. You do it before committing to anything large.',

      getLabel: 'What you get',
      getAside: 'Five deliverables',
      deliverables: [
        ['Functional spec', 'What the system does, for whom, in what order. Written in your language, not in jargon.'],
        ['Technical architecture', 'Which components, which technologies, what integrates with what.'],
        ['Clickable prototype', 'Not a picture. You click through it and show it to your team.'],
        ['Phased estimate', 'A range, not a single number. A single number is always a lie.'],
        ['Execution plan and risks', 'What can break, and what we do when it does.'],
      ],

      daysLabel: 'The five days',
      days: [
        ['Day 1', 'A long conversation. We ask the uncomfortable questions now, not in three months.'],
        ['Day 2–3', 'We write the spec and the architecture. You get a draft and you correct it.'],
        ['Day 4', 'The prototype.'],
        ['Day 5', 'The estimate, the plan, the risks. We walk through them together, point by point.'],
      ],

      priceLabel: 'The price',
      priceDim: '€450',
      priceP: 'It comes off the build entirely, if the build starts within 60 days. If we go on together, the Blueprint cost you nothing.',

      keepH: 'If you decide not to build with us, the document is still yours.',
      keepP: "You can take it to your own team or to another firm. We sell it that way because a client who feels trapped isn't a good client — not for them, not for us.",

      factsLabel: 'In short',
      facts: [
        ['Commitment', '5 working days'],
        ['Price', '€450'],
        ['Who works on it', 'One person, start to finish'],
        ['Result', 'Spec, architecture, prototype, figure'],
      ] as [string, string][],

      fitLabel: 'Who it is for, and who it is not for',
      fitYes: ['You have an idea with no shape yet and want to know the cost before committing.', 'You have quotes that differ by a factor of three and no idea which to believe.', 'You have a system that works but do not know what to change for it to scale.'],
      fitNo: ['You want a price by email, with no conversation. I cannot give a real figure without understanding what I am building.', 'You want to pay in full at the end. We work in phases, in both directions.', 'You already have four suppliers on the same project. I will not be the fifth.'],

      qLabel: 'Questions',
      questions: [
        ['Why pay for a Blueprint? Others quote for free.', "We also give you a free estimate, after a 30-minute call. The difference is what you get for the money: a free quote is a number nobody can stand behind, because nobody analysed anything. The Blueprint is the document the number comes from — and it stays yours."],
        ['Why not just build the whole thing?', "We do, and in most cases that is what happens. But the Blueprint doesn't tie you to us. It is your document: you can take it to your own team or to another firm."],
        ['What if you disappear?', 'The code sits in your repository, on your account, from day one. Setup and run documentation is part of delivery. And we use nothing exotic — any ordinary developer can pick the project up.'],
      ],
    },

    services: {
      title: 'Services — Maquette',
      desc: 'Web applications, websites and automations for companies that have outgrown spreadsheets and group chats.',
      eyebrow: 'After the model',
      h1: 'What we build.',
      lede: "We work with companies that have outgrown spreadsheets and group chats but don't yet have an IT department. One price. One deadline. One person accountable, start to finish.",
      items: [
        {
          label: 'Per project',
          h: 'Apps and websites',
          p: 'A brochure site or a catalogue, web applications, client portals, admin panels. Bilingual, with a CMS so you can edit it yourself, technical SEO and real performance.',
          list: ['A searchable, filterable catalogue', 'An admin panel shaped around your actual workflow', 'Integration with the systems you already run', 'Under one second on a phone'],
          price: 'A searchable catalogue with an admin panel, at a company of ~50 people: typically between €1,200 and €2,000. The firm figure comes after a 30-minute call.',
        },
        {
          label: 'With upkeep',
          h: 'Automations',
          p: "We connect the systems that don't talk to each other today: ERP, website, email, spreadsheets. Automatic quotes and invoices, notifications, stock sync, reporting that runs itself.",
          list: ['Quotes go out in minutes, not hours', 'Stock in sync, no double entry', 'Monthly reports with no one touching them', 'Maintenance and monitoring included'],
          price: 'Connecting the ERP to the website with automatic quote generation: typically between €800 and €1,500, plus €80/month for maintenance and monitoring. The firm figure comes after a 30-minute call.',
        },
      ],
      howSold: 'How it is measured',
      howSoldP: "We don't sell features, we sell hours saved. We put your numbers on paper before we start — and if it doesn't add up, we tell you it isn't worth it.",
      catchAll: 'We also work on more specialised things — product configurators, 3D and AR visualisation, hardware integrations. If you have something unusual, ask.',
    },


    how: {
      title: 'How we work — Maquette',
      desc: 'The process, the deadlines, the communication, what happens to the code and the accounts.',
      eyebrow: 'The process',
      h1: 'How we work.',
      lede: 'No surprises matters more than no mistakes. This page says exactly what happens, in what order, and what you do if it does not.',
      blocks: [
        ['Communication', 'One channel, not five. A written update every Friday: what got done, what is next, and what is blocked on you. If we slip, you hear it the day it happens, not on the deadline.'],
        ['Code and accounts', 'The repository is on your account from day one. Servers, domains and accounts are in your company name, not ours. We do not tie you to us through dependency.'],
        ['Payment', 'In phases, never all at the end and never all up front. Each phase has a deliverable you can check before you pay for the next one.'],
        ['If we are late', 'A deadline moves once, in writing, with the reason. A second slip means we estimated badly — and then the extra cost is ours, not yours.'],
      ],
      sizeH: 'How many of you are there?',
      sizeP: 'We are a small studio, deliberately. I work with you directly on the project — you do not go through three layers of account managers and nothing gets lost on the way. For specialised parts we bring in collaborators. What matters to you is that one person is accountable from start to finish, and there is a schedule you can check every week.',
    },

    contact: {
      title: 'Contact — Maquette',
      desc: 'Thirty minutes, no strings.',
      eyebrow: 'Contact',
      h1: 'Thirty minutes, no strings.',
      lede: 'You leave with a real price range, even if we never work together.',
      fName: 'Name', fCompany: 'Company', fEmail: 'Email',
      fWhat: 'What you want to build', fWhatHint: 'Two or three sentences are enough.',
      fBudget: 'Rough budget', fBudgetHint: 'Optional. A range, not a figure.',
      fSend: 'Send',
      after: 'We reply the same working day.',
    },

    lab: {
      title: 'Lab — Maquette',
      desc: 'Our own products, in progress.',
      eyebrow: 'Our own products',
      h1: 'We build for ourselves too.',
      lede: "The Lab is where our own products live. It isn't a side project — it's how we test on ourselves what we ask clients to do: start with the model, ship in phases, measure.",
      projLabel: 'In progress now',

      projects: [
        {
          name: 'Declutter',
          stage: 'Prototype · updated August 2026',
          h: 'The things you meant to say in therapy, and forget by the time you get there.',
          blocks: [
            ['The problem', 'Two weeks pass between sessions. In that time exactly the things you wanted to talk about go through your head — usually on the bus, at three in the morning, or in the middle of an argument. By the time you are in the room, none of them are left. You end up with "I don\u2019t know, it was an okay week".'],
            ['The thesis', 'A thought should not be archived, it should come back when it matters. You write it down in three seconds and it returns before the session, grouped — not as a list of forty notes.'],
            ['Where it is now', 'A working prototype for capture and grouping. The pre-session return is being built.'],
            ['What is next', 'Testing with real psychotherapists, on real patients, before any new feature.'],
          ] as [string, string][],
          noteH: 'What you write there is health data.',
          noteP: 'We treat it as such: encrypted, stored in the European Union, no advertising trackers, and no model is trained on your content. A therapist does not ask what features you have — they ask where their patients\u2019 data lives.',
        },
        {
          name: 'GigTim',
          stage: 'Being scoped · going through its own Blueprint',
          h: 'Short shifts for students. The business posts it, the student takes it.',
          blocks: [
            ['The problem', 'A restaurant needs two people on Saturday night. A warehouse needs four on Thursday for a stock count. They look on Facebook groups and through friends, and some of them do not turn up. On the other side, a student with three free hours on Tuesday has nowhere to sell them.'],
            ['The thesis', 'Both the demand and the supply exist and keep missing each other for lack of a channel. A three-line posting, up in two minutes, taken by someone in five.'],
            ['Where it is now', 'Being scoped. It goes through exactly the process we sell: spec, architecture and numbers before the first line of code.'],
            ['The hard part', 'Not the app — the first city. A marketplace without local density does not work: a student opens it, sees three postings and never comes back. So one campus and one neighbourhood first, not a national launch.'],
          ] as [string, string][],
          noteH: 'Short-term work has a legal shape in Romania.',
          noteP: 'Day-labourer status, self-employment or a fixed-term contract — each carries different obligations for the business hiring. A platform that brokers work cannot sidestep that. Which is why the legal shape gets decided in the Blueprint, not after launch.',
        },
      ],

      askLabel: 'How you can help',
      ask1H: 'Looking for 3–5 psychotherapists',
      ask1P: 'to get their hands on the Declutter prototype and tell me where I am wrong. No money, not much time — one hour, once.',
      ask1Cta: 'Write to me',
      ask2: 'If you work in product design or mobile and either subject interests you, write to me. Paid, project by project.',
      ask3: 'For investment conversations:',
    },

    footer: {
      legalName: 'EUDAIMONIA AI TECH S.R.L.',
      cui: 'VAT/CUI 52005701',
      onrc: 'J__/____/____',
      seat: 'Registered office: —',
      brandNote: 'Maquette is the trading name of EUDAIMONIA AI TECH S.R.L.',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
      how: 'How we work',
      anpc: 'ANPC', sol: 'ODR',
    },
  },
} as const;
