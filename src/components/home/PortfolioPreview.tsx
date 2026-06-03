'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';

const preview = projects.slice(0, 4);

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green', Fintech: 'blue', Education: 'purple',
  Ecommerce: 'amber', 'Legal Tech': 'cyan', Logistics: 'red',
};

function ProjectImage({ color, title, industry, height = 'h-44' }: { color: string; title: string; industry: string; height?: string }) {
  return (
    <div className={`relative ${height} overflow-hidden`} style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}08 70%, transparent 100%)` }}>
      {/* Abstract shapes */}
      <div className="absolute right-[-20px] top-[-20px] w-40 h-40 rounded-full opacity-15" style={{ background: color }} />
      <div className="absolute right-[20%] bottom-[-30px] w-24 h-24 rounded-full opacity-10" style={{ background: color }} />
      <div className="absolute left-[10%] top-[20%] w-12 h-12 rounded-xl opacity-10 rotate-12" style={{ background: color }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Label */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm" style={{ background: color }}>
          {title[0]}
        </div>
        <span className="text-xs font-mono font-semibold" style={{ color }}>{industry}</span>
      </div>
    </div>
  );
}

export default function PortfolioPreview() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden bg-white dark:bg-navy-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <SectionTitle
            eyebrow="Our Work"
            title="Products that"
            highlight="generate results"
            description="A selection of projects where we turned complex problems into clean solutions."
          />
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium transition-colors shrink-0 group">
            View all projects
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        {/* Asymmetric grid: 1 large + 3 stacked */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Large featured card */}
          <StaggerItem className="lg:col-span-7">
            <Link href={`/portfolio/${preview[0].slug}`} className="group block h-full">
              <div className="h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-500/40 hover:border-blue-300 dark:hover:border-blue-600/40 transition-all duration-400 bg-white dark:bg-navy-800/30 shadow-sm hover:shadow-md flex flex-col">
                {/* Image area */}
                <ProjectImage color={preview[0].color} title={preview[0].title} industry={preview[0].industry} height="h-56" />

                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={badgeVariants[preview[0].industry] ?? 'blue'}>{preview[0].industry}</Badge>
                    <span className="text-xs font-mono text-slate-400 dark:text-[#64748B]">{preview[0].year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-2 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                    {preview[0].title}
                  </h3>
                  <p className="text-slate-500 dark:text-[#94A3B8] text-sm mb-6 flex-1">{preview[0].tagline}</p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {preview[0].results.slice(0, 2).map((r) => (
                      <div key={r.label} className="rounded-xl bg-slate-50 dark:bg-navy-700/60 p-3">
                        <div className="text-xl font-bold mb-0.5" style={{ color: preview[0].color }}>{r.metric}</div>
                        <div className="text-xs text-slate-400 dark:text-[#64748B]">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
                    View case study <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>

          {/* 3 stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {preview.slice(1).map((project) => (
              <StaggerItem key={project.slug}>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-500/40 hover:border-blue-300 dark:hover:border-blue-600/40 transition-all duration-300 bg-white dark:bg-navy-800/30 shadow-sm hover:shadow-md flex flex-col">
                    <ProjectImage color={project.color} title={project.title} industry={project.industry} height="h-28" />
                    <div className="p-5 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={badgeVariants[project.industry] ?? 'blue'}>{project.industry}</Badge>
                        </div>
                        <h3 className="text-slate-900 dark:text-[#E8E8E8] font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-white transition-colors truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-[#64748B] truncate">{project.tagline}</p>
                      </div>
                      <ArrowUpRight size={15} className="text-slate-300 dark:text-[#2A3550] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shrink-0" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
