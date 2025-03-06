
import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Headphones, Mic, Pencil, Brain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const navigationLinks = [
    { href: "/articulation", label: "Articulation", icon: <Mic className="w-4 h-4" /> },
    { href: "/reading", label: "Reading", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/writing", label: "Writing", icon: <Pencil className="w-4 h-4" /> },
    { href: "/podcast", label: "Podcasts", icon: <Headphones className="w-4 h-4" /> },
    { href: "/pronunciation-feedback", label: "AI Feedback", icon: <Brain className="w-4 h-4" /> },
  ];
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">Brainwave</span>
        </Link>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <nav className={cn(
          "md:flex items-center gap-6",
          isMobile ? "hidden" : ""
        )}>
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                isScrolled ? "text-gray-700 hover:text-primary" : "text-gray-800 hover:text-primary",
                location.pathname === link.href ? "text-primary font-semibold" : ""
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 pt-16">
            <div className="container mx-auto px-4">
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-4 pt-8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100",
                      location.pathname === link.href ? "bg-gray-100 font-medium" : ""
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
