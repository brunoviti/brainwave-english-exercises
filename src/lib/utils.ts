
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function extractYoutubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export function formatYoutubeEmbedUrl(url: string): string {
  const videoId = extractYoutubeVideoId(url);
  if (!videoId) return '';
  
  // Extract start time if present
  const startTimeMatch = url.match(/[?&]t=(\d+)/);
  const startTime = startTimeMatch ? startTimeMatch[1] : '';
  
  let embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
  // Add parameters
  const params = new URLSearchParams();
  
  if (startTime) {
    params.append('start', startTime);
  }
  
  params.append('rel', '0');
  
  return `${embedUrl}?${params.toString()}`;
}

export function getExerciseTypeColor(type: string): string {
  switch(type) {
    case 'articulation':
      return 'bg-brain-articulation';
    case 'reading':
      return 'bg-brain-reading';
    case 'writing':
      return 'bg-brain-writing';
    default:
      return 'bg-gray-400';
  }
}

export function getExerciseTypeIcon(type: string): string {
  switch(type) {
    case 'articulation':
      return 'mic';
    case 'reading':
      return 'book-open';
    case 'writing':
      return 'pencil';
    default:
      return 'youtube';
  }
}
