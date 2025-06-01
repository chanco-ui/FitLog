import { ActiveTab } from '@/types';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabs = [
  { id: 'overview' as ActiveTab, label: '摂取状況' },
  { id: 'nutrition' as ActiveTab, label: '栄養バランス' },
  { id: 'trend' as ActiveTab, label: '推移' },
  { id: 'record' as ActiveTab, label: '記録' },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex bg-gray-50 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}