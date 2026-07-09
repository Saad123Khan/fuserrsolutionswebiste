import { useState } from 'react';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function CTABanner() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contact` : '/api/contact';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    <section className="py-24 relative overflow-hidden bg-[var(--c-bg-alt)]">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-blue-600/15 blur-[100px]" />
      </div>
      {/* Top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left — form + buttons */}
          <AnimatedSection direction="left">
            {submitted ? (
              <div className="glass rounded-2xl border border-emerald-500/30 p-10 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={26} className="text-emerald-500 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#E8E8E8] mb-2">Message received!</h3>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8]">We&apos;ll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-8 space-y-5">
                <div>
                  <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="cta-name">Name</label>
                  <input
                    id="cta-name" name="name" type="text" required
                    value={form.name} onChange={handleChange} placeholder="Jane Smith"
                    className="w-full bg-transparent border-b border-slate-300 dark:border-navy-500/60 pb-2 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="cta-email">Email</label>
                  <input
                    id="cta-email" name="email" type="email" required
                    value={form.email} onChange={handleChange} placeholder="jane@agency.com"
                    className="w-full bg-transparent border-b border-slate-300 dark:border-navy-500/60 pb-2 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="cta-company">Company</label>
                  <input
                    id="cta-company" name="company" type="text" required
                    value={form.company} onChange={handleChange} placeholder="Acme Digital Agency"
                    className="w-full bg-transparent border-b border-slate-300 dark:border-navy-500/60 pb-2 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 dark:text-[#64748B] mb-2" htmlFor="cta-message">Tell us about your project</label>
                  <textarea
                    id="cta-message" name="message" rows={3} required
                    value={form.message} onChange={handleChange} placeholder="What are you building?"
                    className="w-full bg-transparent border-b border-slate-300 dark:border-navy-500/60 pb-2 text-sm text-slate-900 dark:text-[#E8E8E8] placeholder:text-slate-400 dark:placeholder:text-[#64748B] focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Buttons — below the form, left column */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button type="submit" variant="primary" size="lg" className="group flex-1 justify-center" disabled={loading}>
                    {loading ? 'Sending…' : 'Start a Project'}
                    {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </Button>
                  <Button href="/contact" variant="outline" size="lg" className="flex-1 justify-center">
                    Book a Free Call
                  </Button>
                </div>
              </form>
            )}
          </AnimatedSection>

          {/* Right — heading + copy + stats */}
          <AnimatedSection direction="right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 dark:bg-white/5 border border-blue-500/25 mb-8">
              <Shield size={13} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-wider">NDA-Backed Partnership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
              <span className="text-slate-900 dark:text-white">Scale your agency</span>
              <br />
              <span className="text-gradient">without hiring.</span>
            </h2>

            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10">
              Tell us about your client&apos;s project. We&apos;ll respond within 24 hours
              with a clear proposal — ready to go under your brand.
            </p>

            <div className="flex flex-wrap gap-8">
              {[
                { value: '< 24h',  label: 'Response time' },
                { value: 'Free',   label: 'Initial consultation' },
                { value: 'NDA',    label: 'Signed upfront' },
                { value: '100%',   label: 'Your brand' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
