export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string; // could be raw markdown or JSX string
};

export const posts: Post[] = [
  {
    slug: "neuro-hacks",
    title: "Neuro Hacks for Focus",
    excerpt: "Quick tips to sharpen memory and attention.",
    date: "2026-02-13",
    content: "Full content goes here...",
  },
  {
    slug: "memory-river-guide",
    title: "Memory River: Beginner's Guide",
    excerpt: "Everything you need to start flowing through neuro-challenges.",
    date: "2026-02-12",
    content: "Full content goes here...",
  },
];