import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Telescope,
  Gem,
  Eye,
  HeartHandshake,
  Rocket,
  MapPin,
  Globe2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import ScrollRevealText from '@/components/motion/ScrollRevealText';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Stats from '@/components/home/Stats';
import WhyUs from '@/components/home/WhyUs';
import CTABanner from '@/components/home/CTABanner';
import { company } from '@/data/company';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import PageHero from '@/components/layout/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-60px' } as const;

const values: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Gem,
    title: 'Craft over shortcuts',
    description: 'Clean code, thoughtful design and proper testing. We build things that last after launch day.',
  },
  {
    icon: Eye,
    title: 'Radical transparency',
    description: 'Honest estimates, open progress and early warnings. No surprises, no hidden costs.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnership mindset',
    description: 'We care about your business outcomes, not just tickets closed. Your success is our success.',
  },
  {
    icon: Rocket,
    title: 'Ship, learn, improve',
    description: 'Get real products in front of real users fast, then keep making them better.',
  },
];

// TODO(content): confirm/adjust the company story wording.
const story =
  'Fuserr Solutions started with a simple belief: great software should be accessible to every business, not just the ones with big in-house teams. Today we are a team of designers and engineers in Karachi, building web, mobile, SaaS and AI products for startups and growing companies, and staying with them long after launch.';

export default function AboutPage() {
  useDocumentTitle('About Us');
  useMetaDescription('Meet Fuserr Solutions: a software development company in Karachi building web, mobile, SaaS and AI products for businesses worldwide.');

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        variant="globe"
        align="left"
        eyebrow="About us"
        title={['A team of builders who care about', { text: 'your success.', className: 'text-gradient pb-2' }]}
        description="We are Fuserr Solutions, a software development company that designs, builds and launches digital products for startups and growing businesses."
      >
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2">
            <MapPin size={15} className="text-cyan-300" /> Based in Karachi, Pakistan
          </span>
          <span className="inline-flex items-center gap-2">
            <Globe2 size={15} className="text-cyan-300" /> Working with clients worldwide
          </span>
        </div>
      </PageHero>

      <Stats />

      {/* ── Story ── */}
      <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-blue-500" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Our story</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <ScrollRevealText
              text={story}
              className="text-2xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl lg:leading-snug"
            />
          </div>
        </div>
      </section>

      {/* ── Mission & vision ── */}
      <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {[
            {
              icon: Target,
              label: 'Our mission',
              text: 'Help businesses turn ideas into reliable, beautiful software, delivered on time, on budget and with complete transparency.',
            },
            {
              icon: Telescope,
              label: 'Our vision',
              text: 'To be the technology partner companies trust most, known for products that perform and relationships that last.',
            },
          ].map(({ icon: Icon, label, text }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="gradient-border group relative overflow-hidden rounded-3xl bg-white p-9 dark:bg-navy-800/40 sm:p-12"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-blue-500/15" />
              <span className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-600/30 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon size={24} />
              </span>
              <h2 className="relative mb-4 text-xs font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{label}</h2>
              <p className="relative text-2xl font-semibold leading-snug text-slate-900 dark:text-white">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="relative bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Our values"
            title={['What we', { text: 'stand for', className: 'text-gradient' }]}
            description="The principles behind every line of code and every client conversation."
            className="mb-16"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              >
                <SpotlightCard className="group h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-600/20 bg-blue-600/10 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icon size={21} className="text-blue-600 dark:text-blue-400" />
                    </span>
                    <span className="font-montserrat text-4xl font-black text-slate-100 transition-colors duration-300 group-hover:text-blue-100 dark:text-navy-700 dark:group-hover:text-navy-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-[#E8E8E8]">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      {/* ── Location ── */}
      <section className="relative bg-[var(--c-bg-alt)] py-20 dark:bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative grid items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 dark:border-navy-500/40 dark:bg-navy-800/40 sm:p-12 md:grid-cols-[1fr_auto]"
          >
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="relative flex items-start gap-5">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10">
                <span className="absolute inset-0 animate-ping rounded-2xl bg-blue-500/20" />
                <MapPin size={24} className="relative text-blue-600 dark:text-blue-400" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Karachi-based, globally minded</h2>
                <p className="mt-2 max-w-2xl text-slate-500 dark:text-[#94A3B8]">
                  Our team works from {company.address}. We collaborate remotely with clients across time zones and
                  overlap with your working hours for calls and demos.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Get in touch <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
