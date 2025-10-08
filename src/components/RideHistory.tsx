import React, { useState } from 'react';
import { MapPin, Calendar, Star, Trash2, Search, Filter } from 'lucide-react';
import { Ride, User } from '../types';
import { storage } from '../utils/storage';

interface RideHistoryProps {
  user: User;
  rides: Ride[];
  onRideDeleted: () => void;
}

export const RideHistory: React.FC<RideHistoryProps> = ({ user, rides, onRideDeleted }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'points' | 'fare'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filteredAndSortedRides = rides
    .filter(ride => 
      ride.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'points':
          comparison = a.pointsEarned - b.pointsEarned;
          break;
        case 'fare':
          comparison = a.fare - b.fare;
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const handleDeleteRide = (rideId: string) => {
    const ride = rides.find(r => r.id === rideId);
    if (!ride) return;

    // Remove points from user's total
    const updatedUser = {
      ...user,
      totalPoints: Math.max(0, user.totalPoints - ride.pointsEarned),
    };
    
    storage.saveUser(updatedUser);
    storage.setCurrentUser(updatedUser);
    storage.deleteRide(rideId);
    
    setShowDeleteConfirm(null);
    onRideDeleted();
  };

  const totalStats = {
    totalRides: rides.length,
    totalDistance: rides.reduce((sum, ride) => sum + ride.distance, 0),
    totalSpent: rides.reduce((sum, ride) => sum + ride.fare, 0),
    totalPoints: rides.reduce((sum, ride) => sum + ride.pointsEarned, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride History</h1>
        <p className="text-gray-600">Manage your complete taxi ride history</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Total Rides</p>
          <p className="text-2xl font-bold text-gray-900">{totalStats.totalRides}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Distance</p>
          <p className="text-2xl font-bold text-gray-900">{totalStats.totalDistance.toFixed(1)}km</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900">${totalStats.totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Points Earned</p>
          <p className="text-2xl font-bold text-yellow-600">{totalStats.totalPoints}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rides by location or driver..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'points' | 'fare')}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="date">Sort by Date</option>
                <option value="points">Sort by Points</option>
                <option value="fare">Sort by Fare</option>
              </select>
            </div>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>
      </div>

      {/* Rides List */}
      {filteredAndSortedRides.length > 0 ? (
        <div className="space-y-4">
          {filteredAndSortedRides.map((ride) => (
            <div key={ride.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-8 bg-gray-300 my-1"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">{ride.pickupLocation}</p>
                      <p className="font-semibold text-gray-900">{ride.dropoffLocation}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(ride.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">{ride.distance}km</span>
                    </div>
                    <div>
                      <span className="font-medium">${ride.fare}</span>
                    </div>
                    {ride.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{ride.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {(ride.driverName || ride.vehicleNumber) && (
                    <div className="mt-2 text-sm text-gray-500">
                      {ride.driverName && <span>Driver: {ride.driverName}</span>}
                      {ride.driverName && ride.vehicleNumber && <span> • </span>}
                      {ride.vehicleNumber && <span>Vehicle: {ride.vehicleNumber}</span>}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">+{ride.pointsEarned}</p>
                    <p className="text-sm text-gray-500">points</p>
                  </div>
                  
                  <button
                    onClick={() => setShowDeleteConfirm(ride.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete ride"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No rides found' : 'No rides yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Start adding rides to see your history here'}
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Ride</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this ride? This action cannot be undone and you will lose the points earned from this ride.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRide(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};