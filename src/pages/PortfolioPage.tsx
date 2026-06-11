import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BookingModal } from '../components/common/BookingModal';
import { homeData } from '../data/mockData';

const PortfolioPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header 
        {...homeData.header} 
        onBookClick={() => setIsBookingOpen(true)} 
      />
      <main className="flex-grow pt-24 pb-16 px-gutter">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <h1 className="font-display-lg text-display-lg text-ink">Portfolio</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
            A closer look at our signature cuts and styles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.gallery.images.map((image) => (
              <div 
                key={image.id} 
                className="group relative aspect-square overflow-hidden rounded-[2.5rem] whisper-border diffused-shadow transition-all duration-500"
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
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

export default PortfolioPage;