import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      {/* Sidebar is fixed, but flex container helps with alignment logic mental model */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 md:ml-72 transition-all duration-300">
        <TopBar />
        
        {/* Main Content Area with refined scrollbar and padding for the fixed header */}
        <main className="flex-1 mt-20 p-6 lg:p-10 overflow-y-auto scroll-smooth custom-scrollbar">
           <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
