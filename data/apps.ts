export type App = {
  slug: string;           // unique URL id
  name: string;           // display name
  desc: string;           // short description
  tagline?: string;       // optional punchline
  link?: string;          // optional external link
  img?: string;           // optional image URL (place in public/images/apps/)
  featured?: boolean;     // optional highlight
  category?: string;      // optional category/tag
};

export const apps: App[] = [
  {
    slug: "dotlife",
    name: "DotLife",
    desc: "Simulate and explore AI-driven life scenarios.",
    tagline: "Your digital ecosystem awaits.",
    link: "#",
    img: "/images/apps/dotlife.png",
    featured: true,
    category: "Simulation",
  },
  {
    slug: "combo-collapse",
    name: "Combo Collapse",
    desc: "Fast-paced puzzle combos to sharpen reflexes.",
    tagline: "Think fast, collapse faster.",
    link: "#",
    img: "/images/apps/combo-collapse.png",
    category: "Puzzle",
  },
  {
    slug: "neural-bridge",
    name: "Neural Bridge",
    desc: "Minimalist memory challenge for deep focus.",
    tagline: "Connect the lights, train your mind.",
    link: "#",
    img: "/images/apps/neural-bridge.png",
    featured: true,
    category: "Cognitive",
  },
  {
    slug: "di-atomic",
    name: "DI-ATOMIC",
    desc: "Play with atomic patterns and watch them react.",
    tagline: "Physics meets art.",
    link: "#",
    img: "/images/apps/di-atomic.png",
    category: "Experimental",
  },
  {
    slug: "sum-neon",
    name: "SUM NEON",
    desc: "Neon math puzzle to test speed and accuracy.",
    tagline: "Bright, fast, and addictive.",
    link: "#",
    img: "/images/apps/sum-neon.png",
    category: "Puzzle",
  },
  {
    slug: "asketic-flow",
    name: "Asketic Flow",
    desc: "Guided meditation and focus routines.",
    tagline: "Flow state unlocked.",
    link: "#",
    img: "/images/apps/asketic-flow.png",
    category: "Wellness",
  },
  {
    slug: "asketic-fit",
    name: "Asketic Fit",
    desc: "Inclusive fitness routines for all levels.",
    tagline: "Your body, your pace.",
    link: "#",
    img: "/images/apps/asketic-fit.png",
    category: "Wellness",
  },
  {
    slug: "sipr-drink-reminder",
    name: "SIPR Drink Reminder",
    desc: "Never forget to stay hydrated again.",
    tagline: "Sip smart, live well.",
    link: "#",
    img: "/images/apps/sipr-drink-reminder.png",
    category: "Utility",
  },
];