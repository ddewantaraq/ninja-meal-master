
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Menu {
  time: string;
  menu_name: string;
  steps_to_cook: string;
}

interface DayPlan {
  day: number;
  menus: Menu[];
}

interface MealPlanProps {
  mealPlan: {
    meal_plan: DayPlan[];
  };
}

const MealPlanDisplay: React.FC<MealPlanProps> = ({ mealPlan }) => {
  const [activeDay, setActiveDay] = useState<number>(1);

  // Animation variants for the meal plan cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Animation variants for day tab buttons
  const tabVariants = {
    inactive: { scale: 0.95, opacity: 0.7 },
    active: { 
      scale: 1, 
      opacity: 1,
      boxShadow: "0 0 15px rgba(234, 56, 76, 0.5)" 
    }
  };

  return (
    <div className="p-6 h-full">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Your <span className="text-ninja-accent">Meal Plan</span>
        </h1>
        <p className="text-white/70">
          Personalized recipes based on your available ingredients
        </p>
      </motion.div>

      {/* Days tabs */}
      <motion.div 
        className="flex mb-6 overflow-x-auto pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {mealPlan.meal_plan.map((day) => (
          <motion.button
            key={day.day}
            onClick={() => setActiveDay(day.day)}
            className={`px-6 py-2 rounded-full mr-2 transition-colors ${
              activeDay === day.day
                ? 'bg-ninja-accent text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            variants={tabVariants}
            animate={activeDay === day.day ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Day {day.day}
          </motion.button>
        ))}
      </motion.div>

      {/* Active day meals */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeDay}
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {mealPlan.meal_plan
            .find((day) => day.day === activeDay)
            ?.menus.map((menu, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/8 transition-colors">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-ninja-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <CardHeader className="relative z-10">
                    <motion.span 
                      className="text-sm uppercase text-ninja-accent font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {menu.time}
                    </motion.span>
                    <CardTitle>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {menu.menu_name}
                      </motion.span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <div className="space-y-2">
                      {menu.steps_to_cook.split('\n').map((step, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 + index * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-ninja-accent/20 flex items-center justify-center text-sm flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-white/80">{step.substring(step.indexOf('.') + 1).trim()}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {(!mealPlan.meal_plan.length || 
          !mealPlan.meal_plan.find((day) => day.day === activeDay)?.menus.length) && (
          <motion.div 
            className="text-center py-12 bg-white/5 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-white/60">No meals planned for this day yet.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealPlanDisplay;
