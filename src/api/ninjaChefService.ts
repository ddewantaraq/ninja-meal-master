
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
   * @param threadId User's session thread ID
   * @param userId User's session user ID
   * @returns Promise resolving to workflow result
   */
  startNinjaChefWorkflow: async (message: string, threadId: string, userId: number) => {
    try {
      // Get the workflow
      const workflow = mastraClient.getWorkflow("ninjaChefWorkflow");
      
      // Create a run and get the runId
      const createRunResult = await workflow.createRun();
      const runId = createRunResult.runId;
      
      // Start the workflow with trigger data including threadId and userId
      const result = await workflow.startAsync({
        runId,
        triggerData: { message: message, threadId: threadId, userId: userId },
      });
      
      return result.results;
    } catch (error) {
      console.error('Error starting ninjaChef workflow:', error);
      throw error;
    }
  }
};
