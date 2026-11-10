import { HeartPulse, Dumbbell, GraduationCap, ShoppingBag, Home, Truck, type LucideIcon } from 'lucide-react';

export interface Industry {
  /** Must match `project.industry` so related projects are found automatically. */
  name: string;
  slug: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  challenge: string;
  solutions: string[];
}

/** Industries we have shipped real projects in. */
export const industries: Industry[] = [
  {
    name: 'Healthcare',
    slug: 'healthcare',
    icon: HeartPulse,
    accent: '#10B981',
    description: 'Patient portals, telehealth and HIPAA-ready platforms.',
    challenge: 'Fragmented patient data, manual workflows and strict compliance requirements slow down care.',
    solutions: ['Patient & provider portals', 'Telehealth consultations', 'Lab & pharmacy integrations', 'Consent & compliance tracking'],
  },
  {
    name: 'Logistics',
    slug: 'logistics',
    icon: Truck,
    accent: '#EF4444',
    description: 'Freight marketplaces, tracking and fleet operations.',
    challenge: 'Customers and carriers need real-time visibility, fair pricing and reliable payments in one place.',
    solutions: ['Parcel booking marketplaces', 'Real-time shipment tracking', 'Dynamic route pricing', 'Automated payouts'],
  },
  {
    name: 'Ecommerce',
    slug: 'ecommerce',
    icon: ShoppingBag,
    accent: '#F59E0B',
    description: 'Online stores, AI shopping assistants and checkout flows.',
    challenge: 'Shoppers drop off when discovery is slow, checkout is clunky or orders are hard to track.',
    solutions: ['Custom storefronts & ordering', 'AI shopping assistants', 'Payments & invoicing', 'Shipping integrations'],
  },
  {
    name: 'Home Services',
    slug: 'home-services',
    icon: Home,
    accent: '#7C3AED',
    description: 'On-demand booking marketplaces for service providers.',
    challenge: 'Matching customers with trusted local pros, pricing jobs fairly and handling payouts is hard to do manually.',
    solutions: ['Customer & provider apps', 'Location-based matching', 'Dynamic pricing engines', 'Wallets & payouts'],
  },
  {
    name: 'Education',
    slug: 'education',
    icon: GraduationCap,
    accent: '#8B5CF6',
    description: 'Learning platforms with AI-driven personalisation.',
    challenge: 'One-size-fits-all courses lose learners, and instructors lack insight into progress.',
    solutions: ['Learning management systems', 'Personalised learning paths', 'Progress analytics', 'AI tutoring features'],
  },
  {
    name: 'Health & Fitness',
    slug: 'health-fitness',
    icon: Dumbbell,
    accent: '#3B82F6',
    description: 'Coaching, nutrition and wellness apps.',
    challenge: 'Generic plans fail users; personal coaching does not scale without the right technology.',
    solutions: ['AI workout & meal plans', 'Conversational coaching', 'Subscriptions & referrals', 'Progress tracking'],
  },
];
