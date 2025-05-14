
// Define type for meal plan data structure
type Menu = {
  time: string;
  menu_name: string;
  steps_to_cook: string;
};

type DayPlan = {
  day: number;
  menus: Menu[];
};

export type MealPlanData = {
  meal_plan: DayPlan[];
};

// Updated Message type to handle more complex content structures
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: string;
  createdAt?: string;
  threadId?: string;
};

// Define type for API message response
export interface MsgHistory {
  id: string;
  role: string;
  content: string;
  type?: string;
  createdAt?: string;
  threadId?: string;
}
