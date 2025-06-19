import { useState } from 'react';
import { Food } from '@/types';
import { foods as initialFoods } from '@/data/foods';

//食品リストの取得・追加・編集・削除・お気に入り機能

export function useFoods() {
  const [foods, setFoods] = useState<Food[]>(initialFoods);

  const addFood = (food: Food) => {
    setFoods(prev => [...prev, food]);
  };

  const editFood = (updated: Food) => {
    setFoods(prev =>
      prev.map(food => (food.id === updated.id ? updated : food))
    );
  };

  const removeFood = (id: string) => {
    setFoods(prev => prev.filter(food => food.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setFoods(prev =>
      prev.map(food =>
        food.id === id ? { ...food, favorite: !food.favorite } : food
      )
    );
  };

  return {
    foods,
    addFood,
    editFood,
    removeFood,
    toggleFavorite,
  };
}