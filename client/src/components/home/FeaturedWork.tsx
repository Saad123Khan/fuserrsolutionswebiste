import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';

const FEATURED = ['tko', 'kargo-domus', 'fixie', 'ai-chatbot'];
const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p)
);

export default function FeaturedWork() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] });

  return (
    <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Featured work"
            title={['Products that', { text: 'deliver results', className: 'text-gradient' }]}
            description="A few of the platforms we've designed, built and launched for our clients."
          />
          <Link
            to="/work"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all projects
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div ref={listRef} className="relative space-y-8">
          {featured.map((p, i) => (
            <StackCard
              key={p.slug}
              project={p}
              index={i}
              progress={scrollYProgress}
              range={[i / featured.length, 1]}
              targetScale={1 - (featured.length - i - 1) * 0.04}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky" style={{ top: `calc(6.5rem + ${index * 1.75}rem)` }}>
      <motion.div style={{ scale }} className="origin-top">
        <Link
          to={`/work/${project.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] dark:border-navy-500/50 dark:bg-navy-850 dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] md:grid-cols-5"
        >
          {/* Text */}
          <div className="relative flex flex-col p-7 sm:p-10 md:col-span-2">
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
              style={{ background: project.color }}
            />
            <div className="relative mb-6 flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400 dark:text-[#64748B]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-px w-5 bg-slate-600" />
              <span className="text-sm font-medium text-slate-300">{project.industry}</span>
            </div>

            <h3 className="relative text-2xl font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-[#E8E8E8] dark:group-hover:text-blue-400 sm:text-3xl">
              {project.title}
            </h3>
            <p className="relative mt-3 text-slate-500 dark:text-[#94A3B8]">{project.tagline}</p>

            <div className="relative mt-6 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 5).map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>

            <span className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-slate-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-blue-600 dark:bg-navy-700">
                <ArrowUpRight size={15} className="text-slate-600 transition-colors group-hover:text-white dark:text-[#94A3B8]" />
              </span>
              View case study
            </span>
          </div>

          {/* Image */}
          <div className="relative min-h-[240px] overflow-hidden bg-slate-100 dark:bg-navy-800 md:col-span-3 md:min-h-[420px]">
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
