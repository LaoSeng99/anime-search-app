import React from 'react';
import { Loader2 } from 'lucide-react';
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  outline?: boolean;
}

const baseStyles = `inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg 
                    cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none `;
const colorConfigs = {
  primary: {
    solid: 'bg-white text-black hover:bg-gray-100',
    outline: 'border border-white/20 text-white hover:bg-white/10',
  },
  secondary: {
    solid: 'bg-[#2a2a2a] text-[#a1a1aa] hover:bg-[#333333]',
    outline: 'border border-[#2a2a2a] text-[#a1a1aa] hover:bg-[#2a2a2a]/30',
  },
  success: {
    solid: 'bg-[#4ade80] text-black hover:bg-[#22c55e]',
    outline: 'border border-[#4ade80] text-[#4ade80] hover:bg-[#4ade80]/10',
  },
  info: {
    solid: 'bg-[#3b82f6] text-white hover:bg-[#2563eb]',
    outline: 'border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/10',
  },
  warn: {
    solid: 'bg-[#f97316] text-white hover:bg-[#ea580c]',
    outline: 'border border-[#f97316] text-[#f97316] hover:bg-[#f97316]/10',
  },
  help: {
    solid: 'bg-[#a855f7] text-white hover:bg-[#9333ea]',
    outline: 'border border-[#a855f7] text-[#a855f7] hover:bg-[#a855f7]/10',
  },
  danger: {
    solid: 'bg-[#ef4444] text-white hover:bg-[#dc2626]',
    outline: 'border border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10',
  },
  contrast: {
    solid: 'bg-white text-black hover:bg-gray-200',
    outline: 'border border-white text-white hover:bg-white hover:text-black',
  },
};

const sizes = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      children,
      className = '',
      outline = false,
      ...props
    },
    ref,
  ) => {
    const variantStyles = outline
      ? colorConfigs[variant].outline
      : colorConfigs[variant].solid;

    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizes[size]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}>
        {isLoading && (
          <Loader2 size={iconSize} className="animate-spin text-current" />
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
