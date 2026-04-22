'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';

const preview = projects.slice(0, 4);

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green',
  Fintech: 'blue',
  Education: 'purple',
  Ecommerce: 'amber',
  'Legal Tech': 'cyan',
  Logistics: 'red',
};

export default function PortfolioPreview() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <SectionTitle
            eyebrow="Our Work"
            title="Products that"
            highlight="generate results"
            description="A selection of projects where we turned complex problems into clean solutions."
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors shrink-0 group"
          >
            View all projects
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric grid: first card large, then 3 small */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Large featured card */}
          <StaggerItem className="lg:col-span-7">
            <Link href={`/portfolio/${preview[0].slug}`} className="group block h-full">
              <div className="relative h-[420px] lg:h-full min-h-[360px] rounded-2xl overflow-hidden glass border border-navy-500/40 hover:border-blue-600/30 transition-all duration-500 p-8 flex flex-col justify-between shadow-card hover:shadow-card-hover">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 20% 80%, ${preview[0].color}, transparent 70%)` }}
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge variant={badgeVariants[preview[0].industry] ?? 'blue'}>
                      {preview[0].industry}
                    </Badge>
                    <Badge variant="blue">{preview[0].service}</Badge>
                    <span className="text-xs font-mono text-[#64748B]">{preview[0].year}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#E8E8E8] mb-3 group-hover:text-white transition-colors">
                    {preview[0].title}
                  </h3>
                  <p className="text-[#94A3B8] leading-relaxed max-w-md">
                    {preview[0].tagline}
                  </p>
                </div>

                <div className="relative">
                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {preview[0].results.slice(0, 2).map((r) => (
                      <div key={r.label} className="glass rounded-xl p-4">
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: preview[0].color }}
                        >
                          {r.metric}
                        </div>
                        <div className="text-xs text-[#64748B]">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                    View case study
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>

          {/* Right column — 3 stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {preview.slice(1).map((project) => (
              <StaggerItem key={project.slug}>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="relative rounded-2xl overflow-hidden glass border border-navy-500/40 hover:border-blue-600/30 transition-all duration-500 p-6 flex items-center gap-5 shadow-card hover:shadow-card-hover">
                    <div
                      className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at 0% 50%, ${project.color}, transparent 70%)` }}
                    />

                    {/* Color dot */}
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ background: project.color }} />
                    </div>

                    <div className="relative flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant={badgeVariants[project.industry] ?? 'blue'}>
                          {project.industry}
                        </Badge>
                      </div>
                      <h3 className="text-[#E8E8E8] font-semibold mb-1 group-hover:text-white transition-colors truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#64748B] truncate">{project.tagline}</p>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="relative text-[#2A3550] group-hover:text-blue-400 transition-colors shrink-0"
                    />
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
