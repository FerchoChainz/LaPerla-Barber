import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BookingModal } from '../components/common/BookingModal';
import { homeData } from '../data/mockData';

const ServicesPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header 
        {...homeData.header} 
        onBookClick={() => setIsBookingOpen(true)} 
      />
      <main className="flex-grow pt-24 pb-16 px-gutter">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <h1 className="font-display-lg text-display-lg text-ink">Our Services</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
            Explore our curated selection of high-end grooming experiences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
             {homeData.header.services.map((service, idx) => (
                <div key={idx} className="bg-surface p-8 rounded-[2.5rem] whisper-border diffused-shadow hover:scale-[1.02] transition-transform duration-500">
                    <h3 className="font-headline-md text-headline-md text-ink mb-2">{service}</h3>
                    <p className="font-body-sm text-secondary">A premium session tailored to your needs.</p>
                </div>
             ))}
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

export default ServicesPage;