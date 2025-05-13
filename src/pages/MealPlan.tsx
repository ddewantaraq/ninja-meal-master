
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/chat/ChatInterface';
import MealPlanDisplay from '../components/mealplan/MealPlanDisplay';
import { ninjaChefService } from '../api/ninjaChefService';
import { toast } from "@/hooks/use-toast";
import { MealPlanData, Message } from '@/types';
import { storage } from '@/utils/storage';

const MealPlan: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<MealPlanData>({ meal_plan: [] });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to ninjaChef! Tell me what ingredients you have, and I\'ll create a meal plan for you. 🍲',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Load user session if available
  useEffect(() => {
    const session = storage.getItem('ninjaChef_session');
    if (session) {
      console.log('User session loaded:', session);
    }
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Show loading state
    setIsLoading(true);

    try {
      // Use the centralized API service to generate meal plan
      const response = await ninjaChefService.startNinjaChefWorkflow(message);
      
      // Parse the response to get meal plan data
      let mealPlanData: MealPlanData;
      try {
        // Attempt to parse JSON from response
        if (!response?.['generate-meal-plan']?.['output']) {
          mealPlanData = { meal_plan: [] };
        } else {
          mealPlanData = response['generate-meal-plan']['output'];
        }
      } catch (error) {
        console.error('Failed to parse meal plan data:', error);
        toast({
          title: "Error parsing meal plan",
          description: "There was an issue with the response format.",
          variant: "destructive"
        });
        
        // Use empty meal plan as fallback
        mealPlanData = { meal_plan: [] };
      }

      // Update meal plan state
      setMealPlan(mealPlanData);
      
      // Add assistant response
      const assistantResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I've created a meal plan based on your ingredients! Check out the details on the right. 🍳",
      };
      
      setMessages(prev => [...prev, assistantResponse]);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      
      // Show error in chat
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I'm sorry, I encountered an error creating your meal plan. Please try again with different ingredients.",
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection error",
        description: "Failed to connect to the ninjaChef service.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Page transition animation
  const pageVariants = {
    initial: { 
      opacity: 0,
    },
    in: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col lg:flex-row h-screen bg-ninja-dark text-white"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
    >
      {/* Left column - Chat interface */}
      <motion.div 
        className="w-full lg:w-1/3 border-r border-white/10 flex flex-col"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ChatInterface 
          messages={messages} 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Right column - Meal plan display */}
      <motion.div 
        className="w-full lg:w-2/3 overflow-auto"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MealPlanDisplay mealPlan={mealPlan} />
      </motion.div>
    </motion.div>
  );
};

export default MealPlan;
