import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader, AlertCircle } from 'lucide-react';

interface LocationFinderProps {
  onLocationSelected: (location: { lat: number; lng: number; address: string }) => void;
  selectedLocation?: { lat: number; lng: number; address: string } | null;
}

export const LocationFinder: React.FC<LocationFinderProps> = ({ 
  onLocationSelected, 
  selectedLocation 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get address (using a mock implementation)
          const address = await reverseGeocode(latitude, longitude);
          
          onLocationSelected({
            lat: latitude,
            lng: longitude,
            address: address
          });
        } catch (err) {
          console.error('Error getting address:', err);
          onLocationSelected({
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          });
        }
        
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Mock reverse geocoding - in a real app, you'd use Google Maps API, Mapbox, or similar
    const nairobiAreas = [
      'Westlands, Nairobi',
      'Karen, Nairobi',
      'Eastleigh, Nairobi',
      'Industrial Area, Nairobi',
      'CBD, Nairobi',
      'Kilimani, Nairobi',
      'Lavington, Nairobi',
      'Parklands, Nairobi',
      'South B, Nairobi',
      'South C, Nairobi',
      'Kasarani, Nairobi',
      'Embakasi, Nairobi'
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a random Nairobi area for demo purposes
    return nairobiAreas[Math.floor(Math.random() * nairobiAreas.length)];
  };

  const handleManualLocationSubmit = async () => {
    if (!manualAddress.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Mock geocoding - convert address to coordinates
      const coordinates = await geocodeAddress(manualAddress);
      
      onLocationSelected({
        lat: coordinates.lat,
        lng: coordinates.lng,
        address: manualAddress
      });
      
      setShowManualInput(false);
      setManualAddress('');
    } catch (err) {
      setError('Could not find the specified location');
    }
    
    setIsLoading(false);
  };

  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
    // Mock geocoding - in a real app, you'd use Google Maps Geocoding API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return coordinates within Nairobi bounds
    return {
      lat: -1.2921 + (Math.random() - 0.5) * 0.1, // Nairobi latitude ± 0.05
      lng: 36.8219 + (Math.random() - 0.5) * 0.1  // Nairobi longitude ± 0.05
    };
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Your Location
      </label>
      
      {!selectedLocation && !showManualInput && (
        <div className="space-y-3">
          <button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Getting your location...</span>
              </>
            ) : (
              <>
                <Navigation className="h-5 w-5" />
                <span>Use My Current Location</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setShowManualInput(true)}
            className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
          >
            Enter Location Manually
          </button>
        </div>
      )}

      {showManualInput && (
        <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900">Enter Your Location</h4>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              placeholder="e.g., Westlands, Nairobi or Karen Shopping Centre"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onKeyPress={(e) => e.key === 'Enter' && handleManualLocationSubmit()}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleManualLocationSubmit}
              disabled={isLoading || !manualAddress.trim()}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Finding...' : 'Set Location'}
            </button>
            <button
              onClick={() => {
                setShowManualInput(false);
                setManualAddress('');
                setError('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedLocation && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Location Set</p>
                <p className="text-sm text-green-700">{selectedLocation.address}</p>
                <p className="text-xs text-green-600 mt-1">
                  {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onLocationSelected(null as any);
                setError('');
              }}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 text-sm font-medium">Location Error</p>
            <p className="text-red-700 text-sm">{error}</p>
            <button
              onClick={() => setShowManualInput(true)}
              className="text-red-600 hover:text-red-800 text-sm font-medium mt-1"
            >
              Enter location manually instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};