
import React from 'react';
import { UserRole } from '../types';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.022 3.022a.75.75 0 011.056 0l4.25 4.25a.75.75 0 010 1.056l-4.25 4.25a.75.75 0 01-1.056-1.056L8.717 10 5.022 6.303a.75.75 0 010-1.056L4.25 4.25a.75.75 0 01-.022-1.034z" clipRule="evenodd" transform="translate(1, 0)" />
        <path d="M3.22 5.252a.75.75 0 01.022 1.034L.528 9.94a.75.75 0 01-1.056-1.056l2.714-3.658a.75.75 0 011.034-.022zM15 3a.75.75 0 01.75.75v12.5a.75.75 0 01-1.5 0V3.75A.75.75 0 0115 3z" />
        <path d="M16 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path fillRule="evenodd" d="M5.336 3.003A.75.75 0 016 3.75v1.5a.75.75 0 01-1.5 0v-.354L2.21 8.332a.75.75 0 01-1.12.936l-1-1.25a.75.75 0 111.12-.936l.54.675L4.664 3.93A.75.75 0 015.336 3.003z" clipRule="evenodd" transform="translate(2.5, 0.5) scale(0.9)" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onRoleChange }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-blue-700 text-white'
        : 'text-blue-100 hover:bg-brand-blue-500 hover:text-white'
    }`;
    
  return (
    <header className="bg-brand-blue-600 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <CarIcon/>
            <h1 className="text-2xl font-bold text-white ml-2">SparkleClean</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium hidden sm:block">View As:</span>
            <div className="flex items-center bg-brand-blue-800 p-1 rounded-lg">
              <NavLink to="/customer" className={getLinkClass} onClick={() => onRoleChange(UserRole.CUSTOMER)}>Customer</NavLink>
              <NavLink to="/staff" className={getLinkClass} onClick={() => onRoleChange(UserRole.STAFF)}>Staff</NavLink>
              <NavLink to="/admin" className={getLinkClass} onClick={() => onRoleChange(UserRole.ADMIN)}>Admin</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
