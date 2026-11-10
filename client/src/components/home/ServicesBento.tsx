import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services, serviceHref } from '@/data/services';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/motion/SpotlightCard';
import ServiceVisual from '@/components/services/ServiceVisual';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

/**
 * Bento layout on a 3-column grid (lg), 4 rows, no gaps:
 *   [web  web  mobile]
 *   [saas back mobile]
 *   [ai   ai   integ ]
 *   [ui   cloud cloud]
 */
const spans: Record<string, string> = {
  web: 'lg:col-span-2',
  mobile: 'lg:row-span-2',
  ai: 'lg:col-span-2',
  cloud: 'lg:col-span-2',
};

const ORDER = ['web', 'mobile', 'saas', 'backend', 'ai', 'integrations', 'ui', 'cloud'];
const ordered = ORDER.map((id) => services.find((s) => s.id === id)).filter(
  (s): s is (typeof services)[number] => Boolean(s)
);

export default function ServicesBento() {
  return (
    <section className="relative overflow-hidden bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={['Everything you need to', { text: 'build and scale', className: 'text-gradient' }]}
            description="One team for design, development and launch, so you don't have to juggle multiple vendors."
          />
          <Link
            to="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Explore all services
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.id} className={cn('h-full', spans[s.id])}>
                <Link to={serviceHref(s.id)} className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col transition-transform duration-300 group-hover:-translate-y-1">
                    {/* Visual */}
                    <div
                      className={cn(
                        'relative flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-navy-500/30',
                        s.id === 'mobile' ? 'min-h-[18rem] flex-1' : 'h-44'
                      )}
                      style={{ background: `radial-gradient(ellipse at 50% 120%, ${s.accent}1f, transparent 70%)` }}
                    >
                      <div className="absolute inset-0 dot-grid opacity-40" />
                      <div className="relative w-full">
                        <ServiceVisual id={s.id} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="relative p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                          style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}
                        >
                          <Icon size={17} style={{ color: s.accent }} />
                        </span>
                        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-[#E8E8E8] dark:group-hover:text-blue-400">
                          {s.title}
                        </h3>
                        <ArrowUpRight
                          size={16}
                          className="ml-auto text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-500 dark:text-navy-500"
                        />
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{s.short}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tech.slice(0, 4).map((t) => (
                          <span key={t} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
