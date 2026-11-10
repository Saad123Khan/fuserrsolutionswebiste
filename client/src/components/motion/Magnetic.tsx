import { useRef, type ReactNode, type PointerEvent } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  /** 0–1: how far the element follows the cursor. */
  strength?: number;
  className?: string;
}

/** Wrapper that gently pulls its child toward the cursor (desktop pointers only). */
export default function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className ?? 'inline-block'}
    >
      {children}
    </motion.div>
  );
}
