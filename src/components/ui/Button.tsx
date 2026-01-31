import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion, type HTMLMotionProps } from 'framer-motion';
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'ghost'
  | 'contrast';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  outline?: boolean;
  children?: React.ReactNode;
}

const baseStyles = `cursor-pointer inline-flex items-center justify-center font-bold tracking-wide transition-colors duration-200 rounded-xl disabled:opacity-40 disabled:pointer-events-none `;
const colorConfigs = {
  primary: {
    solid:
      'bg-white text-black hover:bg-gray-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]',
    outline: 'border border-white/20 text-white hover:bg-white/10',
  },
  secondary: {
    solid: 'bg-[#2a2a2a] text-zinc-400 hover:bg-[#333333] hover:text-white',
    outline: 'border border-white/10 text-zinc-400 hover:bg-white/5',
  },
  success: {
    solid: 'bg-[#4ade80] text-black hover:bg-[#22c55e]',
    outline: 'border border-[#4ade80]/50 text-[#4ade80] hover:bg-[#4ade80]/10',
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
    solid:
      'bg-[#ff4d4f] text-white hover:bg-[#ff7875] shadow-[0_0_20px_rgba(255,77,79,0.2)]',
    outline: 'border border-[#ff4d4f]/50 text-[#ff4d4f] hover:bg-[#ff4d4f]/10',
  },
  contrast: {
    solid: 'bg-zinc-900 text-white border border-white/10 hover:bg-black',
    outline: 'border border-white text-white hover:bg-white hover:text-black',
  },
  ghost: {
    solid: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5',
    outline: 'border border-transparent text-zinc-400 hover:border-white/10',
  },
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-3',
  icon: 'p-2.5',
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
    const variantStyles =
      colorConfigs[variant as keyof typeof colorConfigs]?.[
        outline ? 'outline' : 'solid'
      ] || colorConfigs.primary.solid;

    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`${baseStyles} ${variantStyles} ${sizes[size]} ${className} 
        `}
        disabled={isLoading || props.disabled}
        {...props}>
        {isLoading ? (
          <Loader2 className="animate-spin" size={iconSize} />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
          </>
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
