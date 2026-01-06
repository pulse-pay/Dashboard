import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = 'Search...', value, onChange, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-secondary"
        />
      </div>
    </div>
  );
};

export default SearchBar;

