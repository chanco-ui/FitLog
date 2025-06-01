import { useState, useMemo } from 'react';
import { Meal, MealType, Food, DailyNutrition, NutritionGoals } from '@/types';
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
      type: 'breakfast',
      food: {
        id: 'breakfast_set',
        name: 'ご飯、味噌汁、焼き魚',
        calories: 420,
        protein: 25.8,
        fat: 6.7,
        carbohydrates: 42.1,
      },
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'lunch',
      food: {
        id: 'hamburger_set',
        name: 'ハンバーグ定食',
        calories: 680,
        protein: 25.0,
        fat: 35.0,
        carbohydrates: 65.0,
      },
      timestamp: new Date(),
    },
    {
      id: '3',
      type: 'snack',
      food: {
        id: 'apple_yogurt',
        name: 'りんご、ヨーグルト',
        calories: 150,
        protein: 3.9,
        fat: 3.2,
        carbohydrates: 26.7,
      },
      timestamp: new Date(),
    },
    {
      id: '4',
      type: 'dinner',
      food: {
        id: 'dinner_set',
        name: '野菜炒め、ご飯',
        calories: 200,
        protein: 8.6,
        fat: 8.9,
        carbohydrates: 52.1,
      },
      timestamp: new Date(),
    },
  ]);

  const [goals] = useState<NutritionGoals>(defaultGoals);

  const todayMeals = useMemo(() => {
    return meals.filter(meal => isToday(meal.timestamp));
  }, [meals]);

  const dailyNutrition = useMemo(() => {
    return calculateDailyNutrition(todayMeals);
  }, [todayMeals]);

  const addMeal = (type: MealType, food: Food) => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      type,
      food,
      timestamp: new Date(),
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