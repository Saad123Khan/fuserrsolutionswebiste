'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green', Fintech: 'blue', Education: 'purple',
  Ecommerce: 'amber', 'Legal Tech': 'cyan', Logistics: 'red',
};

function ProjectVisual({ color, title, industry }: { color: string; title: string; industry: string }) {
  return (
    <div className="relative h-52 overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}20 0%, ${color}07 80%, transparent 100%)` }}>
      <div className="absolute -right-6 -top-6 w-44 h-44 rounded-full opacity-[0.12]" style={{ background: color }} />
      <div className="absolute right-[25%] bottom-[-20px] w-28 h-28 rounded-full opacity-[0.08]" style={{ background: color }} />
      <div className="absolute left-[8%] top-[25%] w-10 h-10 rounded-lg opacity-[0.1] rotate-12" style={{ background: color }} />
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-base shadow" style={{ background: color }}>
          {title[0]}
        </div>
        <span className="text-xs font-mono font-semibold" style={{ color }}>{industry}</span>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
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
            <h1 className="text-5xl sm:text-5xl font-black leading-tight mb-6">
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
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-500/40 bg-white dark:bg-navy-800/30 hover:border-blue-200 dark:hover:border-blue-600/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
                    {/* Visual area */}
                    <ProjectVisual color={project.color} title={project.title} industry={project.industry} />

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={badgeVariants[project.industry] ?? 'blue'}>{project.industry}</Badge>
                        <span className="text-xs font-mono text-slate-400 dark:text-[#64748B]">{project.year}</span>
                      </div>

                      <h2 className="text-slate-900 dark:text-[#E8E8E8] font-semibold text-lg mb-1.5 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-[#94A3B8] mb-5 flex-1">{project.tagline}</p>

                      {/* Key metrics */}
                      <div className="grid grid-cols-2 gap-2.5 mb-5">
                        {project.results.slice(0, 2).map((r) => (
                          <div key={r.label} className="rounded-xl bg-slate-50 dark:bg-navy-700/60 p-3">
                            <div className="text-lg font-bold mb-0.5" style={{ color: project.color }}>{r.metric}</div>
                            <div className="text-[11px] text-slate-400 dark:text-[#64748B]">{r.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech + arrow */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((t) => <span key={t} className="tech-tag">{t}</span>)}
                        </div>
                        <ArrowUpRight size={15} className="text-slate-300 dark:text-[#2A3550] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shrink-0" />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
