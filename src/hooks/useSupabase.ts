import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Meal, NutritionGoal } from '@/types/supabase'

export const useSupabase = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // ユーザー情報の取得
  const getUser = async (lineUserId: string) => {
    try {
      console.log('Fetching user with lineUserId:', lineUserId); // デバッグログ
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('line_user_id', lineUserId)
        .single()

      if (error) {
        console.error('Error in getUser:', error); // デバッグログ
        throw error;
      }
      console.log('User data:', data); // デバッグログ
      return data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  // ユーザーの作成
  const createUser = async (lineUserId: string) => {
    try {
      console.log('Creating user with lineUserId:', lineUserId); // デバッグログ
      const { data, error } = await supabase
        .from('users')
        .insert([{ line_user_id: lineUserId }])
        .select()
        .single()

      if (error) {
        console.error('Error in createUser:', error); // デバッグログ
        throw error;
      }
      console.log('Created user data:', data); // デバッグログ
      return data
    } catch (error) {
      console.error('Error creating user:', error)
      return null
    }
  }

  // 食事記録の取得
  const getMeals = async (userId: string) => {
    try {
      console.log('Fetching meals for userId:', userId); // デバッグログ
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .order('eaten_at', { ascending: false })

      if (error) {
        console.error('Error in getMeals:', error); // デバッグログ
        throw error;
      }
      console.log('Meals data:', data); // デバッグログ
      return data as Meal[]
    } catch (error) {
      console.error('Error fetching meals:', error)
      return []
    }
  }

  // 食事記録の追加
  const addMeal = async (meal: Omit<Meal, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Adding meal:', meal); // デバッグログ
      const { data, error } = await supabase
        .from('meals')
        .insert([meal])
        .select()
        .single()

      if (error) {
        console.error('Error in addMeal:', error); // デバッグログ
        throw error;
      }
      console.log('Added meal data:', data); // デバッグログ
      return data
    } catch (error) {
      console.error('Error adding meal:', error)
      return null
    }
  }

  // 栄養目標の取得
  const getNutritionGoal = async (userId: string) => {
    try {
      console.log('Fetching nutrition goal for userId:', userId); // デバッグログ
      const { data, error } = await supabase
        .from('nutrition_goals')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error in getNutritionGoal:', error); // デバッグログ
        throw error;
      }
      console.log('Nutrition goal data:', data); // デバッグログ
      return data as NutritionGoal
    } catch (error) {
      console.error('Error fetching nutrition goal:', error)
      return null
    }
  }

  // 栄養目標の設定
  const setNutritionGoal = async (goal: Omit<NutritionGoal, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Setting nutrition goal:', goal); // デバッグログ
      const { data, error } = await supabase
        .from('nutrition_goals')
        .upsert([goal])
        .select()
        .single()

      if (error) {
        console.error('Error in setNutritionGoal:', error); // デバッグログ
        throw error;
      }
      console.log('Set nutrition goal data:', data); // デバッグログ
      return data
    } catch (error) {
      console.error('Error setting nutrition goal:', error)
      return null
    }
  }

  return {
    user,
    loading,
    getUser,
    createUser,
    getMeals,
    addMeal,
    getNutritionGoal,
    setNutritionGoal,
  }
} 