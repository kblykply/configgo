// /data/blogs.ts
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string; // /public/... path
  category: string;
  tags: string[];
  date: string; // ISO date
  readTime: number; // minutes
  author?: { name: string; avatar?: string };
  content: Array<
    | { type: "h2"; text: string }
    | { type: "p"; text: string }
    | { type: "img"; src: string; alt?: string; caption?: string }
    | { type: "quote"; text: string; cite?: string }
    | { type: "list"; items: string[] }
  >;
};

export const BLOGS: BlogPost[] = [
  {
    slug: "digital-twin-guide-2025",
    title: "Digital Twins in Real Estate 2025: From Sales Tool to Live Operations",
    excerpt:
      "A practical guide to turning a marketing twin into a source of truth across sales, handover, and post-occupancy operations.",
    cover: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
    category: "Product",
    tags: ["Digital Twin", "CRM", "Operations"],
    date: "2025-06-09",
    readTime: 8,
    author: { name: "Selin Kaya" },
    content: [
      { type: "p", text: "Digital twins are no longer just showpieces. When modeled with the right data contracts and synced with CRM, they become a living product that shortens sales cycles and reduces handover friction." },
      { type: "h2", text: "What a working twin actually contains" },
      { type: "list", items: [
        "Geometry & media: GLB/IFC + plan images, views, amenity photos",
        "Data: unit types, areas, price bands, statuses, incentives",
        "Context: sun-path, weather presets, nearby locations with real distances",
      ]},
      { type: "h2", text: "Sales to operations pipeline" },
      { type: "p", text: "Keep one model. In sales, you filter and reserve units; at handover you attach snag lists and manuals; in operations, you visualize tickets spatially. The twin stays the interface—data sources evolve." },
      { type: "h2", text: "Minimum viable integration" },
      { type: "list", items: [
        "Read unit availability & pricing from CRM (cron or webhook)",
        "Write lead forms + reservations back to CRM",
        "Expose a lightweight embed for kiosk/tablet/web",
      ]},
      { type: "quote", text: "Start with one truth: the unit list. Everything else can iterate.", cite: "Configgo Field Notes" },
      { type: "img", src: "https://images.pexels.com/photos/31370919/pexels-photo-31370919.jpeg ", alt: "Isometric smart city visual", caption: "A single visual language across web, tablet, and kiosk." },
      { type: "h2", text: "Implementation checklist" },
      { type: "list", items: [
        "Decide your source of truth (CRM or inventory sheet) and lock the schema",
        "Publish GLB with named nodes for units/blocks to bind data",
        "Add lead capture + context screens (views, amenities, locations)",
        "Measure: demo completion, time-to-reservation, drop-off points",
      ]},
    ],
  },

  {
    slug: "interactive-walkthroughs-mobile",
    title: "Interactive Walkthroughs on Mobile: Engaging Buyers On-the-Go",
    excerpt:
      "Mobile-first 3D walkthroughs and digital twins can shorten sales cycles by meeting buyers where they already are.",
    cover: "https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg",
    category: "Architecture",
    tags: ["Digital Twin", "Mobile", "Sales Tools"],
    date: "2025-06-05",
    readTime: 6,
    author: { name: "Selin Kaya" },
    content: [
      { type: "p", text: "Over 70% of first-touch demos happen on phones. If your interface isn’t thumb-optimized, you’re losing intent before the second screen." },
      { type: "h2", text: "Design for thumbs, not cursors" },
      { type: "list", items: [
        "Tap targets ≥ 44px; keep important controls within the lower 60% of the screen",
        "One-hand navigation: swipe to rotate, pinch to zoom, double-tap to focus",
        "Save state so buyers can resume later without reloading assets",
      ]},
      { type: "h2", text: "Streaming strategy" },
      { type: "p", text: "Lazy-load GLB chunks, ship web-friendly textures (AVIF/WebP), and defer analytics until after first interaction to protect time-to-first-view." },
      { type: "img", src: "https://images.pexels.com/photos/33750069/pexels-photo-33750069.jpeg", alt: "Smartphone with 3D city", caption: "A compact UI still communicates scale and context." },
      { type: "quote", text: "Fewer buttons, more gestures. Teach the model, not the menu.", cite: "UX mantra" },
    ],
  },

  {
    slug: "digital-twins-for-sales-centers",
    title: "Digital Twins for Experience Centers",
    excerpt:
      "Use a synchronized model across kiosks, tablets, and the web to deliver a consistent buying journey.",
    cover: "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg",
    category: "Experience Center",
    tags: ["Kiosk", "Real-Time", "3D"],
    date: "2025-05-21",
    readTime: 5,
    author: { name: "Emre Yıldız" },
    content: [
      { type: "p", text: "Experience centers thrive on clarity and flow. A digital twin becomes your single source of visual truth: the same inventory, pricing, and media everywhere." },
      { type: "h2", text: "One model, many surfaces" },
      { type: "p", text: "Wall screens run a guided loop; tablets enable filters and forms; kiosks handle self-serve browsing. The dataset is identical—only the UI changes." },
      { type: "h2", text: "Queue-proofing the floor" },
      { type: "list", items: [
        "Attract loop → touch to explore → capture lead → handoff to agent",
        "Agent view shows recent interactions and shortlisted units",
        "Local cache for spotty Wi-Fi; sync deltas when the connection returns",
      ]},
      { type: "quote", text: "Consistency beats spectacle. Buyers want the same truth at every touchpoint.", cite: "Configgo Team" }
    ],
  },

  {
    slug: "real-time-3d-web-patterns",
    title: "Tech Patterns for Real-Time 3D on the Web",
    excerpt:
      "Latency budgets, asset pipelines, and when to lean on engine features vs. custom shaders—field notes from production apps.",
    cover: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg",
    category: "Engineering",
    tags: ["WebGL", "GLB", "Pipelines"],
    date: "2025-05-30",
    readTime: 7,
    author: { name: "Configgo Engineering" },
    content: [
      { type: "p", text: "Real-time 3D success is mostly pipeline discipline. Treat your assets and shaders like product code." },
      { type: "h2", text: "Latency budget" },
      { type: "list", items: [
        "TTFV < 3s on Wi-Fi; < 5s on 4G for the first interactive view",
        "Background-stream heavy media; promote critical textures first",
        "Frame stability > peak FPS; aim for 30fps sustained on mid-tier phones",
      ]},
      { type: "h2", text: "Asset & shader choices" },
      { type: "p", text: "Prefer GLB with KTX2 textures; pack variations as material presets. Use baked lighting where possible; reserve dynamic lights for hero shots." },
      { type: "img", src: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg", alt: "Developer screen with code", caption: "Profiling time varies by device—budget for it." },
      { type: "quote", text: "The best optimization is deleting what you don’t need.", cite: "Every performance engineer ever" },
    ],
  },

  {
    slug: "amenities-that-sell",
    title: "Amenities That Actually Sell Homes",
    excerpt:
      "Pools and gyms look great in renders—but buyers ask about sunlight, noise, and grocery distance.",
    cover: "https://images.pexels.com/photos/7535059/pexels-photo-7535059.jpeg",
    category: "Insights",
    tags: ["Amenities", "Buyer Psychology"],
    date: "2025-04-30",
    readTime: 4,
    author: { name: "Berkay İncedal" },
    content: [
      { type: "p", text: "We analyzed thousands of sales chats. The amenities that drive decisions aren’t always the glossy ones—they’re the ones that reduce daily friction." },
      { type: "h2", text: "What buyers really ask" },
      { type: "list", items: [
        "Sunlight by time of day; view quality from the exact unit",
        "Noise exposure (roads, schools, nightlife) and parking access",
        "Walking times to groceries, parks, and public transport",
      ]},
      { type: "img", src: "https://images.pexels.com/photos/167200/pexels-photo-167200.jpeg", alt: "Modern residential towers", caption: "Design the amenity story around real-life routines." },
      { type: "h2", text: "Show, don’t tell" },
      { type: "p", text: "Use the twin to simulate sun-path, reveal actual distances, and preview common-area flows. Back every claim with an interactive proof." },
    ],
  },
];

export function getAllPosts() {
  return [...BLOGS].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string) {
  return BLOGS.find((p) => p.slug === slug) ?? null;
}
