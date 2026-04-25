import { ArrowRight, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-blue-600/15 blur-[100px]" />
      </div>
      {/* Top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-blue-500/25 mb-8">
            <MessageSquare size={13} className="text-blue-400" />
            <span className="text-xs font-mono text-blue-400 tracking-wider">Let&apos;s Talk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            <span className="text-white">Your next product</span>
            <br />
            <span className="text-gradient">starts here.</span>
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            Tell us about your project. We&apos;ll respond within 24 hours with a clear path forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg" className="group">
              Start a Conversation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              See Our Work First
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: '< 24h', label: 'Response time' },
              { value: 'Free', label: 'Initial consultation' },
              { value: 'NDA', label: 'On request' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-lg font-bold text-blue-400">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
