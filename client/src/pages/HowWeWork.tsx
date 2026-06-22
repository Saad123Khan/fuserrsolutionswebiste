import {
  ClipboardList,
  FileText,
  Code2,
  Rocket,
  CheckCircle2,
  Users,
  MessageSquare,
  GitBranch,
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';
import SectionTitle from '@/components/ui/SectionTitle';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

const phases = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Kickoff & NDA',
    duration: 'Day 1',
    description:
      'Share your project brief. We review requirements, sign an NDA, and assign a dedicated project manager and dev team matched to your client\'s stack and goals.',
    activities: [
      'Project brief and requirements review',
      'NDA signed before any detailed discussion',
      'Dedicated PM and dev team assignment',
      'Branding and style guide collection',
      'Communication channel setup (Slack, Notion, etc.)',
    ],
    output: 'NDA Executed + Team Assigned',
    accent: '#3B82F6',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Plan & Estimate',
    duration: '1–3 business days',
    description:
      'We produce a clear proposal covering scope, timeline, and pricing. Once approved, our team integrates into your workflow — your tools, your brand, your process.',
    activities: [
      'Scope and feature breakdown',
      'Timeline and sprint planning',
      'Fixed-price or T&M proposal',
      'Tech stack selection and rationale',
      'Integration with your project management tools',
    ],
    output: 'Proposal + Project Roadmap',
    accent: '#8B5CF6',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build & Test',
    duration: 'Sprint-based delivery',
    description:
      'Your work ships in regular sprints. You see demos and progress updates. We code, test, and refine — all under your agency\'s name. Every sprint delivers working software.',
    activities: [
      'Agile sprint development with weekly demos',
      'Daily async updates in your preferred tool',
      'Code review and automated testing',
      'Staging environment for your review',
      'Revisions and refinements each sprint',
    ],
    output: 'Working Software + Sprint Reports',
    accent: '#06B6D4',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Handoff',
    duration: '1 week',
    description:
      'Final delivery fully under your brand. We hand over all code, assets, and documentation. We can deploy to production or pass files directly — then offer ongoing support if needed.',
    activities: [
      'Final QA and cross-browser/device testing',
      'Deployment to production or handoff package',
      'All code, assets, and docs transferred',
      'No third-party footprint in deliverables',
      'Optional ongoing support retainer',
    ],
    output: 'Production Launch + Full Handoff',
    accent: '#10B981',
  },
];

const teamRoles = [
  { role: 'Project Manager', responsibility: 'Your single point of contact. Owns delivery, milestones, and communication.' },
  { role: 'Tech Lead', responsibility: 'Architecture ownership, code quality standards, and all technical decisions.' },
  { role: 'Senior Developers', responsibility: '2–4 senior engineers per project, matched to your client\'s tech stack.' },
  { role: 'QA Engineer', responsibility: 'Test planning, automation, and release sign-off on every sprint.' },
  { role: 'UI/UX Specialist', responsibility: 'Pixel-perfect implementation from your design files or from scratch.' },
  { role: 'DevOps Engineer', responsibility: 'CI/CD pipelines, cloud infrastructure, and production monitoring.' },
];

const tools = [
  { category: 'Communication', items: ['Slack', 'Google Meet', 'Loom', 'Email'] },
  { category: 'Project Tracking', items: ['Jira', 'Linear', 'Notion', 'Trello'] },
  { category: 'Design Handoff', items: ['Figma', 'Zeplin', 'InVision'] },
  { category: 'Version Control', items: ['GitHub', 'GitLab', 'Bitbucket'] },
  { category: 'CI/CD', items: ['GitHub Actions', 'CircleCI', 'Vercel'] },
  { category: 'Reporting', items: ['Weekly summaries', 'Sprint reports', 'Loom demos'] },
];

export default function HowWeWorkPage() {
  useDocumentTitle('How It Works — 4-Step White-Label Development Process');

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-[var(--c-bg)]">
        <div className="absolute inset-0 dot-grid opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/6 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">How It Works</span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6">
              <span className="text-slate-900 dark:text-[#E8E8E8]">Simple for agencies.</span>
              <br />
              <span className="text-gradient">Invisible to clients.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-xl mx-auto">
              A 4-step process designed around your agency workflow — transparent to you, completely
              invisible to your clients from start to finish.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4-Step Process ── */}
      <section className="pb-24 bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatedSection className="text-center mb-14 pt-16">
            <span className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest">
              4-Step White-Label Delivery Framework
            </span>
          </AnimatedSection>

          {/* Zigzag roadmap */}
          <div className="relative">
            <div className="absolute left-5 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent" />

            <div className="space-y-10 lg:space-y-12">
              {phases.map((phase, i) => {
                const Icon = phase.icon;
                const isLeft = i % 2 === 0;

                return (
                  <div key={phase.number} className="relative">

                    {/* ── Desktop layout ── */}
                    <div className="hidden lg:block">
                      <AnimatedSection direction={isLeft ? 'left' : 'right'} delay={i * 0.05}>
                        <div
                          className="absolute left-1/2 -translate-x-1/2 top-6 z-10 w-11 h-11 rounded-full border-2 flex items-center justify-center bg-white dark:bg-navy-900 shadow-sm"
                          style={{ borderColor: phase.accent }}
                        >
                          <span className="text-xs font-black" style={{ color: phase.accent }}>{phase.number}</span>
                        </div>

                        <div className={`lg:w-[calc(50%-2.5rem)] ${isLeft ? '' : 'lg:ml-[calc(50%+2.5rem)]'}`}>
                          <PhaseCard phase={phase} Icon={Icon} />
                        </div>
                      </AnimatedSection>
                    </div>

                    {/* ── Mobile layout ── */}
                    <div className="lg:hidden flex gap-0 items-start">
                      <div className="shrink-0 relative z-10 flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white dark:bg-navy-900 shadow-sm"
                          style={{ borderColor: phase.accent }}
                        >
                          <span className="text-[11px] font-black" style={{ color: phase.accent }}>{phase.number}</span>
                        </div>
                      </div>
                      <div className="flex-1 pl-5">
                        <AnimatedSection delay={i * 0.04}>
                          <PhaseCard phase={phase} Icon={Icon} />
                        </AnimatedSection>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Composition ── */}
      <section className="py-24 bg-[var(--c-bg)] dark:bg-navy-950 border-t border-slate-200 dark:border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionTitle
              eyebrow="Your Dedicated Team"
              title="Who works on"
              highlight="your projects"
              align="center"
              description="Senior specialists — not rotating contractors. Your team stays consistent from kickoff to final handoff."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamRoles.map((t) => (
              <StaggerItem key={t.role}>
                <div className="glass rounded-xl border border-slate-200 dark:border-navy-500/40 p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <Users size={15} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-[#E8E8E8]">{t.role}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8]">{t.responsibility}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Communication + Tools ── */}
      <section className="py-24 bg-[var(--c-bg-alt)] dark:bg-navy-900 border-t border-slate-200 dark:border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <AnimatedSection direction="left">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-blue-500" />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Collaboration</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-4">
                Always <span className="text-gradient">in sync</span> with your agency
              </h2>
              <p className="text-slate-500 dark:text-[#94A3B8] mb-8">
                Structured communication that keeps you informed and in control — without burdening your schedule
                with unnecessary meetings.
              </p>

              <div className="space-y-4">
                {[
                  { icon: MessageSquare, label: 'Daily', desc: "Async update in your preferred tool — what shipped, what\'s blocked" },
                  { icon: GitBranch, label: 'Weekly', desc: 'Live demo of working software + next sprint scope review' },
                  { icon: CheckCircle2, label: 'Per Milestone', desc: 'Milestone sign-off and roadmap alignment before next phase' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4 glass rounded-xl border border-slate-200 dark:border-navy-500/40 p-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-0.5">{label}</div>
                      <div className="text-sm text-slate-500 dark:text-[#94A3B8]">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <h3 className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest mb-6">
                We Work in Your Tools
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {tools.map((group) => (
                  <div key={group.category} className="glass rounded-xl border border-slate-200 dark:border-navy-500/40 p-4">
                    <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">{group.category}</div>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <div key={item} className="text-xs text-slate-500 dark:text-[#94A3B8] flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-navy-500 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function PhaseCard({ phase, Icon }: { phase: (typeof phases)[0]; Icon: React.ElementType }) {
  return (
    <div
      className="bg-white dark:bg-navy-800/40 rounded-2xl border border-slate-200 dark:border-navy-500/40 p-6 hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors duration-300"
      style={{ borderLeftWidth: '3px', borderLeftColor: `${phase.accent}60` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${phase.accent}15`, border: `1px solid ${phase.accent}30` }}
        >
          <Icon size={18} style={{ color: phase.accent }} />
        </div>
        <div>
          <div className="text-[11px] font-mono text-slate-400 dark:text-[#64748B]">{phase.duration}</div>
          <h2 className="text-base font-bold text-slate-900 dark:text-[#E8E8E8] leading-tight">{phase.title}</h2>
        </div>
      </div>

      <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed mb-5">{phase.description}</p>

      <ul className="space-y-2 mb-5">
        {phase.activities.slice(0, 3).map((a) => (
          <li key={a} className="flex items-start gap-2">
            <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: phase.accent }} />
            <span className="text-xs text-slate-500 dark:text-[#94A3B8]">{a}</span>
          </li>
        ))}
      </ul>

      <div
        className="rounded-xl px-3 py-2 text-xs font-medium border"
        style={{ background: `${phase.accent}08`, borderColor: `${phase.accent}22`, color: phase.accent }}
      >
        Deliverable: {phase.output}
      </div>
    </div>
  );
}
