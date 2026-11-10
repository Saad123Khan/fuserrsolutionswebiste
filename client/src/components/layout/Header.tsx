import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Building2,
  Workflow,
  Briefcase,
  Newspaper,
  MessageSquare,
  Mail,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { services, serviceHref } from '@/data/services';
import { gmailAnchor } from '@/data/company';
import Button from '@/components/ui/Button';
import Magnetic from '@/components/motion/Magnetic';

type MenuKey = 'services' | 'company';

interface NavItem {
  label: string;
  href?: string;
  menu?: MenuKey;
  /** Paths that should mark this item as active. */
  match: string[];
}

const navItems: NavItem[] = [
  { label: 'Services', menu: 'services', match: ['/services'] },
  { label: 'Work', href: '/work', match: ['/work'] },
  { label: 'Industries', href: '/industries', match: ['/industries'] },
  { label: 'Company', menu: 'company', match: ['/about', '/process', '/careers', '/blog'] },
];

const companyLinks: { label: string; href: string; desc: string; icon: LucideIcon }[] = [
  { label: 'About Us', href: '/about', desc: 'Who we are and what drives us', icon: Building2 },
  { label: 'Our Process', href: '/process', desc: 'How we take ideas to launch', icon: Workflow },
  { label: 'Careers', href: '/careers', desc: 'Join the team and build with us', icon: Briefcase },
  { label: 'Blog', href: '/blog', desc: 'Insights on product, code and AI', icon: Newspaper },
  { label: 'Contact', href: '/contact', desc: 'Talk to our team', icon: MessageSquare },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, match: string[]) {
  return match.some((m) => pathname === m || pathname.startsWith(m + '/'));
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const closeTimer = useRef<number>();
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  // Compact header after scrolling a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname, hash]);

  // Escape closes menus
  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openMenu, mobileOpen]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [mobileOpen, lenis]);

  const openNow = (key: MenuKey | null) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const solid = scrolled || openMenu !== null || mobileOpen;

  return (
    <>
      <header
        onMouseLeave={() => {
          closeSoon();
          setHovered(null);
        }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          solid
            ? 'bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border-slate-200/80 dark:border-navy-500/40 shadow-[0_1px_20px_rgba(15,23,42,0.06)]'
            : 'bg-transparent border-transparent'
        )}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-[padding] duration-300',
            scrolled ? 'py-2' : 'py-4'
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 select-none" aria-label="Fuserr Solutions home">
            <img
              src="/favicon.png"
              alt=""
              className={cn('object-contain transition-all duration-300', scrolled ? 'w-11 h-11' : 'w-14 h-14')}
            />
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-[#E8E8E8]">
              fuserr<span className="text-blue-600 dark:text-blue-400">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navItems.map((item, i) => {
              const active = isActive(pathname, item.match);
              const expanded = item.menu ? openMenu === item.menu : undefined;
              const itemClass = cn(
                'relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                active || expanded
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E8E8E8]'
              );
              const pill = hovered === i && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-slate-100 dark:bg-navy-800"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              );

              return (
                <div
                  key={item.label}
                  className="relative isolate"
                  onMouseEnter={() => {
                    setHovered(i);
                    openNow(item.menu ?? null);
                  }}
                >
                  {item.menu ? (
                    <button
                      type="button"
                      className={itemClass}
                      aria-expanded={expanded}
                      aria-haspopup="true"
                      onClick={() => openNow(expanded ? null : item.menu!)}
                    >
                      {pill}
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn('transition-transform duration-300', expanded && 'rotate-180')}
                      />
                    </button>
                  ) : (
                    <Link to={item.href!} className={itemClass}>
                      {pill}
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Magnetic strength={0.25}>
              <Button href="/contact" variant="primary" size="sm" className="group rounded-lg px-5 py-2.5 font-montserrat font-medium">
                Get a Quote
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </Magnetic>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="lg:hidden relative p-2 rounded-lg text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E8E8E8] hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="block"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Desktop dropdown panels */}
        <div className="hidden lg:block absolute inset-x-0 top-full">
          <AnimatePresence mode="wait">
            {openMenu && (
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: EASE }}
                onMouseEnter={() => openNow(openMenu)}
                className="mx-auto mt-2 w-fit origin-top"
              >
                {openMenu === 'services' ? <ServicesPanel /> : <CompanyPanel />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile full-screen menu (outside <header> so backdrop-filter doesn't trap position:fixed) */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu pathname={pathname} />}
      </AnimatePresence>
    </>
  );
}

/* ─── Desktop panels ─────────────────────────────────── */

const panelShell =
  'rounded-2xl border border-slate-200 dark:border-navy-500/50 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]';

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
};
const listItem = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
};

function ServicesPanel() {
  return (
    <div className={cn(panelShell, 'flex w-[820px] overflow-hidden')}>
      <motion.ul variants={listStagger} initial="hidden" animate="show" className="grid flex-1 grid-cols-2 gap-1 p-3">
        {services.map(({ id, title, short, icon: Icon, accent }) => (
          <motion.li key={id} variants={listItem}>
            <Link
              to={serviceHref(id)}
              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-navy-800/70"
            >
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${accent}14`, border: `1px solid ${accent}30` }}
              >
                <Icon size={17} style={{ color: accent }} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-[#E8E8E8] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {title}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-slate-500 dark:text-[#94A3B8]">{short}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Side card */}
      <div className="relative w-64 shrink-0 overflow-hidden border-l border-slate-100 dark:border-navy-500/40 bg-slate-50 dark:bg-navy-800/50 p-6 flex flex-col">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />
        <span className="relative text-[11px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
          Not sure where to start?
        </span>
        <p className="relative mt-3 text-sm font-semibold leading-snug text-slate-900 dark:text-[#E8E8E8]">
          Book a free consultation and we&apos;ll map out the right solution for your idea.
        </p>
        <Link
          to="/contact"
          className="group relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400"
        >
          Talk to an expert
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/services"
          className="group relative mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-medium text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          View all services
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

function CompanyPanel() {
  return (
    <div className={cn(panelShell, 'w-[560px] p-3')}>
      <motion.ul variants={listStagger} initial="hidden" animate="show" className="grid grid-cols-2 gap-1">
        {companyLinks.map(({ label, href, desc, icon: Icon }) => (
          <motion.li key={href} variants={listItem}>
            <Link
              to={href}
              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-navy-800/70"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-600/20 transition-transform duration-300 group-hover:scale-110">
                <Icon size={16} className="text-blue-600 dark:text-blue-400" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-[#E8E8E8] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-[#94A3B8]">{desc}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ─── Mobile menu ────────────────────────────────────── */

function MobileMenu({ pathname }: { pathname: string }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const bigLink = (active: boolean) =>
    cn(
      'flex w-full items-center justify-between py-4 text-2xl font-bold tracking-tight transition-colors',
      active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-[#E8E8E8]'
    );

  const rows: { key: string; node: JSX.Element }[] = [
    {
      key: 'services',
      node: (
        <div>
          <button
            type="button"
            className={bigLink(isActive(pathname, ['/services']))}
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((v) => !v)}
          >
            Services
            <ChevronDown size={22} className={cn('transition-transform duration-300', servicesOpen && 'rotate-180')} />
          </button>
          <AnimatePresence initial={false}>
            {servicesOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                {services.map(({ id, title, icon: Icon, accent }) => (
                  <li key={id}>
                    <Link
                      to={serviceHref(id)}
                      className="flex items-center gap-3 py-2.5 pl-1 text-base text-slate-600 dark:text-[#94A3B8]"
                    >
                      <Icon size={17} style={{ color: accent }} />
                      {title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/services" className="flex items-center gap-1.5 py-2.5 pl-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    All services <ArrowRight size={14} />
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ),
    },
    { key: 'work', node: <Link to="/work" className={bigLink(isActive(pathname, ['/work']))}>Work</Link> },
    { key: 'industries', node: <Link to="/industries" className={bigLink(isActive(pathname, ['/industries']))}>Industries</Link> },
    { key: 'about', node: <Link to="/about" className={bigLink(isActive(pathname, ['/about']))}>About Us</Link> },
    { key: 'process', node: <Link to="/process" className={bigLink(isActive(pathname, ['/process']))}>Our Process</Link> },
    { key: 'careers', node: <Link to="/careers" className={bigLink(isActive(pathname, ['/careers']))}>Careers</Link> },
    { key: 'blog', node: <Link to="/blog" className={bigLink(isActive(pathname, ['/blog']))}>Blog</Link> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25, ease: EASE }}
      className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-navy-950"
    >
      <div className="pointer-events-none absolute -top-24 right-[-20%] h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />

      <div data-lenis-prevent className="relative flex h-full flex-col overflow-y-auto px-6 pt-28 pb-8">
        <motion.nav
          aria-label="Mobile"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
          className="divide-y divide-slate-200 dark:divide-navy-500/40"
        >
          {rows.map((r) => (
            <motion.div
              key={r.key}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              }}
            >
              {r.node}
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
          className="mt-auto pt-10 space-y-5"
        >
          <Button href="/contact" variant="primary" size="lg" className="w-full justify-center font-montserrat">
            Get a Quote <ArrowUpRight size={16} />
          </Button>
          <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-[#94A3B8]">
            <a {...gmailAnchor({ subject: 'Project inquiry' })} className="inline-flex items-center gap-2">
              <Mail size={14} className="text-blue-500" /> contact@fuserrsolutions.com
            </a>
            <a href="tel:+923337804685" className="inline-flex items-center gap-2">
              <Phone size={14} className="text-blue-500" /> +92 333 7804685
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
