'use client';

import Link from 'next/link';
import { Globe, Server, Smartphone, Package, Plug, Layers, ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import AnimatedSection from '@/components/ui/AnimatedSection';

const services = [
  {
    icon: Globe,
    title: 'Web Application Development',
    description: 'Responsive, SEO-friendly web apps delivered under your brand — from React/Next.js frontends to full-stack SaaS platforms.',
    href: '/services#web',
    accent: '#3B82F6',
    tags: ['React', 'Next.js', 'Vue', 'Angular'],
  },
  {
    icon: Server,
    title: 'Backend & API Engineering',
    description: 'Scalable, secure backends with REST/GraphQL APIs. We handle architecture so your clients get rock-solid infrastructure.',
    href: '/services#backend',
    accent: '#06B6D4',
    tags: ['Node.js', 'Laravel', 'Python', '.NET'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'White-label iOS & Android apps built cross-platform or native — delivered as your agency\'s own work.',
    href: '/services#mobile',
    accent: '#8B5CF6',
    tags: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    icon: Package,
    title: 'SaaS Product Development',
    description: 'End-to-end SaaS builds from MVP to enterprise scale — multi-tenancy, subscription billing, and full lifecycle support.',
    href: '/services#saas',
    accent: '#F59E0B',
    tags: ['SaaS', 'Multi-tenant', 'Stripe', 'AWS'],
  },
  {
    icon: Plug,
    title: 'API & Third-Party Integrations',
    description: 'Connect systems seamlessly — CRM, payment gateways, ERP, analytics, and custom integrations your clients need.',
    href: '/services#integrations',
    accent: '#10B981',
    tags: ['REST', 'GraphQL', 'Webhooks', 'OAuth'],
  },
  {
    icon: Layers,
    title: 'UI/UX Implementation',
    description: 'Pixel-perfect HTML/CSS from Figma or Sketch designs. We translate your clients\' vision into flawless, production-ready UI.',
    href: '/services#ui',
    accent: '#EC4899',
    tags: ['Figma', 'Tailwind', 'Design Systems', 'A11y'],
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden bg-slate-50 dark:bg-navy-900">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/25 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <SectionTitle
            eyebrow="What We Build For You"
            title="Full-stack white-label"
            highlight="across every layer"
            description="Complete development services delivered invisibly under your agency's brand — no credits, no traces."
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
