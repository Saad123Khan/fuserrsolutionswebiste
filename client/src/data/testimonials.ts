export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional photo path in /public. */
  avatar?: string;
}

/**
 * TODO(content): these four are carried over unchanged from the old site and
 * were written for the white-label/agency positioning. Replace with real client
 * reviews (name, role, company, photo — with permission) before launch.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'Their team delivered a complete SaaS platform in 10 weeks — fully under our brand. The code quality was exceptional.',
    author: 'Marcus Webb',
    role: 'Director',
    company: 'Luminary Digital Agency',
  },
  {
    quote: 'We went from turning down projects to confidently pitching mobile app work. Fuserr handles everything behind the scenes.',
    author: 'Priya Nair',
    role: 'Founder',
    company: 'Nexus Growth Studio',
  },
  {
    quote: "The NDA was signed within the hour, kickoff was the next day. They matched our client's brand guide exactly.",
    author: 'Tom Hartley',
    role: 'Managing Partner',
    company: 'Hartley & Co Consulting',
  },
  {
    quote: 'I was worried about losing control of my client relationships. Instead, Fuserr made me look like a rockstar.',
    author: 'Sarah Osei',
    role: 'CEO',
    company: 'Osei Creative Group',
  },
];
