
import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, BookOpen, BarChart2 } from 'lucide-react';

export interface Feedback {
  id: string;
  type: 'pronunciation' | 'grammar' | 'general';
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  suggestion: string;
  exercises?: string;
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

  // Ordenar feedback por severidad y tipo
  const sortedFeedback = [...feedback].sort((a, b) => {
    // Primero ordenar por severidad (error > warning > info > success)
    const severityOrder = { error: 0, warning: 1, info: 2, success: 3 };
    const severityDiff = severityOrder[a.severity as keyof typeof severityOrder] - 
                         severityOrder[b.severity as keyof typeof severityOrder];
    
    if (severityDiff !== 0) return severityDiff;
    
    // Luego ordenar por tipo
    const typeOrder = { pronunciation: 0, grammar: 1, general: 2 };
    return typeOrder[a.type as keyof typeof typeOrder] - 
           typeOrder[b.type as keyof typeof typeOrder];
  });

  if (feedback.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Aún no hay feedback disponible. Graba tu voz y envíala para análisis.
      </div>
    );
  }

  // Contar las diferentes categorías de feedback
  const errorCount = feedback.filter(item => item.severity === 'error').length;
  const warningCount = feedback.filter(item => item.severity === 'warning').length;
  const infoCount = feedback.filter(item => item.severity === 'info').length;
  const successCount = feedback.filter(item => item.severity === 'success').length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Análisis de Feedback</h3>
      
      {/* Resumen del análisis */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-center gap-2">
          <XCircle className="text-red-500 h-5 w-5" />
          <div>
            <p className="text-xs text-muted-foreground">Errores</p>
            <p className="text-lg font-semibold">{errorCount}</p>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-center gap-2">
          <AlertTriangle className="text-amber-500 h-5 w-5" />
          <div>
            <p className="text-xs text-muted-foreground">Advertencias</p>
            <p className="text-lg font-semibold">{warningCount}</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-2">
          <Info className="text-blue-500 h-5 w-5" />
          <div>
            <p className="text-xs text-muted-foreground">Sugerencias</p>
            <p className="text-lg font-semibold">{infoCount}</p>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-2">
          <CheckCircle className="text-green-500 h-5 w-5" />
          <div>
            <p className="text-xs text-muted-foreground">Logros</p>
            <p className="text-lg font-semibold">{successCount}</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card">
        {sortedFeedback.map((item) => (
          <div key={item.id} className="border-b last:border-0 p-4">
            <div className="flex items-start gap-3">
              <div className="pt-1">{getIconForSeverity(item.severity)}</div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(item.type)}`}>
                    {item.type === 'pronunciation' ? 'Pronunciación' : 
                     item.type === 'grammar' ? 'Gramática' : 'General'}
                  </span>
                  {item.timestamp && (
                    <span className="text-xs text-muted-foreground">
                      en {(item.timestamp / 1000).toFixed(1)}s
                    </span>
                  )}
                </div>
                
                <p className="text-sm font-medium">{item.message}</p>
                
                <div className="mt-2 p-2 bg-muted/50 rounded text-sm text-muted-foreground">
                  <span className="font-medium">Sugerencia:</span> {item.suggestion}
                </div>
                
                {item.exercises && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800 flex items-start gap-2">
                    <BookOpen className="h-4 w-4 mt-0.5 text-blue-500" />
                    <div>
                      <span className="font-medium">Ejercicios:</span> {item.exercises}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Distribución de feedback por categoría */}
      <div className="p-4 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
          <h4 className="text-sm font-medium">Distribución de observaciones</h4>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-brain-articulation"></div>
            <span className="text-sm text-muted-foreground">Pronunciación:</span>
            <span className="text-sm font-medium">{feedback.filter(f => f.type === 'pronunciation').length}</span>
            
            <div className="ml-4 h-2 w-2 rounded-full bg-brain-writing"></div>
            <span className="text-sm text-muted-foreground">Gramática:</span>
            <span className="text-sm font-medium">{feedback.filter(f => f.type === 'grammar').length}</span>
            
            <div className="ml-4 h-2 w-2 rounded-full bg-brain-reading"></div>
            <span className="text-sm text-muted-foreground">General:</span>
            <span className="text-sm font-medium">{feedback.filter(f => f.type === 'general').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
