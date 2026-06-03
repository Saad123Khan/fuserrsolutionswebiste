"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import { isColorLight } from '@/lib/utils';

const preview = projects.slice(0, 4);

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green', Fintech: 'blue', Education: 'purple',
  Ecommerce: 'amber', 'Legal Tech': 'cyan', Logistics: 'red',
};

function ProjectImage({ color, title, industry, height = 'h-44', cover }: { color: string; title: string; industry: string; height?: string; cover?: string }) {
  const [sizeClass, setSizeClass] = React.useState(height);

  React.useEffect(() => {
    if (!cover) {
      setSizeClass(height);
      return;
    }
    let mounted = true;
    const img = new Image();
    img.src = cover;
    img.onload = () => {
      if (!mounted) return;
      const ratio = img.width / img.height;
      if (ratio > 1.8) setSizeClass('h-44');
      else if (ratio > 1.4) setSizeClass('h-56');
      else if (ratio > 1.0) setSizeClass('h-64');
      else if (ratio > 0.7) setSizeClass('h-72');
      else setSizeClass('h-96');
    };
    img.onerror = () => { if (mounted) setSizeClass(height); };
    return () => { mounted = false; };
  }, [cover, height]);

  return (
    <div className={`relative ${sizeClass} overflow-hidden rounded-t-lg`}>
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: cover ? `url(${cover})` : undefined, backgroundColor: cover ? undefined : `${color}15` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm" style={{ background: color }}>
          {title[0]}
        </div>
        <span className="text-xs font-mono font-semibold text-white/90" style={{ color }}>{industry}</span>
      </div>
    </div>
  );
}

export default function PortfolioPreview() {
  const featured = preview[0];
  const featuredLight = isColorLight(featured.color);

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
            <Link href={`/portfolio/${featured.slug}`} className="group block h-full">
              <div style={{ ['--accent' as any]: featured.color }} className="h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-500/40 hover:border-blue-300 dark:hover:border-blue-600/40 transition-all duration-400 bg-white dark:bg-navy-800/30 shadow-md hover:shadow-xl transform-gpu hover:-translate-y-1 flex flex-col">
                {/* Image area */}
                <ProjectImage color={featured.color} title={featured.title} industry={featured.industry} height="h-80" cover={featured.cover} />

                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={badgeVariants[featured.industry] ?? 'blue'}>{featured.industry}</Badge>
                    <span className="text-xs font-mono text-slate-400 dark:text-[#64748B]">{featured.year}</span>
                  </div>
                  <h3 className={(featuredLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-300') + ' text-lg font-semibold mb-2 transition-colors'}>
                    {featured.title}
                  </h3>
                  <p className={(featuredLight ? 'text-slate-500' : 'text-slate-200') + ' text-xs mb-6 flex-1'}>{featured.tagline}</p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {featured.results.slice(0, 2).map((r) => (
                      <div key={r.label} className="rounded-xl bg-slate-50 dark:bg-navy-700/60 p-3">
                        <div className="text-lg font-semibold mb-0.5" style={{ color: featured.color }}>{r.metric}</div>
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
            {preview.slice(1).map((project) => {
              const light = isColorLight(project.color);
              return (
                <StaggerItem key={project.slug}>
                    <Link href={`/portfolio/${project.slug}`} className="group block">
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-500/40 hover:border-blue-300 dark:hover:border-blue-600/40 transition-all duration-300 bg-white dark:bg-navy-800/30 shadow-md hover:shadow-xl transform-gpu hover:-translate-y-1 flex flex-col">
                      <ProjectImage color={project.color} title={project.title} industry={project.industry} height="h-44" cover={project.cover} />
                      <div className="p-5 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={badgeVariants[project.industry] ?? 'blue'}>{project.industry}</Badge>
                          </div>
                          <h3 className={(light ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-300') + ' font-semibold text-xs transition-colors truncate'}>
                            {project.title}
                          </h3>
                          <p className={(light ? 'text-[11px] text-slate-400' : 'text-[11px] text-slate-200') + ' truncate'}>{project.tagline}</p>
                        </div>
                        <ArrowUpRight size={15} className="text-slate-300 dark:text-[#2A3550] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shrink-0" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
