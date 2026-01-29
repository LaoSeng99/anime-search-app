import { Search } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  isLoading?: boolean;
}

const SearchBox = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-5 h-5 text-gray-100 group-focus-within:text-accent-neon transition-colors" />
      </div>

      <input
        type="text"
        value=""
        placeholder="Search..."
        className="w-full py-4 pl-12 pr-12 text-gray-200 bg-white/5 border border-gray-700 rounded-2xl 
                   backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-neon/50 
                   focus:border-accent-neon transition-all placeholder:text-gray-500"
      />
    </div>
  );
};

export default SearchBox;
