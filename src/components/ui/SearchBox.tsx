import { Loader2, Search, X } from 'lucide-react';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Button from './Button';

//handle search value to parent
interface SearchBoxProps {
  onSearch: (query: string) => void; // Callback when search query is debounced
  onClear: () => void; // Callback when clear button is clicked
  onFocus: () => void;
  initialValue?: string; // Optional initial input text
  isLoading?: boolean; // Shows a loading spinner if true
}

// to parent ref
export interface SearchBoxHandle {
  clear: () => void;
}

const SearchBox = forwardRef<SearchBoxHandle, SearchBoxProps>(
  (
    {
      onSearch,
      onClear,
      onFocus,
      initialValue = '',
      isLoading,
    }: SearchBoxProps,
    ref,
  ) => {
    const DEBOUNCE_DELAY_MS = 500;
    // Local state for the input text field
    const [inputValue, setInputValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);
    // Resets local input state and triggers parent onClear callback
    const handleClear = () => {
      onClear();
      setInputValue('');
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') handleClear();
    };

    useImperativeHandle(ref, () => ({
      // clear search input for better ux
      clear: () => setInputValue(''),
    }));

    // Debounce logic: Triggers onSearch only after 500ms of inactivity
    useEffect(() => {
      //If value is empty , trigger search immediately (default/trend)
      if (inputValue.trim() === '') {
        onSearch('');
        return;
      }

      const handler = setTimeout(() => {
        onSearch(inputValue);
      }, DEBOUNCE_DELAY_MS);

      // Cleanup: Resets the timer if inputValue changes again before 500ms
      return () => clearTimeout(handler);
    }, [inputValue, onSearch]);

    return (
      <div className="relative w-full max-w-2xl mx-auto group">
        {/* Left Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5  text-gray-100 group-focus-within:text-accent-neon transition-colors" />
        </div>

        {/* Main Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search anime..."
          className="w-full py-4 pl-12 pr-12 text-gray-100 bg-black/40 border border-white/20 rounded-2xl 
             backdrop-blur-md transition-all duration-500 outline-none
             placeholder:text-gray-400
             focus:bg-black/60 
             focus:border-white/60
             focus:ring-0
             focus:shadow-[0_0_15px_rgba(255,255,255,0.1),0_0_30px_rgba(255,255,255,0.05)]"
        />

        {/* Conditional Rendering: Show Loader when searching, otherwise show Clear button if input exists */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-accent-neon animate-spin" />
          ) : (
            inputValue && (
              <Button
                onClick={handleClear}
                onMouseDown={(e) => e.stopPropagation()}>
                <X className="w-5 h-5" />
              </Button>
            )
          )}
        </div>
      </div>
    );
  },
);

export default SearchBox;
