
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ninjaChefService } from '@/api/ninjaChefService';

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

  const handleTryNinjaChef = () => {
    ninjaChefService.handleTryNinjaChef();
  };

  return (
    <motion.nav 
      className="py-4 md:py-6 border-b border-white/10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="text-ninja-accent font-poppins font-bold text-xl">ninja</span>
          <span className="font-poppins font-bold text-xl">Chef</span>
        </motion.div>
        <div className="hidden md:flex items-center gap-8">
          <motion.button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            How It Works
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('features')} 
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Testimonials
          </motion.button>
        </div>
        <Link to="/meal-plan" onClick={handleTryNinjaChef}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-ninja-accent hover:bg-ninja-accent/90 text-white">
              Try ninjaChef
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
