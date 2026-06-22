import { Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import ServicesPage from '@/pages/Services';
import HowWeWorkPage from '@/pages/HowWeWork';
import IndustriesPage from '@/pages/Industries';
import PortfolioPage from '@/pages/Portfolio';
import ProjectDetailPage from '@/pages/ProjectDetail';
import ContactPage from '@/pages/Contact';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 page-enter">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/how-we-work" element={<HowWeWorkPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
