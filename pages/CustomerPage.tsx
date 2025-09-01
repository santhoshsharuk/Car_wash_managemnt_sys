
import React, { useState } from 'react';
import { useCarWash } from '../context/CarWashContext';
import BookingModal from '../components/BookingModal';
import { Service, BookingStatus } from '../types';

interface CustomerPageProps {
  userId: number;
}

const statusColors: { [key in BookingStatus]: string } = {
  [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [BookingStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
  [BookingStatus.IN_PROGRESS]: 'bg-indigo-100 text-indigo-800',
  [BookingStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [BookingStatus.CANCELLED]: 'bg-red-100 text-red-800',
};

const CustomerPage: React.FC<CustomerPageProps> = ({ userId }) => {
  const { services, bookings, getServiceName, getStaffName, getVehicleInfo } = useCarWash();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const userBookings = bookings.filter(b => b.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      {isModalOpen && selectedService && (
        <BookingModal
          service={selectedService}
          userId={userId}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <section id="services">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-brand-blue-700">{service.name}</h3>
                <p className="text-slate-600 mt-2">{service.description}</p>
                <p className="text-2xl font-extrabold text-slate-800 my-4">${service.price}</p>
                <p className="text-sm text-slate-500">Duration: {service.duration} mins</p>
              </div>
              <button
                onClick={() => handleBookNow(service)}
                className="mt-6 w-full bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-blue-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="my-bookings" className="mt-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">My Bookings</h2>
        <div className="bg-white rounded-lg shadow-lg">
          <ul className="divide-y divide-slate-200">
            {userBookings.length > 0 ? userBookings.map(booking => (
              <li key={booking.id} className="p-4 sm:p-6 hover:bg-slate-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-lg text-brand-blue-800">{getServiceName(booking.serviceId)}</p>
                    <p className="text-sm text-slate-600">{getVehicleInfo(booking.vehicleId)}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {booking.time}
                    </p>
                    <p className="text-sm text-slate-500">Staff: {getStaffName(booking.staffId)}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </li>
            )) : (
              <p className="p-6 text-center text-slate-500">You have no bookings yet.</p>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CustomerPage;
