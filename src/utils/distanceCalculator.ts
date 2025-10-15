// Utility functions for calculating distances and finding nearby garages

export interface Location {
  lat: number;
  lng: number;
}

/**
 * Calculate the distance between two points using the Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(point1: Location, point2: Location): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate estimated travel time based on distance and Nairobi traffic conditions
 * Returns time in minutes
 */
export function calculateTravelTime(distanceKm: number): number {
  // Average speed in Nairobi considering traffic
  const averageSpeedKmh = 25; // 25 km/h average in city traffic
  const timeHours = distanceKm / averageSpeedKmh;
  const timeMinutes = Math.ceil(timeHours * 60);
  
  return timeMinutes;
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm}km`;
}

/**
 * Format travel time for display
 */
export function formatTravelTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Get direction description based on coordinates
 */
export function getDirection(from: Location, to: Location): string {
  const dLat = to.lat - from.lat;
  const dLng = to.lng - from.lng;
  
  let direction = '';
  
  if (Math.abs(dLat) > Math.abs(dLng)) {
    direction = dLat > 0 ? 'North' : 'South';
  } else {
    direction = dLng > 0 ? 'East' : 'West';
  }
  
  // Add secondary direction for more precision
  if (Math.abs(dLat) > 0.001 && Math.abs(dLng) > 0.001) {
    const secondaryDirection = dLat > 0 ? 'North' : 'South';
    const primaryDirection = dLng > 0 ? 'East' : 'West';
    
    if (direction !== secondaryDirection) {
      direction = `${secondaryDirection}${primaryDirection.toLowerCase()}`;
    }
  }
  
  return direction;
}