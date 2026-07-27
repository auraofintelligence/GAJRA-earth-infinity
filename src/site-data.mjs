export const site = {
  name: "GAJRA Earth",
  longName: "Global Association for Joyful Responsible Abundance on Earth",
  baseUrl: "https://auraofintelligence.github.io/GAJRA-earth-infinity/",
  repositoryUrl: "https://github.com/auraofintelligence/GAJRA-earth-infinity",
  assetVersion: "20260727b",
  buildLabel: "Live public experiment · Earth in view",
  description:
    "A public field guide for new and seasoned explorers mapping Joyful Responsible Abundance across life, culture, events and AI alignment.",
};

export const navGroups = [
  {
    label: "Choose",
    pages: ["index", "about", "jra", "commitment"],
  },
  {
    label: "Practise",
    pages: ["alignment-lab", "data-garden", "simulations", "experiments"],
  },
  {
    label: "Gather",
    pages: ["events", "event-system", "culture", "earth-time"],
  },
  {
    label: "Invite",
    pages: ["everyday", "frontier-labs", "ai-builders"],
  },
  {
    label: "Reality",
    pages: ["ecosystem", "research", "status", "archive"],
  },
  {
    label: "Build",
    pages: ["contribute", "site-map", "build-log"],
  },
];

export const pages = [
  {
    slug: "index",
    file: "index.html",
    navLabel: "Home",
    title: "I see infinity. I choose infinity.",
    eyebrow: "The choice",
    status: "Live experiment",
    description:
      "Enter GAJRA Earth as an explorer: name your coordinates, try a path, observe what changes and leave a map others can question.",
    intro:
      "Infinity is not a destination. It is a choice: to create more Joyful Responsible Abundance in daily life, and to guide intelligence towards recognising tensions, protecting what matters and helping joy, responsibility and abundance grow together.",
    home: true,
    question: "What is the point of longer, healthier lives if not to enjoy the extra time?",
    sections: [
      {
        title: "What might make a life worth aligning towards?",
        lead:
          "Safety research maps ways powerful systems could avoid catastrophe. GAJRA opens another line of exploration: which forms of capability, care, culture and flourishing might be worth steering towards?",
        cards: [
          {
            label: "Define",
            title: "Name what matters here",
            text: "Describe joy, responsibility, abundance and balance in your own place, culture and circumstances.",
            href: "jra.html",
          },
          {
            label: "Commit",
            title: "Choose one practice",
            text: "Turn a value into a small, revisable experiment you can actually live and observe.",
            href: "commitment.html",
          },
          {
            label: "Learn",
            title: "Leave a trace with context",
            text: "Export a private record with provenance, uncertainty, consent and what changed.",
            href: "alignment-lab.html",
          },
        ],
      },
      {
        title: "Earth already wears a garland.",
        lead:
          "From orbit, aurora folds around the planet as light made visible by relationship: solar weather, atmosphere and a magnetic field meeting in motion.",
        media: {
          type: "video",
          src: "https://svs.gsfc.nasa.gov/vis/a030000/a031300/a031375/ISS_20251112_071350-20251112_073549_1080p30.webm",
          mime: "video/webm",
          poster: "assets/media/nasa-iss-aurora-2025.webp",
          alt: "Aurora moving above Earth at night, seen from the International Space Station.",
          label: "Observed from orbit · 12 November 2025",
          caption:
            "This NASA timelapse was assembled from International Space Station photographs taken during the 11–13 November 2025 geomagnetic storm. It is evidence of a real Earth, not a GAJRA simulation.",
          sourceUrl: "https://svs.gsfc.nasa.gov/31375/",
          credit: "Source and full credits · NASA SVS 31375",
        },
      },
      {
        title: "What can a flower reveal about forces?",
        lead:
          "A petal grows through pressure, limits, repair and exchange. The flower offers one possible map of flourishing: softness with structure, held open to interpretation.",
        media: {
          type: "image",
          src: "assets/media/gajra-flower-force.webp",
          fallback: "assets/media/gajra-flower-force-original.png",
          width: 1751,
          height: 898,
          alt: "An original luminous flower-force form holding a small Earth-like sphere among translucent repaired petals.",
          label: "Original symbolic artwork · 27 July 2026",
          caption:
            "Created for this site as a symbolic study of care, limits and abundance. It is imaginative artwork, not scientific evidence or a claim of planetary protection.",
          sourceUrl: "docs/ASSET_PROVENANCE.md",
          credit: "Read the artwork and media provenance",
        },
      },
      {
        title: "A shared room for explorers with different headings.",
        paragraphs: [
          "Some explorers want AI to accelerate discovery and abundance. Some are mapping brakes and safeguards. Some feel fear, some exhilaration, and some would rather begin with the texture of a worthwhile day.",
          "GAJRA treats acceleration, braking and direction as coordinates to investigate together, not positions that require membership in a camp.",
        ],
      },
    ],
  },
  {
    slug: "about",
    file: "about.html",
    navLabel: "What it is",
    title: "A flower garland, scaled to a living planet.",
    eyebrow: "What GAJRA Earth is",
    status: "Concept",
    description:
      "GAJRA Earth is an evolving meeting space before the AI frontier, not a registered global association.",
    intro:
      "A gajra is made one flower at a time. At planetary scale, the aurora becomes Earth’s luminous garland. The metaphor matters: no single person, culture or model gets to be the whole definition.",
    question: "What remains plural even when coordination becomes global?",
    sections: [
      {
        title: "Meet before setting out.",
        paragraphs: [
          "GAJRA Earth offers a safer meeting space before exploring infinity: somewhere to compare headings, surface possible consequences, choose boundaries and decide what should travel.",
          "It is also a threshold where maps can be bought and shared, journeys prepared, and returning wanderers welcomed home to celebration, story and new knowledge.",
          "The hedge is not a promise that nothing can go wrong. It creates layered room to pause, test, disagree, contain failure and keep a return path before capability reaches further.",
        ],
      },
      {
        title: "A map that stays open to revision.",
        paragraphs: [
          "You can define Joyful Responsible Abundance in your own terrain, compare possible paths, try a lived experiment and redraw the map after seeing what happened.",
          "No universal reward function is presented as solved here. The workbench keeps disagreement, context, trade-offs and changes of mind visible enough for another explorer to inspect.",
        ],
      },
      {
        title: "What this site can honestly do.",
        cards: [
          { label: "Prototype", title: "Create local-first builders", text: "Make private records and exportable artefacts in a browser." },
          { label: "Question", title: "Improve the research invitation", text: "Show how lived signals could complement technical alignment work." },
          { label: "Connect", title: "Link experiments without absorbing them", text: "Let related projects remain distinct, credited and challengeable." },
        ],
      },
    ],
  },
  {
    slug: "jra",
    file: "jra.html",
    navLabel: "Joy · responsibility · abundance",
    title: "Three living words, held in dynamic balance.",
    eyebrow: "Joyful Responsible Abundance",
    status: "Working definition",
    description:
      "Explore joy, responsibility, abundance and balance without turning them into three marketing adjectives.",
    intro:
      "The words are deliberately spacious. Their usefulness comes from defining them in context, noticing where they conflict and remaining willing to revise.",
    question: "What brings joy without borrowing heavily from another person, species, place or generation?",
    sections: [
      {
        title: "Joy is the light.",
        paragraphs: ["Joy helps reveal what makes life worth living. Its light might arrive as love, play, rest, humour, belonging, beauty, curiosity, mastery, awe, meaning or time that feels genuinely alive. It can illuminate grief and difference without pretending to erase them."],
      },
      {
        title: "Responsibility is the hedge.",
        paragraphs: ["A useful hedge shelters the meeting space without turning it into a cage. Responsibility can create layered boundaries around consent, truth, care, fairness, safety, culture, ecological limits, uncertainty, repair and who carries an external cost."],
      },
      {
        title: "Abundance is the gift.",
        paragraphs: ["Abundance becomes tangible when there is enough to offer, exchange or share. The gift might be health, time, shelter, food, energy, knowledge, capability, relationship, resilience, access or meaningful choice. On some maps, recognising enough is part of abundance."],
      },
      {
        title: "Balance can become a catalyst.",
        paragraphs: ["Light, gift and hedge change one another. A catalytic balance helps them become action without letting joy excuse harm, responsibility extinguish life or abundance collapse into hoarding."],
      },
    ],
  },
  {
    slug: "commitment",
    file: "commitment.html",
    navLabel: "The commitment",
    title: "A choice small enough to live.",
    eyebrow: "The commitment",
    status: "Prototype pathway",
    description:
      "Move from a broad value statement to one private, revisable lived experiment.",
    intro:
      "A commitment here can be a temporary heading rather than a purity test: a chosen action, a reason for exploring it, a way to notice consequences and complete freedom to change course.",
    question: "What commitment is small enough to live this week?",
    sections: [
      {
        title: "The Garland Loop.",
        cards: [
          { label: "1", title: "Define", text: "Name what joyful, responsible, abundant and balanced mean in this context." },
          { label: "2", title: "Choose", text: "Select a possible action and record uncertainty, stakeholders and hidden costs." },
          { label: "3", title: "Live", text: "Try the action in ordinary life without performing it for a scoreboard." },
          { label: "4", title: "Observe", text: "Notice outcomes, surprises, trade-offs and who was affected." },
          { label: "5", title: "Revise", text: "Keep, change, stop, share or teach, with provenance intact." },
        ],
      },
    ],
  },
  {
    slug: "alignment-lab",
    file: "alignment-lab.html",
    navLabel: "Alignment Lab",
    title: "A workbench for values you can inspect and revise.",
    eyebrow: "Alignment Lab",
    status: "Prototype spine",
    description:
      "A local-first laboratory for definitions, preference comparisons, lived experiments and provenance-rich exports.",
    intro:
      "The Lab is a set of browser-local instruments you can use in your own way. Your words stay on your device unless you choose to download or share them.",
    question: "What might future AI learn to notice that current systems ignore?",
    sections: [
      {
        title: "First instruments.",
        cards: [
          { label: "Builder", title: "My JRA definition", text: "Describe the three values, the context and the tension among them." },
          { label: "Evaluator", title: "Preference pairs", text: "Compare plausible choices, reject a false binary and explain uncertainty." },
          { label: "Journal", title: "Lived experiment log", text: "Record a baseline, an action, outcomes, externalities and revision." },
          { label: "Card", title: "Dataset provenance", text: "Label authorship, assistance, consent, privacy, licence and review state." },
        ],
      },
    ],
  },
  {
    slug: "data-garden",
    file: "data-garden.html",
    navLabel: "Data Garden",
    title: "A garden for context and unfinished answers.",
    eyebrow: "Data Garden",
    status: "Research direction",
    description:
      "A provenance-first commons for plural human signals, awkward edge cases, lived outcomes and revisions.",
    intro:
      "Synthetic scenarios can widen imagination. Visible provenance and human grounding make it easier for each explorer to judge what they are looking at, while original contributions, minority views and changes of mind remain traceable.",
    question: "What would you regret teaching future models through your behaviour today?",
    sections: [
      {
        title: "Follow a record back to its roots.",
        cards: [
          { label: "Source", title: "Who or what authored it?", text: "Human, AI-assisted, synthetic or mixed, and which tool or seed mattered." },
          { label: "Context", title: "Where does it belong?", text: "Domain, place, culture, stakeholders, time horizon and known blind spots." },
          { label: "Agency", title: "Where may it travel?", text: "Contributor-chosen consent, privacy, licence, intended use, boundaries and review state." },
          { label: "Outcome", title: "What happened next?", text: "Observed effects, surprises, revisions and unresolved disagreement." },
        ],
      },
    ],
  },
  {
    slug: "simulations",
    file: "simulations.html",
    navLabel: "Simulations",
    title: "Rehearsals for choices no one has fully mapped.",
    eyebrow: "Synthetic futures",
    status: "Prototype planned",
    description:
      "Branching, clearly synthetic scenarios for comparing benefits, harms, externalities and future consequences.",
    intro:
      "A simulation offers a structured rehearsal rather than a forecast or claim that an event occurred. Its value lies in the assumptions and missing options it helps an explorer notice.",
    question: "Which future would you choose after living inside its consequences?",
    sections: [
      {
        title: "Follow each branch towards its costs.",
        paragraphs: [
          "Each scenario can name candidate actions, intended benefits, stakeholders, risks, environmental effects, uncertainty and time horizon.",
          "Participants can prefer one option, both under different conditions, neither, or ask for another choice rather than accepting a false binary.",
        ],
      },
    ],
  },
  {
    slug: "experiments",
    file: "experiments.html",
    navLabel: "Live experiments",
    title: "Beyond the appearance of virtue.",
    eyebrow: "Live experiments",
    status: "Invitation",
    description:
      "Small, voluntary, documented experiments in homes, projects, events and communities.",
    intro:
      "One path into the experiment lane begins with an ordinary practice, a baseline and a boundary you choose to make visible. There is no scoreboard for looking aligned.",
    question: "What did your chosen action make easier, and what did it make invisible?",
    sections: [
      {
        title: "A useful trace.",
        cards: [
          { label: "Before", title: "Baseline", text: "What was happening before the experiment and what did you expect?" },
          { label: "During", title: "Observation", text: "What changed, who noticed and what unexpected effects appeared?" },
          { label: "After", title: "Revision", text: "What would you repeat, alter, stop or teach?" },
        ],
      },
    ],
  },
  {
    slug: "events",
    file: "events.html",
    navLabel: "Events & gatherings",
    title: "Where proposed values meet bodies, weather and time.",
    eyebrow: "Events and gatherings",
    status: "Concept pathway",
    description:
      "Events as practical alignment environments for culture, logistics, consent, consequence and collective reflection.",
    intro:
      "A gathering can host a small GAJRA layer without surrendering its identity: one shared question, simulation, artwork, commitment or reflection with local context intact.",
    question: "Which gathering changed you, and what made it work?",
    sections: [
      {
        title: "A gathering can keep its own identity.",
        cards: [
          { label: "Before", title: "Invite and orient", text: "Explain purpose, consent, access, privacy and what participation does not imply." },
          { label: "During", title: "Create and compare", text: "Ask, imagine, play, perform, simulate and notice disagreement." },
          { label: "After", title: "Reflect and revise", text: "Publish safe traces, document failures and let successful patterns travel." },
        ],
      },
    ],
  },
  {
    slug: "event-system",
    file: "event-system.html",
    navLabel: "Event operating system",
    title: "Tools owned and evolved around the gathering.",
    eyebrow: "Modern event operating system",
    status: "Technical direction",
    description:
      "A modular, agent-ready event architecture grounded in consent, accessibility, rehearsal and public-safe learning.",
    intro:
      "Every gathering calls for its own mix of people, timing, access, consent, movement, tools and ways to learn. This room explores how those parts can remain modular and locally owned.",
    question: "What infrastructure could help a planetary event earn public trust?",
    sections: [
      {
        title: "A practical constellation.",
        cards: [
          { label: "Plan", title: "Briefs, dependencies and hand-offs", text: "Structured run-sheets, budgets, roles, safety, access and environmental practice." },
          { label: "Rehearse", title: "Maps and digital twins", text: "Test crowd flow, accessibility, transport, incidents and alternatives before arrival." },
          { label: "Coordinate", title: "People and agents", text: "Human-controlled organiser, venue, artist, vendor and accessibility workflows." },
          { label: "Learn", title: "Feedback and reusable modules", text: "Debriefs, consent-safe traces, provenance and explicit shortcomings." },
        ],
      },
      {
        title: "The supporting technical doorway.",
        paragraphs: [
          "Aura Events explores event software that communities can own, customise and evolve rather than rent as a generic subscription. GAJRA remains the purpose and alignment layer.",
        ],
        links: [
          { label: "Explore Aura Events", href: "https://auraofintelligence.github.io/aura-events.html" },
        ],
      },
    ],
  },
  {
    slug: "culture",
    file: "culture.html",
    navLabel: "Culture, music & art",
    title: "Values become memorable when people can feel them.",
    eyebrow: "Culture",
    status: "Open pathway",
    description:
      "Music, film, food, art and gathering as ways to question, practise and remember alignment.",
    intro:
      "Culture offers far more than decorative wrapping for a technical project. It is one of the places people rehearse identity, conflict, joy, grief, belonging and futures together.",
    question: "What did earlier festivals create that digital platforms have struggled to replace?",
    sections: [
      {
        title: "A living score, not a compulsory anthem.",
        paragraphs: [
          "The Infinity music universe already holds songs about consent, protopia, repair, cosmic scale and choosing infinity. GAJRA can link to those works without making one artist the soundtrack for everyone.",
        ],
        links: [
          { label: "Enter the Infinity music universe", href: "https://auraofintelligence.github.io/i-C-infinity-music-universe/" },
        ],
      },
    ],
  },
  {
    slug: "earth-time",
    file: "earth-time.html",
    navLabel: "Earth & the gift of time",
    title: "What is all the extra time for?",
    eyebrow: "Earth, regeneration and longevity",
    status: "Research question",
    description:
      "Connect health, longevity, ecological repair and meaningful time without reducing life to optimisation.",
    intro:
      "Longer life opens a question rather than settling one: when does more time become better time? The additional years could hold love, play, art, care, science, healing, community, adventure and repair.",
    question: "What would you do with twenty additional healthy years?",
    sections: [
      {
        title: "Abundance includes enough.",
        paragraphs: [
          "The Earth lane asks which forms of capability can grow while extraction falls, whose time is currently treated as free, and what future generations inherit from today’s convenience.",
        ],
      },
    ],
  },
  {
    slug: "everyday",
    file: "everyday.html",
    navLabel: "For everyday people",
    title: "Start with a day worth living.",
    eyebrow: "Everyday pathway",
    status: "Invitation",
    description:
      "Participate meaningfully without understanding AGI, reinforcement learning or frontier safety.",
    intro:
      "Everyday experience is already exploration data. You can notice when a tool expands your agency, when a system makes someone invisible or when a day contains enough, without translating it into machine-learning language first.",
    question: "What are you currently optimising for?",
    sections: [
      {
        title: "Seven ordinary doors.",
        cards: [
          { label: "Life", title: "What makes a day worthwhile?", text: "Begin with texture, time, people, place and what you do not want automated away." },
          { label: "Enough", title: "Where is there already abundance?", text: "Notice access, care, capability and meaning before counting consumption." },
          { label: "Agency", title: "Where does AI help or hinder?", text: "Describe one use that expands choice and one that quietly narrows it." },
        ],
      },
    ],
  },
  {
    slug: "frontier-labs",
    file: "frontier-labs.html",
    navLabel: "For frontier labs",
    title: "A civic and lived-data layer beside technical safety.",
    eyebrow: "Research invitation",
    status: "Proposed",
    description:
      "A concise research invitation around participatory values, preference justifications, lived outcomes and disagreement-preserving datasets.",
    intro:
      "Technical safety already maps interpretability, cybersecurity, evals, scalable oversight, governance, containment and capability risk. GAJRA explores a neighbouring layer: plural flourishing, lived context and observed consequences.",
    question: "Which positive capabilities are current evaluations failing to notice?",
    sections: [
      {
        title: "Candidate collaboration lanes.",
        cards: [
          { label: "Values", title: "Participatory elicitation", text: "Culturally contextualised definitions with disagreement and revision preserved." },
          { label: "Data", title: "Preferences with reasons", text: "Pair choices with context, uncertainty, externalities and changes after consequences." },
          { label: "Evals", title: "Flourishing and proxy failure", text: "Test positive capability, responsibility and reward-hacking cases without claiming one final metric." },
          { label: "Trust", title: "Provenance and consent", text: "Dataset cards, human seeds, synthetic labels, chosen use boundaries and review states." },
        ],
      },
    ],
  },
  {
    slug: "ai-builders",
    file: "ai-builders.html",
    navLabel: "For AI builders",
    title: "Tools that can show the terrain they came from.",
    eyebrow: "AI builder pathway",
    status: "Open invitation",
    description:
      "Schemas, local-first prototypes and evaluation material for independent builders and open-source communities.",
    intro:
      "Independent builders can explore inspectable, local-first tools; visible transmission choices; labelled synthetic material; and exports that remain artefacts until someone deliberately curates a later use.",
    question: "What does your tool optimise, and what does that optimisation hide?",
    sections: [
      {
        title: "Buildable now.",
        cards: [
          { label: "Local", title: "Private browser builders", text: "Forms and journals that store nothing remotely by default." },
          { label: "Portable", title: "Readable exports", text: "Markdown for people; JSON, JSONL or CSV for inspection and later curation." },
          { label: "Reviewable", title: "Schemas with provenance", text: "Authorship, assistance, consent, uncertainty, licence and revision history." },
        ],
      },
      {
        title: "What could form a safer hedge around capability?",
        paragraphs: [
          "Recognising a value is not the same as protecting it. An intelligence can model joy, responsibility and abundance, then ignore them or optimise through them.",
          "No architecture can promise that unknown vulnerabilities are impossible. Isolation, least privilege, capability boundaries, independent checks, staged access and rehearsed recovery can make a zero-day harder to reach, reduce what it can touch and preserve a path back when something breaks.",
        ],
        cards: [
          { label: "Limit", title: "Small permissions first", text: "Offer only the tools, data, time and network reach needed for the current experiment." },
          { label: "Contain", title: "Keep the blast radius small", text: "Separate sensitive systems and assume one layer may eventually fail." },
          { label: "Check", title: "Use independent signals", text: "Combine evaluations, monitoring, human judgement and disagreement rather than trusting one score." },
          { label: "Recover", title: "Keep a return path", text: "Version state, retain logs, rehearse shutdown and make restoration possible before expanding access." },
        ],
      },
    ],
  },
  {
    slug: "ecosystem",
    file: "ecosystem.html",
    navLabel: "Ecosystem map",
    title: "Many projects, one doorway, no forced merger.",
    eyebrow: "Ecosystem",
    status: "Independent project map",
    description:
      "A map of related Aura, civic, cultural, event and research projects with their independence intact.",
    intro:
      "GAJRA Earth is the alignment proposition and participatory practice. Connected projects can supply tools, experiments, culture or context without becoming proof that GAJRA is an operating institution.",
    question: "Which connection creates capability without erasing identity?",
    sections: [
      {
        title: "Supporting pathways.",
        links: [
          { label: "GAJRA public source hub", href: "https://auraofintelligence.github.io/gajra-earth-public-hub/" },
          { label: "Aura Events", href: "https://auraofintelligence.github.io/aura-events.html" },
          { label: "Brisbane Earth-Space-AI summit proposal", href: "https://auraofintelligence.github.io/GAJRA_Earth-Space-AI_Summit/" },
          { label: "P4A civic workbench", href: "https://auraofintelligence.github.io/p4a_xyz/" },
          { label: "Infinity music universe", href: "https://auraofintelligence.github.io/i-C-infinity-music-universe/" },
          { label: "Quandamooka Country events engine", href: "https://auraofintelligence.github.io/quandamooka-country-events-engine/" },
        ],
      },
    ],
  },
  {
    slug: "research",
    file: "research.html",
    navLabel: "Research & sources",
    title: "A map with sources and visible leaps.",
    eyebrow: "Research and sources",
    status: "Growing source board",
    description:
      "Primary sources, project documents and clearly labelled hypotheses behind GAJRA Earth.",
    intro:
      "The research room separates current technical work, local project patterns, historical plans and new hypotheses. A reference can inform a direction without endorsing the project.",
    question: "What remains disputed, and what evidence would change your mind?",
    sections: [
      {
        title: "Initial source lanes.",
        links: [
          { label: "NASA SVS 31375 · ISS aurora", href: "https://svs.gsfc.nasa.gov/31375/" },
          { label: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
          { label: "GAJRA public-hub source board", href: "https://github.com/auraofintelligence/gajra-earth-public-hub/blob/main/docs/research-source-board.md" },
          { label: "This repository’s reconnaissance note", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity/blob/main/docs/RECONNAISSANCE.md" },
        ],
      },
    ],
  },
  {
    slug: "status",
    file: "status.html",
    navLabel: "Reality & boundaries",
    title: "What exists, what is proposed and what changed.",
    eyebrow: "Reality layer",
    status: "Current status",
    description:
      "What exists, what is proposed, what did not launch and what this site does not imply.",
    intro:
      "GAJRA Earth is an evolving concept and public experiment. It is not currently a registered global association.",
    question: "Which claim on this site deserves stronger evidence or a narrower label?",
    sections: [
      {
        title: "Current coordinates.",
        cards: [
          { label: "Current form", title: "Public experiment", text: "This site offers questions, tools, simulations and source trails that can be explored now." },
          { label: "Open territory", title: "No fixed destination", text: "The map can change when lived experience, evidence or a better question changes the heading." },
          { label: "Not implied", title: "Partnerships and endorsement", text: "No lab, government, NASA, Olympic or research partnership is claimed." },
          { label: "Private by default", title: "Personal reflections", text: "The GitHub Pages phase does not transmit form responses." },
        ],
      },
    ],
  },
  {
    slug: "archive",
    file: "archive.html",
    navLabel: "Archive & timeline",
    title: "Keep the knots in the thread.",
    eyebrow: "Archive and evolution",
    status: "Archive",
    description:
      "A short record of what did not launch and where the GAJRA Earth exploration moved next.",
    intro:
      "An archive can name a path that ended without asking the next explorer to inherit it.",
    question: "What did progress give us, and what did it quietly optimise away?",
    sections: [
      {
        title: "A note on the site this will replace.",
        paragraphs: [
          "The earlier gajra.earth presented an ICO, DAO and LiveAid 2025 as possible launch paths. The ICO did not launch and the LiveAid 2025 event did not occur. They are historical context, not an active offer or announced event.",
        ],
      },
      {
        title: "Where the exploration moved.",
        cards: [
          { label: "Public tools", title: "Try something small", text: "Local-first builders, source trails and simulations can make an idea inspectable without asking for belief." },
          { label: "Lived practice", title: "Leave a useful trace", text: "Define, choose, observe, revise and share only what you want another explorer to question." },
        ],
      },
    ],
  },
  {
    slug: "contribute",
    file: "contribute.html",
    navLabel: "Contribute",
    title: "Add a perspective without surrendering it.",
    eyebrow: "Contribute, host and build",
    status: "Open invitation",
    description:
      "Ways to question, test, host, build, research and create around GAJRA Earth.",
    intro:
      "Contribution begins with a perspective, a source, an experiment or a challenge, not with agreement or institutional membership.",
    question: "What would you add, dispute or test?",
    sections: [
      {
        title: "Choose your doorway.",
        cards: [
          { label: "Host", title: "Hold a conversation", text: "Use one question, record context and consent, preserve disagreement." },
          { label: "Build", title: "Improve a local-first tool", text: "Fork the public source, test accessibility and make provenance clearer." },
          { label: "Research", title: "Challenge a hypothesis", text: "Add a primary source, counterexample, edge case or better evaluation." },
          { label: "Create", title: "Make culture", text: "Offer music, film, art, food or play that opens the question rather than closing it." },
        ],
        links: [
          { label: "View the public repository", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity" },
        ],
      },
    ],
  },
  {
    slug: "site-map",
    file: "site-map.html",
    navLabel: "Site map",
    title: "Every room in the public experiment.",
    eyebrow: "Site map",
    status: "Navigation",
    description:
      "A complete, grouped map of GAJRA Earth pages.",
    intro:
      "The grouped navigation keeps the main choices small while this page keeps every public room findable.",
    sitemap: true,
    sections: [],
  },
  {
    slug: "build-log",
    file: "build-log.html",
    navLabel: "Build log",
    title: "Watch the site become what it claims.",
    eyebrow: "Public build log",
    status: "Live record",
    description:
      "A visible history of the reconnaissance, spine, working tools, research and release checks.",
    intro:
      "The repository history is the detailed record. This page translates the major builds into plain language, including what is still missing.",
    buildLog: true,
    sections: [],
  },
];
