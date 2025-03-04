
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled 
          ? 'py-3 glass border-b border-gray-200/20' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brain-articulation to-brain-reading flex items-center justify-center">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl tracking-tight">Brainwave</h1>
            <p className="text-xs text-muted-foreground">English Exercises</p>
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#articulation" className="text-sm font-medium hover:text-primary transition-colors">
            Articulation
          </a>
          <a href="#reading" className="text-sm font-medium hover:text-primary transition-colors">
            Reading
          </a>
          <a href="#writing" className="text-sm font-medium hover:text-primary transition-colors">
            Writing
          </a>
          <a href="#add-video" className="text-sm font-medium hover:text-primary transition-colors">
            Add Video
          </a>
        </nav>
        
        <div className="md:hidden">
          <button className="p-2 rounded-md hover:bg-gray-100/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
