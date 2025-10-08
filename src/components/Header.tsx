import React from 'react';
import { Wrench, User, Plus, History, Calendar, Trophy, Car, LogOut } from 'lucide-react';
import { User as UserType, ViewType } from '../types';
import { pointsCalculator } from '../utils/points';

interface HeaderProps {
  user: UserType | null;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, currentView, onViewChange, onLogout }) => {
  const mechanicNavItems = [
    { view: 'dashboard' as ViewType, icon: Trophy, label: 'Dashboard' },
    { view: 'services' as ViewType, icon: Wrench, label: 'Services' },
    { view: 'appointments' as ViewType, icon: Calendar, label: 'Appointments' },
    { view: 'rankings' as ViewType, icon: Trophy, label: 'Rankings' },
    { view: 'profile' as ViewType, icon: User, label: 'Profile' },
  ];

  const ownerNavItems = [
    { view: 'dashboard' as ViewType, icon: Trophy, label: 'Dashboard' },
    { view: 'vehicles' as ViewType, icon: Car, label: 'My Vehicles' },
    { view: 'services' as ViewType, icon: Wrench, label: 'Services' },
    { view: 'appointments' as ViewType, icon: Calendar, label: 'Appointments' },
    { view: 'rankings' as ViewType, icon: Trophy, label: 'Rankings' },
    { view: 'profile' as ViewType, icon: User, label: 'Profile' },
  ];

  const navItems = user?.userType === 'mechanic' ? mechanicNavItems : ownerNavItems;
  const rankTitle = user ? pointsCalculator.getRankTitle(user.rank, user.userType) : '';

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GarageHub</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Professional Garage Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ view, icon: Icon, label }) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === view
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-orange-600 font-semibold">
                    {user.totalPoints} pts • {rankTitle}
                  </p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-2">
          <div className="flex justify-around">
            {navItems.slice(0, 4).map(({ view, icon: Icon, label }) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  currentView === view
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};