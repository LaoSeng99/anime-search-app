import { AlertCircle } from 'lucide-react';
import Button from './Button';
import { cn } from '../../utils/ui.util';
import { useNavigate } from 'react-router';

interface ErrorStateProps {
  title?: string;
  message?: string;
  iconClassName?: string;
  className?: string;
  showHomeButton?: boolean;
  icon?: React.ReactNode;
  retryButton?: React.ReactNode;
  onRetry?: () => void;
}
const ErrorState = ({
  title = 'Unable to load content',
  message = 'Something went wrong while fetching the data.',
  iconClassName = 'text-md text-white/20',
  icon = <AlertCircle className={iconClassName} />,
  showHomeButton = false,
  onRetry,
  retryButton = (
    <Button secondary onClick={onRetry}>
      Retry
    </Button>
  ),
  className = '',
}: ErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <section
      className={cn([
        'w-full min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6',
        className,
      ])}>
      <div className="max-w-md w-full p-12 bg-white/5 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="p-4 bg-white/5 rounded-full">{icon}</div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white/90">{title}</h2>
          <p className="text-zinc-500 text-sm">{message}</p>
        </div>
        <div className="flex gap-4">
          {retryButton}

          {showHomeButton && (
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ErrorState;
