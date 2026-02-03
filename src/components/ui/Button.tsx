import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/ui.util';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  info?: boolean;
  warn?: boolean;
  danger?: boolean;
  ghost?: boolean;
  contrast?: boolean;
  outline?: boolean;

  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      primary,
      secondary,
      success,
      info,
      warn,
      danger,
      ghost,
      contrast,
      outline = false,
      size = 'md',
      isLoading,
      icon,
      iconPosition = 'left',
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const variant = danger
      ? 'danger'
      : success
        ? 'success'
        : warn
          ? 'warn'
          : info
            ? 'info'
            : secondary
              ? 'secondary'
              : ghost
                ? 'ghost'
                : contrast
                  ? 'contrast'
                  : 'primary';

    const baseStyles = cn(
      'relative inline-flex items-center justify-center font-bold tracking-tight cursor-pointer overflow-hidden',
      'rounded-xl transition-all duration-200',
      'outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950', // Dark mode focus ring
      'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    );
    const colorConfigs = {
      primary: {
        solid:
          'bg-zinc-100 text-zinc-950 hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.15)] border border-transparent',
        outline:
          'border-2 border-zinc-200/40 text-zinc-100 hover:border-zinc-100 hover:bg-zinc-100/10',
      },
      secondary: {
        solid:
          'bg-zinc-800/80 text-zinc-200 border border-white/5 hover:bg-zinc-700 hover:text-white',
        outline:
          'border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800/50',
      },
      danger: {
        solid:
          'bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-900/20',
        outline:
          'border border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500',
      },
      success: {
        solid:
          'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-900/20',
        outline:
          'border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500',
      },
      warn: {
        solid: 'bg-amber-500 text-zinc-950 hover:bg-amber-400',
        outline:
          'border border-amber-500/50 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500',
      },
      info: {
        solid: 'bg-blue-600 text-white hover:bg-blue-500',
        outline:
          'border border-blue-500/50 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500',
      },
      contrast: {
        solid: 'bg-white text-black hover:bg-zinc-200',
        outline:
          'border-2 border-white text-white hover:bg-white hover:text-black',
      },
      ghost: {
        solid:
          'bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/10',
        outline:
          'border border-dashed border-zinc-700 text-zinc-500 hover:text-zinc-300',
      },
    };

    const sizeConfigs = {
      sm: {
        container: 'h-8 px-3 text-xs',
        gap: 'gap-1.5',
        icon: 14,
      },
      md: {
        container: 'h-10 px-5 text-sm',
        gap: 'gap-2',
        icon: 18,
      },
      lg: {
        container: 'h-12 px-8 text-base',
        gap: 'gap-2.5',
        icon: 20,
      },
      icon: {
        container: 'h-10 w-10 p-0',
        gap: 'gap-0',
        icon: 20,
      },
    };

    const variantKey =
      variant === 'ghost' ? 'solid' : outline ? 'outline' : 'solid';
    const activeVariant = colorConfigs[variant][variantKey];

    const activeSize = sizeConfigs[size];
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(
          baseStyles,
          activeVariant,
          activeSize.container,
          className,
        )}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        {...props}>
        {/* Loading  */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl z-10">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-xl" />
            <Loader2
              className="animate-spin relative z-20"
              size={activeSize.icon}
            />
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            'flex items-center justify-center transition-opacity duration-200',
            activeSize.gap,
            isLoading && 'opacity-0',
          )}>
          {icon && iconPosition === 'left' && (
            <span className="shrink-0 leading-none flex items-center">
              {icon}
            </span>
          )}

          {children && <span>{children}</span>}

          {icon && iconPosition === 'right' && (
            <span className="shrink-0 leading-none flex items-center">
              {icon}
            </span>
          )}
        </div>
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
