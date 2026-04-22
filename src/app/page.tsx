import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import AboutStrip from '@/components/home/AboutStrip';
import ServicesOverview from '@/components/home/ServicesOverview';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import ProcessPreview from '@/components/home/ProcessPreview';
import TechStack from '@/components/home/TechStack';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/utils';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Premium Software Development Agency`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutStrip />
      <ServicesOverview />
      <PortfolioPreview />
      <ProcessPreview />
      <TechStack />
      <Testimonials />
      <CTABanner />
    </>
  );
}
