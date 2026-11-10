import { motion } from 'framer-motion';
import { CheckCircle2, FileCheck2, Users, Clock3 } from 'lucide-react';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;

const engagementModels = [
  {
    icon: FileCheck2,
    title: 'Fixed-price project',
    best: 'Best for clear scope',
    description: 'Agreed scope, timeline and price up front. Ideal for MVPs, websites and well-defined features.',
    points: ['Detailed proposal & milestones', 'Predictable budget', 'Milestone-based payments'],
  },
  {
    icon: Users,
    title: 'Dedicated team',
    best: 'Best for long-term products',
    description: 'A full-time team of engineers, designers and a PM working as an extension of your company.',
    points: ['Scale the team up or down', 'Your priorities, every sprint', 'Monthly billing'],
  },
  {
    icon: Clock3,
    title: 'Time & materials',
    best: 'Best for evolving scope',
    description: 'Flexible hourly engagement for ongoing improvements, support or exploratory work.',
    points: ['Pay for actual hours', 'Change direction anytime', 'Transparent time reports'],
  },
];

/** Fixed-price / dedicated team / time & materials cards. */
export default function EngagementModels() {
  return (
    <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Ways to work together"
          title={['Engagement models that', { text: 'fit your project', className: 'text-gradient' }]}
          description="Choose the model that matches your scope and stage. You can always switch later."
          className="mb-14"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {engagementModels.map(({ icon: Icon, title, best, description, points }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
            >
              <SpotlightCard className="group flex h-full flex-col p-8 transition-transform duration-300 hover:-translate-y-1">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-600/20 bg-blue-600/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon size={21} className="text-blue-600 dark:text-blue-400" />
                </span>
                <div className="mb-1 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">{best}</div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{description}</p>
                <ul className="mt-auto space-y-2.5 border-t border-slate-100 pt-6 dark:border-navy-500/30">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
                      <CheckCircle2 size={15} className="shrink-0 text-blue-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
