import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Search, PenTool, Code2, Rocket, CheckCircle2, type LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const ROW_PITCH = 76;

interface Step {
  icon: LucideIcon;
  title: string;
  duration: string;
  description: string;
  points: string[];
  accent: string;
}

const steps: Step[] = [
  {
    icon: Search,
    title: 'Discover',
    duration: 'Week 1',
    description: 'We get to know your business, users and goals, then turn your idea into a clear scope, timeline and fixed quote.',
    points: ['Discovery call & workshop', 'Requirements & user flows', 'Proposal with timeline and cost'],
    accent: '#3B82F6',
  },
  {
    icon: PenTool,
    title: 'Design',
    duration: '1–3 weeks',
    description: 'Wireframes and high-fidelity designs you can click through, so you see the product before a line of code is written.',
    points: ['Wireframes & prototypes', 'UI design & design system', 'Feedback rounds until it feels right'],
    accent: '#8B5CF6',
  },
  {
    icon: Code2,
    title: 'Build',
    duration: 'Sprint-based',
    description: 'We develop in two-week sprints with a live staging link, weekly demos and full visibility into progress.',
    points: ['Agile sprints & weekly demos', 'Code reviews & automated tests', 'Staging environment for your review'],
    accent: '#06B6D4',
  },
  {
    icon: Rocket,
    title: 'Launch & Support',
    duration: 'Ongoing',
    description: 'We deploy to production, hand over everything, and stay on to monitor, maintain and grow the product with you.',
    points: ['Production launch & app store release', 'Full code & documentation handover', 'Maintenance and growth retainers'],
    accent: '#10B981',
  },
];

export default function ProcessSteps() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="How we work"
            title={['From idea to launch,', { text: 'without the chaos', className: 'text-gradient' }]}
            description="A simple, transparent process. You always know what's being built, when it ships and what it costs."
          />
          <Link
            to="/process"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Full process
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Desktop: sticky step list + scrolling panels */}
        <div className="hidden gap-16 lg:grid lg:grid-cols-12">
          <div className="col-span-5">
            <div className="sticky top-32">
              <ol className="relative space-y-2">
                {/* Progress rail */}
                {/* Each row: 12px pad + 44px icon + 12px pad, plus 8px gap → 76px pitch; icon centre at 34px. */}
                <span className="absolute bottom-[34px] left-[34px] top-[34px] w-px bg-slate-200 dark:bg-navy-500/40" />
                <motion.span
                  className="absolute left-[34px] top-[34px] w-px bg-blue-500"
                  animate={{ height: active * ROW_PITCH }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const on = i === active;
                  const done = i < active;
                  return (
                    <li key={s.title} className="relative">
                      <div
                        className={cn(
                          'flex items-center gap-5 rounded-2xl p-3 transition-colors duration-300',
                          on && 'bg-white shadow-sm dark:bg-navy-800/60'
                        )}
                      >
                        <span
                          className={cn(
                            'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300',
                            on || done
                              ? 'border-transparent text-white'
                              : 'border-slate-200 bg-white text-slate-400 dark:border-navy-500/50 dark:bg-navy-900 dark:text-[#64748B]'
                          )}
                          style={on || done ? { background: s.accent, boxShadow: on ? `0 8px 24px ${s.accent}55` : undefined } : undefined}
                        >
                          <Icon size={18} />
                        </span>
                        <div>
                          <div className="font-mono text-[11px] text-slate-400 dark:text-[#64748B]">
                            {String(i + 1).padStart(2, '0')} · {s.duration}
                          </div>
                          <div
                            className={cn(
                              'text-lg font-bold transition-colors duration-300',
                              on ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-[#64748B]'
                            )}
                          >
                            {s.title}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="col-span-7 space-y-6">
            {steps.map((s, i) => (
              <StepPanel key={s.title} step={s} index={i} onActive={setActive} />
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <ol className="space-y-5 lg:hidden">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <StepCard step={s} index={i} />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepPanel({ step, index, onActive }: { step: Step; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[60vh] items-center">
      <motion.div
        initial={{ opacity: 0.35, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-30% 0px -30% 0px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-full"
      >
        <StepCard step={step} index={index} large />
      </motion.div>
    </div>
  );
}

function StepCard({ step, index, large }: { step: Step; index: number; large?: boolean }) {
  const Icon = step.icon;
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 dark:border-navy-500/40 dark:bg-navy-800/40 sm:p-9">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ background: step.accent }}
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute right-6 top-2 font-montserrat font-black leading-none text-slate-100 dark:text-navy-700/60',
          large ? 'text-[9rem]' : 'text-7xl'
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <span
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `${step.accent}18`, border: `1px solid ${step.accent}35` }}
        >
          <Icon size={22} style={{ color: step.accent }} />
        </span>
        <div className="mb-1 font-mono text-xs text-slate-400 dark:text-[#64748B]">{step.duration}</div>
        <h3 className={cn('font-bold text-slate-900 dark:text-white', large ? 'text-3xl' : 'text-2xl')}>{step.title}</h3>
        <p className="mt-3 max-w-lg leading-relaxed text-slate-500 dark:text-[#94A3B8]">{step.description}</p>
        <ul className="mt-6 space-y-2.5">
          {step.points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
              <CheckCircle2 size={15} style={{ color: step.accent }} className="shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
