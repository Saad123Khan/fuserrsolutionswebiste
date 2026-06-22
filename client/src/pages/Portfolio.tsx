import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import { isColorLight } from '@/lib/utils';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green', Fintech: 'blue', Education: 'purple',
  Ecommerce: 'amber', 'Legal Tech': 'cyan', Logistics: 'red',
};

function ProjectVisual({ color, title, industry, cover }: { color: string; title: string; industry: string; cover?: string }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl">
      <div className="relative w-full pb-[56.25%] bg-slate-50 dark:bg-navy-700">
        {cover ? (
          (() => {
            const name = cover.split('/').pop() || cover;
            const styleObj: React.CSSProperties | undefined = name === 'image4.png'
              ? { objectPosition: '30% center' }
              : name === 'image.png'
                ? { objectPosition: '50% 12%' }
                : undefined;
            return <img src={cover} alt={title} style={styleObj} className={`absolute inset-0 w-full h-full object-cover block`} loading="lazy" />;
          })()
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: `${color}10` }} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-5 flex items-center gap-2.5 z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-900 font-bold text-base shadow" style={{ background: '#D1D5DB' }}>
            {title.trim()[0]}
          </div>
          <span className="text-xs font-mono font-semibold text-white/95">{industry}</span>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  useDocumentTitle('Portfolio');

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-[var(--c-bg)]">
        <div className="absolute inset-0 dot-grid opacity-35" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[400px] bg-blue-600/6 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">Portfolio</span>
              <span className="w-6 h-px bg-blue-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6">
              <span className="text-slate-900 dark:text-[#E8E8E8]">Products that</span>
              <br />
              <span className="text-gradient">move markets.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-xl mx-auto">
              Six case studies across industries — each one a story of problems solved and goals exceeded.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 bg-slate-50 dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => {
              const light = isColorLight(project.color);
              return (
                <StaggerItem key={project.slug}>
                  <Link to={`/portfolio/${project.slug}`} className="group block h-full">
                    <div className="h-full rounded-3xl overflow-hidden border border-slate-100 dark:border-navy-700 bg-white/60 dark:bg-navy-800/40 backdrop-blur-sm hover:border-blue-200 dark:hover:border-blue-600/30 transition-all duration-300 shadow-lg hover:shadow-2xl transform-gpu hover:-translate-y-1 group flex flex-col">
                      {/* Visual area */}
                      <ProjectVisual color={project.color} title={project.title} industry={project.industry} cover={project.cover} />

                      {/* Content */}
                      <div className="flex-1 flex flex-col p-6">
                        <div className="flex items-center mb-4">
                          <Badge variant={badgeVariants[project.industry] ?? 'blue'}>{project.industry}</Badge>
                        </div>

                        <h2 className={"font-bold text-base md:text-lg mb-1.5 transition-colors text-white group-hover:text-blue-600"}>
                          {project.title}
                        </h2>
                        <p className={(light ? 'text-slate-500' : 'text-slate-200') + ' text-xs mb-5 flex-1'}>{project.tagline}</p>

                        {/* Key metrics removed per request */}

                        {/* Tech + arrow */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map((t) => (
                              <span key={t} style={{ background: light ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.25)', color: light ? '#0f172a' : '#e6eef8' }} className="inline-flex items-center px-2 py-0.5 text-xs rounded-full">{t}</span>
                            ))}
                          </div>
                          <ArrowUpRight size={15} className="text-slate-300 dark:text-[#2A3550] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shrink-0" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
