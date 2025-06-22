//カレンダータブ

'use client';

import { useState, useMemo } from 'react';
import { Meal, MealType } from '@/types';
import { useMeals } from '@/hooks/useMeals';
import { getMealTypeInfo } from '@/data/foods';

export default function Calendar() {
  const { meals } = useMeals();
  const [currentDate, setCurrentDate] = useState(new Date());
  const mealTypeInfo = getMealTypeInfo();

  // 現在の月の日付を生成
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    return days;
  }, [currentDate]);

  // 指定日の食事記録を取得
  const getMealsForDate = (date: Date) => {
    return meals.filter(meal => {
      const mealDate = new Date(meal.timestamp);
      return (
        mealDate.getFullYear() === date.getFullYear() &&
        mealDate.getMonth() === date.getMonth() &&
        mealDate.getDate() === date.getDate()
      );
    });
  };

  // 指定日の総カロリーを計算
  const getTotalCaloriesForDate = (date: Date) => {
    const dayMeals = getMealsForDate(date);
    return dayMeals.reduce((total, meal) => total + meal.food.calories, 0);
  };

  // 月を変更
  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  // 日付が今日かどうか判定
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  // 日付が現在の月かどうか判定
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // 食事タイプのアイコンを取得
  const getMealTypeIcon = (type: MealType) => {
    return mealTypeInfo.find(info => info.type === type)?.icon || '🍽️';
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">カレンダー</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => changeMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <span className="font-semibold text-gray-800">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </span>
          <button
            onClick={() => changeMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>
      </div>

      {/* カレンダーグリッド */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}
        
        {calendarDays.map((date, index) => {
          const dayMeals = getMealsForDate(date);
          const totalCalories = getTotalCaloriesForDate(date);
          
          return (
            <div
              key={index}
              className={`min-h-[80px] p-2 border border-gray-200 ${
                isToday(date) ? 'bg-blue-50 border-blue-300' : ''
              } ${!isCurrentMonth(date) ? 'bg-gray-50 text-gray-400' : ''}`}
            >
              <div className="text-sm font-medium mb-1">
                {date.getDate()}
              </div>
              
              {isCurrentMonth(date) && (
                <div className="space-y-1">
                  {totalCalories > 0 && (
                    <div className="text-xs text-gray-600">
                      {totalCalories} kcal
                    </div>
                  )}
                  
                  {dayMeals.slice(0, 3).map((meal, mealIndex) => (
                    <div key={mealIndex} className="text-xs flex items-center gap-1">
                      <span>{getMealTypeIcon(meal.type)}</span>
                      <span className="truncate">{meal.food.name}</span>
                    </div>
                  ))}
                  
                  {dayMeals.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayMeals.length - 3}件
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 今月のサマリー */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">今月のサマリー</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {meals.filter(meal => {
                const mealDate = new Date(meal.timestamp);
                return (
                  mealDate.getFullYear() === currentDate.getFullYear() &&
                  mealDate.getMonth() === currentDate.getMonth()
                );
              }).length}
            </div>
            <div className="text-sm text-gray-600">記録数</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(
                meals.filter(meal => {
                  const mealDate = new Date(meal.timestamp);
                  return (
                    mealDate.getFullYear() === currentDate.getFullYear() &&
                    mealDate.getMonth() === currentDate.getMonth()
                  );
                }).reduce((total, meal) => total + meal.food.calories, 0) / 
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
              )}
            </div>
            <div className="text-sm text-gray-600">平均カロリー</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(
                meals.filter(meal => {
                  const mealDate = new Date(meal.timestamp);
                  return (
                    mealDate.getFullYear() === currentDate.getFullYear() &&
                    mealDate.getMonth() === currentDate.getMonth()
                  );
                }).map(meal => new Date(meal.timestamp).getDate())
              ).size}
            </div>
            <div className="text-sm text-gray-600">記録日数</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(
                meals.filter(meal => {
                  const mealDate = new Date(meal.timestamp);
                  return (
                    mealDate.getFullYear() === currentDate.getFullYear() &&
                    mealDate.getMonth() === currentDate.getMonth()
                  );
                }).reduce((total, meal) => total + meal.food.calories, 0)
              )}
            </div>
            <div className="text-sm text-gray-600">総カロリー</div>
          </div>
        </div>
      </div>
    </div>
  );
} 