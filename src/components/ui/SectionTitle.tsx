import { cn } from '@/lib/utils';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  className,
}: SectionTitleProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const titleWithHighlight = highlight
    ? title.replace(
        highlight,
        `<span class="text-gradient">${highlight}</span>`
      )
    : title;

  return (
    <div className={cn('max-w-3xl', alignClass[align], className)}>
      {eyebrow && (
        <div className={cn('flex items-center gap-2 mb-4', align === 'center' ? 'justify-center' : '')}>
          <span className="w-6 h-px bg-blue-500" />
          <span className="text-blue-400 text-sm font-mono font-medium tracking-widest uppercase">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E8E8] leading-tight"
        dangerouslySetInnerHTML={{ __html: titleWithHighlight }}
      />
      {description && (
        <p className="mt-5 text-[#94A3B8] text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
