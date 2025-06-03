'use client';

import { useState, useEffect } from 'react';
import { ActiveTab } from '@/types';
import { useMeals } from '@/hooks/useMeals';
import { initLiff, isLoggedIn, login } from './liff';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CalorieOverview from './components/CalorieOverview';
import NutritionBalance from './components/NutritionBalance';
import CalorieTrend from './components/CalorieTrend';
import MealRecord from './components/MealRecord';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const { meals, dailyNutrition, goals, addMeal } = useMeals();
  const [isInitialized, setIsInitialized] = useState(false);

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
      }
      setIsInitialized(true);
    };

    initializeLiff();
  }, []);

  const renderContent = () => {
    if (!isInitialized) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    switch (activeTab) {
      case 'overview':
        return <CalorieOverview meals={meals} nutrition={dailyNutrition} goals={goals} />;
      case 'nutrition':
        return <NutritionBalance nutrition={dailyNutrition} />;
      case 'trend':
        return <CalorieTrend />;
      case 'record':
        return <MealRecord onAddMeal={addMeal} />;
      default:
        return <CalorieOverview meals={meals} nutrition={dailyNutrition} goals={goals} />;
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