import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────
 * Endless "someone is coding" background: one or more editor
 * columns that type real-looking code line by line, with the
 * oldest lines scrolling off the top. Purely decorative.
 * ───────────────────────────────────────────────────────── */

const SNIPPETS: Record<'frontend' | 'backend', string[]> = {
  frontend: [
    `import { useState, useEffect } from 'react';
import { Card, Chart, Button } from '@/components/ui';
import { api } from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/metrics').then((res) => {
      setStats(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner size="lg" />;

  return (
    <Layout title="Overview">
      <Card label="Active users" value={stats.users} />
      <Card label="Revenue" value={stats.revenue} />
      <Chart data={stats.timeline} type="area" />
      <Button onClick={exportReport}>Export</Button>
    </Layout>
  );
}`,
    `// hooks/useCart.ts
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product) =>
    setItems((prev) => [...prev, { ...product, qty: 1 }]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { items, add, total };
}`,
    `export const BookingForm = ({ provider }: Props) => {
  const { register, handleSubmit } = useForm<Booking>();

  const onSubmit = async (data: Booking) => {
    await api.post('/bookings', { ...data, providerId: provider.id });
    toast.success('Booking confirmed');
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};`,
  ],
  backend: [
    `import express from 'express';
import { db } from './db';
import { auth } from './middleware/auth';

const router = express.Router();

router.get('/orders', auth, async (req, res) => {
  const orders = await db.order.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(orders);
});

router.post('/payments', auth, async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
  });
  res.json({ clientSecret: intent.client_secret });
});

export default router;`,
    `# ai/recommend.py
from openai import OpenAI

client = OpenAI()

def recommend(query: str, catalog: list) -> list:
    context = search_catalog(query, catalog, top_k=5)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"{query}\\n{context}"},
        ],
    )
    return parse_products(response)`,
    `-- analytics.sql
SELECT date_trunc('day', created_at) AS day,
       COUNT(*) AS orders,
       SUM(total) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY day
ORDER BY day DESC
LIMIT 30;`,
  ],
};

const KEYWORDS =
  /^(import|from|export|default|function|const|let|var|return|async|await|if|else|for|of|in|new|class|def|try|catch|throw|interface|type|SELECT|FROM|WHERE|GROUP|BY|ORDER|LIMIT|AS|COUNT|SUM|DESC|true|false|null)$/;

const TOKEN_RE =
  /(\/\/.*$|#.*$|--.*$|'[^']*'?|"[^"]*"?|`[^`]*`?|\b[A-Za-z_][A-Za-z0-9_]*\b|\b\d+(?:\.\d+)?\b|\s+|.)/g;

function colorFor(tok: string, next: string): string {
  if (/^(\/\/|#|--)/.test(tok)) return 'text-slate-500';
  if (/^['"`]/.test(tok)) return 'text-emerald-300';
  if (KEYWORDS.test(tok)) return 'text-violet-400';
  if (/^\d/.test(tok)) return 'text-amber-300';
  if (/^[A-Z]/.test(tok)) return 'text-cyan-300';
  if (/^[A-Za-z_]/.test(tok) && next === '(') return 'text-amber-200';
  if (/^\s+$/.test(tok)) return '';
  if (/^[A-Za-z_]/.test(tok)) return 'text-slate-200';
  return 'text-slate-500';
}

function Highlighted({ text }: { text: string }) {
  const toks = text.match(TOKEN_RE) ?? [];
  return (
    <>
      {toks.map((t, i) => (
        <span key={i} className={colorFor(t, toks[i + 1] ?? '')}>
          {t}
        </span>
      ))}
    </>
  );
}

interface TyperProps {
  kind: keyof typeof SNIPPETS;
  /** ms per character */
  speed?: number;
  /** delay before the first keystroke */
  startDelay?: number;
  className?: string;
}

const MAX_LINES = 80;
/** Lines already "written" when the page opens, so the screen is never empty. */
const PREFILL = 10;

interface Buffer {
  lines: string[];
  /** Number of lines dropped off the top (keeps line numbers continuous). */
  base: number;
}

const trim = (b: Buffer): Buffer =>
  b.lines.length > MAX_LINES ? { lines: b.lines.slice(-MAX_LINES), base: b.base + (b.lines.length - MAX_LINES) } : b;

/** A single editor column that types its snippets forever, top-down, scrolling once full. */
function CodeTyper({ kind, speed = 14, startDelay = 0, className }: TyperProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [buf, setBuf] = useState<Buffer>(() => {
    const first = SNIPPETS[kind][0].split('\n');
    return { lines: reduce ? first : [...first.slice(0, PREFILL), ''], base: 0 };
  });

  // Keep the newest line in view: start at the top, scroll up once the column is full
  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;
    const overflow = Math.max(0, inner.scrollHeight - root.clientHeight);
    inner.style.transform = `translateY(${-overflow}px)`;
  }, [buf]);

  useEffect(() => {
    if (reduce) return;
    const snippets = SNIPPETS[kind];
    let snip = 0;
    let src = snippets[0].split('\n');
    let lineIdx = Math.min(PREFILL, src.length);
    let charIdx = 0;
    let timer = 0;
    let visible = true;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    if (rootRef.current) io.observe(rootRef.current);

    const step = () => {
      if (!visible || document.hidden) {
        timer = window.setTimeout(step, 250);
        return;
      }
      const target = src[lineIdx] ?? '';

      if (charIdx < target.length) {
        // Type 2–4 chars per keystroke, indentation appears instantly
        const indent = target.match(/^\s*/)?.[0].length ?? 0;
        charIdx = charIdx < indent ? indent : charIdx + 2 + Math.floor(Math.random() * 3);
        const shown = target.slice(0, charIdx);
        setBuf((prev) => {
          const lines = prev.lines.slice();
          lines[lines.length - 1] = shown;
          return { ...prev, lines };
        });
        timer = window.setTimeout(step, speed * (0.6 + Math.random() * 0.8));
        return;
      }

      // Line finished → newline
      lineIdx += 1;
      charIdx = 0;
      let pause = 30 + Math.random() * 60;
      let extra: string[] = [''];
      if (lineIdx >= src.length) {
        // File finished → a blank gap, then the next file
        snip = (snip + 1) % snippets.length;
        src = snippets[snip].split('\n');
        lineIdx = 0;
        pause = 350;
        extra = ['', '', ''];
      }
      setBuf((prev) => trim({ ...prev, lines: [...prev.lines, ...extra] }));
      timer = window.setTimeout(step, pause);
    };

    timer = window.setTimeout(step, startDelay);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [kind, speed, startDelay, reduce]);

  return (
    <div ref={rootRef} className={cn('relative h-full overflow-hidden font-mono text-[13px] leading-[1.9] sm:text-sm', className)}>
      <div ref={innerRef} className="transition-transform duration-200 ease-out will-change-transform">
        {buf.lines.map((l, i) => {
          const last = i === buf.lines.length - 1;
          return (
            <div key={buf.base + i} className="flex whitespace-pre">
              <span className="w-10 shrink-0 select-none pr-4 text-right text-slate-700">{buf.base + i + 1}</span>
              <span>
                <Highlighted text={l} />
                {last && !reduce && <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-cyan-300" />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Full-bleed coding background: two editor columns on large screens
 * (frontend + backend/AI), one on small screens. Blurred and dimmed so
 * foreground text stays readable.
 */
export default function CodeTypingBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute inset-0 grid gap-10 px-6 pb-16 pt-28 opacity-60 blur-[1.5px] lg:grid-cols-2 lg:px-12">
        <CodeTyper kind="frontend" speed={14} />
        <CodeTyper kind="backend" speed={16} startDelay={150} className="hidden lg:block" />
      </div>
    </div>
  );
}
