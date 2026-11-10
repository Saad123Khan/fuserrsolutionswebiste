import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import {
  PhoneCall,
  FileText,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  MessageSquare,
  Video,
  ListChecks,
  UserCog,
  Cpu,
  Users,
  Bug,
  Palette,
  Server,
  type LucideIcon,
} from 'lucide-react';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import EngagementModels from '@/components/services/EngagementModels';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import { cn } from '@/lib/utils';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-60px' } as const;

interface Phase {
  icon: LucideIcon;
  title: string;
  duration: string;
  description: string;
  activities: string[];
  deliverable: string;
  accent: string;
}

// TODO(content): confirm typical durations with the team.
const phases: Phase[] = [
  {
    icon: PhoneCall,
    title: 'Discovery call',
    duration: 'Day 1',
    description: 'A free call to understand your idea, users and goals. NDA available before you share details.',
    activities: ['Understand goals & users', 'Discuss features & priorities', 'Rough budget & timeline'],
    deliverable: 'Shared understanding of the project',
    accent: '#3B82F6',
  },
  {
    icon: FileText,
    title: 'Proposal & plan',
    duration: '2–5 days',
    description: 'A detailed proposal with scope, milestones, team, timeline and cost, so you know exactly what you get.',
    activities: ['Feature breakdown & scope', 'Milestones & timeline', 'Fixed quote or team estimate'],
    deliverable: 'Proposal & project roadmap',
    accent: '#8B5CF6',
  },
  {
    icon: PenTool,
    title: 'UX & UI design',
    duration: '1–3 weeks',
    description: 'User flows, wireframes and polished, clickable designs. You approve every screen before development.',
    activities: ['User flows & wireframes', 'High-fidelity UI design', 'Clickable prototype'],
    deliverable: 'Approved designs & prototype',
    accent: '#EC4899',
  },
  {
    icon: Code2,
    title: 'Development sprints',
    duration: '2-week sprints',
    description: 'We build in short sprints with a live staging link and a demo every week, so progress is always visible.',
    activities: ['Frontend, backend & mobile builds', 'Weekly demos on staging', 'Code reviews & automated tests'],
    deliverable: 'Working software every sprint',
    accent: '#06B6D4',
  },
  {
    icon: ShieldCheck,
    title: 'QA & launch',
    duration: '1–2 weeks',
    description: 'Thorough testing across devices, performance and security checks, then a smooth production launch.',
    activities: ['Manual & automated QA', 'Performance & security checks', 'Deployment & store release'],
    deliverable: 'Live product',
    accent: '#10B981',
  },
  {
    icon: Rocket,
    title: 'Support & growth',
    duration: 'Ongoing',
    description: 'Monitoring, fixes and new features. We hand over everything and stay on as your long-term tech partner.',
    activities: ['Monitoring & bug fixes', 'Feature roadmap', 'Full code & docs handover'],
    deliverable: 'A product that keeps improving',
    accent: '#F59E0B',
  },
];

const team: { icon: LucideIcon; role: string; text: string }[] = [
  { icon: UserCog, role: 'Project manager', text: 'Your single point of contact for timelines, priorities and updates.' },
  { icon: Cpu, role: 'Tech lead', text: 'Owns architecture, code quality and technical decisions.' },
  { icon: Users, role: 'Developers', text: 'Frontend, backend and mobile engineers matched to your stack.' },
  { icon: Palette, role: 'UI/UX designer', text: 'Designs flows and interfaces your users will enjoy.' },
  { icon: Bug, role: 'QA engineer', text: 'Tests every release so bugs are caught before your users see them.' },
  { icon: Server, role: 'DevOps engineer', text: 'Sets up cloud, CI/CD and monitoring for smooth releases.' },
];

const cadence: { icon: LucideIcon; label: string; text: string }[] = [
  { icon: MessageSquare, label: 'Daily', text: 'Async updates in Slack or your preferred tool' },
  { icon: Video, label: 'Weekly', text: 'Live demo of working software and next-sprint planning' },
  { icon: ListChecks, label: 'Every milestone', text: 'Review, sign-off and roadmap alignment' },
];

const tools = ['Slack', 'Google Meet', 'Jira', 'Linear', 'Notion', 'Figma', 'GitHub', 'GitLab', 'Vercel', 'AWS', 'Loom', 'ClickUp'];

export default function ProcessPage() {
  useDocumentTitle('Our Process — How We Build Software');
  useMetaDescription('How Fuserr Solutions takes your idea from discovery call to launch: proposal, design, development sprints, QA and ongoing support.');

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        variant="streams"
        eyebrow="Our process"
        title={['From first call to launch,', { text: 'no guesswork.', className: 'text-gradient pb-2' }]}
        description="A clear, proven process that keeps you in control: you always know what is being built, when it ships and what it costs."
      />

      <Roadmap />

      {/* ── Team ── */}
      <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Your team"
            title={['Who works on', { text: 'your project', className: 'text-gradient' }]}
            description="A dedicated team sized to your project, consistent from kickoff to launch."
            className="mb-16"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(({ icon: Icon, role, text }, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <SpotlightCard className="group flex h-full items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-600/20 bg-blue-600/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={19} className="text-blue-600 dark:text-blue-400" />
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900 dark:text-white">{role}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{text}</span>
                  </span>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Communication & tools ── */}
      <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-start gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Communication"
              title={['Always', { text: 'in the loop', className: 'text-gradient' }]}
              description="Structured updates that keep you informed without filling your calendar."
              className="mb-10"
            />
            <ol className="relative space-y-4">
              <span className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-slate-200 dark:bg-navy-500/40" />
              {cadence.map(({ icon: Icon, label, text }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                  className="relative flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-navy-500/40 dark:bg-navy-800/40"
                >
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">{label}</span>
                    <span className="block text-sm text-slate-600 dark:text-[#94A3B8]">{text}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading
              eyebrow="Tools"
              title={['We work in', { text: 'your tools', className: 'text-gradient' }]}
              description="Already have a workflow? We plug straight into it."
              className="mb-10"
            />
            <div className="flex flex-wrap gap-3">
              {tools.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={inView}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.04 }}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 dark:border-navy-500/50 dark:bg-navy-800/50 dark:text-[#E8E8E8] dark:hover:text-blue-400"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EngagementModels />
      <CTABanner />
    </>
  );
}

/* ─── Zigzag roadmap with scroll-filled line ─────────── */

function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-[3px] rounded-full bg-slate-200 dark:bg-navy-500/30 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-5 top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-cyan-400 lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-12 lg:space-y-16">
            {phases.map((phase, i) => (
              <PhaseRow key={phase.title} phase={phase} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PhaseRow({ phase, index }: { phase: Phase; index: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const reached = useInView(nodeRef, { once: true, margin: '0px 0px -45% 0px' });
  const left = index % 2 === 0;
  const Icon = phase.icon;

  return (
    <li className="relative">
      {/* Node */}
      <span
        ref={nodeRef}
        className={cn(
          'absolute left-5 top-6 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 font-montserrat text-xs font-black transition-all duration-500 lg:left-1/2',
          reached ? 'scale-110 text-white' : 'bg-white text-slate-400 dark:bg-navy-900 dark:text-[#64748B]'
        )}
        style={{
          borderColor: reached ? phase.accent : undefined,
          background: reached ? phase.accent : undefined,
          boxShadow: reached ? `0 0 0 6px ${phase.accent}22, 0 8px 24px ${phase.accent}55` : undefined,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <motion.div
        initial={{ opacity: 0, x: left ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn('pl-14 lg:w-[calc(50%-3rem)] lg:pl-0', !left && 'lg:ml-[calc(50%+3rem)]')}
      >
        <div
          className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-navy-500/40 dark:bg-navy-800/40"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
            style={{ background: phase.accent }}
          />
          <div className="relative mb-4 flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `${phase.accent}15`, border: `1px solid ${phase.accent}30` }}
            >
              <Icon size={19} style={{ color: phase.accent }} />
            </span>
            <div>
              <div className="font-mono text-[11px] text-slate-400 dark:text-[#64748B]">{phase.duration}</div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{phase.title}</h2>
            </div>
          </div>
          <p className="relative text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{phase.description}</p>
          <ul className="relative mt-5 space-y-2">
            {phase.activities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-slate-600 dark:text-[#94A3B8]">
                <CheckCircle2 size={14} className="shrink-0" style={{ color: phase.accent }} />
                {a}
              </li>
            ))}
          </ul>
          <div
            className="relative mt-5 rounded-xl border px-4 py-2.5 text-xs font-semibold"
            style={{ background: `${phase.accent}0d`, borderColor: `${phase.accent}30`, color: phase.accent }}
          >
            Deliverable: {phase.deliverable}
          </div>
        </div>
      </motion.div>
    </li>
  );
}
