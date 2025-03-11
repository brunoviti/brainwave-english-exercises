import React from 'react';
import Header from '@/components/Header';
import { BookOpen } from 'lucide-react';

const ReadingExercises: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <section className="py-16 bg-gradient-to-b from-brain-reading/20 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-brain-reading text-white text-xs font-medium mb-4">
                Ejercicios de Lectura
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Mejora tu Comprensión Lectora
              </h1>
              <p className="text-lg text-muted-foreground">
                Desarrolla tus habilidades de lectura y comprensión con estos ejercicios diseñados para ampliar tu vocabulario y fluidez.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {reading_exercises.map((exercise, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="w-10 h-10 bg-brain-reading/10 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-brain-reading" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{exercise.title}</h3>
                  <p className="text-muted-foreground mb-4">{exercise.description}</p>
                  
                  <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Extracto:</h4>
                    <p className="text-sm mb-4">{exercise.extract}</p>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Preguntas:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        {exercise.questions.map((question, qIndex) => (
                          <li key={qIndex}>{question}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <a 
                    href={exercise.fullTextUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brain-reading hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Leer texto completo
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

const reading_exercises = [
  {
    title: "The Curious Case of Benjamin Button",
    description: "Extracto adaptado del famoso cuento de F. Scott Fitzgerald.",
    extract: "As long ago as 1860 it was the proper thing to be born at home. At present, so I am told, the high gods of medicine have decreed that the first cries of the young shall be uttered upon the anesthetic air of a hospital, preferably a fashionable one. So young Mr. and Mrs. Roger Button were fifty years ahead of style when they decided, one day in the summer of 1860, that their first baby should be born in a hospital.",
    questions: [
      "¿En qué año está ambientada la historia?",
      "¿Dónde decidieron los Button que nacería su hijo?",
      "¿Qué era lo común en esa época respecto al nacimiento?",
      "¿Qué significa que los Button estaban 'fifty years ahead of style'?"
    ],
    fullTextUrl: "https://www.youtube.com/watch?v=8xVf4iJPTZk"
  },
  {
    title: "The Gift of the Magi",
    description: "Extracto del clásico cuento de O. Henry sobre el amor y el sacrificio.",
    extract: "One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one's cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.",
    questions: [
      "¿Cuánto dinero tenía Della?",
      "¿Cómo había ahorrado parte del dinero?",
      "¿Qué festividad se acercaba?",
      "¿Qué nos dice este párrafo sobre la situación económica de Della?"
    ],
    fullTextUrl: "https://www.youtube.com/watch?v=bO6HrBPez3Q"
  },
  {
    title: "The Tell-Tale Heart",
    description: "Fragmento del inquietante relato de Edgar Allan Poe.",
    extract: "TRUE! nervous, very, very dreadfully nervous I had been and am; but why WILL you say that I am mad? The disease had sharpened my senses, not destroyed, not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How then am I mad? Hearken! and observe how healthily, how calmly, I can tell you the whole story.",
    questions: [
      "¿Cómo se describe a sí mismo el narrador?",
      "¿Qué sentido dice que tiene especialmente agudizado?",
      "¿Qué intenta probar el narrador al lector?",
      "¿Qué técnica narrativa utiliza Poe en este párrafo?"
    ],
    fullTextUrl: "https://www.youtube.com/watch?v=sN1xYE_2pYk"
  },
  {
    title: "The Importance of Being Earnest",
    description: "Extracto de la comedia de Oscar Wilde.",
    extract: "JACK: My dear Algy, you talk exactly as if you were a dentist. It is very vulgar to talk like a dentist when one isn't a dentist. It produces a false impression. ALGERNON: Well, that is exactly what dentists always do. Now, go on! Tell me the whole thing. I may mention that I have always suspected you of being a confirmed and secret Bunburyist; and I am quite sure of it now.",
    questions: [
      "¿Quiénes son los personajes que hablan en este diálogo?",
      "¿A qué profesión se hace referencia en el diálogo?",
      "¿Qué acusación hace Algernon a Jack?",
      "¿Qué podría significar el término 'Bunburyist'?"
    ],
    fullTextUrl: "https://www.youtube.com/watch?v=W6_HkqQ4nYk"
  }
];

export default ReadingExercises;
