
import { generateUserSession, storage } from '@/utils/storage';
import { mastraClient } from './mastra';
import { ApiMessage } from '@/types';

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
  },
  
  /**
   * Get message history for a thread
   * @param threadId Thread ID to fetch messages for
   * @returns Promise resolving to message history array
   */
  getMessageHistory: async (threadId: string): Promise<ApiMessage[]> => {
    try {
      const thread = mastraClient.getMemoryThread(threadId, "ninjaChefAgent");
      const details = await thread.getMessages();
      
      // Convert CoreMessage[] to ApiMessage[] by mapping and ensuring required fields
      return details.messages.map(msg => ({
        id: msg.id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        role: msg.role || 'assistant',
        content: msg.content || '',
        type: msg.type,
        createdAt: msg.createdAt || new Date().toISOString(),
        threadId: msg.threadId || threadId
      })) as ApiMessage[];
    } catch (error) {
      console.error('Error getting threads:', error);
      throw error;
    }
  },
  
  handleTryNinjaChef: () => {
    const session = storage.getItem<{threadId: string, userId: number}>('ninjaChef_session');
    if (!session) {
      const userSession = generateUserSession();
      storage.setItem('ninjaChef_session', userSession);
    }
  }
};
