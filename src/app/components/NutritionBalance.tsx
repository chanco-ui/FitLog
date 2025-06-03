import { DailyNutrition } from '@/types';

interface NutritionBalanceProps {
  nutrition: DailyNutrition;
}

export default function NutritionBalance({ nutrition }: NutritionBalanceProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">栄養バランス</h2>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">タンパク質</div>
            <div className="text-lg font-semibold">{nutrition.protein}g</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">脂質</div>
            <div className="text-lg font-semibold">{nutrition.fat}g</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">炭水化物</div>
            <div className="text-lg font-semibold">{nutrition.carbs}g</div>
          </div>
        </div>
      </div>
    </div>
  );
}