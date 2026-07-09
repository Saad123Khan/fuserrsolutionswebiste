import { Link } from 'react-router-dom';
import { ArrowUpRight, ClipboardList, FileText, Code2, Rocket } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const steps = [
  {
    icon: ClipboardList,
    title: 'Kickoff & NDA',
    description: 'Share your project brief. We sign NDAs, map out goals, and assign a dedicated manager and dev team.',
  },
  {
    icon: FileText,
    title: 'Plan & Estimate',
    description: 'We define scope, timeline, and pricing. Once approved, our team integrates into your workflow.',
  },
  {
    icon: Code2,
    title: 'Build & Test',
    description: 'Your work ships in sprints. We code, test, and refine — you see demos, your clients see results.',
  },
  {
    icon: Rocket,
    title: 'Launch & Handoff',
    description: 'Final delivery under your brand. All code, assets, and docs handed over — we stay invisible.',
  },
];

export default function ProcessPreview() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-100 dark:bg-navy-950">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
          <SectionTitle
            eyebrow="How It Works"
            title="Simple for agencies, seamless for clients"
            highlight="seamless for clients"
            description="A 4-step process that keeps your client relationship front-centre while we handle every line of code."
          />
          <Link
            to="/how-we-work"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors shrink-0 group"
          >
            Full process breakdown
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <h3 className="text-slate-900 dark:text-[#E8E8E8] font-bold text-lg">Our process involves:</h3>
        </AnimatedSection>

        {/* Horizontal stepper */}
        <div className="hidden sm:block relative">
          {/* Continuous connecting line, vertically centered on the icon circles (40px tall, so 20px = center) */}
          <div className="absolute top-5 -translate-y-1/2 left-[12.5%] right-[12.5%] h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />

          <StaggerContainer className="relative grid grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.title} className="flex flex-col items-center">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-600/25">
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="mt-4 text-sm font-semibold text-slate-900 dark:text-[#E8E8E8] text-center px-2">
                    {step.title}
                  </span>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Descriptions */}
          <div className="grid grid-cols-4 gap-6 mt-6">
            {steps.map((step) => (
              <p key={step.title} className="text-xs text-slate-500 dark:text-[#64748B] leading-relaxed px-2">
                {step.description}
              </p>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <StaggerContainer className="sm:hidden space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.title}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-md shadow-blue-600/25">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-[#E8E8E8] mb-1">{step.title}</div>
                    <p className="text-xs text-slate-500 dark:text-[#64748B] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
