import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bell, CreditCard, Mail, Database, Cloud, Bot, Server, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-60px' } as const;

/* ─── Card visuals ───────────────────────────────────── */

function CodeVisual() {
  const lines = [
    { indent: 0, parts: [['w-10', 'bg-violet-400'], ['w-16', 'bg-blue-400'], ['w-24', 'bg-slate-300 dark:bg-navy-500']] },
    { indent: 1, parts: [['w-14', 'bg-amber-400'], ['w-28', 'bg-slate-300 dark:bg-navy-500']] },
    { indent: 2, parts: [['w-8', 'bg-violet-400'], ['w-20', 'bg-emerald-400'], ['w-12', 'bg-slate-300 dark:bg-navy-500']] },
    { indent: 2, parts: [['w-24', 'bg-blue-400'], ['w-16', 'bg-slate-300 dark:bg-navy-500']] },
    { indent: 1, parts: [['w-10', 'bg-slate-300 dark:bg-navy-500']] },
    { indent: 0, parts: [['w-6', 'bg-slate-300 dark:bg-navy-500']] },
  ];
  return (
    <div className="mx-auto w-[85%] max-w-md rounded-lg border border-slate-200 bg-white/90 p-4 shadow-lg dark:border-navy-500/50 dark:bg-navy-900/90">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="space-y-2">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.12, ease: EASE }}
            className="flex gap-1.5"
            style={{ paddingLeft: l.indent * 14 }}
          >
            {l.parts.map(([w, c], j) => (
              <span key={j} className={cn('h-2 rounded-full opacity-80', w, c)} />
            ))}
          </motion.div>
        ))}
      </div>
      <span className="mt-2 inline-block h-3 w-1.5 animate-pulse bg-blue-500" />
    </div>
  );
}

function PhoneVisual() {
  const notes = [
    { icon: Bell, title: 'New order received', sub: '#4821 · just now', color: '#8B5CF6' },
    { icon: CreditCard, title: 'Payment confirmed', sub: '$129.00 · Stripe', color: '#10B981' },
    { icon: Mail, title: 'Message from Sara', sub: 'Looks great! 🚀', color: '#3B82F6' },
  ];
  return (
    <div className="mx-auto w-40 rounded-[1.8rem] border-[6px] border-slate-800 bg-slate-50 p-2 shadow-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 dark:border-black dark:bg-navy-950">
      <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-800 dark:bg-black" />
      <div className="mb-3 px-1">
        <div className="text-[9px] text-slate-400">Good morning</div>
        <div className="text-xs font-bold text-slate-900 dark:text-white">Dashboard</div>
      </div>
      <div className="space-y-2">
        {notes.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={inView}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.25, ease: EASE }}
            className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm dark:bg-navy-800"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: `${n.color}20` }}>
              <n.icon size={11} style={{ color: n.color }} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-semibold text-slate-900 dark:text-white">{n.title}</span>
              <span className="block truncate text-[8px] text-slate-400">{n.sub}</span>
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 h-14 rounded-lg bg-gradient-to-br from-violet-500/80 to-blue-500/80" />
    </div>
  );
}

function ChartVisual() {
  const bars = [30, 45, 38, 60, 52, 75, 90];
  return (
    <div className="mx-auto flex h-28 w-[70%] items-end gap-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={inView}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: EASE }}
          className="flex-1 rounded-t-md bg-gradient-to-t from-amber-500/60 to-amber-300/90"
        />
      ))}
    </div>
  );
}

function ApiVisual() {
  const rows = [
    ['GET', '/api/orders', '200', '42ms'],
    ['POST', '/api/payments', '201', '87ms'],
    ['GET', '/api/users/me', '200', '18ms'],
  ];
  return (
    <div className="mx-auto w-[85%] space-y-2 font-mono text-[10px]">
      {rows.map(([m, path, code, ms], i) => (
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.2, ease: EASE }}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-2.5 py-1.5 dark:border-navy-500/50 dark:bg-navy-900/90"
        >
          <span className={cn('font-bold', m === 'GET' ? 'text-cyan-500' : 'text-violet-500')}>{m}</span>
          <span className="truncate text-slate-600 dark:text-[#94A3B8]">{path}</span>
          <span className="ml-auto text-emerald-500">{code}</span>
          <span className="text-slate-400">{ms}</span>
        </motion.div>
      ))}
    </div>
  );
}

function HubVisual() {
  const nodes = [
    { icon: CreditCard, pos: 'left-0 top-1/2 -translate-y-1/2' },
    { icon: Mail, pos: 'right-0 top-1/2 -translate-y-1/2' },
    { icon: Database, pos: 'left-1/2 top-0 -translate-x-1/2' },
    { icon: Cloud, pos: 'left-1/2 bottom-0 -translate-x-1/2' },
  ];
  return (
    <div className="relative mx-auto h-32 w-32">
      <div className="absolute inset-3 rounded-full border border-dashed border-emerald-500/40 animate-spin-slow" />
      <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-lg shadow-emerald-500/30 animate-pulse-ring">
        f.
      </div>
      {nodes.map(({ icon: Icon, pos }, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: EASE }}
          className={cn(
            'absolute flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm dark:border-navy-500/50 dark:bg-navy-800',
            pos
          )}
        >
          <Icon size={14} className="text-emerald-500" />
        </motion.span>
      ))}
    </div>
  );
}

function DesignVisual() {
  const swatches = ['#2563EB', '#60A5FA', '#8B5CF6', '#EC4899', '#F59E0B'];
  return (
    <div className="mx-auto flex w-[85%] max-w-md items-center justify-center gap-4">
      <div className="flex -space-x-2">
        {swatches.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: EASE }}
            className="h-9 w-9 rounded-full border-2 border-white shadow dark:border-navy-900"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="w-40 space-y-2 rounded-xl border border-slate-200 bg-white/90 p-3 shadow-lg transition-transform duration-500 group-hover:rotate-2 dark:border-navy-500/50 dark:bg-navy-900/90">
        <div className="h-2 w-16 rounded-full bg-slate-300 dark:bg-navy-500" />
        <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-navy-600" />
        <div className="flex gap-2 pt-1">
          <span className="h-5 flex-1 rounded-md bg-blue-600" />
          <span className="h-5 flex-1 rounded-md border border-slate-300 dark:border-navy-500" />
        </div>
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="mx-auto w-[85%] max-w-sm space-y-2.5 text-[11px]">
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
        className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-indigo-600 px-3 py-2 text-white shadow"
      >
        Find me running shoes under $100
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
        className="flex w-fit max-w-[85%] items-start gap-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-white/90 px-3 py-2 text-slate-700 shadow-sm dark:border-navy-500/50 dark:bg-navy-900/90 dark:text-[#E8E8E8]"
      >
        <Bot size={14} className="mt-0.5 shrink-0 text-indigo-500" />
        <span>Here are 3 great picks for daily runs 👟</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: 0.3, delay: 1.1 }}
        className="flex w-fit gap-1 rounded-full border border-slate-200 bg-white/90 px-3 py-2 dark:border-navy-500/50 dark:bg-navy-900/90"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-indigo-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function CloudVisual() {
  const servers = [
    { name: 'api-prod', region: 'us-east-1', load: 62 },
    { name: 'web-prod', region: 'eu-west-1', load: 41 },
    { name: 'worker', region: 'us-east-1', load: 78 },
  ];
  return (
    <div className="mx-auto w-[85%] max-w-md space-y-2 font-mono text-[10px]">
      {servers.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.15, ease: EASE }}
          className="flex items-center gap-2.5 rounded-md border border-slate-200 bg-white/90 px-2.5 py-2 dark:border-navy-500/50 dark:bg-navy-900/90"
        >
          <Server size={12} className="shrink-0 text-sky-500" />
          <span className="w-16 truncate text-slate-700 dark:text-[#E8E8E8]">{s.name}</span>
          <span className="hidden text-slate-400 sm:inline">{s.region}</span>
          <span className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-navy-700">
            <motion.span
              className="block h-full rounded-full bg-sky-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.load}%` }}
              viewport={inView}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: EASE }}
            />
          </span>
          <CheckCircle2 size={12} className="shrink-0 text-emerald-500" />
        </motion.div>
      ))}
    </div>
  );
}

/** Animated illustration for a service, keyed by service id. */
const visuals: Record<string, () => ReactNode> = {
  web: CodeVisual,
  mobile: PhoneVisual,
  saas: ChartVisual,
  backend: ApiVisual,
  ai: AIVisual,
  integrations: HubVisual,
  ui: DesignVisual,
  cloud: CloudVisual,
};

export default function ServiceVisual({ id }: { id: string }) {
  const V = visuals[id];
  return V ? <V /> : null;
}
