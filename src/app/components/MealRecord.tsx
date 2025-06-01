'use client';

import { useState } from 'react';
import { MealType, Food } from '@/types';
import { foods, getMealTypeInfo } from '@/data/foods';

interface MealRecordProps {
  onAddMeal: (type: MealType, food: Food) => void;
}

export default function MealRecord({ onAddMeal }: MealRecordProps) {
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');
  
  const mealTypeInfo = getMealTypeInfo();
  const selectedFood = foods.find(food => food.id === selectedFoodId);

  const handleAddMeal = () => {
    if (!selectedFood) {
      alert('食品を選択してください');
      return;
    }

    onAddMeal(selectedMealType, selectedFood);
    setSelectedFoodId('');
    alert('食事記録を追加しました！');
  };

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-gray-800 mb-5">食事記録</h3>
      
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-gray-800">
          食事タイプ
        </label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
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
        <select
          className="form-input"
          value={selectedFoodId}
          onChange={(e) => setSelectedFoodId(e.target.value)}
        >
          <option value="">食品を選択してください</option>
          {foods.map((food) => (
            <option key={food.id} value={food.id}>
              {food.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2 font-semibold text-gray-800">
          カロリー
        </label>
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
  );
}