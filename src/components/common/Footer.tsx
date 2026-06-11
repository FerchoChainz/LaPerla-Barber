import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  readonly copy: string;
  readonly links: Array<{ label: string; href: string }>;
}

export const Footer: React.FC<FooterProps> = ({ copy, links }) => {
  return (
    <footer className="bg-surface-container-lowest w-full rounded-none border-t border-border flat no shadows">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-gutter py-section-gap max-w-7xl mx-auto gap-4">
        <span className="font-mono-label text-mono-label uppercase tracking-widest text-steel">
          {copy}
        </span>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              className="font-body-sm text-body-sm text-steel hover:text-primary transition-colors"
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
