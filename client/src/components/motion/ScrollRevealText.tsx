import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
export default function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(/\s+/).filter(Boolean);

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
