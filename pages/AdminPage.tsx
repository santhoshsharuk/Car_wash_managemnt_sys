
import React from 'react';
import { useCarWash } from '../context/CarWashContext';
import DashboardCard from '../components/DashboardCard';
import { BookingStatus, Staff } from '../types';

const statusColors: { [key in BookingStatus]: string } = {
    [BookingStatus.PENDING]: 'border-yellow-500',
    [BookingStatus.CONFIRMED]: 'border-blue-500',
    [BookingStatus.IN_PROGRESS]: 'border-indigo-500',
    [BookingStatus.COMPLETED]: 'border-green-500',
    [BookingStatus.CANCELLED]: 'border-red-500',
};

const AdminPage: React.FC = () => {
    const { bookings, services, staff, updateBookingStatus, assignStaffToBooking, getUserName, getServiceName, getStaffName, getVehicleInfo } = useCarWash();
    
    const today = new Date().toISOString().split('T')[0];
    const todaysBookingsCount = bookings.filter(b => b.date === today).length;
    
    const totalRevenue = bookings
        .filter(b => b.status === BookingStatus.COMPLETED)
        .reduce((acc, b) => acc + (services.find(s => s.id === b.serviceId)?.price || 0), 0);
        
    const handleStatusChange = (bookingId: number, newStatus: BookingStatus) => {
        updateBookingStatus(bookingId, newStatus);
    };

    const handleStaffChange = (bookingId: number, staffId: number) => {
        assignStaffToBooking(bookingId, staffId);
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Admin Dashboard</h2>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardCard title="Total Bookings" value={bookings.length} color="bg-blue-100 text-blue-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
                <DashboardCard title="Today's Bookings" value={todaysBookingsCount} color="bg-indigo-100 text-indigo-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
                <DashboardCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} color="bg-green-100 text-green-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                <DashboardCard title="Available Staff" value={staff.length} color="bg-yellow-100 text-yellow-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Service</th>
                            <th scope="col" className="px-6 py-3">Date & Time</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Assign Staff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    {getUserName(b.userId)}
                                    <div className="text-xs text-slate-500">{getVehicleInfo(b.vehicleId)}</div>
                                </td>
                                <td className="px-6 py-4">{getServiceName(b.serviceId)}</td>
                                <td className="px-6 py-4">{b.date} @ {b.time}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={b.status}
                                        onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                                        className={`p-1.5 rounded-md border-2 bg-transparent focus:outline-none focus:ring-0 ${statusColors[b.status]}`}
                                    >
                                        {Object.values(BookingStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={b.staffId || ''}
                                        onChange={(e) => handleStaffChange(b.id, Number(e.target.value))}
                                        className="p-1.5 rounded-md border-slate-300 bg-transparent focus:outline-none focus:ring-0"
                                    >
                                        <option value="">Unassigned</option>
                                        {staff.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
