
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video, VideoContextType, ExerciseType } from '../types';
import { generateId } from '../lib/utils';
import { toast } from 'sonner';

const LOCAL_STORAGE_KEY = 'brainwave-videos';

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(() => {
    try {
      // When in browser environment, try to load from localStorage
      if (typeof window !== 'undefined') {
        const savedVideos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedVideos) {
          return JSON.parse(savedVideos);
        }
      }
    } catch (e) {
      console.error('Error loading videos from localStorage:', e);
    }
    return [];
  });

  // Save to localStorage whenever videos change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
      }
    } catch (e) {
      console.error('Error saving videos to localStorage:', e);
    }
  }, [videos]);

  const addVideo = (videoData: Omit<Video, 'id' | 'dateAdded'>) => {
    const newVideo: Video = {
      ...videoData,
      id: generateId(),
      dateAdded: new Date().toISOString(),
    };
    setVideos(prev => [newVideo, ...prev]);
    toast.success('Video added successfully');
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(video => video.id !== id));
    toast.info('Video removed');
  };

  const filterByType = (type: ExerciseType | 'all') => {
    if (type === 'all') return videos;
    return videos.filter(video => video.exerciseType === type);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo, deleteVideo, filterByType }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};
