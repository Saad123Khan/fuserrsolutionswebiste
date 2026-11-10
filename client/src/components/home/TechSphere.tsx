import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Hand } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiNextdotjs, SiReact, SiVuedotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiGo, SiPython, SiFastapi, SiNestjs, SiGraphql,
  SiPytorch, SiTensorflow, SiHuggingface,
  SiFlutter, SiSwift, SiKotlin, SiExpo,
  SiPostgresql, SiMongodb, SiRedis, SiElasticsearch, SiApachekafka,
  SiGooglecloud, SiKubernetes, SiDocker, SiTerraform, SiLaravel, SiStripe, SiFigma,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { BsOpenai } from 'react-icons/bs';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

type Category = 'Frontend' | 'Backend' | 'Mobile' | 'AI & Data' | 'Cloud & DevOps';

interface Tech {
  name: string;
  icon: IconType;
  /** Brand colour on hover; omitted for black/white logos. */
  color?: string;
  cat: Category;
}

const TECH: Tech[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB', cat: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, cat: 'Frontend' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D', cat: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', cat: 'Frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', cat: 'Frontend' },
  { name: 'Framer', icon: SiFramer, cat: 'Frontend' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E', cat: 'Frontend' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', cat: 'Backend' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E', cat: 'Backend' },
  { name: 'Python', icon: SiPython, color: '#3776AB', cat: 'Backend' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688', cat: 'Backend' },
  { name: 'Go', icon: SiGo, color: '#00ADD8', cat: 'Backend' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', cat: 'Backend' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', cat: 'Backend' },
  { name: 'Stripe', icon: SiStripe, color: '#635BFF', cat: 'Backend' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B', cat: 'Mobile' },
  { name: 'Swift', icon: SiSwift, color: '#F05138', cat: 'Mobile' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', cat: 'Mobile' },
  { name: 'Expo', icon: SiExpo, cat: 'Mobile' },
  { name: 'OpenAI', icon: BsOpenai, cat: 'AI & Data' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', cat: 'AI & Data' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', cat: 'AI & Data' },
  { name: 'Hugging Face', icon: SiHuggingface, color: '#FFD21E', cat: 'AI & Data' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', cat: 'AI & Data' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', cat: 'AI & Data' },
  { name: 'Redis', icon: SiRedis, color: '#FF4438', cat: 'AI & Data' },
  { name: 'Elasticsearch', icon: SiElasticsearch, color: '#00BFB3', cat: 'AI & Data' },
  { name: 'Kafka', icon: SiApachekafka, cat: 'AI & Data' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', cat: 'Cloud & DevOps' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4', cat: 'Cloud & DevOps' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', cat: 'Cloud & DevOps' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5', cat: 'Cloud & DevOps' },
  { name: 'Terraform', icon: SiTerraform, color: '#844FBA', cat: 'Cloud & DevOps' },
];

const CATEGORIES: Category[] = ['Frontend', 'Backend', 'Mobile', 'AI & Data', 'Cloud & DevOps'];

/** Evenly spread points on a unit sphere (Fibonacci lattice). */
function spherePoints(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return pts;
}

const AUTO_SPIN = 0.18; // rad/s around Y when idle

export default function TechSphere() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focus, setFocus] = useState<Category | null>(null);
  const focusRef = useRef<Category | null>(null);
  focusRef.current = focus;

  const points = useMemo(() => spherePoints(TECH.length), []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let radius = 220;
    let rotX = -0.25;
    let rotY = 0;
    let velX = 0;
    let velY = reduce ? 0 : AUTO_SPIN;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let raf = 0;
    let visible = true;
    let prev = performance.now();

    const measure = () => {
      radius = Math.min(stage.clientWidth, 640) * 0.4;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    const render = () => {
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const f = focusRef.current;
      points.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        // rotate around Y, then X
        const x1 = p[0] * cy + p[2] * sy;
        const z1 = -p[0] * sy + p[2] * cy;
        const y2 = p[1] * cx - z1 * sx;
        const z2 = p[1] * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const scale = 0.55 + depth * 0.65;
        const dim = f && TECH[i].cat !== f ? 0.18 : 1;
        el.style.transform = `translate3d(${x1 * radius}px, ${y2 * radius}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String((0.2 + depth * 0.8) * dim);
        el.style.zIndex = String(Math.round(depth * 100));
        el.dataset.front = depth > 0.62 ? '1' : '0';
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!dragging) {
        rotY += velY * dt;
        rotX += velX * dt;
        // ease back to a gentle auto-spin and level tilt
        velY += ((reduce ? 0 : AUTO_SPIN) - velY) * Math.min(1, dt * 1.5);
        velX += (0 - velX) * Math.min(1, dt * 2);
        rotX += (-0.25 - rotX) * Math.min(1, dt * 0.6);
      }
      render();
      raf = requestAnimationFrame(tick);
    };

    const play = () => {
      if (raf || !visible || document.hidden) return;
      prev = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      velX = 0;
      velY = 0;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-dragging');
      play();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastT) / 1000;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      rotY += dx * 0.008;
      rotX -= dy * 0.008;
      velY = (dx * 0.008) / dt;
      velX = (-dy * 0.008) / dt;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      if (reduce) render();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      stage.classList.remove('is-dragging');
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
      // cap fling speed
      velY = Math.max(-6, Math.min(6, velY));
      velX = Math.max(-6, Math.min(6, velX));
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(stage);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVis);

    render();
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
    };
  }, [points, reduce]);

  return (
    <section className="relative overflow-hidden bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Tech stack"
          title={['Built with', { text: 'proven technology', className: 'text-gradient' }]}
          description="Our toolbox for web, mobile, AI and cloud. Drag the globe to explore."
          className="mb-6"
        />

        {/* Globe */}
        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          {/* Glow + orbit rings */}
          <div className="pointer-events-none absolute inset-[18%] rounded-full bg-blue-600/20 blur-[80px]" />
          <div className="pointer-events-none absolute inset-[6%] rounded-full border border-cyan-400/10" />
          <div className="pointer-events-none absolute inset-[2%] [transform:rotateX(72deg)]">
            <div className="h-full w-full animate-spin-slow rounded-full border-2 border-dashed border-blue-400/20" />
          </div>
          <div className="pointer-events-none absolute inset-[8%] [transform:rotate(-24deg)_rotateX(72deg)]">
            <div className="h-full w-full animate-spin-slow-r rounded-full border border-violet-400/25" />
          </div>

          <div
            ref={stageRef}
            role="img"
            aria-label={`Technologies we use: ${TECH.map((t) => t.name).join(', ')}`}
            className="tech-sphere absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
          >
            <div className="absolute left-1/2 top-1/2">
              {TECH.map((t, i) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.name}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    className="tech-sphere__item group absolute left-0 top-0 flex flex-col items-center will-change-transform"
                    style={{ '--brand': t.color ?? '#60A5FA' } as CSSProperties}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0A1224]/90 shadow-lg transition-[border-color,box-shadow] duration-300 group-hover:border-[var(--brand)] group-hover:shadow-[0_0_24px_var(--brand)]">
                      <Icon size={28} className="text-slate-300 transition-colors duration-300 group-hover:text-[var(--brand)]" />
                    </span>
                    <span className="tech-sphere__label mt-1.5 whitespace-nowrap text-[11px] font-medium text-slate-400 transition-opacity duration-300 group-hover:text-white">
                      {t.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drag hint */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 backdrop-blur"
          >
            <motion.span animate={{ x: [-4, 4, -4] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <Hand size={13} />
            </motion.span>
            Drag to rotate
          </motion.div>
        </div>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const on = focus === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setFocus(on ? null : c)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  on
                    ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'border-white/10 text-slate-400 hover:border-blue-400/50 hover:text-white'
                )}
              >
                {c}
                <span className="ml-1.5 text-xs opacity-60">{TECH.filter((t) => t.cat === c).length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
