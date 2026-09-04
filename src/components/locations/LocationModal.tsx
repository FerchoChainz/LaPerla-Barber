import React, { useState, useEffect } from 'react';
import type { Location, LocationStatus } from '../../types';

interface LocationModalProps {
  isOpen: boolean;
  location: Location | null;
  onClose: () => void;
  onSave: (data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  location,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: 'NY',
    zipCode: '10001',
    phone: '',
    email: 'info@laperlabarber.com',
    hours: 'Mon-Sat 9AM-8PM',
    status: 'active' as LocationStatus,
  });

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name || '',
        address: location.address || '',
        city: location.city || '',
        state: location.state || 'NY',
        zipCode: location.zipCode || '10001',
        phone: location.phone || '',
        email: location.email || 'info@laperlabarber.com',
        hours: location.hours || 'Mon-Sat 9AM-8PM',
        status: location.status || 'active',
      });
    } else {
      setFormData({
        name: '',
        address: '',
        city: '',
        state: 'NY',
        zipCode: '10001',
        phone: '',
        email: 'info@laperlabarber.com',
        hours: 'Mon-Sat 9AM-8PM',
        status: 'active',
      });
    }
  }, [location, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const isEdit = Boolean(location);

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        data-testid="location-modal"
        className="bg-surface border border-border rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div>
            <h3 className="text-2xl font-bold font-headline-md text-ink">
              {isEdit ? 'Edit Location' : 'Add New Location'}
            </h3>
            <p className="text-xs text-secondary font-body-sm mt-1">
              {isEdit ? `Update details for ${location?.name}` : 'Enter details for the new barbershop location'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:text-ink hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono-label font-bold text-steel uppercase">
              Location Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              data-testid="location-name-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. La Perla SoHo Flagship"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono-label font-bold text-steel uppercase">
              Street Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              data-testid="location-address-input"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 125 Spring St"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-label font-bold text-steel uppercase">
                City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                data-testid="location-city-input"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. New York"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-label font-bold text-steel uppercase">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                data-testid="location-state-input"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. NY"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-label font-bold text-steel uppercase">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                data-testid="location-zip-input"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="e.g. 10012"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-label font-bold text-steel uppercase">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                data-testid="location-phone-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. (212) 555-0199"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-label font-bold text-steel uppercase">
                Contact Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                data-testid="location-email-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. soho@laperlabarber.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-label font-bold text-steel uppercase">
                Operating Hours
              </label>
              <input
                type="text"
                name="hours"
                id="hours"
                data-testid="location-hours-input"
                value={formData.hours}
                onChange={handleChange}
                placeholder="e.g. Mon-Sat 9AM-8PM"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-label font-bold text-steel uppercase">
                Status
              </label>
              <select
                name="status"
                id="status"
                data-testid="location-status-select"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              data-testid="cancel-location-button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-ink hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="save-location-button"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-sm font-semibold shadow-md transition-colors"
            >
              {isEdit ? 'Save Changes' : 'Save Location'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationModal;
