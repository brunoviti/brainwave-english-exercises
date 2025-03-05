
export type ExerciseType = 'articulation' | 'reading' | 'writing' | 'podcast';

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  exerciseType: ExerciseType;
  dateAdded: string;
}

export interface VideoContextType {
  videos: Video[];
  addVideo: (video: Omit<Video, 'id' | 'dateAdded'>) => void;
  deleteVideo: (id: string) => void;
  filterByType: (type: ExerciseType | 'all') => Video[];
}
