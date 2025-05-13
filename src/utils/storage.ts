
/**
 * Centralized local storage utility
 */
export const storage = {
  /**
   * Set an item in local storage
   * @param key Storage key
   * @param value Value to store
   */
  setItem: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  },

  /**
   * Get an item from local storage
   * @param key Storage key
   * @param defaultValue Default value if key doesn't exist
   * @returns Stored value or default value
   */
  getItem: <T>(key: string, defaultValue?: T): T | undefined => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue;
    }
  },

  /**
   * Remove an item from local storage
   * @param key Storage key to remove
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }
};

/**
 * Generate a user session
 * @returns Object with threadId and userId
 */
export const generateUserSession = () => {
  return {
    threadId: crypto.randomUUID(),
    userId: Math.floor(Math.random() * 1000000)
  };
};
