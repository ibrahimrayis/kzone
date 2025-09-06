import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import rooftopSolar from '@/assets/rooftop-solar.jpg';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-cols-[1fr,1.2fr]' : 'lg:grid-cols-[1.2fr,1fr]'}`}>
          {/* Text Content */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('aboutTitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-primary rounded-full mb-8"></div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('aboutDesc')}
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-muted-foreground">Solar Panels & Installation Services</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-muted-foreground">Smart Solar Pumping Systems</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-muted-foreground">Inverters, Batteries & Accessories</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-muted-foreground">Comprehensive After-Sales Support</p>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative">
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-strong">
                <iframe
                  src="https://www.youtube.com/embed/zwsAf0do-yo"
                  title="K-Zone Solar Solutions Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-strong">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">Years in Business</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};