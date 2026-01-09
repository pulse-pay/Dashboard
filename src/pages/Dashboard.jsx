import { DollarSign, Users, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const KPI_CARDS = [
  {
    id: 'total-revenue',
    label: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/20',
  },
  {
    id: 'active-clients',
    label: 'Active Clients',
    value: '1,234',
    change: '+3.2%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/20',
  },
  {
    id: 'total-streams',
    label: 'Total Streams',
    value: '8,456',
    change: '-2.4%',
    trend: 'down',
    icon: Activity,
    color: 'from-orange-500 to-red-500',
    shadow: 'shadow-orange-500/20',
  },
  {
    id: 'growth-rate',
    label: 'Monthly Growth',
    value: '23.5%',
    change: '+4.1%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/20',
  },
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 12000, organic: 8000 },
  { month: 'Feb', revenue: 15000, organic: 10000 },
  { month: 'Mar', revenue: 18000, organic: 12000 },
  { month: 'Apr', revenue: 22000, organic: 15000 },
  { month: 'May', revenue: 25000, organic: 18000 },
  { month: 'Jun', revenue: 30000, organic: 22000 },
  { month: 'Jul', revenue: 35000, organic: 25000 },
  { month: 'Aug', revenue: 40000, organic: 28000 },
  { month: 'Sep', revenue: 38000, organic: 26000 },
  { month: 'Oct', revenue: 42000, organic: 30000 },
  { month: 'Nov', revenue: 45000, organic: 32000 },
  { month: 'Dec', revenue: 45231, organic: 35000 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Real-time store performance insights</p>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">Last updated: Just now</span>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-all">
                <Activity className="w-4 h-4 text-gray-600" />
            </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</p>
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{kpi.value}</h3>
                    
                    <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${kpi.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                        {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {kpi.change}
                    </div>
                </div>
                
                <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.color} shadow-lg ${kpi.shadow} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
                 <h2 className="text-xl font-bold text-gray-900 tracking-tight">Revenue Analytics</h2>
                 <p className="text-sm text-gray-500">Yearly earnings overview</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                <option>Last 12 Months</option>
                <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 600 }}
                />
                <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    activeDot={{ r: 8, fill: '#2563eb', strokeWidth: 0 }}
                />
                <Area 
                    type="monotone" 
                    dataKey="organic" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorOrganic)" 
                    activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity / Side Panel */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8 text-white relative overflow-hidden">
           {/* Background Decorations (Dark Theme) */}
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
           
           <h2 className="text-xl font-bold tracking-tight mb-6">Recent Activity</h2>
           
           <div className="space-y-6 relative z-10">
              {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold group-hover:text-white group-hover:bg-blue-600 transition-all">
                        {item}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">New Subscription</p>
                        <p className="text-xs text-gray-400 mt-1">Client #{1000 + item} started a plan</p>
                        <p className="text-[10px] text-gray-500 mt-2">2 mins ago</p>
                      </div>
                  </div>
              ))}
           </div>
           
           <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-semibold transition-all">
             View All Activity
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
