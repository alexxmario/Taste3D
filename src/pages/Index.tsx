import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Performance3DShowcase from '@/components/Performance3DShowcase';
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
      <ServicesSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-muted-foreground">
            © 2024 Meniu 3D Pro. Revoluționăm experiențele digitale ale restaurantelor.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
