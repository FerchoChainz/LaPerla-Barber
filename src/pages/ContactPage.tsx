import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BookingModal } from '../components/common/BookingModal';
import { homeData } from '../data/mockData';

const ContactPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header 
        {...homeData.header} 
        onBookClick={() => setIsBookingOpen(true)} 
      />
      <main className="flex-grow pt-24 pb-16 px-gutter flex flex-col">
        <div className="max-w-7xl mx-auto space-y-12 text-center flex-grow flex flex-col justify-center w-full">
          <div className="space-y-4">
            <h1 className="font-display-lg text-display-lg text-ink">Contact Us</h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
              Get in touch for inquiries or private bookings.
            </p>
          </div>
          <div className="max-w-md mx-auto bg-surface p-8 sm:p-12 rounded-[2.5rem] whisper-border diffused-shadow w-full">
            <div className="space-y-8 text-left">
              <div>
                <h3 className="font-mono-label text-steel uppercase tracking-widest mb-2 block">Email</h3>
                <a href="mailto:hello@laperla.com" className="font-body-lg text-ink hover:text-amber transition-colors inline-block border-b border-transparent hover:border-amber pb-1">hello@laperla.com</a>
              </div>
              <div>
                <h3 className="font-mono-label text-steel uppercase tracking-widest mb-2 block">Phone</h3>
                <a href="tel:+1234567890" className="font-body-lg text-ink hover:text-amber transition-colors inline-block border-b border-transparent hover:border-amber pb-1">+1 (234) 567-890</a>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-amber text-ink font-body-sm text-body-sm px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  Book an Appointment
                </button>
              </div>
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

export default ContactPage;