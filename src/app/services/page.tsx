import type { Metadata } from 'next';
import { Brain, Smartphone, Globe, ShoppingCart, Palette, Wrench, CheckCircle2, ArrowUpRight, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI development, mobile apps, web applications, ecommerce, UI/UX design, and maintenance from Fuserr Solutions.',
};

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Development',
    tagline: 'Intelligence that creates competitive advantage',
    description: 'We build AI systems that solve real business problems — not demos. From fine-tuned LLMs to production ML pipelines, reliable, explainable, and built to scale.',
    deliverables: ['Custom LLM fine-tuning and RAG systems', 'Predictive analytics and forecasting', 'Computer vision and NLP pipelines', 'AI agents and autonomous workflows', 'MLOps infrastructure and model monitoring'],
    tech: ['Python', 'PyTorch', 'OpenAI', 'LangChain', 'FastAPI', 'AWS SageMaker'],
    accent: '#3B82F6',
    result: 'HealthTrack AI reduced ICU readmissions by 31% using our ML prediction system.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'Native performance, cross-platform reach',
    description: 'We create mobile experiences that users actually open every day. Whether fintech, marketplace, or enterprise tool — we engineer for performance and retention.',
    deliverables: ['iOS and Android native development', 'Cross-platform React Native & Flutter', 'Offline-first architecture', 'Push notification and analytics', 'App Store submission and ASO'],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    accent: '#8B5CF6',
    result: 'NeoBank achieved 4.8★ App Store rating with 500K+ daily active users.',
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Web Applications',
    tagline: 'SaaS platforms built to handle millions',
    description: 'From internal dashboards to consumer SaaS serving millions, we architect web applications that are fast, secure, and maintainable. We think in systems, not pages.',
    deliverables: ['SaaS platform development', 'Real-time dashboards and analytics UIs', 'Multi-tenant architecture', 'Authentication and authorization systems', 'Progressive Web Apps (PWA)'],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis'],
    accent: '#06B6D4',
    result: 'EduVerse saw a 67% improvement in course completion after relaunch.',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'Ecommerce',
    tagline: 'Commerce infrastructure that converts',
    description: 'We build ecommerce solutions engineered for conversion — from headless storefronts to custom checkout flows. Every decision is made with GMV in mind.',
    deliverables: ['Headless Shopify and custom storefronts', 'Custom checkout and payment flows', 'Subscription and membership billing', 'Inventory and order management', 'ML-powered recommendations'],
    tech: ['Next.js', 'Shopify Plus', 'GraphQL', 'Stripe', 'Algolia', 'Vercel'],
    accent: '#F59E0B',
    result: 'ShopFlow drove a 22% conversion rate increase for Meridian Brands.',
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    tagline: 'Design that earns trust and drives action',
    description: 'Great design reduces friction on the path to value. We create interfaces that communicate trust, guide users, and convert visitors into customers.',
    deliverables: ['User research and journey mapping', 'Wireframes and interactive prototypes', 'Design systems and component libraries', 'Usability testing and iteration', 'Motion design and micro-interactions'],
    tech: ['Figma', 'Framer', 'Principle', 'Maze', 'Hotjar', 'Storybook'],
    accent: '#EC4899',
    result: 'Our LegalEase Pro redesign reduced average task time by 45%.',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance & Support',
    tagline: 'Proactive care that keeps you ahead',
    description: 'Products degrade without attention. We offer structured maintenance that keeps your software secure, performant, and evolving with SLAs that match your needs.',
    deliverables: ['Security patching and dependency updates', '24/7 uptime monitoring and incident response', 'Performance profiling and optimization', 'Database maintenance and migrations', 'Infrastructure scaling and cost optimisation'],
    tech: ['Datadog', 'PagerDuty', 'Sentry', 'Terraform', 'GitHub Actions', 'AWS'],
    accent: '#10B981',
    result: 'Our managed clients average 99.97% uptime across all production systems.',
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
              <span className="text-slate-900 dark:text-[#E8E8E8]">One standard</span>
              <br />
              <span className="text-gradient">of excellence.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-xl mx-auto">
              Six disciplines. Deep specialists. Every project built to the same uncompromising standard.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Service Cards — Bento Grid ── */}
      <section className="pb-8 bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured: AI Dev — full width */}
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
                      <h3 className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest mb-8">What You Get</h3>
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

          {/* Remaining 5 in 2+3 grid */}
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
                      <ArrowUpRight size={15} className="absolute top-5 right-5 text-slate-200 dark:text-navy-500 group-hover:text-blue-500 transition-colors" />
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
            Not sure which service fits?
          </h2>
          <p className="text-slate-500 dark:text-[#94A3B8] mb-8">
            Tell us your challenge — we&apos;ll recommend the right approach. No sales pitch.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="group">
            Talk to Us <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </AnimatedSection>
      </section>

      <CTABanner />
    </>
  );
}
