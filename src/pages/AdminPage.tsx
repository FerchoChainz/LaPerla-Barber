import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AdminLayout } from '../components/layout/AdminLayout';
import type { AdminTab } from '../components/layout/AdminLayout';
import type { Location } from '../types';
import { LocationTable } from '../components/locations/LocationTable';
import { LocationModal } from '../components/locations/LocationModal';
import { DeleteConfirmModal } from '../components/common/DeleteConfirmModal';

const AdminContent: React.FC = () => {
  const {
    locations,
    addLocation,
    updateLocation,
    deleteLocation,
    filteredServices,
    filteredStaff,
    filteredAppointments,
    activeLocationId,
    activeLocation,
  } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [deletingLocation, setDeletingLocation] = useState<Location | null>(null);

  const scopeLabel = activeLocationId === 'ALL'
    ? 'All Locations (Global Network)'
    : activeLocation ? `${activeLocation.name} (${activeLocation.city}, ${activeLocation.state})` : 'Selected Location';

  return (
    <AdminLayout>
      {(activeTab: AdminTab) => {
        switch (activeTab) {
          case 'locations':
            return (
              <>
                <LocationTable
                  locations={locations}
                  onAddLocation={() => setIsAddModalOpen(true)}
                  onEditLocation={(loc) => setEditingLocation(loc)}
                  onDeleteLocation={(loc) => setDeletingLocation(loc)}
                />

                <LocationModal
                  isOpen={isAddModalOpen || editingLocation !== null}
                  location={editingLocation}
                  onClose={() => {
                    setIsAddModalOpen(false);
                    setEditingLocation(null);
                  }}
                  onSave={(data) => {
                    if (editingLocation) {
                      updateLocation(editingLocation.id, data);
                    } else {
                      addLocation(data);
                    }
                  }}
                />

                <DeleteConfirmModal
                  isOpen={deletingLocation !== null}
                  title="Delete Location"
                  itemName={deletingLocation?.name}
                  onClose={() => setDeletingLocation(null)}
                  onConfirm={() => {
                    if (deletingLocation) {
                      deleteLocation(deletingLocation.id);
                      setDeletingLocation(null);
                    }
                  }}
                />
              </>
            );

          case 'services':
            return (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-surface p-6 rounded-3xl border border-border shadow-sm">
                  <div>
                    <h2 className="text-2xl font-headline-md font-bold text-ink">Services & Pricing Catalog</h2>
                    <p className="text-sm text-secondary font-body-sm mt-1">
                      Current Scope: <span className="font-bold text-primary">{scopeLabel}</span> ({filteredServices.length} services available)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((srv) => (
                    <div key={srv.id} className="bg-surface p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="px-3 py-1 bg-surface-container-high text-steel font-mono-label text-[10px] font-bold uppercase rounded-full">
                            {srv.category}
                          </span>
                          <span className="text-xl font-mono-data font-bold text-primary">${srv.price}</span>
                        </div>
                        <h3 className="text-lg font-bold text-ink mt-3">{srv.name}</h3>
                        <p className="text-xs text-secondary font-body-sm mt-1">{srv.description}</p>
                      </div>
                      <div className="pt-3 border-t border-border flex justify-between text-xs text-steel font-mono-data">
                        <span>⏱️ {srv.duration} mins</span>
                        <span>{srv.locationIds.includes('ALL') ? 'All Locations' : `${srv.locationIds.length} location(s)`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'staff':
            return (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-surface p-6 rounded-3xl border border-border shadow-sm">
                  <div>
                    <h2 className="text-2xl font-headline-md font-bold text-ink">Staff & Master Barbers</h2>
                    <p className="text-sm text-secondary font-body-sm mt-1">
                      Current Scope: <span className="font-bold text-primary">{scopeLabel}</span> ({filteredStaff.length} team members)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredStaff.map((stf) => (
                    <div key={stf.id} className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                          {stf.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-ink leading-tight">{stf.name}</h3>
                          <p className="text-xs font-mono-label text-steel uppercase">{stf.role}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border text-xs text-secondary space-y-1 font-body-sm">
                        <p>📧 {stf.email}</p>
                        <p>📞 {stf.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'appointments':
            return (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-surface p-6 rounded-3xl border border-border shadow-sm">
                  <div>
                    <h2 className="text-2xl font-headline-md font-bold text-ink">Appointments Schedule</h2>
                    <p className="text-sm text-secondary font-body-sm mt-1">
                      Current Scope: <span className="font-bold text-primary">{scopeLabel}</span> ({filteredAppointments.length} bookings)
                    </p>
                  </div>
                </div>

                <div className="bg-surface rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low border-b border-border">
                          <th className="p-4 font-mono-label text-steel text-xs uppercase">Client</th>
                          <th className="p-4 font-mono-label text-steel text-xs uppercase">Service / Staff</th>
                          <th className="p-4 font-mono-label text-steel text-xs uppercase">Date & Time</th>
                          <th className="p-4 font-mono-label text-steel text-xs uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredAppointments.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-steel font-body-md">
                              No appointments found for selected location scope.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-surface-container-lowest transition-colors">
                              <td className="p-4">
                                <p className="font-body-md font-bold text-ink">{apt.clientName}</p>
                                <p className="font-body-sm text-xs text-secondary">{apt.clientEmail} • {apt.clientPhone}</p>
                              </td>
                              <td className="p-4">
                                <p className="font-body-md text-ink">{apt.serviceId}</p>
                                <p className="font-body-sm text-xs text-steel">Barber: {apt.staffId}</p>
                              </td>
                              <td className="p-4">
                                <p className="font-mono-data text-xs text-ink">{apt.date} at {apt.time}</p>
                              </td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                  apt.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                                  'bg-amber-100 text-amber-800'
                                }`}>
                                  {apt.status}
                                </span>
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

          default:
            return null;
        }
      }}
    </AdminLayout>
  );
};

export const AdminPage: React.FC = () => {
  return <AdminContent />;
};

export default AdminPage;
