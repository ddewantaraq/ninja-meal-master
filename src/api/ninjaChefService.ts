
import { mastraClient } from './mastra';

/**
 * NinjaChef API service for handling meal plan generation
 */
export const ninjaChefService = {
  /**
   * Generate a meal plan based on user ingredients
   * @param message User's message containing ingredient information
   * @returns Generated meal plan data
   */
  generateMealPlan: async (message: string) => {
    try {
      // Get the ninjaChef agent from Mastra
      const agent = mastraClient.getAgent('ninjaChefAgent');
      
      // Send the user's message to the agent
      const response = await agent.generate({
        messages: [{ role: 'user', content: message }],
      });
      
      return response;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw error;
    }
  },
  
  /**
   * Start a ninjaChef workflow run (React adaptation of Next.js workflow)
   * @param message User's message with ingredients
   * @returns Promise resolving to workflow result
   */
  startNinjaChefWorkflow: async (message: string) => {
    try {
      // Get the workflow and create a run
      const workflow = mastraClient.getWorkflow("ninjachef-workflow");
      const { start } = workflow.createRun();
      
      // Start the workflow with trigger data
      const result = await start({
        triggerData: { message: message },
      });
      
      return result;
    } catch (error) {
      console.error('Error starting ninjaChef workflow:', error);
      throw error;
    }
  }
};
