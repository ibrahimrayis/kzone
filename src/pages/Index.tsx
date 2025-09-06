import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SolutionsSection } from '@/components/SolutionsSection';
import { WhyKZoneSection } from '@/components/WhyKZoneSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import ServiceLocations from '@/components/ServiceLocations';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <WhyKZoneSection />
        <AboutSection />
        <ServiceLocations />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
