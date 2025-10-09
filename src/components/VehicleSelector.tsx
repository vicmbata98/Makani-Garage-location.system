import React from 'react';
import { Car, Search } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: string;
  onVehicleChange: (vehicleId: string) => void;
  onCustomVehicle?: (vehicleInfo: { make: string; model: string; year: string }) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicle,
  onVehicleChange,
  onCustomVehicle
}) => {
  const [inputMode, setInputMode] = React.useState(false);
  const [customVehicle, setCustomVehicle] = React.useState({
    make: '',
    model: '',
    year: ''
  });
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle =>
    `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomVehicleSubmit = () => {
    if (customVehicle.make && customVehicle.model && customVehicle.year) {
      onCustomVehicle?.(customVehicle);
      setInputMode(false);
      setCustomVehicle({ make: '', model: '', year: '' });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Your Vehicle
      </label>
      
      {!inputMode ? (
        <div className="space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for your vehicle..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Vehicle Dropdown */}
          <div className="relative">
            <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedVehicle}
              onChange={(e) => onVehicleChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="">Choose your vehicle</option>
              {filteredVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.engineType})
                </option>
              ))}
            </select>
          </div>

          {/* Custom Vehicle Button */}
          <button
            type="button"
            onClick={() => setInputMode(true)}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm"
          >
            Don't see your vehicle? Add it manually
          </button>
        </div>
      ) : (
        <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900">Add Your Vehicle</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={customVehicle.make}
              onChange={(e) => setCustomVehicle({ ...customVehicle, make: e.target.value })}
              placeholder="Make (e.g., Toyota)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              value={customVehicle.model}
              onChange={(e) => setCustomVehicle({ ...customVehicle, model: e.target.value })}
              placeholder="Model (e.g., Vitz)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={customVehicle.year}
              onChange={(e) => setCustomVehicle({ ...customVehicle, year: e.target.value })}
              placeholder="Year"
              min="1990"
              max={new Date().getFullYear() + 1}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCustomVehicleSubmit}
              disabled={!customVehicle.make || !customVehicle.model || !customVehicle.year}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Add Vehicle
            </button>
            <button
              type="button"
              onClick={() => {
                setInputMode(false);
                setCustomVehicle({ make: '', model: '', year: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};