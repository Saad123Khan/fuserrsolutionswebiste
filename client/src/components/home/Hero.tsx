import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-white dark:bg-navy-950">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-blue-950/10 pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-purple-200/20 dark:bg-purple-900/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] rounded-full bg-blue-100/30 dark:bg-blue-950/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
        
        {/* Decorative elements */}
        {/* Purple dot */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-6 top-1/4 w-3.5 h-3.5 bg-purple-500 rounded-full opacity-70 hidden md:block"
        />

        {/* Cyan ring */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -left-1 top-1/2 w-4.5 h-4.5 border-2 border-cyan-400 rounded-full opacity-70 hidden md:block"
        />

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight max-w-4xl mx-auto"
        >
          Digital Product Agency<br/>
          <span>You Can Grow With</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          We design, build, and scale digital products by combining strong product strategy, thoughtful design, and solid engineering.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto rounded-xl px-8 py-4 font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all hover:scale-[1.03]"
          >
            Get started
          </Button>

          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View Our Work
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
