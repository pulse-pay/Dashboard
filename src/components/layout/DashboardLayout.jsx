import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Sidebar />
      <TopBar />
      <div className="ml-[260px] mt-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
