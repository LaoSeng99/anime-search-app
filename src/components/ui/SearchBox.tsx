import { Loader2, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './Button';

//handle search value to parent
interface SearchBoxProps {
  onSearch: (query: string) => void; // Callback when search query is debounced
  onClear: () => void; // Callback when clear button is clicked
  initialValue?: string; // Optional initial input text
  isLoading?: boolean; // Shows a loading spinner if true
}
const SearchBox = ({
  onSearch,
  onClear,
  initialValue = '',
  isLoading,
}: SearchBoxProps) => {
  // Local state for the input text field
  const [inputValue, setInputValue] = useState(initialValue);

  const DEBOUNCE_DELAY_MS = 500;

  // Debounce logic: Triggers onSearch only after 500ms of inactivity
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, DEBOUNCE_DELAY_MS);

    // Cleanup: Resets the timer if inputValue changes again before 500ms
    return () => clearTimeout(handler);
  }, [inputValue, onSearch]);

  // Resets local input state and triggers parent onClear callback
  const handlerClear = () => {
    onClear();
    setInputValue('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      {/* Left Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400 group-focus-within:text-accent-neon transition-colors" />
      </div>

      {/* Main Search Input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        className="w-full py-4 pl-12 pr-12 text-gray-200 bg-white/5 border border-gray-700 rounded-2xl 
                   backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-neon/50 
                   focus:border-accent-neon transition-all placeholder:text-gray-500"
      />

      {/* Conditional Rendering: Show Loader when searching, otherwise show Clear button if input exists */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-accent-neon animate-spin" />
        ) : (
          inputValue && (
            <Button
              onClick={handlerClear}
              onMouseDown={(e) => e.stopPropagation()}>
              <X className="w-5 h-5" />
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBox;
