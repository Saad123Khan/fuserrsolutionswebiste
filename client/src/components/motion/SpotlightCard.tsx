import { useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card with a soft glow that follows the cursor, plus a matching glowing border.
 * Styles live in index.css (.spotlight-card).
 */
export default function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        'spotlight-card relative overflow-hidden rounded-2xl border border-slate-200 dark:border-navy-500/40 bg-white dark:bg-navy-800/40',
        className
      )}
    >
      {children}
    </div>
  );
}
