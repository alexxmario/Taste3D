import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Performance3DShowcase from '@/components/Performance3DShowcase';
import ARSection from '@/components/ARSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import PerformanceMonitor from '@/components/PerformanceMonitor';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PerformanceMonitor />
      <Header />
      <HeroSection />
      <div id="showcase">
        <Performance3DShowcase />
      </div>
      <ARSection />
      <ServicesSection />
      <ContactSection />
      
    </div>
  );
};

export default Index;
