
import React from 'react';
import { ExerciseType } from '@/types';
import { BookOpen, Mic, Pencil } from 'lucide-react';
import { useVideos } from '@/context/VideoContext';
import VideoCard from './VideoCard';

interface ExerciseSectionProps {
  type: ExerciseType;
  title: string;
  description: string;
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({ type, title, description }) => {
  const { filterByType } = useVideos();
  const videos = filterByType(type);

  const getIcon = () => {
    switch(type) {
      case 'articulation':
        return <Mic className="w-6 h-6 text-brain-articulation" />;
      case 'reading':
        return <BookOpen className="w-6 h-6 text-brain-reading" />;
      case 'writing':
        return <Pencil className="w-6 h-6 text-brain-writing" />;
      default:
        return null;
    }
  };

  return (
    <section id={type} className="py-12 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          {getIcon()}
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        
        <p className="text-muted-foreground mb-8 max-w-2xl">
          {description}
        </p>
        
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              {getIcon()}
            </div>
            <h3 className="text-lg font-medium mb-1">No {title} Exercises Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Add your first {type} exercise video using the form below.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExerciseSection;
