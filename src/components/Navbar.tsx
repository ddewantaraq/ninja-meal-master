
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="py-4 md:py-6 border-b border-white/10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-ninja-accent font-poppins font-bold text-xl">ninja</span>
          <span className="font-poppins font-bold text-xl">Chef</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</a>
        </div>
        <Button className="bg-ninja-accent hover:bg-ninja-accent/90 text-white">Try ninjaChef</Button>
      </div>
    </nav>
  );
};

export default Navbar;
