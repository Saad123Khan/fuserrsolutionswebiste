import Link from 'next/link';
import { ArrowUpRight, Shield, EyeOff, Users, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const pillars = [
  {
    icon: EyeOff,
    title: '100% White-Label',
    description:
      'We leave no trace. All deliverables carry your brand — zero external credits, zero client-side visibility.',
  },
  {
    icon: Clock,
    title: 'On-Time, Every Time',
    description:
      '99.8% on-time delivery across 120+ projects. Our planning is rigorous so your promises to clients never slip.',
  },
  {
    icon: Users,
    title: 'Dedicated Dev Team',
    description:
      'Senior engineers matched to your stack, assigned exclusively to your projects with a dedicated PM.',
  },
  {
    icon: Shield,
    title: 'NDA-Backed & Secure',
    description:
      'We sign NDAs before any discussion. Your client relationships and IP are legally protected, always.',
  },
];

export default function AboutStrip() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top — asymmetric intro */}
        <AnimatedSection className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-mono font-medium tracking-widest uppercase">
                The Partnership Model
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <span className="text-[#E8E8E8]">We&apos;re your invisible</span>
              <br />
              <span className="text-gradient">engineering team.</span>
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
              You maintain the client relationship, set the pricing, and take 100% of the credit.
              We handle architecture, coding, QA, and deployment behind the scenes — so your agency
              scales without hiring.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors group"
            >
              Why agencies choose us
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right — stats visual */}
          <div className="relative">
            <div className="glass rounded-2xl border border-navy-500/40 p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '10+',  l: 'Agency Partners' },
                  { n: '6+',  l: 'Years Experience' },
                  { n: '50+', l: 'Projects Delivered' },
                  { n: '98%',  l: 'Partner Retention' },
                ].map(({ n, l }) => (
                  <div key={l} className="bg-navy-800/60 rounded-xl p-5">
                    <div className="text-3xl font-bold text-gradient mb-1">{n}</div>
                    <div className="text-xs text-[#64748B] font-medium">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom — 4 pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div className="glass rounded-2xl border border-navy-500/30 p-6 h-full hover:border-blue-600/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <h3 className="text-[#E8E8E8] font-semibold mb-3">{p.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{p.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
