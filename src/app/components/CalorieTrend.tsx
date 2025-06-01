export default function CalorieTrend() {
    return (
      <>
        <div className="card">
          <div className="text-lg font-bold text-gray-800 mb-4">
            週間カロリー推移
          </div>
          <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm text-center">
            7日間のカロリー摂取量<br />
            トレンドグラフ
          </div>
        </div>
  
        <div className="card">
          <div className="text-lg font-bold text-gray-800 mb-4">
            月間PFCバランス
          </div>
          <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm text-center">
            月間の栄養バランス<br />
            推移グラフ
          </div>
        </div>
      </>
    );
  }