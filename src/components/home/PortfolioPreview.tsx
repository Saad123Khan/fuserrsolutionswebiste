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
  return (
    <div className="relative overflow-hidden rounded-t-lg">
      {/* Enforce a 16:9 aspect ratio so all covers display consistently */}
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

          <div className="absolute inset-0" style={{ backgroundColor: `${color}15` }} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-900 font-bold text-base shadow-sm" style={{ background: '#D1D5DB' }}>
              {title.trim()[0]}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{title}</div>
              <div className="text-xs font-mono text-slate-400 dark:text-white/80">{industry}</div>
            </div>
          </div>
        </div>
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

        {/* Grid: 2x2 (two cards per row) */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {preview.map((project) => {
            const light = isColorLight(project.color);
            return (
              <StaggerItem key={project.slug}>
                <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                  <div style={{ ['--accent' as any]: project.color }} className="h-full rounded-3xl overflow-hidden border border-slate-100 dark:border-navy-700 bg-white/60 dark:bg-navy-800/40 backdrop-blur-sm shadow-lg hover:shadow-2xl transform-gpu hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <ProjectImage color={project.color} title={project.title} industry={project.industry} height="h-72" cover={project.cover} />

                    <div className="p-4 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className={(light ? 'text-[13px] text-slate-900' : 'text-[13px] text-slate-300') + ' dark:text-slate-300 truncate'}>{project.tagline}</p>
                      </div>
                      <ArrowUpRight size={16} className="text-slate-400 dark:text-[#2A3550] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shrink-0" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
