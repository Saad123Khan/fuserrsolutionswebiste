import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/data/services';
import ServiceVisual from '@/components/services/ServiceVisual';
import ProcessSteps from '@/components/home/ProcessSteps';
import EngagementModels from '@/components/services/EngagementModels';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { cn } from '@/lib/utils';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;


export default function ServicesPage() {
  useDocumentTitle('Services — Web, Mobile, SaaS, AI & Cloud Development');
  const lenis = useLenis();

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        variant="network"
        eyebrow="Services"
        title={['Software services for', { text: 'every stage of your product', className: 'text-gradient pb-2' }]}
        description="Design, development, AI and cloud under one roof. Pick a single service or let us take your product all the way from idea to launch."
      >
          {/* Jump chips */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.7 } } }}
            className="flex flex-wrap justify-center gap-2"
          >
            {services.map(({ id, title, icon: Icon, accent }) => (
              <motion.li
                key={id}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
              >
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (!el) return;
                    if (lenis) lenis.scrollTo(el, { offset: -96 });
                    else el.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', `#${id}`);
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-slate-900 dark:border-navy-500/50 dark:bg-navy-800/50 dark:text-[#94A3B8] dark:hover:border-blue-500/50 dark:hover:text-white"
                >
                  <Icon size={14} style={{ color: accent }} />
                  {title}
                </a>
              </motion.li>
            ))}
          </motion.ul>
      </PageHero>

      {/* ── Service rows ── */}
      <section className="relative bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="mx-auto max-w-7xl divide-y divide-slate-200 px-4 dark:divide-navy-500/30 sm:px-6 lg:px-8">
          {services.map((s, i) => (
            <ServiceRow key={s.id} index={i} service={s} />
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <ProcessSteps />

      <EngagementModels />

      <CTABanner />
    </>
  );
}

function ServiceRow({ service: s, index }: { service: (typeof services)[number]; index: number }) {
  const Icon = s.icon;
  const flip = index % 2 === 1;

  return (
    <div id={s.id} className="grid scroll-mt-28 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn(flip && 'lg:order-2')}
      >
        <div className="mb-6 flex items-center gap-4">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}
          >
            <Icon size={22} style={{ color: s.accent }} />
          </span>
          <span className="font-mono text-sm text-slate-400 dark:text-[#64748B]">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{s.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-500 dark:text-[#94A3B8]">{s.intro}</p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {s.offerings.slice(0, 4).map((o) => (
            <li key={o.title} className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-[#E8E8E8]">
              <CheckCircle2 size={16} className="shrink-0" style={{ color: s.accent }} />
              {o.title}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-1.5">
          {s.tech.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        <Link
          to={`/services/${s.slug}`}
          className="group mt-9 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-navy-500/50 dark:bg-navy-800/50 dark:text-white dark:hover:border-blue-500/60"
        >
          Explore {s.title}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: flip ? -40 : 40, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className={cn(flip && 'lg:order-1')}
      >
        <Link to={`/services/${s.slug}`} className="group block" aria-label={`Explore ${s.title}`}>
          <div
            className="relative flex min-h-[20rem] items-center overflow-hidden rounded-3xl border border-slate-200 bg-white py-10 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl dark:border-navy-500/40 dark:bg-navy-800/40 sm:min-h-[24rem]"
            style={{ backgroundImage: `radial-gradient(ellipse at 50% 110%, ${s.accent}26, transparent 65%)` }}
          >
            <div className="absolute inset-0 dot-grid opacity-50" />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: s.accent }}
            />
            <div className="relative w-full scale-110">
              <ServiceVisual id={s.id} />
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
