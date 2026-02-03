import type { ElementType } from 'react';

interface EmptyStateProps {
  icon: ElementType;
  message: string;
}

const EmptyState = ({ icon: Icon, message }: EmptyStateProps) => {
  return (
    <div className="mt-12 p-12 bg-white/2 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
      <Icon className="w-8 h-8 text-white/20" />
      <p className="text-zinc-500 text-sm md:text-base font-medium">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
