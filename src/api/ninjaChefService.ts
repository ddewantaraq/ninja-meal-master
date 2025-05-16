import { generateUserSession, storage } from '@/utils/storage';
import { mastraClient, safeApiCall } from './mastra';
import { MsgHistory } from '@/types';

export const NINJA_CHEF_EXTRACT_DATA = 'ninjaChefExtractData';
export const NINJA_CHEF_MEAL_PLANNER = 'ninjaChefMealPlanner';

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
    return safeApiCall(async () => {
      // Get the ninjaChef agent from Mastra
      const agent = mastraClient.getAgent(NINJA_CHEF_MEAL_PLANNER);
      
      // Send the user's message to the agent
      const response = await agent.generate({
        messages: [{ role: 'user', content: message }],
      });
      
      return response;
    });
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
      return await safeApiCall(async () => {
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
      });
    } catch (error) {
      console.error('Error starting ninjaChef workflow:', error);
      // Return a fallback response when in production without proper API setup
      if (import.meta.env.PROD && !import.meta.env.VITE_MASTRA_API_URL) {
        return { status: 'fallback', message: 'API not configured for production' };
      }
      throw error;
    }
  },
  
  /**
   * Get message history for a thread
   * @param threadId Thread ID to fetch messages for
   * @returns Promise resolving to message history array
   */
  getMessageHistory: async (threadId: string): Promise<MsgHistory[]> => {
    try {
      return await safeApiCall(async () => {
        const thread = mastraClient.getMemoryThread(threadId, NINJA_CHEF_EXTRACT_DATA);
        const details = await thread.getMessages();
        
        // Safely convert CoreMessage[] to ApiMessage[] with proper type handling
        return details.messages.map(msg => {
          // Create a unique ID if none exists
          const uniqueId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
          
          // Create a properly typed ApiMessage object
          const apiMessage: MsgHistory = {
            id: msg['id'] || uniqueId,
            role: typeof msg.role === 'string' ? 
              (msg.role === 'user' || msg.role === 'assistant' ? msg.role : 'assistant') : 
              'assistant',
            content: typeof msg.content === 'string' ? msg.content : '',
            threadId: threadId
          };
          
          // Add optional fields if they exist in the message
          if ('type' in msg && msg.type) {
            apiMessage.type = String(msg.type);
          }
          
          if ('createdAt' in msg && msg.createdAt) {
            apiMessage.createdAt = String(msg.createdAt);
          } else {
            apiMessage.createdAt = new Date().toISOString();
          }
          
          return apiMessage;
        });
      });
    } catch (error) {
      console.error('Error getting threads:', error);
      // Return an empty array when in production without proper API setup
      if (import.meta.env.PROD && !import.meta.env.VITE_MASTRA_API_URL) {
        return [];
      }
      throw error;
    }
  },
  
  /**
   * check user session and create a new one if it doesn't exist
   * @returns void
   * @description This function checks if a user session exists in local storage. If it doesn't, it generates a new user session and stores it.
   */
  handleTryNinjaChef: () => {
    const session = storage.getItem<{threadId: string, userId: number}>('ninjaChef_session');
    if (!session) {
      const userSession = generateUserSession();
      storage.setItem('ninjaChef_session', userSession);
    }
  },
  
  /**
   * save a message to the memory thread
   * @param message Message object to save
   * @returns void
   * @description This function saves a message to the memory thread using the Mastra client. It retrieves the thread details and saves the message with the appropriate parameters.
   */
  saveMessage: async (message: MsgHistory) => {
    try {
      await safeApiCall(async () => {
        const thread = mastraClient.getMemoryThread(message.threadId, NINJA_CHEF_EXTRACT_DATA);
        const details = await thread.get();
        await mastraClient.saveMessageToMemory({
          messages: [
            {
              id: message.id,
              role: message.role === 'user' ? 'user' : 'assistant',
              content: message.content,
              type: message.type === 'text' ? 'text' : 'text',
              createdAt: new Date(),
              threadId: message.threadId,
              resourceId: details.resourceId,
            }
          ],
          agentId: NINJA_CHEF_EXTRACT_DATA,
        });
      });
    } catch (error) {
      console.error('Error saving message:', error);
      // Don't throw in production if API not configured
      if (import.meta.env.PROD && !import.meta.env.VITE_MASTRA_API_URL) {
        return;
      }
      throw error;
    }
  }
};
