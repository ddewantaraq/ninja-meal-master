
import React from 'react';
import { ChefHat, BookOpen, Clock, Utensils } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Smart ingredient substitution",
      description: "Out of an ingredient? ninjaChef suggests perfect alternatives that maintain the dish's integrity."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Western & Asian recipes",
      description: "Expansive culinary knowledge spanning multiple cuisines and cooking techniques."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Saves time, reduces waste",
      description: "Use what you already have instead of making extra shopping trips or throwing away food."
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Supports dietary needs",
      description: "Accommodates vegetarian, gluten-free, and other dietary preferences with ease."
    }
  ];

  return (
    <section id="features" className="section bg-gradient-to-b from-ninja-dark to-black/90">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ninjaChef?</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Your personal AI cooking assistant, designed for real kitchen situations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="p-3 bg-ninja-accent/10 rounded-lg text-ninja-accent">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
