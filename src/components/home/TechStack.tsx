'use client';

import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection from '@/components/ui/AnimatedSection';

const techCategories = [
  {
    label: 'Frontend',
    items: ['Next.js', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Go', 'Python', 'FastAPI', 'NestJS', 'GraphQL'],
  },
  {
    label: 'AI / ML',
    items: ['PyTorch', 'TensorFlow', 'OpenAI', 'LangChain', 'Hugging Face', 'ONNX'],
  },
  {
    label: 'Mobile',
    items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Capacitor'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'TimescaleDB', 'Kafka'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'Terraform'],
  },
];

const row1 = techCategories.slice(0, 3).flatMap((c) => c.items);
const row2 = techCategories.slice(3).flatMap((c) => c.items);

function TechChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-navy-500/50 bg-white dark:bg-navy-800/50 text-sm text-slate-500 dark:text-[#94A3B8] font-mono whitespace-nowrap hover:border-blue-400 dark:hover:border-blue-600/40 hover:text-blue-600 dark:hover:text-blue-300 transition-colors cursor-default">
      <span className="w-1 h-1 rounded-full bg-blue-500/60" />
      {label}
    </span>
  );
}

export default function TechStack() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy-950">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-navy-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AnimatedSection>
          <SectionTitle
            eyebrow="Tech Stack"
            title="Built with the best"
            highlight="the best"
            description="We don't chase trends — we select proven tools that solve real problems at scale."
            align="center"
          />
        </AnimatedSection>
      </div>

      {/* Category grid */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techCategories.map((cat) => (
            <div key={cat.label} className="rounded-xl border border-slate-200 dark:border-navy-500/40 bg-white dark:bg-navy-800/40 p-4">
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-3">
                {cat.label}
              </div>
              <div className="space-y-1.5">
                {cat.items.map((item) => (
                  <div key={item} className="text-xs text-slate-500 dark:text-[#94A3B8] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-navy-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Marquee rows */}
      <div className="space-y-4 overflow-hidden">
        <div className="flex animate-marquee gap-4 w-max">
          {[...row1, ...row1].map((item, i) => (
            <TechChip key={`r1-${i}`} label={item} />
          ))}
        </div>
        <div className="flex animate-marquee-reverse gap-4 w-max">
          {[...row2, ...row2].map((item, i) => (
            <TechChip key={`r2-${i}`} label={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
