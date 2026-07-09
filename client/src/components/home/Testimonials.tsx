import { Star } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import AnimatedSection from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    quote: 'Their team delivered a complete SaaS platform in 10 weeks — fully under our brand. The code quality was exceptional.',
    author: 'Marcus Webb',
    role: 'Director',
    company: 'Luminary Digital Agency',
  },
  {
    quote: 'We went from turning down projects to confidently pitching mobile app work. Fuserr handles everything behind the scenes.',
    author: 'Priya Nair',
    role: 'Founder',
    company: 'Nexus Growth Studio',
  },
  {
    quote: "The NDA was signed within the hour, kickoff was the next day. They matched our client's brand guide exactly.",
    author: 'Tom Hartley',
    role: 'Managing Partner',
    company: 'Hartley & Co Consulting',
  },
  {
    quote: 'I was worried about losing control of my client relationships. Instead, Fuserr made me look like a rockstar.',
    author: 'Sarah Osei',
    role: 'CEO',
    company: 'Osei Creative Group',
  },
];

function RatingBadge() {
  return (
    <div className="relative w-52 h-52 mx-auto">
      {/* Scalloped starburst backing */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-400 to-blue-600 rotate-0" />
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-400 to-blue-600 rotate-[30deg]" />
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-400 to-blue-600 rotate-[60deg]" />

      {/* Inner disc */}
      <div className="absolute inset-5 rounded-full bg-white dark:bg-navy-900 shadow-inner flex items-center justify-center">
        <div className="w-[86%] h-[86%] rounded-full border-[3px] border-blue-500 flex flex-col items-center justify-center bg-blue-50 dark:bg-navy-800">
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">4.9/5</span>
          <div className="flex gap-0.5 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Ribbon tail */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-9 w-12 h-16"
        style={{
          background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
        }}
      />

      {/* Base shadow */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-11 w-32 h-4 rounded-full bg-slate-200 dark:bg-black/30 blur-[2px]" />
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden bg-white dark:bg-navy-900">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-navy-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block w-10 h-1 rounded-full bg-blue-600 mb-5" />
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-[#E8E8E8]">Client Reviews</h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          <StaggerContainer className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
            {testimonials.map((t) => (
              <StaggerItem key={t.author}>
                <p className="text-slate-900 dark:text-[#E8E8E8] text-lg leading-relaxed mb-5">
                  {t.quote}
                </p>
                <div className="text-xs font-mono tracking-wide">
                  <div className="text-slate-900 dark:text-[#E8E8E8] font-semibold uppercase">{t.author}</div>
                  <div className="text-slate-400 dark:text-[#64748B] uppercase mt-0.5">
                    {t.role}, {t.company}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.2} className="pb-8 lg:pb-0">
            <RatingBadge />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
