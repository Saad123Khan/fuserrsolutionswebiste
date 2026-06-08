'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-[52px] h-7 rounded-full flex items-center px-0.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      style={{ background: dark ? 'rgba(37,99,235,0.25)' : 'rgba(203,213,225,0.7)' }}
    >
      <motion.div
        animate={{ x: dark ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className="w-[22px] h-[22px] rounded-full bg-white shadow-sm flex items-center justify-center"
      >
        {dark
          ? <Moon size={11} className="text-blue-600" />
          : <Sun  size={11} className="text-amber-500" />
        }
      </motion.div>
    </button>
  );
}
