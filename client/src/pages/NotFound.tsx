import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Magnetic from '@/components/motion/Magnetic';
import Button from '@/components/ui/Button';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <PageHero
      size="lg"
      variant="sparks"
      accent="#3B82F6"
      eyebrow="Error 404"
      title={['This page took a', { text: 'wrong turn.', className: 'text-gradient pb-2' }]}
      description="The page you're looking for doesn't exist or may have moved. Let's get you back on track."
    >
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Magnetic strength={0.25} className="w-full sm:w-auto">
          <Button href="/" variant="primary" size="lg" className="group w-full font-montserrat sm:w-auto">
            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Magnetic>
        <Link
          to="/work"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-montserrat font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 sm:w-auto"
        >
          View our work
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </PageHero>
  );
}
