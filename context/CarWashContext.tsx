import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import the db instance
import { Booking, Service, Staff, BookingStatus, User, Vehicle } from '../types';
import { USERS, STAFF, VEHICLES } from '../constants'; // Keep these for now, they can be moved to firestore later

interface CarWashContextType {
  bookings: Booking[];
  services: Service[];
  staff: Staff[];
  users: User[];
  vehicles: Vehicle[];
  getServiceName: (id: number | string) => string;
  getUserName: (id: number) => string;
  getStaffName: (id: number | null) => string;
  getVehicleInfo: (id: number) => string;
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
  assignStaffToBooking: (id: string, staffId: number) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

const CarWashContext = createContext<CarWashContextType | undefined>(undefined);

export const CarWashProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  // Static data for this example
  const staff = STAFF;
  const users = USERS;
  const vehicles = VEHICLES;

  // Real-time listener for services
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      const servicesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
      setServices(servicesData);
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener for bookings
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Booking));
      setBookings(bookingsData);
    });
    return () => unsubscribe();
  }, []);


  const getServiceName = (id: number | string) => services.find(s => s.id === id)?.name || 'Unknown Service';
  const getUserName = (id: number) => users.find(u => u.id === id)?.name || 'Unknown User';
  const getStaffName = (id: number | null) => id ? staff.find(s => s.id === id)?.name || 'Unassigned' : 'Unassigned';
  const getVehicleInfo = (id: number) => {
    const v = vehicles.find(v => v.id === id);
    return v ? `${v.make} ${v.model} (${v.plateNumber})` : 'Unknown Vehicle';
  };
  
  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    await addDoc(collection(db, 'bookings'), booking);
  };

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const bookingDoc = doc(db, 'bookings', id);
    await updateDoc(bookingDoc, { status });
  };
  
  const assignStaffToBooking = async (id: string, staffId: number) => {
    const bookingDoc = doc(db, 'bookings', id);
    await updateDoc(bookingDoc, { staffId });
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    await addDoc(collection(db, 'services'), service);
  };

  const updateService = async (updatedService: Service) => {
    const serviceDoc = doc(db, 'services', String(updatedService.id));
    await updateDoc(serviceDoc, { ...updatedService });
  };

  const deleteService = async (id: string) => {
    const serviceDoc = doc(db, 'services', id);
    await deleteDoc(serviceDoc);
  };

  const contextValue = useMemo(() => ({
    bookings,
    services,
    staff,
    users,
    vehicles,
    getServiceName,
    getUserName,
    getStaffName,
    getVehicleInfo,
    addBooking,
    updateBookingStatus,
    assignStaffToBooking,
    addService,
    updateService,
    deleteService,
  }), [bookings, services, staff, users, vehicles]);

  return (
    <CarWashContext.Provider value={contextValue}>
      {children}
    </CarWashContext.Provider>
  );
};

export const useCarWash = () => {
  const context = useContext(CarWashContext);
  if (context === undefined) {
    throw new Error('useCarWash must be used within a CarWashProvider');
  }
  return context;
};
