import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Shield, DollarSign, Globe, Headphones } from 'lucide-react';

export const WhyKZoneSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('provenReliability'),
      gradient: 'bg-gradient-primary',
    },
    {
      icon: DollarSign,
      title: t('affordablePackages'),
      gradient: 'bg-gradient-to-r from-accent to-accent-light',
    },
    {
      icon: Globe,
      title: t('localExpertise'),
      description: t('localExpertiseDesc'),
      gradient: 'bg-gradient-secondary',
    },
    {
      icon: Headphones,
      title: t('afterSalesSupport'),
      gradient: 'bg-gradient-to-r from-primary-light to-primary',
    },
  ];

  return (
    <section id="why-kzone" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('whyChooseTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${feature.gradient} flex items-center justify-center shadow-soft group-hover:shadow-glow transition-spring`}>
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                {feature.title}
              </h3>
              
              {/* Description (if available) */}
              {feature.description && (
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Installations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">15+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-muted-foreground">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};