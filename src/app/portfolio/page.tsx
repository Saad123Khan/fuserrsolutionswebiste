'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Filter } from 'lucide-react';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const industries = ['All', ...Array.from(new Set(projects.map((p) => p.industry)))];
const services = ['All', ...Array.from(new Set(projects.map((p) => p.service)))];

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green',
  Fintech: 'blue',
  Education: 'purple',
  Ecommerce: 'amber',
  'Legal Tech': 'cyan',
  Logistics: 'red',
};

export default function PortfolioPage() {
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [activeService, setActiveService] = useState('All');

  const filtered = projects.filter((p) => {
    const matchIndustry = activeIndustry === 'All' || p.industry === activeIndustry;
    const matchService = activeService === 'All' || p.service === activeService;
    return matchIndustry && matchService;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-950 dot-grid opacity-30" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-mono tracking-widest uppercase">
                Portfolio
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
              <span className="text-[#E8E8E8]">Products that</span>
              <br />
              <span className="text-gradient">move markets.</span>
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              A curated selection of work across industries, services, and scale — each one a story
              of problems solved and goals exceeded.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 sticky top-16 lg:top-20 z-30 bg-navy-900/90 backdrop-blur-md border-b border-navy-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
              <Filter size={12} />
              FILTER
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-[#64748B] self-center">Industry:</span>
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeIndustry === ind
                      ? 'bg-blue-600 text-white'
                      : 'text-[#94A3B8] hover:text-[#E8E8E8] glass'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-[#64748B] self-center">Service:</span>
              {services.map((svc) => (
                <button
                  key={svc}
                  onClick={() => setActiveService(svc)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeService === svc
                      ? 'bg-blue-600 text-white'
                      : 'text-[#94A3B8] hover:text-[#E8E8E8] glass'
                  }`}
                >
                  {svc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#64748B]">
              No projects match the selected filters.
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project) => (
                <StaggerItem key={project.slug}>
                  <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                    <div className="relative h-full rounded-2xl glass border border-navy-500/40 overflow-hidden hover:border-blue-600/30 transition-all duration-400 shadow-card hover:shadow-card-hover">
                      {/* Color banner */}
                      <div
                        className="h-1.5 w-full"
                        style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }}
                      />

                      <div className="p-7">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant={badgeVariants[project.industry] ?? 'blue'}>
                              {project.industry}
                            </Badge>
                          </div>
                          <ArrowUpRight
                            size={16}
                            className="text-[#2A3550] group-hover:text-blue-400 transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </div>

                        <h2 className="text-[#E8E8E8] font-semibold text-xl mb-2 group-hover:text-white transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-sm text-[#94A3B8] mb-6">{project.tagline}</p>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {project.results.slice(0, 2).map((r) => (
                            <div key={r.label} className="bg-navy-800/60 rounded-xl p-3">
                              <div
                                className="text-xl font-bold mb-0.5"
                                style={{ color: project.color }}
                              >
                                {r.metric}
                              </div>
                              <div className="text-xs text-[#64748B]">{r.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Tech */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 4).map((t) => (
                            <span key={t} className="tech-tag">{t}</span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="tech-tag">+{project.tech.length - 4}</span>
                          )}
                        </div>

                        {/* Footer info */}
                        <div className="mt-5 pt-5 border-t border-navy-500/40 flex items-center justify-between text-xs text-[#64748B]">
                          <span className="font-mono">{project.service}</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
