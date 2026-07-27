export const site = {
  name: "GAJRA Earth",
  longName: "Global Association for Joyful Responsible Abundance on Earth",
  baseUrl: "https://auraofintelligence.github.io/GAJRA-earth-infinity/",
  repositoryUrl: "https://github.com/auraofintelligence/GAJRA-earth-infinity",
  assetVersion: "20260727h",
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
        placement: "below-ticker",
        lead:
          "From orbit, aurora folds around the planet as light made visible by relationship: solar weather, atmosphere and a magnetic field meeting in motion.",
        media: {
          type: "video",
          src: "https://svs.gsfc.nasa.gov/vis/a030000/a031200/a031281/ISS067_20220817_aurora_1080p25.webm",
          mime: "video/webm",
          poster: "assets/media/nasa-aurora-australis-2022.jpg",
          alt: "Green and red Aurora Australis above Earth at night, seen from the International Space Station.",
          label: "Aurora Australis from orbit · 17 August 2022",
          caption:
            "International Space Station photographs begin above the Southern Ocean between Africa and Antarctica. Green and red Aurora Australis remain visible as Australia and the lights of Perth come into view.",
          sourceUrl: "https://svs.gsfc.nasa.gov/31281/",
          credit: "Source and full credits · NASA SVS 31281",
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
    navLabel: "The meeting space",
    title: "A flower garland, scaled to a living planet.",
    eyebrow: "Meeting space",
    status: "Living threshold",
    description:
      "GAJRA Earth is a meeting space before the AI frontier, with a public experiment now open and the formal association layer still ahead.",
    intro:
      "A gajra is made one flower at a time. At planetary scale, the aurora becomes Earth’s luminous garland. Each person, culture and model may carry one flower in the circle.",
    question: "What remains plural even when coordination becomes global?",
    sections: [
      {
        title: "Meet before setting out.",
        paragraphs: [
          "GAJRA Earth offers a safer meeting space before exploring infinity: somewhere to compare headings, surface possible consequences, choose boundaries and decide what should travel.",
          "It is also a threshold where maps can be bought and shared, journeys prepared, and returning wanderers welcomed home to celebration, story and new knowledge.",
          "The hedge creates layered room to pause, test, disagree, contain failure and keep a return path before capability reaches further.",
        ],
      },
      {
        title: "Make a map, test it, bring it home.",
        paragraphs: [
          "Define Joyful Responsible Abundance in your own terrain, compare possible paths, try one lived experiment and redraw the map after seeing what happened.",
        ],
        links: [
          { label: "Make a private map in the Alignment Lab", href: "alignment-lab.html#lab-workbench" },
          { label: "Choose a one-week commitment", href: "commitment.html" },
        ],
      },
      {
        title: "Choose a first move.",
        cards: [
          { label: "Map", title: "Name what matters here", text: "Create a private, revisable record and export a copy you control.", href: "alignment-lab.html#lab-workbench" },
          { label: "Gather", title: "Prepare a useful conversation", text: "Take one question into a gathering with consent and context intact.", href: "events.html" },
          { label: "Check", title: "Inspect sources and open claims", text: "Separate evidence, project hypotheses and unresolved questions.", href: "research.html" },
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
      "Explore joy, responsibility, abundance and balance as living coordinates for fieldwork, music, maps and ordinary choices.",
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
    status: "First path",
    description:
      "Move from a broad value statement to one private, revisable lived experiment.",
    intro:
      "Treat a commitment as a trail marker, not a cage. Choose a small crossing, carry it into ordinary life, then return with a clearer map.",
    question: "Which crossing is small enough to walk this week?",
    sections: [
      {
        title: "The Garland Loop.",
        steps: [
          { title: "Name the light", text: "Write the joy, responsibility, abundance and balance visible in this terrain." },
          { title: "Choose a crossing", text: "Pick one small action that could make a bridge real this week. Name the people, places and hidden costs it touches." },
          { title: "Walk it in ordinary life", text: "Try the action quietly enough to learn from it, with room to turn back." },
          { title: "Notice the flow-on effects", text: "Look for gifts, friction, surprises, external costs and the branch that only appeared after movement." },
          { title: "Bring the trace home", text: "Keep it private, revise it, share it or turn it into a field-kit note with source and consent intact." },
        ],
        links: [
          { label: "Start the loop in the Alignment Lab", href: "alignment-lab.html#lab-workbench" },
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
    status: "Local-first lab",
    description:
      "A local-first laboratory for definitions, preference comparisons, lived experiments and provenance-rich exports.",
    intro:
      "The Lab is a set of browser-local instruments you can use in your own way. Your words stay on your device unless you choose to download or share them.",
    alignmentLab: true,
    question: "What might future AI learn to notice that current systems ignore?",
    sections: [],
  },
  {
    slug: "data-garden",
    file: "data-garden.html",
    navLabel: "Data Garden",
    title: "A garden for context and unfinished answers.",
    eyebrow: "Data Garden",
    status: "Source garden",
    description:
      "A provenance-first commons for plural human signals, awkward edge cases, lived outcomes and revisions.",
    intro:
      "Synthetic scenarios can widen imagination. Visible provenance and human grounding make it easier for each explorer to judge what they are looking at, while original contributions, minority views and changes of mind remain traceable.",
    question: "What would you regret teaching future models through your behaviour today?",
    sections: [
      {
        title: "Follow a record back to its roots.",
        prompts: [
          { label: "Source", title: "Who or what authored it?", text: "Human, AI-assisted, synthetic or mixed, and which tool or seed mattered." },
          { label: "Context", title: "Where does it belong?", text: "Domain, place, culture, stakeholders, time horizon and known blind spots." },
          { label: "Agency", title: "Where may it travel?", text: "Contributor-chosen consent, privacy, licence, intended use, boundaries and review state." },
          { label: "Outcome", title: "What happened next?", text: "Observed effects, surprises, revisions and unresolved disagreement." },
        ],
        links: [
          { label: "Create a source card in the Alignment Lab", href: "alignment-lab.html#lab-workbench" },
        ],
      },
    ],
  },
  {
    slug: "simulations",
    file: "simulations.html",
    navLabel: "Simulations",
    title: "Rehearsals for choices no one has fully mapped.",
    eyebrow: "Branching rehearsals",
    status: "Edge room",
    description:
      "Branching scenarios for exploring choices, gifts, risks, hidden costs and return paths.",
    intro:
      "A simulation is an edge-walk: start with a question, visit two possible futures, notice what each one gives and what it asks in return, then bring back a better map.",
    question: "Which future would you visit twice, and what would you carry back?",
    sections: [
      {
        title: "Try the edge where the data gets thin.",
        paragraphs: [
          "Each branch names possible actions, intended gifts, people touched, environmental effects, uncertainty and time horizon.",
          "An explorer may choose one path, braid two, refuse both or sketch the missing branch.",
        ],
        steps: [
          { title: "Choose the question", text: "Name the crossing you are testing and who or what travels with it." },
          { title: "Walk two branches", text: "Track joy, responsibility, abundance, friction and hidden externalities in each path." },
          { title: "Bring back a better map", text: "Save the insight, add the missing branch or carry the question into the Alignment Lab." },
        ],
        links: [
          { label: "Open the Alignment Lab", href: "alignment-lab.html#lab-workbench" },
          { label: "Visit the Data Garden", href: "data-garden.html" },
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
        steps: [
          { title: "Record the baseline", text: "Name what was happening before the experiment and what you expected." },
          { title: "Observe without performing", text: "Notice what changed, who noticed and which unexpected effects appeared." },
          { title: "Revise the next move", text: "Choose what to repeat, alter, stop or teach." },
        ],
        links: [
          { label: "Record a lived experiment in the Alignment Lab", href: "alignment-lab.html#lab-workbench" },
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
    status: "Gathering path",
    description:
      "Events as practical alignment environments for culture, logistics, consent, consequence and collective reflection.",
    intro:
      "A gathering can host a small GAJRA layer without surrendering its identity: one shared question, simulation, artwork, commitment or reflection with local context intact.",
    question: "Which gathering changed you, and what made it work?",
    sections: [
      {
        title: "A gathering can keep its own identity.",
        steps: [
          { title: "Invite and orient", text: "Explain purpose, consent, access, privacy and what participation does not imply." },
          { title: "Create and compare", text: "Ask, imagine, play, perform, simulate and notice disagreement." },
          { title: "Reflect and revise", text: "Publish only safe traces, document failures and let useful patterns travel." },
        ],
        links: [
          { label: "Explore the event operating system", href: "event-system.html" },
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
    status: "Event workbench",
    description:
      "A modular, agent-ready event architecture grounded in consent, accessibility, rehearsal and public-safe learning.",
    intro:
      "Every gathering calls for its own mix of people, timing, access, consent, movement, tools and ways to learn. This room explores how those parts can remain modular and locally owned.",
    question: "What infrastructure could help a planetary event earn public trust?",
    sections: [
      {
        title: "A practical constellation.",
        steps: [
          { title: "Plan the hand-offs", text: "Connect run-sheets, budgets, roles, safety, access and environmental practice." },
          { title: "Rehearse before arrival", text: "Test crowd flow, accessibility, transport, incidents and alternatives." },
          { title: "Coordinate with people in control", text: "Keep organiser, venue, artist, vendor and accessibility workflows human-directed." },
          { title: "Debrief into reusable learning", text: "Keep consent-safe traces, provenance and explicit shortcomings." },
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
        title: "A lyrical map for going beyond.",
        paragraphs: [
          "The Infinity music universe already holds songs about consent, protopia, repair, cosmic scale and choosing infinity. A Protopian Gambit works like one lyrical map through crisis, care, courage and civic stewardship.",
          "We Go Beyond is one key for this site: a bridge from safe smallness into wider responsibility, with the heart still first.",
        ],
        links: [
          { label: "Enter the Infinity music universe", href: "https://auraofintelligence.github.io/i-C-infinity-music-universe/" },
          { label: "Open A Protopian Gambit", href: "https://auraofintelligence.github.io/i-C-infinity-music-universe/albums/a-protopian-gambit/" },
          { label: "Open We Go Beyond", href: "https://auraofintelligence.github.io/i-C-infinity-music-universe/songs/a-protopian-gambit-22-we-go-beyond/" },
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
      {
        title: "Civic stewardship, Earth to Sol.",
        paragraphs: [
          "The stewardship frame begins close to home and stretches outward: Earth, the Sun, the weather of the heliosphere and the shared Sol system that gives this experiment its clock, light and edge.",
          "Going beyond safe smallness carries care further than the old map expected.",
        ],
        links: [
          { label: "Open the bridge atlas", href: "ecosystem.html" },
          { label: "Follow the lyrical map", href: "culture.html" },
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
        prompts: [
          { label: "Life", title: "What makes a day worthwhile?", text: "Begin with texture, time, people, place and what you do not want automated away." },
          { label: "Enough", title: "Where is there already abundance?", text: "Notice access, care, capability and meaning before counting consumption." },
          { label: "Agency", title: "Where does AI help or hinder?", text: "Describe one use that expands choice and one that quietly narrows it." },
        ],
        links: [
          { label: "Carry one answer into a private map", href: "alignment-lab.html#lab-workbench" },
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
    status: "Open research invitation",
    description:
      "A concise research invitation around participatory values, preference justifications, lived outcomes and disagreement-preserving datasets.",
    intro:
      "Technical safety already maps interpretability, cybersecurity, evals, scalable oversight, governance, containment and capability risk. GAJRA explores a neighbouring layer: plural flourishing, lived context and observed consequences.",
    question: "Which positive capabilities are current evaluations failing to notice?",
    sections: [
      {
        title: "Candidate collaboration lanes.",
        cards: [
          { label: "Values", title: "Test participatory elicitation", text: "Use culturally contextualised definitions with disagreement and revision preserved.", href: "alignment-lab.html#lab-workbench" },
          { label: "Data", title: "Inspect the source-card fields", text: "Pair choices with context, uncertainty, externalities and changes after consequences.", href: "data-garden.html" },
          { label: "Evals", title: "Challenge a synthetic future", text: "Test capability, responsibility and proxy failure without pretending one metric is final.", href: "simulations.html" },
          { label: "Trust", title: "Propose a stronger boundary", text: "Add a counterexample, edge case, source or review requirement.", href: "contribute.html" },
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
          { label: "Try", title: "Inspect the private browser builder", text: "Test the local save, keyboard flow and explicit export choices.", href: "alignment-lab.html#lab-workbench" },
          { label: "Read", title: "Review the generated record formats", text: "Compare Markdown for people with JSON and JSONL for later inspection.", href: "alignment-lab.html#lab-workbench" },
          { label: "Build", title: "Open the public source", text: "Inspect the code, accessibility checks and provenance fields.", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity" },
        ],
      },
      {
        title: "What could form a safer hedge around capability?",
        paragraphs: [
          "Recognising a value is not the same as protecting it. An intelligence can model joy, responsibility and abundance, then ignore them or optimise through them.",
          "Frontier builders still travel with uncertainty. Isolation, least privilege, capability boundaries, independent checks, staged access and rehearsed recovery make a zero-day harder to reach, reduce what it can touch and preserve a path back when something breaks.",
        ],
        prompts: [
          { label: "Limit", title: "Small permissions first", text: "Offer only the tools, data, time and network reach needed for the current experiment." },
          { label: "Contain", title: "Keep the blast radius small", text: "Separate sensitive systems and assume one layer may eventually fail." },
          { label: "Check", title: "Use independent signals", text: "Combine evaluations, monitoring, human judgement and disagreement rather than trusting one score." },
          { label: "Recover", title: "Keep a return path", text: "Version state, retain logs, rehearse shutdown and make restoration possible before expanding access." },
        ],
        links: [
          { label: "Challenge or extend this hedge", href: "contribute.html" },
        ],
      },
    ],
  },
  {
    slug: "ecosystem",
    file: "ecosystem.html",
    navLabel: "Ecosystem map",
    title: "Every border, a bridge.",
    eyebrow: "World map",
    status: "Atlas seed",
    description:
      "A neutral satellite atlas for groups, bridge work and public experiments as they join GAJRA Earth.",
    intro:
      "GAJRA Earth begins with a world view that sees the planet before the paperwork. The first atlas seed uses satellite imagery, chosen public traces and human-vetted updates so groups may appear as places, bridges and invitations rather than badges.",
    worldMap: true,
    question: "Which bridge creates capability without erasing identity?",
    sections: [
      {
        title: "Three bridge readings.",
        prompts: [
          { label: "Reclaim", title: "Where a crossing repairs", text: "Some bridges begin where trust, place or language was damaged. The marker carries source, consent and a return path for correction." },
          { label: "Acclaim", title: "Where a crossing celebrates", text: "Some bridges begin with souls, seeds and shared patterns already grown. The marker welcomes travellers without flattening the host culture." },
          { label: "Travel", title: "Choose the frame", text: "The same crossing may call for quiet repair in one place and public celebration in another." },
        ],
      },
      {
        title: "Next bridge layers.",
        cards: [
          { label: "Gather", title: "Festival and field-kit hosts", text: "Show listening stations, starter field kits and public-awareness rooms after they opt in.", href: "events.html" },
          { label: "Research", title: "Labs, data centres and working groups", text: "Separate public signals, broad locations and source status without implying endorsement.", href: "frontier-labs.html" },
          { label: "Build", title: "Grant, tender and local help desks", text: "Adapt the Straddie-style labs into practical GAJRA field support where there is consent.", href: "contribute.html" },
        ],
      },
      {
        title: "Existing trailheads.",
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
          { label: "NASA SVS 31281 · Aurora Australis from the ISS", href: "https://svs.gsfc.nasa.gov/31281/" },
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
    title: "Current coordinates and open territory.",
    eyebrow: "Reality layer",
    status: "Current status",
    description:
      "A plain status layer for current tools, open invitations, historical knots and claims kept inside their evidence.",
    intro:
      "At this stage, GAJRA Earth is an evolving concept and public experiment rather than a registered global association.",
    question: "Which claim on this site deserves stronger evidence or a narrower label?",
    sections: [
      {
        title: "Current coordinates.",
        prompts: [
          { label: "Current form", title: "Public experiment", text: "This site offers questions, tools, simulations and source trails that can be explored now." },
          { label: "Open territory", title: "No fixed destination", text: "The map can change when lived experience, evidence or a better question changes the heading." },
          { label: "Clear air", title: "Partnerships and endorsement", text: "The site claims no lab, government, NASA, Olympic or research partnership." },
          { label: "Local unless exported", title: "Personal reflections", text: "The GitHub Pages phase keeps form responses on the visitor's device." },
        ],
        links: [
          { label: "Read the public build log", href: "build-log.html" },
          { label: "Inspect the source repository", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity" },
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
          { label: "Try", title: "Make a private map", text: "Use a working local-first builder without asking anyone to accept the project first.", href: "alignment-lab.html#lab-workbench" },
          { label: "Live", title: "Choose one revisable practice", text: "Define, choose, observe and revise before sharing any trace.", href: "commitment.html" },
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
          { label: "Host", title: "Hold a conversation", text: "Use one question, record context and consent, preserve disagreement.", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity/issues/new?title=Contribution%3A%20host%20a%20conversation" },
          { label: "Build", title: "Improve a local-first tool", text: "Fork the public source, test accessibility and make provenance clearer.", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity/issues/new?title=Contribution%3A%20improve%20a%20tool" },
          { label: "Research", title: "Challenge a hypothesis", text: "Add a primary source, counterexample, edge case or better evaluation.", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity/issues/new?title=Contribution%3A%20challenge%20a%20hypothesis" },
          { label: "Create", title: "Make culture", text: "Offer music, film, art, food or play that opens the question rather than closing it.", href: "https://github.com/auraofintelligence/GAJRA-earth-infinity/issues/new?title=Contribution%3A%20make%20culture" },
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
