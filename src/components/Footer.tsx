import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Mail, Phone, Linkedin } from 'lucide-react';
// Logo will use text fallback for now

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
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
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl font-bold">K-ZONE</div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
              {t('tagline')}
            </p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              K-ZONE is your trusted partner for renewable energy solutions. 
              We deliver high-quality solar panels, pumping systems, and comprehensive 
              installation services across Turkey, Sudan, and China.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {t(link.key as any)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${t('email')}`}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                dir="ltr"
              >
                <Mail className="h-4 w-4" />
                {t('email')}
              </a>
              <a
                href={`tel:${t('phone1')}`}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                dir="ltr"
              >
                <Phone className="h-4 w-4" />
                {t('phone1')}
              </a>
              <a
                href={`tel:${t('phone2')}`}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                dir="ltr"
              >
                <Phone className="h-4 w-4" />
                {t('phone2')}
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">{t('followUs')}</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-smooth"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${t('email')}`}
                  className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-smooth"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${t('phone1').replace(/[^\d]/g, '')}`}
                  className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-smooth"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/70 text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};