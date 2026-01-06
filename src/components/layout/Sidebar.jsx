import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, QrCode, Receipt } from 'lucide-react';

const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/clients',
    label: 'Clients',
    icon: Users,
  },
  {
    to: '/scan-entry',
    label: 'Scan Entry',
    icon: QrCode,
  },
  {
    to: '/transactions',
    label: 'Transactions',
    icon: Receipt,
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-border z-30 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div>
            <h1 className="text-lg font-bold text-primary">Store Admin</h1>
            <p className="text-xs text-text-secondary">Dashboard</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map(({ to, label, icon: IconComp, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white font-medium shadow-md'
                    : 'text-text hover:bg-background'
                }`
              }
            >
              <IconComp className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-text-secondary text-center">© 2024 Store Admin</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
