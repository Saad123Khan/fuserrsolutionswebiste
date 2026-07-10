import { Link } from 'react-router-dom';
import { ArrowUpRight, ClipboardList, FileText, Code2, Rocket } from 'lucide-react';
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
    <section className="py-24 lg:py-32 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-slate-500">
              How It Works
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-slate-900 leading-tight">
              Simple for agencies, seamless for clients
            </h2>
            <p className="mt-5 text-[17px] text-slate-500 leading-relaxed">
              A 4-step process that keeps your client relationship front and centre while we
              handle every line of code.
            </p>
          </div>
          <Link
            to="/how-we-work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors shrink-0"
          >
            Full process breakdown
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <AnimatedSection className="mb-12">
          <h3 className="text-slate-900 font-bold text-lg">Our process involves:</h3>
        </AnimatedSection>

        {/* Desktop — timeline */}
        <div className="hidden sm:block relative">
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-1 rounded-full bg-blue-600" aria-hidden="true" />

          <StaggerContainer className="relative grid grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.title}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-[220px]">{step.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Mobile — vertical stack */}
        <StaggerContainer className="sm:hidden divide-y divide-slate-200">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.title}>
                <div className="flex items-start gap-4 py-6 first:pt-0">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{step.title}</div>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{step.description}</p>
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
