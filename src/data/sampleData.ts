import { Vehicle, IssueCategory, Garage, Mechanic } from '../types';

export const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    engineType: '2.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    engineType: '1.5L Turbo',
    fuelType: 'gasoline'
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    engineType: '3.5L V6',
    fuelType: 'gasoline'
  },
  {
    id: '4',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    engineType: 'Electric Motor',
    fuelType: 'electric'
  },
  {
    id: '5',
    make: 'BMW',
    model: 'X3',
    year: 2020,
    engineType: '2.0L Turbo',
    fuelType: 'gasoline'
  }
];

export const issueCategories: IssueCategory[] = [
  {
    id: '1',
    name: 'Engine Problems',
    description: 'Issues related to engine performance, starting, or unusual noises',
    symptoms: [
      'Engine won\'t start',
      'Rough idling',
      'Loss of power',
      'Strange engine noises',
      'Check engine light',
      'Engine overheating',
      'Poor fuel economy'
    ],
    urgencyLevel: 'high',
    estimatedCost: { min: 200, max: 3000 },
    estimatedTime: 4,
    requiredSpecializations: ['Engine Repair', 'Diagnostics', 'Fuel Systems'],
    compatibleVehicles: ['gasoline', 'diesel', 'hybrid']
  },
  {
    id: '2',
    name: 'Brake System Issues',
    description: 'Problems with braking performance and safety',
    symptoms: [
      'Squeaking or grinding brakes',
      'Soft brake pedal',
      'Brake warning light',
      'Vehicle pulls to one side',
      'Vibration when braking',
      'Brake fluid leaks'
    ],
    urgencyLevel: 'critical',
    estimatedCost: { min: 150, max: 800 },
    estimatedTime: 2,
    requiredSpecializations: ['Brake Systems', 'Safety Inspections'],
    compatibleVehicles: ['gasoline', 'diesel', 'electric', 'hybrid']
  },
  {
    id: '3',
    name: 'Electrical Problems',
    description: 'Issues with electrical systems, battery, or electronics',
    symptoms: [
      'Dead battery',
      'Dim or flickering lights',
      'Electrical components not working',
      'Starting problems',
      'Alternator issues',
      'Fuse problems'
    ],
    urgencyLevel: 'medium',
    estimatedCost: { min: 100, max: 1500 },
    estimatedTime: 3,
    requiredSpecializations: ['Electrical Systems', 'Diagnostics', 'Battery Service'],
    compatibleVehicles: ['gasoline', 'diesel', 'electric', 'hybrid']
  },
  {
    id: '4',
    name: 'Transmission Issues',
    description: 'Problems with automatic or manual transmission',
    symptoms: [
      'Slipping gears',
      'Hard shifting',
      'Transmission fluid leaks',
      'Burning smell',
      'Delayed engagement',
      'Unusual transmission noises'
    ],
    urgencyLevel: 'high',
    estimatedCost: { min: 500, max: 4000 },
    estimatedTime: 6,
    requiredSpecializations: ['Transmission Repair', 'Fluid Services'],
    compatibleVehicles: ['gasoline', 'diesel', 'hybrid']
  },
  {
    id: '5',
    name: 'Air Conditioning Problems',
    description: 'Issues with heating, ventilation, and air conditioning',
    symptoms: [
      'No cold air',
      'Weak airflow',
      'Strange odors',
      'AC compressor noise',
      'Refrigerant leaks',
      'Heating not working'
    ],
    urgencyLevel: 'low',
    estimatedCost: { min: 150, max: 1200 },
    estimatedTime: 2,
    requiredSpecializations: ['HVAC Systems', 'Refrigerant Service'],
    compatibleVehicles: ['gasoline', 'diesel', 'electric', 'hybrid']
  },
  {
    id: '6',
    name: 'Suspension & Steering',
    description: 'Problems with vehicle handling and ride comfort',
    symptoms: [
      'Rough ride',
      'Vehicle pulls to one side',
      'Steering wheel vibration',
      'Unusual tire wear',
      'Clunking noises over bumps',
      'Difficulty steering'
    ],
    urgencyLevel: 'medium',
    estimatedCost: { min: 200, max: 1500 },
    estimatedTime: 3,
    requiredSpecializations: ['Suspension Systems', 'Steering Repair', 'Alignment'],
    compatibleVehicles: ['gasoline', 'diesel', 'electric', 'hybrid']
  }
];

const sampleMechanics: Mechanic[] = [
  {
    id: '1',
    name: 'Mike Rodriguez',
    specializations: ['Engine Repair', 'Diagnostics', 'Fuel Systems'],
    experience: 15,
    rating: 4.8,
    totalReviews: 127,
    certifications: ['ASE Master Technician', 'Ford Certified'],
    hourlyRate: 95,
    availability: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    specializations: ['Electrical Systems', 'Diagnostics', 'Battery Service'],
    experience: 12,
    rating: 4.9,
    totalReviews: 89,
    certifications: ['ASE Electrical Specialist', 'Tesla Certified'],
    hourlyRate: 105,
    availability: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: '3',
    name: 'David Thompson',
    specializations: ['Brake Systems', 'Safety Inspections', 'Suspension Systems'],
    experience: 20,
    rating: 4.7,
    totalReviews: 203,
    certifications: ['ASE Brake Specialist', 'State Safety Inspector'],
    hourlyRate: 85,
    availability: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 3:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: '4',
    name: 'Jennifer Walsh',
    specializations: ['Transmission Repair', 'Fluid Services', 'Diagnostics'],
    experience: 18,
    rating: 4.6,
    totalReviews: 156,
    certifications: ['ASE Automatic Transmission', 'Allison Certified'],
    hourlyRate: 110,
    availability: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  },
  {
    id: '5',
    name: 'Carlos Martinez',
    specializations: ['HVAC Systems', 'Refrigerant Service', 'Electrical Systems'],
    experience: 10,
    rating: 4.5,
    totalReviews: 78,
    certifications: ['EPA 609 Certified', 'ASE Heating & AC'],
    hourlyRate: 80,
    availability: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  }
];

export const sampleGarages: Garage[] = [
  {
    id: '1',
    name: 'Westlands Auto Service Center',
    address: 'Waiyaki Way, ABC Place',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipCode: '00100',
    phone: '+254 20 444 5678',
    email: 'info@westlandsauto.co.ke',
    website: 'www.westlandsauto.co.ke',
    rating: 4.7,
    totalReviews: 342,
    services: ['Engine Repair', 'Brake Systems', 'Electrical Systems', 'Diagnostics', 'Oil Changes'],
    mechanics: [sampleMechanics[0], sampleMechanics[1], sampleMechanics[2]],
    operatingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: '9:00 AM - 3:00 PM'
    },
    coordinates: { lat: -1.2634, lng: 36.8155 },
    images: ['https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'],
    priceRange: 'moderate',
    features: ['Towing Service', 'Warranty', 'Customer Lounge', 'M-Pesa Payments']
  },
  {
    id: '2',
    name: 'Industrial Area Motors',
    address: 'Enterprise Road, Industrial Area',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipCode: '00200',
    phone: '+254 20 555 9876',
    email: 'service@industrialmotors.co.ke',
    rating: 4.9,
    totalReviews: 189,
    services: ['Transmission Repair', 'Fluid Services', 'Diagnostics', 'Clutch Repair'],
    mechanics: [sampleMechanics[3]],
    operatingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '8:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    coordinates: { lat: -1.3197, lng: 36.8510 },
    images: ['https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'],
    priceRange: 'premium',
    features: ['Transmission Specialists', 'Warranty', 'Free Diagnostics', 'Pick & Drop']
  },
  {
    id: '3',
    name: 'Eastleigh Quick Fix',
    address: '1st Avenue, Eastleigh',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipCode: '00610',
    phone: '+254 722 345 678',
    email: 'info@eastleighquickfix.co.ke',
    rating: 4.3,
    totalReviews: 267,
    services: ['Oil Changes', 'Brake Systems', 'HVAC Systems', 'Battery Service', 'Tire Service'],
    mechanics: [sampleMechanics[2], sampleMechanics[4]],
    operatingHours: {
      monday: '7:00 AM - 7:00 PM',
      tuesday: '7:00 AM - 7:00 PM',
      wednesday: '7:00 AM - 7:00 PM',
      thursday: '7:00 AM - 7:00 PM',
      friday: '7:00 AM - 7:00 PM',
      saturday: '7:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    coordinates: { lat: -1.2921, lng: 36.8219 },
    images: ['https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'],
    priceRange: 'budget',
    features: ['Same Day Service', 'Walk-in Welcome', 'Affordable Rates', 'Local Community']
  },
  {
    id: '4',
    name: 'Karen Premium Motors',
    address: 'Karen Shopping Centre, Langata Road',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipCode: '00502',
    phone: '+254 20 888 1234',
    email: 'service@karenpremium.co.ke',
    website: 'www.karenpremium.co.ke',
    rating: 4.8,
    totalReviews: 156,
    services: ['Luxury Car Service', 'Engine Repair', 'Electrical Systems', 'Diagnostics', 'Performance Tuning'],
    mechanics: [sampleMechanics[0], sampleMechanics[1]],
    operatingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    coordinates: { lat: -1.3197, lng: 36.7073 },
    images: ['https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'],
    priceRange: 'premium',
    features: ['Luxury Car Specialists', 'Courtesy Cars', 'Extended Warranty', 'VIP Service']
  },
  {
    id: '5',
    name: 'Ngong Road Auto Care',
    address: 'Ngong Road, Opposite Prestige Plaza',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipCode: '00100',
    phone: '+254 733 456 789',
    email: 'care@ngongroadauto.co.ke',
    rating: 4.5,
    totalReviews: 298,
    services: ['General Maintenance', 'Brake Systems', 'Suspension Systems', 'Tire Service', 'Battery Service'],
    mechanics: [sampleMechanics[2], sampleMechanics[4]],
    operatingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: '10:00 AM - 2:00 PM'
    },
    coordinates: { lat: -1.3028, lng: 36.7834 },
    images: ['https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'],
    priceRange: 'moderate',
    features: ['Family Owned', 'Honest Pricing', 'Quality Parts', 'Customer Care']
  },
  {
    id: '6',
    name: 'Thika Road Motors',
    address: 'Thika Super Highway, Kasarani',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipCode: '00618',
    phone: '+254 711 234 567',
    email: 'service@thikaroadmotors.co.ke',
    rating: 4.4,
    totalReviews: 187,
    services: ['Engine Repair', 'Transmission Service', 'Electrical Systems', 'AC Service', 'Diagnostics'],
    mechanics: [sampleMechanics[0], sampleMechanics[3]],
    operatingHours: {
      monday: '7:30 AM - 6:30 PM',
      tuesday: '7:30 AM - 6:30 PM',
      wednesday: '7:30 AM - 6:30 PM',
      thursday: '7:30 AM - 6:30 PM',
      friday: '7:30 AM - 6:30 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    coordinates: { lat: -1.2167, lng: 36.8833 },
    images: ['https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg'],
    priceRange: 'moderate',
    features: ['Highway Access', 'Large Workshop', 'Modern Equipment', 'Fast Service']
  }
];