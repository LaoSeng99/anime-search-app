import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  className?: string;
}
const ErrorState = ({
  title = 'Unable to load content',
  message = 'Something went wrong while fetching the data.',
  onRetry,
  className = '',
}: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-4 text-center w-full
                  ${className}`}>
      <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />

      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-gray-400 text-sm mt-2 mb-6">{message}</p>

      <Button onClick={() => onRetry()}>
        <RotateCcw className="w-4 h-4" />
        Try Again
      </Button>
    </motion.div>
  );
};

export default ErrorState;
