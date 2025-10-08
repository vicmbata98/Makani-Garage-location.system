import React, { useState } from 'react';
import { Car, Plus, Edit3, Trash2, Fuel, Calendar, Gauge } from 'lucide-react';
import { User, Vehicle } from '../types';
import { storage } from '../utils/storage';
import { AddVehicle } from './AddVehicle';

interface VehiclesProps {
  user: User;
}

export const Vehicles: React.FC<VehiclesProps> = ({ user }) => {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const vehicles = storage.getVehicles(user.id);

  const handleVehicleAdded = () => {
    setShowAddVehicle(false);
    setEditingVehicle(null);
    window.location.reload();
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    storage.deleteVehicle(vehicleId);
    setShowDeleteConfirm(null);
    window.location.reload();
  };

  const getFuelTypeIcon = (fuelType: string) => {
    switch (fuelType) {
      case 'electric': return '⚡';
      case 'hybrid': return '🔋';
      case 'diesel': return '⛽';
      default: return '⛽';
    }
  };

  const getFuelTypeColor = (fuelType: string) => {
    switch (fuelType) {
      case 'electric': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-blue-100 text-blue-800';
      case 'diesel': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showAddVehicle || editingVehicle) {
    return (
      <AddVehicle
        user={user}
        vehicle={editingVehicle}
        onVehicleAdded={handleVehicleAdded}
        onCancel={() => {
          setShowAddVehicle(false);
          setEditingVehicle(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Vehicles</h1>
          <p className="text-gray-600">Manage your vehicle fleet and service history</p>
        </div>
        
        <button
          onClick={() => setShowAddVehicle(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
        >
          <Plus className="h-5 w-5" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => {
            const services = storage.getServices().filter(s => s.vehicleId === vehicle.id);
            const lastService = services.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            
            return (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.color}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingVehicle(vehicle)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(vehicle.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">License Plate</span>
                    <span className="font-medium text-gray-900">{vehicle.licensePlate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">VIN</span>
                    <span className="font-mono text-xs text-gray-900">{vehicle.vin}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      Mileage
                    </span>
                    <span className="font-medium text-gray-900">{vehicle.mileage.toLocaleString()} mi</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      Fuel Type
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFuelTypeColor(vehicle.fuelType)}`}>
                      {getFuelTypeIcon(vehicle.fuelType)} {vehicle.fuelType}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Services</p>
                      <p className="font-semibold text-gray-900">{services.length} total</p>
                    </div>
                    {lastService && (
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Last Service</p>
                        <p className="text-xs text-gray-500">
                          {new Date(lastService.date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles registered</h3>
          <p className="text-gray-500 mb-6">Add your first vehicle to start tracking services and maintenance</p>
          <button
            onClick={() => setShowAddVehicle(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            Add Your First Vehicle
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Vehicle</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this vehicle? This action cannot be undone and will remove all associated service records.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteVehicle(showDeleteConfirm)}
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