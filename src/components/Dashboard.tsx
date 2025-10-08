import React from 'react';
import { Wrench, Trophy, TrendingUp, Calendar, Star, Car, Users, DollarSign } from 'lucide-react';
import { User, Service, Vehicle, Appointment } from '../types';
import { pointsCalculator } from '../utils/points';
import { storage } from '../utils/storage';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const services = storage.getServices(user.id, user.userType);
  const appointments = storage.getAppointments(user.id, user.userType);
  const vehicles = user.userType === 'vehicle_owner' ? storage.getVehicles(user.id) : [];
  
  const completedServices = services.filter(s => s.status === 'completed');
  const pendingAppointments = appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed');
  
  const rankTitle = pointsCalculator.getRankTitle(user.rank, user.userType);
  const rankColor = pointsCalculator.getRankColor(user.rank);
  const nextRankInfo = pointsCalculator.getNextRankInfo(user.totalPoints, user.userType);
  
  const thisMonthServices = completedServices.filter(service => {
    const serviceDate = new Date(service.date);
    const now = new Date();
    return serviceDate.getMonth() === now.getMonth() && serviceDate.getFullYear() === now.getFullYear();
  });

  const totalEarnings = user.userType === 'mechanic' 
    ? completedServices.reduce((sum, service) => sum + service.cost, 0)
    : 0;
  
  const averageRating = user.userType === 'mechanic'
    ? completedServices.filter(s => s.mechanicRating).reduce((sum, service) => sum + (service.mechanicRating || 0), 0) / completedServices.filter(s => s.mechanicRating).length || 0
    : completedServices.filter(s => s.ownerRating).reduce((sum, service) => sum + (service.ownerRating || 0), 0) / completedServices.filter(s => s.ownerRating).length || 0;

  const mechanicStats = [
    {
      title: 'Total Points',
      value: user.totalPoints.toLocaleString(),
      icon: Trophy,
      color: 'bg-yellow-500',
      change: `+${thisMonthServices.reduce((sum, service) => sum + service.pointsEarnedMechanic, 0)} this month`
    },
    {
      title: 'Services Completed',
      value: completedServices.length.toString(),
      icon: Wrench,
      color: 'bg-blue-500',
      change: `${thisMonthServices.length} this month`
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: `$${thisMonthServices.reduce((sum, service) => sum + service.cost, 0).toFixed(2)} this month`
    },
    {
      title: 'Average Rating',
      value: averageRating ? averageRating.toFixed(1) : 'N/A',
      icon: Star,
      color: 'bg-purple-500',
      change: `${completedServices.filter(s => s.mechanicRating).length} ratings`
    },
  ];

  const ownerStats = [
    {
      title: 'Total Points',
      value: user.totalPoints.toLocaleString(),
      icon: Trophy,
      color: 'bg-yellow-500',
      change: `+${thisMonthServices.reduce((sum, service) => sum + service.pointsEarnedOwner, 0)} this month`
    },
    {
      title: 'My Vehicles',
      value: vehicles.length.toString(),
      icon: Car,
      color: 'bg-blue-500',
      change: 'registered vehicles'
    },
    {
      title: 'Services Used',
      value: completedServices.length.toString(),
      icon: Wrench,
      color: 'bg-green-500',
      change: `${thisMonthServices.length} this month`
    },
    {
      title: 'Total Spent',
      value: `$${completedServices.reduce((sum, service) => sum + service.cost, 0).toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: `$${thisMonthServices.reduce((sum, service) => sum + service.cost, 0).toFixed(2)} this month`
    },
  ];

  const statCards = user.userType === 'mechanic' ? mechanicStats : ownerStats;
  const recentServices = completedServices.slice(-3).reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">
          {user.userType === 'mechanic' 
            ? 'Manage your services and track your professional growth'
            : 'Track your vehicles and service history'
          }
        </p>
      </div>

      {/* Rank Status */}
      <div className={`bg-gradient-to-r ${rankColor} rounded-2xl p-6 mb-8 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{rankTitle}</h2>
            <p className="opacity-90 mb-4">
              {nextRankInfo.pointsNeeded > 0 
                ? `${nextRankInfo.pointsNeeded} more points to reach ${nextRankInfo.nextRank}`
                : 'You\'ve reached the highest rank!'}
            </p>
            {nextRankInfo.pointsNeeded > 0 && (
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(100, ((user.totalPoints % (user.userType === 'mechanic' ? 500 : 150)) / (user.userType === 'mechanic' ? 500 : 150)) * 100)}%` 
                  }}
                ></div>
              </div>
            )}
          </div>
          <Trophy className="h-12 w-12 opacity-80" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
            <p className="text-green-600 text-xs font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Services</h3>
            <Wrench className="h-5 w-5 text-gray-400" />
          </div>
          
          {recentServices.length > 0 ? (
            <div className="space-y-4">
              {recentServices.map((service) => {
                const vehicle = storage.getVehicleById(service.vehicleId);
                const mechanic = storage.getUserById(service.mechanicId);
                const owner = storage.getUserById(service.ownerId);
                
                return (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 truncate">
                        {service.serviceType}
                      </p>
                      <p className="text-sm text-gray-500">
                        {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Vehicle'} • 
                        {user.userType === 'mechanic' ? ` ${owner?.name}` : ` ${mechanic?.name}`} • 
                        ${service.cost}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(service.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-orange-600">
                        +{user.userType === 'mechanic' ? service.pointsEarnedMechanic : service.pointsEarnedOwner}
                      </p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No services yet. Start earning points!</p>
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          
          {pendingAppointments.length > 0 ? (
            <div className="space-y-4">
              {pendingAppointments.slice(0, 3).map((appointment) => {
                const vehicle = storage.getVehicleById(appointment.vehicleId);
                const mechanic = storage.getUserById(appointment.mechanicId);
                const owner = storage.getUserById(appointment.ownerId);
                
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-blue-900 truncate">
                        {appointment.serviceType}
                      </p>
                      <p className="text-sm text-blue-600">
                        {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Vehicle'} • 
                        {user.userType === 'mechanic' ? ` ${owner?.name}` : ` ${mechanic?.name}`}
                      </p>
                      <p className="text-xs text-blue-500">
                        {new Date(appointment.scheduledDate).toLocaleDateString()} • 
                        Est. ${appointment.estimatedCost}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming appointments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};