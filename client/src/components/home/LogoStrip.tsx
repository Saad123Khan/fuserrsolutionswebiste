import Marquee from '@/components/motion/Marquee';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { projects, projectShortName } from '@/data/projects';

// TODO(content): swap these text wordmarks for real client logos (with permission).
/** Projects not shown in the logo strip. */
const HIDDEN = ['ai-chatbot', 'tko'];
const brands = projects
  .filter((p) => !HIDDEN.includes(p.slug))
  .map((p) => projectShortName[p.slug] ?? p.title);

export default function LogoStrip() {
  return (
    <section className="relative border-y border-slate-200/70 bg-[var(--c-bg)] py-10 dark:border-navy-500/30">
      <AnimatedSection>
        <p className="mb-7 text-center text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-[#64748B]">
          Products we&apos;ve designed &amp; built
        </p>
        <Marquee duration={35} gapClassName="gap-14 pr-14">
          {brands.map((b) => (
            <span
              key={b}
              className="flex items-center gap-2.5 whitespace-nowrap font-montserrat text-xl font-bold tracking-tight text-slate-400 transition-colors duration-300 hover:text-slate-900 dark:text-[#64748B] dark:hover:text-white sm:text-2xl"
            >
              <span className="h-2 w-2 rotate-45 rounded-[2px] bg-blue-500/60" />
              {b}
            </span>
          ))}
        </Marquee>
      </AnimatedSection>
    </section>
  );
}
