import { useRef, type ReactNode } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import {
  Users,
  CalendarCheck,
  MessagesSquare,
  KeyRound,
  LifeBuoy,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  GitBranch,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  visual: (props: { play: boolean; accent: string }) => ReactNode;
}

const reasons: Reason[] = [
  {
    icon: Users,
    title: 'Senior engineers',
    description: 'Experienced developers and designers work on your product, not interns learning on your budget.',
    accent: '#3B82F6',
    visual: TeamVisual,
  },
  {
    icon: CalendarCheck,
    title: 'On time, on budget',
    description: 'Clear scope, fixed milestones and honest estimates. No surprise invoices, no endless delays.',
    accent: '#10B981',
    visual: MilestonesVisual,
  },
  {
    icon: MessagesSquare,
    title: 'Transparent communication',
    description: 'A dedicated project manager, weekly demos and a shared board, so you always know where things stand.',
    accent: '#8B5CF6',
    visual: ChatVisual,
  },
  {
    icon: KeyRound,
    title: 'You own everything',
    description: 'Full source code, designs and documentation are yours. No lock-in, no licensing fees.',
    accent: '#F59E0B',
    visual: OwnershipVisual,
  },
  {
    icon: LifeBuoy,
    title: 'Support after launch',
    description: 'We monitor, maintain and keep improving your product long after it goes live.',
    accent: '#06B6D4',
    visual: MonitoringVisual,
  },
  {
    icon: ShieldCheck,
    title: 'Secure & confidential',
    description: 'NDA on request, secure coding practices and careful handling of your data and IP.',
    accent: '#EC4899',
    visual: SecurityVisual,
  },
];

export default function WhyUsZigzag() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="relative overflow-hidden bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Fuserr"
          title={['A partner that', { text: 'cares about your product', className: 'text-gradient' }]}
          description="We treat every project like it's our own. Here's what working with us looks like."
          className="mb-20"
        />

        <div ref={listRef} className="relative">
          {/* Spine */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_12px_rgba(56,189,248,0.6)] lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-16 lg:space-y-24">
            {reasons.map((r, i) => (
              <Row key={r.title} reason={r} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Row({ reason: r, index }: { reason: Reason; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px -25% 0px' });
  const textLeft = index % 2 === 0;
  const Icon = r.icon;
  const Visual = r.visual;

  const text = (
    <motion.div
      initial={{ opacity: 0, x: textLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className={cn('pl-14 lg:pl-0', textLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16')}
    >
      <div className={cn('mb-4 flex items-center gap-3', textLeft && 'lg:flex-row-reverse')}>
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `${r.accent}18`, border: `1px solid ${r.accent}40` }}
        >
          <Icon size={22} style={{ color: r.accent }} />
        </span>
        <span className="font-mono text-sm text-slate-500">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{r.title}</h3>
      <p className={cn('mt-3 max-w-md leading-relaxed text-slate-400', textLeft && 'lg:ml-auto')}>{r.description}</p>
    </motion.div>
  );

  const visual = (
    <motion.div
      initial={{ opacity: 0, x: textLeft ? 50 : -50, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      className={cn('mt-6 pl-14 lg:mt-0 lg:pl-0', textLeft ? 'lg:pl-16' : 'lg:pr-16')}
    >
      <div
        className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0A1224] p-6"
        style={{ backgroundImage: `radial-gradient(circle at 100% 0%, ${r.accent}26, transparent 55%), radial-gradient(ellipse at 0% 100%, ${r.accent}14, transparent 60%)` }}
      >
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative w-full">
          <Visual play={inView} accent={r.accent} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <li ref={ref} className="relative grid items-center lg:grid-cols-2">
      {/* Node on the spine */}
      <span
        className={cn(
          'absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all duration-700 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2',
          inView ? 'scale-110 text-white' : 'border-white/15 bg-[#030712] text-slate-500'
        )}
        style={
          inView
            ? { borderColor: r.accent, background: r.accent, boxShadow: `0 0 0 6px ${r.accent}22, 0 0 24px ${r.accent}88` }
            : undefined
        }
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {textLeft ? (
        <>
          {text}
          {visual}
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1">{visual}</div>
          <div className="order-1 lg:order-2">{text}</div>
        </>
      )}
    </li>
  );
}

/* ─── Mini visuals (play once when the row scrolls into view) ─── */

const pop = (play: boolean, delay: number) => ({
  initial: { opacity: 0, y: 10, scale: 0.9 },
  animate: play ? { opacity: 1, y: 0, scale: 1 } : {},
  transition: { duration: 0.45, delay, ease: EASE },
});

function TeamVisual({ play, accent }: { play: boolean; accent: string }) {
  // Team member initials
  const people = [
    { i: 'FK', c: '#3B82F6' },
    { i: 'HR', c: '#8B5CF6' },
    { i: 'HK', c: '#06B6D4' },
    { i: 'SK', c: '#10B981' },
  ];
  const roles = ['Frontend', 'Backend', 'Mobile', 'UI/UX', 'DevOps', 'QA'];
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex -space-x-3">
        {people.map((p, k) => (
          <motion.span
            key={p.i}
            {...pop(play, 0.2 + k * 0.08)}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0A1224] text-xs font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${p.c}, ${p.c}99)` }}
          >
            {p.i}
          </motion.span>
        ))}
      </div>
      <div className="flex max-w-xs flex-wrap justify-center gap-2">
        {roles.map((r, k) => (
          <motion.span
            key={r}
            {...pop(play, 0.6 + k * 0.07)}
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{ color: accent, borderColor: `${accent}40`, background: `${accent}12` }}
          >
            {r}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function MilestonesVisual({ play, accent }: { play: boolean; accent: string }) {
  const steps = ['Discovery', 'Design', 'Build', 'Launch'];
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative flex justify-between">
        <div className="absolute left-4 right-4 top-4 h-0.5 bg-white/10" />
        <motion.div
          className="absolute left-4 top-4 h-0.5 origin-left"
          style={{ right: '1rem', background: accent }}
          initial={{ scaleX: 0 }}
          animate={play ? { scaleX: 1 } : {}}
          transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }}
        />
        {steps.map((s, k) => (
          <div key={s} className="relative z-10 flex flex-col items-center gap-2">
            <motion.span
              initial={{ scale: 0.6, opacity: 0.4 }}
              animate={play ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.3 + k * 0.45, ease: EASE }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white"
              style={{ background: accent, boxShadow: `0 0 16px ${accent}88` }}
            >
              <CheckCircle2 size={15} />
            </motion.span>
            <span className="text-[11px] text-slate-400">{s}</span>
          </div>
        ))}
      </div>
      <motion.div {...pop(play, 2.1)} className="mt-6 flex justify-center">
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: accent, background: `${accent}18` }}>
          On track · on budget
        </span>
      </motion.div>
    </div>
  );
}

function ChatVisual({ play, accent }: { play: boolean; accent: string }) {
  return (
    <div className="mx-auto max-w-sm space-y-3 text-sm">
      <motion.div {...pop(play, 0.2)} className="flex items-end gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: accent }}>
          PM
        </span>
        <span className="rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
          Sprint 3 demo is live on staging 🚀
        </span>
      </motion.div>
      <motion.div {...pop(play, 0.75)} className="flex items-end justify-end gap-2">
        <span className="rounded-2xl rounded-br-sm px-3 py-2 text-white" style={{ background: accent }}>
          Looks great! Ship it 👏
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-600 text-[10px] font-bold text-white">
          You
        </span>
      </motion.div>
      <motion.div {...pop(play, 1.3)} className="flex justify-center pt-1">
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-400">Weekly demo · Every Friday</span>
      </motion.div>
    </div>
  );
}

function OwnershipVisual({ play, accent }: { play: boolean; accent: string }) {
  return (
    <div className="mx-auto max-w-xs rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center gap-2 font-mono text-sm text-slate-200">
        <GitBranch size={15} style={{ color: accent }} /> your-company/app
      </div>
      <div className="space-y-2 text-xs text-slate-400">
        {['Source code', 'Designs (Figma)', 'Docs & credentials'].map((t, k) => (
          <motion.div key={t} {...pop(play, 0.3 + k * 0.15)} className="flex items-center gap-2">
            <CheckCircle2 size={13} style={{ color: accent }} /> {t}
          </motion.div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <motion.span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${accent}20` }}
          animate={play ? { rotate: [0, -12, 0] } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {play ? <Unlock size={17} style={{ color: accent }} /> : <Lock size={17} style={{ color: accent }} />}
        </motion.span>
        <motion.span {...pop(play, 1.2)} className="text-xs font-semibold" style={{ color: accent }}>
          Transferred to you ✓
        </motion.span>
      </div>
    </div>
  );
}

function MonitoringVisual({ play, accent }: { play: boolean; accent: string }) {
  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-slate-300">
          <Activity size={14} style={{ color: accent }} /> Production
        </span>
        <span className="inline-flex items-center gap-1.5 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          All systems normal
        </span>
      </div>
      <svg viewBox="0 0 300 90" className="h-24 w-full">
        <defs>
          <linearGradient id="mon-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.35" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 60 L30 52 L60 58 L90 40 L120 46 L150 30 L180 38 L210 24 L240 30 L270 18 L300 22 L300 90 L0 90 Z"
          fill="url(#mon-fill)"
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        />
        <motion.path
          d="M0 60 L30 52 L60 58 L90 40 L120 46 L150 30 L180 38 L210 24 L240 30 L270 18 L300 22"
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
        />
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
        {['Monitoring', 'Bug fixes', 'New features'].map((t, k) => (
          <motion.span key={t} {...pop(play, 1.2 + k * 0.1)} className="rounded-lg border border-white/10 py-1.5">
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function SecurityVisual({ play, accent }: { play: boolean; accent: string }) {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="relative flex h-28 w-28 items-center justify-center">
        {[0, 1, 2].map((k) => (
          <motion.span
            key={k}
            className="absolute inset-0 rounded-full border will-change-transform"
            style={{ borderColor: accent }}
            initial={{ scale: 0.55, opacity: 0 }}
            // Starts and ends invisible so the loop has no visible jump
            animate={play ? { scale: [0.55, 1.3], opacity: [0, 0.55, 0] } : {}}
            transition={{
              duration: 3,
              delay: k * 1,
              repeat: Infinity,
              ease: 'linear',
              opacity: { duration: 3, delay: k * 1, repeat: Infinity, times: [0, 0.2, 1], ease: 'easeInOut' },
            }}
          />
        ))}
        <span
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-white"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}aa)`, boxShadow: `0 0 30px ${accent}77` }}
        >
          <ShieldCheck size={30} />
        </span>
      </div>
      <div className="space-y-2.5 text-sm text-slate-300">
        {['NDA signed', 'Encrypted data', 'Access control'].map((t, k) => (
          <motion.div key={t} {...pop(play, 0.4 + k * 0.2)} className="flex items-center gap-2">
            <CheckCircle2 size={15} style={{ color: accent }} /> {t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
