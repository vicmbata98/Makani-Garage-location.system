import { User, Vehicle, Service, Appointment, Garage, IssueCategory } from '../types';

const USERS_KEY = 'garage-hub-users';
const VEHICLES_KEY = 'garage-hub-vehicles';
const SERVICES_KEY = 'garage-hub-services';
const APPOINTMENTS_KEY = 'garage-hub-appointments';
const GARAGES_KEY = 'garage-hub-garages';
const ISSUES_KEY = 'garage-hub-issues';
const CURRENT_USER_KEY = 'garage-hub-current-user';

export const storage = {
  // User management
  getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  saveUser(user: User): void {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  },

  getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  getMechanics(): User[] {
    return this.getUsers().filter(u => u.userType === 'mechanic');
  },

  getVehicleOwners(): User[] {
    return this.getUsers().filter(u => u.userType === 'vehicle_owner');
  },

  // Current user session
  setCurrentUser(user: User): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  clearCurrentUser(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Vehicle management
  getVehicles(ownerId?: string): Vehicle[] {
    const vehicles = localStorage.getItem(VEHICLES_KEY);
    const allVehicles = vehicles ? JSON.parse(vehicles) : [];
    return ownerId ? allVehicles.filter((vehicle: Vehicle) => vehicle.ownerId === ownerId) : allVehicles;
  },

  saveVehicle(vehicle: Vehicle): void {
    const vehicles = this.getVehicles();
    const existingIndex = vehicles.findIndex(v => v.id === vehicle.id);
    
    if (existingIndex >= 0) {
      vehicles[existingIndex] = vehicle;
    } else {
      vehicles.push(vehicle);
    }
    
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles));
  },

  deleteVehicle(vehicleId: string): void {
    const vehicles = this.getVehicles();
    const filteredVehicles = vehicles.filter(v => v.id !== vehicleId);
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(filteredVehicles));
  },

  getVehicleById(id: string): Vehicle | null {
    const vehicles = this.getVehicles();
    return vehicles.find(v => v.id === id) || null;
  },

  // Service management
  getServices(userId?: string, userType?: 'mechanic' | 'vehicle_owner'): Service[] {
    const services = localStorage.getItem(SERVICES_KEY);
    const allServices = services ? JSON.parse(services) : [];
    
    if (!userId) return allServices;
    
    if (userType === 'mechanic') {
      return allServices.filter((service: Service) => service.mechanicId === userId);
    } else {
      return allServices.filter((service: Service) => service.ownerId === userId);
    }
  },

  saveService(service: Service): void {
    const services = this.getServices();
    const existingIndex = services.findIndex(s => s.id === service.id);
    
    if (existingIndex >= 0) {
      services[existingIndex] = service;
    } else {
      services.push(service);
    }
    
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  },

  deleteService(serviceId: string): void {
    const services = this.getServices();
    const filteredServices = services.filter(s => s.id !== serviceId);
    localStorage.setItem(SERVICES_KEY, JSON.stringify(filteredServices));
  },

  // Appointment management
  getAppointments(userId?: string, userType?: 'mechanic' | 'vehicle_owner'): Appointment[] {
    const appointments = localStorage.getItem(APPOINTMENTS_KEY);
    const allAppointments = appointments ? JSON.parse(appointments) : [];
    
    if (!userId) return allAppointments;
    
    if (userType === 'mechanic') {
      return allAppointments.filter((appointment: Appointment) => appointment.mechanicId === userId);
    } else {
      return allAppointments.filter((appointment: Appointment) => appointment.ownerId === userId);
    }
  },

  saveAppointment(appointment: Appointment): void {
    const appointments = this.getAppointments();
    const existingIndex = appointments.findIndex(a => a.id === appointment.id);
    
    if (existingIndex >= 0) {
      appointments[existingIndex] = appointment;
    } else {
      appointments.push(appointment);
    }
    
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  },

  deleteAppointment(appointmentId: string): void {
    const appointments = this.getAppointments();
    const filteredAppointments = appointments.filter(a => a.id !== appointmentId);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(filteredAppointments));
  },

  // Garage management
  getGarages(): Garage[] {
    const garages = localStorage.getItem(GARAGES_KEY);
    if (garages) {
      return JSON.parse(garages);
    }
    
    // Initialize with sample garages if none exist
    const sampleGarages: Garage[] = [
      {
        id: '1',
        name: 'Downtown Auto Repair',
        address: '123 Main Street',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        phone: '(555) 123-4567',
        email: 'info@downtownauto.com',
        operatingHours: {
          monday: '8:00 AM - 6:00 PM',
          tuesday: '8:00 AM - 6:00 PM',
          wednesday: '8:00 AM - 6:00 PM',
          thursday: '8:00 AM - 6:00 PM',
          friday: '8:00 AM - 6:00 PM',
          saturday: '9:00 AM - 4:00 PM',
          sunday: 'Closed'
        },
        services: ['Engine Repair', 'Brake Service', 'Oil Change', 'Transmission Service'],
        rating: 4.5,
        totalReviews: 127,
        coordinates: { lat: 39.7817, lng: -89.6501 }
      },
      {
        id: '2',
        name: 'Elite Motors Service Center',
        address: '456 Oak Avenue',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62702',
        phone: '(555) 987-6543',
        email: 'service@elitemotors.com',
        operatingHours: {
          monday: '7:00 AM - 7:00 PM',
          tuesday: '7:00 AM - 7:00 PM',
          wednesday: '7:00 AM - 7:00 PM',
          thursday: '7:00 AM - 7:00 PM',
          friday: '7:00 AM - 7:00 PM',
          saturday: '8:00 AM - 5:00 PM',
          sunday: '10:00 AM - 3:00 PM'
        },
        services: ['Electrical Repair', 'AC Service', 'Diagnostic', 'Tire Service'],
        rating: 4.8,
        totalReviews: 89,
        coordinates: { lat: 39.7901, lng: -89.6440 }
      },
      {
        id: '3',
        name: 'Quick Fix Garage',
        address: '789 Elm Street',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62703',
        phone: '(555) 456-7890',
        email: 'contact@quickfix.com',
        operatingHours: {
          monday: '8:00 AM - 5:00 PM',
          tuesday: '8:00 AM - 5:00 PM',
          wednesday: '8:00 AM - 5:00 PM',
          thursday: '8:00 AM - 5:00 PM',
          friday: '8:00 AM - 5:00 PM',
          saturday: '9:00 AM - 2:00 PM',
          sunday: 'Closed'
        },
        services: ['General Maintenance', 'Oil Change', 'Brake Service', 'Tire Service'],
        rating: 4.2,
        totalReviews: 156,
        coordinates: { lat: 39.7956, lng: -89.6621 }
      }
    ];
    
    localStorage.setItem(GARAGES_KEY, JSON.stringify(sampleGarages));
    return sampleGarages;
  },

  saveGarage(garage: Garage): void {
    const garages = this.getGarages();
    const existingIndex = garages.findIndex(g => g.id === garage.id);
    
    if (existingIndex >= 0) {
      garages[existingIndex] = garage;
    } else {
      garages.push(garage);
    }
    
    localStorage.setItem(GARAGES_KEY, JSON.stringify(garages));
  },

  getGarageById(id: string): Garage | null {
    const garages = this.getGarages();
    return garages.find(g => g.id === id) || null;
  },

  // Issue categories management
  getIssueCategories(): IssueCategory[] {
    const issues = localStorage.getItem(ISSUES_KEY);
    if (issues) {
      return JSON.parse(issues);
    }
    
    // Initialize with sample issue categories if none exist
    const sampleIssues: IssueCategory[] = [
      {
        id: '1',
        name: 'Engine Problems',
        description: 'Issues related to engine performance, starting, or running',
        commonSymptoms: ['Engine won\'t start', 'Rough idling', 'Loss of power', 'Strange noises', 'Check engine light'],
        requiredSpecializations: ['Engine Repair', 'Diagnostic'],
        estimatedCost: { min: 200, max: 2500 },
        estimatedDuration: 4,
        urgencyLevel: 'high'
      },
      {
        id: '2',
        name: 'Brake Issues',
        description: 'Problems with braking system including pads, rotors, and fluid',
        commonSymptoms: ['Squeaking brakes', 'Grinding noise', 'Soft brake pedal', 'Brake warning light'],
        requiredSpecializations: ['Brake Service'],
        estimatedCost: { min: 150, max: 800 },
        estimatedDuration: 2,
        urgencyLevel: 'critical'
      },
      {
        id: '3',
        name: 'Electrical Problems',
        description: 'Issues with electrical systems, lights, battery, or alternator',
        commonSymptoms: ['Dead battery', 'Dim lights', 'Electrical components not working', 'Starting issues'],
        requiredSpecializations: ['Electrical Repair', 'Diagnostic'],
        estimatedCost: { min: 100, max: 1200 },
        estimatedDuration: 3,
        urgencyLevel: 'medium'
      },
      {
        id: '4',
        name: 'Transmission Issues',
        description: 'Problems with automatic or manual transmission',
        commonSymptoms: ['Slipping gears', 'Hard shifting', 'Transmission fluid leaks', 'Burning smell'],
        requiredSpecializations: ['Transmission Service'],
        estimatedCost: { min: 300, max: 3500 },
        estimatedDuration: 6,
        urgencyLevel: 'high'
      },
      {
        id: '5',
        name: 'AC/Heating Problems',
        description: 'Issues with air conditioning or heating systems',
        commonSymptoms: ['No cold air', 'No heat', 'Strange smells', 'Unusual noises from vents'],
        requiredSpecializations: ['AC Service'],
        estimatedCost: { min: 150, max: 1000 },
        estimatedDuration: 2,
        urgencyLevel: 'low'
      },
      {
        id: '6',
        name: 'Tire Problems',
        description: 'Issues with tires including wear, punctures, or alignment',
        commonSymptoms: ['Flat tire', 'Uneven wear', 'Vibration while driving', 'Poor traction'],
        requiredSpecializations: ['Tire Service'],
        estimatedCost: { min: 50, max: 800 },
        estimatedDuration: 1,
        urgencyLevel: 'medium'
      }
    ];
    
    localStorage.setItem(ISSUES_KEY, JSON.stringify(sampleIssues));
    return sampleIssues;
  },

  saveIssueCategory(issue: IssueCategory): void {
    const issues = this.getIssueCategories();
    const existingIndex = issues.findIndex(i => i.id === issue.id);
    
    if (existingIndex >= 0) {
      issues[existingIndex] = issue;
    } else {
      issues.push(issue);
    }
    
    localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
  },

  // Find mechanics by specialization
  findMechanicsBySpecialization(specializations: string[]): User[] {
    const mechanics = this.getMechanics();
    return mechanics.filter(mechanic => 
      mechanic.specializations?.some(spec => 
        specializations.some(reqSpec => 
          spec.toLowerCase().includes(reqSpec.toLowerCase())
        )
      )
    );
  },

  // Find garages by service type
  findGaragesByService(serviceTypes: string[]): Garage[] {
    const garages = this.getGarages();
    return garages.filter(garage =>
      garage.services.some(service =>
        serviceTypes.some(reqService =>
          service.toLowerCase().includes(reqService.toLowerCase())
        )
      )
    );
  }
};