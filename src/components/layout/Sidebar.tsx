import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export type AdminTab = 'locations' | 'services' | 'staff' | 'appointments';

interface SidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const {
    locations,
    filteredServices,
    filteredStaff,
    filteredAppointments,
    activeLocationId,
    resetToDefaultData,
  } = useStore();

  const handleTabClick = (tab: AdminTab) => {
    onTabChange(tab);
    onCloseMobile?.();
  };

  const navItems = [
    {
      id: 'locations' as const,
      label: 'Locations',
      icon: 'location_on',
      count: locations.length,
      testId: 'nav-tab-locations',
    },
    {
      id: 'services' as const,
      label: 'Services',
      icon: 'content_cut',
      count: filteredServices.length,
      testId: 'nav-tab-services',
    },
    {
      id: 'staff' as const,
      label: 'Staff & Barbers',
      icon: 'badge',
      count: filteredStaff.length,
      testId: 'nav-tab-staff',
    },
    {
      id: 'appointments' as const,
      label: 'Appointments',
      icon: 'calendar_month',
      count: filteredAppointments.length,
      testId: 'nav-tab-appointments',
    },
  ];

  const activeLocationName =
    activeLocationId === 'ALL'
      ? '🌐 Global Network'
      : `🏢 ${locations.find((l) => l.id === activeLocationId)?.name || 'Selected Location'}`;

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-surface border-r border-border h-full flex flex-col justify-between select-none transition-all duration-300`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className={`p-4 ${isCollapsed ? 'px-2' : 'p-6'} border-b border-border flex items-center justify-between`}>
          <Link to="/" className="flex items-center gap-3 group overflow-hidden" title="La Perla Admin">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors">
              <span className="material-symbols-outlined text-2xl">content_cut</span>
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-headline-md text-lg text-ink font-bold block leading-none">
                  La Perla
                </span>
                <span className="text-[10px] font-mono-label text-steel uppercase tracking-wider block mt-1">
                  Admin Management
                </span>
              </div>
            )}
          </Link>
          {onToggleCollapse && (
            <button
              type="button"
              data-testid="sidebar-collapse-button"
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="p-1.5 rounded-xl border border-border text-steel hover:text-ink hover:bg-surface-container-low transition-colors hidden md:flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">
                {isCollapsed ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <nav className="p-3 space-y-1.5">
          {!isCollapsed && (
            <div className="px-3 py-2 text-[10px] font-mono-label text-steel uppercase tracking-widest font-bold">
              Management
            </div>
          )}
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-testid={item.testId}
                onClick={() => handleTabClick(item.id)}
                title={isCollapsed ? `${item.label} (${item.count})` : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-3'
                } rounded-2xl font-body-sm font-bold transition-all text-left ${
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm border border-primary/20'
                    : 'text-secondary hover:text-ink hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-xl ${isActive ? 'text-primary' : 'text-steel'}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
                {!isCollapsed && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono-data font-bold ${
                      isActive ? 'bg-primary text-surface' : 'bg-surface-container-high text-steel'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer & Utilities */}
      <div className={`p-4 ${isCollapsed ? 'px-2' : ''} border-t border-border space-y-3`}>
        {/* Active Scope Pill */}
        <div
          className="bg-surface-container-low rounded-2xl p-3 border border-border"
          title={isCollapsed ? `Scope: ${activeLocationName}` : undefined}
        >
          <span className="text-[10px] font-mono-label text-steel uppercase tracking-wider block">
            {isCollapsed ? 'Scope' : 'Active Scope'}
          </span>
          <span className="text-xs font-body-sm font-bold text-ink truncate block mt-0.5">
            {isCollapsed ? (activeLocationId === 'ALL' ? '🌐' : '🏢') : activeLocationName}
          </span>
        </div>

        {/* Seed Reset Trigger */}
        <button
          type="button"
          data-testid="reset-store-button"
          onClick={() => {
            if (window.confirm('Reset store data to initial mock seed data?')) {
              resetToDefaultData();
            }
          }}
          title="Reset Seed Data"
          className={`w-full flex items-center justify-center gap-2 ${
            isCollapsed ? 'p-2.5' : 'px-3 py-2'
          } text-xs font-mono-label text-steel hover:text-error hover:bg-error-container/20 rounded-xl border border-border transition-colors cursor-pointer`}
        >
          <span className="material-symbols-outlined text-base">restart_alt</span>
          {!isCollapsed && <span>Reset Seed Data</span>}
        </button>

        {/* Link back to public website */}
        <Link
          to="/"
          title="Return to Public Site"
          className={`w-full flex items-center justify-center gap-2 ${
            isCollapsed ? 'p-2.5' : 'px-3 py-2'
          } text-xs font-body-sm font-bold text-secondary hover:text-primary transition-colors`}
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          {!isCollapsed && <span>Return to Public Site</span>}
        </Link>
      </div>
    </aside>
  );
};
