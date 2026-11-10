import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TextReveal, { type RevealSegment } from '@/components/motion/TextReveal';

interface SectionHeadingProps {
  eyebrow?: string;
  /** Heading text; use `{ text, className: 'text-gradient' }` segments for highlights. */
  title: RevealSegment[] | string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Standard section header: eyebrow label, word-reveal title, fading description. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const center = align === 'center';

  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn('mb-4 flex items-center gap-2', center && 'justify-center')}
        >
          <span className="h-px w-6 bg-blue-500" />
          <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {eyebrow}
          </span>
          {center && <span className="h-px w-6 bg-blue-500" />}
        </motion.div>
      )}

      <TextReveal
        as="h2"
        segments={title}
        className="text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-[#E8E8E8] sm:text-4xl lg:text-5xl"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-lg leading-relaxed text-slate-500 dark:text-[#94A3B8]"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
