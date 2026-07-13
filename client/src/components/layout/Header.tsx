import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-we-work' },
  { label: 'Case Studies', href: '/portfolio' },
  { label: 'Why Us', href: '/about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white dark:bg-navy-900 border-b transition-all duration-300',
        scrolled
          ? 'border-slate-200 dark:border-navy-500/50 shadow-sm'
          : 'border-slate-100 dark:border-navy-500/20'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5 group select-none">
          <div className="relative w-14 h-14">
            <img src="/favicon.png" alt="Fuserr Solutions" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <div className="leading-tight">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-[#E8E8E8]">
              fuserr<span className="text-blue-600 dark:text-blue-400">.</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors block',
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E8E8E8] hover:bg-slate-100 dark:hover:bg-navy-800'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button href="/contact" variant="primary" size="sm" className="rounded-lg px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-montserrat font-medium transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/25">
            Let's talk
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            className="p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E8E8E8] hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white dark:bg-navy-900 border-t border-slate-100 dark:border-navy-500/50 overflow-hidden"
          >
            <nav className="space-y-0.5 px-4 py-3 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    'block px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-600/10'
                      : 'text-slate-700 dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-navy-800'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-200 dark:border-navy-500/50">
                <Button href="/contact" variant="primary" size="md" className="w-full justify-center rounded-lg py-2 bg-blue-600 text-white font-montserrat font-medium text-sm">
                  Let's talk
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
