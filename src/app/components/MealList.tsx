import type { Meal } from '@/types/supabase';

interface MealListProps {
  meals: Meal[];
}

export default function MealList({ meals }: MealListProps) {
  return (
    <div className="card">
      <div className="text-lg font-bold text-gray-800 mb-4">
        今日の食事記録
      </div>
      <div>
        {meals.length === 0 ? (
          <p className="text-gray-500 text-center py-5">
            まだ記録がありません
          </p>
        ) : (
          meals.map((meal) => (
            <div 
              key={meal.id}
              className="py-4 border-b border-gray-100 flex justify-between items-center last:border-b-0"
            >
              <div className="flex-1">
                <div className="font-bold mb-1">
                  {meal.name}
                </div>
                <div className="text-sm text-gray-600">
                  {meal.eaten_at && new Date(meal.eaten_at).toLocaleString()}
                </div>
              </div>
              <div className="font-bold text-primary-500">
                {meal.calories} kcal
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}