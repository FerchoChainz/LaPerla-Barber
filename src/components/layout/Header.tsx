import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LocationSwitcher } from './LocationSwitcher';

interface HeaderProps {
  activeTab?: string;
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab = 'locations', onMobileMenuToggle }) => {
  const { locations, activeLocationId } = useStore();

  const activeLocationObj = locations.find((l) => l.id === activeLocationId);
  const locationLabel =
    activeLocationId === 'ALL'
      ? 'All Locations (Global)'
      : activeLocationObj?.name || 'Selected Location';

  const tabTitles: Record<string, string> = {
    locations: 'Locations Management',
    services: 'Services & Pricing Catalog',
    staff: 'Staff & Master Barbers',
    appointments: 'Appointments Schedule',
  };

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-30 px-gutter py-3.5 shadow-sm flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-4">
        {onMobileMenuToggle && (
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-label="Toggle Navigation Sidebar"
            onClick={onMobileMenuToggle}
            className="md:hidden text-ink hover:text-primary p-2 rounded-xl border border-border hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-label text-steel uppercase tracking-widest">
              Admin Portal
            </span>
            <span className="text-steel text-xs">•</span>
            <span className="text-xs font-mono-label text-primary font-bold">
              {locationLabel}
            </span>
          </div>
          <h1 className="text-xl font-headline-md text-ink font-bold">
            {tabTitles[activeTab] || 'Dashboard'}
          </h1>
        </div>
      </div>

      {/* Right: Location Switcher Dropdown */}
      <div className="flex items-center gap-4">
        <LocationSwitcher />
      </div>
    </header>
  );
};
