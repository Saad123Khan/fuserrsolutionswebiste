import type { Metadata } from 'next';
import {
  Search,
  Map,
  Figma,
  Code2,
  Rocket,
  LifeBuoy,
  Users,
  MessageSquare,
  GitBranch,
  TestTube,
  CheckCircle2,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'Discover the Fuserr Solutions development process — from discovery to production. Transparent, collaborative, and built for on-time delivery.',
};

const phases = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Research',
    duration: '1–2 weeks',
    description:
      'We immerse ourselves in your domain. Stakeholder interviews, competitive analysis, technical audits, and user research to surface the real problem beneath the stated one.',
    activities: [
      'Stakeholder interviews and goal alignment',
      'Technical feasibility assessment',
      'Competitive landscape analysis',
      'User research and persona development',
      'Risk and dependency identification',
    ],
    output: 'Discovery Report + Project Brief',
    accent: '#3B82F6',
  },
  {
    number: '02',
    icon: Map,
    title: 'Strategy & Architecture',
    duration: '1–2 weeks',
    description:
      'We translate business goals into engineering decisions. Technology stack, system architecture, third-party integrations, and a sprint-by-sprint roadmap.',
    activities: [
      'Technology stack selection and rationale',
      'System architecture design',
      'Data model and API contract drafting',
      'Sprint planning and milestone mapping',
      'Budget and timeline validation',
    ],
    output: 'Architecture Document + Project Roadmap',
    accent: '#8B5CF6',
  },
  {
    number: '03',
    icon: Figma,
    title: 'Design & Prototyping',
    duration: '2–4 weeks',
    description:
      'From information architecture to pixel-perfect screens. We prototype high-fidelity interactions, test with real users, and align design with engineering constraints before a single line of production code is written.',
    activities: [
      'Information architecture and user flows',
      'Low-fidelity wireframes',
      'High-fidelity UI design with design system',
      'Interactive prototyping in Figma',
      'Usability testing and iteration',
    ],
    output: 'Figma Design Files + Design System',
    accent: '#EC4899',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Development',
    duration: 'Project-dependent',
    description:
      'Two-week sprints with daily standups and weekly demos. CI/CD from day one, feature flags for progressive rollouts, and code reviews on every PR. You always know what\'s shipping.',
    activities: [
      'Two-week agile sprints',
      'Daily async standups',
      'Weekly live product demos',
      'Code reviews and pair programming',
      'Automated testing (unit, integration, e2e)',
    ],
    output: 'Working Software + Updated Docs',
    accent: '#06B6D4',
  },
  {
    number: '05',
    icon: TestTube,
    title: 'Testing & QA',
    duration: 'Ongoing + dedicated sprint',
    description:
      'QA is not a phase — it\'s woven into every sprint. A dedicated pre-launch QA sprint covers regression, load testing, security scanning, and cross-browser/device validation.',
    activities: [
      'Automated unit and integration testing',
      'End-to-end test suites (Playwright/Cypress)',
      'Load and performance testing',
      'Security audit and OWASP scanning',
      'Cross-browser and device testing',
    ],
    output: 'QA Report + Bug-Free Release',
    accent: '#F59E0B',
  },
  {
    number: '06',
    icon: Rocket,
    title: 'Launch & Deploy',
    duration: '1 week',
    description:
      'Staged rollouts with feature flags, zero-downtime deployments, infrastructure-as-code, and production monitoring in place before go-live.',
    activities: [
      'Staging environment final validation',
      'Infrastructure provisioning (Terraform)',
      'Zero-downtime deployment pipeline',
      'Monitoring and alerting setup (Datadog/Sentry)',
      'Launch-day support and rollback plan',
    ],
    output: 'Production Launch + Monitoring Dashboard',
    accent: '#10B981',
  },
  {
    number: '07',
    icon: LifeBuoy,
    title: 'Maintenance & Scale',
    duration: 'Ongoing',
    description:
      'We don\'t disappear after launch. Structured retainer agreements cover proactive monitoring, security patches, performance optimization, and continued feature development.',
    activities: [
      'SLA-backed incident response',
      'Proactive dependency and security updates',
      'Performance monitoring and optimization',
      'Feature backlog management',
      'Monthly performance and health reports',
    ],
    output: 'Ongoing SLA-Backed Support',
    accent: '#34D399',
  },
];

const teamRoles = [
  { role: 'Project Lead', responsibility: 'Single point of contact. Strategy, delivery, and escalation.' },
  { role: 'Tech Lead', responsibility: 'Architecture ownership, code quality standards, and technical decisions.' },
  { role: 'Developers', responsibility: '2–4 senior engineers per project, matched to the tech stack.' },
  { role: 'Designer', responsibility: 'UX research, visual design, and prototype ownership.' },
  { role: 'QA Engineer', responsibility: 'Test planning, automation, and release sign-off.' },
  { role: 'DevOps', responsibility: 'Infrastructure, CI/CD pipelines, and production monitoring.' },
];

const tools = [
  { category: 'Communication', items: ['Slack', 'Loom', 'Google Meet', 'Notion'] },
  { category: 'Project Tracking', items: ['Linear', 'GitHub Projects', 'Jira'] },
  { category: 'Design', items: ['Figma', 'FigJam', 'Framer'] },
  { category: 'Version Control', items: ['GitHub', 'GitLab'] },
  { category: 'CI/CD', items: ['GitHub Actions', 'CircleCI', 'Vercel'] },
  { category: 'Monitoring', items: ['Datadog', 'Sentry', 'PagerDuty'] },
];

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-950 dot-grid opacity-30" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-mono tracking-widest uppercase">
                Process
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
              <span className="text-[#E8E8E8]">Transparency</span>
              <br />
              <span className="text-gradient">at every step.</span>
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              A rigorous process that eliminates surprises. You know what we&apos;re building, when
              it ships, and why every decision was made.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process steps */}
      <section className="pb-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <AnimatedSection key={phase.number} delay={i * 0.05}>
                  <div className="glass rounded-2xl border border-navy-500/40 overflow-hidden hover:border-opacity-70 transition-colors duration-300">
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Left: title + description */}
                      <div className="p-8 border-b lg:border-b-0 lg:border-r border-navy-500/30">
                        <div className="flex items-center gap-4 mb-5">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${phase.accent}18`, border: `1px solid ${phase.accent}30` }}
                          >
                            <Icon size={18} style={{ color: phase.accent }} />
                          </div>
                          <span
                            className="text-sm font-mono font-bold"
                            style={{ color: phase.accent }}
                          >
                            {phase.number}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-[#E8E8E8] mb-2">{phase.title}</h2>
                        <div className="text-xs font-mono text-[#64748B] mb-4">{phase.duration}</div>
                        <p className="text-sm text-[#94A3B8] leading-relaxed">{phase.description}</p>
                      </div>

                      {/* Middle: activities */}
                      <div className="p-8 border-b lg:border-b-0 lg:border-r border-navy-500/30">
                        <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-5">
                          Activities
                        </h3>
                        <ul className="space-y-3">
                          {phase.activities.map((a) => (
                            <li key={a} className="flex items-start gap-2.5">
                              <CheckCircle2
                                size={13}
                                className="mt-0.5 shrink-0"
                                style={{ color: phase.accent }}
                              />
                              <span className="text-sm text-[#94A3B8]">{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: output */}
                      <div className="p-8">
                        <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-5">
                          Deliverable
                        </h3>
                        <div
                          className="rounded-xl p-4 border"
                          style={{
                            background: `${phase.accent}08`,
                            borderColor: `${phase.accent}25`,
                          }}
                        >
                          <p className="text-sm font-medium" style={{ color: phase.accent }}>
                            {phase.output}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team composition */}
      <section className="py-24 bg-navy-950 border-t border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <SectionTitle
              eyebrow="Team Structure"
              title="Who you'll work with"
              highlight="Who you'll"
              description="Dedicated experts, not rotating contractors. Your team stays consistent from kickoff to launch."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamRoles.map((t) => (
              <StaggerItem key={t.role}>
                <div className="glass rounded-xl border border-navy-500/40 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users size={15} className="text-blue-400" />
                    <span className="text-sm font-semibold text-[#E8E8E8]">{t.role}</span>
                  </div>
                  <p className="text-sm text-[#94A3B8]">{t.responsibility}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Communication model */}
      <section className="py-24 bg-navy-900 border-t border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <SectionTitle
                eyebrow="Collaboration"
                title="How we stay"
                highlight="in sync"
                description="No surprises. Structured communication that keeps you informed without becoming a meeting burden."
              />

              <div className="mt-8 space-y-4">
                {[
                  { icon: MessageSquare, label: 'Daily', desc: 'Async update in Slack — what shipped, what\'s blocked' },
                  { icon: GitBranch, label: 'Weekly', desc: 'Live demo of working software + sprint planning' },
                  { icon: CheckCircle2, label: 'Biweekly', desc: 'Milestone review and roadmap alignment' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4 glass rounded-xl border border-navy-500/40 p-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-blue-400 mb-0.5">{label}</div>
                      <div className="text-sm text-[#94A3B8]">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Tools grid */}
            <AnimatedSection direction="right">
              <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-6">
                Tools & Methodologies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {tools.map((group) => (
                  <div key={group.category} className="glass rounded-xl border border-navy-500/40 p-4">
                    <div className="text-xs font-mono text-blue-400 mb-3">{group.category}</div>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <div key={item} className="text-xs text-[#94A3B8] flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-navy-500 shrink-0" />
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
