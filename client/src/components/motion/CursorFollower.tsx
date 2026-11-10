import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type Mode = 'hidden' | 'idle' | 'hover' | 'text';

const INTERACTIVE = 'a, button, summary, select, label[for], [role="button"], [role="tab"], .cursor-pointer';
const TEXT_FIELD =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]';

const RING: Record<Mode, { size: number; opacity: number; border: string; bg: string; glow: string }> = {
  hidden: { size: 30, opacity: 0, border: 'rgba(34,211,238,0)', bg: 'rgba(34,211,238,0)', glow: '0 0 0 rgba(0,0,0,0)' },
  idle: {
    size: 30,
    opacity: 1,
    border: 'rgba(34,211,238,0.55)',
    bg: 'rgba(34,211,238,0.05)',
    glow: '0 0 18px rgba(34,211,238,0.35)',
  },
  hover: {
    size: 54,
    opacity: 1,
    border: 'rgba(96,165,250,0.9)',
    bg: 'rgba(37,99,235,0.16)',
    glow: '0 0 32px rgba(59,130,246,0.6)',
  },
  text: { size: 16, opacity: 0, border: 'rgba(34,211,238,0)', bg: 'rgba(34,211,238,0)', glow: '0 0 0 rgba(0,0,0,0)' },
};

/**
 * Animated ring that trails the (custom arrow) mouse cursor: springs after the
 * pointer, grows and glows over clickable elements, squeezes on click and
 * hides over text fields. Only on fine pointers; off for reduced motion.
 */
export default function CursorFollower() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('hidden');
  const [pressed, setPressed] = useState(false);
  const modeRef = useRef<Mode>('hidden');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 450, damping: 32, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const setModeIfChanged = (m: Mode) => {
      if (modeRef.current !== m) {
        modeRef.current = m;
        setMode(m);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      // Ring sits just behind the arrow tip, around the arrow body
      x.set(e.clientX + 6);
      y.set(e.clientY + 8);
      const t = e.target as Element | null;
      setModeIfChanged(t?.closest(TEXT_FIELD) ? 'text' : t?.closest(INTERACTIVE) ? 'hover' : 'idle');
    };
    const onLeave = () => setModeIfChanged('hidden');
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('blur', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const r = RING[mode];
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ x: sx, y: sy }}>
      <motion.div
        className="rounded-full border-[1.5px]"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          width: r.size,
          height: r.size,
          opacity: r.opacity,
          borderColor: r.border,
          backgroundColor: r.bg,
          boxShadow: r.glow,
          scale: pressed ? 0.75 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26, mass: 0.5 }}
      />
    </motion.div>
  );
}
