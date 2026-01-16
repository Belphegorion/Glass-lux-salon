import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import StylistsSection from './components/StylistsSection';
import TestimonialsSection from './components/TestimonialsSection';
import InstagramSection from './components/InstagramSection';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <HeroSection />
        <ServicesSection />
        <StylistsSection />
        <TestimonialsSection />
        <InstagramSection />
        <TrustSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
