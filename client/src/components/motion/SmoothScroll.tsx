import type { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import 'lenis/dist/lenis.css';

/** Site-wide smooth scrolling. Falls back to native scroll for reduced-motion users. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
