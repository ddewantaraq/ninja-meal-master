
import { MastraClient } from '@mastra/client-js';
import { storage } from '@/utils/storage';

// Get environment variable with fallback
const getMastraUrl = () => {
  // For Vite, environment variables are exposed through import.meta.env
  return import.meta.env.VITE_MASTRA_API_URL || 'https://ninja-chef.vercel.app';
};

// Initialize the client with lazy loading to prevent build timeouts
let mastraClientInstance: MastraClient | null = null;

// Get client instance with headers automatically set from localStorage
export const getMastraClient = (): MastraClient => {
  try {
    // Get user session from localStorage to set headers
    const userSession = storage.getItem<{threadId: string, userId: number}>('ninjaChef_session');
    
    const clientConfig: any = {
      baseUrl: getMastraUrl(),
    };
    
    // Add headers from user session if available
    if (userSession) {
      clientConfig.headers = {
        'x-thread-id': userSession.threadId,
        'x-user-id': userSession.userId.toString()
      };
    }
    
    const client = new MastraClient(clientConfig);
    return client;
  } catch (error) {
    console.error("Failed to initialize Mastra client:", error);
    // Return a minimal mock client for fallback
    return createMockClient();
  }
};

// Create a mock client for fallback
const createMockClient = (): MastraClient => {
  // Create a minimal implementation that won't break the application
  return {
    getAgent: () => ({
      generate: async () => ({ content: "API not configured" })
    }),
    getWorkflow: () => ({
      createRun: async () => ({ runId: "mock-run-id" }),
      startAsync: async () => ({ results: { status: 'fallback', message: 'API not configured' } })
    }),
    getMemoryThread: () => ({
      get: async () => ({ resourceId: "mock-resource-id" }),
      getMessages: async () => ({ messages: [] })
    }),
    saveMessageToMemory: async () => {}
  } as unknown as MastraClient;
};

// Create a wrapper function for API calls to handle failures gracefully
export async function safeApiCall<T>(
  apiCall: (client: MastraClient) => Promise<T>
): Promise<T> {
  try {
    // Get client with headers automatically set
    const client = getMastraClient();
    
    // Execute the provided API call with the client
    return await apiCall(client);
  } catch (error) {
    console.error("Failed to connect to Mastra API:", error);
    // In production, we'll return a mock response if API URL not set
    if (import.meta.env.PROD && !getMastraUrl()) {
      // Return a mock response appropriate for the context
      // This is just a generic response - adjust based on the expected type
      return {
        status: "error",
        message: "API not configured"
      } as unknown as T;
    }
    throw error;
  }
}
