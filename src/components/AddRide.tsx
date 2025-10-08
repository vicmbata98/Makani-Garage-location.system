import React, { useState } from 'react';
import { MapPin, DollarSign, Car, User, Star, Plus } from 'lucide-react';
import { Ride, User as UserType } from '../types';
import { storage } from '../utils/storage';
import { pointsCalculator } from '../utils/points';

interface AddRideProps {
  user: UserType;
  onRideAdded: () => void;
}

export const AddRide: React.FC<AddRideProps> = ({ user, onRideAdded }) => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    distance: '',
    fare: '',
    driverName: '',
    vehicleNumber: '',
    rating: 0,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const calculatePoints = () => {
    const distance = parseFloat(formData.distance) || 0;
    const fare = parseFloat(formData.fare) || 0;
    return pointsCalculator.calculatePointsForRide(distance, fare);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const distance = parseFloat(formData.distance);
      const fare = parseFloat(formData.fare);
      const pointsEarned = calculatePoints();

      const newRide: Ride = {
        id: Date.now().toString(),
        userId: user.id,
        date: new Date().toISOString(),
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        distance,
        fare,
        pointsEarned,
        driverName: formData.driverName,
        vehicleNumber: formData.vehicleNumber,
        rating: formData.rating || undefined,
      };

      // Save the ride
      storage.saveRide(newRide);

      // Update user's total points
      const updatedUser = {
        ...user,
        totalPoints: user.totalPoints + pointsEarned,
      };
      storage.saveUser(updatedUser);
      storage.setCurrentUser(updatedUser);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          pickupLocation: '',
          dropoffLocation: '',
          distance: '',
          fare: '',
          driverName: '',
          vehicleNumber: '',
          rating: 0,
        });
        onRideAdded();
      }, 2000);

    } catch (error) {
      console.error('Error adding ride:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedPoints = calculatePoints();

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Ride Added Successfully!</h2>
          <p className="text-green-700 mb-4">You earned {estimatedPoints} points for this ride.</p>
          <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Ride</h1>
        <p className="text-gray-600">Record your taxi ride to earn reward points</p>
      </div>

      {/* Points Preview */}
      {(formData.distance || formData.fare) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-1">Estimated Points</h3>
              <p className="text-yellow-700 text-sm">Based on distance and fare</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-yellow-600">+{estimatedPoints}</p>
              <p className="text-yellow-600 text-sm">points</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Route Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter pickup location"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dropoff Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400" />
              <input
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter dropoff location"
                required
              />
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance (km) *
            </label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="0.0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fare Amount ($) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="fare"
                value={formData.fare}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        {/* Driver Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter driver name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Number
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter vehicle number"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rate Your Experience
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`p-1 rounded transition-colors duration-200 ${
                  star <= formData.rating
                    ? 'text-yellow-400 hover:text-yellow-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
              >
                <Star className="h-8 w-8 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Adding Ride...</span>
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span>Add Ride & Earn Points</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};