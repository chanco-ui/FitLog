
//ユーザーが「摂取状況」「栄養バランス」「推移」「記録」などのタブをクリックして表示内容を切り替えるためのUI

import { ActiveTab } from '@/types';

 //NavigationPropsコンポーネントが受け取るpropsの型定義
interface NavigationProps {
    //現在選択されているタブ
  activeTab: ActiveTab;
    //タブがクリックされたときに呼び出される関数
  onTabChange: (tab: ActiveTab) => void;
}

//タブの定義
const tabs = [
  { id: 'overview' as ActiveTab, label: '摂取状況' },
  { id: 'nutrition' as ActiveTab, label: '栄養バランス' },
  { id: 'trend' as ActiveTab, label: '推移' },
  { id: 'record' as ActiveTab, label: '記録' },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex bg-gray-50 border-b border-gray-200">
        {/* tabs.map(...)によって各タブをボタンをして表示 */}
      {tabs.map((tab) => (
        <button
          key={tab.id}
            //actuveTab === tab.idのときにactiveクラスを追加して、選択中のタブを強調表示
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            //ボタンがクリックされるとonTabChange(tab.id)が呼ばれ、親コンポーネントにタブの変更を通知
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}