import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';

export interface DatePickerProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.showPicker();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      whileTap={{ scale: 0.98 }}
      onClick={handleContainerClick}
      className="relative flex items-center justify-between px-3 py-2.5 
                 bg-white/5 border border-white/10 rounded-lg cursor-pointer
                 group transition-all duration-300 shadow-inner">
      <input
        ref={inputRef}
        value={value}
        type="date"
        onChange={handleChange}
        className="absolute inset-0 w-0 h-0 opacity-0 translate-x-6 translate-y-8"
        style={{ colorScheme: 'dark' }}
      />

      <span
        className={`text-sm tracking-wide ${value ? 'text-gray-100' : 'text-gray-400'}`}>
        {value ? value : 'Select Date'}
      </span>

      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}>
        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"></Calendar>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50 rounded-b-lg origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
      />
    </motion.div>
  );
};

export default DatePicker;
