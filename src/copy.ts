/* Toată sursa de adevăr pentru text. Se editează aici, nu în pagini.
   Limba site-ului: engleză (decizie 2026-08-24). Vezi docs/site-map.md.
   Revizie 2026-08-25: zero prețuri și zero termene autoimpuse pe site. */

/* Prefixul de bază al site-ului — '' pe domeniul propriu, '/Maquette' pe
   GitHub Pages. Orice URL intern se construiește cu el. */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const routes = {
  home: base + '/',
  services: base + '/services',
  blueprint: base + '/blueprint',
  projects: base + '/projects',
  contact: base + '/contact',
  privacy: base + '/privacy',
} as const;
export type RouteKey = keyof typeof routes;

/* Câmpul `kind` al figurilor are exact trei valori. Nu e text liber.
   `delivered` nu se folosește fără acord scris de publicare de la client. */
export const kinds = {
  deliverable: 'Deliverable · sample',
  demo: 'Capability demonstration',
  delivered: 'Delivered project',
} as const;
export type Kind = keyof typeof kinds;

export const copy = {
  nav: [
    ['services', 'Services'],
    ['blueprint', 'Blueprint'],
    ['projects', 'Projects'],
    ['contact', 'Contact'],
  ] as [RouteKey, string][],
  cta: 'Start with a Blueprint',

  home: {
    title: 'Maquette — software studio',
    desc: 'We build web apps, automations and AR product viewers for companies that have outgrown spreadsheets. We start with the model: a Blueprint before anything big.',
    kicker: 'First the model. Then the system.',
    /* Titlul se randează în trei bucăți: cuvântul din mijloc e îmbinarea mono —
       un singur cuvânt, maxim, pe titlu (docs/brand.md § Mișcările). */
    h1a: 'We build web apps and automations for companies that have outgrown ',
    h1mono: 'spreadsheets',
    h1b: '.',
    h1: 'We build web apps and automations for companies that have outgrown spreadsheets.',
    lede: 'We start with the model, not the code — a Blueprint before anything big.',
    heroLink: 'How every build starts',

    /* 01 — ce construim: aceleași rânduri cu puncte de ghidaj, dar coloana
       din dreapta e etichetă mono de categorie, NU preț (decizie 2026-08-25:
       zero cifre pe site). Al treilea slot al tuplei rămâne pentru sub-etichetă
       — gol acum; canvas-ul (paintSec01) pictează aceleași tuple. */
    build: {
      label: 'What we build',
      h: 'Automation, web systems, and apps.',
      rows: [
        ['Quotes, invoices and reports that run themselves', 'Automation', ''],
        ['Two systems connected — ERP, website, email', 'Automation', ''],
        ['Presentation websites, catalogues, client portals', 'Web build', ''],
        ['Mobile apps and AR product viewers — your product at true scale', 'App · AR/3D', ''],
      ] as [string, string, string][],
      customWhat: 'Something specific — a configurator, an integration, an unusual system',
      customCta: 'See the services',
      note: 'No menu prices — every build is scoped and quoted for the client it is for. A 30-minute call gives you a real range; the Blueprint turns it into a firm number.',
    },

    /* 02 — Blueprint-ul, comprimat la o propoziție. Mecanismul complet
       stă pe /blueprint. Fără cifră și fără zile. */
    mech: {
      label: 'The Blueprint',
      h: 'Every build starts with a Blueprint: a spec, an architecture, a clickable prototype, and a document that stays yours even if you build elsewhere.',
      link: "See what's in it",
    },

    /* 04 — dovada. Etichetele de stadiu trebuie să rămână adevărate. */
    proof: {
      label: 'Proof',
      h: 'We run our own ideas through the process we sell.',
      cards: [
        {
          name: 'Declutter',
          stage: 'Prototype',
          p: 'The things you meant to say in therapy, and forget by the time you get there. What you write there is health data, and we treat it that way: encrypted, stored in the EU, no model trained on it.',
        },
        {
          name: 'GigTim',
          stage: 'Being scoped',
          p: 'Short shifts for students. It goes through its own Blueprint first: spec, architecture and numbers before the first line of code.',
        },
      ],
      /* Fost „about 250 bytes of JavaScript" — fals de când homepage-ul
         livrează Three.js + GSAP (~684 KB). Regula de aur (2026-08-31). */
      exhibit: 'The third exhibit is this site — designed, written and built by hand.',
      link: 'See the exhibition',
      /* Ștampila onestității — o singură instanță pe site. Se actualizează
         când realitatea se schimbă; nu se șterge cât timp e adevărată. */
      stamp: ['Delivered projects', '00', 'updated Aug 2026'],
    },

    /* 05 — o singură obiecție, cea care blochează totul, fix înainte de CTA. */
    objection: {
      label: 'The question everyone asks',
      h: 'Where are the case studies?',
      p: "There aren't any yet — none we could publish with written client consent, and we don't publish without it. Until then we show working deliverables instead: a real Blueprint sample, two products of our own, and this site. The first delivered project goes up the day a client signs off.",
    },

    /* „real range", nu „a number" — apelul dă intervalul, Blueprint-ul
       cifra fermă (aliniat 2026-08-31 cu /contact și mecanismul). */
    end: {
      h: 'Thirty minutes, and you leave with a real range.',
      p: 'No strings and no sales deck. You tell us what hurts, we tell you what it would cost and how long it would take — even if we never work together.',
    },
  },

  /* Pagina de servicii — cele trei tipuri de propuneri (2026-08-25).
     Doar text, fără figuri: niciun ecran AR fals fără o captură reală. */
  services: {
    title: 'Services — Maquette',
    desc: 'Automations, websites and web apps, and applications including AR product viewers. Scoped and quoted per client.',
    eyebrow: 'Services',
    h1: 'Automation, web systems, and apps — each built from a model first.',
    lede: 'Three kinds of work, one process: we define the system with you, then build it in phases. No menu prices — every build is quoted for the client it is for.',
    ctaRow: 'Talk to us',
    items: [
      {
        label: 'Automations',
        h: 'The work your team does by hand, done by the system.',
        p: 'We connect the tools you already have and automate the routine between them. Sold in hours saved, not in features — and the numbers come from you, in the first call.',
        points: [
          'Quotes, invoices and reports that generate themselves',
          'Two systems connected — ERP, website, email, spreadsheets',
          'Stock, orders and notifications kept in sync',
          'Monitoring and upkeep, with a monthly report on what ran',
        ],
      },
      {
        label: 'Websites & web apps',
        h: 'From a presentation site to a client portal with an admin panel.',
        p: 'Built to be edited by your own team and measured by results: a catalogue that is searchable, a quote that goes out in minutes, a page that loads fast on a phone.',
        points: [
          'Presentation websites with a CMS you edit yourselves',
          'Catalogues and client portals, with admin panels',
          'Web applications built around your process',
          'Technical SEO and real, verified performance',
        ],
      },
      {
        label: 'Apps & AR viewers',
        h: 'Mobile and desktop apps — including AR product viewers.',
        p: 'Your product in the customer’s room, at true scale: a couch seen from the product page, on the phone, before it is bought. We build the viewer and the pipeline that feeds it your catalogue.',
        points: [
          'AR product viewers — furniture, fixtures, equipment',
          '3D configurators tied to your real product options',
          'Mobile and desktop apps that talk to the systems above',
        ],
      },
    ],
    pricing: {
      label: 'How pricing works',
      h: 'No two builds cost the same, so this site shows no menu.',
      p: 'A 30-minute call gives you a range we can stand behind. When you want the exact number before committing, that is what the Blueprint is for: spec, architecture, prototype — and a price quoted up front, fixed once agreed.',
      link: 'See the Blueprint',
    },
    end: {
      h: 'Thirty minutes, and you leave with a real range.',
      p: 'You tell us what hurts, we tell you what it would cost and how long it would take — even if we never work together.',
    },
  },

  blueprint: {
    title: 'Blueprint — Maquette',
    desc: 'How every build starts: spec, architecture, clickable prototype and a real number — before you commit to anything large. The fee comes off the build entirely.',
    eyebrow: 'How every build starts',
    h1: 'Find out exactly what it will cost before you commit to it.',
    lede: 'The Blueprint is the model of your project: a spec, an architecture, a clickable prototype and a real number. You do it before committing to anything large.',

    /* Fișa spune MECANISMUL prețului, nu cifra (2026-08-25). */
    facts: [
      ['Scope', 'One system, defined together'],
      ['Who works on it', 'One person, start to finish'],
      ['Result', 'Spec, architecture, prototype, estimate'],
      ['The price', 'Quoted up front, fixed once agreed'],
    ] as [string, string][],

    pain: {
      label: 'The problem',
      h: "Software projects don't fail in the coding.",
      p: 'They fail at the start, when nobody has written down clearly what needs to exist. It begins with a conversation and a rough estimate, and three months later the unspoken assumptions surface. That is why the first thing we sell is not code.',
    },

    get: {
      label: 'What you get',
      deliverables: [
        ['Functional spec', 'What the system does, for whom, in what order. Written in your language, not in jargon.'],
        ['Technical architecture', 'Which components, which technologies, what integrates with what.'],
        ['Clickable prototype', 'Not a picture. You click through it and show it to your team.'],
        ['Phased estimate', 'A range, not a single number. A single number is always a lie.'],
        ['Execution plan and risks', 'What can break, and what we do when it does.'],
      ] as [string, string][],
    },

    /* Pași, nu zile — termenele autoimpuse nu se publică (2026-08-25). */
    process: {
      label: 'The process',
      rows: [
        ['01', 'A long conversation. We ask the uncomfortable questions now, not in three months.'],
        ['02', 'We write the spec and the architecture. You get a draft and you correct it.'],
        ['03', 'The prototype.'],
        ['04', 'The estimate, the plan, the risks. We walk through them together, point by point.'],
      ] as [string, string][],
    },

    /* Garanția + reversarea riscului stau lipite de buton — tiparul Stark.
       Fără cifră; clauza „în 60 de zile" trăiește în contract, nu pe site. */
    guarantee: {
      label: 'The guarantee',
      h: 'The Blueprint fee comes off the build entirely.',
      p: 'If we go on to build together, the Blueprint cost you nothing.',
      keepH: 'If you decide not to build with us, the document is still yours.',
      keepP: "You can take it to your own team or to another firm. We sell it that way because a client who feels trapped isn't a good client — not for them, not for us.",
    },

    sample: {
      label: 'The deliverable',
      h: 'This is what you receive.',
      fig: { title: 'Blueprint — functional specification', tech: 'Document, 24 pp. · 2026' },
    },

    fit: {
      label: 'Who it is for, and who it is not for',
      yes: [
        'You have an idea with no shape yet and want to know the cost before committing.',
        'You have quotes that differ by a factor of three and no idea which to believe.',
        'You have a system that works but do not know what to change for it to scale.',
      ],
      no: [
        'You want a price by email, with no conversation. I cannot give a real figure without understanding what I am building.',
        'You want to pay in full at the end. We work in phases, in both directions.',
        'You already have four suppliers on the same project. I will not be the fifth.',
      ],
    },

    q: {
      label: 'Questions',
      items: [
        ['Why pay for a Blueprint? Others quote for free.', 'We also give you a free estimate, after a 30-minute call. The difference is what you get for the money: a free quote is a number nobody can stand behind, because nobody analysed anything. The Blueprint is the document the number comes from — and it stays yours.'],
        ['Why not just build the whole thing?', "We do, and in most cases that is what happens. But the Blueprint doesn't tie you to us. It is your document: you can take it to your own team or to another firm."],
        ['What if you disappear?', 'The code sits in your repository, on your account, from day one. Setup and run documentation is part of delivery. And we use nothing exotic — any ordinary developer can pick the project up.'],
        ["It's too expensive.", "Then we cut scope, not price. A Blueprint for a single feature costs less than one for the whole system. What we won't do is deliver the same thing cheaper — that would mean the original price was invented."],
        ['Can you start next week?', "Usually not. We run one project at a time, so we don't do to you what firms juggling five at once do to their clients. You get the real date we can start — and if it doesn't work for you, you hear it in the first call."],
        ['Can you quote by email, without a call?', 'No. A price given without understanding what we are building is an invented number, and we would both find that out three months in. Thirty minutes is enough to give you a range we can stand behind.'],
        ['What does a Blueprint NOT do?', "It doesn't write production code and it doesn't ship your system. It is the document the system comes from. And it doesn't guarantee the project is worth building — if the analysis says it isn't, we tell you. That is the cheapest way to find out."],
      ] as [string, string][],
    },

    end: { h: 'Thirty minutes, and you leave with a real range.' },
  },

  /* Expoziția (fost Lab, 2026-08-25): un exponat pe ecran, cu figură mare
     și acțiuni. Etichetele de stadiu trebuie să rămână adevărate. */
  projects: {
    title: 'Projects — Maquette',
    desc: 'Two of our own products, shown as they are: Declutter and GigTim.',
    eyebrow: 'The exhibition',
    h1: 'Two projects, shown as they are.',
    lede: 'We run our own ideas through the process we sell: model first, phases, honest stage labels.',

    exhibits: [
      {
        slug: 'declutter',
        /* Copertă: ilustrație SVG proprie (NU captură falsă) — supraîncărcarea
           cognitivă rezolvată în grupuri; ecranul live coboară în insert. */
        cover: base + '/img/declutter-cover.svg',
        name: 'Declutter',
        stage: 'Prototype · updated August 2026',
        h: 'The things you meant to say in therapy, and forget by the time you get there.',
        p: 'Two weeks pass between sessions, and the thoughts you meant to bring vanish by the time you are in the room. You write one down in three seconds; it comes back before the session, grouped — not as a list of forty notes. Capture and grouping work today. The pre-session return is being built.',
        noteH: 'What you write there is health data.',
        noteP: 'We treat it as such: encrypted, stored in the European Union, no advertising trackers, and no model is trained on your content. A therapist does not ask what features you have — they ask where their patients’ data lives.',
        fig: { title: 'Declutter — capture and return', tech: 'Prototype UI · 2026' },
        /* Spatele cardului — „Read more". Secțiuni scurte, ton onest. */
        more: [
          ['The trigger is the session', 'Notes apps archive thoughts; Declutter returns them. Everything you capture comes back before your session, grouped by theme — work, sleep, the thing you keep postponing. You walk in with your agenda already in hand.'],
          ['Capture in three seconds', 'A thought arrives on the bus, at 2 a.m., mid-meeting. You type one line and close the phone. No folders, no tags, no decisions — the sorting is our job, not yours.'],
          ['Health data, treated as such', 'What you write for therapy is health data under article 9 of the GDPR. It is encrypted, stored in the European Union, and never used to train a model. No advertising trackers, no analytics on your content.'],
          ['Where it stands', 'Capture and grouping work today. The pre-session return is being built. We are looking for three to five psychotherapists to test the prototype and tell us where we are wrong.'],
        ],
      },
      {
        slug: 'gigtim',
        /* Copertă: ilustrație SVG proprie — schimburi scurte pe harta unui
           campus; documentul Blueprint live coboară în insert. */
        cover: base + '/img/gigtim-cover.svg',
        name: 'GigTim',
        stage: 'Being scoped · going through its own Blueprint',
        h: 'Short shifts for students. The business posts it, the student takes it.',
        p: 'A restaurant needs two people on Saturday night; a student has three free hours on Tuesday. Demand and supply keep missing each other for lack of a channel. GigTim is being scoped right now, through exactly the process we sell — spec, architecture and numbers before the first line of code. The hard part is not the app but the first city: one campus and one neighbourhood, not a national launch.',
        noteH: 'Short-term work has a legal shape in Romania.',
        noteP: 'Day-labourer status, self-employment or a fixed-term contract — each carries different obligations for the business hiring. A platform that brokers work cannot sidestep that. Which is why the legal shape gets decided in the Blueprint, not after launch.',
        fig: { title: 'GigTim — its own Blueprint', tech: 'Document, draft · 2026' },
        more: [
          ['The gap, and the product', 'A restaurant needs two extra people on Saturday night; a student has three free hours on Tuesday. There is no channel between them. So: the business posts a shift with a time and a price, the student takes it in one tap. That is the whole product.'],
          ['Density before features', 'A marketplace with no local density is an empty room. The plan starts with one campus and one neighbourhood — not a national launch.'],
          ['The legal shape', 'Short-term work in Romania has legal forms: day labourer, self-employment, or a fixed-term contract. Each carries different obligations for the business. That choice is made in the Blueprint, not patched in after launch.'],
          ['Where it stands', 'GigTim is in scoping — going through exactly the Blueprint we sell. Spec, architecture and unit numbers come before the first line of code.'],
        ],
      },
    ],

    /* Acțiunile exponatului. Like/Comment se randează doar cu env setat. */
    actions: {
      contact: 'Build something like this',
      like: 'Like',
      comment: 'Comment',
      commentNote: 'Comments appear after review.',
      readMore: 'View more',
      readLess: 'Back to the card',
    },

    /* Cererile stau exclusiv aici, în ordinea asta. Investiția fără buton. */
    askLabel: 'How you can help',
    ask1H: 'Looking for 3–5 psychotherapists',
    ask1P: 'to get their hands on the Declutter prototype and tell me where I am wrong. No money, not much time — one hour, once.',
    ask1Cta: 'Write to me',
    ask2: 'If you work in product design or mobile and either subject interests you, write to me. Paid, project by project.',
    ask3: 'For investment conversations:',
  },

  contact: {
    title: 'Contact — Maquette',
    desc: 'Thirty minutes, no strings. You leave with a real price range.',
    eyebrow: 'Contact',
    h1: 'Thirty minutes, no strings.',
    lede: 'You leave with a real price range, even if we never work together.',
    fName: 'Name', fCompany: 'Company', fEmail: 'Email',
    fWhat: 'What you want to build', fWhatHint: 'Two or three sentences are enough.',
    fBudget: 'Rough budget', fBudgetHint: 'Optional. A range, not a figure.',
    fSend: 'Send',
    after: 'We reply the same working day.',
    noFormLead: 'Write to us at',
    phoneLead: 'Or call',

    howLabel: 'How working with us goes',
    how: [
      ['Communication', 'One channel, and a written update every Friday. If we slip, you hear it the day it happens.'],
      ['Code and accounts', 'The repository is on your account from day one. Servers and domains in your name, not ours.'],
      ['Payment', 'In phases, never all at the end and never all up front.'],
      ['If we are late', 'A deadline moves once, in writing, with the reason. A second slip means the extra cost is ours.'],
    ] as [string, string][],

    sizeH: 'How many of you are there?',
    sizeP: 'We are a small studio, deliberately. I work with you directly on the project — you do not go through three layers of account managers and nothing gets lost on the way. For specialised parts we bring in collaborators. What matters to you is that one person is accountable from start to finish, and there is a schedule you can check every week.',
  },

  privacy: {
    title: 'Privacy — Maquette',
    desc: 'What this site collects, and what it does not.',
    h1: 'Privacy',
    updated: 'Last updated: August 2026',
    /* Scrisă, nu copiată. Adevărată: zero cookie-uri, zero analytics. */
    sections: [
      ['What this site collects', 'This site sets no cookies and runs no analytics. There is no tracking of any kind, which is also why there is no cookie banner: there is nothing to consent to.'],
      ['The contact form', 'If you write to us through the contact form, we receive what you typed: your name, company, email address and message. We use it to reply, and for nothing else. We do not add you to any mailing list and we do not share it with anyone.'],
      ['Likes and comments on the projects page', 'A like stores a single number on our counter and a small flag in your browser so you cannot like twice — nothing that identifies you. Comments are hosted by Cusdis, load only after you open them, and are published after review. If neither is visible on the page, neither is running.'],
      ['How long we keep it', 'Correspondence is kept as long as the conversation is relevant, then deleted. You can ask us at any time to delete what we hold about you, and we will.'],
      ['Who we are', 'The data controller is EUDAIMONIA AI TECH S.R.L., trading as Maquette, registered in Romania. For anything related to your data, write to the address in the footer.'],
      ['Our products', 'Declutter and GigTim, the products described on the projects page, have their own commitments — described there, where they matter.'],
    ] as [string, string][],
  },

  footer: {
    contentsLabel: 'Contents',
    contents: [
      ['services', 'Services'],
      ['blueprint', 'Blueprint'],
      ['projects', 'Projects'],
      ['contact', 'Contact'],
      ['privacy', 'Privacy'],
    ] as [RouteKey, string][],
    legalName: 'EUDAIMONIA AI TECH S.R.L.',
    cui: 'VAT/CUI 52005701',
    onrc: 'J__/____/____',           /* de completat de utilizator — blocant de lansare */
    seat: 'Registered office: —',    /* idem */
    brandNote: 'Maquette is the trading name of EUDAIMONIA AI TECH S.R.L.',
    privacy: 'Privacy',
    anpc: 'ANPC', sol: 'ODR',
  },

  /* Ecranele live din figuri. */
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
        /* „valid for 14 days" e conținut diegetic — regula de business a
           sistemului fictiv din specificație, NU un termen Maquette.
           Nu se șterge la epurările de prețuri/termene. */
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

    /* Ecranul Declutter — UI-ul prototipului, randat live (kind: demo).
       Gândurile sunt conținut ilustrativ, diegetic — ca specificația fictivă. */
    declutter: {
      bar: 'Declutter',
      page: 'session · Thu, in 2 days',
      cap: 'Write it down. Three seconds.',
      groups: [
        ['Work — boundaries', [
          'I keep saying yes to things I resent later.',
          'The promotion talk went nowhere again.',
        ]],
        ['Sleep', [
          'Third night this week awake at three.',
        ]],
      ] as [string, string[]][],
      strip: 'Comes back before your session — grouped, not as forty notes.',
    },

    /* Ecranul GigTim — o pagină din PROPRIUL lui Blueprint (kind: demo).
       Vizualul onest pentru „being scoped": documentul, nu o aplicație
       care nu există. Întrebările deschise sunt cele reale din scoping. */
    gigtim: {
      bar: 'GigTim · Blueprint — draft in progress',
      page: 'p. 3 / 18',
      sec: '2.1 — The shift flow',
      h: 'From posting to filled shift',
      steps: [
        ['The business posts a shift', 'three lines, up in two minutes.', 'business'],
        ['Students nearby see it', 'filtered by campus and free hours.', 'automatic'],
        ['A student takes it', 'one tap. The business confirms.', 'student'],
        ['The shift is logged', 'hours and rating, for both sides.', 'automatic'],
      ] as [string, string, string][],
      outT: 'Open questions — being scoped',
      out: [
        'The legal form of each shift — day labour, self-employed or fixed-term',
        'Which single campus and neighbourhood go first',
        'Whether payment runs through the platform in version 1',
      ],
    },
  },
} as const;
