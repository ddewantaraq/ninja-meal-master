
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { generateUserSession, storage } from '@/utils/storage';

const Hero: React.FC = () => {
  const handleTryNinjaChef = () => {
    const userSession = generateUserSession();
    storage.setItem('ninjaChef_session', userSession);
  };

  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-ninja-primary/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-ninja-accent/20 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cook Like a <span className="text-ninja-accent">Ninja</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Limited ingredients. Legendary meals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/meal-plan" onClick={handleTryNinjaChef}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-ninja-accent hover:bg-ninja-accent/90 text-white text-lg">
                    Try ninjaChef now
                  </Button>
                </motion.div>
              </Link>
              <Button size="lg" variant="outline" className="border-ninja-accent text-ninja-accent hover:bg-white/20 hover:text-white hover:border-ninja-accent text-lg">
                Learn more
              </Button>
            </div>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <ChefHat size={16} />
                <span>1000+ recipes</span>
              </div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div>No account needed</div>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-slide-from-right">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-ninja-primary to-ninja-secondary opacity-20 rounded-full blur-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-br from-ninja-primary/70 to-ninja-secondary/70 flex items-center justify-center">
                  <ChefHat className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
