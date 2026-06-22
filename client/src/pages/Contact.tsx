import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
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

  const [form, setForm] = useState({
    name: '', company: '', role: '', email: '', phone: '', budget: '', timeline: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          role: form.role,
          email: form.email,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to send message');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

      {/* ── Main content ── */}
      <section className="pb-24 bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Contact info sidebar */}
            <AnimatedSection direction="left" className="space-y-5">
              {/* Info card */}
              <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-7">
                <h2 className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail,   label: 'Email',         value: 'contact@fuserrsolutions.com', href: 'mailto:contact@fuserrsolutions.com' },
                    { icon: Phone,  label: 'Phone',         value: '+92 333 7804685',          href: 'tel:+923337804685' },
                    { icon: MapPin, label: 'Offices',       value: 'Ground Floor 1-H-1/22, Nazimabad no 1, Karachi, Pakistan. · Remote', href: null },
                    { icon: Clock,  label: 'Response Time', value: '< 24 hours',                 href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 dark:text-[#64748B] mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} className="text-sm text-slate-800 dark:text-[#E8E8E8] hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <div className="text-sm text-slate-800 dark:text-[#E8E8E8]">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Currently accepting agency partners</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-[#64748B]">
                  Available for new projects in Q3 2026. Limited onboarding spots — reach out early.
                </p>
              </div>

              {/* Trust signals */}
              <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-6">
                <h3 className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  {[
                    'Response within 24 hours',
                    'NDA signed before any discussion',
                    'Free 30-min discovery call',
                    'Proposal within 1 business day',
                    'No commitment required',
                    '100% white-label delivery',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-[#94A3B8]">
                      <CheckCircle2 size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={0.15} className="lg:col-span-2">
              {submitted ? (
                <div className="glass rounded-2xl border border-emerald-500/30 p-12 text-center h-full flex flex-col items-center justify-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-3">Message Received!</h2>
                    <p className="text-slate-500 dark:text-[#94A3B8] max-w-sm">
                      Thank you for reaching out. We&apos;ll review your project details and get back
                      to you within 24 hours — NDA first, then we talk details.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-[#E8E8E8]">Start a white-label project</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="name">Full Name *</label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange} placeholder="Jane Smith"
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="company">Agency / Company *</label>
                      <input
                        id="company" name="company" type="text" required
                        value={form.company} onChange={handleChange} placeholder="Acme Digital Agency"
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="role">Your Role</label>
                      <input
                        id="role" name="role" type="text"
                        value={form.role} onChange={handleChange} placeholder="Founder / Director / PM"
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="email">Work Email *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange} placeholder="jane@agency.com"
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="budget">Approximate Budget</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Under $10K', '$10K–30K', '$30K–80K', '$80K+'].map((b) => (
                        <button
                          key={b} type="button"
                          onClick={() => setForm((p) => ({ ...p, budget: b }))}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                            form.budget === b
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-200 dark:border-navy-500/60 text-slate-500 dark:text-[#94A3B8] hover:border-blue-400 dark:hover:border-blue-600/40 hover:text-slate-800 dark:hover:text-[#E8E8E8]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="timeline">Desired Timeline</label>
                    <select
                      id="timeline" name="timeline"
                      value={form.timeline} onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors appearance-none"
                    >
                      <option value="">Select a timeline</option>
                      <option>ASAP (less than 1 month)</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>6+ months</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="message">Project Description *</label>
                    <textarea
                      id="message" name="message" rows={5} required
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us about the project — what you're building for your client, the tech requirements, and any design files or references you have..."
                      className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                  )}

                  <Button type="submit" variant="primary" size="lg" className="w-full justify-center group" disabled={loading}>
                    {loading ? 'Sending…' : 'Start a Project'}
                    {!loading && <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />}
                  </Button>

                  <p className="text-xs text-center text-slate-400 dark:text-[#64748B]">
                    We respond within 24 hours. NDA signed before any detailed discussion begins.
                  </p>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

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
