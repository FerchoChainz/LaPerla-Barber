import React, { useState } from 'react';
import type { Location } from '../../types';

interface LocationTableProps {
  locations: Location[];
  onAddLocation: () => void;
  onEditLocation: (location: Location) => void;
  onDeleteLocation: (location: Location) => void;
}

export const LocationTable: React.FC<LocationTableProps> = ({
  locations,
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter((loc) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      loc.name.toLowerCase().includes(term) ||
      loc.address.toLowerCase().includes(term) ||
      loc.city.toLowerCase().includes(term) ||
      loc.phone.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Controls & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-3xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-headline-md font-bold text-ink">Locations Management</h2>
          <p className="text-sm text-secondary font-body-sm mt-1">
            Managing {locations.length} barbershop sanctuary locations across the network.
          </p>
        </div>
        <button
          type="button"
          data-testid="add-location-button"
          onClick={onAddLocation}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm shadow-md transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Location
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3">
        <span className="material-symbols-outlined text-steel text-xl pl-2">search</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search locations by name, city, address..."
          className="w-full bg-transparent text-ink text-sm focus:outline-none placeholder:text-steel"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="text-xs text-steel hover:text-ink pr-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Locations Data Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table data-testid="location-table" className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-border">
                <th className="p-4 font-mono-label text-steel text-xs uppercase font-bold">Location Name</th>
                <th className="p-4 font-mono-label text-steel text-xs uppercase font-bold">Address & City</th>
                <th className="p-4 font-mono-label text-steel text-xs uppercase font-bold">Contact</th>
                <th className="p-4 font-mono-label text-steel text-xs uppercase font-bold">Hours</th>
                <th className="p-4 font-mono-label text-steel text-xs uppercase font-bold">Status</th>
                <th className="p-4 font-mono-label text-steel text-xs uppercase font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLocations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-steel font-body-md">
                    {locations.length === 0
                      ? 'No locations available. Click "+ Add Location" to create one.'
                      : 'No locations match your search query.'}
                  </td>
                </tr>
              ) : (
                filteredLocations.map((loc) => (
                  <tr
                    key={loc.id}
                    data-testid={`location-row-${loc.id}`}
                    className="hover:bg-surface-container-lowest transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-xl">storefront</span>
                        </div>
                        <div>
                          <p className="font-body-md font-bold text-ink">{loc.name}</p>
                          <p className="font-mono-data text-[11px] text-steel">ID: {loc.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-body-md text-ink text-sm">{loc.address}</p>
                      <p className="font-body-sm text-xs text-secondary">
                        {loc.city}{loc.state ? `, ${loc.state}` : ''} {loc.zipCode || ''}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-mono-data text-xs text-ink">{loc.phone}</p>
                      <p className="font-body-sm text-xs text-secondary">{loc.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-body-sm text-xs text-steel">{loc.hours || 'Mon-Sat 9AM-8PM'}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          loc.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-surface-container-high text-steel'
                        }`}
                      >
                        {loc.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        data-testid={`edit-location-${loc.id}`}
                        onClick={() => onEditLocation(loc)}
                        className="px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        data-testid={`delete-location-${loc.id}`}
                        onClick={() => onDeleteLocation(loc)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationTable;
