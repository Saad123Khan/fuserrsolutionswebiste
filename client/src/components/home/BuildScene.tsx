import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Loader2, Lock, RotateCw, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────
 * "Live build" hero scene, played like a looping video:
 * code types itself in an editor, the app assembles in a live
 * preview as each component line completes, then a terminal
 * builds, tests and deploys it. Pauses off-screen; reduced-motion
 * users see the finished state.
 * ───────────────────────────────────────────────────────── */

type Tok = [text: string, cls?: string];

const K = 'text-violet-400'; // keyword
const C = 'text-cyan-300'; // component
const S = 'text-emerald-300'; // string
const P = 'text-sky-300'; // prop
const F = 'text-amber-300'; // function
const D = 'text-slate-500'; // punctuation / comment

/** Each line of code; `stage` marks the preview stage unlocked when the line finishes. */
const CODE: { toks: Tok[]; stage?: number; indent?: number }[] = [
  { toks: [['import', K], [' { '], ['Navbar', C], [', '], ['Hero', C], [', '], ['Stats', C], [', '], ['Chart', C], [' } '], ['from', K], [" '@/ui'", S], [';', D]] },
  { toks: [['import', K], [' { '], ['api', P], [' } '], ['from', K], [" './api'", S], [';', D]] },
  { toks: [] },
  { toks: [['export default function', K], [' '], ['Dashboard', F], ['() {', D]] },
  { indent: 1, toks: [['const', K], [' data = '], ['useQuery', F], ['(api.', D], ['metrics', P], [');', D]] },
  { toks: [] },
  { indent: 1, toks: [['return', K], [' (', D]] },
  { indent: 2, toks: [['<', D], ['App', C], [' theme', P], ['=', D], ['"fuserr"', S], ['>', D]], stage: 1 },
  { indent: 3, toks: [['<', D], ['Navbar', C], [' logo', P], ['=', D], ['"acme"', S], [' />', D]], stage: 2 },
  { indent: 3, toks: [['<', D], ['Hero', C], [' title', P], ['=', D], ['"Grow faster"', S], [' />', D]], stage: 3 },
  { indent: 3, toks: [['<', D], ['Stats', C], [' items', P], ['={', D], ['data.kpis', P], ['} />', D]], stage: 4 },
  { indent: 3, toks: [['<', D], ['Chart', C], [' data', P], ['={', D], ['data.revenue', P], ['} />', D]], stage: 5 },
  { indent: 3, toks: [['<', D], ['Button', C], ['>', D], ['Get started', ''], ['</', D], ['Button', C], ['>', D]], stage: 6 },
  { indent: 2, toks: [['</', D], ['App', C], ['>', D]] },
  { indent: 1, toks: [[');', D]] },
  { toks: [['}', D]] },
];

const LOGS: { text: string; at: number; ok?: boolean; accent?: boolean }[] = [
  { text: '$ npm run build', at: 0 },
  { text: 'Compiled 128 modules in 2.4s', at: 700, ok: true },
  { text: 'All 42 tests passed', at: 1400, ok: true },
  { text: 'Deploying to production…', at: 2100 },
  { text: 'Live at https://app.acme.com', at: 3100, ok: true, accent: true },
];

// Timing (ms)
const CHAR_MS = 26;
const LINE_PAUSE = 160;
const STAGE_PAUSE = 420;
const TERMINAL_DELAY = 500;
const HOLD_AFTER_LIVE = 3800;

const lineText = (toks: Tok[]) => toks.map((t) => t[0]).join('');

export default function BuildScene({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  // Per-character timeline
  const timeline = useMemo(() => {
    const charEnds: number[] = []; // time each line finishes typing
    let t = 300;
    for (const line of CODE) {
      t += lineText(line.toks).length * CHAR_MS;
      charEnds.push(t);
      t += line.stage ? STAGE_PAUSE : LINE_PAUSE;
    }
    const codeDone = t;
    const termStart = codeDone + TERMINAL_DELAY;
    const live = termStart + LOGS[LOGS.length - 1].at;
    return { charEnds, codeDone, termStart, live, total: live + HOLD_AFTER_LIVE };
  }, []);

  const [elapsed, setElapsed] = useState(reduce ? Number.MAX_SAFE_INTEGER : 0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (reduce) {
      setElapsed(timeline.total - 1);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      if (visible && !document.hidden) {
        acc += dt;
        if (acc >= timeline.total) {
          acc = 0;
          setLoop((l) => l + 1);
        }
        setElapsed(acc);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    if (rootRef.current) io.observe(rootRef.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce, timeline]);

  // Derive what is visible at `elapsed`
  let typedLines = 0;
  let partial = 0; // chars typed on the current line
  {
    let start = 300;
    for (let i = 0; i < CODE.length; i++) {
      const len = lineText(CODE[i].toks).length;
      const end = timeline.charEnds[i];
      if (elapsed >= end) {
        typedLines = i + 1;
        start = end + (CODE[i].stage ? STAGE_PAUSE : LINE_PAUSE);
        continue;
      }
      partial = elapsed > start ? Math.min(len, Math.floor((elapsed - start) / CHAR_MS)) : 0;
      break;
    }
  }
  const codeDone = typedLines >= CODE.length;
  const stage = CODE.slice(0, typedLines).reduce((s, l) => Math.max(s, l.stage ?? 0), 0);
  const termElapsed = elapsed - timeline.termStart;
  const visibleLogs = termElapsed >= 0 ? LOGS.filter((l) => termElapsed >= l.at) : [];
  const isLive = elapsed >= timeline.live;
  const deploying = termElapsed >= 2100 && !isLive;

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/90 shadow-[0_40px_120px_-30px_rgba(37,99,235,0.55)] backdrop-blur-xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-3 flex gap-1 text-[11px] font-mono">
            <span className="rounded-md bg-white/10 px-2.5 py-1 text-slate-200">Dashboard.tsx</span>
            <span className="hidden rounded-md px-2.5 py-1 text-slate-500 sm:inline">api.ts</span>
          </div>
          <span className="ml-auto hidden items-center gap-1.5 text-[11px] font-mono text-slate-500 sm:flex">
            <span className={cn('h-1.5 w-1.5 rounded-full', isLive ? 'bg-emerald-400' : 'animate-pulse bg-amber-400')} />
            {isLive ? 'deployed' : codeDone ? 'building' : 'editing'}
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* Editor */}
          <div className="relative min-h-[300px] border-white/10 py-4 font-mono text-[11.5px] leading-[1.75] sm:text-[12.5px] lg:border-r">
            {CODE.map((line, i) => {
              const shown = i < typedLines ? Infinity : i === typedLines ? partial : -1;
              if (shown < 0) return <div key={i} className="h-[1.75em]" />;
              let remaining = shown;
              const isCurrent = i === typedLines && !codeDone;
              return (
                <div key={i} className={cn('flex pr-4', isCurrent && 'bg-white/[0.04]')}>
                  <span className="w-10 shrink-0 select-none pr-3 text-right text-slate-600">{i + 1}</span>
                  <span className="whitespace-pre" style={{ paddingLeft: `${(line.indent ?? 0) * 1.25}em` }}>
                    {line.toks.map(([text, cls], ti) => {
                      if (remaining <= 0) return null;
                      const part = text.slice(0, remaining);
                      remaining -= text.length;
                      return (
                        <span key={ti} className={cls || 'text-slate-200'}>
                          {part}
                        </span>
                      );
                    })}
                    {isCurrent && <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-cyan-300" />}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live preview */}
          <div className="relative border-t border-white/10 p-4 lg:border-t-0">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
                <RotateCw size={11} className={cn('text-slate-400', deploying && 'animate-spin')} />
                <div className="flex flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[10px] text-slate-500 ring-1 ring-slate-200">
                  {isLive && <Lock size={9} className="text-emerald-500" />}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isLive ? 'live' : 'local'}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className={cn(isLive && 'font-medium text-slate-800')}
                    >
                      {isLive ? 'app.acme.com' : 'localhost:3000'}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <Preview key={loop} stage={stage} live={isLive} />
            </div>

            {/* Live badge */}
            <AnimatePresence>
              {isLive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="absolute -right-2 -top-2 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/40 sm:-right-4"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  Live
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Terminal */}
        <div className="border-t border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] sm:text-xs">
          <div className="mb-1.5 flex items-center gap-1.5 text-slate-500">
            <Terminal size={12} /> terminal
          </div>
          <div className="h-[92px] space-y-1 overflow-hidden">
            {!visibleLogs.length && <div className="text-slate-600">waiting for changes…</div>}
            <AnimatePresence initial={false}>
              {visibleLogs.map((l) => (
                <motion.div
                  key={`${loop}-${l.text}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn('flex items-center gap-2', l.accent ? 'text-emerald-300' : l.ok ? 'text-slate-300' : 'text-slate-400')}
                >
                  {l.ok ? (
                    <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
                  ) : l.text.startsWith('Deploying') ? (
                    isLive ? <CheckCircle2 size={12} className="shrink-0 text-emerald-400" /> : <Loader2 size={12} className="shrink-0 animate-spin text-cyan-300" />
                  ) : (
                    <span className="text-cyan-300">›</span>
                  )}
                  {l.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* The app being "built" — each stage reveals another part of the UI. */
function Preview({ stage, live }: { stage: number; live: boolean }) {
  const pop = {
    initial: { opacity: 0, y: 12, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  };
  const bars = [35, 52, 44, 68, 58, 80, 72, 94];

  return (
    <div className="relative h-[250px] overflow-hidden bg-gradient-to-b from-white to-slate-50 p-4 sm:h-[280px]">
      {stage < 1 && (
        <div className="flex h-full items-center justify-center text-[11px] text-slate-400">Waiting for first render…</div>
      )}

      {stage >= 2 && (
        <motion.div {...pop} className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-black text-slate-900">
            <span className="h-4 w-4 rounded bg-gradient-to-br from-blue-500 to-indigo-600" /> acme
          </span>
          <span className="flex gap-3 text-[10px] text-slate-500">
            <span>Product</span>
            <span>Pricing</span>
            <span className="hidden sm:inline">Docs</span>
          </span>
        </motion.div>
      )}

      {stage >= 3 && (
        <motion.div {...pop} className="mb-4">
          <div className="text-lg font-extrabold leading-tight text-slate-900 sm:text-xl">
            Grow <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">faster</span>
          </div>
          <div className="mt-1 h-1.5 w-40 rounded-full bg-slate-200" />
        </motion.div>
      )}

      {stage >= 4 && (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { k: 'Users', v: '12.4k', d: '+12%' },
            { k: 'Revenue', v: '$84k', d: '+24%' },
            { k: 'Uptime', v: '99.9%', d: 'stable' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.k}
              {...pop}
              transition={{ ...pop.transition, delay: i * 0.08 }}
              className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
            >
              <div className="text-[9px] text-slate-400">{kpi.k}</div>
              <div className="text-sm font-bold text-slate-900">{kpi.v}</div>
              <div className="text-[9px] text-emerald-500">{kpi.d}</div>
            </motion.div>
          ))}
        </div>
      )}

      {stage >= 5 && (
        <motion.div {...pop} className="flex h-16 items-end gap-1.5 rounded-lg border border-slate-200 bg-white p-2 sm:h-20">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400"
            />
          ))}
        </motion.div>
      )}

      {stage >= 6 && (
        <motion.div {...pop} className="absolute bottom-4 right-4">
          <span
            className={cn(
              'inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-shadow duration-500',
              live ? 'shadow-[0_0_24px_rgba(37,99,235,0.8)]' : 'shadow-md'
            )}
          >
            Get started
          </span>
        </motion.div>
      )}
    </div>
  );
}
