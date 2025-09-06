import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SudanHeatMap from '@/components/SudanHeatMap';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: t('email'),
      href: `mailto:${t('email')}`,
    },
    {
      icon: Phone,
      title: "Turkey",
      value: t('phone1'),
      href: `tel:${t('phone1')}`,
    },
    {
      icon: Phone,
      title: "Sudan",
      value: t('phone2'),
      href: `tel:${t('phone2')}`,
    },
    {
      icon: MapPin,
      title: "Regions",
      value: "Turkey • Sudan • China",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('contactTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-cols-[1fr,1.2fr]' : 'lg:grid-cols-[1.2fr,1fr]'}`}>
          {/* Contact Form */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <Card className="shadow-strong">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  {t('getInTouch')}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder={t('name')}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t('email')}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder={t('message')}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-12"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {t('sendMessage')}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="group hover:shadow-soft transition-spring">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:shadow-glow transition-spring">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        {info.href.startsWith('#') ? (
                          <p className="text-muted-foreground">{info.value}</p>
                        ) : (
                          <a
                            href={info.href}
                            className="text-primary hover:text-primary/80 transition-smooth"
                            dir="ltr"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sudan Heat Map */}
            <div className="mt-8">
              <SudanHeatMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};