import React from 'react';
import { useStore } from '../../context/StoreContext';
import type { Location } from '../../types';

export const LocationSwitcher: React.FC = () => {
  const { locations, activeLocationId, setActiveLocationId } = useStore();

  const getOptionLabel = (loc: Location) => {
    if (loc.id === 'loc-soho') return '🏢 La Perla - SoHo Flagship';
    if (loc.id === 'loc-ues') return '🏢 La Perla - Upper East Side';
    if (loc.id === 'loc-bk') return '🏢 La Perla - Brooklyn Heights';
    return `🏢 ${loc.name}`;
  };

  return (
    <div className="flex items-center gap-3 bg-surface-container-low border border-border rounded-xl px-3 py-1.5 shadow-sm">
      <span className="material-symbols-outlined text-primary text-xl">storefront</span>
      <div className="flex flex-col">
        <label
          htmlFor="admin-location-switcher"
          className="text-[10px] font-mono-label uppercase tracking-widest text-steel font-bold"
        >
          Scope
        </label>
        <select
          id="admin-location-switcher"
          data-testid="location-switcher-select"
          value={activeLocationId}
          onChange={(e) => setActiveLocationId(e.target.value)}
          className="bg-transparent font-body-sm font-bold text-ink focus:outline-none cursor-pointer pr-2"
        >
          <option value="ALL">🌐 All Locations (Global Admin)</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {getOptionLabel(loc)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
