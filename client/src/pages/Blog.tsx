import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PostCard, { PostCover, PostMeta } from '@/components/blog/PostCard';
import CTABanner from '@/components/home/CTABanner';
import { sortedPosts, type PostCategory } from '@/data/posts';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const categories = Array.from(new Set(sortedPosts.map((p) => p.category)));

export default function BlogPage() {
  useDocumentTitle('Blog — Insights on Building Software');
  useMetaDescription('Practical articles from Fuserr Solutions on product strategy, engineering, AI and design.');

  const [category, setCategory] = useState<PostCategory | null>(null);
  const featured = sortedPosts.find((p) => p.featured) ?? sortedPosts[0];

  const list = useMemo(() => {
    if (category) return sortedPosts.filter((p) => p.category === category);
    return sortedPosts.filter((p) => p.slug !== featured?.slug);
  }, [category, featured]);

  return (
    <>
      <PageHero
        variant="code"
        eyebrow="Blog"
        title={['Insights on building', { text: 'great software', className: 'text-gradient pb-2' }]}
        description="Practical notes from our team on product strategy, engineering, AI and design."
      />

      <section className="relative bg-[var(--c-bg)] pb-24 pt-12 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <LayoutGroup id="blog-filter">
            <div className="no-scrollbar -mx-4 mb-12 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
              {[null, ...categories].map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c ?? 'all'}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(c)}
                    className={cn(
                      'relative shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'border-transparent text-white'
                        : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-slate-900 dark:border-navy-500/50 dark:text-[#94A3B8] dark:hover:text-white'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="blog-filter-pill"
                        className="absolute inset-0 rounded-full bg-blue-600 shadow-md shadow-blue-600/25"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c ?? 'All articles'}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Featured */}
          <AnimatePresence initial={false}>
            {!category && featured && (
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-10 overflow-hidden"
              >
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-navy-500/40 dark:bg-navy-800/40 lg:grid-cols-2"
                >
                  <PostCover post={featured} large className="min-h-[280px] lg:min-h-[400px]" />
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Featured
                    </span>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-500 dark:text-[#94A3B8]">{featured.excerpt}</p>
                    <PostMeta post={featured} className="mt-6" />
                    <span className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      Read article
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: EASE }}
                >
                  <PostCard post={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length === 0 && (
            <p className="py-16 text-center text-slate-500 dark:text-[#94A3B8]">No articles in this category yet.</p>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
