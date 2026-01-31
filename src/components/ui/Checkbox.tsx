import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className="flex items-center gap-4 cursor-pointer group select-none">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
        />

        <motion.div
          animate={{
            backgroundColor: checked ? 'rgb(240, 240, 240)' : 'transparent',
            borderColor: checked ? 'rgb(255, 255, 255)' : 'rgb(64, 64, 64)',
            boxShadow: checked
              ? '0px 0px 12px rgba(255, 255, 255, 0.3)'
              : 'none',
          }}
          transition={{ duration: 0.2 }}
          className="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-shadow overflow-hidden">
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Check size={16} strokeWidth={4} className="text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="absolute inset-0 w-6 h-6 bg-indigo-500/10 rounded-lg scale-0 group-hover:scale-125 transition-transform duration-300 -z-10" />
      </div>

      <span
        className={`text-base font-medium transition-colors duration-200 ${
          checked ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
        }`}>
        {label}
      </span>
    </label>
  );
};
export default Checkbox;
