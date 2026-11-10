import { Mail, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import TextReveal from '@/components/motion/TextReveal';
import { company, gmailAnchor } from '@/data/company';
import ContactForm from '@/components/contact/ContactForm';

export default function CTABanner() {
  return (
    <section id="start-project" className="relative overflow-hidden bg-[var(--c-bg-alt)] py-24 dark:bg-navy-950 lg:py-32">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[420px] w-[820px] animate-pulse-slow rounded-full bg-blue-600/15 blur-[120px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Left — pitch */}
        <AnimatedSection direction="left" className="lg:col-span-5 lg:pt-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/5 px-4 py-2 dark:bg-white/5">
            <Sparkles size={13} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-mono tracking-wider text-blue-600 dark:text-blue-400">Free consultation</span>
          </div>

          <TextReveal
            as="h2"
            segments={['Have a project in mind?', '\n', { text: "Let's build it.", className: 'text-gradient' }]}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl"
          />

          <p className="mt-6 text-lg leading-relaxed text-slate-500 dark:text-[#94A3B8]">
            Tell us about your idea. We&apos;ll get back within 24 hours with next steps and, after a quick call,
            a clear proposal with timeline and cost.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              { icon: Clock, text: 'Reply within 24 hours' },
              { icon: ShieldCheck, text: 'NDA available on request' },
              { icon: Sparkles, text: 'No commitment, free consultation' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-slate-600 dark:text-[#94A3B8]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-600/20 bg-blue-600/10">
                  <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-8 text-sm dark:border-navy-500/40 sm:flex-row sm:gap-8">
            <a {...gmailAnchor({ subject: 'Project inquiry' })} className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600 dark:text-[#94A3B8] dark:hover:text-blue-400">
              <Mail size={15} className="text-blue-500" /> {company.email}
            </a>
            <a href={company.phoneHref} className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600 dark:text-[#94A3B8] dark:hover:text-blue-400">
              <Phone size={15} className="text-blue-500" /> {company.phone}
            </a>
          </div>
        </AnimatedSection>

        {/* Right — form */}
        <AnimatedSection direction="right" delay={0.1} className="lg:col-span-7">
          <div className="glass relative rounded-3xl p-6 sm:p-9">
            <ContactForm />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
