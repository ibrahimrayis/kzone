import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { key: 'home', href: '#home' },
    { key: 'solutions', href: '#solutions' },
    { key: 'whyKZone', href: '#why-kzone' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/aeaa84a7-a1ba-48e6-8647-9f97304fcf0b.png" 
              alt="K-ZONE Trading Services" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                {t(item.key as any)}
              </button>
            ))}
          </nav>

          {/* Desktop CTA & Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="cta" 
              onClick={() => scrollToSection('#contact')}
            >
              {t('orderNow')}
            </Button>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent rounded-md transition-smooth"
                >
                  {t(item.key as any)}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button 
                  variant="cta" 
                  className="w-full"
                  onClick={() => scrollToSection('#contact')}
                >
                  {t('orderNow')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};