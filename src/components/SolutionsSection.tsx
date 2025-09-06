import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { Sun, Droplets, Zap, Battery, Settings, Grid3X3, Leaf, Sprout, Factory, Mountain } from 'lucide-react';
import solarPanelsImg from '@/assets/solar-panels.jpg';
import pumpingSystemsImg from '@/assets/pumping-systems.jpg';
import invertersImg from '@/assets/inverters.jpg';
import batteriesImg from '@/assets/batteries.jpg';
import turnkeyInstallationImg from '@/assets/turnkey-installation.jpg';
import solarParksImg from '@/assets/solar-parks.jpg';
import renewablesImg from '@/assets/renewables.jpg';
import smartFarmingImg from '@/assets/smart-farming.jpg';
import industrySolutionsImg from '@/assets/industry-solutions.jpg';
import miningSolutionsImg from '@/assets/mining-solutions.jpg';

export const SolutionsSection: React.FC = () => {
  const { t } = useTranslation();

  const solutions = [
    {
      icon: Sun,
      title: t('solarPanels'),
      description: t('solarPanelsDesc'),
      image: solarPanelsImg,
      gradient: 'bg-gradient-primary',
    },
    {
      icon: Droplets,
      title: t('solarPumping'),
      description: t('solarPumpingDesc'),
      image: pumpingSystemsImg,
      gradient: 'bg-gradient-secondary',
    },
    {
      icon: Zap,
      title: t('inverters'),
      description: t('invertersDesc'),
      image: invertersImg,
      gradient: 'bg-gradient-to-r from-primary to-primary-light',
    },
    {
      icon: Battery,
      title: t('batteries'),
      description: t('batteriesDesc'),
      image: batteriesImg,
      gradient: 'bg-gradient-to-r from-accent to-accent-light',
    },
    {
      icon: Settings,
      title: t('turnkeyInstallation'),
      description: t('turnkeyInstallationDesc'),
      image: turnkeyInstallationImg,
      gradient: 'bg-gradient-to-r from-secondary to-secondary-light',
    },
    {
      icon: Grid3X3,
      title: t('solarParks'),
      description: t('solarParksDesc'),
      image: solarParksImg,
      gradient: 'bg-gradient-to-r from-primary to-primary-glow',
    },
    {
      icon: Leaf,
      title: t('renewables'),
      description: t('renewablesDesc'),
      image: renewablesImg,
      gradient: 'bg-gradient-to-r from-green-500 to-green-400',
    },
    {
      icon: Sprout,
      title: t('smartSolarFarming'),
      description: t('smartSolarFarmingDesc'),
      image: smartFarmingImg,
      gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    },
    {
      icon: Factory,
      title: t('industrySolutions'),
      description: t('industrySolutionsDesc'),
      image: industrySolutionsImg,
      gradient: 'bg-gradient-to-r from-slate-600 to-slate-500',
    },
    {
      icon: Mountain,
      title: t('miningSolutions'),
      description: t('miningSolutionsDesc'),
      image: miningSolutionsImg,
      gradient: 'bg-gradient-to-r from-amber-600 to-amber-500',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solutions" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('solutionsTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <Card key={index} className="group hover:shadow-strong transition-spring cursor-pointer overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={solution.image} 
                  alt={solution.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-spring"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-full ${solution.gradient} flex items-center justify-center shadow-soft`}>
                  <solution.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {solution.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {solution.description}
                </p>
                
                {/* CTA Button */}
                <Button 
                  variant="outline" 
                  onClick={scrollToContact}
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-spring"
                >
                  {t('learnMore')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={scrollToContact}
            className="px-12 py-4 h-auto text-lg"
          >
            {t('orderNow')}
          </Button>
        </div>
      </div>
    </section>
  );
};