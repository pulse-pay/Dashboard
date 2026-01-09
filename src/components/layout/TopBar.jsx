import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown } from 'lucide-react';

const TopBar = () => {
  const navigate = useNavigate();
  const storeName = 'FitZone Gym';

  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 z-20 flex items-center justify-end px-6 lg:px-10 transition-all duration-300">

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        
        {/* Notification Bell with Badge */}
        <button className="relative p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        {/* Profile / Settings Dropdown Trigger */}
        <button
          onClick={() => navigate('/store-profile')}
          className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200 group"
        >
          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold ring-2 ring-white shadow-md">
                {storeName.charAt(0)}
             </div>
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="hidden md:block text-left">
             <p className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">{storeName}</p>
             <p className="text-xs text-gray-500 font-medium">Administrator</p>
          </div>
          
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 group-hover:rotate-180" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
