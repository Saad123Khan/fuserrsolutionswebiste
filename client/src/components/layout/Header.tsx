import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-navy-500/50 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm">
              <img src="/logo.jpg" alt="Fuserr Solutions" className="absolute inset-0 w-full h-full object-cover" />
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

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button href="/contact" variant="primary" size="sm">
              Start a Project
            </Button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E8E8E8] hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-navy-900/98 backdrop-blur-md border-t border-slate-200 dark:border-navy-500/50">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-600/10'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E8E8E8] hover:bg-slate-50 dark:hover:bg-navy-800'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-navy-500/50">
              <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                Start a Project
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
