
import React from 'react';
import Header from '@/components/Header';
import { Headphones, PlayCircle, Clock } from 'lucide-react';

const PodcastExercises: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <section className="py-16 bg-gradient-to-b from-brain-podcast/20 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-brain-podcast text-white text-xs font-medium mb-4">
                Podcasts en Inglés
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Aprende con Podcasts
              </h1>
              <p className="text-lg text-muted-foreground">
                Mejora tu comprensión auditiva y vocabulario escuchando podcasts diseñados para estudiantes de inglés.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              {podcast_exercises.map((podcast, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="md:flex gap-6">
                    <div className="md:w-[150px] h-[150px] mb-4 md:mb-0 flex-shrink-0">
                      <img 
                        src={podcast.imageUrl} 
                        alt={podcast.title}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{podcast.title}</h3>
                        <span className="text-xs px-2 py-0.5 bg-brain-podcast/10 text-brain-podcast rounded-full">
                          {podcast.level}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {podcast.duration}
                        </span>
                        <span>{podcast.date}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{podcast.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {podcast.tags.map((tag, tIndex) => (
                          <span key={tIndex} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <a 
                          href={podcast.listenUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-brain-podcast text-white rounded-full text-sm hover:bg-brain-podcast/90 transition-colors"
                        >
                          <PlayCircle className="h-4 w-4" />
                          Escuchar
                        </a>
                        
                        <a 
                          href={podcast.transcriptUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-brain-podcast/30 text-brain-podcast rounded-full text-sm hover:bg-brain-podcast/10 transition-colors"
                        >
                          Ver transcripción
                        </a>
                      </div>
                    </div>
                  </div>
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

// Datos de ejemplo para los podcasts
const podcast_exercises = [
  {
    title: "6-Minute English",
    description: "Un podcast de la BBC que presenta temas interesantes en episodios cortos de 6 minutos, ideal para practicar.",
    imageUrl: "https://placeholder.svg/400x400/BBC/6-Minute",
    level: "Intermedio",
    duration: "6 minutos",
    date: "Publicación semanal",
    tags: ["BBC", "Noticias", "Vocabulario", "Episodios cortos"],
    listenUrl: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
    transcriptUrl: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english"
  },
  {
    title: "All Ears English",
    description: "Conversaciones naturales con consejos prácticos para comunicarte como un nativo en inglés americano.",
    imageUrl: "https://placeholder.svg/400x400/AEE/All-Ears",
    level: "Intermedio - Avanzado",
    duration: "15-20 minutos",
    date: "Publicación diaria",
    tags: ["Conversación", "Inglés americano", "Expresiones idiomáticas", "Consejos prácticos"],
    listenUrl: "https://www.allearsenglish.com/episodes/",
    transcriptUrl: "https://www.allearsenglish.com/episodes/"
  },
  {
    title: "Espresso English",
    description: "Lecciones de inglés prácticas y sencillas, explicadas con un lenguaje claro y fácil de entender.",
    imageUrl: "https://placeholder.svg/400x400/EE/Espresso",
    level: "Principiante - Intermedio",
    duration: "5-10 minutos",
    date: "Publicación semanal",
    tags: ["Gramática", "Vocabulario", "Inglés práctico", "Consejos de aprendizaje"],
    listenUrl: "https://www.espressoenglish.net/english-tips-podcast/",
    transcriptUrl: "https://www.espressoenglish.net/english-tips-podcast/"
  },
  {
    title: "Luke's English Podcast",
    description: "Un profesor de inglés nativo comparte conversaciones auténticas, historias y lecciones detalladas.",
    imageUrl: "https://placeholder.svg/400x400/LEP/Luke",
    level: "Intermedio - Avanzado",
    duration: "30-60 minutos",
    date: "Publicación semanal",
    tags: ["Conversación natural", "Humor", "Cultura británica", "Episodios largos"],
    listenUrl: "https://teacherluke.co.uk/archive-of-episodes-1-150/",
    transcriptUrl: "https://teacherluke.co.uk/archive-of-episodes-1-150/"
  }
];

export default PodcastExercises;
