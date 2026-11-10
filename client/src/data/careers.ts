import { Rocket, GraduationCap, Users, Laptop, TrendingUp, HeartHandshake, type LucideIcon } from 'lucide-react';
import { company } from '@/data/company';

export interface Opening {
  slug: string;
  title: string;
  department: 'Engineering' | 'Design' | 'Product' | 'Operations' | 'Sales';
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
}

/** Address applications are sent to. TODO(content): use a dedicated careers inbox if there is one. */
export const careersEmail = company.email;

/**
 * Open roles. Leave empty when not hiring — the page then shows a
 * "send us your CV" card instead.
 *
 * Example entry:
 * {
 *   slug: 'senior-react-developer',
 *   title: 'Senior React Developer',
 *   department: 'Engineering',
 *   type: 'Full-time',
 *   location: 'Karachi (On-site / Hybrid)',
 *   experience: '4+ years',
 *   summary: 'Build fast, polished web apps for clients across industries.',
 *   responsibilities: ['Own features end to end', 'Review code and mentor juniors'],
 *   requirements: ['Strong React + TypeScript', 'Experience with REST/GraphQL APIs'],
 *   niceToHave: ['Next.js', 'Testing with Playwright'],
 * },
 */
export const openings: Opening[] = [];

// TODO(content): confirm these perks reflect what the company actually offers.
export const perks: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Rocket, title: 'Real products', description: 'Ship software that real customers use, across healthcare, logistics, ecommerce and more.' },
  { icon: GraduationCap, title: 'Learn every day', description: 'Mentorship from senior engineers, code reviews and time to explore new tools.' },
  { icon: Laptop, title: 'Modern stack', description: 'React, Next.js, React Native, Node.js, AI tooling and cloud — no legacy maintenance-only work.' },
  { icon: TrendingUp, title: 'Room to grow', description: 'Clear growth paths, ownership of features and responsibility as you prove yourself.' },
  { icon: Users, title: 'Small, senior team', description: 'Work closely with founders and leads. Your ideas are heard and your impact is visible.' },
  { icon: HeartHandshake, title: 'Supportive culture', description: 'Respectful, collaborative and low-ego. We help each other ship great work.' },
];

export const hiringSteps = [
  { title: 'Apply', description: 'Send your CV and a few lines about what you love building.' },
  { title: 'Intro call', description: 'A short chat about your experience, goals and the role.' },
  { title: 'Technical round', description: 'A practical task or live session based on real work, not trick puzzles.' },
  { title: 'Offer', description: 'Meet the team, discuss the offer and plan your first weeks.' },
];
