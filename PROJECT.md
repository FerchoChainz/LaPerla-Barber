# Project: La Perla Barber Admin Web Application

## Architecture
- **Framework & Build**: React 19, Vite 8, TypeScript 6, Tailwind CSS v4, React Router v7.
- **State Management & Persistence**: React Context (`StoreContext.tsx`) with dual-key `localStorage` engine (`laperla_*_v1` primary, `la_perla_*_v1` fallback) supporting cascading deletes, cross-tab syncing, and seed data initialization (`mockStore.ts`).
- **Admin Shell**: Responsive dual-column layout (`AdminLayout.tsx`), Header with Location Switcher dropdown (`LocationSwitcher.tsx`, `data-testid="location-switcher-select"`), and collapsible Sidebar (`Sidebar.tsx`, `data-testid="reset-store-button"`).
- **CRUD Components**: Structured data tables and Add/Edit/Delete modals for Locations, Services, Staff (Barbers), and Appointments with relational linkages and explicit `data-testid` hooks.
- **Public Integration**: Public pages (`LocationPage.tsx`, `BookingModal.tsx`) consuming `useStore()` dynamically.
- **E2E Verification**: `@playwright/test` with webServer targeting Vite dev server.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Store Context & Schema Engine | React Context (`StoreContext.tsx`) with `localStorage` persistence, fallback keys, seed data, and cascading deletes | M1 | R1 |
| 2 | Offline Admin Auth Bypass | Update `ProtectedRoute.tsx` to allow local offline admin dashboard access without Supabase auth requirement | M1 | R1, survey |
| 3 | Responsive Admin Navigation & Sidebar | Collapsible sidebar with active navigation tabs (`locations`, `services`, `staff`, `appointments`, `analytics`) | M1 | R2 |
| 4 | Header Location Switcher | Header Location Switcher dropdown (`data-testid="location-switcher-select"`) toggling between "ALL" and specific locations | M1 | R2 |
| 5 | Reset Store Action | Reset state action (`data-testid="reset-store-button"`) clearing `localStorage` and restoring default seed data | M1 | R1, R2 |
| 6 | Location CRUD Management | Interactive table, Add/Edit/Delete modals, and delete confirmation modal for Location entities with `data-testid` hooks | M2 | R3 |
| 7 | Location Filtering & Scoping | Global vs location-scoped view for displayed entities based on Header Location Switcher selection | M2, M3 | R2, R3 |
| 8 | Service CRUD Management | Interactive table and Add/Edit/Delete modals for Services mapped to categories/locations with `data-testid` hooks | M3 | R3 |
| 9 | Staff (Barber) CRUD Management | Interactive table and Add/Edit/Delete modals for Staff assigned to specific locations with location filter | M3 | R3 |
| 10 | Appointment CRUD Management | Interactive table and Add/Edit/Delete modals for Appointments linked to customer, service, staff, location, date, time, and status | M4 | R3 |
| 11 | Location Page Integration | Update `LocationPage.tsx` to dynamically query and render store locations and active barbers | M4 | R4 |
| 12 | Booking Flow Integration | Update `BookingModal.tsx` to consume store services/staff/locations and save appointments to `StoreContext` | M4 | R4 |
| 13 | Playwright E2E Test Suite | Install `@playwright/test`, `playwright.config.ts`, and create `e2e/locations-crud.spec.ts` for E2E location CRUD verification | M5 (Testing Track) | Acceptance Criteria |
| 14 | Build & Type Verification | Verify `npm run build` (`tsc -b && vite build`) succeeds without type errors or broken bundles | M5 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Data Store & Admin Shell Refinement | Fix `AdminPage.tsx` double store wrap, enable local admin access in `ProtectedRoute.tsx`, verify `StoreContext.tsx` seed fallback and reset logic | None | DONE |
| M2 | Locations CRUD Management | Build `LocationTable.tsx`, `LocationModal.tsx`, `DeleteConfirmModal.tsx`, wire into `AdminPage.tsx` with all required `data-testid` attributes | M1 | IN_PROGRESS |
| M3 | Services & Staff CRUD Management | Build `ServiceTable.tsx`, `ServiceModal.tsx`, `StaffTable.tsx`, `StaffModal.tsx`, support category/location mappings and location filtering | M2 | PLANNED |
| M4 | Appointments CRUD & Public Integration | Build `AppointmentTable.tsx`, `AppointmentModal.tsx`, update `LocationPage.tsx` and `BookingModal.tsx` to consume `useStore()` | M3 | PLANNED |
| M5 | E2E Testing Track & Final Verification | E2E test suite (`locations-crud.spec.ts` + Tiers 1-4), 100% test pass verification, Tier 5 white-box coverage hardening, `npm run build` | M4 | PLANNED |

## Interface Contracts
### Location Entity Interface (`src/types/index.ts`)
```ts
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  image?: string;
  isActive: boolean;
  operatingHours?: string;
}
```

### Store Context Interface (`src/types/index.ts`)
```ts
export interface ILaPerlaStore {
  locations: Location[];
  services: Service[];
  staff: Staff[];
  appointments: Appointment[];
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  addLocation: (location: Omit<Location, 'id'>) => Location;
  updateLocation: (id: string, location: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
  addService: (service: Omit<Service, 'id'>) => Service;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addStaff: (staff: Omit<Staff, 'id'>) => Staff;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => Appointment;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  resetToDefault: () => void;
}
```

## Code Layout
```
src/
├── components/
│   ├── layout/ (AdminLayout, Header, Sidebar, LocationSwitcher)
│   ├── locations/ (LocationTable, LocationModal)
│   ├── services/ (ServiceTable, ServiceModal)
│   ├── staff/ (StaffTable, StaffModal)
│   ├── appointments/ (AppointmentTable, AppointmentModal)
│   ├── common/ (DeleteConfirmModal, Modal, Badge, Button)
│   └── public/ (LocationPage, BookingModal)
├── context/ (StoreContext.tsx)
├── data/ (mockStore.ts)
├── pages/ (AdminPage.tsx, LocationPage.tsx, ServicesPage.tsx, etc.)
└── types/ (index.ts)
e2e/
└── locations-crud.spec.ts
```
