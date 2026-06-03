import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const cols = [
  {
    heading: 'Services',
    links: [
      { label: 'Web Development', href: '/services#web' },
      { label: 'Backend & APIs', href: '/services#backend' },
      { label: 'Mobile Apps', href: '/services#mobile' },
      { label: 'SaaS Development', href: '/services#saas' },
      { label: 'Integrations', href: '/services#integrations' },
      { label: 'UI/UX Implementation', href: '/services#ui' },
    ],
  },
  {
    heading: 'Agency Partners',
    links: [
      { label: 'Why Us', href: '/about' },
      { label: 'How It Works', href: '/how-we-work' },
      { label: 'Case Studies', href: '/portfolio' },
      { label: 'Start a Project', href: '/contact' },
    ],
  },
];

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/fuserrsolutions', label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/fuserrsolutions',           label: 'GitHub' },
  { icon: Twitter,  href: 'https://twitter.com/fuserrsolutions',           label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 dark:border-navy-500/40 bg-slate-50 dark:bg-navy-950">

      {/* Large faded wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -right-4 text-[12rem] lg:text-[18rem] font-black tracking-tight leading-none select-none opacity-[0.03] dark:opacity-[0.04]"
        style={{ color: '#2563EB' }}
      >
        fuserr
      </div>

      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-slate-200 dark:border-navy-500/40">

          {/* Brand — col 1-4 */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md">
                <Image src="/logo.jpg" alt="Fuserr Solutions" fill className="object-cover" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  fuserr<span className="text-blue-600">.</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-[#64748B] tracking-[0.2em] uppercase">
                  solutions
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-500 dark:text-[#94A3B8] leading-relaxed mb-5 max-w-xs">
              Your invisible engineering partner — we build web, mobile &amp; SaaS under your brand, NDA-backed, on time, every time.
            </p>

            <div className="space-y-2.5 mb-8">
              {[
                { icon: Mail,   val: 'hello@fuserrsolutions.com', href: 'mailto:hello@fuserrsolutions.com' },
                { icon: Phone,  val: '+1 (555) 000-0000',         href: 'tel:+15550000000' },
                { icon: MapPin, val: 'San Francisco · Dubai',      href: null },
              ].map(({ icon: Icon, val, href }) => (
                <div key={val} className="flex items-center gap-2.5 text-sm">
                  <Icon size={13} className="text-blue-500 shrink-0" />
                  {href ? (
                    <a href={href} className="text-slate-500 dark:text-[#94A3B8] hover:text-blue-600 dark:hover:text-blue-400 transition-colors animated-underline">
                      {val}
                    </a>
                  ) : (
                    <span className="text-slate-500 dark:text-[#94A3B8]">{val}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 dark:text-[#64748B] hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — col 6-12 */}
          <div className="lg:col-span-4 lg:col-start-6 grid grid-cols-2 gap-8">
            {cols.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[11px] font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-[0.18em] mb-5">
                  {col.heading}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white transition-colors animated-underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA card — col 10-12 */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="text-[11px] font-mono font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-[0.18em] mb-5">
              Partner With Us
            </h3>

            <div className="glass rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-500 dark:text-emerald-400">
                  Accepting agency partners
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-[#64748B] mb-4">
                NDA signed before any discussion. Proposal within 24 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
              >
                Start a project
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-[#64748B]">
            © {new Date().getFullYear()} Fuserr Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs text-slate-400 dark:text-[#64748B] hover:text-slate-600 dark:hover:text-[#94A3B8] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
