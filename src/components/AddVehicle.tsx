import React, { useState } from 'react';
import { Car, ArrowLeft, Save } from 'lucide-react';
import { Vehicle, User } from '../types';
import { storage } from '../utils/storage';

interface AddVehicleProps {
  user: User;
  vehicle?: Vehicle | null;
  onVehicleAdded: () => void;
  onCancel: () => void;
}

export const AddVehicle: React.FC<AddVehicleProps> = ({ user, vehicle, onVehicleAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year?.toString() || '',
    licensePlate: vehicle?.licensePlate || '',
    vin: vehicle?.vin || '',
    mileage: vehicle?.mileage?.toString() || '',
    color: vehicle?.color || '',
    fuelType: vehicle?.fuelType || 'gasoline' as 'gasoline' | 'diesel' | 'electric' | 'hybrid',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.make || !formData.model || !formData.year || !formData.licensePlate || !formData.vin) {
        setError('Please fill in all required fields');
        return;
      }

      // Check for duplicate license plate or VIN (excluding current vehicle if editing)
      const existingVehicles = storage.getVehicles();
      const duplicatePlate = existingVehicles.find(v => 
        v.licensePlate.toLowerCase() === formData.licensePlate.toLowerCase() && 
        v.id !== vehicle?.id
      );
      const duplicateVin = existingVehicles.find(v => 
        v.vin.toLowerCase() === formData.vin.toLowerCase() && 
        v.id !== vehicle?.id
      );

      if (duplicatePlate) {
        setError('A vehicle with this license plate already exists');
        return;
      }

      if (duplicateVin) {
        setError('A vehicle with this VIN already exists');
        return;
      }

      const vehicleData: Vehicle = {
        id: vehicle?.id || Date.now().toString(),
        ownerId: user.id,
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        licensePlate: formData.licensePlate.toUpperCase(),
        vin: formData.vin.toUpperCase(),
        mileage: parseInt(formData.mileage) || 0,
        color: formData.color,
        fuelType: formData.fuelType,
      };

      storage.saveVehicle(vehicleData);
      onVehicleAdded();
    } catch (err) {
      setError('Failed to save vehicle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Vehicles</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h1>
        <p className="text-gray-600">
          {vehicle ? 'Update your vehicle information' : 'Register a new vehicle to track services'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Vehicle Make and Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Make *
            </label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Toyota, Ford, BMW"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Camry, F-150, X3"
              required
            />
          </div>
        </div>

        {/* Year and Color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year *
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Red, Blue, Silver"
            />
          </div>
        </div>

        {/* License Plate and VIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Plate *
            </label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-mono"
              placeholder="ABC-1234"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VIN *
            </label>
            <input
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleInputChange}
              maxLength={17}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
              placeholder="17-character VIN"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Vehicle Identification Number (17 characters)</p>
          </div>
        </div>

        {/* Mileage and Fuel Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Mileage
            </label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type
            </label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>{vehicle ? 'Updating...' : 'Adding...'}</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span>{vehicle ? 'Update Vehicle' : 'Add Vehicle'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};