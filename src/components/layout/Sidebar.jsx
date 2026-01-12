import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, QrCode, Receipt, CreditCard, Package } from 'lucide-react';

const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/services',
    label: 'Services',
    icon: Package,
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
    <aside className="fixed left-0 top-0 h-screen w-64 md:w-72 bg-gray-900 text-white shadow-2xl z-30 overflow-hidden flex flex-col border-r border-white/5">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Glassmorphism Header */}
      <div className="relative h-20 flex items-center px-8 border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/20">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                PulsePay
                </h1>
                <p className="text-[10px] text-blue-200/60 uppercase tracking-widest font-semibold">Store Admin</p>
            </div>
        </div>
      </div>

      <nav className="relative flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Main Menu</p>
        
        {navItems.map(({ to, label, icon: IconComp, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 w-full overflow-hidden ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
             {({ isActive }) => (
                <>
                  {/* Active Indicator Glow */}
                  {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-100 z-0"></div>
                  )}

                  <IconComp className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-sm font-medium tracking-wide relative z-10">{label}</span>
                  
                  {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-300 shadow-md shadow-blue-200/50 animate-pulse"></div>}
                </>
             )}
          </NavLink>
        ))}
      </nav>

      <div className="relative p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-4 border border-white/5 shadow-inner">
           <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
              <p className="text-xs font-medium text-gray-300">System Online</p>
           </div>
           <p className="text-[10px] text-gray-500 text-center">© 2026 PulsePay Inc.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
