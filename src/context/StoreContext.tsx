import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Location, Service, Staff, Appointment, ILaPerlaStore } from '../types';
import { INITIAL_LOCATIONS, INITIAL_SERVICES, INITIAL_STAFF, INITIAL_APPOINTMENTS } from '../data/mockStore';

const STORAGE_KEYS = {
  ACTIVE_LOCATION_ID: 'laperla_active_location_id_v1',
  ACTIVE_LOCATION_ID_FALLBACK: 'la_perla_active_location_id_v1',
  LOCATIONS: 'laperla_locations_v1',
  LOCATIONS_FALLBACK: 'la_perla_locations_v1',
  SERVICES: 'laperla_services_v1',
  SERVICES_FALLBACK: 'la_perla_services_v1',
  STAFF: 'laperla_staff_v1',
  STAFF_FALLBACK: 'la_perla_staff_v1',
  APPOINTMENTS: 'laperla_appointments_v1',
  APPOINTMENTS_FALLBACK: 'la_perla_appointments_v1',
};

function loadStorageData<T>(primaryKey: string, fallbackKey: string, seed: T): T {
  try {
    const raw = localStorage.getItem(primaryKey) || localStorage.getItem(fallbackKey);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    if (Array.isArray(seed) && (!Array.isArray(parsed) || parsed.length === 0)) {
      return seed;
    }
    return parsed;
  } catch (error) {
    console.warn(`[StoreContext] Error reading ${primaryKey} from localStorage. Falling back to seed.`, error);
    return seed;
  }
}

function generateUniqueId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return prefix + '-' + crypto.randomUUID().substring(0, 8);
  }
  return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7);
}

const StoreContext = createContext<ILaPerlaStore | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeLocationId, setActiveLocationIdState] = useState<string>(() =>
    loadStorageData(STORAGE_KEYS.ACTIVE_LOCATION_ID, STORAGE_KEYS.ACTIVE_LOCATION_ID_FALLBACK, 'ALL')
  );

  const [locations, setLocations] = useState<Location[]>(() =>
    loadStorageData(STORAGE_KEYS.LOCATIONS, STORAGE_KEYS.LOCATIONS_FALLBACK, INITIAL_LOCATIONS)
  );

  const [services, setServices] = useState<Service[]>(() =>
    loadStorageData(STORAGE_KEYS.SERVICES, STORAGE_KEYS.SERVICES_FALLBACK, INITIAL_SERVICES)
  );

  const [staff, setStaff] = useState<Staff[]>(() =>
    loadStorageData(STORAGE_KEYS.STAFF, STORAGE_KEYS.STAFF_FALLBACK, INITIAL_STAFF)
  );

  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    loadStorageData(STORAGE_KEYS.APPOINTMENTS, STORAGE_KEYS.APPOINTMENTS_FALLBACK, INITIAL_APPOINTMENTS)
  );

  // Sync state mutations to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCATION_ID, JSON.stringify(activeLocationId));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCATION_ID_FALLBACK, JSON.stringify(activeLocationId));
  }, [activeLocationId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(locations));
    localStorage.setItem(STORAGE_KEYS.LOCATIONS_FALLBACK, JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    localStorage.setItem(STORAGE_KEYS.SERVICES_FALLBACK, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
    localStorage.setItem(STORAGE_KEYS.STAFF_FALLBACK, JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS_FALLBACK, JSON.stringify(appointments));
  }, [appointments]);

  // Cross-tab / external event listener for localStorage synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ACTIVE_LOCATION_ID || e.key === STORAGE_KEYS.ACTIVE_LOCATION_ID_FALLBACK) {
        setActiveLocationIdState(loadStorageData(STORAGE_KEYS.ACTIVE_LOCATION_ID, STORAGE_KEYS.ACTIVE_LOCATION_ID_FALLBACK, 'ALL'));
      }
      if (e.key === STORAGE_KEYS.LOCATIONS || e.key === STORAGE_KEYS.LOCATIONS_FALLBACK) {
        setLocations(loadStorageData(STORAGE_KEYS.LOCATIONS, STORAGE_KEYS.LOCATIONS_FALLBACK, INITIAL_LOCATIONS));
      }
      if (e.key === STORAGE_KEYS.SERVICES || e.key === STORAGE_KEYS.SERVICES_FALLBACK) {
        setServices(loadStorageData(STORAGE_KEYS.SERVICES, STORAGE_KEYS.SERVICES_FALLBACK, INITIAL_SERVICES));
      }
      if (e.key === STORAGE_KEYS.STAFF || e.key === STORAGE_KEYS.STAFF_FALLBACK) {
        setStaff(loadStorageData(STORAGE_KEYS.STAFF, STORAGE_KEYS.STAFF_FALLBACK, INITIAL_STAFF));
      }
      if (e.key === STORAGE_KEYS.APPOINTMENTS || e.key === STORAGE_KEYS.APPOINTMENTS_FALLBACK) {
        setAppointments(loadStorageData(STORAGE_KEYS.APPOINTMENTS, STORAGE_KEYS.APPOINTMENTS_FALLBACK, INITIAL_APPOINTMENTS));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setActiveLocationId = useCallback((id: string) => {
    setActiveLocationIdState(id);
  }, []);

  const activeLocation = useMemo(() => {
    if (activeLocationId === 'ALL') return null;
    return locations.find((loc) => loc.id === activeLocationId) || null;
  }, [activeLocationId, locations]);

  // Scoped / Filtered data getters
  const filteredServices = useMemo(() => {
    if (activeLocationId === 'ALL') return services;
    return services.filter((srv) => srv.locationIds.includes('ALL') || srv.locationIds.includes(activeLocationId));
  }, [activeLocationId, services]);

  const filteredStaff = useMemo(() => {
    if (activeLocationId === 'ALL') return staff;
    return staff.filter((stf) => stf.locationIds.includes('ALL') || stf.locationIds.includes(activeLocationId));
  }, [activeLocationId, staff]);

  const filteredAppointments = useMemo(() => {
    if (activeLocationId === 'ALL') return appointments;
    return appointments.filter((apt) => apt.locationId === activeLocationId);
  }, [activeLocationId, appointments]);

  // -----------------------------------------------------------------
  // LOCATIONS CRUD
  // -----------------------------------------------------------------
  const addLocation = useCallback((data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>): Location => {
    const now = new Date().toISOString();
    const newLocation: Location = {
      ...data,
      id: generateUniqueId('loc'),
      createdAt: now,
      updatedAt: now,
    };
    setLocations((prev) => [newLocation, ...prev]);
    return newLocation;
  }, []);

  const updateLocation = useCallback((id: string, data: Partial<Omit<Location, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const now = new Date().toISOString();
    setLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, ...data, updatedAt: now } : loc))
    );
  }, []);

  const deleteLocation = useCallback((id: string) => {
    setActiveLocationIdState((prev) => (prev === id ? 'ALL' : prev));
    setLocations((prev) => prev.filter((loc) => loc.id !== id));

    // Cascading updates
    setServices((prev) =>
      prev.map((srv) => ({
        ...srv,
        locationIds: srv.locationIds.filter((locId) => locId !== id),
      }))
    );

    setStaff((prev) =>
      prev.map((stf) => ({
        ...stf,
        locationIds: stf.locationIds.filter((locId) => locId !== id),
      }))
    );

    setAppointments((prev) => prev.filter((apt) => apt.locationId !== id));
  }, []);

  // -----------------------------------------------------------------
  // SERVICES CRUD
  // -----------------------------------------------------------------
  const addService = useCallback((data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Service => {
    const now = new Date().toISOString();
    const newService: Service = {
      ...data,
      id: generateUniqueId('srv'),
      createdAt: now,
      updatedAt: now,
    };
    setServices((prev) => [newService, ...prev]);
    return newService;
  }, []);

  const updateService = useCallback((id: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const now = new Date().toISOString();
    setServices((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, ...data, updatedAt: now } : srv))
    );
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices((prev) => prev.filter((srv) => srv.id !== id));

    // Cascading updates
    setStaff((prev) =>
      prev.map((stf) => ({
        ...stf,
        serviceIds: stf.serviceIds.filter((srvId) => srvId !== id),
      }))
    );

    setAppointments((prev) => prev.filter((apt) => apt.serviceId !== id));
  }, []);

  // -----------------------------------------------------------------
  // STAFF CRUD
  // -----------------------------------------------------------------
  const addStaff = useCallback((data: Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>): Staff => {
    const now = new Date().toISOString();
    const newStaff: Staff = {
      ...data,
      id: generateUniqueId('stf'),
      createdAt: now,
      updatedAt: now,
    };
    setStaff((prev) => [newStaff, ...prev]);
    return newStaff;
  }, []);

  const updateStaff = useCallback((id: string, data: Partial<Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const now = new Date().toISOString();
    setStaff((prev) =>
      prev.map((stf) => (stf.id === id ? { ...stf, ...data, updatedAt: now } : stf))
    );
  }, []);

  const deleteStaff = useCallback((id: string) => {
    setStaff((prev) => prev.filter((stf) => stf.id !== id));

    // Cascading updates
    setAppointments((prev) => prev.filter((apt) => apt.staffId !== id));
  }, []);

  // -----------------------------------------------------------------
  // APPOINTMENTS CRUD
  // -----------------------------------------------------------------
  const addAppointment = useCallback((data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Appointment => {
    const now = new Date().toISOString();
    const newAppointment: Appointment = {
      ...data,
      id: generateUniqueId('apt'),
      createdAt: now,
      updatedAt: now,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  }, []);

  const updateAppointment = useCallback((id: string, data: Partial<Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const now = new Date().toISOString();
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...data, updatedAt: now } : apt))
    );
  }, []);

  const deleteAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  }, []);

  // -----------------------------------------------------------------
  // RESET STORE TO SEED DATA
  // -----------------------------------------------------------------
  const resetToDefaultData = useCallback(() => {
    setActiveLocationIdState('ALL');
    setLocations(INITIAL_LOCATIONS);
    setServices(INITIAL_SERVICES);
    setStaff(INITIAL_STAFF);
    setAppointments(INITIAL_APPOINTMENTS);

    localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCATION_ID, JSON.stringify('ALL'));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCATION_ID_FALLBACK, JSON.stringify('ALL'));
    localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(INITIAL_LOCATIONS));
    localStorage.setItem(STORAGE_KEYS.LOCATIONS_FALLBACK, JSON.stringify(INITIAL_LOCATIONS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    localStorage.setItem(STORAGE_KEYS.SERVICES_FALLBACK, JSON.stringify(INITIAL_SERVICES));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
    localStorage.setItem(STORAGE_KEYS.STAFF_FALLBACK, JSON.stringify(INITIAL_STAFF));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS_FALLBACK, JSON.stringify(INITIAL_APPOINTMENTS));
  }, []);

  const storeValue = useMemo<ILaPerlaStore>(
    () => ({
      activeLocationId,
      setActiveLocationId,
      activeLocation,
      locations,
      addLocation,
      updateLocation,
      deleteLocation,
      services,
      filteredServices,
      addService,
      updateService,
      deleteService,
      staff,
      filteredStaff,
      addStaff,
      updateStaff,
      deleteStaff,
      appointments,
      filteredAppointments,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      resetToDefaultData,
      resetStore: resetToDefaultData,
    }),
    [
      activeLocationId,
      setActiveLocationId,
      activeLocation,
      locations,
      addLocation,
      updateLocation,
      deleteLocation,
      services,
      filteredServices,
      addService,
      updateService,
      deleteService,
      staff,
      filteredStaff,
      addStaff,
      updateStaff,
      deleteStaff,
      appointments,
      filteredAppointments,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      resetToDefaultData,
    ]
  );

  return <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = (): ILaPerlaStore => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
