'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const stats = [
  { value: '120+', label: 'Projects Shipped' },
  { value: '98%', label: 'Client Retention' },
  { value: '40+', label: 'Countries Served' },
  { value: '$50M+', label: 'Value Delivered' },
];

const floatingBadges = [
  { icon: Sparkles, text: 'AI-Powered', delay: 0, pos: 'top-[12%] right-[8%]' },
  { icon: Zap, text: 'Fast Delivery', delay: 0.4, pos: 'top-[55%] right-[4%]' },
  { icon: Globe, text: 'Global Reach', delay: 0.8, pos: 'bottom-[18%] right-[14%]' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-800/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — content */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-600/30 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-mono text-blue-400 tracking-wider">
                Premium Software Agency
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-[#E8E8E8]">We Build</span>
              <br />
              <span className="text-gradient">Software</span>
              <br />
              <span className="text-[#E8E8E8]">That Matters</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 text-lg text-[#94A3B8] leading-relaxed max-w-lg"
            >
              From AI systems that predict the future to mobile apps that delight millions —
              Fuserr Solutions engineers products that move markets.
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
              <Button href="/portfolio" variant="ghost" size="lg">
                View Our Work
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
                  <div className="text-2xl font-bold text-[#E8E8E8]">{stat.value}</div>
                  <div className="text-xs text-[#64748B] mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — visual */}
          <div className="relative hidden lg:block">
            {/* Central visual — abstract tech diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square max-w-[520px] ml-auto"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-navy-500/40 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-blue-600/20 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-12 rounded-full border border-navy-500/30 animate-[spin_40s_linear_infinite]" />

              {/* Center card */}
              <div className="absolute inset-24 rounded-2xl glass border border-navy-500/60 flex flex-col items-center justify-center gap-4 shadow-blue-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
                <div className="relative text-center px-6">
                  <div className="text-4xl font-bold text-gradient mb-2">Fuserr</div>
                  <div className="text-xs font-mono text-[#64748B] tracking-widest uppercase">
                    Solutions
                  </div>
                </div>
              </div>

              {/* Orbiting nodes */}
              {[
                { label: 'AI/ML', angle: 45, color: '#3B82F6' },
                { label: 'Mobile', angle: 135, color: '#8B5CF6' },
                { label: 'Web', angle: 225, color: '#06B6D4' },
                { label: 'Design', angle: 315, color: '#10B981' },
              ].map(({ label, angle, color }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 42; // percentage from center
                const x = 50 + r * Math.cos(rad);
                const y = 50 + r * Math.sin(rad);
                return (
                  <motion.div
                    key={label}
                    animate={{ scale: [1, 1.05, 1] }}
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

              {/* Connection lines (SVG) */}
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
                className={`absolute ${pos} glass border border-navy-500/50 px-3 py-2 rounded-lg flex items-center gap-2 animate-float`}
                style={{ animationDelay: `${delay}s` }}
              >
                <Icon size={13} className="text-blue-400" />
                <span className="text-xs font-medium text-[#94A3B8]">{text}</span>
              </motion.div>
            ))}
          </div> 
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#64748B] tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-blue-600/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
