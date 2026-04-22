'use client';

import { Quote } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import AnimatedSection from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    quote:
      "Fuserr delivered a system that directly saves lives. The AI predictions have transformed how our clinical teams prioritize care. Exceptional team.",
    author: 'Dr. Sarah Okonkwo',
    role: 'Chief Medical Officer',
    company: 'MediCore Systems',
    initial: 'S',
    color: '#10B981',
  },
  {
    quote:
      "The platform is flawless. Our NPS jumped from 34 to 71 within three months of launch. I've worked with a lot of agencies — Fuserr is in a different league.",
    author: 'James Thorpe',
    role: 'CTO',
    company: 'Arvest Financial',
    initial: 'J',
    color: '#3B82F6',
  },
  {
    quote:
      "They didn't just build what we asked for — they challenged our assumptions and delivered something better. The contract AI saves us 70% review time.",
    author: 'Maya Patel',
    role: 'Managing Partner',
    company: 'Thornton & Associates',
    initial: 'M',
    color: '#06B6D4',
  },
  {
    quote:
      "Every sprint demo showed real progress. Zero scope creep, no surprises. Our new commerce platform has a 22% higher conversion rate than the old one.",
    author: 'Lucas Vandenberg',
    role: 'Head of Digital',
    company: 'Meridian Brands',
    initial: 'L',
    color: '#F59E0B',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy-500/50 to-transparent" />

      {/* Large background quote mark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[20rem] font-bold text-navy-700/20 leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <SectionTitle
            eyebrow="Client Stories"
            title="Words from"
            highlight="the teams we've built for"
            align="center"
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <StaggerItem key={t.author}>
              <div
                className={`glass border border-navy-500/40 rounded-2xl p-8 h-full flex flex-col gap-6 hover:border-navy-500/70 transition-colors duration-300 ${
                  i === 0 ? 'md:row-span-1' : ''
                }`}
              >
                <Quote size={24} className="text-blue-600/60 shrink-0" />

                <p className="text-[#E8E8E8] text-lg leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-navy-500/40">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#E8E8E8]">{t.author}</div>
                    <div className="text-xs text-[#64748B]">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
