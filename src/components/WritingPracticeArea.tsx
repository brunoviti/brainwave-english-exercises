
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Lightbulb } from 'lucide-react';
import { generateId } from '@/lib/utils';

type FeedbackType = {
  id: string;
  type: 'error' | 'warning' | 'success' | 'suggestion';
  message: string;
  correction?: string;
};

type ExerciseCategory = 
  'verbs' | 
  'phrasal-verbs' | 
  'nouns' | 
  'pronouns' | 
  'daily-activities' | 
  'business-writing';

interface ExercisePrompt {
  instruction: string;
  examples: string[];
}

const WritingPracticeArea: React.FC = () => {
  const [category, setCategory] = useState<ExerciseCategory>('verbs');
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [showExamples, setShowExamples] = useState(true);

  const exercises: Record<ExerciseCategory, ExercisePrompt> = {
    'verbs': {
      instruction: 'Completa las oraciones utilizando el tiempo verbal correcto.',
      examples: [
        'Yesterday, I (go) went to the park.',
        'She (study) is studying for her exam right now.',
        'By next month, they (complete) will have completed the project.'
      ]
    },
    'phrasal-verbs': {
      instruction: 'Utiliza phrasal verbs para completar las oraciones. Ejemplos: look up, give in, take off.',
      examples: [
        'I need to ___ (investigate) this word in the dictionary.',
        'The plane will ___ (start flying) in 5 minutes.',
        'After negotiating for hours, he finally ___ (surrendered).'
      ]
    },
    'nouns': {
      instruction: 'Usa los sustantivos correctos en singular o plural según corresponda.',
      examples: [
        'The ___ (child/children) are playing in the garden.',
        'Three ___ (woman/women) were waiting at the bus stop.',
        'We need more ___ (information) about the project.'
      ]
    },
    'pronouns': {
      instruction: 'Reemplaza las palabras subrayadas con el pronombre correcto (he, she, it, they, we, etc.).',
      examples: [
        'John went to the store. ___ bought some bread.',
        'Mary and I visited the museum. ___ enjoyed the exhibition.',
        'Give the book to Sarah. Give ___ the book.'
      ]
    },
    'daily-activities': {
      instruction: 'Escribe un párrafo corto sobre tu rutina diaria utilizando adverbios de frecuencia.',
      examples: [
        'I usually wake up at 7 AM. I always have coffee for breakfast.',
        'On weekends, I occasionally go hiking with friends.',
        'She rarely watches TV during weekdays.'
      ]
    },
    'business-writing': {
      instruction: 'Redacta un correo electrónico profesional utilizando lenguaje formal.',
      examples: [
        'Dear Mr. Smith,\n\nI am writing to inquire about the position advertised on your website...',
        'I would appreciate the opportunity to discuss my application further...',
        'Thank you for your consideration.\n\nYours sincerely,\nJane Doe'
      ]
    }
  };

  const checkWriting = async () => {
    if (!userText.trim()) return;
    
    setIsChecking(true);
    setFeedback([]);
    
    // Simulate AI checking with a delay
    // In a real application, this would call an AI service
    setTimeout(() => {
      const simulatedFeedback = generateSimulatedFeedback(userText, category);
      setFeedback(simulatedFeedback);
      setIsChecking(false);
    }, 1500);
  };

  const generateSimulatedFeedback = (text: string, category: ExerciseCategory): FeedbackType[] => {
    const feedbackItems: FeedbackType[] = [];
    
    // Add some errors based on common patterns
    if (text.toLowerCase().includes('i am go')) {
      feedbackItems.push({
        id: generateId(),
        type: 'error',
        message: 'Incorrect verb form after "am".',
        correction: 'Use the present participle (-ing): "I am going"'
      });
    }
    
    if (text.toLowerCase().includes('yesterday') && !text.includes('ed') && !text.includes('went') && !text.includes('had')) {
      feedbackItems.push({
        id: generateId(),
        type: 'warning',
        message: 'When using "yesterday", you should use past tense.',
        correction: 'Convert verbs to past tense.'
      });
    }
    
    if (text.length > 20) {
      feedbackItems.push({
        id: generateId(),
        type: 'success',
        message: 'Good sentence length and structure.',
      });
    }
    
    if (category === 'business-writing' && !text.toLowerCase().includes('dear') && text.length > 30) {
      feedbackItems.push({
        id: generateId(),
        type: 'error',
        message: 'Business emails typically start with a greeting.',
        correction: 'Add "Dear [Name]," at the beginning of your email.'
      });
    }
    
    // Always add suggestions for improvement
    feedbackItems.push({
      id: generateId(),
      type: 'suggestion',
      message: 'Consider using more varied vocabulary to enrich your writing.'
    });
    
    // If no errors were found, add a general positive feedback
    if (feedbackItems.filter(f => f.type === 'error').length === 0 && text.length > 10) {
      feedbackItems.push({
        id: generateId(),
        type: 'success',
        message: 'Great job! Your writing looks good overall.'
      });
    }
    
    return feedbackItems;
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Práctica de Escritura</h2>
        
        <div className="mb-6">
          <Label className="text-base mb-2 block">Elige una categoría:</Label>
          <RadioGroup 
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            value={category}
            onValueChange={(value) => setCategory(value as ExerciseCategory)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="verbs" id="verbs" />
              <Label htmlFor="verbs">Verbos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phrasal-verbs" id="phrasal-verbs" />
              <Label htmlFor="phrasal-verbs">Phrasal Verbs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nouns" id="nouns" />
              <Label htmlFor="nouns">Sustantivos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pronouns" id="pronouns" />
              <Label htmlFor="pronouns">Pronombres</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily-activities" id="daily-activities" />
              <Label htmlFor="daily-activities">Actividades Diarias</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business-writing" id="business-writing" />
              <Label htmlFor="business-writing">Escritura de Negocios</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Instrucciones:</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowExamples(!showExamples)}
              className="text-xs h-8"
            >
              {showExamples ? 'Ocultar ejemplos' : 'Mostrar ejemplos'}
            </Button>
          </div>
          
          <p className="text-sm mb-3">{exercises[category].instruction}</p>
          
          {showExamples && (
            <div>
              <h4 className="text-sm font-medium mt-3 mb-1">Ejemplos:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {exercises[category].examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <Label htmlFor="writing-area" className="block mb-2">
            Tu respuesta:
          </Label>
          <Textarea
            id="writing-area"
            placeholder="Escribe tu respuesta aquí..."
            className="min-h-[150px] mb-2"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mb-4">
            {userText.length} caracteres
          </p>
          
          <Button 
            onClick={checkWriting} 
            disabled={isChecking || !userText.trim()}
            className="w-full md:w-auto"
          >
            {isChecking ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Revisando...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Revisar escrito
              </>
            )}
          </Button>
        </div>
      </div>
      
      {feedback.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6 animate-fade-in">
          <h2 className="text-xl font-medium mb-4">Feedback</h2>
          
          <div className="space-y-4">
            {feedback.map((item) => (
              <div 
                key={item.id} 
                className={`p-4 rounded-lg border-l-4 ${
                  item.type === 'error' ? 'border-l-red-500 bg-red-50' : 
                  item.type === 'warning' ? 'border-l-amber-500 bg-amber-50' : 
                  item.type === 'success' ? 'border-l-green-500 bg-green-50' : 
                  'border-l-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    {getFeedbackIcon(item.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {item.message}
                    </p>
                    {item.correction && (
                      <p className="text-sm mt-1 text-muted-foreground">
                        Corrección: {item.correction}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <p className="text-sm text-muted-foreground mt-4 italic">
              Nota: En una versión completa, esta función utilizaría IA para proporcionar feedback más detallado y personalizado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingPracticeArea;
