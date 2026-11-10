import { Fragment } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/** A plain string, a styled run of text, or "\n" for a line break. */
export type RevealSegment = string | { text: string; className?: string };

interface TextRevealProps {
  segments: RevealSegment[] | string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" animates immediately (heroes); "inView" waits until scrolled into view. */
  trigger?: 'mount' | 'inView';
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const word: Variants = {
  hidden: { opacity: 0, y: '0.35em', filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Headline that reveals word by word (fade + rise + un-blur). */
export default function TextReveal({
  segments,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.06,
  trigger = 'inView',
}: TextRevealProps) {
  const list: RevealSegment[] = typeof segments === 'string' ? [segments] : segments;
  const plain = list
    .map((s) => (typeof s === 'string' ? s : s.text))
    .join(' ')
    .replace(/\s*\n\s*/g, ' ')
    .trim();

  const MotionTag = motion[as];
  const animateProps =
    trigger === 'mount'
      ? { animate: 'visible' as const }
      : { whileInView: 'visible' as const, viewport: { once: true, margin: '-60px' } };

  return (
    <MotionTag
      aria-label={plain}
      className={className}
      initial="hidden"
      variants={container(delay, stagger)}
      {...animateProps}
    >
      {list.map((seg, si) => {
        const text = typeof seg === 'string' ? seg : seg.text;
        const segClass = typeof seg === 'string' ? undefined : seg.className;

        if (text === '\n') return <br key={si} />;

        return (
          <Fragment key={si}>
            {text
              .split(/\s+/)
              .filter(Boolean)
              .map((w, wi) => (
                <Fragment key={wi}>
                  <motion.span
                    aria-hidden="true"
                    variants={word}
                    className={cn('inline-block will-change-transform', segClass)}
                  >
                    {w}
                  </motion.span>{' '}
                </Fragment>
              ))}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
