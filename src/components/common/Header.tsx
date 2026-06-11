import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  readonly logo: string;
  readonly navLinks: Array<{ label: string; href: string }>;
  readonly cta: string;
  onBookClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ logo, navLinks, cta, onBookClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/' && !location.hash) return true;
    if (href.startsWith('/#') && location.pathname === '/' && location.hash === href.substring(1)) return true;
    if (href !== '/' && !href.startsWith('/#') && location.pathname === href) return true;
    return false;
  };

  return (
    <header className="bg-canvas w-full top-0 sticky shadow-sm border-b border-border z-50">
      <div className="flex justify-between items-center w-full px-gutter py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-primary">content_cut</span>
          <span className="font-headline-md text-headline-md tracking-tighter text-ink">{logo}</span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-body-lg text-body-lg transition-all px-3 py-1 rounded-full ${
                isActive(link.href)
                  ? "text-primary font-bold border-b-2 border-primary pb-1 rounded-none"
                  : "text-secondary hover:text-primary hover:bg-surface-container-low"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBookClick}
            className="hidden sm:flex bg-amber text-ink font-body-sm text-body-sm px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity items-center gap-2"
          >
            <span>{cta}</span>
          </button>
          <button 
            aria-label="Toggle menu" 
            className="md:hidden text-ink flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <nav className="flex flex-col p-gutter gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-body-lg text-body-lg p-2 ${
                  isActive(link.href) ? "text-primary font-bold" : "text-secondary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onBookClick?.();
              }}
              className="sm:hidden bg-amber text-ink font-body-sm text-body-sm px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2"
            >
              <span>{cta}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
