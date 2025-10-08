import React from 'react';
import { Filter, Star, DollarSign, Clock } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  isVisible,
  onToggle
}) => {
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    const newPriceRange = checked
      ? [...filters.priceRange, range]
      : filters.priceRange.filter(r => r !== range);
    handleFilterChange('priceRange', newPriceRange);
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const newFeatures = checked
      ? [...filters.features, feature]
      : filters.features.filter(f => f !== feature);
    handleFilterChange('features', newFeatures);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Filters</span>
        </div>
        <span className="text-gray-400">
          {isVisible ? '−' : '+'}
        </span>
      </button>

      {isVisible && (
        <div className="p-4 border-t border-gray-100 space-y-6">
          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Star className="inline h-4 w-4 mr-1" />
              Minimum Rating
            </label>
            <div className="flex space-x-2">
              {[3, 3.5, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('minRating', rating)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filters.minRating === rating
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Price Range
            </label>
            <div className="space-y-2">
              {[
                { value: 'budget', label: 'Budget-Friendly' },
                { value: 'moderate', label: 'Moderate' },
                { value: 'premium', label: 'Premium' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.priceRange.includes(option.value)}
                    onChange={(e) => handlePriceRangeChange(option.value, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Clock className="inline h-4 w-4 mr-1" />
              Availability
            </label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="anytime">Anytime</option>
              <option value="today">Available Today</option>
              <option value="this_week">This Week</option>
            </select>
          </div>

          {/* Features Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Special Features
            </label>
            <div className="space-y-2">
              {[
                '24/7 Towing',
                'Warranty',
                'Shuttle Service',
                'Online Booking',
                'Same Day Service',
                'Loaner Cars'
              ].map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature)}
                    onChange={(e) => handleFeatureChange(feature, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => onFiltersChange({
              maxDistance: 25,
              priceRange: [],
              minRating: 0,
              availability: 'anytime',
              features: []
            })}
            className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};