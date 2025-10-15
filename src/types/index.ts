export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  engineType: string;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
}

export interface IssueCategory {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost: {
    min: number;
    max: number;
  };
  estimatedTime: number; // in hours
  requiredSpecializations: string[];
  compatibleVehicles: string[]; // vehicle types that commonly have this issue
}

export interface Mechanic {
  id: string;
  name: string;
  specializations: string[];
  experience: number; // years
  rating: number;
  totalReviews: number;
  certifications: string[];
  hourlyRate: number;
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  profileImage?: string;
}

export interface Garage {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  totalReviews: number;
  services: string[];
  mechanics: Mechanic[];
  operatingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  priceRange: 'budget' | 'moderate' | 'premium';
  features: string[]; // e.g., "24/7 Service", "Towing Available", "Warranty"
}

export interface SearchResult {
  garage: Garage;
  matchingMechanics: Mechanic[];
  matchScore: number; // 0-100 based on specialization match
  estimatedCost: {
    min: number;
    max: number;
  };
  distance?: number; // in miles
  distance?: number; // in kilometers
}

export interface SearchFilters {
  maxDistance: number;
  priceRange: string[];
  minRating: number;
  availability: string; // 'today', 'this_week', 'anytime'
  features: string[];
}