
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TextRevisionArea from './TextRevisionArea';

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
            <button 
              onClick={() => setShowExamples(!showExamples)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {showExamples ? 'Ocultar ejemplos' : 'Mostrar ejemplos'}
            </button>
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
        
        <TextRevisionArea
          exerciseContext={category}
          instructions={`Escribe tu ejercicio de ${category.replace('-', ' ')} siguiendo las instrucciones anteriores.`}
          placeholder="Escribe tu respuesta aquí..."
          minHeight="200px"
        />
      </div>
    </div>
  );
};

export default WritingPracticeArea;
