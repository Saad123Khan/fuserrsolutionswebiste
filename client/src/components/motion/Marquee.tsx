import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Higher = slower. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Tailwind gap class between items, e.g. "gap-12". Also used as trailing padding so the loop is seamless. */
  gapClassName?: string;
  className?: string;
}

/** Infinite horizontal scroller with faded edges. Content is rendered twice for a seamless loop. */
export default function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  gapClassName = 'gap-12 pr-12',
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]',
        className
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 ? true : undefined}
          className={cn(
            'marquee-track flex shrink-0 items-center',
            gapClassName,
            pauseOnHover && 'group-hover:[animation-play-state:paused]'
          )}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
