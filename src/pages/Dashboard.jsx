import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Dummy data for KPIs - exactly 4 metrics as required
  const kpiData = [
    {
      id: 'total-revenue',
      label: 'Total Revenue',
      value: '$45,231',
      icon: DollarSign,
      description: 'All-time revenue',
      color: 'bg-blue-50 text-primary',
    },
    {
      id: 'active-clients',
      label: 'Active Clients',
      value: '1,234',
      icon: Users,
      description: 'Current count',
      color: 'bg-green-50 text-green-600',
    },
    {
      id: 'total-clients',
      label: 'Total Clients',
      value: '3,456',
      icon: Activity,
      description: 'Lifetime count',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'growth-rate',
      label: 'Growth Rate',
      value: '23.5%',
      icon: TrendingUp,
      description: 'Percentage',
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  // Dummy data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: 30000 },
    { month: 'Jul', revenue: 35000 },
    { month: 'Aug', revenue: 40000 },
    { month: 'Sep', revenue: 38000 },
    { month: 'Oct', revenue: 42000 },
    { month: 'Nov', revenue: 45000 },
    { month: 'Dec', revenue: 45231 },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Dashboard</h1>
        <p className="text-text-secondary mt-2">Welcome back! Here's your store performance</p>
      </div>

      {/* KPI Cards - Exactly 4 metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-surface rounded-lg shadow-sm p-6 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-text mb-1">{kpi.value}</p>
                <p className="text-xs text-text-secondary">{kpi.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Overview Chart - Large Area or Bar chart */}
      <div className="bg-surface rounded-lg shadow-sm p-6 border border-border">
        <h2 className="text-lg font-semibold text-text mb-6">Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
