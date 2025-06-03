'use client';

import { useState } from 'react';
import { MealData } from '@/types';

interface MealRecordProps {
  onAddMeal: (meal: MealData) => void;
}

export default function MealRecord({ onAddMeal }: MealRecordProps) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMeal({
      name,
      calories: Number(calories),
      protein: protein ? Number(protein) : undefined,
      fat: fat ? Number(fat) : undefined,
      carbs: carbs ? Number(carbs) : undefined,
      eaten_at: new Date().toISOString(),
    });
    setName('');
    setCalories('');
    setProtein('');
    setFat('');
    setCarbs('');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">食事記録</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            食事名
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            カロリー
          </label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タンパク質
            </label>
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              脂質
            </label>
            <input
              type="number"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              炭水化物
            </label>
            <input
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          記録する
        </button>
      </form>
    </div>
  );
}