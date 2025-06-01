'use client';

import { useState } from 'react';
import { ActiveTab } from '@/types';
import { useMeals } from '@/hooks/useMeals';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CalorieOverview from './components/CalorieOverview';
import NutritionBalance from './components/NutritionBalance';
import CalorieTrend from './components/CalorieTrend';
import MealRecord from './components/MealRecord';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const { meals, dailyNutrition, goals, addMeal } = useMeals();

  const renderContent = () => {
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