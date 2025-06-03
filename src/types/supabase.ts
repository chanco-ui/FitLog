export type User = {
  id: string
  line_user_id: string
  created_at: string
  updated_at: string
}

export type Meal = {
  id: string
  user_id: string
  name: string
  calories: number
  protein: number | null
  fat: number | null
  carbs: number | null
  eaten_at: string
  created_at: string
  updated_at: string
}

export type NutritionGoal = {
  id: string
  user_id: string
  daily_calories: number
  daily_protein: number | null
  daily_fat: number | null
  daily_carbs: number | null
  created_at: string
  updated_at: string
} 