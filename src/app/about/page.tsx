import type { Metadata } from 'next';
import { Heart, Target, Users, Zap, Globe, Shield, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Fuserr Solutions — our story, mission, values, and the team behind the software that shapes industries.',
};

const values = [
  {
    icon: Target,
    title: 'Outcome-Driven',
    description: 'We measure success by what your product achieves, not by hours billed or features shipped.',
    accent: '#3B82F6',
  },
  {
    icon: Shield,
    title: 'Relentless Quality',
    description: 'Every codebase we touch is treated as if we\'ll be the ones maintaining it forever.',
    accent: '#10B981',
  },
  {
    icon: Users,
    title: 'True Partnership',
    description: 'We don\'t disappear after requirements are gathered. We co-invest in your outcomes.',
    accent: '#8B5CF6',
  },
  {
    icon: Zap,
    title: 'Bias for Action',
    description: 'We ship working software. Perfect is the enemy of shipped. We iterate with purpose.',
    accent: '#F59E0B',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Teams in San Francisco, Dubai, and Eastern Europe give us diverse thinking and 24h coverage.',
    accent: '#06B6D4',
  },
  {
    icon: Heart,
    title: 'Craft with Care',
    description: 'Software that looks good, works great, and holds up under load — because we take pride in our work.',
    accent: '#EC4899',
  },
];

const timeline = [
  {
    year: '2016',
    title: 'Founded',
    description: 'Two engineers left Big Tech to build software for founders who deserved better.',
  },
  {
    year: '2018',
    title: 'First AI Project',
    description: 'Built our first ML system — a fraud detection model for a fintech startup.',
  },
  {
    year: '2020',
    title: 'Team of 15',
    description: 'Expanded into mobile and design. Launched 30+ projects across 4 continents.',
  },
  {
    year: '2022',
    title: 'Dubai Office',
    description: 'Opened MENA operations to serve rapidly growing Gulf markets.',
  },
  {
    year: '2023',
    title: 'AI-First Pivot',
    description: 'Dedicated AI practice launched. Shipped 12 LLM and ML products in one year.',
  },
  {
    year: '2025',
    title: 'Today',
    description: '40+ team members, 120+ shipped projects, $50M+ in value delivered for clients.',
  },
];

const stats = [
  { value: '120+', label: 'Projects Delivered', sub: 'Across 15 countries' },
  { value: '8+', label: 'Years in Operation', sub: 'Since 2016' },
  { value: '40+', label: 'Team Members', sub: '3 continents' },
  { value: '98%', label: 'Client Retention', sub: 'Speak for themselves' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-950 dot-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-mono tracking-widest uppercase">About</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
                  <span className="text-[#E8E8E8]">We exist to</span>
                  <br />
                  <span className="text-gradient">close the gap</span>
                  <br />
                  <span className="text-[#E8E8E8]">between vision</span>
                  <br />
                  <span className="text-[#E8E8E8]">and reality.</span>
                </h1>
                <p className="text-lg text-[#94A3B8] leading-relaxed">
                  Founded by engineers who got tired of watching great ideas fail at execution,
                  Fuserr Solutions was built on a simple belief: world-class software should be
                  accessible to any ambitious team, not just those with a Big Tech budget.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label, sub }) => (
                  <div key={label} className="glass rounded-2xl border border-navy-500/40 p-6">
                    <div className="text-3xl font-bold text-gradient mb-1">{value}</div>
                    <div className="text-sm font-medium text-[#E8E8E8] mb-1">{label}</div>
                    <div className="text-xs text-[#64748B]">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-navy-900 border-t border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-blue-500" />
                <span className="text-blue-400 text-sm font-mono tracking-widest uppercase">Mission</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#E8E8E8] mb-6 leading-tight">
                Build software that{' '}
                <span className="text-gradient">shapes industries</span> — one product at a time.
              </h2>
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                We believe that software, when built well, doesn&apos;t just solve a problem —
                it creates a competitive moat, enables new business models, and transforms how
                entire industries operate.
              </p>
              <p className="text-[#94A3B8] leading-relaxed">
                That&apos;s the standard we hold ourselves to. Not features. Not deliverables. Outcomes.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-blue-500" />
                <span className="text-blue-400 text-sm font-mono tracking-widest uppercase">Vision</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#E8E8E8] mb-6 leading-tight">
                The most{' '}
                <span className="text-gradient">trusted engineering partner</span> for ambitious teams globally.
              </h2>
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                Not the largest agency. Not the cheapest. The most trusted. The team that founders and
                CTOs call when they can&apos;t afford to get it wrong.
              </p>
              <p className="text-[#94A3B8] leading-relaxed">
                We want to be the reason a hundred companies reach their first million users.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy-950 border-t border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <SectionTitle
              eyebrow="Our Values"
              title="The principles"
              highlight="we operate by"
              description="Not aspirational statements. Operating principles that every team member lives by, every day."
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="glass rounded-2xl border border-navy-500/40 p-7 h-full hover:border-opacity-70 transition-colors duration-300">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${v.accent}15`, border: `1px solid ${v.accent}30` }}
                    >
                      <Icon size={19} style={{ color: v.accent }} />
                    </div>
                    <h3 className="text-[#E8E8E8] font-semibold text-lg mb-3">{v.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{v.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-navy-900 border-t border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <SectionTitle
              eyebrow="Our Journey"
              title="A story of"
              highlight="steady growth"
              description="Eight years of building, learning, and compounding our craft."
            />
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/60 via-navy-500 to-transparent" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.08}>
                  <div
                    className={`relative flex items-start gap-8 ${
                      i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Year bubble */}
                    <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-navy-800 border-2 border-blue-600 flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>

                    {/* Content */}
                    <div
                      className={`ml-16 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${
                        i % 2 === 0 ? 'lg:text-right' : 'lg:text-left lg:ml-[calc(50%+2.5rem)]'
                      }`}
                    >
                      <div
                        className="inline-block text-xs font-mono font-bold text-blue-400 mb-2 px-3 py-1 rounded-full"
                        style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}
                      >
                        {item.year}
                      </div>
                      <h3 className="text-[#E8E8E8] font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-[#94A3B8]">{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-navy-500/30 bg-navy-950">
        <div className="max-w-xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">
              Ready to work with us?
            </h2>
            <p className="text-[#94A3B8] mb-8">
              Let&apos;s discuss your next project. No obligation, no sales pressure.
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
