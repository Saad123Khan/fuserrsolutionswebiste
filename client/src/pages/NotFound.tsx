import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <section className="min-h-[80vh] flex items-center relative overflow-hidden bg-[var(--c-bg)] pt-32 pb-20">
      <div className="absolute inset-0 dot-grid opacity-35" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-6 h-px bg-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 text-sm font-mono tracking-widest uppercase">
              Error 404
            </span>
            <span className="w-6 h-px bg-blue-500" />
          </div>

          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black leading-none tracking-tight mb-6">
            <span className="text-gradient">404</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#E8E8E8] mb-4">
            This page took a wrong turn.
          </h2>
          <p className="text-lg text-slate-500 dark:text-[#94A3B8] max-w-lg mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" size="lg">
              Back to Home
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View Case Studies
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
