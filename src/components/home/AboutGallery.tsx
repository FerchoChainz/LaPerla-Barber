import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AboutGalleryProps {
  readonly label: string;
  readonly title: string;
  readonly description1: string;
  readonly description2: string;
  readonly cta: string;
  readonly image: string;
}

export const AboutGallery: React.FC<AboutGalleryProps> = ({
  label,
  title,
  description1,
  description2,
  cta,
  image,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-gutter py-section-gap grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div 
        className="cursor-zoom-in group relative"
        onClick={() => setIsLightboxOpen(true)}
      >
        <img alt="Salon interior" className="w-full rounded-[2.5rem] whisper-border diffused-shadow transition-transform duration-500 group-hover:scale-[1.02]" src={image} />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500 rounded-[2.5rem]" />
      </div>
      <div className="flex flex-col gap-6">
        <span className="font-mono-label text-mono-label text-steel uppercase tracking-widest">{label}</span>
        <h2 className="font-headline-md text-headline-md text-ink">{title}</h2>
        <p className="font-body-lg text-body-lg text-secondary">
          {description1}
        </p>
        <p className="font-body-lg text-body-lg text-secondary">
          {description2}
        </p>
        <div className="mt-4">
          <Link 
            to="/gallery"
            className="font-body-sm text-body-sm text-ink border-b border-ink pb-1 hover:text-amber hover:border-amber transition-colors inline-block"
          >
            {cta}
          </Link>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink/95 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setIsLightboxOpen(false)}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          <img 
            src={image} 
            alt="Full size gallery view" 
            className="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
