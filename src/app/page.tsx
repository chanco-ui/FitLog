'use client';

import { useState, useEffect } from 'react';
import { ActiveTab } from '@/types';
import { useMeals } from '@/hooks/useMeals';
import { useFoods } from '@/hooks/useFoods';
//import { initLiff, isLoggedIn, login } from './liff';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CalorieOverview from './components/CalorieOverview';
import NutritionBalance from './components/NutritionBalance';
import CalorieTrend from './components/CalorieTrend';
import MealRecord from './components/MealRecord';
import Calendar from './components/Calendar';

//ダミーデータの用意（LIFFログインの代わり）
const dummyUser = {
  id: 'dummy',
  name: 'テストユーザー'
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const { meals, dailyNutrition, goals, addMeal } = useMeals();
  const { foods } = useFoods();
  //const [isInitialized, setIsInitialized] = useState(false);

  //useEffect(() => {
  //  const initializeLiff = async () => {
  //    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  //    if (!liffId) {
  //      console.error('LIFF ID is not defined');
  //      return;
  //    }

  //    const success = await initLiff(liffId);
  //    if (success && !isLoggedIn()) {
  //      login();
  //    }
  //    setIsInitialized(true);
  //  };

  //  initializeLiff();
  //}, []);

  //現在の状態によって表示するコンポーネントを切り替える
  const renderContent = () => {
    //初期化されていない場合、Loading...と表示
    //if (!isInitialized) {
    //  return <div className="flex justify-center items-center h-screen">Loading...</div>;
    //}

    //アクティブタブによって表示を変える（画面の種類）
    switch (activeTab) {
        //カロリー画面
      case 'overview':
        return <CalorieOverview meals={meals} nutrition={dailyNutrition} goals={goals} />;
        //栄養バランス
      case 'nutrition':
        return <NutritionBalance nutrition={dailyNutrition} />;
        //グラフ
      case 'trend':
        return <CalorieTrend />;
        //食事の記録画面
      case 'record':
        return <MealRecord onAddMeal={addMeal} />;
        //カレンダー画面
      case 'calendar':
        return <Calendar />;
        //どれにも当てはまらない場合、カロリー画面を表示
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