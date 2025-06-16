import { Meal, DailyNutrition, NutritionGoals } from '@/types';
import { calculateCalorieProgress, getRemainingCalories } from '@/utils/calculations';
import { getMealTypeInfo } from '@/data/foods';
import MealList from './MealList';

//型定義
interface CalorieOverviewProps {
  meals: Meal[];
  nutrition: DailyNutrition;
  goals: NutritionGoals;
}

//カロリーの概要を画面に表示
//CalorieOverviewコンポーネントの定義、meal,nutrition,goalsの３つのpropswp受け取る
export default function CalorieOverview({ meals, nutrition, goals }: CalorieOverviewProps) {
    //摂取カロリーが目標に対して何%かを計算
  const progress = calculateCalorieProgress(nutrition.calories, goals.calories);
    //目標まであと何キロカロリー残っているかを計算
  const remaining = getRemainingCalories(nutrition.calories, goals.calories);
    //食事の種類（朝食・昼食・夕食）に関する情報を取得、MealListコンポーネントに渡すために使用する
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
                {/* 表示を人間が読みやすいようにする関数（カンマをつける） */}
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

        {/* MealListコンポーネントを呼び出す（食事一覧を表示） */}
      <MealList meals={meals} mealTypeInfo={mealTypeInfo} />
    </>
  );
}