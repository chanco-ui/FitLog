import { Meal, DailyNutrition, NutritionGoals } from '@/types';
import { calculateCalorieProgress, getRemainingCalories } from '@/utils/calculations';
import { getMealTypeInfo } from '@/data/foods';
import MealList from './MealList';

interface CalorieOverviewProps {
  meals: Meal[];
  nutrition: DailyNutrition;
  goals: NutritionGoals;
}

export default function CalorieOverview({ meals, nutrition, goals }: CalorieOverviewProps) {
  const progress = calculateCalorieProgress(nutrition.calories, goals.calories);
  const remaining = getRemainingCalories(nutrition.calories, goals.calories);
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
            <span className="text-base text-gray-600">
              / {goals.calories.toLocaleString()} kcal
            </span>
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

      <MealList meals={meals} mealTypeInfo={mealTypeInfo} />
    </>
  );
}