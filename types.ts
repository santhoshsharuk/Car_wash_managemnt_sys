
export enum UserRole {
  CUSTOMER = 'Customer',
  ADMIN = 'Admin',
  STAFF = 'Staff',
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Vehicle {
  id: number;
  userId: number;
  make: string;
  model: string;
  plateNumber: string;
  color: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  duration: number; // in minutes
}

export interface Staff {
  id: number;
  name: string;
}

export interface Booking {
  id: number;
  userId: number;
  serviceId: number;
  vehicleId: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: BookingStatus;
  staffId: number | null;
}
