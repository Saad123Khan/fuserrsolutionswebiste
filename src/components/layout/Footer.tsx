import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'AI Development', href: '/services#ai' },
    { label: 'Mobile Apps', href: '/services#mobile' },
    { label: 'Web Applications', href: '/services#web' },
    { label: 'Ecommerce', href: '/services#ecommerce' },
    { label: 'UI/UX Design', href: '/services#design' },
    { label: 'Maintenance', href: '/services#maintenance' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Industries', href: '/industries' },
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'Contact', href: '/contact' },
  ],
};

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/fuserrsolutions', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/fuserrsolutions', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/fuserrsolutions', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 border-t border-navy-500/50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-blue-glow opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-12 border-b border-navy-500/50">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image src="/logo.jpg" alt="Fuserr Solutions" fill className="object-cover" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#E8E8E8] tracking-tight">
                  fuserr<span className="text-blue-400">.</span>
                </div>
                <div className="text-xs text-[#64748B] font-mono tracking-widest uppercase">
                  solutions
                </div>
              </div>
            </Link>

            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs mb-8">
              We build software that matters — from AI systems to world-class digital products.
              Partnering with ambitious teams globally.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              {[
                { icon: Mail, label: 'hello@fuserrsolutions.com', href: 'mailto:hello@fuserrsolutions.com' },
                { icon: Phone, label: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                { icon: MapPin, label: 'San Francisco, CA · Dubai, UAE', href: null },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Icon size={14} className="text-blue-400 shrink-0" />
                  {href ? (
                    <a href={href} className="text-[#94A3B8] hover:text-[#E8E8E8] transition-colors animated-underline">
                      {label}
                    </a>
                  ) : (
                    <span className="text-[#94A3B8]">{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#64748B] hover:text-blue-400 hover:border-blue-600/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="lg:col-span-1">
              <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-5">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-[#E8E8E8] transition-colors animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA column */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-widest mb-5">
              Let&apos;s Build
            </h3>
            <p className="text-sm text-[#94A3B8] mb-5 leading-relaxed">
              Ready to transform your idea into a world-class product?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-blue-sm hover:shadow-blue-md"
            >
              Start a Project
              <ArrowUpRight size={14} />
            </Link>

            <div className="mt-8 p-4 rounded-xl glass border border-navy-500/40">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400">Available for work</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Currently taking new projects for Q2 2026
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} Fuserr Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors"
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
