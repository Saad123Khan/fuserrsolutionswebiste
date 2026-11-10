import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Quote, Target, Lightbulb, Layers } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { services } from '@/data/services';
import CountUp from '@/components/motion/CountUp';
import Magnetic from '@/components/motion/Magnetic';
import Button from '@/components/ui/Button';
import CTABanner from '@/components/home/CTABanner';
import ReadingProgress from '@/components/motion/ReadingProgress';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-60px' } as const;

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;

  useDocumentTitle(project ? `${project.title} — Case Study` : undefined);
  useMetaDescription(project?.overview);

  if (!project) return <Navigate to="/work" replace />;

  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <ReadingProgress />
      <Hero project={project} />
      <Story project={project} />
      {project.sections && project.sections.length > 0 && <Sections project={project} />}
      {project.results && project.results.length > 0 && <Results project={project} />}
      {project.testimonial && <Testimonial project={project} />}
      <NextProject project={next} />
      <CTABanner />
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────── */

function Hero({ project: p }: { project: Project }) {
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const linked = p.services.map((id) => services.find((s) => s.id === id)).filter(Boolean);

  return (
    <>
      <PageHero
        variant="sparks"
        accent={p.color}
        align="left"
        top={
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
        }
        eyebrow={
          <span className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border px-3 py-1 text-xs font-mono font-medium backdrop-blur-md"
              style={{ color: p.color, borderColor: `${p.color}55`, background: `${p.color}18` }}
            >
              {p.industry}
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono font-medium text-slate-300 backdrop-blur-md">
              {p.service}
            </span>
          </span>
        }
        title={p.title}
        description={p.overview}
        titleClassName="max-w-5xl"
      >
        <dl className="grid max-w-4xl grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
          <Meta label="Industry" value={p.industry} />
          <Meta label="Project type" value={p.service} />
          {p.client && <Meta label="Client" value={p.client} />}
          <div className={p.client ? '' : 'md:col-span-2'}>
            <dt className="text-xs font-mono uppercase tracking-wider text-slate-400">Services</dt>
            <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {linked.map((s) => (
                <Link
                  key={s!.id}
                  to={`/services/${s!.slug}`}
                  className="text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-300"
                >
                  {s!.title}
                </Link>
              ))}
            </dd>
          </div>
        </dl>
      </PageHero>

      {/* Cover */}
      <section className="relative bg-[var(--c-bg)] pt-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div
            ref={coverRef}
            className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-navy-800 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]"
          >
            <motion.img
              src={p.cover}
              alt={p.title}
              style={{ scale: imgScale, y: imgY }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-mono uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="mt-2 text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

/* ─── Story: challenge / solution + sticky sidebar ───── */

function Story({ project: p }: { project: Project }) {
  const blocks = [
    { icon: Target, label: 'The challenge', text: p.challenge },
    { icon: Lightbulb, label: 'Our solution', text: p.solution },
  ];

  return (
    <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-16 lg:col-span-8">
          {blocks.map(({ icon: Icon, label, text }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid gap-6 sm:grid-cols-[auto_1fr]"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}35` }}
              >
                <Icon size={21} style={{ color: p.color }} />
              </span>
              <div>
                <h2 className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-[#64748B]">{label}</h2>
                <p className="text-xl leading-relaxed text-slate-700 dark:text-[#E8E8E8] sm:text-2xl sm:leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:col-span-4">
          <div className="space-y-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-navy-500/40 dark:bg-navy-800/40"
            >
              <h3 className="mb-5 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-[#64748B]">
                <Layers size={13} /> Tech stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.04 }}
                    className="tech-tag"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <h3 className="relative text-lg font-bold">Building something similar?</h3>
              <p className="relative mt-2 text-sm text-blue-100">
                Tell us about your idea and get a free consultation within 24 hours.
              </p>
              <Magnetic strength={0.2} className="relative mt-5 inline-block">
                <Button href="/contact" variant="secondary" size="md" className="group border-0 bg-white text-blue-700 hover:bg-blue-50 dark:bg-white dark:text-blue-700 dark:hover:bg-blue-50">
                  Start a project <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Magnetic>
            </motion.div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ─── Sections (what we built, features…) ────────────── */

function Sections({ project: p }: { project: Project }) {
  return (
    <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
        >
          Inside the <span className="text-gradient">build</span>
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-2">
          {p.sections!.map((sec, i) => {
            const chips = sec.points.length > 6 && sec.points.every((pt) => pt.length < 40);
            const wide = chips || sec.points.some((pt) => pt.length > 140);
            return (
              <motion.div
                key={sec.heading}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: EASE }}
                className={`rounded-3xl border border-slate-200 bg-white p-7 dark:border-navy-500/40 dark:bg-navy-800/40 sm:p-8 ${wide ? 'md:col-span-2' : ''}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-400 dark:text-[#64748B]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{sec.heading}</h3>
                </div>

                {chips ? (
                  <div className="flex flex-wrap gap-2">
                    {sec.points.map((pt) => (
                      <span
                        key={pt}
                        className="rounded-xl border px-3.5 py-2 text-sm font-medium"
                        style={{ color: p.color, borderColor: `${p.color}35`, background: `${p.color}0d` }}
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {sec.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0" style={{ color: p.color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Results ────────────────────────────────────────── */

function parseMetric(metric: string) {
  const m = metric.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const value = parseFloat(m[2].replace(/,/g, ''));
  if (Number.isNaN(value)) return null;
  const decimals = (m[2].split('.')[1] || '').length;
  return { prefix: m[1], value, suffix: m[3], decimals };
}

function Results({ project: p }: { project: Project }) {
  return (
    <section className="relative overflow-hidden bg-[var(--c-bg)] py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[100px]" style={{ background: p.color }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-[#64748B]">Results</h2>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
          {p.results!.map((r) => {
            const parsed = parseMetric(r.metric);
            return (
              <div key={r.label} className="text-center">
                {parsed ? (
                  <CountUp
                    to={parsed.value}
                    decimals={parsed.decimals}
                    prefix={parsed.prefix}
                    suffix={parsed.suffix}
                    className="block font-montserrat text-5xl font-extrabold text-gradient sm:text-6xl"
                  />
                ) : (
                  <span className="block font-montserrat text-5xl font-extrabold text-gradient sm:text-6xl">{r.metric}</span>
                )}
                <span className="mt-2 block text-sm text-slate-500 dark:text-[#94A3B8]">{r.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonial ────────────────────────────────────── */

function Testimonial({ project: p }: { project: Project }) {
  const t = p.testimonial!;
  return (
    <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <Quote size={40} className="mx-auto mb-8" style={{ color: `${p.color}80` }} />
        <blockquote className="text-2xl font-medium leading-relaxed text-slate-800 dark:text-[#E8E8E8] sm:text-3xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8">
          <div className="font-semibold text-slate-900 dark:text-white">{t.author}</div>
          <div className="text-sm text-slate-500 dark:text-[#94A3B8]">{t.role}</div>
        </figcaption>
      </motion.figure>
    </section>
  );
}

/* ─── Next project ───────────────────────────────────── */

function NextProject({ project: p }: { project: Project }) {
  return (
    <section className="relative bg-[var(--c-bg)]">
      <Link to={`/work/${p.slug}`} className="group relative block overflow-hidden border-t border-white/10">
        {/* Cover is always visible; on hover it slowly zooms and darkens */}
        <img
          src={p.cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        {/* Readability overlays: dark from the left (behind the text) and bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-[#030712]/30 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-[#030712]/0 transition-colors duration-500 group-hover:bg-[#030712]/35" />
        <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-transform duration-700 ease-out group-hover:scale-x-100" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-20 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8 lg:py-28">
          <div className="transition-transform duration-500 ease-out group-hover:translate-x-2">
            <div className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-slate-300">Next project</div>
            <div className="max-w-3xl font-montserrat text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:text-blue-300 sm:text-5xl">
              {p.title}
            </div>
            <div className="mt-3 text-slate-300">{p.tagline}</div>
          </div>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-blue-500 group-hover:bg-blue-600">
            <ArrowUpRight size={24} className="text-white transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </section>
  );
}
