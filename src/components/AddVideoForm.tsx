
import React, { useState } from 'react';
import { useVideos } from '@/context/VideoContext';
import { ExerciseType } from '@/types';
import { extractYoutubeVideoId, extractSpotifyId, isSpotifyUrl } from '@/lib/utils';
import { BookOpen, Headphones, Mic, Pencil, Music } from 'lucide-react';
import { toast } from 'sonner';

const AddVideoForm: React.FC = () => {
  const { addVideo } = useVideos();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [exerciseType, setExerciseType] = useState<ExerciseType>('articulation');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim() || !title.trim()) {
      toast.error('Please enter a title and URL');
      return;
    }

    const isSpotify = isSpotifyUrl(url);
    let isValidUrl = false;
    
    if (isSpotify) {
      const spotifyId = extractSpotifyId(url);
      isValidUrl = !!spotifyId;
    } else {
      const videoId = extractYoutubeVideoId(url);
      isValidUrl = !!videoId;
    }

    if (!isValidUrl) {
      toast.error('Please enter a valid YouTube or Spotify URL');
      return;
    }

    setIsSubmitting(true);
    
    try {
      addVideo({
        title,
        description,
        youtubeUrl: url,
        exerciseType,
      });
      
      // Reset form
      setUrl('');
      setTitle('');
      setDescription('');
      setExerciseType('articulation');
    } catch (error) {
      console.error('Error adding video:', error);
      toast.error('Failed to add exercise. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Exercise</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium">
            YouTube or Spotify URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Music className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/... or https://open.spotify.com/..."
              className="pl-10 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Exercise Title"
            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this exercise..."
            rows={3}
            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Exercise Type
          </label>
          <div className="flex flex-wrap gap-3 pt-1">
            <label 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${exerciseType === 'articulation' ? 'bg-brain-articulation text-white border-brain-articulation' : 'border-gray-200 hover:border-brain-articulation/50'}`}
            >
              <input 
                type="radio" 
                name="exerciseType" 
                value="articulation"
                checked={exerciseType === 'articulation'}
                onChange={() => setExerciseType('articulation')}
                className="sr-only"
              />
              <Mic className="w-4 h-4" />
              <span>Articulation</span>
            </label>
            
            <label 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${exerciseType === 'reading' ? 'bg-brain-reading text-white border-brain-reading' : 'border-gray-200 hover:border-brain-reading/50'}`}
            >
              <input 
                type="radio" 
                name="exerciseType" 
                value="reading"
                checked={exerciseType === 'reading'}
                onChange={() => setExerciseType('reading')}
                className="sr-only"
              />
              <BookOpen className="w-4 h-4" />
              <span>Reading</span>
            </label>
            
            <label 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${exerciseType === 'writing' ? 'bg-brain-writing text-white border-brain-writing' : 'border-gray-200 hover:border-brain-writing/50'}`}
            >
              <input 
                type="radio" 
                name="exerciseType" 
                value="writing"
                checked={exerciseType === 'writing'}
                onChange={() => setExerciseType('writing')}
                className="sr-only"
              />
              <Pencil className="w-4 h-4" />
              <span>Writing</span>
            </label>
            
            <label 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${exerciseType === 'podcast' ? 'bg-brain-podcast text-white border-brain-podcast' : 'border-gray-200 hover:border-brain-podcast/50'}`}
            >
              <input 
                type="radio" 
                name="exerciseType" 
                value="podcast"
                checked={exerciseType === 'podcast'}
                onChange={() => setExerciseType('podcast')}
                className="sr-only"
              />
              <Headphones className="w-4 h-4" />
              <span>Podcast</span>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-4 flex items-center justify-center"
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isSubmitting ? 'Adding...' : 'Add Exercise'}
        </button>
      </form>
    </div>
  );
};

export default AddVideoForm;
