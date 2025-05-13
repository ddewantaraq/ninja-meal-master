
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
