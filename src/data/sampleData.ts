import { Vehicle, IssueCategory, Garage, Mechanic } from '../types';

export const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Vitz',
    year: 2018,
    engineType: '1.0L 3-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Probox',
    year: 2017,
    engineType: '1.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '3',
    make: 'Toyota',
    model: 'Fielder',
    year: 2019,
    engineType: '1.5L 4-Cylinder',
    fuelType: 'hybrid'
  },
  {
    id: '4',
    make: 'Nissan',
    model: 'Note',
    year: 2016,
    engineType: '1.2L 3-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '5',
    make: 'Nissan',
    model: 'X-Trail',
    year: 2020,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '6',
    make: 'Honda',
    model: 'Fit',
    year: 2017,
    engineType: '1.3L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '7',
    make: 'Subaru',
    model: 'Forester',
    year: 2019,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '8',
    make: 'Mazda',
    model: 'Demio',
    year: 2016,
    engineType: '1.3L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '9',
    make: 'Mitsubishi',
    model: 'Outlander',
    year: 2018,
    engineType: '2.4L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '10',
    make: 'Suzuki',
    model: 'Swift',
    year: 2019,
    engineType: '1.2L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '11',
    make: 'Isuzu',
    model: 'D-Max',
    year: 2020,
    engineType: '2.5L Diesel',
    fuelType: 'diesel'
  },
  {
    id: '12',
    make: 'Toyota',
    model: 'Hilux',
    year: 2021,
    engineType: '2.4L Diesel',
    fuelType: 'diesel'
  },
  {
    id: '13',
    make: 'Toyota',
    model: 'Prius',
    year: 2018,
    engineType: '1.8L Hybrid',
    fuelType: 'hybrid'
  },
  {
    id: '14',
    make: 'Volkswagen',
    model: 'Polo',
    year: 2017,
    engineType: '1.4L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '15',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2019,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  }
];

// Additional popular vehicles in Kenya
export const additionalKenyanVehicles: Vehicle[] = [
  // More Toyota models
  {
    id: '16',
    make: 'Toyota',
    model: 'Corolla',
    year: 2019,
    engineType: '1.8L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '17',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    engineType: '2.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '18',
    make: 'Toyota',
    model: 'RAV4',
    year: 2018,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '19',
    make: 'Toyota',
    model: 'Land Cruiser',
    year: 2017,
    engineType: '4.0L V6',
    fuelType: 'gasoline'
  },
  {
    id: '20',
    make: 'Toyota',
    model: 'Harrier',
    year: 2016,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'hybrid'
  },
  // More Nissan models
  {
    id: '21',
    make: 'Nissan',
    model: 'Tiida',
    year: 2015,
    engineType: '1.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '22',
    make: 'Nissan',
    model: 'Sunny',
    year: 2018,
    engineType: '1.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '23',
    make: 'Nissan',
    model: 'Patrol',
    year: 2019,
    engineType: '4.0L V6',
    fuelType: 'gasoline'
  },
  {
    id: '24',
    make: 'Nissan',
    model: 'Navara',
    year: 2020,
    engineType: '2.5L Diesel',
    fuelType: 'diesel'
  },
  // Honda models
  {
    id: '25',
    make: 'Honda',
    model: 'Civic',
    year: 2017,
    engineType: '1.8L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '26',
    make: 'Honda',
    model: 'Accord',
    year: 2018,
    engineType: '2.4L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '27',
    make: 'Honda',
    model: 'CR-V',
    year: 2019,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '28',
    make: 'Honda',
    model: 'Pilot',
    year: 2016,
    engineType: '3.5L V6',
    fuelType: 'gasoline'
  },
  // Subaru models
  {
    id: '29',
    make: 'Subaru',
    model: 'Impreza',
    year: 2017,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '30',
    make: 'Subaru',
    model: 'Outback',
    year: 2018,
    engineType: '2.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '31',
    make: 'Subaru',
    model: 'Legacy',
    year: 2016,
    engineType: '2.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  // Mazda models
  {
    id: '32',
    make: 'Mazda',
    model: 'Axela',
    year: 2017,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '33',
    make: 'Mazda',
    model: 'Atenza',
    year: 2018,
    engineType: '2.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '34',
    make: 'Mazda',
    model: 'CX-5',
    year: 2019,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  // Mitsubishi models
  {
    id: '35',
    make: 'Mitsubishi',
    model: 'Lancer',
    year: 2016,
    engineType: '1.5L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '36',
    make: 'Mitsubishi',
    model: 'Pajero',
    year: 2018,
    engineType: '3.2L Diesel',
    fuelType: 'diesel'
  },
  {
    id: '37',
    make: 'Mitsubishi',
    model: 'ASX',
    year: 2017,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  // German cars
  {
    id: '38',
    make: 'BMW',
    model: '3 Series',
    year: 2017,
    engineType: '2.0L Turbo',
    fuelType: 'gasoline'
  },
  {
    id: '39',
    make: 'BMW',
    model: 'X3',
    year: 2018,
    engineType: '2.0L Turbo',
    fuelType: 'gasoline'
  },
  {
    id: '40',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2016,
    engineType: '2.0L Turbo',
    fuelType: 'gasoline'
  },
  {
    id: '41',
    make: 'Audi',
    model: 'A4',
    year: 2017,
    engineType: '2.0L Turbo',
    fuelType: 'gasoline'
  },
  {
    id: '42',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2018,
    engineType: '1.4L Turbo',
    fuelType: 'gasoline'
  },
  {
    id: '43',
    make: 'Volkswagen',
    model: 'Passat',
    year: 2017,
    engineType: '2.0L Turbo',
    fuelType: 'gasoline'
  },
  // Korean cars
  {
    id: '44',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2018,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '45',
    make: 'Hyundai',
    model: 'Santa Fe',
    year: 2019,
    engineType: '2.4L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '46',
    make: 'Kia',
    model: 'Sportage',
    year: 2018,
    engineType: '2.0L 4-Cylinder',
    fuelType: 'gasoline'
  },
  {
    id: '47',
    make: 'Kia',
    model: 'Cerato',
    year: 2017,
    engineType: '1.6L 4-Cylinder',
    fuelType: 'gasoline'
  },
  // More commercial vehicles
  {
    id: '48',
    make: 'Ford',
    model: 'Ranger',
    year: 2019,
    engineType: '2.2L Diesel',
    fuelType: 'diesel'
  },
  {
    id: '49',
    make: 'Ford',
    model: 'Transit',
    year: 2018,
    engineType: '2.2L Diesel',
    fuelType: 'diesel'
  },
  {
    id: '50',
    make: 'Chevrolet',
    model: 'Captiva',
    year: 2016,
    engineType: '2.4L 4-Cylinder',
    fuelType: 'gasoline'
  }
];

// Combine all vehicles
export const allKenyanVehicles = [...sampleVehicles, ...additionalKenyanVehicles];

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