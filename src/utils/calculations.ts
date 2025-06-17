import { Meal, DailyNutrition, PFCRatio } from '@/types';

//1日の食事mealから合計の栄養素calories,protein,fat,carbohydratesを計算
export const calculateDailyNutrition = (meals: Meal[]): DailyNutrition => {
    //reduce()にて各食事の栄養素を合計（初期値は0）
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

//PFCバランスを計算
export const calculatePFCRatio = (nutrition: DailyNutrition): PFCRatio => {
  const totalCalories = nutrition.calories;
  
    //エラーを防ぐためのガード条件、カロリー0の場合は比率を全て0％で返す
  if (totalCalories === 0) {
    return { protein: 0, fat: 0, carbohydrates: 0 };
  }

  // カロリー換算: タンパク質4kcal/g, 脂質9kcal/g, 炭水化物4kcal/g
  const proteinCalories = nutrition.protein * 4;
  const fatCalories = nutrition.fat * 9;
  const carbCalories = nutrition.carbohydrates * 4;

  return {
        //合計カロリーに対する割合を％で返す
    protein: Math.round((proteinCalories / totalCalories) * 100),
    fat: Math.round((fatCalories / totalCalories) * 100),
    carbohydrates: Math.round((carbCalories / totalCalories) * 100),
  };
};

//現在の摂取カロリーが目標に対してどれくらい進んでいるかを計算
export const calculateCalorieProgress = (current: number, target: number): number => {
    //(current/target)*100で、最大でも100％に制限
  return Math.min((current / target) * 100, 100);
};

//目標まであと何カロリー残っているかを「計算
export const getRemainingCalories = (current: number, target: number): number => {
    //(target-current)でマイナスにならないように0以上に制限
  return Math.max(target - current, 0);
};

//指定された日付が「今日」かどうかを判定
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};