import { Loader2, Search, X } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import Button from './Button';

//handle search value to parent
interface SearchBoxProps {
  value: string;
  onChange?: (query: string) => void; // Callback when search query is debounced
  onClear?: () => void; // Callback when clear button is clicked
  onFocus?: () => void;
  isLoading?: boolean; // Shows a loading spinner if true
}

// to parent ref
export interface SearchBoxHandle {
  clear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchBox = forwardRef<SearchBoxHandle, SearchBoxProps>(
  (
    { value = '', onChange, onClear, onFocus, isLoading }: SearchBoxProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // Resets local input state and triggers parent onClear callback
    const handleClear = () => {
      onChange?.('');
      inputRef.current?.focus();
    };

    useImperativeHandle(ref, () => ({
      // clear search input for better ux
      clear: handleClear,
      inputRef: inputRef,
    }));

    return (
      <div className="relative w-full max-w-2xl group">
        {/* Left Search Icon */}
        <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-100 group-focus-within:text-accent-neon transition-colors" />
        </div>

        {/* Main Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
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
            value &&
            onClear && (
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
