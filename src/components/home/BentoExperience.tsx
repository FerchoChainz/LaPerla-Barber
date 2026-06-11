import React from 'react';

interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  span: number;
  highlight?: boolean;
}

interface BentoExperienceProps {
  readonly label: string;
  readonly title: string;
  readonly items: BentoItem[];
  readonly imageItem: string;
}

export const BentoExperience: React.FC<BentoExperienceProps> = ({
  label,
  title,
  items,
  imageItem,
}) => {
  return (
    <section className="bg-surface-bright py-section-gap">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="mb-16 md:w-2/3">
          <span className="font-mono-label text-mono-label text-steel uppercase tracking-widest mb-4 block">{label}</span>
          <h2 className="font-headline-md text-headline-md text-ink">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-bento-gap">
          {items.map((item) => (
            <div
              key={item.id}
              className={`rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[400px] ${
                item.highlight
                  ? "bg-amber text-ink min-h-[300px]"
                  : "bg-surface whisper-border diffused-shadow"
              } ${item.span === 2 ? "md:col-span-2" : "md:col-span-1"}`}
            >
              <div className="flex justify-between items-start mb-8">
                <span className={`font-mono-label text-mono-label px-3 py-1 rounded-full ${
                  item.highlight ? "text-on-primary-container bg-surface/20" : "text-primary bg-primary-fixed"
                }`}>
                  {item.id}
                </span>
                <span className={`material-symbols-outlined text-3xl ${
                  item.highlight ? "text-ink" : "text-steel"
                }`}>
                  {item.icon}
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-ink mb-4 text-2xl">{item.title}</h3>
                <p className={`font-body-sm text-body-sm ${
                  item.highlight ? "opacity-90" : "text-secondary"
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
          <div className="md:col-span-2 rounded-[2.5rem] overflow-hidden whisper-border diffused-shadow min-h-[300px] relative">
            <img alt="Grooming products" className="w-full h-full object-cover absolute inset-0" src={imageItem} />
          </div>
        </div>
      </div>
    </section>
  );
};
