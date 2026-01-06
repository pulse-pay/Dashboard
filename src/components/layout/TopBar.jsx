import { useNavigate } from 'react-router-dom';
import { Settings, Bell } from 'lucide-react';
import Avatar from '../common/Avatar';

const TopBar = () => {
  const navigate = useNavigate();
  const storeName = 'FitZone Gym';

  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-white border-b border-border z-20 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center flex-1">
        <h2 className="text-lg font-semibold text-text">{storeName}</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-text-secondary hover:bg-background rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('/store-profile')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background hover:bg-border text-text transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
          <Avatar name={storeName} size="sm" className="ml-1" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
