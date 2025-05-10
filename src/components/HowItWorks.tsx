
import React from 'react';
import { Utensils, Book, Clock } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Utensils className="w-12 h-12 text-ninja-accent" />,
      title: "List your ingredients",
      description: "Tell ninjaChef what's in your pantry and fridge. Even with just a few items, it can work wonders."
    },
    {
      icon: <Book className="w-12 h-12 text-ninja-accent" />,
      title: "Get a full-day meal plan",
      description: "Receive creative recipes for breakfast, lunch, and dinner using only what you have."
    },
    {
      icon: <Clock className="w-12 h-12 text-ninja-accent" />,
      title: "Cook with step-by-step instructions",
      description: "Follow clear, precise cooking directions with clever substitutions when needed."
    }
  ];

  return (
    <section id="how-it-works" className="section bg-black/20 py-20">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How ninjaChef Works</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Turn any kitchen situation into a culinary success with our AI-powered assistant
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-ninja-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-ninja-accent/5 ${
                index === 0 ? 'animate-slide-from-left' : 
                index === 2 ? 'animate-slide-from-right' : 'animate-fade-in'
              }`}
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-ninja-accent mr-2">Step {index + 1}:</span> {step.title}
              </h3>
              <p className="text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
