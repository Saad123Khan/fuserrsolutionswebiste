import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const steps = [
  {
    number: '01',
    title: 'Kickoff & NDA',
    description: 'Share your project brief. We sign NDAs, map out goals, and assign a dedicated manager and dev team.',
  },
  {
    number: '02',
    title: 'Plan & Estimate',
    description: 'We define scope, timeline, and pricing. Once approved, our team integrates into your workflow.',
  },
  {
    number: '03',
    title: 'Build & Test',
    description: 'Your work ships in sprints. We code, test, and refine — you see demos, your clients see results.',
  },
  {
    number: '04',
    title: 'Launch & Handoff',
    description: 'Final delivery under your brand. All code, assets, and docs handed over — we stay invisible.',
  },
];

export default function ProcessPreview() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-100 dark:bg-navy-950">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
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

        {/* Timeline-style layout */}
        <StaggerContainer className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[3.5rem] right-[3.5rem] h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-navy-500 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StaggerItem key={step.number}>
                <div className="relative group">
                  {/* Number bubble */}
                  <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-navy-800/60 border border-slate-200 dark:border-navy-500/60 flex items-center justify-center mb-5 mx-auto lg:mx-0 group-hover:border-blue-600/40 transition-colors duration-300 shadow-sm">
                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">{step.number}</span>
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 w-full h-px bg-slate-200 dark:bg-navy-500/40" />
                    )}
                  </div>

                  <h3 className="text-slate-900 dark:text-[#E8E8E8] font-semibold mb-2 text-center lg:text-left">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#64748B] leading-relaxed text-center lg:text-left">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
