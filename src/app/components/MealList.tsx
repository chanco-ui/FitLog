
//ユーザーが記録した食事一覧を表示するためのUI

import { Meal, MealTypeInfo } from '@/types';

//型定義
interface MealListProps {
  meals: Meal[];
  mealTypeInfo: MealTypeInfo[];
}

//型定義を分割代入で受け取る
export default function MealList({ meals, mealTypeInfo }: MealListProps) {
    //食事の種類に応じたアイコンを取得
  const getMealIcon = (type: string) => {
        //mealTypeInfo配列の中からtypeに一致する要素を探す、tureならicon、falseなら'🍽️'を返す
        //.find()の意味＝条件に一致する最初の要素を見つけて返す
    return mealTypeInfo.find(info => info.type === type)?.icon || '🍽️';
  };
    //食事タイプに対する表示名（ラベル）を取得、朝食や昼食など  
  const getMealLabel = (type: string) => {
    return mealTypeInfo.find(info => info.type === type)?.label || type;
  };

  return (
    <div className="card">
      <div className="text-lg font-bold text-gray-800 mb-4">
        今日の食事記録
      </div>
      <div>
        {/* meal配列が空かどうかで表示を切り替える、食事が一件も登録されていない時の表示 */}
        {meals.length === 0 ? (
          <p className="text-gray-500 text-center py-5">
            まだ記録がありません
          </p>
        ) : (
            //map関数を使用して食事の記録を表示、icon/名前/カロリー
          meals.map((meal) => (
            <div 
              key={meal.id}
              className="py-4 border-b border-gray-100 flex justify-between items-center last:border-b-0"
            >
              <div className="flex-1">
                <div className="font-bold mb-1">
                  {getMealIcon(meal.type)} {getMealLabel(meal.type)}
                </div>
                <div className="text-sm text-gray-600">
                  {meal.food.name}
                </div>
              </div>
              <div className="font-bold text-primary-500">
                {meal.food.calories} kcal
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}