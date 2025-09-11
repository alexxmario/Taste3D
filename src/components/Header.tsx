import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Header: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo în stânga */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Taste3D Logo" 
              className="h-10 w-auto hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Navigație */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/portofoliu">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
              >
                Portofoliu
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              onClick={scrollToContact}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Button>
          </nav>

          {/* Mobile navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/portofoliu">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary"
              >
                Portofoliu
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToContact}
              className="text-foreground hover:text-primary"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;