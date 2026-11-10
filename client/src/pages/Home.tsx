// Previous dot-wave hero — kept for later. To switch back, uncomment this
// import and <Hero /> below, and comment out HeroBuild.
// import Hero from '@/components/home/Hero';
import HeroBuild from '@/components/home/HeroBuild';
import LogoStrip from '@/components/home/LogoStrip';
// Previous bento services section — kept for later. To switch back, uncomment
// this import and <ServicesBento /> below, and comment out ServicesCarousel.
// import ServicesBento from '@/components/home/ServicesBento';
import ServicesCarousel from '@/components/home/ServicesCarousel';
import Stats from '@/components/home/Stats';
import FeaturedWork from '@/components/home/FeaturedWork';
import ProcessSteps from '@/components/home/ProcessSteps';
// Previous Why Fuserr card grid — kept for later. To switch back, uncomment
// this import and <WhyUs /> below, and comment out WhyUsZigzag.
// import WhyUs from '@/components/home/WhyUs';
import WhyUsZigzag from '@/components/home/WhyUsZigzag';
// Previous tabbed tech grid — kept for later. To switch back, uncomment this
// import and <TechStack /> below, and comment out TechSphere.
// import TechStack from '@/components/home/TechStack';
import TechSphere from '@/components/home/TechSphere';
import IndustriesStrip from '@/components/home/IndustriesStrip';
import Testimonials from '@/components/home/Testimonials';
// Previous blog card grid — kept for later. To switch back, uncomment this
// import and <BlogPreview /> below, and comment out BlogHighlights.
// import BlogPreview from '@/components/home/BlogPreview';
import BlogHighlights from '@/components/home/BlogHighlights';
// FAQ hidden for now — uncomment this import and the <FAQ /> usage below to bring it back.
// import FAQ from '@/components/home/FAQ';
import CTABanner from '@/components/home/CTABanner';
import { useDocumentTitle } from '@/lib/useDocumentTitle';
import { SITE_NAME } from '@/lib/utils';

export default function HomePage() {
  useDocumentTitle(`${SITE_NAME} — Custom Software Development Company`);

  return (
    <>
      {/* <Hero /> */}
      <HeroBuild />
      <LogoStrip />
      {/* <ServicesBento /> */}
      <ServicesCarousel />
      <Stats />
      <FeaturedWork />
      <ProcessSteps />
      {/* <WhyUs /> */}
      <WhyUsZigzag />
      {/* <TechStack /> */}
      <TechSphere />
      <IndustriesStrip />
      <Testimonials />
      {/* <BlogPreview /> */}
      <BlogHighlights />
      {/* <FAQ /> */}
      <CTABanner />
    </>
  );
}
