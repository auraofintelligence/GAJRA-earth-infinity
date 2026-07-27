export const site = {
  name: "GAJRA Earth",
  longName: "Global Association for Joyful Responsible Abundance on Earth",
  baseUrl: "https://auraofintelligence.github.io/GAJRA-earth-infinity/",
  repositoryUrl: "https://github.com/auraofintelligence/GAJRA-earth-infinity",
  assetVersion: "20260727a",
  buildLabel: "Public build 1 · the spine",
  description:
    "A public, participatory practice for defining, testing and teaching Joyful Responsible Abundance in life, culture, events and AI alignment.",
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
      "Enter GAJRA Earth: define Joyful Responsible Abundance, practise it, observe what changes and help create richer signals for aligned intelligence.",
    intro:
      "Infinity is not a destination. It is a choice: to create more Joyful Responsible Abundance in daily life, and to guide intelligence towards noticing joy, responsibility, abundance and the tensions among them.",
    home: true,
    question: "What is the point of longer, healthier lives if not to enjoy the extra time?",
    sections: [
      {
        title: "Alignment needs a life worth aligning towards.",
        lead:
          "Safety work asks how powerful systems can avoid catastrophe. GAJRA adds a civic and lived question: what kinds of capability, care, culture and flourishing are worth steering towards?",
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
        title: "A shared room for capability, caution and ordinary life.",
        paragraphs: [
          "GAJRA Earth is for people who want AI to accelerate discovery and abundance, people who want stronger brakes and safeguards, people who fear AI, people who love it, and people who would rather begin with the texture of a worthwhile day.",
          "Acceleration without direction is not alignment. Brakes without a direction worth travelling towards are not enough either.",
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
      "GAJRA Earth is an evolving participatory AI-alignment concept, not a registered global association.",
    intro:
      "A gajra is made one flower at a time. At planetary scale, the aurora becomes Earth’s luminous garland. The metaphor matters: no single person, culture or model gets to be the whole definition.",
    question: "What should remain plural even when coordination becomes global?",
    sections: [
      {
        title: "Practise before declaring victory.",
        paragraphs: [
          "GAJRA Earth invites people to define Joyful Responsible Abundance, compare choices, run small lived experiments, observe outcomes and revise what they thought they wanted.",
          "It does not claim one universal reward function has been solved. It is a practice for making disagreement, context, trade-offs and changes of mind more legible.",
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
        title: "Joyful is not compulsory cheerfulness.",
        paragraphs: ["Joy can hold love, play, rest, humour, belonging, beauty, curiosity, mastery, awe, meaning and time that feels worth living. It also makes room for grief and difference."],
      },
      {
        title: "Responsible is not permanent fear.",
        paragraphs: ["Responsibility asks about consent, truth, care, fairness, safety, culture, ecological limits, uncertainty, accountability, repair and who carries an external cost."],
      },
      {
        title: "Abundance is not infinite extraction.",
        paragraphs: ["Abundance can mean health, time, shelter, food, energy, knowledge, capability, relationships, resilience, access and meaningful choice. Enough can be abundant."],
      },
    ],
  },
  {
    slug: "commitment",
    file: "commitment.html",
    navLabel: "The commitment",
    title: "Make the choice small enough to live.",
    eyebrow: "The commitment",
    status: "Prototype pathway",
    description:
      "Move from a broad value statement to one private, revisable lived experiment.",
    intro:
      "A commitment is not a purity test or permanent oath. It is a chosen action, a reason for trying it, a way to notice consequences and permission to change.",
    question: "What commitment is small enough to live this week?",
    sections: [
      {
        title: "The Garland Loop.",
        cards: [
          { label: "1", title: "Define", text: "Name what joyful, responsible, abundant and balanced mean in this context." },
          { label: "2", title: "Choose", text: "Select a possible action and record uncertainty, stakeholders and hidden costs." },
          { label: "3", title: "Live", text: "Try the action in ordinary life without performing it for a scoreboard." },
          { label: "4", title: "Observe", text: "Notice outcomes, surprises, trade-offs and who was affected." },
          { label: "5", title: "Revise", text: "Keep, change, stop, share or teach—with provenance intact." },
        ],
      },
    ],
  },
  {
    slug: "alignment-lab",
    file: "alignment-lab.html",
    navLabel: "Alignment Lab",
    title: "Turn values into inspectable, revisable records.",
    eyebrow: "Alignment Lab",
    status: "Prototype spine",
    description:
      "A local-first laboratory for definitions, preference comparisons, lived experiments and provenance-rich exports.",
    intro:
      "The Lab is being built as a set of browser-local tools. Your words remain on your device unless you deliberately download or share them.",
    question: "What should future AI learn to notice that current systems ignore?",
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
    title: "Grow context, not a pile of polished answers.",
    eyebrow: "Data Garden",
    status: "Research direction",
    description:
      "A provenance-first commons for plural human signals, awkward edge cases, lived outcomes and revisions.",
    intro:
      "Synthetic scenarios can widen imagination, but they need visible provenance and human grounding. The garden protects original contributions, minority views and changes of mind.",
    question: "What would you regret teaching future models through your behaviour today?",
    sections: [
      {
        title: "Every record needs roots.",
        cards: [
          { label: "Source", title: "Who or what authored it?", text: "Human, AI-assisted, synthetic or mixed—and which tool or seed mattered." },
          { label: "Context", title: "Where does it belong?", text: "Domain, place, culture, stakeholders, time horizon and known blind spots." },
          { label: "Permission", title: "Who may use it?", text: "Consent, privacy, licence, intended use, prohibited use and review state." },
          { label: "Outcome", title: "What happened next?", text: "Observed effects, surprises, revisions and unresolved disagreement." },
        ],
      },
    ],
  },
  {
    slug: "simulations",
    file: "simulations.html",
    navLabel: "Simulations",
    title: "Live inside a choice before pretending to know it.",
    eyebrow: "Synthetic futures",
    status: "Prototype planned",
    description:
      "Branching, clearly synthetic scenarios for comparing benefits, harms, externalities and future consequences.",
    intro:
      "A simulation is not a forecast and not evidence that an event occurred. It is a structured rehearsal that helps reveal assumptions and missing options.",
    question: "Which future would you choose after living inside its consequences?",
    sections: [
      {
        title: "A branch should show its costs.",
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
    title: "Reward outcomes, not the appearance of virtue.",
    eyebrow: "Live experiments",
    status: "Invitation",
    description:
      "Small, voluntary, documented experiments in homes, projects, events and communities.",
    intro:
      "The experiment lane begins with an ordinary practice, a baseline and an honest boundary. There are no points for looking aligned.",
    question: "What did your chosen action make easier—and what did it make invisible?",
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
        title: "Connect without absorbing.",
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
      "Older planning documents are treated as unbuilt technical source material. Their useful systems thinking can inform run-sheets, maps, simulations, guest workflows and feedback without inventing a pilot.",
    question: "What infrastructure would need to exist before a planetary event deserved public trust?",
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
      "Culture is not decorative wrapping for a technical project. It is where people rehearse identity, conflict, joy, grief, belonging and futures together.",
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
      "Longer life is not automatically a better life. The additional time could hold love, play, art, care, science, healing, community, adventure and repair.",
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
      "You do not need machine-learning language to know when a tool increases your agency, when a system makes someone invisible or when a day contains enough.",
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
      "GAJRA does not replace interpretability, cybersecurity, evals, scalable oversight, governance, containment or capability safety. It proposes complementary artefacts about plural flourishing and observed consequences.",
    question: "Which positive capabilities are current evaluations failing to notice?",
    sections: [
      {
        title: "Candidate collaboration lanes.",
        cards: [
          { label: "Values", title: "Participatory elicitation", text: "Culturally contextualised definitions with disagreement and revision preserved." },
          { label: "Data", title: "Preferences with reasons", text: "Pair choices with context, uncertainty, externalities and changes after consequences." },
          { label: "Evals", title: "Flourishing and proxy failure", text: "Test positive capability, responsibility and reward-hacking cases without claiming one final metric." },
          { label: "Trust", title: "Provenance and consent", text: "Dataset cards, human seeds, synthetic labels, prohibited uses and review states." },
        ],
      },
    ],
  },
  {
    slug: "ai-builders",
    file: "ai-builders.html",
    navLabel: "For AI builders",
    title: "Build tools that remain answerable to their context.",
    eyebrow: "AI builder pathway",
    status: "Open invitation",
    description:
      "Schemas, local-first prototypes and evaluation material for independent builders and open-source communities.",
    intro:
      "The practical invitation is to create inspectable tools: no invisible transmission, no unlabelled synthetic loop and no claim that a static export automatically becomes training data.",
    question: "What does your tool optimise—and what does that optimisation hide?",
    sections: [
      {
        title: "Buildable now.",
        cards: [
          { label: "Local", title: "Private browser builders", text: "Forms and journals that store nothing remotely by default." },
          { label: "Portable", title: "Readable exports", text: "Markdown for people; JSON, JSONL or CSV for inspection and later curation." },
          { label: "Reviewable", title: "Schemas with provenance", text: "Authorship, assistance, consent, uncertainty, licence and revision history." },
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
    title: "Show the source. Name the leap.",
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
    title: "Visionary, without pretending the vision already operates.",
    eyebrow: "Reality layer",
    status: "Current status",
    description:
      "What exists, what is proposed, what did not launch and what this site does not imply.",
    intro:
      "GAJRA Earth is an evolving concept and public experiment. It is not currently a registered global association.",
    question: "Which claim on this site deserves stronger evidence or a narrower label?",
    sections: [
      {
        title: "Clear boundaries.",
        cards: [
          { label: "Did not launch", title: "Live Aid 2025", text: "The planned event did not occur. It belongs to the learning archive." },
          { label: "Did not launch", title: "ICO and DAO", text: "Token and governance material is historical or exploratory, not an active offer." },
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
      "An honest timeline from early GAJRA and ICO/DAO plans towards local practice, simulations and lived alignment data.",
    intro:
      "Earlier ambition is preserved because learning needs a memory. It is neither hidden nor allowed to dominate the current invitation.",
    question: "What did progress give us, and what did it quietly optimise away?",
    sections: [
      {
        title: "A short evolution.",
        cards: [
          { label: "Earlier", title: "Umbrella ideas", text: "GAJRA, Aura, civic tools, digital twins, culture and a global invitation formed a broad ecosystem." },
          { label: "2024–2025", title: "Token, DAO and Live Aid plans", text: "Large launch narratives were explored. The ICO and Live Aid 2025 did not launch." },
          { label: "2026", title: "Public tools and honest boundaries", text: "The work shifted towards local-first builders, source trails, events, simulations and lived practice." },
          { label: "Now", title: "The participatory alignment layer", text: "Define, choose, simulate, live, observe, revise, share and teach." },
        ],
        links: [
          { label: "Open the preserved 2025-era site", href: "archive/legacy-2025/index.html" },
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
      "Contribution begins with a perspective, a source, an experiment or a challenge—not with agreement or institutional membership.",
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
