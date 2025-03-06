
import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export interface Feedback {
  id: string;
  type: 'pronunciation' | 'grammar' | 'general';
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  suggestion: string;
  timestamp?: number;
}

interface FeedbackDisplayProps {
  feedback: Feedback[];
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  const getIconForSeverity = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'pronunciation':
        return 'bg-brain-articulation text-white';
      case 'grammar':
        return 'bg-brain-writing text-white';
      case 'general':
        return 'bg-brain-reading text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (feedback.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No feedback available yet. Record your speech and submit it for analysis.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Feedback Analysis</h3>
      
      <div className="rounded-lg border bg-card">
        {feedback.map((item) => (
          <div key={item.id} className="border-b last:border-0 p-4">
            <div className="flex items-start gap-3">
              <div className="pt-1">{getIconForSeverity(item.severity)}</div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(item.type)}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  {item.timestamp && (
                    <span className="text-xs text-muted-foreground">
                      at {(item.timestamp / 1000).toFixed(1)}s
                    </span>
                  )}
                </div>
                
                <p className="text-sm font-medium">{item.message}</p>
                
                <div className="mt-1 p-2 bg-muted/50 rounded text-sm text-muted-foreground">
                  <span className="font-medium">Suggestion:</span> {item.suggestion}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
        <p>Total issues: {feedback.length}</p>
        <div className="flex gap-2">
          <span className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-brain-articulation mr-1"></div>
            Pronunciation: {feedback.filter(f => f.type === 'pronunciation').length}
          </span>
          <span className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-brain-writing mr-1"></div>
            Grammar: {feedback.filter(f => f.type === 'grammar').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
