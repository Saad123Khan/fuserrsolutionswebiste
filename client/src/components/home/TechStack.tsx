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
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const technologies: { name: string; icon: IconType }[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact },
  { name: 'Vue.js', icon: SiVuedotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Framer', icon: SiFramer },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Go', icon: SiGo },
  { name: 'Python', icon: SiPython },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'NestJS', icon: SiNestjs },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'Hugging Face', icon: SiHuggingface },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Swift', icon: SiSwift },
  { name: 'Kotlin', icon: SiKotlin },
  { name: 'Expo', icon: SiExpo },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Redis', icon: SiRedis },
  { name: 'Elasticsearch', icon: SiElasticsearch },
  { name: 'Kafka', icon: SiApachekafka },
  { name: 'AWS', icon: FaAws },
  { name: 'Google Cloud', icon: SiGooglecloud },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'Docker', icon: SiDocker },
  { name: 'Terraform', icon: SiTerraform },
];

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

      {/* Logo grid */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" delay={0.15}>
        <StaggerContainer className="flex flex-wrap justify-center gap-x-10 gap-y-10 sm:gap-x-12">
          {technologies.map(({ name, icon: Icon }) => (
            <StaggerItem key={name} className="flex flex-col items-center w-24">
              <Icon
                size={34}
                className="text-slate-400 dark:text-[#64748B] hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              />
              <span className="mt-3 text-[11px] font-mono font-medium text-slate-500 dark:text-[#94A3B8] uppercase tracking-wide text-center leading-tight">
                {name}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>
    </section>
  );
}
