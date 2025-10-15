import React, { useState } from 'react';
import { Header } from './components/Header';
import { VehicleSelector } from './components/VehicleSelector';
import { IssueSelector } from './components/IssueSelector';
import { SearchFiltersComponent } from './components/SearchFilters';
import { LocationFinder } from './components/LocationFinder';
import { GarageCard } from './components/GarageCard';
import { GarageDetails } from './components/GarageDetails';
import { allKenyanVehicles, issueCategories, sampleGarages } from './data/sampleData';
import { GarageSearchEngine } from './utils/searchEngine';
import { calculateDistance, formatDistance, formatTravelTime, calculateTravelTime } from './utils/distanceCalculator';
import { SearchResult, SearchFilters, Garage } from './types';
import { Search, MapPin } from 'lucide-react';

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [customVehicleInfo, setCustomVehicleInfo] = useState<{make: string; model: string; year: string} | null>(null);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number; address: string} | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    maxDistance: 25,
    priceRange: [],
    minRating: 0,
    availability: 'anytime',
    features: []
  });

  const searchEngine = new GarageSearchEngine(sampleGarages, issueCategories);

  const handleSearch = async () => {
    if (!selectedIssue) return;

    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const vehicle = selectedVehicle 
      ? allKenyanVehicles.find(v => v.id === selectedVehicle)
      : customVehicleInfo 
        ? { 
            id: 'custom', 
            make: customVehicleInfo.make, 
            model: customVehicleInfo.model, 
            year: parseInt(customVehicleInfo.year),
            engineType: 'Unknown',
            fuelType: 'gasoline' as const
          }
        : undefined;
        
    let results = searchEngine.searchByIssue(selectedIssue, vehicle, filters);
    
    // Add distance information if user location is available
    if (userLocation) {
      results = results.map(result => ({
        ...result,
        distance: calculateDistance(userLocation, result.garage.coordinates)
      }));
      
      // Sort by distance if location is available
      results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleCustomVehicle = (vehicleInfo: {make: string; model: string; year: string}) => {
    setCustomVehicleInfo(vehicleInfo);
    setSelectedVehicle(''); // Clear dropdown selection
  };

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setCustomVehicleInfo(null); // Clear custom vehicle
  };

  const handleViewGarageDetails = (garageId: string) => {
    const garage = sampleGarages.find(g => g.id === garageId);
    if (garage) {
      setSelectedGarage(garage);
    }
  };

  const handleBackToResults = () => {
    setSelectedGarage(null);
  };

  if (selectedGarage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <GarageDetails garage={selectedGarage} onBack={handleBackToResults} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Right Garage & Mechanic
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get matched with qualified mechanics and trusted garages based on your specific vehicle issue. 
            Compare prices, ratings, and specializations to make the best choice.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <LocationFinder
              onLocationSelected={setUserLocation}
              selectedLocation={userLocation}
            />
            
            <VehicleSelector
              vehicles={allKenyanVehicles}
              selectedVehicle={selectedVehicle}
              onVehicleChange={handleVehicleChange}
              onCustomVehicle={handleCustomVehicle}
            />
            
            <IssueSelector
              issues={issueCategories}
              selectedIssue={selectedIssue}
              onIssueChange={setSelectedIssue}
            />
            
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={(!selectedIssue || (!selectedVehicle && !customVehicleInfo)) || isSearching}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Find Garages</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Show selected vehicle info */}
          {(selectedVehicle || customVehicleInfo) && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Selected Vehicle:</strong> {
                  selectedVehicle 
                    ? (() => {
                        const vehicle = allKenyanVehicles.find(v => v.id === selectedVehicle);
                        return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown';
                      })()
                    : customVehicleInfo 
                      ? `${customVehicleInfo.year} ${customVehicleInfo.make} ${customVehicleInfo.model}`
                      : 'None'
                }
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <SearchFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              isVisible={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Found {searchResults.length} Matching Garage{searchResults.length !== 1 ? 's' : ''}
                {userLocation && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    near {userLocation.address}
                  </span>
                )}
              </h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {userLocation ? 'Sorted by distance' : 'Sorted by relevance and rating'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {searchResults.map((result) => (
                <GarageCard
                  key={result.garage.id}
                  result={result}
                  onViewDetails={handleViewGarageDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchResults.length === 0 && selectedIssue && !isSearching && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Garages Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any garages that specialize in your selected issue. 
              Try adjusting your filters or selecting a different issue.
            </p>
            <button
              onClick={() => {
                setFilters({
                  maxDistance: 25,
                  priceRange: [],
                  minRating: 0,
                  availability: 'anytime',
                  features: []
                });
                handleSearch();
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters & Search Again
            </button>
          </div>
        )}

        {/* Getting Started */}
        {!selectedIssue && searchResults.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Select Your Vehicle</h4>
                <p className="text-sm text-gray-600">Choose your car make, model, and year to get accurate recommendations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Describe the Issue</h4>
                <p className="text-sm text-gray-600">Tell us what's wrong with your car to find specialized mechanics</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Get Matched</h4>
                <p className="text-sm text-gray-600">See qualified garages and mechanics with ratings, prices, and availability</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;