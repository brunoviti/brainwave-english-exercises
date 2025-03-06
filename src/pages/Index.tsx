
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import AddVideoForm from '@/components/AddVideoForm';
import ExerciseSection from '@/components/ExerciseSection';
import PodcastSection from '@/components/PodcastSection';
import { VideoProvider, useVideos } from '@/context/VideoContext';
import { BookOpen, Headphones, Mic, Pencil, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        
        <ExerciseSection 
          type="reading" 
          title="Reading Exercises" 
          description="Boost your reading comprehension, vocabulary, and understanding of English texts with these curated reading exercises."
        />
        
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
