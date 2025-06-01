import { Meal, DailyNutrition, PFCRatio } from '@/types';

export const calculateDailyNutrition = (meals: Meal[]): DailyNutrition => {
  return meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.food.calories,
      protein: total.protein + meal.food.protein,
      fat: total.fat + meal.food.fat,
      carbohydrates: total.carbohydrates + meal.food.carbohydrates,
    }),
    { calories: 0, protein: 0, fat: 0, carbohydrates: 0 }
  );
};

export const calculatePFCRatio = (nutrition: DailyNutrition): PFCRatio => {
  const totalCalories = nutrition.calories;
  
  if (totalCalories === 0) {
    return { protein: 0, fat: 0, carbohydrates: 0 };
  }

  // カロリー換算: タンパク質4kcal/g, 脂質9kcal/g, 炭水化物4kcal/g
  const proteinCalories = nutrition.protein * 4;
  const fatCalories = nutrition.fat * 9;
  const carbCalories = nutrition.carbohydrates * 4;

  return {
    protein: Math.round((proteinCalories / totalCalories) * 100),
    fat: Math.round((fatCalories / totalCalories) * 100),
    carbohydrates: Math.round((carbCalories / totalCalories) * 100),
  };
};

export const calculateCalorieProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};

export const getRemainingCalories = (current: number, target: number): number => {
  return Math.max(target - current, 0);
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};