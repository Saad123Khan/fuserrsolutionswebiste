import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { services, serviceHref } from '@/data/services';
import { gmailLink } from '@/data/company';
import Button from '@/components/ui/Button';
import Magnetic from '@/components/motion/Magnetic';
import AnimatedSection from '@/components/ui/AnimatedSection';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Process', href: '/process' },
  { label: 'Our Work', href: '/work' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
];

const resourceLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

const contact = [
  { icon: Mail, val: 'contact@fuserrsolutions.com', href: gmailLink({ subject: 'Project inquiry' }) },
  { icon: Phone, val: '+92 333 7804685', href: 'tel:+923337804685' },
  { icon: MapPin, val: 'Ground Floor 1-H-1/22, Nazimabad No. 1, Karachi, Pakistan', href: null },
];

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/fuserrsolutions', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Saad123Khan', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/fuserrsolutions', label: 'Twitter' },
];

const headingClass =
  'text-[11px] font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-[0.18em] mb-5';
const linkClass =
  'text-sm text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white transition-colors animated-underline';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-slate-200 dark:border-navy-500/40 bg-[var(--c-bg-alt)] dark:bg-navy-950">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[110px]" />

      {/* Big wordmark behind the footer content (subtle parallax) */}
      <motion.div
        aria-hidden
        style={{ y: wordmarkY, opacity: wordmarkOpacity }}
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[22vw] font-black leading-none tracking-tighter text-blue-600/[0.05] dark:text-blue-400/[0.05]"
      >
        fuserr
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA band */}
        <AnimatedSection className="flex flex-col items-start justify-between gap-8 border-b border-slate-200 dark:border-navy-500/40 py-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Let&apos;s build together
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-[#E8E8E8] sm:text-4xl lg:text-5xl">
              Have a project in mind?{' '}
              <span className="text-gradient">Let&apos;s talk.</span>
            </h2>
          </div>
          <Magnetic strength={0.2}>
            <Button href="/contact" variant="primary" size="lg" className="group font-montserrat">
              Start a Project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Magnetic>
        </AnimatedSection>

        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 border-b border-slate-200 dark:border-navy-500/40 py-14 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-3">
            <Link to="/" className="mb-6 flex w-fit items-center gap-3" aria-label="Fuserr Solutions home">
              <img src="/favicon.png" alt="" className="h-11 w-11 object-contain" />
              <div>
                <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  fuserr<span className="text-blue-600">.</span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-[#64748B]">
                  solutions
                </div>
              </div>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">
              We design and build web, mobile, SaaS and custom software that helps businesses grow, from first idea to launch and beyond.
            </p>

            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-600 dark:text-[#64748B] dark:hover:text-blue-400"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={serviceHref(s.id)} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + availability */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className={headingClass}>Get in touch</h3>
            <div className="mb-6 space-y-3">
              {contact.map(({ icon: Icon, val, href }) => (
                <div key={val} className="flex items-start gap-2.5 text-sm">
                  <Icon size={14} className="mt-0.5 shrink-0 text-blue-500" />
                  {href ? (
                    <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-slate-500 dark:text-[#94A3B8] hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {val}
                    </a>
                  ) : (
                    <span className="text-slate-500 dark:text-[#94A3B8]">{val}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Available for new projects</span>
              </div>
              <p className="mb-3 text-xs text-slate-500 dark:text-[#94A3B8]">
                Free consultation. Detailed proposal within 24 hours.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Book a free call
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 flex flex-col items-center justify-between gap-3 py-7 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-[#64748B]">
            © {new Date().getFullYear()} Fuserr Solutions. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400 dark:text-[#64748B]">
            <Link to="/privacy-policy" className="transition-colors hover:text-slate-700 dark:hover:text-white">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-slate-700 dark:hover:text-white">Terms</Link>
            <span>Designed &amp; built in Karachi, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
