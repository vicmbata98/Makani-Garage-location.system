import React from 'react';
import { MapPin, Phone, Star, Clock, DollarSign, Award, Users } from 'lucide-react';
import { SearchResult } from '../types';

interface GarageCardProps {
  result: SearchResult;
  onViewDetails: (garageId: string) => void;
}

export const GarageCard: React.FC<GarageCardProps> = ({ result, onViewDetails }) => {
  const { garage, matchingMechanics, matchScore, estimatedCost } = result;

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'budget': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{garage.name}</h3>
            <div className={`w-3 h-3 rounded-full ${getMatchScoreColor(matchScore)}`} title={`${matchScore.toFixed(0)}% match`}></div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{garage.address}, {garage.city}, {garage.state}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-1" />
            <span className="text-sm">{garage.phone}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="font-semibold">{garage.rating}</span>
            <span className="text-gray-500 text-sm ml-1">({garage.totalReviews})</span>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriceRangeColor(garage.priceRange)}`}>
            {garage.priceRange}
          </span>
        </div>
      </div>

      {/* Matching Mechanics */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Users className="h-4 w-4 text-gray-600 mr-1" />
          <span className="text-sm font-medium text-gray-700">
            {matchingMechanics.length} Qualified Mechanic{matchingMechanics.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="space-y-2">
          {matchingMechanics.slice(0, 2).map((mechanic) => (
            <div key={mechanic.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{mechanic.name}</p>
                <p className="text-sm text-gray-600">
                  {mechanic.experience} years • {mechanic.specializations.slice(0, 2).join(', ')}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{mechanic.rating}</span>
                </div>
                <p className="text-xs text-gray-500">KES {mechanic.hourlyRate.toLocaleString()}/hr</p>
              </div>
            </div>
          ))}
          
          {matchingMechanics.length > 2 && (
            <p className="text-sm text-gray-500 text-center">
              +{matchingMechanics.length - 2} more qualified mechanics
            </p>
          )}
        </div>
      </div>

      {/* Services and Features */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
        <div className="flex flex-wrap gap-2">
          {garage.services.slice(0, 4).map((service, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {service}
            </span>
          ))}
          {garage.services.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{garage.services.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      {garage.features.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
          <div className="flex flex-wrap gap-2">
            {garage.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {feature}
              </span>
            ))}
            {garage.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{garage.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Estimated Cost and Hours */}
      <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
          <span className="text-sm font-medium text-blue-900">
            Estimated: KES {estimatedCost.min.toLocaleString()} - {estimatedCost.max.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-blue-600 mr-1" />
          <span className="text-sm text-blue-700">
            {garage.operatingHours[new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof garage.operatingHours]}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onViewDetails(garage.id)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          View Details
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Call Now
        </button>
      </div>
    </div>
  );
};