'use client';

import { useState } from 'react';
import { Food } from '@/types';
import { useFoods } from '@/hooks/useFoods';

export default function FoodManager() {
  const { foods, addFood, editFood, removeFood, toggleFavorite } = useFoods();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Food>>({
    name: '',
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.calories) {
      alert('食品名とカロリーは必須です');
      return;
    }

    if (editingId) {
      // 編集モード
      editFood({
        id: editingId,
        name: formData.name,
        calories: formData.calories,
        protein: formData.protein || 0,
        fat: formData.fat || 0,
        carbohydrates: formData.carbohydrates || 0,
        favorite: foods.find(f => f.id === editingId)?.favorite || false,
      });
      setEditingId(null);
    } else {
      // 追加モード
      addFood({
        id: Date.now().toString(),
        name: formData.name,
        calories: formData.calories,
        protein: formData.protein || 0,
        fat: formData.fat || 0,
        carbohydrates: formData.carbohydrates || 0,
        favorite: false,
      });
      setIsAdding(false);
    }

    // フォームをリセット
    setFormData({
      name: '',
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
    });
  };

  const handleEdit = (food: Food) => {
    setEditingId(food.id);
    setFormData({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      fat: food.fat,
      carbohydrates: food.carbohydrates,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
    });
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-bold text-gray-800">食品管理</h3>
        {!isAdding && !editingId && (
          <button
            className="btn-secondary"
            onClick={() => setIsAdding(true)}
          >
            ＋ 食品追加
          </button>
        )}
      </div>

      {/* 追加・編集フォーム */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-5 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">
            {editingId ? '食品を編集' : '新しい食品を追加'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                食品名 *
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                カロリー *
              </label>
              <input
                type="number"
                className="form-input"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タンパク質 (g)
              </label>
              <input
                type="number"
                className="form-input"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: Number(e.target.value) })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                脂質 (g)
              </label>
              <input
                type="number"
                className="form-input"
                value={formData.fat}
                onChange={(e) => setFormData({ ...formData, fat: Number(e.target.value) })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                炭水化物 (g)
              </label>
              <input
                type="number"
                className="form-input"
                value={formData.carbohydrates}
                onChange={(e) => setFormData({ ...formData, carbohydrates: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button type="submit" className="btn-primary">
              {editingId ? '更新' : '追加'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              キャンセル
            </button>
          </div>
        </form>
      )}

      {/* 食品リスト */}
      <div className="space-y-3">
        {foods.map((food) => (
          <div
            key={food.id}
            className={`p-4 border rounded-lg ${
              food.favorite ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800">{food.name}</h4>
                  {food.favorite && (
                    <span className="text-yellow-500">⭐</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {food.calories} kcal | P: {food.protein}g | F: {food.fat}g | C: {food.carbohydrates}g
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => handleEdit(food)}
                >
                  編集
                </button>
                <button
                  className="text-yellow-600 hover:text-yellow-800 text-sm"
                  onClick={() => toggleFavorite(food.id)}
                >
                  {food.favorite ? '★' : '☆'}
                </button>
                <button
                  className="text-red-600 hover:text-red-800 text-sm"
                  onClick={() => {
                    if (confirm(`${food.name}を削除しますか？`)) {
                      removeFood(food.id);
                    }
                  }}
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 