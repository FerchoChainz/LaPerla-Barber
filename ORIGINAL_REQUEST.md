# Original User Request

## 2026-07-31T18:24:54Z

# Teamwork Project Prompt

Build a multi-location barbershop admin web application featuring a responsive dashboard, offline-first localStorage state management, and CRUD interfaces for locations, services, staff, and appointments.

Working directory: /Users/lazaroestrada/Desktop/Gemini/LaPerla
Integrity mode: development

## Requirements

### R1. Multi-location Data & Store Engine
Implement a `localStorage` persistence engine using React Context (`StoreContext.tsx`). Include TypeScript schemas for Location, Service, Staff, and Appointment, along with seed data for offline capability.

### R2. Admin Navigation & Location Switcher UI
Implement a responsive Admin Sidebar layout and a Header. The header must include a Location Switcher to toggle between a global view ("ALL") and specific location scopes.

### R3. CRUD Management for Entities
Create data tables and Add/Edit/Delete modal forms for Locations, Services, Staff (Barbers), and Appointments. Each must support relational linkage (e.g., staff assigned to locations, services mapped to categories/locations).

### R4. Public Multi-location UI Integration
Update public-facing pages (`LocationPage.tsx` and the booking flow) to consume and reflect the multi-location store data instead of hardcoded values.

## Acceptance Criteria

### Data Persistence
- [ ] Refreshing the browser does not lose created or edited locations, services, staff, or appointments.
- [ ] Clearing `localStorage` falls back to the default seed data automatically.

### UI and Navigation
- [ ] The Admin Sidebar can collapse and expand responsively.
- [ ] Selecting a specific location in the Header Location Switcher filters the displayed tables (Staff, Appointments) to only show records for that location.

### End-to-End Testing (Verification)
- [ ] Playwright E2E tests in `e2e/locations-crud.spec.ts` pass, successfully verifying the creation, reading, updating, and deletion of a Location via the UI.
- [ ] The application builds successfully without type errors (`npm run build`).
