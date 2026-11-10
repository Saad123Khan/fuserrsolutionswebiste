import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import PostCard from '@/components/blog/PostCard';
import { sortedPosts } from '@/data/posts';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogPreview() {
  const latest = sortedPosts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="From the blog"
            title={['Insights from', { text: 'our team', className: 'text-gradient' }]}
            description="Practical notes on product strategy, engineering, AI and design."
          />
          <Link
            to="/blog"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            All articles
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <PostCard post={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
