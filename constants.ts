
import { User, Service, Staff, Vehicle, Booking, UserRole, BookingStatus } from './types';

export const USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: UserRole.CUSTOMER },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: UserRole.CUSTOMER },
  { id: 100, name: 'Admin User', email: 'admin@sparkleclean.com', role: UserRole.ADMIN },
  { id: 200, name: 'Mike Johnson', email: 'mike@sparkleclean.com', role: UserRole.STAFF },
  { id: 201, name: 'Sarah Lee', email: 'sarah@sparkleclean.com', role: UserRole.STAFF },
];

export const VEHICLES: Vehicle[] = [
    { id: 1, userId: 1, make: 'Toyota', model: 'Camry', plateNumber: 'ABC-123', color: 'Silver' },
    { id: 2, userId: 2, make: 'Honda', model: 'CRV', plateNumber: 'XYZ-789', color: 'Blue' },
];

export const SERVICES: Service[] = [
  { id: 1, name: 'Express Wash', price: 15, description: 'Quick exterior wash and dry.', duration: 20 },
  { id: 2, name: 'Deluxe Wash', price: 30, description: 'Exterior wash, wax, and tire shine.', duration: 45 },
  { id: 3, name: 'Ultimate Detail', price: 150, description: 'Full interior and exterior cleaning, wax, and polish.', duration: 180 },
  { id: 4, name: 'Interior Cleaning', price: 75, description: 'Vacuum, wipe down, and window cleaning.', duration: 90 },
];

export const STAFF: Staff[] = [
  { id: 200, name: 'Mike Johnson' },
  { id: 201, name: 'Sarah Lee' },
];

export const BOOKINGS: Booking[] = [
  { id: 1, userId: 1, serviceId: 2, vehicleId: 1, date: '2024-07-28', time: '10:00', status: BookingStatus.COMPLETED, staffId: 200 },
  { id: 2, userId: 2, serviceId: 3, vehicleId: 2, date: '2024-07-29', time: '14:00', status: BookingStatus.CONFIRMED, staffId: 201 },
  { id: 3, userId: 1, serviceId: 1, vehicleId: 1, date: new Date().toISOString().split('T')[0], time: '09:00', status: BookingStatus.CONFIRMED, staffId: 200 },
  { id: 4, userId: 2, serviceId: 4, vehicleId: 2, date: new Date().toISOString().split('T')[0], time: '11:00', status: BookingStatus.IN_PROGRESS, staffId: 201 },
];
