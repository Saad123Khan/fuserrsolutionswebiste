import { ArrowRight, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">

      {/* Light glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-blue-600/6 blur-[80px]" />
      </div>
      {/* Top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8">
            <Shield size={13} className="text-blue-600" />
            <span className="text-xs font-mono text-blue-600 tracking-wider">NDA-Backed Partnership</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-slate-900">Scale your agency</span>
            <br />
            <span className="text-gradient">without hiring.</span>
          </h2>

          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto">
            Tell us about your client&apos;s project. We&apos;ll respond within 24 hours
            with a clear proposal — ready to go under your brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg" className="group">
              Start a Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book a Free Call
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: '< 24h',  label: 'Response time' },
              { value: 'Free',   label: 'Initial consultation' },
              { value: 'NDA',    label: 'Signed upfront' },
              { value: '100%',   label: 'Your brand' },
            ].map(({ value, label }) => (
                <div key={label} className="text-center">
                <div className="text-lg font-bold text-blue-600">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
