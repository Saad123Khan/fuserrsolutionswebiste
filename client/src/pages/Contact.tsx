import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, Clock, ShieldCheck, type LucideIcon } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
// FAQ hidden for now — uncomment this import and the <FAQ /> usage below to bring it back.
// import FAQ from '@/components/home/FAQ';
import { company, gmailLink } from '@/data/company';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;

const channels: { icon: LucideIcon; label: string; value: string; href: string | null }[] = [
  { icon: Mail, label: 'Email us', value: company.email, href: gmailLink({ subject: 'Project inquiry' }) },
  { icon: Phone, label: 'Call us', value: company.phone, href: company.phoneHref },
  { icon: MapPin, label: 'Visit us', value: company.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}` },
];

const nextSteps = [
  { title: 'We reply within 24 hours', text: 'A real person reads your message and gets back with questions or a call slot.' },
  { title: 'Free discovery call', text: 'We dig into your goals, users and must-have features. NDA available.' },
  { title: 'Clear proposal', text: 'You receive scope, timeline and cost, with no obligation to proceed.' },
];

export default function ContactPage() {
  useDocumentTitle('Contact Us — Start Your Project');
  useMetaDescription('Tell Fuserr Solutions about your project. Free consultation and a reply within 24 hours.');

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`;

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        variant="ripples"
        eyebrow="Contact"
        title={["Let's build something", { text: 'great together.', className: 'text-gradient pb-2' }]}
        description="Tell us about your idea. We'll reply within 24 hours with next steps and a free consultation."
      />

      {/* ── Form + info ── */}
      <section className="relative bg-[var(--c-bg)] pb-24 pt-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="lg:col-span-7"
            >
              <div className="glass rounded-3xl p-6 sm:p-9">
                <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Tell us about your project</h2>
                <ContactForm showTimeline />
              </div>
            </motion.div>

            {/* Info */}
            <div className="space-y-5 lg:col-span-5">
              {channels.map(({ icon: Icon, label, value, href }, i) => {
                const inner = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                      <Icon size={20} className="text-blue-600 transition-colors group-hover:text-white dark:text-blue-400" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-[#64748B]">{label}</span>
                      <span className="mt-0.5 block break-words font-semibold text-slate-900 dark:text-white">{value}</span>
                    </span>
                    {href && (
                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-500 dark:text-navy-500"
                      />
                    )}
                  </>
                );
                const cls =
                  'group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-navy-500/40 dark:bg-navy-800/40 dark:hover:border-blue-500/50';
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: EASE }}
                  >
                    {href ? (
                      <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </motion.div>
                );
              })}

              {/* What happens next */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1, ease: EASE }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <h3 className="relative mb-6 text-lg font-bold">What happens next?</h3>
                <ol className="relative space-y-5">
                  {nextSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-semibold">{s.title}</span>
                        <span className="mt-0.5 block text-sm text-blue-100">{s.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="relative mt-6 flex flex-wrap gap-4 border-t border-white/15 pt-5 text-xs text-blue-100">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} /> Reply within 24h
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={13} /> NDA on request
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="relative bg-[var(--c-bg)] pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-navy-500/40"
          >
            <iframe
              title="Fuserr Solutions office location"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full grayscale-[30%] dark:invert-[0.9] dark:hue-rotate-180 dark:grayscale"
            />
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur dark:border-navy-500/50 dark:bg-navy-900/95">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <MapPin size={15} className="text-blue-500" /> Fuserr Solutions
              </div>
              <div className="mt-1 max-w-xs text-xs text-slate-500 dark:text-[#94A3B8]">{company.address}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* <FAQ /> */}
    </>
  );
}
