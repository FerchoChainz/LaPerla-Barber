import React from 'react';

interface HeroProps {
  readonly est: string;
  readonly title: string;
  readonly description: string;
  readonly cta: string;
  readonly inlineImage: string;
  readonly mainImage: string;
  readonly badge: {
    label: string;
    title: string;
  };
  onBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  est,
  title,
  description,
  cta,
  inlineImage,
  mainImage,
  badge,
  onBookClick,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-gutter py-section-gap grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[707px]">
      <div className="md:col-span-7 flex flex-col gap-8 pr-0 md:pr-12">
        <span className="font-mono-label text-mono-label text-steel uppercase tracking-widest">{est}</span>
        <h1 className="font-display-lg text-display-lg text-ink">
          {title.split(':')[0]}: 
          <span className="inline-block align-middle w-24 h-16 rounded-full overflow-hidden mx-2 whisper-border diffused-shadow">
            <img alt="Inline styling tool" className="w-full h-full object-cover" src={inlineImage} />
          </span>
          {title.split(':')[1]}
        </h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-md leading-relaxed">
          {description}
        </p>
        <div className="flex gap-4 pt-4">
          <button 
            onClick={onBookClick}
            className="bg-amber text-ink font-body-sm text-body-sm px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            {cta}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="md:col-span-5 relative h-[600px] w-full rounded-[2.5rem] overflow-hidden whisper-border diffused-shadow">
        <img alt="Master barber at work" className="w-full h-full object-cover" src={mainImage} />
        <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md rounded-xl p-6 whisper-border">
          <p className="font-mono-label text-mono-label text-steel mb-2">{badge.label}</p>
          <p className="font-body-sm text-body-sm text-ink">{badge.title}</p>
        </div>
      </div>
    </section>
  );
};
