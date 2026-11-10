/**
 * Single source of truth for company facts shown across the site.
 *
 * TODO(content): every number below is a PLACEHOLDER carried over from the old
 * homepage. Replace with real figures before launch.
 */
export const company = {
  name: 'Fuserr Solutions',
  email: 'contact@fuserrsolutions.com',
  phone: '+92 333 7804685',
  phoneHref: 'tel:+923337804685',
  address: 'Ground Floor 1-H-1/22, Nazimabad No. 1, Karachi, Pakistan',
  rating: 4.9,
  /** Public Calendly booking link used by every "Book a call" button. Leave empty to fall back to /contact. */
  calendlyUrl: 'https://calendly.com/fahad-fuserrsolutions/30min',
};

/**
 * Link that opens a pre-filled Gmail compose window in the browser.
 * Used instead of `mailto:` because mailto does nothing on computers
 * without a desktop mail app. Open it in a new tab.
 */
export function gmailLink({ to = company.email, subject = '', body = '' }: { to?: string; subject?: string; body?: string } = {}) {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Props for an <a> that opens Gmail compose in a new tab. */
export const gmailAnchor = (opts?: Parameters<typeof gmailLink>[0]) => ({
  href: gmailLink(opts),
  target: '_blank',
  rel: 'noopener noreferrer',
});

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

// TODO(content): placeholder numbers — confirm founded year, projects, clients, retention.
export const stats: Stat[] = [
  {
    value: 6,
    suffix: '+',
    label: 'Years of experience',
    description: 'Building production software for startups and growing businesses.',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Projects delivered',
    description: 'Web, mobile, SaaS and AI products shipped to real users.',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Industries served',
    description: 'From healthcare and logistics to ecommerce and education.',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client retention',
    description: 'Clients who come back to us for their next build.',
  },
];
