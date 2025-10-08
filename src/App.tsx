import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Services } from './components/Services';
import { Vehicles } from './components/Vehicles';
import { Rankings } from './components/Rankings';
import { Profile } from './components/Profile';
import { User, ViewType } from './types';
import { storage } from './utils/storage';
import { pointsCalculator } from './utils/points';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Load user session on app start
  useEffect(() => {
    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      // Recalculate rank in case points system changed
      const updatedUser = {
        ...savedUser,
        rank: pointsCalculator.calculateRank(savedUser.totalPoints, savedUser.userType),
      };
      setUser(updatedUser);
      storage.setCurrentUser(updatedUser);
    } else {
      setCurrentView('login');
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    storage.setCurrentUser(loggedInUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    storage.clearCurrentUser();
    setUser(null);
    setCurrentView('login');
  };

  const handleProfileUpdated = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Show auth screens if user is not logged in
  if (!user || currentView === 'login' || currentView === 'register') {
    return (
      <Auth
        currentView={currentView}
        onViewChange={handleViewChange}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        currentView={currentView}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
      />
      
      <main>
        {currentView === 'dashboard' && (
          <Dashboard user={user} />
        )}
        
        {currentView === 'services' && (
          <Services user={user} onViewChange={handleViewChange} />
        )}
        
        {currentView === 'vehicles' && user.userType === 'vehicle_owner' && (
          <Vehicles user={user} />
        )}
        
        {currentView === 'rankings' && (
          <Rankings user={user} />
        )}
        
        {currentView === 'profile' && (
          <Profile 
            user={user} 
            onProfileUpdated={handleProfileUpdated}
          />
        )}
      </main>
    </div>
  );
}

export default App;