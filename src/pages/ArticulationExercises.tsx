import React from 'react';
import Header from '@/components/Header';
import { Mic } from 'lucide-react';

const ArticulationExercises: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <section className="py-16 bg-gradient-to-b from-brain-articulation/20 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-brain-articulation text-white text-xs font-medium mb-4">
                Ejercicios de Pronunciación
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Mejora tu Pronunciación
              </h1>
              <p className="text-lg text-muted-foreground">
                Practica tu pronunciación con estos ejercicios diseñados para mejorar tu acento y fluidez en inglés.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articulation_exercises.map((exercise, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="w-10 h-10 bg-brain-articulation/10 rounded-full flex items-center justify-center mb-4">
                    <Mic className="w-5 h-5 text-brain-articulation" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{exercise.title}</h3>
                  <p className="text-muted-foreground mb-4">{exercise.description}</p>
                  <div className="p-3 bg-gray-50 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Practica:</h4>
                    <p className="italic">{exercise.practice}</p>
                  </div>
                  <a 
                    href={exercise.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brain-articulation hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Ver video tutorial
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

const articulation_exercises = [
  {
    title: "Sonidos TH",
    description: "Practica la pronunciación de los sonidos 'th' sonoro y sordo en inglés.",
    practice: "Think, that, this, those, them, there, with, forth, mother, father",
    videoUrl: "https://www.youtube.com/watch?v=h5LO0hHGfQg"
  },
  {
    title: "Vocales Largas vs Cortas",
    description: "Aprende a diferenciar entre vocales largas y cortas en inglés.",
    practice: "ship/sheep, bit/beat, full/fool, pull/pool, could/food",
    videoUrl: "https://www.youtube.com/watch?v=9E6VDiMedd8"
  },
  {
    title: "Consonantes Finales",
    description: "Practica la pronunciación clara de consonantes al final de las palabras.",
    practice: "light, night, right, sight, fight, might, tight, height",
    videoUrl: "https://www.youtube.com/watch?v=CwrQBYzm8B8"
  },
  {
    title: "Sonido R",
    description: "Mejora tu pronunciación del sonido 'r' en inglés americano.",
    practice: "red, right, wrong, rhythm, repeat, very, sorry, hurry",
    videoUrl: "https://www.youtube.com/watch?v=3XRTN5gW4oU"
  },
  {
    title: "Consonantes Problemáticas",
    description: "Practica consonantes que pueden resultar difíciles para hispanohablantes.",
    practice: "jungle, vision, measure, pleasure, treasure, usual",
    videoUrl: "https://www.youtube.com/watch?v=QuHpz9dxgTI"
  },
  {
    title: "Trabalenguas",
    description: "Mejora tu fluidez y pronunciación con trabalenguas en inglés.",
    practice: "Peter Piper picked a peck of pickled peppers.",
    videoUrl: "https://www.youtube.com/watch?v=yZiPEiNlyEI"
  }
];

export default ArticulationExercises;
