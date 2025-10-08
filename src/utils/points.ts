import { Service, User } from '../types';

export const pointsCalculator = {
  // Calculate points for mechanics based on service completion
  calculateMechanicPoints(service: Service, rating: number): number {
    let basePoints = 0;
    
    // Base points by service cost
    if (service.cost >= 1000) basePoints = 50;
    else if (service.cost >= 500) basePoints = 30;
    else if (service.cost >= 200) basePoints = 20;
    else basePoints = 10;
    
    // Rating multiplier (1-5 stars)
    const ratingMultiplier = rating / 5;
    
    // Efficiency bonus (completed faster than estimated)
    let efficiencyBonus = 1;
    if (service.actualDuration && service.actualDuration < service.estimatedDuration) {
      efficiencyBonus = 1.2;
    }
    
    return Math.floor(basePoints * ratingMultiplier * efficiencyBonus);
  },

  // Calculate points for vehicle owners based on service behavior
  calculateOwnerPoints(service: Service, rating: number): number {
    let basePoints = 10; // Base points for completing a service
    
    // Rating bonus for rating the mechanic
    const ratingBonus = rating >= 4 ? 5 : 2;
    
    // Loyalty bonus for repeat services
    const loyaltyBonus = service.cost >= 500 ? 5 : 0;
    
    return basePoints + ratingBonus + loyaltyBonus;
  },

  // Calculate user rank based on total points
  calculateRank(totalPoints: number, userType: 'mechanic' | 'vehicle_owner'): number {
    if (userType === 'mechanic') {
      if (totalPoints >= 2000) return 1; // Master Mechanic
      if (totalPoints >= 1500) return 2; // Expert Mechanic
      if (totalPoints >= 1000) return 3; // Senior Mechanic
      if (totalPoints >= 500) return 4;  // Skilled Mechanic
      if (totalPoints >= 200) return 5;  // Junior Mechanic
      return 6; // Apprentice
    } else {
      if (totalPoints >= 500) return 1;  // VIP Customer
      if (totalPoints >= 300) return 2;  // Premium Customer
      if (totalPoints >= 150) return 3;  // Regular Customer
      if (totalPoints >= 50) return 4;   // Valued Customer
      return 5; // New Customer
    }
  },

  // Get rank title
  getRankTitle(rank: number, userType: 'mechanic' | 'vehicle_owner'): string {
    if (userType === 'mechanic') {
      const mechanicRanks = [
        'Master Mechanic',
        'Expert Mechanic', 
        'Senior Mechanic',
        'Skilled Mechanic',
        'Junior Mechanic',
        'Apprentice'
      ];
      return mechanicRanks[rank - 1] || 'Apprentice';
    } else {
      const ownerRanks = [
        'VIP Customer',
        'Premium Customer',
        'Regular Customer', 
        'Valued Customer',
        'New Customer'
      ];
      return ownerRanks[rank - 1] || 'New Customer';
    }
  },

  // Get rank color for UI
  getRankColor(rank: number): string {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600'; // Gold
      case 2: return 'from-gray-300 to-gray-500';     // Silver
      case 3: return 'from-orange-400 to-orange-600'; // Bronze
      case 4: return 'from-blue-400 to-blue-600';     // Blue
      case 5: return 'from-green-400 to-green-600';   // Green
      default: return 'from-gray-400 to-gray-600';    // Gray
    }
  },

  // Get next rank info
  getNextRankInfo(totalPoints: number, userType: 'mechanic' | 'vehicle_owner'): { nextRank: string; pointsNeeded: number } {
    if (userType === 'mechanic') {
      if (totalPoints < 200) return { nextRank: 'Junior Mechanic', pointsNeeded: 200 - totalPoints };
      if (totalPoints < 500) return { nextRank: 'Skilled Mechanic', pointsNeeded: 500 - totalPoints };
      if (totalPoints < 1000) return { nextRank: 'Senior Mechanic', pointsNeeded: 1000 - totalPoints };
      if (totalPoints < 1500) return { nextRank: 'Expert Mechanic', pointsNeeded: 1500 - totalPoints };
      if (totalPoints < 2000) return { nextRank: 'Master Mechanic', pointsNeeded: 2000 - totalPoints };
      return { nextRank: 'Master Level', pointsNeeded: 0 };
    } else {
      if (totalPoints < 50) return { nextRank: 'Valued Customer', pointsNeeded: 50 - totalPoints };
      if (totalPoints < 150) return { nextRank: 'Regular Customer', pointsNeeded: 150 - totalPoints };
      if (totalPoints < 300) return { nextRank: 'Premium Customer', pointsNeeded: 300 - totalPoints };
      if (totalPoints < 500) return { nextRank: 'VIP Customer', pointsNeeded: 500 - totalPoints };
      return { nextRank: 'VIP Level', pointsNeeded: 0 };
    }
  }
};