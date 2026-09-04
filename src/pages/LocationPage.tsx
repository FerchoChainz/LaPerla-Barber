import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BookingModal } from '../components/common/BookingModal';
import { homeData } from '../data/mockData';

const LocationPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header 
        {...homeData.header} 
        onBookClick={() => setIsBookingOpen(true)} 
      />
      <main className="flex-grow pt-24 pb-16 px-gutter flex flex-col justify-center">
        <div className="max-w-7xl mx-auto space-y-12 text-center w-full">
          <div className="space-y-4">
            <h1 className="font-display-lg text-display-lg text-ink">Location</h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
              Find our sanctuary.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-surface p-8 sm:p-12 rounded-[2.5rem] whisper-border diffused-shadow flex flex-col md:flex-row gap-8 text-left items-center w-full">
            <div className="flex-1 space-y-6">
                <div>
                  <h3 className="font-headline-md text-ink mb-4">La Perla Studio</h3>
                  <p className="font-body-lg text-secondary leading-relaxed">
                    123 Aesthetic Avenue<br/>
                    Design District, NY 10001
                  </p>
                </div>
                <div>
                  <h4 className="font-mono-label text-steel uppercase tracking-widest mb-2 block">Hours</h4>
                  <p className="font-body-sm text-secondary leading-relaxed">
                    Tuesday - Saturday<br/>
                    10:00 AM - 7:00 PM
                  </p>
                </div>
                <div className="pt-2">
                   <a 
                     href="https://maps.google.com" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="font-body-sm text-body-sm text-ink border-b border-ink pb-1 hover:text-amber hover:border-amber transition-colors inline-block"
                   >
                     Get Directions
                   </a>
                </div>
            </div>
            <div className="flex-1 w-full h-80 rounded-2xl overflow-hidden border border-border">
              <iframe
                title="La Perla Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer {...homeData.footer} />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        services={homeData.header.services}
      />
    </div>
  );
};

export default LocationPage;