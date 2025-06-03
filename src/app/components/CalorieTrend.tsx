import type { Meal } from '@/types/supabase';

interface CalorieTrendProps {
  meals: Meal[];
}

export default function CalorieTrend({ meals }: CalorieTrendProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">カロリートレンド</h2>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm text-center">
          カロリーの推移グラフ<br />
          （過去7日間）
        </div>
      </div>
    </div>
  );
}