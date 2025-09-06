import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone } from 'lucide-react';
import heroImage from '@/assets/solar-farm-hero.jpg';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl">
          <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              {t('heroSubtext')}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 ${isRTL ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="text-lg px-8 py-4 h-auto"
              >
                {t('orderSolar')}
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => scrollToSection('#solutions')}
                className="text-lg px-8 py-4 h-auto"
              >
                {t('exploreSolutions')}
              </Button>
            </div>

            {/* Contact Info */}
            <div className={`flex flex-col sm:flex-row gap-6 ${isRTL ? 'md:justify-end' : 'md:justify-start'} justify-center text-white/80`}>
              <div className="flex items-center gap-2" dir="ltr">
                <Mail className="h-5 w-5" />
                <a 
                  href={`mailto:${t('email')}`}
                  className="hover:text-white transition-smooth"
                >
                  {t('email')}
                </a>
              </div>
              <div className="flex items-center gap-2" dir="ltr">
                <Phone className="h-5 w-5" />
                <a 
                  href={`tel:${t('phone1')}`}
                  className="hover:text-white transition-smooth"
                >
                  {t('phone1')}
                </a>
              </div>
              <div className="flex items-center gap-2" dir="ltr">
                <Phone className="h-5 w-5" />
                <a 
                  href={`tel:${t('phone2')}`}
                  className="hover:text-white transition-smooth"
                >
                  {t('phone2')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};