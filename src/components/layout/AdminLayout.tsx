import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { AdminTab } from './Sidebar';

export type { AdminTab };

interface AdminLayoutProps {
  activeTab?: AdminTab;
  onTabChange?: (tab: AdminTab) => void;
  children?: React.ReactNode | ((activeTab: AdminTab) => React.ReactNode);
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab: externalActiveTab,
  onTabChange: externalOnTabChange,
  children,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<AdminTab>('locations');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeTab = externalActiveTab ?? internalActiveTab;

  const handleTabChange = (tab: AdminTab) => {
    if (externalOnTabChange) {
      externalOnTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col md:flex-row font-body-lg overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block flex-shrink-0 h-screen sticky top-0 z-40 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 bg-surface h-full shadow-2xl z-10">
            <Sidebar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onCloseMobile={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header
          activeTab={activeTab}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="flex-grow p-gutter max-w-7xl w-full mx-auto">
          {typeof children === 'function' ? children(activeTab) : children}
        </main>
      </div>
    </div>
  );
};
