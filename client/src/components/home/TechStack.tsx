import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiNextdotjs, SiReact, SiVuedotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiGo, SiPython, SiFastapi, SiNestjs, SiGraphql,
  SiPytorch, SiTensorflow, SiHuggingface,
  SiFlutter, SiSwift, SiKotlin, SiExpo,
  SiPostgresql, SiMongodb, SiRedis, SiElasticsearch, SiApachekafka,
  SiGooglecloud, SiKubernetes, SiDocker, SiTerraform,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

interface Tech {
  name: string;
  icon: IconType;
  /** Brand colour shown on hover; omitted for black/white logos (falls back to blue). */
  color?: string;
}

const categories: { key: string; label: string; items: Tech[] }[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: SiFramer },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Go', icon: SiGo, color: '#00ADD8' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    ],
  },
  {
    key: 'mobile',
    label: 'Mobile',
    items: [
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
      { name: 'Swift', icon: SiSwift, color: '#F05138' },
      { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
      { name: 'Expo', icon: SiExpo },
    ],
  },
  {
    key: 'ai-data',
    label: 'AI & Data',
    items: [
      { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
      { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
      { name: 'Hugging Face', icon: SiHuggingface, color: '#FFD21E' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Redis', icon: SiRedis, color: '#FF4438' },
      { name: 'Elasticsearch', icon: SiElasticsearch, color: '#00BFB3' },
      { name: 'Kafka', icon: SiApachekafka },
    ],
  },
  {
    key: 'cloud',
    label: 'Cloud & DevOps',
    items: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
      { name: 'Terraform', icon: SiTerraform, color: '#844FBA' },
    ],
  },
];

export default function TechStack() {
  const [tab, setTab] = useState(categories[0].key);
  const current = categories.find((c) => c.key === tab) ?? categories[0];

  return (
    <section className="relative overflow-hidden bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Tech stack"
          title={['Built with', { text: 'proven technology', className: 'text-gradient' }]}
          description="We pick the right tools for your product, not the trendiest ones."
          className="mb-12"
        />

        {/* Tabs */}
        <div className="mb-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Technology categories"
            className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white p-1 dark:border-navy-500/50 dark:bg-navy-800/60"
          >
            {categories.map((c) => {
              const on = c.key === tab;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => setTab(c.key)}
                  className={cn(
                    'relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5',
                    on ? 'text-white' : 'text-slate-500 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:text-white'
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="tech-tab-pill"
                      className="absolute inset-0 rounded-full bg-blue-600 shadow-md shadow-blue-600/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logos */}
        <div role="tabpanel" className="flex min-h-[15rem] flex-wrap content-start justify-center gap-4">
          <AnimatePresence mode="popLayout">
            {current.items.map(({ name, icon: Icon, color }, i) => (
              <motion.div
                key={`${tab}-${name}`}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.04, duration: 0.35 } }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className="group flex w-32 flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-lg dark:border-navy-500/40 dark:bg-navy-800/40 sm:w-36"
                style={{ '--brand': color ?? '#2563EB' } as CSSProperties}
              >
                <Icon size={36} className="text-slate-400 transition-colors duration-300 group-hover:text-[var(--brand)] dark:text-[#64748B]" />
                <span className="text-center text-xs font-medium text-slate-600 dark:text-[#94A3B8]">{name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
