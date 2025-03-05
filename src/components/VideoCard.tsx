
import React from 'react';
import { formatYoutubeEmbedUrl, formatSpotifyEmbedUrl, getExerciseTypeColor, isSpotifyUrl } from '@/lib/utils';
import { Video } from '@/types';
import { BookOpen, Headphones, Mic, Pencil, Trash2 } from 'lucide-react';
import { useVideos } from '@/context/VideoContext';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { deleteVideo } = useVideos();
  const isSpotify = isSpotifyUrl(video.youtubeUrl);
  const embedUrl = isSpotify 
    ? formatSpotifyEmbedUrl(video.youtubeUrl) 
    : formatYoutubeEmbedUrl(video.youtubeUrl);
  
  const getIcon = () => {
    switch(video.exerciseType) {
      case 'articulation':
        return <Mic className="w-4 h-4" />;
      case 'reading':
        return <BookOpen className="w-4 h-4" />;
      case 'writing':
        return <Pencil className="w-4 h-4" />;
      case 'podcast':
        return <Headphones className="w-4 h-4" />;
      default:
        return null;
    }
  };
  
  const getTypeLabel = () => {
    return video.exerciseType.charAt(0).toUpperCase() + video.exerciseType.slice(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-md animate-fade-in">
      <div className={`media-container ${isSpotify ? 'spotify-container' : 'video-container'}`}>
        <iframe 
          src={embedUrl} 
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={!isSpotify}
          loading="lazy"
          style={isSpotify ? { borderRadius: '12px' } : {}}
        ></iframe>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getExerciseTypeColor(video.exerciseType)}`}>
            {getIcon()}
            <span>{getTypeLabel()}</span>
          </div>
          
          <button 
            onClick={() => deleteVideo(video.id)}
            className="text-gray-400 hover:text-destructive transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Delete video"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <h3 className="font-medium text-lg line-clamp-1 mb-1">{video.title}</h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
          {video.description}
        </p>
        
        <div className="text-xs text-muted-foreground mt-2">
          Added: {new Date(video.dateAdded).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
