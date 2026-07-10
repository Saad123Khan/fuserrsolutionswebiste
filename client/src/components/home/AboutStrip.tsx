import { Link } from 'react-router-dom';
import { ArrowUpRight, Tag, CalendarCheck, UserCheck, FileLock2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const leftStats = [
  {
    n: '10+',
    title: 'Agency Partners',
    description: 'Agencies who trust us to build behind the scenes, from startups to global brands.',
  },
  {
    n: '6+',
    title: 'Years Experience',
    description: 'Delivering full-stack engineering excellence across web, mobile, and cloud since 2018.',
  },
];

const rightStats = [
  {
    n: '50+',
    title: 'Projects Delivered',
    description: 'Production-grade builds shipped under our partners’ brands, without a single credit.',
  },
  {
    n: '98%',
    title: 'Partner Retention',
    description: 'Agencies that work with us once keep coming back for every new engagement.',
  },
];

const pillars = [
  {
    icon: Tag,
    title: '100% White-Label',
    description:
      'We leave no trace. All deliverables carry your brand — zero external credits, zero client-side visibility.',
  },
  {
    icon: CalendarCheck,
    title: 'On-Time, Every Time',
    description:
      '99.8% on-time delivery across 120+ projects. Our planning is rigorous so your promises to clients never slip.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Dev Team',
    description:
      'Senior engineers matched to your stack, assigned exclusively to your projects with a dedicated PM.',
  },
  {
    icon: FileLock2,
    title: 'NDA-Backed & Secure',
    description:
      'We sign NDAs before any discussion. Your client relationships and IP are legally protected, always.',
  },
];

export default function AboutStrip() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--c-bg)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top — intro */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-6 h-px bg-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 text-sm font-mono font-medium tracking-widest uppercase">
              The Partnership Model
            </span>
            <span className="w-6 h-px bg-blue-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            <span className="text-slate-900 dark:text-[#E8E8E8]">We&apos;re your invisible</span>
            <br />
            <span className="text-gradient">engineering team.</span>
          </h2>
          <p className="text-slate-500 dark:text-[#94A3B8] text-lg leading-relaxed mb-8">
            You maintain the client relationship, set the pricing, and take 100% of the credit.
            We handle architecture, coding, QA, and deployment behind the scenes — so your agency
            scales without hiring.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors group"
          >
            Why agencies choose us
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        {/* Stats — split around a center graphic */}
        <AnimatedSection className="mb-24">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-12 lg:gap-x-20 gap-y-14 items-center">
            {/* Left stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-10 gap-y-12 text-center md:text-right">
              {leftStats.map(({ n, title, description }) => (
                <div key={title}>
                  <h3 className="text-slate-900 dark:text-[#E8E8E8] font-bold text-lg mb-2">
                    <span className="text-gradient">{n}</span> {title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            {/* Center graphic — brand logo */}
            <div className="flex justify-center order-first md:order-none py-4 md:py-0">
              <div className="relative w-32 h-32 sm:w-44 sm:h-44">
                <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-3xl" />
                <img
                  src="/favicon.png"
                  alt="Fuserr Solutions"
                  className="relative w-full h-full object-contain animate-float"
                />
              </div>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-10 gap-y-12 text-center md:text-left">
              {rightStats.map(({ n, title, description }) => (
                <div key={title}>
                  <h3 className="text-slate-900 dark:text-[#E8E8E8] font-bold text-lg mb-2">
                    <span className="text-gradient">{n}</span> {title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom — 4 pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/30 p-6 h-full hover:border-blue-600/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-slate-900 dark:text-[#E8E8E8] font-semibold mb-3">{p.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed">{p.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
