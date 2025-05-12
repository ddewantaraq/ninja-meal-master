
import React, { useState } from 'react';
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

  return (
    <div className="p-6 h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Your <span className="text-ninja-accent">Meal Plan</span>
        </h1>
        <p className="text-white/70">
          Personalized recipes based on your available ingredients
        </p>
      </div>

      {/* Days tabs */}
      <div className="flex mb-6 overflow-x-auto pb-2">
        {mealPlan.meal_plan.map((day) => (
          <button
            key={day.day}
            onClick={() => setActiveDay(day.day)}
            className={`px-6 py-2 rounded-full mr-2 transition-colors ${
              activeDay === day.day
                ? 'bg-ninja-accent text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      {/* Active day meals */}
      <div className="grid gap-6 md:grid-cols-2">
        {mealPlan.meal_plan
          .find((day) => day.day === activeDay)
          ?.menus.map((menu, index) => (
            <Card key={index} className="bg-white/5 border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-ninja-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <CardHeader className="relative z-10">
                <span className="text-sm uppercase text-ninja-accent font-medium">
                  {menu.time}
                </span>
                <CardTitle>{menu.menu_name}</CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="space-y-2">
                  {menu.steps_to_cook.split('\n').map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-ninja-accent/20 flex items-center justify-center text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-white/80">{step.substring(step.indexOf('.') + 1).trim()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Empty state */}
      {(!mealPlan.meal_plan.length || 
        !mealPlan.meal_plan.find((day) => day.day === activeDay)?.menus.length) && (
        <div className="text-center py-12 bg-white/5 rounded-lg">
          <p className="text-white/60">No meals planned for this day yet.</p>
        </div>
      )}
    </div>
  );
};

export default MealPlanDisplay;
