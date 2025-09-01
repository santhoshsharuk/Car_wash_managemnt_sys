
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CarWashProvider } from './context/CarWashContext';
import { UserRole } from './types';
import Header from './components/Header';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import StaffPage from './pages/StaffPage';

const App: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.CUSTOMER);

  // In a real app, this would be based on logged in user.
  // We simulate by letting the user switch roles.
  const currentUserId = {
    [UserRole.CUSTOMER]: 1, // John Doe
    [UserRole.ADMIN]: 100, // Admin User
    [UserRole.STAFF]: 200, // Mike Johnson
  }[currentUserRole];

  return (
    <CarWashProvider>
      <HashRouter>
        <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
          <Header currentRole={currentUserRole} onRoleChange={setCurrentUserRole} />
          <main className="p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/customer" element={<CustomerPage userId={1} />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/staff" element={<StaffPage staffId={200} />} />
              <Route path="*" element={<Navigate to="/customer" replace />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </CarWashProvider>
  );
};

export default App;
