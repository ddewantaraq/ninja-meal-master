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

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};