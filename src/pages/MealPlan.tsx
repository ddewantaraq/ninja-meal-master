
import React, { useState } from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import MealPlanDisplay from '../components/mealplan/MealPlanDisplay';

// Sample meal plan data
const sampleMealPlan = {
  meal_plan: [
    {
      day: 1,
      menus: [
        {
          time: "breakfast",
          menu_name: "Spaghetti Breakfast Bowl",
          steps_to_cook: "1. Boil pasta.\n2. Add sauce.\n3. Top with a poached egg and fresh herbs.",
        },
        {
          time: "lunch",
          menu_name: "Simple Rice Bowl",
          steps_to_cook: "1. Rinse rice.\n2. Steam for 20 minutes.\n3. Serve with your choice of protein and vegetables.",
        },
      ],
    },
    {
      day: 2,
      menus: [
        {
          time: "breakfast",
          menu_name: "Fluffy Pancakes",
          steps_to_cook: "1. Mix batter.\n2. Fry on pan.\n3. Serve with maple syrup and fresh berries.",
        },
      ],
    },
  ],
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const MealPlan: React.FC = () => {
  const [mealPlan, setMealPlan] = useState(sampleMealPlan);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to ninjaChef! Tell me what ingredients you have, and I\'ll create a meal plan for you.',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Simulate assistant response (in a real app, this would make an API call)
    setTimeout(() => {
      const assistantResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I've created a meal plan based on your ingredients! Check out the details on the right.",
      };
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-ninja-dark text-white">
      {/* Left column - Chat interface */}
      <div className="w-full lg:w-1/3 border-r border-white/10 flex flex-col">
        <ChatInterface 
          messages={messages} 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>

      {/* Right column - Meal plan display */}
      <div className="w-full lg:w-2/3 overflow-auto">
        <MealPlanDisplay mealPlan={mealPlan} />
      </div>
    </div>
  );
};

export default MealPlan;
