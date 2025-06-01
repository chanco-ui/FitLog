import { DailyNutrition } from '@/types';
import { calculatePFCRatio } from '@/utils/calculations';

interface NutritionBalanceProps {
  nutrition: DailyNutrition;
}

export default function NutritionBalance({ nutrition }: NutritionBalanceProps) {
  const pfcRatio = calculatePFCRatio(nutrition);

  return (
    <>
      <div className="card">
        <div className="text-lg font-bold text-gray-800 mb-4">
          PFCバランス
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="nutrition-item protein">
            <div className="text-xl font-bold text-gray-800 mb-1">
              {pfcRatio.protein}%
            </div>
            <div className="text-xs text-gray-600">
              タンパク質<br />{nutrition.protein.toFixed(1)}g
            </div>
          </div>
          <div className="nutrition-item fat">
            <div className="text-xl font-bold text-gray-800 mb-1">
              {pfcRatio.fat}%
            </div>
            <div className="text-xs text-gray-600">
              脂質<br />{nutrition.fat.toFixed(1)}g
            </div>
          </div>
          <div className="nutrition-item carb">
            <div className="text-xl font-bold text-gray-800 mb-1">
              {pfcRatio.carbohydrates}%
            </div>
            <div className="text-xs text-gray-600">
              炭水化物<br />{nutrition.carbohydrates.toFixed(1)}g
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="text-lg font-bold text-gray-800 mb-4">
          栄養素詳細
        </div>
        <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm text-center">
          栄養素の詳細グラフ<br />
          （ビタミン・ミネラル等）
        </div>
      </div>
    </>
  );
}