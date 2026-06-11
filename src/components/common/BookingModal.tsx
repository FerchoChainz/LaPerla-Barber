import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import emailjs from '@emailjs/browser';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: string[];
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, services }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    name: '',
    email: '',
  });

  if (!isOpen) return null;

  const sendEmailNotification = async (bookingData: any) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS credentials missing. Notification not sent.');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          client_name: bookingData.name,
          client_email: bookingData.email,
          service_requested: bookingData.service,
          booking_date: bookingData.booking_date,
          admin_email: 'admin@laperla.com', // You can change this
        },
        publicKey
      );
    } catch (err) {
      console.error('Failed to send email notification:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const bookingData = { 
        name: formData.name, 
        email: formData.email, 
        service: formData.service, 
        booking_date: formData.date 
      };

      const { error: submitError } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (submitError) throw submitError;

      // Send email in the background
      sendEmailNotification(bookingData);

      setStep(3); // Success step
    } catch (err: any) {
      console.error('Error submitting booking:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-surface w-full max-w-lg rounded-[2.5rem] overflow-hidden whisper-border diffused-shadow animate-in zoom-in-95 duration-300">
        <div className="p-8 sm:p-12">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-steel hover:text-ink transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {step === 1 && (
            <div className="space-y-8">
              <div>
                <span className="font-mono-label text-mono-label text-steel uppercase tracking-widest block mb-2">Step 1 of 2</span>
                <h2 className="font-headline-md text-headline-md text-ink">Choose your service.</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      setFormData({ ...formData, service });
                      setStep(2);
                    }}
                    className={"text-left p-6 rounded-2xl border transition-all " + (
                      formData.service === service 
                        ? "border-amber bg-amber/5 text-ink" 
                        : "border-border hover:border-amber/50 text-secondary"
                    )}
                  >
                    <p className="font-body-lg text-body-lg font-bold">{service}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-steel hover:text-ink flex items-center gap-1 mb-4"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span className="font-mono-label text-mono-label">Change Service</span>
                </button>
                <h2 className="font-headline-md text-headline-md text-ink">Finalize details.</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-mono-label text-mono-label text-steel block mb-2 uppercase">Your Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-surface-container-low border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-amber transition-colors"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono-label text-mono-label text-steel block mb-2 uppercase">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-surface-container-low border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-amber transition-colors"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono-label text-mono-label text-steel block mb-2 uppercase">Preferred Date</label>
                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-surface-container-low border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-amber transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-error/10 text-error p-4 rounded-xl text-body-sm">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber text-ink font-body-sm text-body-sm px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-ink/30 border-t-ink rounded-full" />
                    Processing...
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-amber/10 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-4xl text-amber">check_circle</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-ink mb-2">Request Received.</h2>
                <p className="font-body-lg text-body-lg text-secondary">
                  We'll contact you at <span className="text-ink font-bold">{formData.email}</span> to confirm your session.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-ink border-b border-ink pb-1 hover:text-amber hover:border-amber transition-colors"
              >
                Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
