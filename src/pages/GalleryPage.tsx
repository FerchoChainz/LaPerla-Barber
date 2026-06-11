import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BookingModal } from '../components/common/BookingModal';
import { homeData } from '../data/mockData';

const GalleryPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header 
        {...homeData.header} 
        onBookClick={() => setIsBookingOpen(true)} 
      />
      
      <main className="flex-grow pt-24 pb-16 px-gutter">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="font-display-lg text-display-lg text-ink">{homeData.gallery.title}</h1>
            <p className="font-body-lg text-body-lg text-secondary">{homeData.gallery.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.gallery.images.map((image) => (
              <div 
                key={image.id} 
                className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] whisper-border shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-surface font-headline-md text-headline-md">{image.title}</p>
                </div>
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

export default GalleryPage;
