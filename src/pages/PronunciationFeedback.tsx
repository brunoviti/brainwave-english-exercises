
import React, { useState } from 'react';
import Header from '@/components/Header';
import AudioRecorder from '@/components/AudioRecorder';
import FeedbackDisplay, { Feedback } from '@/components/FeedbackDisplay';
import { processAudio, transcribeAudio } from '@/services/audioProcessingService';
import { BookOpen, Brain, Headphones, Mic, Pencil } from 'lucide-react';
import { toast } from 'sonner';

const PronunciationFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [transcription, setTranscription] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAudioSubmit = async (audioBlob: Blob) => {
    if (audioBlob.size === 0) {
      toast.error('Audio recording is empty');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Process audio in parallel for efficiency
      const [feedbackResults, transcriptionResult] = await Promise.all([
        processAudio(audioBlob),
        transcribeAudio(audioBlob)
      ]);
      
      setFeedback(feedbackResults);
      setTranscription(transcriptionResult);
      
      toast.success('Audio analysis complete!');
    } catch (error) {
      console.error('Error analyzing audio:', error);
      toast.error('Failed to analyze audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-secondary/50 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-medium mb-4 animate-pulse-soft">
                AI-Powered Pronunciation Analysis
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight animate-slide-down">
                Get Pronunciation & Grammar Feedback
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up">
                Record your speech and receive instant AI-powered feedback on your pronunciation 
                and grammar. Improve your English speaking skills with constructive suggestions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <div className="py-2 px-6 bg-brain-articulation text-white rounded-full flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Pronunciation
              </div>
              <div className="py-2 px-6 bg-brain-reading text-white rounded-full flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Grammar
              </div>
              <div className="py-2 px-6 bg-brain-writing text-white rounded-full flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                Suggestions
              </div>
              <div className="py-2 px-6 bg-brain-podcast text-white rounded-full flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                Audio Analysis
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Audio Recording */}
              <div>
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Mic className="w-5 h-5 text-brain-articulation" />
                    Record Your Speech
                  </h2>
                  
                  <div className="mb-6">
                    <p className="text-muted-foreground mb-4">
                      Speak clearly into your microphone. Try reading a passage, answering a question, 
                      or practicing a specific phrase you find challenging.
                    </p>
                    
                    <div className="p-4 bg-muted/50 rounded-lg mb-4">
                      <h3 className="font-medium mb-2">Suggested practice phrase:</h3>
                      <p className="italic">
                        "The thorough weather forecast predicted thunderstorms and heavy rainfall throughout Thursday and Friday."
                      </p>
                    </div>
                  </div>
                  
                  <AudioRecorder onAudioReady={handleAudioSubmit} isProcessing={isProcessing} />
                </div>
              </div>
              
              {/* Right Column - Feedback */}
              <div>
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Feedback
                  </h2>
                  
                  {transcription && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Transcription:</h3>
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <p className="text-sm">{transcription}</p>
                      </div>
                    </div>
                  )}
                  
                  <FeedbackDisplay feedback={feedback} />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tips Section */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">Pronunciation Improvement Tips</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-medium text-lg mb-3">Listen & Repeat</h3>
                <p className="text-muted-foreground">
                  Listen to native speakers and repeat what they say. Pay attention to the mouth movements and sounds.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-medium text-lg mb-3">Record Yourself</h3>
                <p className="text-muted-foreground">
                  Record your speech regularly and compare it to native speakers. Note differences in pronunciation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-medium text-lg mb-3">Practice Minimal Pairs</h3>
                <p className="text-muted-foreground">
                  Work with minimal pairs (words that differ by only one sound) like "ship/sheep" or "bat/bad".
                </p>
              </div>
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

export default PronunciationFeedback;
