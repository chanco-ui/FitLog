import { DailyNutrition } from '@/types';
import type { Meal, NutritionGoal } from '@/types/supabase';
import { calculateCalorieProgress, getRemainingCalories } from '@/utils/calculations';
import { getMealTypeInfo } from '@/data/foods';
import MealList from './MealList';

interface CalorieOverviewProps {
  meals: Meal[];
  nutrition: DailyNutrition;
  goals: NutritionGoal | null;
}

export default function CalorieOverview({ meals, nutrition, goals }: CalorieOverviewProps) {
  const progress = calculateCalorieProgress(nutrition.calories, goals?.daily_calories || 0);
  const remaining = getRemainingCalories(nutrition.calories, goals?.daily_calories || 0);
  const mealTypeInfo = getMealTypeInfo();

  return (
    <>
      <div className="card">
        <div className="text-center mb-5">
          <div className="text-lg font-bold text-gray-800 mb-2">
            今日の摂取カロリー
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-primary-500">
              {nutrition.calories.toLocaleString()}
            </span>
            {goals && (
              <span className="text-base text-gray-600">
                / {goals.daily_calories.toLocaleString()} kcal
              </span>
            )}
          </div>
          <div className="bg-gray-200 rounded-full overflow-hidden h-3 mb-2">
            <div 
              className="progress-bar"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-sm text-gray-600">
            残り {remaining.toLocaleString()} kcal
          </div>
        </div>
      </div>

      <MealList meals={meals} />
    </>
  );
}