import React, { useState } from 'react';
import { Wrench, Plus, Star, Calendar, DollarSign, Clock, User, Car } from 'lucide-react';
import { User as UserType, Service } from '../types';
import { storage } from '../utils/storage';
import { AddService } from './AddService';

interface ServicesProps {
  user: UserType;
  onViewChange: (view: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ user, onViewChange }) => {
  const [showAddService, setShowAddService] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const services = storage.getServices(user.id, user.userType);
  const filteredServices = services.filter(service => 
    filterStatus === 'all' || service.status === filterStatus
  );

  const handleServiceAdded = () => {
    setShowAddService(false);
    // Refresh the component by forcing a re-render
    window.location.reload();
  };

  const handleRateService = (serviceId: string, rating: number, review: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    const updatedService = { ...service };
    
    if (user.userType === 'mechanic') {
      updatedService.mechanicRating = rating;
      updatedService.mechanicReview = review;
    } else {
      updatedService.ownerRating = rating;
      updatedService.ownerReview = review;
    }

    storage.saveService(updatedService);
    setSelectedService(null);
    window.location.reload();
  };

  if (showAddService) {
    return <AddService user={user} onServiceAdded={handleServiceAdded} onCancel={() => setShowAddService(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services</h1>
          <p className="text-gray-600">
            {user.userType === 'mechanic' 
              ? 'Manage your service records and track performance'
              : 'View your service history and manage requests'
            }
          </p>
        </div>
        
        {user.userType === 'mechanic' && (
          <button
            onClick={() => setShowAddService(true)}
            className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add Service</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'in_progress', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filterStatus === status
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      {filteredServices.length > 0 ? (
        <div className="space-y-6">
          {filteredServices.map((service) => {
            const vehicle = storage.getVehicleById(service.vehicleId);
            const mechanic = storage.getUserById(service.mechanicId);
            const owner = storage.getUserById(service.ownerId);
            
            return (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.serviceType}</h3>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        service.status === 'completed' ? 'bg-green-100 text-green-800' :
                        service.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {service.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Car className="h-4 w-4" />
                        <span>{vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{user.userType === 'mechanic' ? owner?.name : mechanic?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(service.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>${service.cost}</span>
                      </div>
                    </div>

                    {service.actualDuration && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {service.actualDuration}h (Est. {service.estimatedDuration}h)</span>
                      </div>
                    )}

                    {/* Ratings */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {service.mechanicRating && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Mechanic Rating:</span>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < service.mechanicRating! ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({service.mechanicRating})</span>
                        </div>
                      )}
                      
                      {service.ownerRating && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Customer Rating:</span>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < service.ownerRating! ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({service.ownerRating})</span>
                        </div>
                      )}
                    </div>

                    {/* Reviews */}
                    {(service.mechanicReview || service.ownerReview) && (
                      <div className="mt-4 space-y-2">
                        {service.mechanicReview && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">Mechanic Review:</p>
                            <p className="text-sm text-blue-700">{service.mechanicReview}</p>
                          </div>
                        )}
                        {service.ownerReview && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-green-900">Customer Review:</p>
                            <p className="text-sm text-green-700">{service.ownerReview}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">
                        +{user.userType === 'mechanic' ? service.pointsEarnedMechanic : service.pointsEarnedOwner}
                      </p>
                      <p className="text-sm text-gray-500">points earned</p>
                    </div>

                    {service.status === 'completed' && (
                      <div className="flex flex-col gap-2">
                        {user.userType === 'mechanic' && !service.mechanicRating && (
                          <button
                            onClick={() => setSelectedService(service)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                          >
                            Rate Customer
                          </button>
                        )}
                        {user.userType === 'vehicle_owner' && !service.ownerRating && (
                          <button
                            onClick={() => setSelectedService(service)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                          >
                            Rate Service
                          </button>
                        )}
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
          <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-500 mb-6">
            {user.userType === 'mechanic' 
              ? 'Start adding services to track your work and earn points'
              : 'No services in your history yet'
            }
          </p>
          {user.userType === 'mechanic' && (
            <button
              onClick={() => setShowAddService(true)}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              Add Your First Service
            </button>
          )}
        </div>
      )}

      {/* Rating Modal */}
      {selectedService && (
        <RatingModal
          service={selectedService}
          user={user}
          onRate={handleRateService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

// Rating Modal Component
interface RatingModalProps {
  service: Service;
  user: UserType;
  onRate: (serviceId: string, rating: number, review: string) => void;
  onClose: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ service, user, onRate, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onRate(service.id, rating, review);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {user.userType === 'mechanic' ? 'Rate Customer' : 'Rate Service'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 rounded transition-colors duration-200 ${
                    star <= rating
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review (Optional)</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={3}
              placeholder="Share your experience..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50"
            >
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};