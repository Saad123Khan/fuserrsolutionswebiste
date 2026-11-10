import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatDate, readingTime, type Post } from '@/data/posts';
import { cn } from '@/lib/utils';

/** Generated cover art: gradient, dot grid, big icon in the post accent. */
export function PostCover({ post, className, large = false }: { post: Post; className?: string; large?: boolean }) {
  const Icon = post.icon;
  return (
    <div
      className={cn('relative overflow-hidden bg-navy-900', className)}
      style={{
        backgroundImage: `radial-gradient(ellipse at 20% 0%, ${post.accent}55, transparent 60%), radial-gradient(ellipse at 100% 100%, #6366F155, transparent 55%), linear-gradient(135deg, #0B1530, #070D1B)`,
      }}
    >
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div
        className="absolute -right-10 -top-10 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: post.accent, opacity: 0.35, width: large ? 320 : 200, height: large ? 320 : 200 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            'flex items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-110',
            large ? 'h-28 w-28' : 'h-20 w-20'
          )}
          style={{ boxShadow: `0 20px 60px -10px ${post.accent}88` }}
        >
          <Icon size={large ? 48 : 34} className="text-white" />
        </span>
      </div>
      <span
        className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-mono font-medium text-white backdrop-blur-md"
      >
        {post.category}
      </span>
    </div>
  );
}

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-[#94A3B8]', className)}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-navy-500" />
      <span className="inline-flex items-center gap-1">
        <Clock size={12} /> {readingTime(post)} min read
      </span>
    </div>
  );
}

/** Standard blog card used in listings and previews. */
export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-navy-500/40 dark:bg-navy-800/40"
    >
      <PostCover post={post} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} className="mb-3" />
        <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
          Read article
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
