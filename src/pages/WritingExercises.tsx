
import React from 'react';
import Header from '@/components/Header';
import { Pencil } from 'lucide-react';

const WritingExercises: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <section className="py-16 bg-gradient-to-b from-brain-writing/20 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-brain-writing text-white text-xs font-medium mb-4">
                Ejercicios de Escritura
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Mejora tu Expresión Escrita
              </h1>
              <p className="text-lg text-muted-foreground">
                Desarrolla tus habilidades de escritura con estos ejercicios diseñados para mejorar tu gramática, vocabulario y estilo.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {writing_exercises.map((exercise, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="w-10 h-10 bg-brain-writing/10 rounded-full flex items-center justify-center mb-4">
                    <Pencil className="w-5 h-5 text-brain-writing" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{exercise.title}</h3>
                  <p className="text-muted-foreground mb-4">{exercise.description}</p>
                  
                  <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Instrucciones:</h4>
                    <p className="text-sm mb-3">{exercise.instructions}</p>
                    
                    {exercise.examples && (
                      <div className="mt-3">
                        <h5 className="font-medium text-sm">Ejemplos:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm mt-1">
                          {exercise.examples.map((example, eIndex) => (
                            <li key={eIndex}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {exercise.hints && (
                      <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                        <h5 className="font-medium text-blue-800">Consejos:</h5>
                        <ul className="list-disc list-inside space-y-1 text-blue-800 mt-1">
                          {exercise.hints.map((hint, hIndex) => (
                            <li key={hIndex}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <a 
                    href={exercise.resourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brain-writing hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Recursos adicionales
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Brainwave English Exercises &copy; {new Date().getFullYear()} - A language learning tool
          </p>
        </div>
      </footer>
    </div>
  );
};

// Datos de ejemplo para los ejercicios
const writing_exercises = [
  {
    title: "Tiempos Verbales",
    description: "Ejercicio para practicar los tiempos verbales en inglés.",
    instructions: "Reescribe las siguientes oraciones cambiando el tiempo verbal según las instrucciones entre paréntesis.",
    examples: [
      "I go to the park every day. (Past Simple) → I went to the park every day.",
      "She is studying for her exam. (Future) → She will be studying for her exam."
    ],
    hints: [
      "Identifica las palabras clave que indican tiempo: yesterday, now, tomorrow, etc.",
      "Recuerda las formas irregulares de los verbos en pasado.",
      "Presta atención a los auxiliares necesarios en cada tiempo verbal."
    ],
    resourceUrl: "https://www.perfect-english-grammar.com/verb-tenses.html"
  },
  {
    title: "Ensayo Argumentativo",
    description: "Practica la escritura de ensayos persuasivos en inglés.",
    instructions: "Escribe un ensayo argumentativo de 300-500 palabras sobre uno de los siguientes temas. Incluye una introducción clara, al menos tres argumentos con evidencia, y una conclusión.",
    examples: [
      "¿Deberían las escuelas prohibir el uso de teléfonos móviles?",
      "¿Es mejor el aprendizaje en línea que el presencial?",
      "¿Debería ser obligatorio el aprendizaje de un idioma extranjero?"
    ],
    hints: [
      "Usa conectores para enlazar tus ideas: however, furthermore, in addition, etc.",
      "Incluye ejemplos específicos para apoyar tus argumentos.",
      "Considera el punto de vista contrario para fortalecer tus argumentos."
    ],
    resourceUrl: "https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/argumentative_essays.html"
  },
  {
    title: "Corrección de Errores",
    description: "Identifica y corrige errores comunes en oraciones en inglés.",
    instructions: "Encuentra y corrige los errores gramaticales, de puntuación o de vocabulario en las siguientes oraciones.",
    examples: [
      "She don't like coffee. → She doesn't like coffee.",
      "I have went to the store yesterday. → I went to the store yesterday."
    ],
    hints: [
      "Presta atención a la concordancia sujeto-verbo.",
      "Revisa el uso correcto de preposiciones.",
      "Verifica el uso correcto de los tiempos verbales con adverbios de tiempo."
    ],
    resourceUrl: "https://www.grammarly.com/blog/category/handbook/"
  },
  {
    title: "Parafraseo",
    description: "Practica la habilidad de expresar ideas con diferentes palabras.",
    instructions: "Reescribe los siguientes párrafos usando tus propias palabras sin cambiar el significado original.",
    examples: [
      "Original: The consumption of fast food has increased dramatically in recent years, leading to concerns about public health.",
      "Paráfrasis: In recent times, there has been a significant rise in fast food intake, causing worries about the health of the general population."
    ],
    hints: [
      "Utiliza sinónimos para las palabras clave.",
      "Cambia la estructura de las oraciones (activa a pasiva, o viceversa).",
      "Reorganiza el orden de las ideas manteniendo el sentido original."
    ],
    resourceUrl: "https://www.scribbr.com/citing-sources/how-to-paraphrase/"
  }
];

export default WritingExercises;
