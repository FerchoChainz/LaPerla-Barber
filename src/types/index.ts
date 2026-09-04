export type LocationStatus = 'active' | 'inactive';

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  hours: string;
  status: LocationStatus;
  createdAt: string;
  updatedAt: string;
}

export type ServiceStatus = 'active' | 'inactive';
export type ServiceCategory = 'Haircut' | 'Shave' | 'Skincare' | 'Package' | 'Grooming';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number; // in USD
  category: ServiceCategory | string;
  locationIds: string[]; // List of Location IDs where offered, or ['ALL']
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export type StaffStatus = 'active' | 'inactive' | 'on_leave';

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  locationIds: string[]; // Assigned location IDs
  serviceIds: string[]; // Provided service IDs
  status: StaffStatus;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  locationId: string;
  serviceId: string;
  staffId: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILaPerlaStore {
  // Active Location Scoping
  activeLocationId: string; // 'ALL' or specific location ID
  setActiveLocationId: (id: string) => void;
  activeLocation: Location | null;

  // Locations CRUD
  locations: Location[];
  addLocation: (data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) => Location;
  updateLocation: (id: string, data: Partial<Omit<Location, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteLocation: (id: string) => void;

  // Services CRUD & Scope
  services: Service[];
  filteredServices: Service[];
  addService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Service;
  updateService: (id: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteService: (id: string) => void;

  // Staff CRUD & Scope
  staff: Staff[];
  filteredStaff: Staff[];
  addStaff: (data: Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>) => Staff;
  updateStaff: (id: string, data: Partial<Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteStaff: (id: string) => void;

  // Appointments CRUD & Scope
  appointments: Appointment[];
  filteredAppointments: Appointment[];
  addAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Appointment;
  updateAppointment: (id: string, data: Partial<Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteAppointment: (id: string) => void;

  // Store Reset
  resetToDefaultData: () => void;
  resetStore: () => void;
}
