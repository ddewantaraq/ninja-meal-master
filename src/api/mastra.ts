
import { MastraClient } from '@mastra/client-js';

// Get environment variable with fallback
const getMastraUrl = () => {
  // For Vite, environment variables are exposed through import.meta.env
  return import.meta.env.VITE_MASTRA_API_URL || 'http://localhost:4111';
};
 
// Initialize the client with more graceful error handling
export const mastraClient = new MastraClient({
  baseUrl: getMastraUrl(),
});

// Add a custom fetch wrapper to handle connection failures
const originalFetch = mastraClient.fetch.bind(mastraClient);

// Override the fetch method with our custom implementation
mastraClient.fetch = async (url: string, options: RequestInit) => {
  try {
    return await originalFetch(url, options);
  } catch (error) {
    console.error("Failed to connect to Mastra API:", error);
    // In production, we'll return a mock response if API URL not set
    if (import.meta.env.PROD && !import.meta.env.VITE_MASTRA_API_URL) {
      return new Response(JSON.stringify({ 
        status: "error", 
        message: "API not configured" 
      }), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
    throw error;
  }
};
