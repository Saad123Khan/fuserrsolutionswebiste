import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowDown, ArrowRight, Briefcase, CheckCircle2, Clock, MapPin, Plus, Send, Sparkles } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import SpotlightCard from '@/components/motion/SpotlightCard';
import Magnetic from '@/components/motion/Magnetic';
import SectionHeading from '@/components/ui/SectionHeading';
import { careersEmail, hiringSteps, openings, perks, type Opening } from '@/data/careers';
import { useDocumentTitle, useMetaDescription } from '@/lib/useDocumentTitle';
import { gmailLink } from '@/data/company';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-60px' } as const;

const applyHref = (role?: string) =>
  gmailLink({
    to: careersEmail,
    subject: role ? `Application: ${role}` : 'CV — General application',
    body: [
      'Hi Fuserr team,',
      '',
      role ? `I'd like to apply for the ${role} role.` : "I'd like to be considered for future roles at Fuserr Solutions.",
      '',
      'Name:',
      'Role / skills:',
      'Experience (years):',
      'LinkedIn / portfolio:',
      '',
      '(Please attach your CV to this email before sending.)',
    ].join('\n'),
  });
const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function CareersPage() {
  useDocumentTitle('Careers — Join Our Team');
  useMetaDescription('Join Fuserr Solutions in Karachi. Build real web, mobile, SaaS and AI products with a small, senior team.');
  const lenis = useLenis();

  const toRoles = () => {
    const el = document.getElementById('open-roles');
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -96 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageHero
        variant="orbits"
        align="left"
        eyebrow="Careers"
        title={['Build software that matters,', { text: 'grow with us.', className: 'text-gradient pb-2' }]}
        description="We're a team of designers and engineers in Karachi shipping real products for clients around the world. If you love building great software, we'd love to meet you."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              type="button"
              onClick={toRoles}
              className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 font-montserrat text-base font-semibold text-white shadow-[0_10px_40px_rgba(37,99,235,0.5)] sm:w-auto"
            >
              {openings.length > 0 ? `View ${openings.length} open ${openings.length === 1 ? 'role' : 'roles'}` : 'See how to join'}
              <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" />
            </button>
          </Magnetic>
          <a
            href={applyHref()} {...newTab}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-montserrat font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 sm:w-auto"
          >
            Send your CV
            <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </PageHero>

      {/* ── Perks ── */}
      <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Why Fuserr"
            title={['A place to do your', { text: 'best work', className: 'text-gradient' }]}
            description="What you can expect when you join the team."
            className="mb-16"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <SpotlightCard className="group h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-600/20 bg-blue-600/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={21} className="text-blue-600 dark:text-blue-400" />
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-[#E8E8E8]">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open roles ── */}
      <section id="open-roles" className="relative scroll-mt-24 bg-[var(--c-bg-alt)] py-24 dark:bg-navy-900 lg:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Open roles"
            title={openings.length > 0 ? ['Join', { text: 'the team', className: 'text-gradient' }] : ['No open roles', { text: 'right now', className: 'text-gradient' }]}
            description={
              openings.length > 0
                ? 'Click a role to see the details and apply.'
                : "We're not actively hiring for a specific position, but we're always happy to hear from talented people."
            }
            className="mb-12"
          />

          {openings.length > 0 ? (
            <ul className="space-y-4">
              {openings.map((o, i) => (
                <RoleItem key={o.slug} opening={o} index={i} />
              ))}
            </ul>
          ) : (
            <GeneralApplicationCard />
          )}
        </div>
      </section>

      {/* ── Hiring process ── */}
      <section className="relative bg-[var(--c-bg)] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Hiring process"
            title={['Simple, fast and', { text: 'respectful', className: 'text-gradient' }]}
            description="We value your time. Most candidates hear back within a few days at every step."
            className="mb-16"
          />
          <div className="relative">
            <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-slate-200 dark:bg-navy-500/40 lg:block" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inView}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
              className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 lg:block"
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {hiringSteps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.15, ease: EASE }}
                  className="group text-center"
                >
                  <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-white font-montserrat text-lg font-extrabold text-blue-600 shadow-[0_0_0_6px_rgba(59,130,246,0.12)] transition-transform duration-300 group-hover:scale-110 dark:bg-navy-950 dark:text-blue-400">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">{s.description}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── General application band ── */}
      {openings.length > 0 && (
        <section className="relative bg-[var(--c-bg-alt)] py-20 dark:bg-navy-900">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <GeneralApplicationCard />
          </div>
        </section>
      )}
    </>
  );
}

function RoleItem({ opening: o, index }: { opening: Opening; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `role-${o.slug}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }}
      className={cn(
        'overflow-hidden rounded-3xl border bg-white transition-colors dark:bg-navy-800/40',
        open ? 'border-blue-400 dark:border-blue-500/60' : 'border-slate-200 dark:border-navy-500/40'
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <span>
          <span className="block text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {o.title}
          </span>
          <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500 dark:text-[#94A3B8]">
            <span className="inline-flex items-center gap-1.5"><Briefcase size={14} /> {o.department} · {o.type}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {o.location}</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {o.experience}</span>
          </span>
        </span>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            open ? 'rotate-45 border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-500 dark:border-navy-500/60 dark:text-[#94A3B8]'
          )}
        >
          <Plus size={17} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 p-6 dark:border-navy-500/30 sm:p-7">
              <p className="mb-6 text-slate-600 dark:text-[#94A3B8]">{o.summary}</p>
              <div className="grid gap-8 md:grid-cols-2">
                <RoleList title="What you'll do" items={o.responsibilities} />
                <RoleList title="What we're looking for" items={o.requirements} />
              </div>
              {o.niceToHave && o.niceToHave.length > 0 && (
                <div className="mt-8">
                  <RoleList title="Nice to have" items={o.niceToHave} />
                </div>
              )}
              <a
                href={applyHref(o.title)} {...newTab}
                className="btn-gradient group mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              >
                Apply for this role
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function RoleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-[#64748B]">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-blue-500" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GeneralApplicationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-10 text-white sm:p-12"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <Sparkles size={22} className="mb-4 text-blue-200" />
          <h3 className="text-2xl font-bold leading-tight sm:text-3xl">Don&apos;t see the right role?</h3>
          <p className="mt-3 text-blue-100">
            Send us your CV and a few lines about what you love building. We keep every application on file and reach
            out when something fits.
          </p>
        </div>
        <Magnetic strength={0.2}>
          <a
            href={applyHref()} {...newTab}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 shadow-lg transition-colors hover:bg-blue-50"
          >
            Send your CV <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Magnetic>
      </div>
    </motion.div>
  );
}
