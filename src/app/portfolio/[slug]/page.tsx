import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Quote, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SITE_URL } from '@/lib/utils';

const badgeVariants: Record<string, 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red'> = {
  Healthcare: 'green', Fintech: 'blue', Education: 'purple',
  Ecommerce: 'amber', 'Legal Tech': 'cyan', Logistics: 'red',
};

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const normalize = (s: string) => s.replace(/[-_]/g, ' ').trim().toLowerCase();
  const project = projects.find((p) => {
    if (p.slug === params.slug) return true;
    if (p.slug.toLowerCase() === params.slug.toLowerCase()) return true;
    if (normalize(p.slug) === normalize(params.slug)) return true;
    return false;
  });
  if (!project) return {};
  return { title: project.title, description: project.overview, alternates: { canonical: `${SITE_URL}/portfolio/${project.slug}` } };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* ── Full-width Project Header Image ── */}
      <section className="relative pt-20 overflow-hidden">
        <div className="w-full h-[360px] lg:h-[440px] relative flex items-end overflow-hidden">
          {/* Background image */}
          {project.cover && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${project.cover})` }}
            />
          )}

          {/* Gradient overlay to preserve brand tint and readability */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}25 0%, ${project.color}08 60%, var(--c-bg) 100%)` }} />

          {/* Abstract decoration */}
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[80px]" style={{ background: project.color }} />
          <div className="absolute right-[15%] top-[10%] w-48 h-48 rounded-full opacity-[0.08]" style={{ background: project.color }} />
          <div className="absolute left-[5%] bottom-[20%] w-20 h-20 rounded-2xl opacity-[0.1] rotate-12" style={{ background: project.color }} />

          {/* Back link */}
          <Link
            href="/portfolio"
            className="absolute top-8 left-4 sm:left-8 lg:left-16 inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-[#64748B] hover:text-slate-800 dark:hover:text-[#94A3B8] transition-colors glass px-4 py-2 rounded-full border border-slate-200 dark:border-navy-500/50"
          >
            <ArrowLeft size={13} /> All Projects
          </Link>

          {/* Project identity removed from banner to render below image for better readability */}
        </div>
        {/* Project identity rendered below banner image */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge variant={badgeVariants[project.industry] ?? 'blue'}>{project.industry}</Badge>
            <Badge variant="blue">{project.service}</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-[#E8E8E8] leading-tight mb-3">
            {project.title}
          </h1>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="bg-[var(--c-bg-alt)] dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Key Results removed per request */}

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article content */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection delay={0.1}>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-4">Project Overview</h2>
                <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed text-lg">{project.overview}</p>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-4">The Challenge</h2>
                <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed">{project.challenge}</p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-4">Our Solution</h2>
                <p className="text-slate-500 dark:text-[#94A3B8] leading-relaxed">{project.solution}</p>
              </AnimatedSection>

              {project.sections && project.sections.length > 0 && (
                <>
                  {project.sections.map((sec, idx) => (
                    <AnimatedSection key={sec.heading} delay={0.25 + idx * 0.05}>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-[#E8E8E8] mb-3">{sec.heading}</h3>
                      <ul className="list-disc pl-5 text-slate-500 dark:text-[#94A3B8] space-y-2">
                        {sec.points.map((pt) => (
                          <li key={pt} className="leading-relaxed">{pt}</li>
                        ))}
                      </ul>
                    </AnimatedSection>
                  ))}
                </>
              )}

              {project.testimonial && (
                <AnimatedSection delay={0.25}>
                  <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-8">
                    <Quote size={22} className="text-blue-500/50 mb-5" />
                    <p className="text-slate-700 dark:text-[#E8E8E8] text-lg italic leading-relaxed mb-6">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-navy-500/40">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: project.color }}>
                        {project.testimonial.author.trim()[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-[#E8E8E8]">{project.testimonial.author}</div>
                        <div className="text-xs text-slate-400 dark:text-[#64748B]">{project.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <AnimatedSection direction="right" className="space-y-5">
              {/* Tech stack */}
              <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-6">
                <h3 className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest mb-5">Skills and deliverables</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>

              {/* Project info */}
              <div className="glass rounded-2xl border border-slate-200 dark:border-navy-500/40 p-6">
                <h3 className="text-xs font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-widest mb-5">Details</h3>
                <dl className="space-y-3">
                  {[
                    { label: 'Client',   value: project.client },
                    { label: 'Industry', value: project.industry },
                    { label: 'Service',  value: project.service },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4">
                      <dt className="text-xs text-slate-400 dark:text-[#64748B]">{label}</dt>
                      <dd className="text-sm text-slate-800 dark:text-[#E8E8E8] font-medium text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                Start a Similar Project <ArrowRight size={14} />
              </Button>
            </AnimatedSection>
          </div>

          {/* Related */}
          <AnimatedSection delay={0.3} className="mt-20">
            <h2 className="text-xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-8">More Projects</h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <Link href={`/portfolio/${p.slug}`} className="group block h-full">
                    <div className="h-full rounded-3xl overflow-hidden border border-slate-100 dark:border-navy-700 bg-white/60 dark:bg-navy-800/40 backdrop-blur-sm hover:border-blue-200 dark:hover:border-blue-600/30 transition-all duration-300 shadow-lg hover:shadow-2xl transform-gpu hover:-translate-y-1 group flex flex-col">
                      <div className="relative w-full pb-[56.25%] bg-slate-50 dark:bg-navy-700">
                        {p.cover ? (
                          <img src={p.cover} alt={p.title} className="absolute inset-0 w-full h-full object-cover block" loading="lazy" />
                        ) : (
                          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.color}18, ${p.color}05)` }} />
                        )}

                        <div className="absolute inset-0 dot-grid opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4 flex items-center gap-3 z-10">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-900 font-bold text-base shadow" style={{ background: '#D1D5DB' }}>
                            {p.title.trim()[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white leading-tight">{p.title}</div>
                            <div className="text-xs font-mono text-white/80">{p.industry}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex-1">
                        <div className="flex items-center mb-4">
                          <Badge variant={badgeVariants[p.industry] ?? 'blue'}>{p.industry}</Badge>
                        </div>

                        <h3 className="font-semibold text-base mb-1.5 transition-colors text-white group-hover:text-blue-600">{p.title}</h3>
                        <p className="text-sm text-slate-500 mb-4">{p.tagline}</p>
                      </div>
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
