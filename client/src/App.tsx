import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SmoothScroll from '@/components/motion/SmoothScroll';
import CursorFollower from '@/components/motion/CursorFollower';
// The homepage is the most common entry point, so it ships in the main bundle.
import HomePage from '@/pages/Home';

// Every other page is code-split and downloaded only when visited.
const AboutPage = lazy(() => import('@/pages/About'));
const ServicesPage = lazy(() => import('@/pages/Services'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetail'));
const ProcessPage = lazy(() => import('@/pages/Process'));
const IndustriesPage = lazy(() => import('@/pages/Industries'));
const WorkPage = lazy(() => import('@/pages/Work'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetail'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const CareersPage = lazy(() => import('@/pages/Careers'));
const BlogPage = lazy(() => import('@/pages/Blog'));
const BlogPostPage = lazy(() => import('@/pages/BlogPost'));
const PrivacyPage = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/** Shown for the split second while a page's code downloads. */
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712]" role="status" aria-label="Loading page">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <CursorFollower />
          <Header />
          <main className="flex-1">
            {/*
              Enter-only page transition. There is deliberately no exit animation /
              AnimatePresence "wait": if an exit never finished, the next page would
              never mount and the screen stayed blank until refresh.
            */}
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Suspense fallback={<PageLoader />}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/process" element={<ProcessPage />} />
                  <Route path="/industries" element={<IndustriesPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/work/:slug" element={<ProjectDetailPage />} />
                  {/* Legacy URLs */}
                  <Route path="/portfolio" element={<Navigate to="/work" replace />} />
                  <Route path="/how-we-work" element={<Navigate to="/process" replace />} />
                  <Route path="/portfolio/:slug" element={<LegacyProjectRedirect />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </motion.div>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}

function LegacyProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug ?? ''}`} replace />;
}
