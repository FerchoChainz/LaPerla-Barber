import React, { useEffect, useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { homeData } from '../data/mockData';
import { supabase } from '../lib/supabase';

interface Booking {
  id: string;
  created_at: string;
  name: string;
  email: string;
  service: string;
  booking_date: string;
  status: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error';
}

const AdminPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setBookings(data || []);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError('Could not load bookings. Please check your Supabase connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (updateError) throw updateError;
      
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      showToast(`Booking marked as ${newStatus}`);
    } catch (err: any) {
      showToast('Error updating status', 'error');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink relative">
      <Header 
        {...homeData.header} 
        onBookClick={() => {}} 
      />
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-[200] px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 flex items-center gap-3 ${
          toast.type === 'success' ? 'bg-ink text-surface' : 'bg-error text-surface'
        }`}>
          <span className="material-symbols-outlined">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="font-body-md font-bold">{toast.message}</p>
        </div>
      )}

      <main className="flex-grow pt-24 pb-16 px-gutter">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-mono-label text-mono-label text-steel uppercase tracking-widest">Internal Access</span>
              <h1 className="font-display-lg text-display-lg text-ink">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={fetchBookings}
                className="text-steel hover:text-primary flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
                <span className="font-mono-label">Refresh</span>
              </button>
              <button 
                onClick={handleLogout}
                className="text-steel hover:text-error flex items-center gap-2 transition-colors border-l border-border pl-4"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-mono-label">Logout</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-error/10 text-error p-6 rounded-2xl border border-error/20 font-body-md">
              {error}
            </div>
          )}

          <div className="bg-surface rounded-[2.5rem] whisper-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-border">
                    <th className="p-6 font-mono-label text-steel uppercase">Client</th>
                    <th className="p-6 font-mono-label text-steel uppercase">Service</th>
                    <th className="p-6 font-mono-label text-steel uppercase">Date</th>
                    <th className="p-6 font-mono-label text-steel uppercase">Status</th>
                    <th className="p-6 font-mono-label text-steel uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-steel animate-pulse font-body-lg">
                        Loading clinical records...
                      </td>
                    </tr>
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-steel font-body-lg">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="p-6">
                          <p className="font-body-lg font-bold text-ink">{booking.name}</p>
                          <p className="font-body-sm text-secondary">{booking.email}</p>
                        </td>
                        <td className="p-6">
                          <span className="font-body-md text-ink">{booking.service}</span>
                        </td>
                        <td className="p-6">
                          <p className="font-mono-data text-mono-data text-ink whitespace-nowrap">
                            {formatDate(booking.booking_date)}
                          </p>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                            'bg-amber/20 text-amber'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-6 text-right space-x-2 whitespace-nowrap">
                          <button 
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="text-steel hover:text-green-600 transition-colors p-2"
                            title="Confirm"
                          >
                            <span className="material-symbols-outlined">check_circle</span>
                          </button>
                          <button 
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            className="text-steel hover:text-error transition-colors p-2"
                            title="Cancel"
                          >
                            <span className="material-symbols-outlined">cancel</span>
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
      </main>

      <Footer {...homeData.footer} />
    </div>
  );
};

export default AdminPage;
