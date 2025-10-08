import React, { useState } from 'react';
import { Trophy, Star, Wrench, User, Medal, Crown, Award } from 'lucide-react';
import { User as UserType } from '../types';
import { storage } from '../utils/storage';
import { pointsCalculator } from '../utils/points';

interface RankingsProps {
  user: UserType;
}

export const Rankings: React.FC<RankingsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'mechanics' | 'customers'>('mechanics');
  
  const mechanics = storage.getMechanics()
    .map(mechanic => {
      const services = storage.getServices(mechanic.id, 'mechanic');
      const completedServices = services.filter(s => s.status === 'completed');
      const averageRating = completedServices.filter(s => s.mechanicRating).length > 0
        ? completedServices.reduce((sum, s) => sum + (s.mechanicRating || 0), 0) / completedServices.filter(s => s.mechanicRating).length
        : 0;
      
      return {
        ...mechanic,
        completedServices: completedServices.length,
        averageRating,
        totalEarnings: completedServices.reduce((sum, s) => sum + s.cost, 0),
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const customers = storage.getVehicleOwners()
    .map(owner => {
      const services = storage.getServices(owner.id, 'vehicle_owner');
      const completedServices = services.filter(s => s.status === 'completed');
      const vehicles = storage.getVehicles(owner.id);
      const averageRating = completedServices.filter(s => s.ownerRating).length > 0
        ? completedServices.reduce((sum, s) => sum + (s.ownerRating || 0), 0) / completedServices.filter(s => s.ownerRating).length
        : 0;
      
      return {
        ...owner,
        completedServices: completedServices.length,
        averageRating,
        totalSpent: completedServices.reduce((sum, s) => sum + s.cost, 0),
        vehicleCount: vehicles.length,
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-orange-500" />;
      default: return <Trophy className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankBadgeColor = (position: number) => {
    switch (position) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3: return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const currentUserPosition = activeTab === 'mechanics' 
    ? mechanics.findIndex(m => m.id === user.id) + 1
    : customers.findIndex(c => c.id === user.id) + 1;

  const displayUsers = activeTab === 'mechanics' ? mechanics : customers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rankings</h1>
        <p className="text-gray-600">See how you rank among mechanics and customers</p>
      </div>

      {/* User's Current Position */}
      {currentUserPosition > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Current Rank</h2>
              <p className="opacity-90">
                You're ranked #{currentUserPosition} among {activeTab === 'mechanics' ? 'mechanics' : 'customers'}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                {getRankIcon(currentUserPosition)}
                <span className="text-3xl font-bold">#{currentUserPosition}</span>
              </div>
              <p className="opacity-90">{user.totalPoints} points</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'mechanics'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Wrench className="h-5 w-5" />
            <span>Top Mechanics</span>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'customers'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Top Customers</span>
          </button>
        </div>
      </div>

      {/* Rankings List */}
      <div className="space-y-4">
        {displayUsers.map((rankedUser, index) => {
          const position = index + 1;
          const isCurrentUser = rankedUser.id === user.id;
          const rankTitle = pointsCalculator.getRankTitle(rankedUser.rank, rankedUser.userType);
          
          return (
            <div
              key={rankedUser.id}
              className={`bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 ${
                isCurrentUser 
                  ? 'border-orange-300 bg-orange-50 shadow-md' 
                  : 'border-gray-100 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank Badge */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeColor(position)}`}>
                    {position <= 3 ? getRankIcon(position) : `#${position}`}
                  </div>
                  
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {rankedUser.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <span>{rankedUser.name}</span>
                        {isCurrentUser && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                            You
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">{rankTitle}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{rankedUser.totalPoints}</p>
                    <p className="text-xs text-gray-500">Points</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {activeTab === 'mechanics' 
                        ? (rankedUser as any).completedServices 
                        : (rankedUser as any).completedServices
                      }
                    </p>
                    <p className="text-xs text-gray-500">Services</p>
                  </div>
                  
                  {(rankedUser as any).averageRating > 0 && (
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold text-gray-900">
                          {(rankedUser as any).averageRating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {activeTab === 'mechanics' 
                        ? `$${(rankedUser as any).totalEarnings.toFixed(0)}`
                        : `$${(rankedUser as any).totalSpent.toFixed(0)}`
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {activeTab === 'mechanics' ? 'Earned' : 'Spent'}
                    </p>
                  </div>

                  {activeTab === 'customers' && (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">
                        {(rankedUser as any).vehicleCount}
                      </p>
                      <p className="text-xs text-gray-500">Vehicles</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info for Mechanics */}
              {activeTab === 'mechanics' && rankedUser.specializations && rankedUser.specializations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-2">
                    {rankedUser.specializations.slice(0, 3).map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {rankedUser.specializations.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{rankedUser.specializations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {displayUsers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No rankings available</h3>
          <p className="text-gray-500">
            {activeTab === 'mechanics' 
              ? 'No mechanics have completed services yet'
              : 'No customers have used services yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};