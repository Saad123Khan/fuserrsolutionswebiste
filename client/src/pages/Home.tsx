import Hero from '@/components/home/Hero';
import AboutStrip from '@/components/home/AboutStrip';
import ServicesOverview from '@/components/home/ServicesOverview';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import ProcessPreview from '@/components/home/ProcessPreview';
import TechStack from '@/components/home/TechStack';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { SITE_NAME } from '@/lib/utils';

export default function HomePage() {
  useDocumentTitle(`${SITE_NAME} — White-Label Software Development Partner`);

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
