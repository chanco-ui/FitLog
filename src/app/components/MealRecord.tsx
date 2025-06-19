//ユーザーが食事の種類と食品を選んで「食事記録を追加」できるようにする入力フォームのUI

'use client';

import { useState } from 'react';
import { MealType, Food } from '@/types';
import { getMealTypeInfo } from '@/data/foods';
import { useFoods } from '@/hooks/useFoods';
import FoodManager from './FoodManager';

//親コンポーネントからonAddMeal関数を受け取る
//食事記録を追加する処理を親に伝えるためのコールバック
interface MealRecordProps {
  onAddMeal: (type: MealType, food: Food) => void;
}

export default function MealRecord({ onAddMeal }: MealRecordProps) {
    //状態管理
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');
  const [showFoodManager, setShowFoodManager] = useState(false);
  
    //データ取得
  const mealTypeInfo = getMealTypeInfo();
  const { foods } = useFoods();
  const selectedFood = foods.find(food => food.id === selectedFoodId);

    //食事追加処理
  const handleAddMeal = () => {
    if (!selectedFood) {
      alert('食品を選択してください');
      return;
    }
        //食品が選ばれていればonAddMealを呼び出して親に通知
    onAddMeal(selectedMealType, selectedFood);
    setSelectedFoodId('');
    alert('食事記録を追加しました！');
  };

  return (
    <div className="space-y-6">
      {/* 食品管理セクション */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">食品管理</h3>
          <button
            className="btn-secondary"
            onClick={() => setShowFoodManager(!showFoodManager)}
          >
            {showFoodManager ? '閉じる' : '食品管理'}
          </button>
        </div>
        
        {showFoodManager && <FoodManager />}
      </div>

      {/* 食事記録セクション */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-5">食事記録</h3>
        
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-800">
            食事タイプ
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {/* 食事タイプの選択ボタン */}
            {mealTypeInfo.map(({ type, icon, label }) => (
              <button
                key={type}
                className={`meal-type-btn ${selectedMealType === type ? 'active' : ''}`}
                onClick={() => setSelectedMealType(type)}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-800">
            食品
          </label>
            {/* 食品選択のドロップダウン */}
          <select
            className="form-input"
            value={selectedFoodId}
            onChange={(e) => setSelectedFoodId(e.target.value)}
          >
            <option value="">食品を選択してください</option>
            {foods.map((food) => (
              <option key={food.id} value={food.id}>
                {food.name} {food.favorite && '⭐'}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-800">
            カロリー
          </label>
            {/* カロリー計算（自動計算） */}
          <input
            type="number"
            className="form-input"
            value={selectedFood?.calories || ''}
            placeholder="自動計算されます"
            readOnly
          />
        </div>

        <button className="btn-primary" onClick={handleAddMeal}>
          記録追加
        </button>
      </div>
    </div>
  );
}