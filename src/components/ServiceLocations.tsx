import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, ExternalLink } from 'lucide-react';

const ServiceLocations: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Service Areas</h2>
          <p className="text-lg text-muted-foreground">Visit us at our locations in Sudan</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Location Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                K-Zone Service Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Headquarters</h3>
                <p className="text-muted-foreground">Khartoum, Sudan</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Area</h3>
                <p className="text-muted-foreground">2, 1/6, West to Officers Club, Khartoum 2, Sudan</p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="font-medium">Contact</span>
                </div>
                <p className="text-muted-foreground">info@k-zone.live</p>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://maps.app.goo.gl/pLLtkNkqVGU2Vp7o9', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Google Maps
              </Button>
            </CardContent>
          </Card>

          {/* Embedded Map */}
          <Card>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.4982!2d32.5450!3d15.5150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDMwJzU0LjAiTiAzMsKwMzInNDIuMCJF!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="K-Zone Service Areas"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceLocations;