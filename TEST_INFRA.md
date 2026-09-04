# E2E Test Infra: La Perla Barber Admin Web Application

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory & Test Coverage
| # | Feature | Source | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|--------|:------:|:------:|:------:|:------:|
| 1 | Location CRUD & Persistence | ORIGINAL_REQUEST R1, R3 | 5 | 5 | ✓ | ✓ |
| 2 | Header Location Switcher Filtering | ORIGINAL_REQUEST R2 | 5 | 5 | ✓ | ✓ |
| 3 | Services CRUD Management | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 4 | Staff CRUD Management | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 5 | Appointments CRUD Management | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ | ✓ |
| 6 | Public Pages & Booking Flow | ORIGINAL_REQUEST R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: `@playwright/test`
- **Invocation**: `npx playwright test`
- **Base URL**: `http://localhost:5173`
- **WebServer**: Vite dev server launched automatically via `playwright.config.ts`
- **Directory**: `e2e/`

## Spec Files Inventory
- `e2e/locations-crud.spec.ts`: Location CRUD, modal interactions, localStorage persistence, default seed fallback, and all required `data-testid` attributes.
- `e2e/services-crud.spec.ts`: Service creation, category/location mappings, update, delete operations.
- `e2e/staff-crud.spec.ts`: Staff (barber) management, location assignment, active status toggle, edit/delete.
- `e2e/appointments-crud.spec.ts`: Appointment booking and management, status transitions, staff/service linkage.
- `e2e/header-location-filter.spec.ts`: Header location switcher behavior, table filtering (ALL vs specific location scope).
- `e2e/public-pages.spec.ts`: Public `LocationPage.tsx` dynamic store rendering and `BookingModal.tsx` workflow.

## Coverage Tiers Breakdown
- **Tier 1 (Feature Coverage)**: Happy path verification for entity creation, display, editing, and deletion.
- **Tier 2 (Boundary & Corner Cases)**: Input validations, modal cancellations, page reload persistence, store reset fallback.
- **Tier 3 (Cross-Feature Combinations)**: Location switching state isolation, relational cascade integrity (staff/service mapping under location filters).
- **Tier 4 (Real-World Application Scenarios)**: Multi-location admin workflow followed by public customer booking flow.
