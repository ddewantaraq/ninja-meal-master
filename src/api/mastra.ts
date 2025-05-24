
import { MastraClient } from '@mastra/client-js';

// Get environment variable with fallback
const getMastraUrl = () => {
  // For Vite, environment variables are exposed through import.meta.env
  return import.meta.env.VITE_MASTRA_API_URL || 'https://ninja-chef.vercel.app';
};

// Initialize the client with lazy loading to prevent build timeouts
let mastraClientInstance: MastraClient | null = null;

// Get client instance with headers
export const getMastraClient = (headers?: Record<string, string>): MastraClient => {
  // Create a new instance with headers if provided, or use cached instance
  if (headers || !mastraClientInstance) {
    try {
      const clientConfig: any = {
        baseUrl: getMastraUrl(),
      };
      
      // Add headers if provided
      if (headers) {
        clientConfig.headers = headers;
      }
      
      const client = new MastraClient(clientConfig);
      
      // Cache the instance only if no specific headers were provided
      if (!headers) {
        mastraClientInstance = client;
      }
      
      return client;
    } catch (error) {
      console.error("Failed to initialize Mastra client:", error);
      // Return a minimal mock client for fallback
      return createMockClient();
    }
  }
  return mastraClientInstance;
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
  apiCall: (client: MastraClient) => Promise<T>,
  userSession?: { threadId: string; userId: number }
): Promise<T> {
  try {
    // Create headers from user session if provided
    const headers = userSession ? {
      'x-thread-id': userSession.threadId,
      'x-user-id': userSession.userId.toString()
    } : undefined;
    
    // Get client with headers
    const client = getMastraClient(headers);
    
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
