const TabNavigation = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`border-b border-border mb-6 ${className}`}>
      <nav className="flex gap-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                isActive
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;

