import { Rocket, Smartphone, BrainCircuit, ClipboardList, type LucideIcon } from 'lucide-react';

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'callout'; text: string };

export type PostCategory = 'Product' | 'Engineering' | 'AI' | 'Design';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  author: string;
  icon: LucideIcon;
  accent: string;
  featured?: boolean;
  body: PostBlock[];
}

export const categoryColors: Record<PostCategory, string> = {
  Product: '#3B82F6',
  Engineering: '#06B6D4',
  AI: '#8B5CF6',
  Design: '#EC4899',
};

// TODO(content): these starter articles were drafted for launch — review and edit before publishing.
export const posts: Post[] = [
  {
    slug: 'mvp-vs-full-product',
    title: 'MVP or full product? How to decide what to build first',
    excerpt: 'Building everything at once is the most expensive way to find out what your users actually want. Here is how we help clients scope a first release.',
    category: 'Product',
    date: '2026-11-03',
    author: 'Fuserr Team',
    icon: Rocket,
    accent: '#3B82F6',
    featured: true,
    body: [
      { type: 'p', text: 'Almost every new client arrives with a long feature list. That is a good sign: it means they have thought deeply about their users. But shipping all of it in the first release is rarely the fastest or cheapest path to a successful product.' },
      { type: 'h2', text: 'What an MVP really is' },
      { type: 'p', text: 'A minimum viable product is not a half-finished app. It is the smallest version of your product that solves one important problem well enough that real people will use it, and ideally pay for it. Everything else can wait until you have evidence.' },
      { type: 'h2', text: 'Questions we ask during scoping' },
      { type: 'list', items: [
        'Who is the very first user, and what is the one job they need done?',
        'Which features are essential for that job, and which are nice to have?',
        'What can be handled manually behind the scenes at first?',
        'What would prove the idea is working within a few weeks of launch?',
      ] },
      { type: 'callout', text: 'Rule of thumb: if a feature does not help your first users complete their core job, move it to "later".' },
      { type: 'h2', text: 'When a fuller first release makes sense' },
      { type: 'p', text: 'Some products cannot launch small. Regulated platforms such as telehealth need compliance, consent tracking and audit logs from day one. Marketplaces need both sides of the market to have a usable experience. In those cases we still prioritise ruthlessly, but the baseline is higher.' },
      { type: 'h2', text: 'Plan for what comes next' },
      { type: 'p', text: 'A good MVP is built on foundations that can grow: clean architecture, a sensible data model and automated deployments. That way, the features you postponed can be added quickly once users tell you they want them.' },
      { type: 'quote', text: 'Launch the smallest thing that teaches you the most.' },
    ],
  },
  {
    slug: 'react-native-vs-flutter',
    title: 'React Native vs Flutter: how we choose for client apps',
    excerpt: 'Both frameworks ship great cross-platform apps. The right choice depends on your team, your product and what you already have.',
    category: 'Engineering',
    date: '2026-10-21',
    author: 'Fuserr Team',
    icon: Smartphone,
    accent: '#06B6D4',
    body: [
      { type: 'p', text: 'Clients often ask which cross-platform framework is "best". The honest answer is that both React Native and Flutter are mature and capable. We have shipped production apps with cross-platform tools for marketplaces, coaching and logistics. What matters is fit.' },
      { type: 'h2', text: 'When we lean towards React Native' },
      { type: 'list', items: [
        'You already have a React or Next.js web app and want to share logic and developers.',
        'Your team knows JavaScript or TypeScript well.',
        'You want to use the large npm ecosystem for integrations.',
      ] },
      { type: 'h2', text: 'When Flutter can be a better fit' },
      { type: 'list', items: [
        'The design is highly custom and needs pixel-identical rendering on both platforms.',
        'There is no existing web codebase to share with.',
        'Your future team is comfortable with Dart.',
      ] },
      { type: 'h2', text: 'When to go native' },
      { type: 'p', text: 'Heavy use of device hardware, advanced graphics or platform-specific features can justify separate Swift and Kotlin apps. It costs more to build and maintain, so we only recommend it when the product genuinely needs it.' },
      { type: 'callout', text: 'Whatever we choose, we design one backend API that powers your mobile apps and web dashboard together.' },
      { type: 'h2', text: 'The bottom line' },
      { type: 'p', text: 'Pick the framework that matches your people and your product, not the one that is trending. During discovery we walk through these trade-offs with you before a single line of code is written.' },
    ],
  },
  {
    slug: 'adding-ai-to-your-product',
    title: 'Adding AI to your product without the hype',
    excerpt: 'Practical AI features that customers actually use, and how to ship them responsibly: grounded answers, guardrails and measurable results.',
    category: 'AI',
    date: '2026-10-08',
    author: 'Fuserr Team',
    icon: BrainCircuit,
    accent: '#8B5CF6',
    body: [
      { type: 'p', text: 'Large language models make it possible to add genuinely useful features to almost any product. They also make it easy to ship something impressive in a demo that disappoints in production. The difference is in how you choose and build the feature.' },
      { type: 'h2', text: 'Start with a real problem' },
      { type: 'p', text: 'The best AI features remove a specific, repeated pain: finding the right product in a large catalogue, writing a first draft, summarising long documents or answering the same support question for the hundredth time.' },
      { type: 'h2', text: 'Ground the answers in your data' },
      { type: 'p', text: 'Generic models do not know your products, policies or customers. Retrieval-augmented generation (RAG) lets the model look up relevant information from your own content before it answers, which makes responses more accurate and easier to trust.' },
      { type: 'h2', text: 'Build in guardrails' },
      { type: 'list', items: [
        'Limit what the assistant is allowed to talk about and do.',
        'Show sources or product cards so users can verify answers.',
        'Hand off to a human when confidence is low.',
        'Log and review conversations to improve quality over time.',
      ] },
      { type: 'h2', text: 'Measure what matters' },
      { type: 'p', text: 'Decide upfront how you will judge success: conversion, time saved, tickets deflected or user satisfaction. Then track cost per request alongside it, so the feature stays profitable as usage grows.' },
      { type: 'quote', text: 'Good AI features feel less like magic and more like a helpful colleague who knows your business.' },
    ],
  },
  {
    slug: 'prepare-for-discovery-call',
    title: 'What to prepare before your first call with a development team',
    excerpt: 'You do not need a 50-page spec. A few clear answers make your first conversation far more productive and your estimate far more accurate.',
    category: 'Product',
    date: '2026-09-24',
    author: 'Fuserr Team',
    icon: ClipboardList,
    accent: '#10B981',
    body: [
      { type: 'p', text: 'A discovery call is where your idea starts turning into a plan. You do not need technical knowledge or detailed documents, but a little preparation helps us understand your goals quickly and give you a realistic proposal.' },
      { type: 'h2', text: 'Five things worth thinking about' },
      { type: 'list', items: [
        'The problem: what is broken or missing today, and for whom?',
        'Your users: who will use the product, and on which devices?',
        'Must-haves: the three to five features without which the product makes no sense.',
        'Examples: apps or websites you like, and what you like about them.',
        'Constraints: target launch date, budget range and any compliance needs.',
      ] },
      { type: 'h2', text: 'Bring what you already have' },
      { type: 'p', text: 'Sketches, spreadsheets, existing designs, a current website or an old codebase are all useful. Even rough notes help us ask better questions.' },
      { type: 'callout', text: 'Worried about sharing your idea? We are happy to sign an NDA before the call.' },
      { type: 'h2', text: 'What happens after the call' },
      { type: 'p', text: 'We follow up with a proposal covering scope, milestones, timeline and cost. If something is still unclear, we suggest a short paid discovery phase to design key screens and validate assumptions before full development.' },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string | undefined) => posts.find((p) => p.slug === slug);

export function readingTime(post: Post) {
  const words = post.body
    .map((b) => ('text' in b ? b.text : b.items.join(' ')))
    .join(' ')
    .split(/\s+/).length;
  // ~200 words per minute, rounded up so short articles don't all show "1 min"
  return Math.max(1, Math.ceil(words / 200));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
