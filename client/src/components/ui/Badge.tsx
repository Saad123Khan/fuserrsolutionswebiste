import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'purple' | 'cyan' | 'red';
  className?: string;
}

const variants = {
  blue: 'bg-blue-600/10 border-blue-600/25 text-blue-400',
  green: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
  purple: 'bg-violet-500/10 border-violet-500/25 text-violet-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
  red: 'bg-red-500/10 border-red-500/25 text-red-400',
};

export default function Badge({ children, variant = 'blue', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
