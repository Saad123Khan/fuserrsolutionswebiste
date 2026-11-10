export interface FAQItem {
  q: string;
  a: string;
}

// TODO(content): confirm payment terms and support details with the team.
export const faqs: FAQItem[] = [
  {
    q: 'How much does it cost to build my software?',
    a: 'Every project is different, so we quote after a free discovery call. Depending on scope we can start with a focused MVP and grow in phases. You get a detailed, fixed proposal before any work begins.',
  },
  {
    q: 'How long will my project take?',
    a: 'A marketing website usually takes 2–4 weeks, an MVP 6–12 weeks, and larger platforms are delivered in phases. We share a timeline with clear milestones in the proposal and demo progress every week.',
  },
  {
    q: 'Who owns the code and designs?',
    a: 'You do. Once the project is paid for, all source code, designs, assets and documentation are handed over to you. No licensing fees and no lock-in.',
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes. We are happy to sign an NDA before you share any details about your idea, and we treat your data and IP as confidential throughout.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes. We offer monthly maintenance plans covering monitoring, bug fixes, security updates and new features, so your product keeps improving after go-live.',
  },
  {
    q: 'What are your payment terms?',
    a: 'Fixed-price projects are usually split into milestones (for example an upfront deposit, then payments as milestones are delivered). Dedicated-team and hourly engagements are billed monthly.',
  },
];
