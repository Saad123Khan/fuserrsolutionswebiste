import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import { gmailLink } from '@/data/company';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO(content): confirm budget ranges with the team.
const budgets = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+', 'Not sure yet'];
const timelines = ['ASAP', '1–3 months', '3–6 months', 'Flexible'];

const initialForm = { name: '', email: '', company: '', service: '', budget: '', timeline: '', message: '' };

const fieldClass =
  'peer w-full rounded-xl border border-slate-200 bg-white/70 px-4 pb-2.5 pt-6 text-sm text-slate-900 outline-none transition-[border-color,box-shadow] placeholder:text-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-navy-500/50 dark:bg-navy-900/60 dark:text-[#E8E8E8]';
const floatLabel =
  'pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] dark:text-[#64748B] dark:peer-focus:text-blue-400';
const selectLabel = 'pointer-events-none absolute left-4 top-2 text-[11px] text-slate-400 dark:text-[#64748B]';

interface ContactFormProps {
  /** Show the optional timeline field (used on the full contact page). */
  showTimeline?: boolean;
}

/** Project inquiry form: posts to /api/contact and shows an animated success state. */
export default function ContactForm({ showTimeline = false }: ContactFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to send message');
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      // Server unreachable or failed — offer to send the same details via Gmail instead.
      setError("We couldn't send your message right now. You can send it through Gmail instead — your details are already filled in.");
    } finally {
      setLoading(false);
    }
  };

  /** Gmail compose link pre-filled with everything typed into the form. */
  const gmailFallback = () =>
    gmailLink({
      subject: `Project inquiry from ${form.name || 'website visitor'}${form.company ? ` — ${form.company}` : ''}`,
      body: [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.company ? `Company: ${form.company}` : null,
        form.service ? `Service: ${form.service}` : null,
        form.budget ? `Budget: ${form.budget}` : null,
        form.timeline ? `Timeline: ${form.timeline}` : null,
        '',
        form.message,
      ]
        .filter((l): l is string => l !== null)
        .join('\n'),
    });

  const select = (name: 'service' | 'budget' | 'timeline', label: string, placeholder: string, options: string[]) => (
    <div className="relative">
      <select
        id={id(name)}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={cn(fieldClass, 'appearance-none pr-10', !form[name] && 'text-slate-400 dark:text-[#64748B]')}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label htmlFor={id(name)} className={selectLabel}>
        {label}
      </label>
      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {submitted ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex min-h-[460px] flex-col items-center justify-center gap-5 text-center"
        >
          <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden>
            <motion.circle
              cx="26" cy="26" r="24" fill="none" strokeWidth="2.5"
              className="stroke-emerald-500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            <motion.path
              d="M15 27 l7 7 l15 -16" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              className="stroke-emerald-500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
            />
          </svg>
          <div>
            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Message received!</h3>
            <p className="text-slate-500 dark:text-[#94A3B8]">Thanks for reaching out. We&apos;ll reply within 24 hours.</p>
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <input id={id('name')} name="name" type="text" required autoComplete="name" placeholder="Name"
                value={form.name} onChange={handleChange} className={fieldClass} />
              <label htmlFor={id('name')} className={floatLabel}>Your name *</label>
            </div>
            <div className="relative">
              <input id={id('email')} name="email" type="email" required autoComplete="email" placeholder="Email"
                value={form.email} onChange={handleChange} className={fieldClass} />
              <label htmlFor={id('email')} className={floatLabel}>Email *</label>
            </div>
          </div>

          <div className="relative">
            <input id={id('company')} name="company" type="text" autoComplete="organization" placeholder="Company"
              value={form.company} onChange={handleChange} className={fieldClass} />
            <label htmlFor={id('company')} className={floatLabel}>Company (optional)</label>
          </div>

          <div className={cn('grid gap-4', showTimeline ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
            {select('service', 'Service', 'Select a service', [...services.map((s) => s.title), 'Other / not sure'])}
            {select('budget', 'Budget', 'Select a range', budgets)}
            {showTimeline && select('timeline', 'Timeline', 'Select', timelines)}
          </div>

          <div className="relative">
            <textarea id={id('message')} name="message" rows={5} required placeholder="Message"
              value={form.message} onChange={handleChange} className={cn(fieldClass, 'resize-none')} />
            <label htmlFor={id('message')} className={floatLabel}>Tell us about your project *</label>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200 sm:flex-row sm:items-center sm:justify-between">
                  <span>{error}</span>
                  <a
                    href={gmailFallback()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 transition-colors hover:bg-blue-50"
                  >
                    <Mail size={15} className="text-red-500" /> Send via Gmail
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
            <p className="text-xs text-slate-400 dark:text-[#64748B]">We&apos;ll never share your details.</p>
            <Button type="submit" variant="primary" size="lg" className="group w-full font-montserrat sm:w-auto" disabled={loading}>
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
