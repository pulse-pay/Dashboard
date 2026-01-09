const StatCard = ({ label, value, subtext, icon: Icon, trend }) => (
  <div className="relative overflow-hidden p-6 rounded-2xl bg-white shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-300">
    {/* Background Icon Decoration */}
    <div className="absolute -top-2 -right-2 p-4 opacity-5 pointer-events-none">
      {Icon && <Icon className="w-20 h-20 text-blue-900" />}
    </div>
    
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-blue-50/80 rounded-xl text-blue-600">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
        {subtext && <p className="text-sm text-gray-400 font-medium">{subtext}</p>}
        {trend && (
           <div className={`flex items-center gap-2 mt-2 text-xs font-bold ${trend === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
              <span className={`flex h-2 w-2 relative`}>
                 {trend === 'active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                 <span className={`relative inline-flex rounded-full h-2 w-2 ${trend === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              </span>
              {trend === 'active' ? 'Active Status' : 'Inactive'}
           </div>
        )}
      </div>
    </div>
  </div>
);

export default StatCard;
