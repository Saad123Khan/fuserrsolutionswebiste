import { motion } from 'framer-motion';
import { Users, CalendarCheck, MessagesSquare, KeyRound, LifeBuoy, ShieldCheck, type LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/motion/SpotlightCard';

const reasons: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Users,
    title: 'Senior engineers',
    description: 'Experienced developers and designers work on your product, not interns learning on your budget.',
  },
  {
    icon: CalendarCheck,
    title: 'On time, on budget',
    description: 'Clear scope, fixed milestones and honest estimates. No surprise invoices, no endless delays.',
  },
  {
    icon: MessagesSquare,
    title: 'Transparent communication',
    description: 'A dedicated project manager, weekly demos and a shared board, so you always know where things stand.',
  },
  {
    icon: KeyRound,
    title: 'You own everything',
    description: 'Full source code, designs and documentation are yours. No lock-in, no licensing fees.',
  },
  {
    icon: LifeBuoy,
    title: 'Support after launch',
    description: 'We monitor, maintain and keep improving your product long after it goes live.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & confidential',
    description: 'NDA on request, secure coding practices and careful handling of your data and IP.',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Fuserr"
          title={['A partner that', { text: 'cares about your product', className: 'text-gradient' }]}
          description="We treat every project like it's our own. Here's what working with us looks like."
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: EASE }}
            >
              <SpotlightCard className="group h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-600/20 bg-blue-600/10 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon size={21} className="text-blue-600 dark:text-blue-400" />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-[#E8E8E8]">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
