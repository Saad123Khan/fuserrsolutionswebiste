import type { Metadata } from 'next';
import { EyeOff, Shield, Users, Zap, TrendingUp, Award, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Why Us — Your White-Label Dev Team | Fuserr Solutions',
  description:
    'Learn why 60+ agencies trust Fuserr Solutions as their invisible engineering partner. NDA-backed, senior dev team, 99.8% on-time delivery.',
};

const differentiators = [
  {
    icon: EyeOff,
    title: '100% White-Label Delivery',
    description:
      'All work is NDA-protected and invisible. We leave no trace in our code — no external logos, no credits, no third-party footprints. Your clients will never know we exist.',
    accent: '#3B82F6',
  },
  {
    icon: Shield,
    title: 'NDA Signed Before Any Discussion',
    description:
      'We operate under non-disclosure agreements from the very first conversation. Your client relationships and business strategies are legally protected, always.',
    accent: '#10B981',
  },
  {
    icon: Users,
    title: 'Senior Full-Stack Team',
    description:
      'Front-end, back-end, mobile, SaaS, and enterprise specialists with 10+ years average experience. We handle the full tech stack so you never have to manage multiple vendors.',
    accent: '#8B5CF6',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround & Scale on Demand',
    description:
      'Need to ramp up fast? We can onboard multiple developers to a project within days. Your sales velocity never outpaces your delivery capacity again.',
    accent: '#F59E0B',
  },
  {
    icon: TrendingUp,
    title: 'Dedicated PM & Transparent Process',
    description:
      'Every project has a dedicated project manager, clear milestones, and regular status updates. You always know what\'s being built, when it ships, and why.',
    accent: '#06B6D4',
  },
  {
    icon: Award,
    title: 'Technical Excellence as Standard',
    description:
      'Code quality audits, automated testing, CI/CD pipelines, and performance benchmarking on every engagement. We commit to code that holds up long after delivery.',
    accent: '#EC4899',
  },
];

const stats = [
  { value: '10+', label: 'Agency Partners', sub: 'Globally' },
  { value: '6+', label: 'Years Experience', sub: 'Since 2014' },
  { value: '99.8%', label: 'On-Time Delivery', sub: 'Across 120+ projects' },
  { value: '98%', label: 'Partner Retention', sub: 'Year over year' },
];

export default function AboutPage() {
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
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Why Us</span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6">
              <span className="text-slate-900 dark:text-[#E8E8E8]">Your invisible</span>
              <br />
              <span className="text-gradient">dev team.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-2xl mx-auto">
              We&apos;re more than a vendor — we&apos;re your dedicated white-label engineering partner. 60+ agencies trust us
              to deliver world-class software under their brand, on time, every time.
            </p>
          </AnimatedSection>

          {/* Stats row */}
          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
              {stats.map(({ value, label, sub }) => (
                <div key={label} className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-5">
                  <div className="text-2xl font-bold text-gradient mb-1">{value}</div>
                  <div className="text-sm font-medium text-slate-800 dark:text-[#E8E8E8] mb-0.5">{label}</div>
                  <div className="text-xs text-slate-400 dark:text-[#64748B]">{sub}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Mission / Partnership model ── */}
      <section className="py-24 bg-[var(--c-bg-alt)] dark:bg-navy-900 border-t border-slate-200 dark:border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-blue-500" />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Our Model</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-6 leading-tight">
                We work as your{' '}
                <span className="text-gradient">dedicated white-label team</span> — under NDA, under your brand.
              </h2>
              <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed mb-6">
                You maintain the client relationship, set the pricing, and take 100% of the credit. We handle
                architecture, coding, QA, and deployment — quietly, behind the scenes.
              </p>
              <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed">
                Every project is delivered as if your in-house team built it. Because as far as your clients are
                concerned, they did.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-blue-500" />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Our Promise</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-6 leading-tight">
                The most{' '}
                <span className="text-gradient">trusted invisible engineering partner</span> for agencies globally.
              </h2>
              <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed mb-6">
                Not the cheapest. Not the largest. The most trusted. Agencies call us when they can&apos;t afford
                to get it wrong for their clients.
              </p>
              <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed">
                We want to be the reason 100 agencies confidently scale — without a single bad client delivery.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Differentiators ── */}
      <section className="py-24 bg-[var(--c-bg)] dark:bg-navy-950 border-t border-slate-200 dark:border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <SectionTitle
              eyebrow="Our Differentiators"
              title="What sets our"
              highlight="partnership apart"
              description="Not promises — operating principles that every agency partner experiences from day one."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-7 h-full hover:border-blue-200 dark:hover:border-blue-500/40 transition-colors duration-300">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${v.accent}15`, border: `1px solid ${v.accent}30` }}
                    >
                      <Icon size={19} style={{ color: v.accent }} />
                    </div>
                    <h3 className="text-slate-900 dark:text-[#E8E8E8] font-semibold text-lg mb-3">{v.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed">{v.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="py-24 bg-[var(--c-bg-alt)] dark:bg-navy-900 border-t border-slate-200 dark:border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14 text-center">
            <SectionTitle
              eyebrow="Trust & Transparency"
              title="Built on"
              highlight="real proof"
              align="center"
              description="Metrics and commitments that give agencies confidence to bet their client relationships on us."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { metric: '99.8%', label: 'On-Time Delivery', detail: 'Across 120+ agency projects over 10 years' },
              { metric: '< 1h', label: 'NDA Turnaround', detail: 'NDAs reviewed and signed within the hour' },
              { metric: '0', label: 'Client Breaches', detail: 'Zero white-label violations in our history' },
              { metric: '98%', label: 'Partner Retention', detail: 'Agencies that work with us once, stay' },
              { metric: '6+', label: 'Years Experience', detail: 'Senior team averaging 10+ years per engineer' },
              { metric: '24h', label: 'Proposal Turnaround', detail: 'Detailed proposals within one business day' },
            ].map(({ metric, label, detail }) => (
              <AnimatedSection key={label}>
                <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-6 text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">{metric}</div>
                  <div className="text-slate-900 dark:text-[#E8E8E8] font-semibold mb-2">{label}</div>
                  <div className="text-xs text-slate-400 dark:text-[#64748B]">{detail}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-slate-200 dark:border-navy-500/30 bg-[var(--c-bg)] dark:bg-navy-950">
        <div className="max-w-xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-4">
              Ready to become a partner?
            </h2>
            <p className="text-slate-500 dark:text-[#94A3B8] mb-8">
              Let&apos;s discuss your agency&apos;s capacity needs. NDA first, then we talk details.
            </p>
            <Button href="/contact" variant="primary" size="lg" className="group">
              Start a Conversation
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
