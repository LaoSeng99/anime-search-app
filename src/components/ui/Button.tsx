import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/ui.util';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  // Boolean Variants
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

    const baseStyles =
      'relative cursor-pointer inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none';

    const colorConfigs = {
      primary: {
        solid:
          'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm',
        outline:
          'border border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900',
      },
      secondary: {
        solid:
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700',
        outline:
          'border border-zinc-200 text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50',
      },
      success: {
        solid: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
        outline:
          'border border-emerald-500/50 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10',
      },
      danger: {
        solid: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
        outline:
          'border border-red-500/50 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10',
      },
      warn: {
        solid: 'bg-amber-500 text-black hover:bg-amber-600',
        outline: 'border border-amber-500/50 text-amber-600 hover:bg-amber-50',
      },
      info: {
        solid: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-blue-500/50 text-blue-600 hover:bg-blue-50',
      },
      contrast: {
        solid:
          'bg-black text-white border border-zinc-800 hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100',
        outline:
          'border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black',
      },
      ghost: {
        solid:
          'bg-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/50',
        outline:
          'border border-transparent text-zinc-500 hover:border-zinc-200 dark:hover:border-zinc-800',
      },
    };

    const sizeConfigs = {
      sm: {
        container: 'h-8 px-3 text-xs rounded-lg',
        gap: 'gap-1.5',
        icon: 14,
      },
      md: { container: 'h-11 px-6 text-sm rounded-xl', gap: 'gap-2', icon: 18 },
      lg: {
        container: 'h-14 px-8 text-base rounded-2xl',
        gap: 'gap-3',
        icon: 20,
      },
      icon: { container: 'h-10 w-10 p-0 rounded-xl', gap: 'gap-0', icon: 20 },
    };

    const activeVariant = colorConfigs[variant][outline ? 'outline' : 'solid'];
    const activeSize = sizeConfigs[size];

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseStyles,
          activeVariant,
          activeSize.container,
          className,
        )}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        {...props}>
        {isLoading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit z-10">
            <Loader2 className="animate-spin" size={activeSize.icon} />
          </motion.span>
        )}

        <span
          className={cn(
            'inline-flex items-center transition-opacity duration-200',
            activeSize.gap,
            isLoading ? 'opacity-0' : 'opacity-100',
          )}>
          {icon && iconPosition === 'left' && (
            <span
              className="shrink-0 flex items-center justify-center [&>svg]:w-[1em] [&>svg]:h-[1em]"
              style={{ fontSize: activeSize.icon }}
              aria-hidden="true">
              {icon}
            </span>
          )}

          {children && <span>{children}</span>}

          {icon && iconPosition === 'right' && (
            <span
              className="shrink-0 flex items-center justify-center"
              aria-hidden="true"
              style={{ fontSize: activeSize.icon }}>
              {icon}
            </span>
          )}
        </span>
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
