import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { IssueCategory } from '../types';

interface IssueSelectorProps {
  issues: IssueCategory[];
  selectedIssue: string;
  onIssueChange: (issueId: string) => void;
}

export const IssueSelector: React.FC<IssueSelectorProps> = ({
  issues,
  selectedIssue,
  onIssueChange
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        What's the Problem?
      </label>
      <div className="relative">
        <AlertTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={selectedIssue}
          onChange={(e) => onIssueChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
        >
          <option value="">Select an issue</option>
          {issues.map((issue) => (
            <option key={issue.id} value={issue.id}>
              {issue.name} ({issue.urgencyLevel.toUpperCase()})
            </option>
          ))}
        </select>
      </div>

      {selectedIssue && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          {(() => {
            const issue = issues.find(i => i.id === selectedIssue);
            if (!issue) return null;
            
            return (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{issue.name}</h4>
                  <span className={`text-sm font-semibold ${getUrgencyColor(issue.urgencyLevel)}`}>
                    {issue.urgencyLevel.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Common Symptoms:</p>
                    <ul className="text-gray-600 space-y-1">
                      {issue.symptoms.slice(0, 3).map((symptom, idx) => (
                        <li key={idx}>• {symptom}</li>
                      ))}
                      {issue.symptoms.length > 3 && (
                        <li className="text-gray-500">• +{issue.symptoms.length - 3} more...</li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Estimated:</p>
                    <p className="text-gray-600">${issue.estimatedCost.min} - ${issue.estimatedCost.max}</p>
                    <p className="text-gray-600">{issue.estimatedTime} hours</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};