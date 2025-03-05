
import React from 'react';
import { Headphones } from 'lucide-react';
import { useVideos } from '@/context/VideoContext';
import VideoCard from './VideoCard';

const PodcastSection: React.FC = () => {
  const { filterByType } = useVideos();
  const podcasts = filterByType('podcast');

  return (
    <section id="podcast" className="py-12 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Headphones className="w-6 h-6 text-brain-podcast" />
          <h2 className="text-2xl font-semibold">Podcast Exercises</h2>
        </div>
        
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Improve your auditory processing and listening comprehension with these curated podcast exercises. Perfect for developing ear-training and understanding natural English speech patterns.
        </p>
        
        {podcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map(podcast => (
              <VideoCard key={podcast.id} video={podcast} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Headphones className="w-6 h-6 text-brain-podcast" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Podcast Exercises Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Add your first podcast exercise using the form below.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PodcastSection;
