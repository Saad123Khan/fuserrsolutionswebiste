import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Quote, CheckCircle2, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SITE_URL } from '@/lib/utils';

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green',
  Fintech: 'blue',
  Education: 'purple',
  Ecommerce: 'amber',
  'Legal Tech': 'cyan',
  Logistics: 'red',
};

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.overview,
    alternates: { canonical: `${SITE_URL}/portfolio/${project.slug}` },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] opacity-10 rounded-full"
          style={{ background: project.color }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#94A3B8] transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant={badgeVariants[project.industry] ?? 'blue'}>{project.industry}</Badge>
              <Badge variant="blue">{project.service}</Badge>
              <span className="text-xs font-mono text-[#64748B]">{project.year}</span>
              <span className="text-[#1E2D4D]">·</span>
              <span className="text-xs font-mono text-[#64748B]">{project.duration}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E8E8E8] mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-[#94A3B8] max-w-2xl">{project.tagline}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <div className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Results metrics */}
              <AnimatedSection>
                <div
                  className="rounded-2xl p-8 border"
                  style={{ background: `${project.color}08`, borderColor: `${project.color}25` }}
                >
                  <h2 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-6">
                    Key Results
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {project.results.map((r) => (
                      <div key={r.label}>
                        <div
                          className="text-3xl font-bold mb-1"
                          style={{ color: project.color }}
                        >
                          {r.metric}
                        </div>
                        <div className="text-xs text-[#94A3B8]">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Overview */}
              <AnimatedSection delay={0.1}>
                <h2 className="text-xl font-bold text-[#E8E8E8] mb-4">Project Overview</h2>
                <p className="text-[#94A3B8] leading-relaxed text-lg">{project.overview}</p>
              </AnimatedSection>

              {/* Challenge */}
              <AnimatedSection delay={0.15}>
                <h2 className="text-xl font-bold text-[#E8E8E8] mb-4">The Challenge</h2>
                <p className="text-[#94A3B8] leading-relaxed">{project.challenge}</p>
              </AnimatedSection>

              {/* Solution */}
              <AnimatedSection delay={0.2}>
                <h2 className="text-xl font-bold text-[#E8E8E8] mb-4">Our Solution</h2>
                <p className="text-[#94A3B8] leading-relaxed">{project.solution}</p>
              </AnimatedSection>

              {/* Testimonial */}
              {project.testimonial && (
                <AnimatedSection delay={0.25}>
                  <div className="glass rounded-2xl border border-navy-500/40 p-8">
                    <Quote size={24} className="text-blue-600/60 mb-5" />
                    <p className="text-[#E8E8E8] text-lg italic leading-relaxed mb-6">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-5 border-t border-navy-500/40">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: project.color }}
                      >
                        {project.testimonial.author[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#E8E8E8]">
                          {project.testimonial.author}
                        </div>
                        <div className="text-xs text-[#64748B]">{project.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimatedSection direction="right">
                {/* Project info */}
                <div className="glass rounded-2xl border border-navy-500/40 p-6 mb-6">
                  <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-5">
                    Project Info
                  </h3>
                  <dl className="space-y-4">
                    {[
                      { label: 'Client', value: project.client },
                      { label: 'Industry', value: project.industry },
                      { label: 'Service', value: project.service },
                      { label: 'Year', value: project.year },
                      { label: 'Duration', value: project.duration },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-4">
                        <dt className="text-xs text-[#64748B]">{label}</dt>
                        <dd className="text-sm text-[#E8E8E8] font-medium text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Tech stack */}
                <div className="glass rounded-2xl border border-navy-500/40 p-6 mb-6">
                  <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-5">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                  Start a Similar Project
                  <ArrowRight size={14} />
                </Button>
              </AnimatedSection>
            </div>
          </div>

          {/* Related projects */}
          <AnimatedSection delay={0.3} className="mt-20">
            <h2 className="text-xl font-bold text-[#E8E8E8] mb-8">More Projects</h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <Link href={`/portfolio/${p.slug}`} className="group block">
                    <div className="glass rounded-2xl border border-navy-500/40 p-6 hover:border-blue-600/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={badgeVariants[p.industry] ?? 'blue'}>{p.industry}</Badge>
                        <span className="text-xs font-mono text-[#64748B]">{p.year}</span>
                      </div>
                      <h3 className="font-semibold text-[#E8E8E8] mb-2 group-hover:text-white transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8]">{p.tagline}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
