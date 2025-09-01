
import React from 'react';
import { useCarWash } from '../context/CarWashContext';
import { BookingStatus } from '../types';

interface StaffPageProps {
  staffId: number;
}

const statusColors: { [key in BookingStatus]: string } = {
  [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [BookingStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
  [BookingStatus.IN_PROGRESS]: 'bg-indigo-100 text-indigo-800',
  [BookingStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [BookingStatus.CANCELLED]: 'bg-red-100 text-red-800',
};

const StaffPage: React.FC<StaffPageProps> = ({ staffId }) => {
  const { bookings, updateBookingStatus, getUserName, getServiceName, getVehicleInfo, getStaffName } = useCarWash();
  
  const today = new Date().toISOString().split('T')[0];
  const staffName = getStaffName(staffId);

  const myBookings = bookings.filter(b => b.staffId === staffId);
  const todaysJobs = myBookings
    .filter(b => b.date === today && b.status !== BookingStatus.COMPLETED && b.status !== BookingStatus.CANCELLED)
    .sort((a, b) => a.time.localeCompare(b.time));
  const upcomingJobs = myBookings
    .filter(b => b.date > today && b.status !== BookingStatus.COMPLETED && b.status !== BookingStatus.CANCELLED)
    .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time));

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-1">My Schedule</h2>
      <p className="text-lg text-slate-600 mb-6">Viewing tasks for: <span className="font-semibold text-brand-blue-700">{staffName}</span></p>

      {/* Today's Jobs */}
      <section id="today-jobs">
        <h3 className="text-2xl font-bold text-slate-700 mb-4">Today's Jobs</h3>
        {todaysJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysJobs.map(job => (
              <div key={job.id} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${job.status === BookingStatus.IN_PROGRESS ? 'border-indigo-500' : 'border-blue-500'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg text-brand-blue-800">{getServiceName(job.serviceId)}</p>
                    <p className="text-sm text-slate-600">{getUserName(job.userId)} - {getVehicleInfo(job.vehicleId)}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-800 my-4">{job.time}</p>
                <div className="flex space-x-2 mt-4">
                  {job.status === BookingStatus.CONFIRMED && (
                    <button onClick={() => updateBookingStatus(job.id, BookingStatus.IN_PROGRESS)} className="flex-1 bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition">Start Job</button>
                  )}
                  {job.status === BookingStatus.IN_PROGRESS && (
                    <button onClick={() => updateBookingStatus(job.id, BookingStatus.COMPLETED)} className="flex-1 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition">Complete Job</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-slate-500">No jobs scheduled for today.</div>
        )}
      </section>

      {/* Upcoming Jobs */}
      <section id="upcoming-jobs" className="mt-12">
        <h3 className="text-2xl font-bold text-slate-700 mb-4">Upcoming</h3>
        {upcomingJobs.length > 0 ? (
          <div className="bg-white rounded-lg shadow">
            <ul className="divide-y divide-slate-200">
              {upcomingJobs.map(job => (
                 <li key={job.id} className="p-4 sm:p-6 hover:bg-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-bold text-lg text-brand-blue-800">{getServiceName(job.serviceId)}</p>
                            <p className="text-sm text-slate-600">{getUserName(job.userId)} - {getVehicleInfo(job.vehicleId)}</p>
                            <p className="text-sm text-slate-500 mt-1">
                            {new Date(job.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {job.time}
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[job.status]}`}>
                            {job.status}
                            </span>
                        </div>
                    </div>
                 </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-slate-500">No upcoming jobs.</div>
        )}
      </section>
    </div>
  );
};

export default StaffPage;
