import { Garage, IssueCategory, Vehicle, SearchResult, SearchFilters } from '../types';

export class GarageSearchEngine {
  private garages: Garage[];
  private issues: IssueCategory[];

  constructor(garages: Garage[], issues: IssueCategory[]) {
    this.garages = garages;
    this.issues = issues;
  }

  searchByIssue(
    issueId: string, 
    vehicle?: Vehicle, 
    filters?: SearchFilters
  ): SearchResult[] {
    const issue = this.issues.find(i => i.id === issueId);
    if (!issue) return [];

    let results: SearchResult[] = [];

    for (const garage of this.garages) {
      // Check if garage has required specializations
      const matchingMechanics = garage.mechanics.filter(mechanic =>
        mechanic.specializations.some(spec =>
          issue.requiredSpecializations.includes(spec)
        )
      );

      if (matchingMechanics.length === 0) continue;

      // Calculate match score based on specialization coverage
      const requiredSpecs = issue.requiredSpecializations;
      const garageSpecs = garage.services;
      const matchedSpecs = requiredSpecs.filter(spec => garageSpecs.includes(spec));
      const matchScore = (matchedSpecs.length / requiredSpecs.length) * 100;

      // Calculate estimated cost based on mechanic rates and issue complexity
      const avgHourlyRate = matchingMechanics.reduce((sum, m) => sum + m.hourlyRate, 0) / matchingMechanics.length;
      const laborCost = avgHourlyRate * issue.estimatedTime;
      const estimatedCost = {
        min: Math.max(issue.estimatedCost.min, laborCost * 0.8),
        max: Math.max(issue.estimatedCost.max, laborCost * 1.5)
      };

      results.push({
        garage,
        matchingMechanics,
        matchScore,
        estimatedCost
      });
    }

    // Apply filters
    if (filters) {
      results = this.applyFilters(results, filters);
    }

    // Sort by match score and rating
    results.sort((a, b) => {
      const scoreA = a.matchScore * 0.7 + a.garage.rating * 20 * 0.3;
      const scoreB = b.matchScore * 0.7 + b.garage.rating * 20 * 0.3;
      return scoreB - scoreA;
    });

    return results;
  }

  searchByVehicleAndSymptoms(
    vehicle: Vehicle,
    symptoms: string[]
  ): { issue: IssueCategory; results: SearchResult[] }[] {
    const relevantIssues = this.issues.filter(issue => {
      // Check if issue is compatible with vehicle type
      const isCompatible = issue.compatibleVehicles.includes(vehicle.fuelType);
      
      // Check if any symptoms match
      const hasMatchingSymptoms = symptoms.some(symptom =>
        issue.symptoms.some(issueSymptom =>
          issueSymptom.toLowerCase().includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(issueSymptom.toLowerCase())
        )
      );

      return isCompatible && hasMatchingSymptoms;
    });

    return relevantIssues.map(issue => ({
      issue,
      results: this.searchByIssue(issue.id, vehicle)
    }));
  }

  private applyFilters(results: SearchResult[], filters: SearchFilters): SearchResult[] {
    return results.filter(result => {
      // Price range filter
      if (filters.priceRange.length > 0 && !filters.priceRange.includes(result.garage.priceRange)) {
        return false;
      }

      // Rating filter
      if (result.garage.rating < filters.minRating) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasRequiredFeatures = filters.features.every(feature =>
          result.garage.features.includes(feature)
        );
        if (!hasRequiredFeatures) return false;
      }

      return true;
    });
  }

  findMechanicsBySpecialization(specializations: string[]): { garage: Garage; mechanic: any }[] {
    const results: { garage: Garage; mechanic: any }[] = [];

    for (const garage of this.garages) {
      for (const mechanic of garage.mechanics) {
        const hasSpecialization = mechanic.specializations.some(spec =>
          specializations.some(reqSpec =>
            spec.toLowerCase().includes(reqSpec.toLowerCase())
          )
        );

        if (hasSpecialization) {
          results.push({ garage, mechanic });
        }
      }
    }

    // Sort by mechanic rating and experience
    results.sort((a, b) => {
      const scoreA = a.mechanic.rating * 0.6 + (a.mechanic.experience / 30) * 0.4;
      const scoreB = b.mechanic.rating * 0.6 + (b.mechanic.experience / 30) * 0.4;
      return scoreB - scoreA;
    });

    return results;
  }
}