import type { Metadata } from 'next';
import {
  Brain,
  Smartphone,
  Globe,
  ShoppingCart,
  Palette,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI development, mobile apps, web applications, ecommerce, UI/UX design, and maintenance services from Fuserr Solutions.',
  keywords: [
    'AI development services',
    'mobile app development',
    'web application development',
    'ecommerce development',
    'UI UX design services',
    'software maintenance',
  ],
};

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Development',
    tagline: 'Intelligence that creates competitive advantage',
    description:
      'We build AI systems that solve real business problems — not demos. From fine-tuned LLMs to production ML pipelines, our AI solutions are reliable, explainable, and built to scale.',
    deliverables: [
      'Custom LLM fine-tuning and RAG systems',
      'Predictive analytics and forecasting models',
      'Computer vision and NLP pipelines',
      'AI agents and autonomous workflows',
      'MLOps infrastructure and model monitoring',
      'AI integration into existing products',
    ],
    tech: ['Python', 'PyTorch', 'TensorFlow', 'OpenAI', 'LangChain', 'Hugging Face', 'FastAPI', 'AWS SageMaker'],
    accent: '#3B82F6',
    case: 'HealthTrack AI reduced ICU readmissions by 31% using our ML prediction system.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'Native performance, cross-platform reach',
    description:
      'We create mobile experiences that users actually open every day. Whether it\'s a fintech app, a consumer marketplace, or an enterprise tool — we engineer for performance and retention.',
    deliverables: [
      'iOS and Android native development',
      'Cross-platform React Native and Flutter apps',
      'Offline-first architecture',
      'Push notification and analytics integration',
      'App Store optimization and submission',
      'Performance audits and UX testing',
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Xcode', 'Android Studio'],
    accent: '#8B5CF6',
    case: 'NeoBank achieved a 4.8★ App Store rating with 500K+ daily active users.',
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Web Applications',
    tagline: 'SaaS platforms built to handle millions',
    description:
      'From internal dashboards to consumer SaaS serving millions, we architect web applications that are fast, secure, and maintainable. We think in systems, not pages.',
    deliverables: [
      'SaaS platform development',
      'Real-time dashboards and analytics UIs',
      'Multi-tenant architecture',
      'Authentication and authorization systems',
      'API design and developer portals',
      'Progressive Web App (PWA) development',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Kubernetes'],
    accent: '#06B6D4',
    case: 'EduVerse saw a 67% improvement in course completion after platform relaunch.',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'Ecommerce',
    tagline: 'Commerce infrastructure that converts',
    description:
      'We build ecommerce solutions that are engineered for conversion — from headless storefronts to custom checkout flows. Every decision is made with GMV in mind.',
    deliverables: [
      'Headless Shopify and custom storefronts',
      'Product information management (PIM)',
      'Custom checkout and payment flows',
      'Subscription and membership billing',
      'Inventory and order management systems',
      'ML-powered product recommendations',
    ],
    tech: ['Next.js', 'Shopify Plus', 'GraphQL', 'Stripe', 'Algolia', 'Contentful', 'Cloudflare', 'Vercel'],
    accent: '#F59E0B',
    case: 'ShopFlow Commerce drove a 22% increase in conversion rate for Meridian Brands.',
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    tagline: 'Design that earns trust and drives action',
    description:
      'Great design isn\'t about aesthetics alone — it\'s about reducing friction on the path to value. We create interfaces that communicate trust, guide users, and convert.',
    deliverables: [
      'User research and journey mapping',
      'Wireframes and interactive prototypes',
      'Design systems and component libraries',
      'Usability testing and iteration',
      'Motion design and micro-interactions',
      'Design-to-development handoff',
    ],
    tech: ['Figma', 'Framer', 'Principle', 'Maze', 'Hotjar', 'Miro', 'Storybook', 'Zeplin'],
    accent: '#EC4899',
    case: 'Our redesign of LegalEase Pro reduced average task completion time by 45%.',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance & Support',
    tagline: 'Proactive care that keeps you ahead',
    description:
      'Products degrade without attention. We offer structured maintenance programs that keep your software secure, performant, and evolving — with SLAs that match your business needs.',
    deliverables: [
      'Security patching and dependency updates',
      '24/7 uptime monitoring and incident response',
      'Performance profiling and optimization',
      'Database maintenance and migrations',
      'Feature iteration and backlog management',
      'Infrastructure scaling and cost optimization',
    ],
    tech: ['Datadog', 'PagerDuty', 'Sentry', 'Terraform', 'GitHub Actions', 'AWS', 'GCP', 'Grafana'],
    accent: '#10B981',
    case: 'Our managed clients average 99.97% uptime across all production systems.',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Faster Time to Market',
    description:
      'Our battle-tested processes and reusable components mean you ship weeks sooner.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description:
      'Security by design — not an afterthought. Every project follows OWASP standards.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    description:
      'Architecture decisions made with 10× growth in mind from day one.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-950 dot-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-mono tracking-widest uppercase">
                Services
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
              <span className="text-[#E8E8E8]">Six disciplines.</span>
              <br />
              <span className="text-gradient">One standard of excellence.</span>
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-xl">
              We don&apos;t generalize to the point of mediocrity. Every service we offer is backed by
              deep specialists who do it every day.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services — alternating layout */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            return (
              <AnimatedSection key={service.id} delay={0.1}>
                <div
                  id={service.id}
                  className="glass rounded-2xl border border-navy-500/40 overflow-hidden hover:border-navy-500/70 transition-colors duration-300"
                >
                  <div
                    className={`grid lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}
                  >
                    {/* Content side */}
                    <div className="p-8 lg:p-12">
                      <div
                        className="inline-flex w-12 h-12 rounded-xl items-center justify-center mb-6"
                        style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30` }}
                      >
                        <Icon size={22} style={{ color: service.accent }} />
                      </div>

                      <div className="text-xs font-mono text-[#64748B] mb-2 tracking-wider uppercase">
                        {service.tagline}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#E8E8E8] mb-4">
                        {service.title}
                      </h2>
                      <p className="text-[#94A3B8] leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.tech.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>

                      {/* Case study teaser */}
                      <div
                        className="rounded-xl p-4 border text-sm text-[#94A3B8] italic"
                        style={{
                          background: `${service.accent}08`,
                          borderColor: `${service.accent}25`,
                        }}
                      >
                        <span style={{ color: service.accent }} className="font-semibold not-italic">
                          Result:{' '}
                        </span>
                        {service.case}
                      </div>
                    </div>

                    {/* Deliverables side */}
                    <div className="bg-navy-800/40 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-navy-500/30">
                      <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-6">
                        What You Get
                      </h3>
                      <ul className="space-y-4">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0"
                              style={{ color: service.accent }}
                            />
                            <span className="text-sm text-[#94A3B8]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-navy-900 border-t border-navy-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <SectionTitle
              eyebrow="Why Fuserr"
              title="What makes us"
              highlight="different"
              align="center"
            />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <StaggerItem key={b.title}>
                  <div className="glass rounded-2xl border border-navy-500/40 p-8 text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mx-auto mb-5">
                      <Icon size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-[#E8E8E8] font-semibold text-lg mb-3">{b.title}</h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{b.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
