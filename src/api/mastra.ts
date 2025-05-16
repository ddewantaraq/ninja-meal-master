
import { MastraClient } from '@mastra/client-js';

// Get environment variable with fallback
const getMastraUrl = () => {
  // For Vite, environment variables are exposed through import.meta.env
  return import.meta.env.VITE_MASTRA_API_URL || 'http://localhost:4111';
};
 
// Initialize the client
export const mastraClient = new MastraClient({
  baseUrl: getMastraUrl(),
});

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
