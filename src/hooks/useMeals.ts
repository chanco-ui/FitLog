import { useState, useMemo } from 'react';
import type { Meal } from '@/types/supabase';
import { MealType, Food, DailyNutrition, NutritionGoals } from '@/types';
import { calculateDailyNutrition, isToday } from '@/utils/calculations';

const defaultGoals: NutritionGoals = {
  calories: 2000,
  protein: 125,
  fat: 67,
  carbohydrates: 250,
};

export const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      user_id: 'dummy',
      name: 'ご飯、味噌汁、焼き魚',
      calories: 420,
      protein: 25.8,
      fat: 6.7,
      carbs: 42.1,
      eaten_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: 'dummy',
      name: 'ハンバーグ定食',
      calories: 680,
      protein: 25.0,
      fat: 35.0,
      carbs: 65.0,
      eaten_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      user_id: 'dummy',
      name: 'りんご、ヨーグルト',
      calories: 150,
      protein: 3.9,
      fat: 3.2,
      carbs: 26.7,
      eaten_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      user_id: 'dummy',
      name: '野菜炒め、ご飯',
      calories: 200,
      protein: 8.6,
      fat: 8.9,
      carbs: 52.1,
      eaten_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [goals] = useState<NutritionGoals>(defaultGoals);

  const todayMeals = useMemo(() => {
    return meals.filter(meal => isToday(new Date(meal.eaten_at)));
  }, [meals]);

  const dailyNutrition = useMemo(() => {
    return calculateDailyNutrition(todayMeals);
  }, [todayMeals]);

  const addMeal = (name: string, calories: number, protein?: number, fat?: number, carbs?: number) => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      user_id: 'dummy',
      name,
      calories,
      protein: protein ?? null,
      fat: fat ?? null,
      carbs: carbs ?? null,
      eaten_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setMeals(prev => [...prev, newMeal]);
  };

  const removeMeal = (mealId: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== mealId));
  };

  return {
    meals: todayMeals,
    dailyNutrition,
    goals,
    addMeal,
    removeMeal,
  };
};