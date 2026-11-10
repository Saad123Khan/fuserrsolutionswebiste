import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowLeft, Check, Lightbulb, Link2, Linkedin, Quote, Twitter } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import ReadingProgress from '@/components/motion/ReadingProgress';
import PostCard from '@/components/blog/PostCard';
import CTABanner from '@/components/home/CTABanner';
import { formatDate, getPost, readingTime, slugifyHeading, sortedPosts, type Post, type PostBlock } from '@/data/posts';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import { SITE_URL } from '@/lib/utils';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);

  useDocumentTitle(post?.title);
  useMetaDescription(post?.excerpt);

  if (!post) return <Navigate to="/blog" replace />;

  const related = [
    ...sortedPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...sortedPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <PageHero
        variant="code"
        align="left"
        top={
          <Link to="/blog" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            All articles
          </Link>
        }
        eyebrow={
          <span
            className="rounded-full border px-3 py-1 text-xs font-mono font-medium backdrop-blur-md"
            style={{ color: post.accent, borderColor: `${post.accent}55`, background: `${post.accent}18` }}
          >
            {post.category}
          </span>
        }
        title={post.title}
        titleClassName="max-w-4xl text-4xl sm:text-5xl lg:text-6xl"
        description={post.excerpt}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
            f.
          </span>
          <div className="text-sm">
            <div className="font-semibold text-white">{post.author}</div>
            <div className="text-slate-400">
              {formatDate(post.date)} · {readingTime(post)} min read
            </div>
          </div>
        </div>
      </PageHero>

      <Article post={post} />

      {related.length > 0 && (
        <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-2xl font-bold text-slate-900 dark:text-white">Keep reading</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                >
                  <PostCard post={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}

function Article({ post }: { post: Post }) {
  const headings = post.body.filter((b): b is Extract<PostBlock, { type: 'h2' }> => b.type === 'h2');
  const [active, setActive] = useState<string | null>(headings[0] ? slugifyHeading(headings[0].text) : null);
  const lenis = useLenis();

  // Highlight the heading currently being read
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(slugifyHeading(h.text))).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -110 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[var(--c-bg)] py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Sidebar: TOC + share */}
        <aside className="lg:col-span-3">
          <div className="space-y-8 lg:sticky lg:top-28">
            {headings.length > 0 && (
              <nav aria-label="Table of contents" className="hidden lg:block">
                <div className="mb-4 text-xs font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-[#64748B]">On this page</div>
                <ul className="relative space-y-1 border-l border-slate-200 dark:border-navy-500/40">
                  {headings.map((h) => {
                    const id = slugifyHeading(h.text);
                    const on = active === id;
                    return (
                      <li key={id} className="relative">
                        {on && (
                          <motion.span
                            layoutId="toc-indicator"
                            className="absolute -left-px top-0 h-full w-0.5 bg-blue-500"
                            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => jump(id)}
                          className={cn(
                            'block w-full py-1.5 pl-4 text-left text-sm transition-colors',
                            on ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:text-white'
                          )}
                        >
                          {h.text}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
            <ShareButtons post={post} />
          </div>
        </aside>

        {/* Body */}
        <article className="min-w-0 lg:col-span-8 lg:col-start-5">
          {post.body.map((b, i) => (
            <Block key={i} block={b} accent={post.accent} first={i === 0} />
          ))}

          {/* Author */}
          <div className="mt-16 flex items-start gap-5 rounded-3xl border border-slate-200 bg-white p-7 dark:border-navy-500/40 dark:bg-navy-800/40">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white">
              f.
            </span>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">{post.author}</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">
                Designers and engineers at Fuserr Solutions, sharing what we learn building web, mobile, SaaS and AI
                products for our clients.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Block({ block: b, accent, first }: { block: PostBlock; accent: string; first: boolean }) {
  const reveal = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, ease: EASE },
  };

  switch (b.type) {
    case 'h2':
      return (
        <motion.h2
          {...reveal}
          id={slugifyHeading(b.text)}
          className="mb-5 mt-14 scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
        >
          {b.text}
        </motion.h2>
      );
    case 'p':
      return (
        <motion.p
          {...reveal}
          className={cn(
            'mb-6 leading-[1.85] text-slate-600 dark:text-[#B4C0D3]',
            first ? 'text-xl text-slate-700 dark:text-[#E8E8E8]' : 'text-[17px]'
          )}
        >
          {b.text}
        </motion.p>
      );
    case 'list':
      return (
        <motion.ul {...reveal} className="mb-8 space-y-3">
          {b.items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[17px] leading-relaxed text-slate-600 dark:text-[#B4C0D3]">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
              {it}
            </li>
          ))}
        </motion.ul>
      );
    case 'quote':
      return (
        <motion.blockquote {...reveal} className="relative my-12 border-l-4 py-2 pl-8" style={{ borderColor: accent }}>
          <Quote size={28} className="mb-3 opacity-40" style={{ color: accent }} />
          <p className="text-2xl font-semibold leading-snug text-slate-900 dark:text-white">{b.text}</p>
        </motion.blockquote>
      );
    case 'callout':
      return (
        <motion.div
          {...reveal}
          className="my-8 flex items-start gap-4 rounded-2xl border p-6"
          style={{ borderColor: `${accent}40`, background: `${accent}12` }}
        >
          <Lightbulb size={20} className="mt-0.5 shrink-0" style={{ color: accent }} />
          <p className="font-medium leading-relaxed text-slate-800 dark:text-[#E8E8E8]">{b.text}</p>
        </motion.div>
      );
    default:
      return null;
  }
}

function ShareButtons({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const btn =
    'flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 dark:border-navy-500/50 dark:text-[#94A3B8] dark:hover:text-blue-400';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div>
      <div className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-[#64748B]">Share</div>
      <div className="flex gap-2">
        <button type="button" onClick={copy} className={btn} aria-label="Copy link">
          {copied ? <Check size={16} className="text-emerald-500" /> : <Link2 size={16} />}
        </button>
        <a
          className={btn}
          aria-label="Share on LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        >
          <Linkedin size={16} />
        </a>
        <a
          className={btn}
          aria-label="Share on X"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
        >
          <Twitter size={16} />
        </a>
      </div>
    </div>
  );
}
