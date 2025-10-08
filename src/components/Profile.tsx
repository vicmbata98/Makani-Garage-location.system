import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone, Calendar, Trophy, Save, Edit3, Wrench, Car } from 'lucide-react';
import { User } from '../types';
import { storage } from '../utils/storage';
import { pointsCalculator } from '../utils/points';

interface ProfileProps {
  user: User;
  onProfileUpdated: (updatedUser: User) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onProfileUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    specializations: user.specializations?.join(', ') || '',
    yearsExperience: user.yearsExperience?.toString() || '',
    certifications: user.certifications?.join(', ') || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      // Add mechanic-specific fields
      if (user.userType === 'mechanic') {
        updatedUser.specializations = formData.specializations.split(',').map(s => s.trim()).filter(s => s);
        updatedUser.yearsExperience = parseInt(formData.yearsExperience) || 0;
        updatedUser.certifications = formData.certifications.split(',').map(s => s.trim()).filter(s => s);
      }
      
      storage.saveUser(updatedUser);
      storage.setCurrentUser(updatedUser);
      onProfileUpdated(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      specializations: user.specializations?.join(', ') || '',
      yearsExperience: user.yearsExperience?.toString() || '',
      certifications: user.certifications?.join(', ') || '',
    });
    setIsEditing(false);
  };

  const services = storage.getServices(user.id, user.userType);
  const completedServices = services.filter(s => s.status === 'completed');
  const rankTitle = pointsCalculator.getRankTitle(user.rank, user.userType);
  const rankColor = pointsCalculator.getRankColor(user.rank);
  const memberSinceDate = new Date(user.memberSince);
  const daysSinceMember = Math.floor((Date.now() - memberSinceDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const monthlyStats = completedServices.reduce((acc, service) => {
    const month = new Date(service.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { services: 0, points: 0, amount: 0 };
    }
    acc[month].services++;
    acc[month].points += user.userType === 'mechanic' ? service.pointsEarnedMechanic : service.pointsEarnedOwner;
    acc[month].amount += service.cost;
    return acc;
  }, {} as Record<string, { services: number; points: number; amount: number }>);

  const recentMonths = Object.entries(monthlyStats).slice(-6).reverse();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account information and view your performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                  <p className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${rankColor} text-white`}>
                    {user.userType === 'mechanic' ? <Wrench className="h-4 w-4 mr-1" /> : <Car className="h-4 w-4 mr-1" />}
                    {rankTitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{user.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{user.phone}</span>
                    </div>
                  )}
                </div>

                {user.userType === 'mechanic' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="yearsExperience"
                          value={formData.yearsExperience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          min="0"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Trophy className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900">{user.yearsExperience || 0} years</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specializations
                      </label>
                      {isEditing ? (
                        <textarea
                          name="specializations"
                          value={formData.specializations}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Comma-separated specializations"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {user.specializations && user.specializations.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {user.specializations.map((spec, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">No specializations listed</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certifications
                      </label>
                      {isEditing ? (
                        <textarea
                          name="certifications"
                          value={formData.certifications}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Comma-separated certifications"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {user.certifications && user.certifications.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {user.certifications.map((cert, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">No certifications listed</span>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">
                      {memberSinceDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })} ({daysSinceMember} days ago)
                    </span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Points</span>
                <span className="font-semibold text-orange-600">{user.totalPoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed Services</span>
                <span className="font-semibold text-gray-900">{completedServices.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Rank</span>
                <span className="font-semibold text-gray-900">#{user.rank}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {user.userType === 'mechanic' ? 'Total Earned' : 'Total Spent'}
                </span>
                <span className="font-semibold text-green-600">
                  ${completedServices.reduce((sum, service) => sum + service.cost, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Activity */}
          {recentMonths.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentMonths.map(([month, stats]) => (
                  <div key={month} className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="font-medium text-gray-900">{month}</div>
                    <div className="text-sm text-gray-600">
                      {stats.services} services • {stats.points} points • ${stats.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};