/* Toată sursa de adevăr pentru text. Se editează aici, nu în pagini.
   Limba site-ului: engleză (decizie 2026-08-24). Vezi docs/site-map.md. */

export const routes = {
  home: '/',
  blueprint: '/blueprint',
  lab: '/lab',
  contact: '/contact',
  privacy: '/privacy',
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
    ['blueprint', 'Blueprint'],
    ['lab', 'Lab'],
    ['contact', 'Contact'],
  ] as [RouteKey, string][],
  cta: 'Start with a Blueprint',

  home: {
    title: 'Maquette — software studio',
    desc: 'We build web apps and automations for companies that have outgrown spreadsheets. We start with the model: a fixed-price Blueprint before anything big.',
    kicker: 'First the model. Then the system.',
    /* Titlul se randează în trei bucăți: cuvântul din mijloc e îmbinarea mono —
       un singur cuvânt, maxim, pe titlu (docs/brand.md § Mișcările). */
    h1a: 'We build web apps and automations for companies that have outgrown ',
    h1mono: 'spreadsheets',
    h1b: '.',
    h1: 'We build web apps and automations for companies that have outgrown spreadsheets.',
    lede: 'We start with the model, not the code — a fixed-price Blueprint before anything big.',
    heroLink: 'Talk to us',

    /* 01 — rate card: meniu de scenarii cu prețuri (feedback 2026-08-24).
       Sub-intervalele împart Treapta 1 din positioning.md — capetele
       1.200–2.000 / 800–1.500 nu se depășesc fără decizie de business. */
    build: {
      label: 'What we build',
      h: 'What we build, and what it typically costs.',
      rows: [
        ['Presentation website, CMS included', '€1,200 – 1,500', ''],
        ['Catalogue or client portal, with admin panel', '€1,500 – 2,000', ''],
        ['Two systems connected — ERP, website, email', '€800 – 1,100', '+ €80/month upkeep'],
        ['Quotes, invoices and reports that run themselves', '€1,100 – 1,500', '+ €80/month upkeep'],
      ] as [string, string, string][],
      /* Rândul catch-all acoperă și demo-ul AR trimis pe email. */
      customWhat: 'Something specific — a configurator, 3D and AR, an unusual automation',
      customCta: 'Talk to us',
      note: 'Every figure is a typical scenario. The firm number comes after a 30-minute call — and it stays firm.',
    },

    /* 02 — Blueprint-ul, comprimat la o propoziție. Mecanismul complet
       stă pe /blueprint. Fără cifră: ancorarea rămâne regulă. */
    mech: {
      label: 'The Blueprint',
      h: 'Every build starts with a Blueprint: five days, a fixed price, and a document that stays yours even if you build elsewhere.',
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
      exhibit: 'The third exhibit is this site — static, hand-written, about 250 bytes of JavaScript.',
      link: 'See the Lab',
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

    end: {
      h: 'Thirty minutes, and you leave with a number.',
      p: 'No strings and no sales deck. You tell us what hurts, we tell you what it would cost and how long it would take — even if we never work together.',
    },
  },

  blueprint: {
    title: 'Blueprint — Maquette',
    desc: 'Five days, fixed price. Spec, architecture, clickable prototype and a real number. It comes off the build entirely.',
    eyebrow: 'Fixed price · 5 working days',
    h1: 'Pay a little to find out exactly what it will cost.',
    lede: 'The Blueprint is the model of your project: a spec, an architecture, a clickable prototype and a real number. You do it before committing to anything large.',

    facts: [
      ['Commitment', '5 working days'],
      ['Price', '€450'],
      ['Who works on it', 'One person, start to finish'],
      ['Result', 'Spec, architecture, prototype, figure'],
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

    days: {
      label: 'The five days',
      rows: [
        ['Day 1', 'A long conversation. We ask the uncomfortable questions now, not in three months.'],
        ['Day 2–3', 'We write the spec and the architecture. You get a draft and you correct it.'],
        ['Day 4', 'The prototype.'],
        ['Day 5', 'The estimate, the plan, the risks. We walk through them together, point by point.'],
      ] as [string, string][],
    },

    /* Prețul + reversarea riscului stau lipite — tiparul Stark. */
    price: {
      label: 'The price',
      dim: '€450',
      p: 'It comes off the build entirely, if the build starts within 60 days. If we go on together, the Blueprint cost you nothing.',
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
        ['What does a Blueprint NOT do?', "It doesn't write production code and it doesn't ship your system. It is the document the system comes from. And it doesn't guarantee the project is worth building — if the analysis says it isn't, we tell you. That is the best €450 you can spend."],
      ] as [string, string][],
    },

    end: { h: 'Thirty minutes, and you leave with a number.' },
  },

  lab: {
    title: 'Lab — Maquette',
    desc: 'Our own products, in progress: Declutter and GigTim.',
    eyebrow: 'Our own products',
    h1: 'We build for ourselves too.',
    lede: "The Lab is how we test on ourselves what we ask clients to do: start with the model, ship in phases, measure.",
    projLabel: 'In progress now',

    projects: [
      {
        name: 'Declutter',
        stage: 'Prototype · updated August 2026',
        h: 'The things you meant to say in therapy, and forget by the time you get there.',
        blocks: [
          ['The problem', 'Two weeks pass between sessions. In that time exactly the things you wanted to talk about go through your head — usually on the bus, at three in the morning, or in the middle of an argument. By the time you are in the room, none of them are left. You end up with "I don’t know, it was an okay week".'],
          ['The thesis', 'A thought should not be archived, it should come back when it matters. You write it down in three seconds and it returns before the session, grouped — not as a list of forty notes.'],
          ['Where it is now', 'A working prototype for capture and grouping. The pre-session return is being built.'],
          ['What is next', 'Testing with real psychotherapists, on real patients, before any new feature.'],
        ] as [string, string][],
        noteH: 'What you write there is health data.',
        noteP: 'We treat it as such: encrypted, stored in the European Union, no advertising trackers, and no model is trained on your content. A therapist does not ask what features you have — they ask where their patients’ data lives.',
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
      ['How long we keep it', 'Correspondence is kept as long as the conversation is relevant, then deleted. You can ask us at any time to delete what we hold about you, and we will.'],
      ['Who we are', 'The data controller is EUDAIMONIA AI TECH S.R.L., trading as Maquette, registered in Romania. For anything related to your data, write to the address in the footer.'],
      ['Our products', 'Declutter and GigTim, the products described in the Lab, have their own commitments — described there, where they matter.'],
    ] as [string, string][],
  },

  footer: {
    contentsLabel: 'Contents',
    contents: [
      ['blueprint', 'Blueprint'],
      ['lab', 'Lab'],
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
  },
} as const;
