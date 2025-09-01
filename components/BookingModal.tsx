
import React, { useState } from 'react';
import { Service, BookingStatus, Vehicle } from '../types';
import { useCarWash } from '../context/CarWashContext';

interface BookingModalProps {
  service: Service | null;
  userId: number;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, userId, onClose }) => {
  const { addBooking, vehicles } = useCarWash();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const userVehicles = vehicles.filter(v => v.userId === userId);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | undefined>(userVehicles[0]?.id);

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicleId) {
      alert("Please select a vehicle.");
      return;
    }
    addBooking({
      userId,
      serviceId: service.id,
      vehicleId: selectedVehicleId,
      date,
      time,
      status: BookingStatus.PENDING,
      staffId: null,
    });
    alert(`Booking for ${service.name} requested!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-brand-blue-700">Book: {service.name}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium text-slate-700">Vehicle</label>
              <select
                id="vehicle"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm rounded-md"
                required
              >
                {userVehicles.length > 0 ? (
                    userVehicles.map(v => <option key={v.id} value={v.id}>{v.make} {v.model} ({v.plateNumber})</option>)
                ) : (
                    <option disabled>No vehicles found for this user.</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-blue-500 focus:ring-brand-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-slate-700">Time</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-blue-500 focus:ring-brand-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end pt-4">
                <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md mr-2 hover:bg-slate-300 transition">Cancel</button>
                <button type="submit" className="bg-brand-blue-600 text-white px-4 py-2 rounded-md hover:bg-brand-blue-700 transition">Confirm Booking</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
