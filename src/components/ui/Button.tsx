'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  external,
  disabled,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-sm hover:shadow-blue-md active:scale-[0.98]',
    secondary:
      'bg-navy-700 text-[#E8E8E8] hover:bg-navy-600 border border-navy-500 active:scale-[0.98]',
    ghost:
      'text-[#94A3B8] hover:text-[#E8E8E8] hover:bg-navy-800 active:scale-[0.98]',
    outline:
      'border border-blue-600 text-blue-400 hover:bg-blue-600/10 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
