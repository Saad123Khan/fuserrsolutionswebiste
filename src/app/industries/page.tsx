import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  DollarSign,
  GraduationCap,
  ShoppingBag,
  Building,
  Truck,
  Clapperboard,
  Scale,
  Landmark,
  Rocket,
  ArrowUpRight,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Fuserr Solutions serves 10+ industries including healthcare, fintech, education, ecommerce, legal tech, and logistics.',
};

const industries = [
  {
    icon: Heart,
    name: 'Healthcare',
    description:
      'HIPAA-compliant systems, patient portals, clinical AI, and remote monitoring platforms that improve outcomes and reduce operational burden.',
    projects: ['Patient monitoring AI', 'Telehealth platforms', 'EHR integrations', 'Clinical analytics'],
    accent: '#10B981',
    stat: '31% avg ICU readmission reduction',
  },
  {
    icon: DollarSign,
    name: 'Fintech',
    description:
      'Digital banking, payment infrastructure, wealth management platforms, and regulatory-compliant financial products built for scale.',
    projects: ['Neobank platforms', 'Payment APIs', 'KYC/AML systems', 'Trading dashboards'],
    accent: '#3B82F6',
    stat: '99.99% uptime on payment systems',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description:
      'Learning management systems, adaptive education platforms, and assessment tools that improve engagement and learning outcomes.',
    projects: ['LMS platforms', 'AI tutoring', 'Assessment tools', 'Learning analytics'],
    accent: '#8B5CF6',
    stat: '67% avg course completion improvement',
  },
  {
    icon: ShoppingBag,
    name: 'Ecommerce & Retail',
    description:
      'Headless commerce, omnichannel platforms, and inventory systems that drive conversion and customer loyalty.',
    projects: ['Headless storefronts', 'Loyalty programs', 'PIM systems', 'AI recommendations'],
    accent: '#F59E0B',
    stat: '22% avg conversion rate increase',
  },
  {
    icon: Building,
    name: 'Real Estate',
    description:
      'Property management platforms, virtual tours, CRM systems, and transaction management tools for modern real estate.',
    projects: ['Property portals', 'Virtual tours', 'CRM systems', 'Market analytics'],
    accent: '#06B6D4',
    stat: '3× faster deal closing for clients',
  },
  {
    icon: Truck,
    name: 'Logistics',
    description:
      'Supply chain visibility platforms, route optimization, warehouse management, and IoT-powered tracking systems.',
    projects: ['Shipment tracking', 'Route optimization', 'WMS systems', 'IoT integration'],
    accent: '#EF4444',
    stat: '89% on-time delivery improvement',
  },
  {
    icon: Clapperboard,
    name: 'Media & Entertainment',
    description:
      'Streaming platforms, content management systems, audience analytics, and creator economy tools.',
    projects: ['Streaming platforms', 'CMS solutions', 'Creator tools', 'Audience analytics'],
    accent: '#EC4899',
    stat: '4× content delivery speed improvement',
  },
  {
    icon: Scale,
    name: 'Legal Tech',
    description:
      'AI-powered contract analysis, case management, document automation, and compliance monitoring tools.',
    projects: ['Contract AI', 'Case management', 'Document automation', 'Compliance tools'],
    accent: '#A78BFA',
    stat: '70% reduction in document review time',
  },
  {
    icon: Landmark,
    name: 'Government & Non-profit',
    description:
      'Citizen service portals, grant management systems, and data platforms built for public accountability and efficiency.',
    projects: ['Citizen portals', 'Grant management', 'Public data APIs', 'Service platforms'],
    accent: '#34D399',
    stat: '60% reduction in processing times',
  },
  {
    icon: Rocket,
    name: 'Startups & SMBs',
    description:
      'MVPs, growth platforms, and technical infrastructure for early-stage and growth-stage companies that need to move fast.',
    projects: ['MVP development', 'Growth platforms', 'Technical co-founding', 'Rapid iteration'],
    accent: '#FBBF24',
    stat: 'Average 3-month MVP launch',
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-[var(--c-bg)]">
        <div className="absolute inset-0 dot-grid opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/6 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">
                Industries
              </span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6">
              <span className="text-slate-900 dark:text-[#E8E8E8]">Deep expertise</span>
              <br />
              <span className="text-gradient">across 10 sectors.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-xl mx-auto">
              We&apos;ve built production software in industries where quality isn&apos;t optional —
              healthcare, finance, logistics, and more.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries grid — varied layout */}
      <section className="py-16 bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              const isFeatured = i === 0 || i === 1;

              return (
                <StaggerItem key={industry.name}>
                  <div
                    className={`glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-7 h-full hover:border-blue-200 dark:hover:border-blue-600/30 transition-all duration-300 group ${
                      isFeatured ? 'relative overflow-hidden' : ''
                    }`}
                    style={isFeatured ? { borderColor: `${industry.accent}30` } : {}}
                  >
                    {isFeatured && (
                      <div
                        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 0% 0%, ${industry.accent}, transparent 70%)` }}
                      />
                    )}

                    <div className="relative flex items-start gap-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${industry.accent}15`, border: `1px solid ${industry.accent}30` }}
                      >
                        <Icon size={20} style={{ color: industry.accent }} />
                      </div>

                      <div className="flex-1">
                        <h2 className="text-slate-900 dark:text-[#E8E8E8] font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                          {industry.name}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed mb-5">
                          {industry.description}
                        </p>

                        {/* Project types */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {industry.projects.map((p) => (
                            <span
                              key={p}
                              className="text-xs px-2.5 py-1 rounded-full border"
                              style={{
                                background: `${industry.accent}10`,
                                borderColor: `${industry.accent}25`,
                                color: industry.accent,
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>

                        {/* Stat */}
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-[#64748B]">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: industry.accent }}
                          />
                          {industry.stat}
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-200 dark:border-navy-500/30 bg-[var(--c-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <SectionTitle
              eyebrow="Let's Collaborate"
              title="Don't see your industry?"
              highlight="your industry?"
              description="We adapt our process to new domains quickly. Tell us about your space and we'll show you what we can do."
              align="center"
            />
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors shadow-blue-sm hover:shadow-blue-md group"
              >
                Start a Conversation
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
