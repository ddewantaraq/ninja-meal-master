
import { MastraClient } from '@mastra/client-js';

// Get environment variable with fallback
const getMastraUrl = () => {
  // For Vite, environment variables are exposed through import.meta.env
  return import.meta.env.VITE_MASTRA_API_URL || 'http://localhost:4111';
};

// Initialize the client with lazy loading to prevent build timeouts
let mastraClientInstance: MastraClient | null = null;

// Get client instance only when needed
export const getMastraClient = (): MastraClient => {
  // If we don't have an instance yet, create one
  if (!mastraClientInstance) {
    try {
      mastraClientInstance = new MastraClient({
        baseUrl: getMastraUrl(),
      });
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
export async function safeApiCall<T>(apiCall: () => Promise<T>): Promise<T> {
  try {
    // Execute the provided API call
    return await apiCall();
  } catch (error) {
    console.error("Failed to connect to Mastra API:", error);
    // In production, we'll return a mock response if API URL not set
    if (import.meta.env.PROD && !import.meta.env.VITE_MASTRA_API_URL) {
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
