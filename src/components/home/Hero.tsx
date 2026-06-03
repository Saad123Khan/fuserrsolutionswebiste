'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Eye, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

const stats = [
  { value: '60+', label: 'Agency Partners' },
  { value: '100%', label: 'White-Label' },
  { value: 'NDA', label: 'Every Project' },
  { value: '99.8%', label: 'On-Time Rate' },
];

const floatingBadges = [
  { icon: Shield, text: 'NDA-Backed',      delay: 0,   pos: 'top-[12%] right-[8%]'    },
  { icon: Eye,    text: 'Invisible to Clients', delay: 0.4, pos: 'top-[55%] right-[4%]' },
  { icon: Zap,    text: 'Scale on Demand', delay: 0.8, pos: 'bottom-[18%] right-[14%]' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--c-bg)]" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/6 dark:bg-blue-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-800/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/4 dark:bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Content ── */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-600/30 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-wider">
                Your White-Label Development Partner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-slate-900 dark:text-[#E8E8E8]">We Build.</span>
              <br />
              <span className="text-gradient">You Deliver.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 text-lg text-slate-500 dark:text-[#94A3B8] leading-relaxed max-w-lg"
            >
              Your invisible engineering partner for web, mobile &amp; SaaS.
              Expand your agency&apos;s capacity with dedicated developers —
              100% under your brand, NDA-secured, zero visibility to your clients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button href="/contact" variant="primary" size="lg" className="group">
                Start a Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Book a Free Call
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-slate-900 dark:text-[#E8E8E8]">{stat.value}</div>
                  <div className="text-xs text-slate-400 dark:text-[#64748B] mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual ── */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square max-w-[520px] ml-auto"
            >
              {/* Spinning rings */}
              <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-navy-500/40 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-blue-600/20 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-12 rounded-full border border-slate-200/60 dark:border-navy-500/30 animate-[spin_40s_linear_infinite]" />

              {/* Center card */}
              <div
                className="absolute inset-24 rounded-2xl glass border border-slate-200 dark:border-navy-500/60 flex flex-col items-center justify-center gap-4 overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(37,99,235,0.12)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
                <div className="relative text-center px-6">
                  <div className="text-2xl font-bold text-gradient mb-1">Invisible</div>
                  <div className="text-xs font-mono text-slate-400 dark:text-[#64748B] tracking-widest uppercase">
                    to your clients
                  </div>
                </div>
              </div>

              {/* Orbiting nodes — brand services */}
              {[
                { label: 'Web',    angle: 45,  color: '#3B82F6' },
                { label: 'Mobile', angle: 135, color: '#8B5CF6' },
                { label: 'SaaS',   angle: 225, color: '#06B6D4' },
                { label: 'API',    angle: 315, color: '#10B981' },
              ].map(({ label, angle, color }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 42;
                const x = 50 + r * Math.cos(rad);
                const y = 50 + r * Math.sin(rad);
                return (
                  <motion.div
                    key={label}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: angle / 360 }}
                    style={{ left: `${x}%`, top: `${y}%`, borderColor: `${color}40` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl glass border flex items-center justify-center"
                  >
                    <span className="text-xs font-mono font-semibold" style={{ color }}>
                      {label}
                    </span>
                  </motion.div>
                );
              })}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {[45, 135, 225, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const r = 42;
                  const x = 50 + r * Math.cos(rad);
                  const y = 50 + r * Math.sin(rad);
                  return (
                    <line
                      key={angle}
                      x1="50" y1="50"
                      x2={x} y2={y}
                      stroke="rgba(37,99,235,0.2)"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Floating badges */}
            {floatingBadges.map(({ icon: Icon, text, delay, pos }) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: delay + 0.6 }}
                className={`absolute ${pos} glass border border-slate-200 dark:border-navy-500/50 px-3 py-2 rounded-lg flex items-center gap-2 animate-float`}
                style={{ animationDelay: `${delay}s` }}
              >
                <Icon size={13} className="text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">{text}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono text-slate-400 dark:text-[#64748B] tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-blue-600/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
