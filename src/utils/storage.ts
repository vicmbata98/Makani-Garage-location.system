import { User, Vehicle, Service, Appointment } from '../types';

const USERS_KEY = 'garage-hub-users';
const VEHICLES_KEY = 'garage-hub-vehicles';
const SERVICES_KEY = 'garage-hub-services';
const APPOINTMENTS_KEY = 'garage-hub-appointments';
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
  }
};