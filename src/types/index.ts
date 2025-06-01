export interface Food {
    id: string;
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  }
  
  export interface Meal {
    id: string;
    type: MealType;
    food: Food;
    timestamp: Date;
  }
  
  export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';
  
  export interface DailyNutrition {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  }
  
  export interface NutritionGoals {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  }
  
  export interface PFCRatio {
    protein: number;
    fat: number;
    carbohydrates: number;
  }
  
  export type ActiveTab = 'overview' | 'nutrition' | 'trend' | 'record';
  
  export interface MealTypeInfo {
    type: MealType;
    icon: string;
    label: string;
  }