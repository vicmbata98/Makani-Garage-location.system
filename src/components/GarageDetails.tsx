import React from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Clock, Award, Users, DollarSign } from 'lucide-react';
import { Garage } from '../types';

interface GarageDetailsProps {
  garage: Garage;
  onBack: () => void;
}

export const GarageDetails: React.FC<GarageDetailsProps> = ({ garage, onBack }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' }) as keyof typeof garage.operatingHours;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Results</span>
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{garage.name}</h1>
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{garage.address}, {garage.city}, {garage.state} {garage.zipCode}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-300 fill-current" />
                  <span>{garage.rating} ({garage.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {garage.priceRange.charAt(0).toUpperCase() + garage.priceRange.slice(1)} Pricing
              </div>
              <div className="text-blue-100 text-sm">
                Open Today: {garage.operatingHours[today]}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{garage.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{garage.email}</p>
              </div>
            </div>
            {garage.website && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Globe className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <p className="font-medium text-blue-600">{garage.website}</p>
                </div>
              </div>
            )}
          </div>

          {/* Operating Hours */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Operating Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(garage.operatingHours).map(([day, hours]) => (
                <div key={day} className={`flex justify-between p-3 rounded-lg ${
                  day === today ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}>
                  <span className="font-medium capitalize">{day}</span>
                  <span className={day === today ? 'text-blue-700 font-medium' : 'text-gray-600'}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {garage.services.map((service, idx) => (
                <div key={idx} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Award className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {garage.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {garage.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-sm font-medium text-green-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mechanics */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Our Mechanics ({garage.mechanics.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {garage.mechanics.map((mechanic) => (
                <div key={mechanic.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{mechanic.name}</h4>
                      <p className="text-gray-600">{mechanic.experience} years experience</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{mechanic.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({mechanic.totalReviews})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-3 w-3 mr-1" />
                        <span>${mechanic.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                    <div className="flex flex-wrap gap-2">
                      {mechanic.specializations.map((spec, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {mechanic.certifications.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Certifications:</p>
                      <div className="flex flex-wrap gap-2">
                        {mechanic.certifications.map((cert, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Book Appointment
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
              Call {garage.phone}
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};