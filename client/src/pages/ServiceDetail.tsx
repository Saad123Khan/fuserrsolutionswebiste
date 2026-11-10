import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import { getServiceBySlug, services, type Service } from '@/data/services';
import { projects, type Project } from '@/data/projects';
import SpotlightCard from '@/components/motion/SpotlightCard';
import Magnetic from '@/components/motion/Magnetic';
import ServiceVisual from '@/components/services/ServiceVisual';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
// FAQ hidden for now — uncomment this import and the <FAQ /> usage below to bring it back.
// import FAQ from '@/components/home/FAQ';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-60px' } as const;

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  useDocumentTitle(service ? `${service.title} Services` : undefined);
  useMetaDescription(service?.metaDescription);

  if (!service) return <Navigate to="/services" replace />;

  const related = service.relatedProjects
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Hero service={service} />
      <Offerings service={service} />
      <Process service={service} />
      <Tech service={service} />
      {related.length > 0 && <RelatedWork service={service} projects={related} />}
      {/* {service.faqs.length > 0 && <FAQ items={service.faqs} />} */}
      <OtherServices others={others} />
      <CTABanner />
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────── */

function Hero({ service: s }: { service: Service }) {
  const Icon = s.icon;
  return (
    <PageHero
      variant="aurora"
      accent={s.accent}
      top={
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-400">
          <Link to="/services" className="transition-colors hover:text-cyan-300">
            Services
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-200">{s.title}</span>
        </nav>
      }
      eyebrow={
        <span
          className="inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 backdrop-blur-md"
          style={{ borderColor: `${s.accent}55`, background: `${s.accent}18` }}
        >
          <Icon size={15} style={{ color: s.accent }} />
          <span className="text-xs font-mono font-medium uppercase tracking-wider" style={{ color: s.accent }}>
            {s.title}
          </span>
        </span>
      }
      title={[s.heroTitle, { text: s.heroHighlight, className: 'text-gradient pb-2' }]}
      description={s.intro}
      aside={
        <div className="[perspective:1400px]">
          <motion.div
            initial={{ opacity: 0, rotateY: -18, rotateX: 8, y: 40 }}
            animate={{ opacity: 1, rotateY: 0, rotateX: 0, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            className="relative"
          >
            <div
              className="relative flex min-h-[22rem] items-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-12 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:min-h-[26rem]"
              style={{ backgroundImage: `radial-gradient(ellipse at 50% 110%, ${s.accent}35, transparent 65%)` }}
            >
              <div className="relative w-full scale-110 sm:scale-125">
                <ServiceVisual id={s.id} />
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-x-[15%] -bottom-8 h-24 rounded-full opacity-50 blur-[60px]"
              style={{ background: s.accent }}
            />
          </motion.div>
        </div>
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Magnetic strength={0.25} className="w-full sm:w-auto">
          <Button href="/contact" variant="primary" size="lg" className="group w-full font-montserrat sm:w-auto">
            Start your project
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Magnetic>
        <Link
          to="/work"
          className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-montserrat font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
        >
          See our work
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </PageHero>
  );
}

/* ─── What we offer ──────────────────────────────────── */

function Offerings({ service: s }: { service: Service }) {
  return (
    <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we offer"
          title={['What we build in', { text: s.title, className: 'text-gradient' }]}
          description="End-to-end delivery, or exactly the piece you need."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.offerings.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
            >
              <SpotlightCard className="group h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                <span
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}
                >
                  <Icon size={21} style={{ color: s.accent }} />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-[#E8E8E8]">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process ────────────────────────────────────────── */

function Process({ service: s }: { service: Service }) {
  return (
    <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={['Our', { text: `${s.title} process`, className: 'text-gradient' }]}
          className="mb-16"
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-slate-200 dark:bg-navy-500/40 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px origin-left lg:block"
            style={{ background: `linear-gradient(90deg, ${s.accent}, #60A5FA)` }}
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {s.process.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.15, ease: EASE }}
                className="group relative text-center"
              >
                <span
                  className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white font-montserrat text-lg font-extrabold transition-all duration-300 group-hover:scale-110 dark:bg-navy-950"
                  style={{ borderColor: s.accent, color: s.accent, boxShadow: `0 0 0 6px ${s.accent}12` }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─── Tech ───────────────────────────────────────────── */

function Tech({ service: s }: { service: Service }) {
  return (
    <section className="relative overflow-hidden bg-[var(--c-bg-alt)] py-20 dark:bg-navy-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-sm text-center lg:text-left">
          <div className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Tech stack</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Tools we use for {s.title}</h2>
        </div>
        <ul className="flex max-w-2xl flex-wrap justify-center gap-3 lg:justify-end">
          {s.tech.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={inView}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.06 }}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 dark:border-navy-500/50 dark:bg-navy-800/50 dark:text-[#E8E8E8] dark:hover:text-blue-400"
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Related work ───────────────────────────────────── */

function RelatedWork({ service: s, projects: list }: { service: Service; projects: Project[] }) {
  return (
    <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Related work"
            title={['Projects we have', { text: 'shipped', className: 'text-gradient' }]}
            description={`A few products where our ${s.title} work made the difference.`}
          />
          <Link
            to="/work"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400"
          >
            View all projects
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <Link
                to={`/work/${p.slug}`}
                className="group block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-navy-500/40 dark:bg-navy-800/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-navy-800">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-mono font-medium text-slate-800 backdrop-blur">
                    {p.industry}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-[#94A3B8]">{p.tagline}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-blue-600 dark:bg-navy-700">
                    <ArrowUpRight size={15} className="text-slate-500 transition-colors group-hover:text-white dark:text-[#94A3B8]" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Other services ─────────────────────────────────── */

function OtherServices({ others }: { others: Service[] }) {
  return (
    <section className="relative border-t border-slate-200 bg-[var(--c-bg-alt)] py-20 dark:border-navy-500/30 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-bold text-slate-900 dark:text-white">Explore other services</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map(({ slug, title, short, icon: Icon, accent }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: EASE }}
            >
              <Link
                to={`/services/${slug}`}
                className="group flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-navy-500/40 dark:bg-navy-800/40 dark:hover:border-blue-500/50"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                >
                  <Icon size={16} style={{ color: accent }} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {title}
                    <ArrowRight size={13} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-xs text-slate-500 dark:text-[#94A3B8]">{short}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
