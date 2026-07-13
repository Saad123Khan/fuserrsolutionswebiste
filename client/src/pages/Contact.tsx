import AnimatedSection from '@/components/ui/AnimatedSection';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

const faqs = [
  {
    q: 'What is white-label development?',
    a: 'We build software that you brand and deliver as your own. Your clients never know we exist — all deliverables carry your agency\'s branding, and we sign NDAs to ensure it stays that way.',
  },
  {
    q: 'Who owns the code after delivery?',
    a: 'You do. Once the project is complete, we hand over all source code, assets, and documentation. Full ownership — no licensing fees, no ongoing dependency on us.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Absolutely — and we do it before any detailed discussion begins. We operate under strict NDAs to protect your client relationships. We leave no trace in our code.',
  },
  {
    q: 'What are your payment terms?',
    a: 'Typically 50% upfront and 50% on delivery for fixed-price projects. Monthly retainer and hourly engagements are invoiced on net-30 terms.',
  },
  {
    q: 'Can I see progress before final delivery?',
    a: 'Yes. We demo working software every sprint via staging URLs so you can review and give feedback before anything is finalised.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. We offer monthly maintenance retainers covering monitoring, updates, performance optimisation, and priority support — billed under your agency\'s name if needed.',
  },
];

export default function ContactPage() {
  useDocumentTitle('Contact');

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
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Start a Project</span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6">
              <span className="text-slate-900 dark:text-[#E8E8E8]">Let&apos;s build</span>
              <br />
              <span className="text-gradient">under your brand.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-xl mx-auto">
              Tell us about your client&apos;s project. We respond within 24 hours with a clear
              proposal — NDA signed upfront, no commitment required.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />

      {/* ── FAQ ── */}
      <section className="py-24 border-t border-slate-200 dark:border-navy-500/30 bg-[var(--c-bg)] dark:bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">FAQ</span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-[#E8E8E8]">Common questions</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 0.05}>
                <div className="glass rounded-xl border border-slate-200 dark:border-navy-500/40 p-6">
                  <h3 className="text-slate-900 dark:text-[#E8E8E8] font-semibold mb-3">{faq.q}</h3>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
