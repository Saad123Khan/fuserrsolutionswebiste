'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

const faqs = [
  {
    q: 'How long does it take to get started?',
    a: 'After an initial call, we can typically have a proposal within 3 business days and kick off within 1–2 weeks depending on your timeline.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Absolutely. We sign NDAs before any detailed project discussions if requested. Your ideas are safe with us.',
  },
  {
    q: 'What is your minimum project size?',
    a: 'We typically engage on projects with a minimum budget of $20K. For smaller needs, our maintenance retainers may be a better fit.',
  },
  {
    q: 'Can you work with our existing team?',
    a: 'Yes. We offer staff augmentation alongside full project delivery. Many clients use us to extend internal teams during growth phases.',
  },
  {
    q: 'How do you handle time zones?',
    a: 'We have team members in North America, Europe, and the Middle East. We structure projects to ensure overlap hours with any timezone.',
  },
  {
    q: 'What happens after the project launches?',
    a: 'We offer structured maintenance retainers and can continue as your long-term engineering partner for feature development and scaling.',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Contact</span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6">
              <span className="text-slate-900 dark:text-[#E8E8E8]">Let&apos;s build</span>
              <br />
              <span className="text-gradient">something great.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-xl mx-auto">
              Tell us about your project. We respond within 24 hours with a thoughtful assessment
              and a clear path forward.
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
                    { icon: Mail, label: 'Email', value: 'hello@fuserrsolutions.com', href: 'mailto:hello@fuserrsolutions.com' },
                    { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                    { icon: MapPin, label: 'Offices', value: 'San Francisco · Dubai · Remote', href: null },
                    { icon: Clock, label: 'Response Time', value: '< 24 hours', href: null },
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
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Currently accepting projects</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-[#64748B]">
                  Availability for Q2 2026. Limited spots — reach out early.
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
                    'Free 30-min discovery call',
                    'No commitment required',
                    'NDA available on request',
                    'Fixed-price or T&M options',
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
                      to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-[#E8E8E8]">Tell us about your project</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="name">Full Name *</label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange} placeholder="John Smith"
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="email">Work Email *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange} placeholder="john@company.com"
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="company">Company</label>
                      <input
                        id="company" name="company" type="text"
                        value={form.company} onChange={handleChange} placeholder="Acme Inc."
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="service">Service Needed</label>
                      <select
                        id="service" name="service"
                        value={form.service} onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors appearance-none"
                      >
                        <option value="">Select a service</option>
                        <option>AI Development</option>
                        <option>Mobile Apps</option>
                        <option>Web Applications</option>
                        <option>Ecommerce</option>
                        <option>UI/UX Design</option>
                        <option>Maintenance &amp; Support</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="budget">Estimated Budget</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['$20K–50K', '$50K–100K', '$100K–250K', '$250K+'].map((b) => (
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

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="message">Project Details *</label>
                    <textarea
                      id="message" name="message" rows={5} required
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us about your project, goals, timeline, and any technical requirements..."
                      className="w-full bg-slate-50 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 dark:focus:border-blue-600/60 transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full justify-center group">
                    Send Message
                    <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Button>

                  <p className="text-xs text-center text-slate-400 dark:text-[#64748B]">
                    We&apos;ll respond within 24 hours. No spam, ever.
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
