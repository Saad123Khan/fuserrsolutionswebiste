import type { Metadata } from 'next';
import { Globe, Server, Smartphone, Package, Plug, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Our Services — Web, Mobile, Backend, API, SaaS & UI | Fuserr Solutions',
  description:
    'Full-stack white-label services for agencies: React/Next.js frontends, Node/.NET backends, React Native/Flutter apps, SaaS platforms, API integrations & UI implementation.',
};

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web Application Development',
    tagline: 'Responsive, SEO-friendly web apps under your brand',
    description:
      'We build full-stack web applications — from marketing sites to complex SaaS dashboards — delivered pixel-perfect and fully attributed to your agency.',
    deliverables: [
      'React, Next.js, Vue, Angular frontends',
      'CMS-based and static site builds',
      'Multi-tenant SaaS platforms',
      'Real-time dashboards and analytics UIs',
      'Progressive Web Apps (PWA)',
    ],
    tech: ['Next.js', 'React', 'Vue', 'TypeScript', 'Node.js', 'PostgreSQL'],
    accent: '#3B82F6',
    result: 'Agencies consistently resell our web builds at 3–5× our development cost.',
  },
  {
    id: 'backend',
    icon: Server,
    title: 'Backend & API Engineering',
    tagline: 'Scalable, secure backends your clients can rely on',
    description:
      'Robust server-side engineering — REST and GraphQL APIs, third-party integrations, authentication systems, and cloud infrastructure — all invisible to your clients.',
    deliverables: [
      'REST and GraphQL API design and development',
      'Authentication and authorization systems',
      'Database design and optimization',
      'Microservices and serverless architecture',
      'Third-party service integrations',
    ],
    tech: ['Node.js', 'Laravel', 'Python', '.NET', 'Go', 'AWS', 'Redis'],
    accent: '#06B6D4',
    result: 'Our backends average 99.97% uptime across all production environments.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    tagline: 'White-label iOS & Android apps for your clients',
    description:
      'Cross-platform and native mobile apps built to perform and retain — published under your agency\'s developer account or your client\'s, as required.',
    deliverables: [
      'React Native and Flutter cross-platform apps',
      'Swift (iOS) and Kotlin (Android) native builds',
      'Offline-first architecture',
      'Push notification and analytics integration',
      'App Store and Play Store submission',
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    accent: '#8B5CF6',
    result: 'Our mobile builds average 4.7★ on App Store and Play Store.',
  },
  {
    id: 'saas',
    icon: Package,
    title: 'SaaS Product Development',
    tagline: 'End-to-end SaaS from MVP to enterprise scale',
    description:
      'We build complete SaaS products — multi-tenancy, subscription billing, onboarding flows, and admin dashboards — delivered as your agency\'s proprietary product.',
    deliverables: [
      'Multi-tenant architecture design',
      'Subscription and billing integration (Stripe)',
      'Role-based access control (RBAC)',
      'Onboarding flows and in-app messaging',
      'White-label admin and client portals',
    ],
    tech: ['Next.js', 'Stripe', 'AWS', 'PostgreSQL', 'Redis', 'Docker'],
    accent: '#F59E0B',
    result: 'SaaS clients we\'ve built for have raised $10M+ in subsequent funding rounds.',
  },
  {
    id: 'integrations',
    icon: Plug,
    title: 'API & Third-Party Integrations',
    tagline: 'Connect systems seamlessly for your clients',
    description:
      'CRM, ERP, payment gateway, analytics, and custom integrations that make your clients\' existing tools work together — no disruption, no visibility.',
    deliverables: [
      'CRM integrations (HubSpot, Salesforce)',
      'Payment gateway integrations (Stripe, PayPal)',
      'ERP and inventory system connections',
      'Analytics and tracking integrations',
      'Custom webhook and event-driven pipelines',
    ],
    tech: ['REST APIs', 'GraphQL', 'Webhooks', 'OAuth', 'Zapier', 'n8n'],
    accent: '#10B981',
    result: 'We\'ve completed 200+ integration projects across every major platform.',
  },
  {
    id: 'ui',
    icon: Layers,
    title: 'UI/UX Implementation',
    tagline: 'Pixel-perfect builds from any design file',
    description:
      'We translate Figma, Sketch, or Adobe XD designs into production-ready, accessible HTML/CSS components — exactly as specified, every time.',
    deliverables: [
      'Pixel-perfect component development from Figma',
      'Responsive and mobile-first layouts',
      'Design system and component library builds',
      'Accessibility (WCAG 2.1) compliance',
      'Motion and micro-interaction implementation',
    ],
    tech: ['Figma', 'Tailwind CSS', 'Framer Motion', 'Storybook', 'SCSS'],
    accent: '#EC4899',
    result: 'Our UI implementations pass design review on the first submission 96% of the time.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-[var(--c-bg)]">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/6 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Services</span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6">
              <span className="text-slate-900 dark:text-[#E8E8E8]">Complete dev services.</span>
              <br />
              <span className="text-gradient">Your brand. Always.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-xl mx-auto">
              Six disciplines. Senior specialists. Every deliverable fully attributed to your agency — NDA-backed, no exceptions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="pb-8 bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured: Web Dev — full width */}
          <AnimatedSection className="mb-5">
            {(() => {
              const s = services[0];
              const Icon = s.icon;
              return (
                <div id={s.id} className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-navy-500/40 bg-white dark:bg-navy-800/30 group hover:border-blue-200 dark:hover:border-blue-600/30 transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at 80% 50%, ${s.accent}08, transparent 60%)` }} />

                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left */}
                    <div className="p-10 lg:p-14">
                      <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6" style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}>
                        <Icon size={26} style={{ color: s.accent }} />
                      </div>
                      <div className="text-xs font-mono text-slate-400 dark:text-[#64748B] uppercase tracking-wider mb-2">{s.tagline}</div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-5">{s.title}</h2>
                      <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed mb-8 max-w-md">{s.description}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {s.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                      <div className="rounded-2xl p-5 border text-sm" style={{ background: `${s.accent}08`, borderColor: `${s.accent}22` }}>
                        <span style={{ color: s.accent }} className="font-semibold">Result: </span>
                        <span className="text-slate-500 dark:text-[#94A3B8]">{s.result}</span>
                      </div>
                    </div>

                    {/* Right — deliverables */}
                    <div className="bg-slate-50 dark:bg-navy-800/60 p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-navy-500/30">
                      <h3 className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest mb-8">What Your Agency Gets</h3>
                      <ul className="space-y-5">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-3">
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: s.accent }} />
                            <span className="text-sm text-slate-600 dark:text-[#94A3B8]">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </AnimatedSection>

          {/* Remaining 5 */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
            {services.slice(1).map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.id}>
                  <div id={s.id} className="group h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-500/40 bg-white dark:bg-navy-800/30 hover:border-blue-200 dark:hover:border-blue-600/30 transition-all duration-300 flex flex-col">
                    {/* Color header strip */}
                    <div className="relative h-36 overflow-hidden flex-shrink-0" style={{ background: `linear-gradient(135deg, ${s.accent}18 0%, ${s.accent}06 100%)` }}>
                      <div className="absolute right-[-15px] top-[-15px] w-28 h-28 rounded-full opacity-15" style={{ background: s.accent }} />
                      <div className="absolute inset-0 dot-grid opacity-25" />
                      <div className="absolute bottom-5 left-6">
                        <div className="inline-flex w-12 h-12 rounded-xl items-center justify-center" style={{ background: `${s.accent}25`, border: `1px solid ${s.accent}35` }}>
                          <Icon size={22} style={{ color: s.accent }} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="text-[11px] font-mono text-slate-400 dark:text-[#64748B] uppercase tracking-wider mb-1.5">{s.tagline}</div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-3">{s.title}</h2>
                      <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed mb-5 flex-1">{s.description}</p>

                      <ul className="space-y-2 mb-5">
                        {s.deliverables.slice(0, 3).map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: s.accent }} />
                            <span className="text-xs text-slate-500 dark:text-[#94A3B8]">{d}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {s.tech.slice(0, 4).map((t) => <span key={t} className="tech-tag">{t}</span>)}
                      </div>

                      <div className="rounded-xl p-3 border text-xs" style={{ background: `${s.accent}07`, borderColor: `${s.accent}20` }}>
                        <span style={{ color: s.accent }} className="font-semibold">Result: </span>
                        <span className="text-slate-500 dark:text-[#94A3B8]">{s.result}</span>
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
      <section className="py-20 border-t border-slate-200 dark:border-navy-500/30 bg-[var(--c-bg)] text-center">
        <AnimatedSection className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-4">
            Ready to expand your capacity?
          </h2>
          <p className="text-slate-500 dark:text-[#94A3B8] mb-8">
            Tell us about your client&apos;s project — we&apos;ll recommend the right service and get you a quote within 24 hours.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="group">
            Get a Quote <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </AnimatedSection>
      </section>

      <CTABanner />
    </>
  );
}
