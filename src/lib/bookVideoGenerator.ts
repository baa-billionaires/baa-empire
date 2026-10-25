import { BAABook, BookFilmScene } from '../types/library';

// High-definition cinematic visual archives categorized by book themes
const CINEMATIC_THEME_VISUALS: Record<string, string[]> = {
  ai_cyber: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1600&auto=format&fit=crop&q=85'
  ],
  space_cosmic: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1600&auto=format&fit=crop&q=85'
  ],
  blockchain_wealth: [
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1625314897518-bb79cb38b14e?w=1600&auto=format&fit=crop&q=85'
  ],
  story_thriller: [
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1600&auto=format&fit=crop&q=85'
  ],
  nature_biosphere: [
    'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1600&auto=format&fit=crop&q=85'
  ]
};

/**
 * Determine the visual palette and scenery set based on book category and title keywords
 */
export function getVisualThemeForBook(book: BAABook): keyof typeof CINEMATIC_THEME_VISUALS {
  const text = `${book.title} ${book.category} ${book.subtitle}`.toLowerCase();
  if (text.includes('space') || text.includes('satellite') || text.includes('orbit') || text.includes('mars') || text.includes('energy')) {
    return 'space_cosmic';
  }
  if (text.includes('blockchain') || text.includes('crypto') || text.includes('wealth') || text.includes('finance') || text.includes('coin')) {
    return 'blockchain_wealth';
  }
  if (book.isStoryBook || text.includes('story') || text.includes('chronicle') || text.includes('heist') || text.includes('diary') || text.includes('void')) {
    return 'story_thriller';
  }
  if (text.includes('agriculture') || text.includes('farm') || text.includes('marine') || text.includes('environment') || text.includes('climate') || text.includes('serengeti')) {
    return 'nature_biosphere';
  }
  return 'ai_cyber';
}

/**
 * Generate full cinematic scenes for any book if not already embedded
 */
export function generateFilmScenesForBook(book: BAABook): BookFilmScene[] {
  if (book.filmScenes && book.filmScenes.length > 0) {
    return book.filmScenes;
  }

  const themeKey = getVisualThemeForBook(book);
  const visuals = CINEMATIC_THEME_VISUALS[themeKey];

  const authorName = book.authorName;
  const authorAlias = book.authorAlias;
  const title = book.title;
  const category = book.category;
  const synopsis = book.backCover?.synopsis || book.description;

  const cameraMovements: ('pan-left' | 'pan-right' | 'zoom-in' | 'zoom-out' | 'cinematic-drift')[] = [
    'zoom-in',
    'pan-right',
    'cinematic-drift',
    'pan-left',
    'zoom-out'
  ];

  return [
    {
      id: `scene-${book.id}-1`,
      sceneNumber: 1,
      title: 'Prologue: The Architectural Spark',
      narrativeScript: `In the dawn of sovereign intelligence, humanity stood at the crossroads of latency and autonomy. Conceived by ${authorName}, known as ${authorAlias}, "${title}" opens a portal into the future of ${category}. Where once human fatigue throttled progress, a new mathematical order emerges.`,
      visualPrompt: `Cinematic wide angle shot establishing ${title}, futuristic ambient lighting, glowing neural nodes, cinematic depth of field.`,
      artworkUrl: visuals[0],
      durationSeconds: 22,
      cameraMovement: cameraMovements[0],
      keyQuote: `“The only bottleneck left in modern enterprise is human latency.” — ${authorAlias}`,
      chapterAnchor: 1
    },
    {
      id: `scene-${book.id}-2`,
      sceneNumber: 2,
      title: 'Act I: The Blueprint of Invariance',
      narrativeScript: `Witness the architectural core. Here, algorithms transcend basic code and become sovereign economic agents. As detailed in the manuscript, every state transition is audited and immutably anchored to Base Layer 2. No middleman. No centralized toll booths. Pure, sovereign execution.`,
      visualPrompt: `Macro lens inspection of autonomous state machines, golden blockchain conduits, and high-frequency data streams.`,
      artworkUrl: visuals[1],
      durationSeconds: 24,
      cameraMovement: cameraMovements[1],
      keyQuote: `“A verified state transition on Base L2 is worth more than a thousand advisory promises.”`,
      chapterAnchor: 2
    },
    {
      id: `scene-${book.id}-3`,
      sceneNumber: 3,
      title: 'Act II: The Autonomous Swarm in Motion',
      narrativeScript: `The swarm awakens. Thirty specialized agents coordinate in synchronized harmony—from prompt orchestrators to technical code auditors. As ${synopsis.slice(0, 160)}... the swarm turns complex cognitive labor into fluid, 24/7 revenue.`,
      visualPrompt: `Dynamic visual swarm of cybernetic agents orchestrating industrial data pipelines across continental networks.`,
      artworkUrl: visuals[2],
      durationSeconds: 26,
      cameraMovement: cameraMovements[2],
      keyQuote: `“One disciplined engineer commanding an autonomous swarm out-produces an entire legacy agency.”`,
      chapterAnchor: 3
    },
    {
      id: `scene-${book.id}-4`,
      sceneNumber: 4,
      title: 'Act III: Industrial Impact & Real-World Proof',
      narrativeScript: `Theory meets sovereign ground. Across Pan-African hubs and global markets, students of the Billionaires AI Academy use these exact blueprints to deploy personal digital employees. From off-grid solar compute clusters to instant BaaCoin micropayments, the future is actively being manufactured.`,
      visualPrompt: `Modern tech founders in vibrant Lagos and Nairobi collaborating with holographic AI workstations under solar skylines.`,
      artworkUrl: visuals[3],
      durationSeconds: 25,
      cameraMovement: cameraMovements[3],
      keyQuote: `“Sovereign intelligence is not merely a competitive advantage; it is the modern power grid.”`,
      chapterAnchor: 4
    },
    {
      id: `scene-${book.id}-5`,
      sceneNumber: 5,
      title: 'Epilogue: The Sovereign Horizon',
      narrativeScript: `The journey does not end with reading; it begins with deployment. Authored with visionary conviction by ${authorName}, "${title}" stands as your definitive navigational compass. Step forward into the sovereign era of the Billionaires AI Academy. Your nodes are primed.`,
      visualPrompt: `Breathtaking cinematic horizon view of a solar-powered mega-city with orbital satellite constellations connecting sovereign creators worldwide.`,
      artworkUrl: visuals[4],
      durationSeconds: 24,
      cameraMovement: cameraMovements[4],
      keyQuote: `“Read the monograph. Command the swarm. Own your sovereign destiny.” — ${authorName}`,
      chapterAnchor: 5
    }
  ];
}
