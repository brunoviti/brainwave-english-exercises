
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function extractYoutubeVideoId(url: string): string | null {
  // Handle youtube.com/shorts URLs
  if (url.includes('youtube.com/shorts/')) {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^/?&]+)/);
    if (shortsMatch && shortsMatch[1]) {
      return shortsMatch[1];
    }
  }
  
  // Handle traditional YouTube URLs
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

export function isSpotifyUrl(url: string): boolean {
  return url.includes('open.spotify.com');
}

export function isInstagramUrl(url: string): boolean {
  return url.includes('instagram.com') && (url.includes('/reel/') || url.includes('/p/'));
}

export function extractSpotifyId(url: string): string | null {
  const regExp = /open\.spotify\.com\/(episode|track|show|playlist)\/([^?&]+)/;
  const match = url.match(regExp);
  return match && match[2] ? match[2] : null;
}

export function extractInstagramId(url: string): string | null {
  // Handle both reel and post URLs
  const regExp = /instagram\.com\/(reel|p)\/([^/?&]+)/;
  const match = url.match(regExp);
  return match && match[2] ? match[2] : null;
}

export function formatSpotifyEmbedUrl(url: string): string {
  const spotifyId = extractSpotifyId(url);
  if (!spotifyId) return '';
  
  // Determine if it's an episode, track, show or playlist
  let type = 'episode';
  if (url.includes('/track/')) type = 'track';
  if (url.includes('/show/')) type = 'show';
  if (url.includes('/playlist/')) type = 'playlist';
  
  return `https://open.spotify.com/embed/${type}/${spotifyId}`;
}

export function formatInstagramEmbedUrl(url: string): string {
  const instagramId = extractInstagramId(url);
  if (!instagramId) return '';
  
  // Determine if it's a reel or post
  const isReel = url.includes('/reel/');
  const type = isReel ? 'reel' : 'p';
  
  // Create the embed URL
  return `https://www.instagram.com/${type}/${instagramId}/embed`;
}

export function getExerciseTypeColor(type: string): string {
  switch(type) {
    case 'articulation':
      return 'bg-brain-articulation';
    case 'reading':
      return 'bg-brain-reading';
    case 'writing':
      return 'bg-brain-writing';
    case 'podcast':
      return 'bg-brain-podcast';
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
    case 'podcast':
      return 'headphones';
    default:
      return 'youtube';
  }
}

// Animation utilities for Tailwind
export const animationConfig = {
  'fade-in': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
};

export interface TextError {
  text: string;
  suggestion: string;
  explanation: string;
  severity: 'error' | 'warning' | 'info';
}

// Common American English grammar and spelling errors
export const commonErrors: TextError[] = [
  {
    text: 'alot',
    suggestion: 'a lot',
    explanation: '"A lot" is always written as two separate words in standard American English.',
    severity: 'error'
  },
  {
    text: 'your welcome',
    suggestion: "you're welcome",
    explanation: 'Use "you\'re" (contraction of "you are") instead of the possessive "your" in this context.',
    severity: 'error'
  },
  {
    text: 'could of',
    suggestion: 'could have',
    explanation: 'The correct phrase is "could have" (often contracted to "could\'ve"), not "could of".',
    severity: 'error'
  },
  {
    text: 'i ',
    suggestion: 'I ',
    explanation: 'The first-person singular pronoun "I" is always capitalized in English.',
    severity: 'error'
  },
  {
    text: 'loose ',
    suggestion: 'lose ',
    explanation: '"Loose" means not tight, while "lose" means to be deprived of or to fail to win.',
    severity: 'warning'
  },
  {
    text: 'effect ',
    suggestion: 'affect ',
    explanation: '"Effect" is usually a noun, while "affect" is usually a verb meaning to influence.',
    severity: 'warning'
  },
  {
    text: 'irregardless',
    suggestion: 'regardless',
    explanation: '"Irregardless" is not standard in American English. Use "regardless" instead.',
    severity: 'error'
  },
  {
    text: 'then ',
    suggestion: 'than ',
    explanation: 'Use "than" for comparisons and "then" for time or sequence.',
    severity: 'warning'
  }
];

export function analyzeTextGrammar(text: string): TextError[] {
  // This would be expanded in a real application with more sophisticated analysis
  // For now, it just looks for common errors
  const errors: TextError[] = [];
  
  commonErrors.forEach(error => {
    if (text.toLowerCase().includes(error.text)) {
      errors.push(error);
    }
  });
  
  return errors;
}
