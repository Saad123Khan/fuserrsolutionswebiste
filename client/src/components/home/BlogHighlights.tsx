import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { formatDate, readingTime, sortedPosts, type Post } from '@/data/posts';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Homepage blog section, editorial style: one large featured article on the
 * left and a clean list of the next articles on the right.
 */
export default function BlogHighlights() {
  if (sortedPosts.length === 0) return null;
  const [featured, ...rest] = sortedPosts;
  const list = rest.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="From the blog"
            title={['Insights from', { text: 'our team', className: 'text-gradient' }]}
            description="Practical notes on product strategy, engineering, AI and design."
          />
          <Link
            to="/blog"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            All articles
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <FeaturedArticle post={featured} />

          <ol className="lg:col-span-5">
            {list.map((p, i) => (
              <ArticleRow key={p.slug} post={p} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
      <span className="font-medium text-slate-300">{post.category}</span>
      <span>·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>·</span>
      <span>{readingTime(post)} min read</span>
    </div>
  );
}

function FeaturedArticle({ post }: { post: Post }) {
  const Icon = post.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="lg:col-span-7"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#0A1224] p-8 transition-colors duration-500 hover:border-white/20 sm:p-10"
      >
        {/* Soft accent light + watermark icon */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at 85% 15%, ${post.accent}26, transparent 55%)`, opacity: 0.7 }}
        />
        <Icon
          aria-hidden
          strokeWidth={1}
          className="pointer-events-none absolute -right-6 -top-6 h-56 w-56 text-white/[0.04] transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-105"
        />

        <div className="relative">
          <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Featured</span>
          <h3 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {post.title}
            </span>
          </h3>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-400">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Meta post={post} />
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              Read article
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticleRow({ post, index }: { post: Post; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: EASE }}
      className="border-b border-white/10 first:border-t lg:first:border-t-0"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative flex items-start gap-5 py-7 pl-5 pr-2 transition-colors duration-300 hover:bg-white/[0.03]"
      >
        {/* Accent bar that grows on hover */}
        <span className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-blue-500 transition-all duration-300 group-hover:h-2/3" />

        <div className="min-w-0 flex-1">
          <Meta post={post} />
          <h3 className="mt-2.5 text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-blue-300">
            {post.title}
          </h3>
        </div>

        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
          <ArrowUpRight size={16} className="-rotate-45" />
        </span>
      </Link>
    </motion.li>
  );
}
