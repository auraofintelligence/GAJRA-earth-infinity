export const site = {
  name: "GAJRA Earth",
  longName: "Global Association for Joyful Responsible Abundance on Earth",
  baseUrl: "https://auraofintelligence.github.io/GAJRA-earth-infinity/",
  repositoryUrl: "https://github.com/auraofintelligence/GAJRA-earth-infinity",
  assetVersion: "20260728r2",
  buildLabel: "Live public experiment · Earth in view",
  description:
    "A meeting of minds for self-alignment and AI alignment within Joyful Responsible Abundance.",
};

export const navGroups = [
  {
    label: "Begin",
    pages: ["index", "alignment-lab"],
  },
  {
    label: "Gather",
    pages: ["about", "events"],
  },
  {
    label: "Explore",
    pages: ["ecosystem", "frontier-labs"],
  },
  {
    label: "Carry",
    pages: ["culture", "contribute"],
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
      "A clear public doorway for people exploring self-alignment and AI alignment through Joyful Responsible Abundance.",
    intro:
      "GAJRA Earth exists to convene a meeting of minds about self-alignment and AI alignment within the trinity of Joyful Responsible Abundance.",
    home: true,
    showTicker: true,
    showQuestion: true,
    contract: {
      visitor: "A curious person arriving without prior context",
      task: "Understand the purpose and choose a useful first action",
      outcome: "One clear route into reflection, gathering or public fieldwork",
    },
    question: "What is the point of longer, healthier lives if not to enjoy the extra time?",
    sections: [
      {
        title: "Choose a way in.",
        lead:
          "Begin privately, invite a few minds into a room, or carry the question into public fieldwork.",
        cards: [
          {
            label: "Private",
            title: "Map your own alignment",
            text: "Explore what joy, responsibility and abundance mean in your life. Your notes stay in your browser unless you export them.",
            href: "alignment-lab.html#lab-workbench",
          },
          {
            label: "Together",
            title: "Plan a meeting circle",
            text: "Turn one live question into a clear invitation, time, place and shareable run sheet.",
            href: "about.html#meeting-circle-builder",
          },
          {
            label: "Public",
            title: "Build a field kit",
            text: "Prepare a listening station or practical help table that meets people where they are.",
            href: "events.html#field-kit-builder",
          },
        ],
      },
      {
        title: "Why this conversation has weight.",
        lead:
          "AI is moving through money, institutions, culture and ordinary life. These source trails widen the landscape while you keep the compass.",
        cards: [
          {
            label: "Money",
            title: "Follow the scale of investment",
            text: "Stanford's 2026 AI Index tracks AI capability, adoption, investment, economic influence and public opinion.",
            href: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
          },
          {
            label: "State of play",
            title: "Enter the safety conversation",
            text: "The International AI Safety Report gathers scientific evidence on general-purpose AI capabilities and risks.",
            href: "https://internationalaisafetyreport.org/",
          },
          {
            label: "In the room",
            title: "See who is already gathering",
            text: "AI for Good brings public institutions, researchers, industry and civil society into practical conversations.",
            href: "https://aiforgood.itu.int/",
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
    ],
  },
  {
    slug: "about",
    file: "about.html",
    navLabel: "Meeting Circle",
    title: "Plan a meeting circle.",
    eyebrow: "Meeting circle",
    status: "Invitation builder",
    description:
      "Shape a real meeting invitation about self-alignment, AI alignment and Joyful Responsible Abundance.",
    intro:
      "Shape one live question into an invitation, time, place and run sheet. Export it when the room feels ready.",
    compactHero: true,
    meetingTool: true,
    contract: {
      visitor: "Someone ready to bring a few people together",
      task: "Shape a clear invitation and practical run sheet",
      outcome: "A calendar event and shareable meeting plan",
    },
    question: "",
    sections: [],
  },
  {
    slug: "jra",
    file: "jra.html",
    redirectTo: "index.html",
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
    redirectTo: "alignment-lab.html#lab-workbench",
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
      "The Lab holds four private tools for mapping values, comparing paths, recording lived experiments and carrying sources with context. Your words stay on your device unless you choose to download or share them.",
    compactHero: true,
    alignmentLab: true,
    contract: {
      visitor: "An explorer beginning privately",
      task: "Use any useful instrument to map values, paths, lived evidence or sources",
      outcome: "A browser-local record that can be revised, copied or exported",
    },
    question: "",
    sections: [],
  },
  {
    slug: "data-garden",
    file: "data-garden.html",
    redirectTo: "alignment-lab.html#lab-workbench",
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
    redirectTo: "alignment-lab.html#lab-workbench",
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
    redirectTo: "alignment-lab.html#lab-workbench",
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
    navLabel: "Field Kit",
    title: "Build a GAJRA field kit.",
    eyebrow: "Field kit",
    status: "Kit builder",
    description:
      "Build one practical, shareable field kit for a gathering.",
    intro:
      "Prepare one listening station or practical help table. Choose the question, useful offer, essentials and return path, then carry the kit onward.",
    compactHero: true,
    eventTool: true,
    contract: {
      visitor: "Someone preparing a public listening or help station",
      task: "Choose one field format and assemble its essentials",
      outcome: "A focused field kit and downloadable run sheet",
    },
    sections: [],
  },
  {
    slug: "event-system",
    file: "event-system.html",
    redirectTo: "events.html#field-kit-builder",
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
    navLabel: "Culture Compass",
    title: "Carry a question through culture.",
    eyebrow: "Culture compass",
    status: "Guided listening",
    description:
      "Use music and culture as a listening compass for a live question.",
    intro:
      "Choose a listening lens, bring a question, notice what shifts, and keep a trace you can carry into conversation.",
    heroImage: {
      src: "assets/media/gajra-flower-force.webp",
      width: 1751,
      height: 898,
    },
    compactHero: true,
    cultureTool: true,
    contract: {
      visitor: "A listener, artist or group carrying a live question",
      task: "Choose a cultural lens and capture what the encounter changes",
      outcome: "A short listening trace with one next move",
    },
    question: "",
    sections: [],
  },
  {
    slug: "earth-time",
    file: "earth-time.html",
    redirectTo: "culture.html#culture-tool",
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
    redirectTo: "about.html#meeting-circle-builder",
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
    navLabel: "Future Watch",
    title: "Find a room you can still enter.",
    eyebrow: "Future watch",
    status: "Source-linked watch",
    description:
      "Upcoming AI, Earth, culture and civic events that can still be attended, influenced or watched.",
    intro:
      "Browse future rooms by topic and participation path. Each listing carries a source, date and direct route to the organiser.",
    compactHero: true,
    upcomingWatch: true,
    contract: {
      visitor: "Someone looking for a real upcoming room",
      task: "Filter source-linked events by interest and participation path",
      outcome: "One event to attend, influence or watch",
    },
    question: "",
    sections: [],
  },
  {
    slug: "ai-builders",
    file: "ai-builders.html",
    redirectTo: "frontier-labs.html#approaching",
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
    navLabel: "Bridge Atlas",
    title: "Every border, a bridge.",
    eyebrow: "Bridge atlas",
    status: "Earth in view",
    description:
      "A neutral satellite atlas for groups, bridge work and public experiments as they join GAJRA Earth.",
    intro:
      "See where groups, bridge work and public experiments are gathering across Earth.",
    compactHero: true,
    worldMap: true,
    contract: {
      visitor: "A traveller exploring public GAJRA-aligned traces",
      task: "Move between sphere and flat views and inspect records",
      outcome: "A useful public trace or a draft contribution for review",
    },
    question: "",
    sections: [],
  },
  {
    slug: "research",
    file: "research.html",
    redirectTo: "culture.html#culture-tool",
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
    redirectTo: "contribute.html#contribution-tool",
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
    redirectTo: "contribute.html#contribution-tool",
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
    navLabel: "Join or Build",
    title: "Carry a trace into the shared map.",
    eyebrow: "Join or build",
    status: "Local contribution packet",
    description:
      "Draft a source-linked contribution locally, then choose an explicit handoff for human review.",
    intro:
      "Draft a perspective, broad location, source, consent state and correction route.",
    compactHero: true,
    contributionTool: true,
    contract: {
      visitor: "A person or group carrying a public trace",
      task: "Draft a source-linked packet with consent and a correction path",
      outcome: "A copy, download or chosen message ready for human review",
    },
    question: "",
    sections: [],
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
