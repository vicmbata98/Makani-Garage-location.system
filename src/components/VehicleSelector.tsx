import React from 'react';
import { Car } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: string;
  onVehicleChange: (vehicleId: string) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicle,
  onVehicleChange
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Your Vehicle
      </label>
      <div className="relative">
        <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={selectedVehicle}
          onChange={(e) => onVehicleChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
        >
          <option value="">Choose your vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.engineType})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};