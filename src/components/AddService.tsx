import React, { useState } from 'react';
import { Wrench, Car, User, DollarSign, Clock, Plus, ArrowLeft } from 'lucide-react';
import { Service, User as UserType, ServicePart } from '../types';
import { storage } from '../utils/storage';
import { pointsCalculator } from '../utils/points';

interface AddServiceProps {
  user: UserType;
  onServiceAdded: () => void;
  onCancel: () => void;
}

export const AddService: React.FC<AddServiceProps> = ({ user, onServiceAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    ownerId: '',
    serviceType: '',
    description: '',
    cost: '',
    estimatedDuration: '',
    actualDuration: '',
    status: 'completed' as 'pending' | 'in_progress' | 'completed',
  });
  
  const [parts, setParts] = useState<ServicePart[]>([]);
  const [newPart, setNewPart] = useState({ name: '', cost: '', quantity: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vehicles = storage.getVehicles();
  const vehicleOwners = storage.getVehicleOwners();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPart = () => {
    if (newPart.name && newPart.cost && newPart.quantity) {
      const part: ServicePart = {
        id: Date.now().toString(),
        name: newPart.name,
        cost: parseFloat(newPart.cost),
        quantity: parseInt(newPart.quantity),
      };
      setParts([...parts, part]);
      setNewPart({ name: '', cost: '', quantity: '' });
    }
  };

  const handleRemovePart = (partId: string) => {
    setParts(parts.filter(p => p.id !== partId));
  };

  const calculateTotalCost = () => {
    const serviceCost = parseFloat(formData.cost) || 0;
    const partsCost = parts.reduce((sum, part) => sum + (part.cost * part.quantity), 0);
    return serviceCost + partsCost;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const totalCost = calculateTotalCost();
      const mechanicPoints = pointsCalculator.calculateMechanicPoints(
        { ...formData, cost: totalCost } as Service,
        5 // Default rating for new services
      );
      const ownerPoints = pointsCalculator.calculateOwnerPoints(
        { ...formData, cost: totalCost } as Service,
        5 // Default rating for new services
      );

      const newService: Service = {
        id: Date.now().toString(),
        vehicleId: formData.vehicleId,
        mechanicId: user.id,
        ownerId: formData.ownerId,
        serviceType: formData.serviceType,
        description: formData.description,
        cost: totalCost,
        date: new Date().toISOString(),
        status: formData.status,
        pointsEarnedMechanic: mechanicPoints,
        pointsEarnedOwner: ownerPoints,
        estimatedDuration: parseFloat(formData.estimatedDuration),
        actualDuration: formData.actualDuration ? parseFloat(formData.actualDuration) : undefined,
        partsUsed: parts.length > 0 ? parts : undefined,
      };

      // Save the service
      storage.saveService(newService);

      // Update mechanic's points
      const updatedMechanic = {
        ...user,
        totalPoints: user.totalPoints + mechanicPoints,
        rank: pointsCalculator.calculateRank(user.totalPoints + mechanicPoints, 'mechanic'),
      };
      storage.saveUser(updatedMechanic);
      storage.setCurrentUser(updatedMechanic);

      // Update owner's points
      const owner = storage.getUserById(formData.ownerId);
      if (owner) {
        const updatedOwner = {
          ...owner,
          totalPoints: owner.totalPoints + ownerPoints,
          rank: pointsCalculator.calculateRank(owner.totalPoints + ownerPoints, 'vehicle_owner'),
        };
        storage.saveUser(updatedOwner);
      }

      onServiceAdded();
    } catch (error) {
      console.error('Error adding service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Services</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Service</h1>
        <p className="text-gray-600">Record a completed service to earn points</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Vehicle and Owner Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle *
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.licensePlate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Owner *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="ownerId"
                value={formData.ownerId}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select owner</option>
                {vehicleOwners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name} - {owner.email}
                  </option>
                ))}
              </select>
            </div>
            {selectedVehicle && (
              <p className="text-sm text-gray-500 mt-1">
                Auto-select owner: {vehicleOwners.find(o => o.id === selectedVehicle.ownerId)?.name}
              </p>
            )}
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type *
            </label>
            <div className="relative">
              <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select service type</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Brake Service">Brake Service</option>
                <option value="Engine Repair">Engine Repair</option>
                <option value="Transmission Service">Transmission Service</option>
                <option value="Electrical Repair">Electrical Repair</option>
                <option value="Tire Service">Tire Service</option>
                <option value="AC Service">AC Service</option>
                <option value="General Maintenance">General Maintenance</option>
                <option value="Diagnostic">Diagnostic</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            placeholder="Describe the work performed..."
            required
          />
        </div>

        {/* Cost and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labor Cost ($) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration (hours) *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleInputChange}
                step="0.5"
                min="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="0.0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Actual Duration (hours)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="actualDuration"
                value={formData.actualDuration}
                onChange={handleInputChange}
                step="0.5"
                min="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="0.0"
              />
            </div>
          </div>
        </div>

        {/* Parts Used */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Parts Used (Optional)</h3>
          
          {/* Add New Part */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={newPart.name}
              onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
              placeholder="Part name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="number"
              value={newPart.cost}
              onChange={(e) => setNewPart({ ...newPart, cost: e.target.value })}
              placeholder="Cost per unit"
              step="0.01"
              min="0"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="number"
              value={newPart.quantity}
              onChange={(e) => setNewPart({ ...newPart, quantity: e.target.value })}
              placeholder="Quantity"
              min="1"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={handleAddPart}
              className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Parts List */}
          {parts.length > 0 && (
            <div className="space-y-2">
              {parts.map((part) => (
                <div key={part.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <span className="font-medium">{part.name}</span>
                    <span className="text-gray-600 ml-2">
                      ${part.cost} × {part.quantity} = ${(part.cost * part.quantity).toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePart(part.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="text-right font-semibold">
                Parts Total: ${parts.reduce((sum, part) => sum + (part.cost * part.quantity), 0).toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Total Cost Display */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-orange-900 mb-1">Total Service Cost</h3>
              <p className="text-orange-700 text-sm">Labor + Parts</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-600">${calculateTotalCost().toFixed(2)}</p>
              <p className="text-orange-600 text-sm">
                Est. Points: +{pointsCalculator.calculateMechanicPoints({ cost: calculateTotalCost() } as Service, 5)}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Adding Service...</span>
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span>Add Service & Earn Points</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};