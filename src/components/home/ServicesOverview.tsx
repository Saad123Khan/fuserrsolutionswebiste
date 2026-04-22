'use client';

import Link from 'next/link';
import { Brain, Smartphone, Globe, ShoppingCart, Palette, Wrench, ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import AnimatedSection from '@/components/ui/AnimatedSection';

const services = [
  {
    icon: Brain,
    title: 'AI Development',
    description: 'LLMs, ML pipelines, and AI agents that give your business a measurable edge.',
    href: '/services#ai',
    accent: '#3B82F6',
    tags: ['LLM', 'ML', 'Python'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform and native apps built for performance, retention, and delight.',
    href: '/services#mobile',
    accent: '#8B5CF6',
    tags: ['React Native', 'Swift', 'Flutter'],
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'SaaS platforms and enterprise portals engineered for scale and conversion.',
    href: '/services#web',
    accent: '#06B6D4',
    tags: ['Next.js', 'React', 'Go'],
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce',
    description: 'Headless storefronts and commerce infrastructure that maximise GMV.',
    href: '/services#ecommerce',
    accent: '#F59E0B',
    tags: ['Shopify', 'Next.js', 'GraphQL'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Design systems and interfaces that communicate trust and convert.',
    href: '/services#design',
    accent: '#EC4899',
    tags: ['Figma', 'Design Systems', 'Research'],
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Proactive monitoring, patches, and optimisation for live products.',
    href: '/services#maintenance',
    accent: '#10B981',
    tags: ['DevOps', 'SLAs', '24/7'],
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden bg-slate-50 dark:bg-navy-900">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/25 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <SectionTitle
            eyebrow="What We Build"
            title="Fusing expertise"
            highlight="across every layer"
            description="End-to-end engineering under one roof — so your product never gets lost in handoffs."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors shrink-0 group"
          >
            Explore all services
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-navy-500/20 rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-500/30">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <Link
                  href={service.href}
                  className="group block bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800/80 transition-all duration-300 p-8 h-full relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at 0% 0%, ${service.accent}08 0%, transparent 60%)` }}
                  />

                  <div className="relative">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300"
                      style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}28` }}
                    >
                      <Icon size={20} style={{ color: service.accent }} />
                    </div>

                    <h3 className="text-slate-900 dark:text-[#E8E8E8] font-semibold text-lg mb-3 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 dark:text-[#94A3B8] text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="absolute top-6 right-6 text-slate-200 dark:text-[#1E2D4D] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
