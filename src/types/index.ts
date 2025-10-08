export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'mechanic' | 'vehicle_owner';
  totalPoints: number;
  rank: number;
  memberSince: string;
  avatar?: string;
  // Mechanic specific
  specializations?: string[];
  yearsExperience?: number;
  certifications?: string[];
  // Vehicle owner specific
  vehicles?: Vehicle[];
}

export interface Vehicle {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  mileage: number;
  color: string;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
}

export interface Service {
  id: string;
  vehicleId: string;
  mechanicId: string;
  ownerId: string;
  serviceType: string;
  description: string;
  cost: number;
  date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  mechanicRating?: number;
  ownerRating?: number;
  mechanicReview?: string;
  ownerReview?: string;
  pointsEarnedMechanic: number;
  pointsEarnedOwner: number;
  estimatedDuration: number; // in hours
  actualDuration?: number; // in hours
  partsUsed?: ServicePart[];
}

export interface ServicePart {
  id: string;
  name: string;
  cost: number;
  quantity: number;
}

export interface Appointment {
  id: string;
  vehicleId: string;
  mechanicId: string;
  ownerId: string;
  scheduledDate: string;
  serviceType: string;
  description: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  estimatedCost: number;
  estimatedDuration: number;
}

export type ViewType = 
  | 'dashboard' 
  | 'services' 
  | 'add-service' 
  | 'vehicles' 
  | 'add-vehicle'
  | 'appointments'
  | 'schedule-appointment'
  | 'rankings'
  | 'profile' 
  | 'login' 
  | 'register';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}