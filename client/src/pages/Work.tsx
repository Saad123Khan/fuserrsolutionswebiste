import { useMemo, useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion, useSpring } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { services } from '@/data/services';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import { cn } from '@/lib/utils';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;

const industries = Array.from(new Set(projects.map((p) => p.industry)));
const usedServices = services.filter((s) => projects.some((p) => p.services.includes(s.id)));

export default function WorkPage() {
  useDocumentTitle('Our Work — Case Studies');
  useMetaDescription('Case studies of web, mobile, SaaS and AI products designed and built by Fuserr Solutions.');

  const [industry, setIndustry] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => (!industry || p.industry === industry) && (!service || p.services.includes(service))
      ),
    [industry, service]
  );

  const reset = () => {
    setIndustry(null);
    setService(null);
  };

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        variant="grid"
        align="left"
        eyebrow="Our work"
        title={['Products we have', { text: 'designed, built & launched', className: 'text-gradient pb-2' }]}
        description="Real platforms used by real customers: marketplaces, telehealth portals, AI assistants and more."
        aside={
          <div className="flex gap-6 lg:justify-end">
            {[
              { n: projects.length, label: 'Case studies' },
              { n: industries.length, label: 'Industries' },
            ].map(({ n, label }) => (
              <div key={label} className="min-w-[9rem] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="font-montserrat text-5xl font-extrabold text-gradient">{n}</div>
                <div className="mt-2 text-xs font-mono uppercase tracking-wider text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        }
      />

      {/* ── Filters + grid ── */}
      <section className="relative bg-[var(--c-bg)] pb-24 pt-12 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="mb-10 space-y-4 border-y border-slate-200 py-6 dark:border-navy-500/30"
          >
            <FilterRow
              label="Industry"
              groupId="industry"
              options={industries.map((i) => ({ value: i, label: i }))}
              value={industry}
              onChange={setIndustry}
            />
            <FilterRow
              label="Service"
              groupId="service"
              options={usedServices.map((s) => ({ value: s.id, label: s.title }))}
              value={service}
              onChange={setService}
            />
            <div className="flex items-center justify-between pt-1 text-sm text-slate-500 dark:text-[#94A3B8]">
              <span>
                Showing <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> of {projects.length} projects
              </span>
              <AnimatePresence>
                {(industry || service) && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={reset}
                    className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    <X size={14} /> Clear filters
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div layout className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: EASE }}
                >
                  <WorkCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500 dark:text-[#94A3B8]">No projects match these filters yet.</p>
              <button type="button" onClick={reset} className="mt-3 font-semibold text-blue-600 hover:underline dark:text-blue-400">
                Show all projects
              </button>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function FilterRow({
  label,
  groupId,
  options,
  value,
  onChange,
}: {
  label: string;
  groupId: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const all = [{ value: '', label: 'All' }, ...options];
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="w-20 shrink-0 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-[#64748B]">{label}</span>
      <LayoutGroup id={groupId}>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {all.map((o) => {
            const active = (value ?? '') === o.value;
            return (
              <button
                key={o.value || 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(o.value || null)}
                className={cn(
                  'relative shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-transparent text-white'
                    : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-slate-900 dark:border-navy-500/50 dark:text-[#94A3B8] dark:hover:text-white'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-blue-600 shadow-md shadow-blue-600/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{o.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}

function WorkCard({ project: p }: { project: Project }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const x = useSpring(0, { stiffness: 300, damping: 28 });
  const y = useSpring(0, { stiffness: 300, damping: 28 });

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = imgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <Link to={`/work/${p.slug}`} className="group block">
      <div
        ref={imgRef}
        onPointerMove={move}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'mouse') return;
          const r = e.currentTarget.getBoundingClientRect();
          x.jump(e.clientX - r.left);
          y.jump(e.clientY - r.top);
          setHover(true);
        }}
        onPointerLeave={() => setHover(false)}
        className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-navy-500/40 dark:bg-navy-800"
      >
        <img
          src={p.cover}
          alt={p.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-mono font-medium text-slate-800 backdrop-blur">
          {p.industry}
        </span>

        {/* Cursor-follow pill */}
        <motion.span
          aria-hidden
          style={{ x, y }}
          animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="pointer-events-none absolute left-0 top-0 z-10 -ml-16 -mt-6 hidden h-12 w-32 items-center justify-center gap-1.5 rounded-full bg-blue-600 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 [@media(hover:hover)]:flex"
        >
          View case <ArrowUpRight size={14} />
        </motion.span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-2xl">
            {p.title}
          </h2>
          <p className="mt-1 text-slate-500 dark:text-[#94A3B8]">{p.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.services
              .map((id) => services.find((s) => s.id === id))
              .filter(Boolean)
              .slice(0, 3)
              .map((s) => (
                <span
                  key={s!.id}
                  className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-500 dark:border-navy-500/50 dark:text-[#94A3B8]"
                >
                  {s!.title}
                </span>
              ))}
          </div>
        </div>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-all duration-300 group-hover:rotate-45 group-hover:border-blue-600 group-hover:bg-blue-600 dark:border-navy-500/50">
          <ArrowUpRight size={16} className="-rotate-45 text-slate-500 transition-colors group-hover:text-white dark:text-[#94A3B8]" />
        </span>
      </div>
    </Link>
  );
}
