
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll to element
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="py-4 md:py-6 border-b border-white/10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-ninja-accent font-poppins font-bold text-xl">ninja</span>
          <span className="font-poppins font-bold text-xl">Chef</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-white/80 hover:text-white transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-white/80 hover:text-white transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-white/80 hover:text-white transition-colors"
          >
            Testimonials
          </button>
        </div>
        <Button className="bg-ninja-accent hover:bg-ninja-accent/90 text-white">Try ninjaChef</Button>
      </div>
    </nav>
  );
};

export default Navbar;
