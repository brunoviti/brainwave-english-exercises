
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import AddVideoForm from '@/components/AddVideoForm';
import ExerciseSection from '@/components/ExerciseSection';
import PodcastSection from '@/components/PodcastSection';
import { VideoProvider, useVideos } from '@/context/VideoContext';
import { BookOpen, Headphones, Mic, Pencil, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const HomeContent = () => {
  const { videos, addVideo } = useVideos();

  useEffect(() => {
    // Add example video if no videos exist
    if (videos.length === 0) {
      const exampleUrl = "https://www.youtube.com/embed/KwUe9YHcvj6GT2YYXdXww?si=xTxKmdsCRABB_H3T&start=380";
      addVideo({
        title: "English Pronunciation Practice",
        description: "Learn English Pronunciation with this exercise that focuses on commonly mispronounced words and phrases.",
        youtubeUrl: exampleUrl,
        exerciseType: 'articulation'
      });
    }
  }, [videos.length, addVideo]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-secondary/50 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-medium mb-4 animate-pulse-soft">
                English Language Learning
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight animate-slide-down">
                Enhance Your English Skills
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up">
                Curate and organize YouTube videos and Spotify podcasts into focused exercises for articulation, 
                reading comprehension, writing skills, and auditory processing. Build your personalized 
                English learning journey.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link 
                to="/articulation" 
                className="py-2 px-6 bg-brain-articulation text-white rounded-full transition-all hover:shadow-lg hover:shadow-brain-articulation/20 flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Articulation
              </Link>
              <Link 
                to="/reading" 
                className="py-2 px-6 bg-brain-reading text-white rounded-full transition-all hover:shadow-lg hover:shadow-brain-reading/20 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Reading
              </Link>
              <Link 
                to="/writing" 
                className="py-2 px-6 bg-brain-writing text-white rounded-full transition-all hover:shadow-lg hover:shadow-brain-writing/20 flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Writing
              </Link>
              <Link 
                to="/podcast" 
                className="py-2 px-6 bg-brain-podcast text-white rounded-full transition-all hover:shadow-lg hover:shadow-brain-podcast/20 flex items-center gap-2"
              >
                <Headphones className="w-4 h-4" />
                Podcasts
              </Link>
              <Link 
                to="/pronunciation-feedback" 
                className="py-2 px-6 bg-primary text-white rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                AI Feedback
              </Link>
            </div>
          </div>
        </section>
        
        {/* Exercise Sections */}
        <ExerciseSection 
          type="articulation" 
          title="Articulation Exercises" 
          description="Improve your pronunciation, intonation, and speech clarity with these articulation exercises. Perfect for enhancing your spoken English and reducing accent."
        />
        
        {/* Reading Exercises Section */}
        <section id="reading" className="py-12 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-brain-reading" />
              <h2 className="text-2xl font-semibold">Reading Exercises</h2>
            </div>
            
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Boost your reading comprehension, vocabulary, and understanding of English texts with these curated reading exercises.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
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
            
            <div className="text-center">
              <Link
                to="/reading"
                className="inline-flex items-center gap-2 bg-brain-reading text-white py-2 px-6 rounded-full hover:bg-brain-reading/90 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                View All Reading Exercises
              </Link>
            </div>
          </div>
        </section>
        
        <ExerciseSection 
          type="writing" 
          title="Writing Exercises" 
          description="Develop your writing skills, grammar, and ability to express ideas clearly in written English through these structured writing exercises."
        />
        
        {/* Podcast Section */}
        <PodcastSection />
        
        {/* Add Video Form Section */}
        <section id="add-video" className="py-12 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8 text-center">Add New Exercise</h2>
              <AddVideoForm />
            </div>
          </div>
        </section>
        
        {/* AI Pronunciation Feedback Section */}
        <section className="py-12 bg-brain-base">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                New Feature
              </span>
              <h2 className="text-3xl font-bold mb-4">AI Pronunciation Analysis</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get instant feedback on your pronunciation and grammar with our AI-powered tool. 
                Record your speech and receive personalized suggestions to improve your English.
              </p>
              <Link
                to="/pronunciation-feedback"
                className="inline-flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Brain className="w-4 h-4" />
                Try AI Feedback
              </Link>
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

const Index = () => {
  return (
    <VideoProvider>
      <HomeContent />
    </VideoProvider>
  );
};

export default Index;
