'use client';

import { useState, useEffect } from 'react';
import { ActiveTab, DailyNutrition, MealData } from '@/types';
import { useSupabase } from '@/hooks/useSupabase';
import { initLiff, isLoggedIn, login, getProfile } from './liff';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CalorieOverview from './components/CalorieOverview';
import NutritionBalance from './components/NutritionBalance';
import CalorieTrend from './components/CalorieTrend';
import MealRecord from './components/MealRecord';
import type { Meal, NutritionGoal } from '@/types/supabase';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isInitialized, setIsInitialized] = useState(false);
  const { user, getUser, createUser, getMeals, addMeal, getNutritionGoal } = useSupabase();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [nutritionGoal, setNutritionGoal] = useState<NutritionGoal | null>(null);

  useEffect(() => {
    const initializeLiff = async () => {
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
      if (!liffId) {
        console.error('LIFF ID is not defined');
        return;
      }

      const success = await initLiff(liffId);
      if (success && !isLoggedIn()) {
        login();
      } else if (success) {
        const profile = await getProfile();
        console.log('LINE Profile:', profile);
        if (profile) {
          let userData = await getUser(profile.userId);
          console.log('Existing User:', userData);
          if (!userData) {
            userData = await createUser(profile.userId);
            console.log('Created User:', userData);
          }
          if (userData) {
            const userMeals = await getMeals(userData.id);
            console.log('User Meals:', userMeals);
            setMeals(userMeals);
            const goal = await getNutritionGoal(userData.id);
            console.log('Nutrition Goal:', goal);
            setNutritionGoal(goal);
          }
        }
      }
      setIsInitialized(true);
    };

    initializeLiff();
  }, []);

  const handleAddMeal = async (mealData: MealData) => {
    console.log('Adding meal:', mealData);
    console.log('Current user:', user);
    if (user) {
      const newMeal = await addMeal({
        user_id: user.id,
        name: mealData.name,
        calories: mealData.calories,
        protein: mealData.protein || null,
        fat: mealData.fat || null,
        carbs: mealData.carbs || null,
        eaten_at: mealData.eaten_at
      });
      console.log('Added meal:', newMeal);
      if (newMeal) {
        setMeals([newMeal, ...meals]);
      }
    } else {
      console.error('No user found');
    }
  };

  const renderContent = () => {
    if (!isInitialized) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const dailyNutrition: DailyNutrition = {
      calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: meals.reduce((sum, meal) => sum + (meal.protein || 0), 0),
      fat: meals.reduce((sum, meal) => sum + (meal.fat || 0), 0),
      carbs: meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0),
    };

    switch (activeTab) {
      case 'overview':
        return <CalorieOverview meals={meals} nutrition={dailyNutrition} goals={nutritionGoal} />;
      case 'nutrition':
        return <NutritionBalance nutrition={dailyNutrition} />;
      case 'trend':
        return <CalorieTrend meals={meals} />;
      case 'record':
        return <MealRecord onAddMeal={handleAddMeal} />;
      default:
        return <CalorieOverview meals={meals} nutrition={dailyNutrition} goals={nutritionGoal} />;
    }
  };

  return (
    <>
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="p-5 min-h-[calc(100vh-200px)]">
        <div className="fade-in">
          {renderContent()}
        </div>
      </div>
    </>
  );
}