import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Hero } from '../components/home/Hero';
import { BentoExperience } from '../components/home/BentoExperience';
import { AboutGallery } from '../components/home/AboutGallery';
import { Footer } from '../components/common/Footer';
import { BookingModal } from '../components/common/BookingModal';
import { homeData } from '../data/mockData';

const HomePage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header 
        {...homeData.header} 
        onBookClick={() => setIsBookingOpen(true)} 
      />
      <main className="flex-grow">
        <section id="hero">
          <Hero 
            {...homeData.hero} 
            onBookClick={() => setIsBookingOpen(true)} 
          />
        </section>
        <section id="services">
          <BentoExperience {...homeData.experience} />
        </section>
        <section id="gallery">
          <AboutGallery {...homeData.about} />
        </section>
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

export default HomePage;
