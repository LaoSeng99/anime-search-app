import { motion } from 'framer-motion';
import Button from './Button';

export interface DialogProps {
  type: 'info' | 'confirm';
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  /** Toggle danger theme (red button) for destructive actions like 'Delete' */
  isDanger?: boolean;

  /** Custom text for the confirm button. Default: 'Confirm' or 'Got it' */
  confirmLabel?: string;

  /** Custom text for the cancel button. Default: 'Cancel' */
  cancelLabel?: string;
  /** * Custom render for the content.
   * Message will be ignore if renderContent was use
   */
  renderContent?: React.ReactNode;

  /** * Custom render for the Confirm button.
   * Set 'confirmLabel' to null/undefined when using this to avoid confusion.
   */
  renderConfirm?: (props: {
    isLoading?: boolean;
    onClick: () => void;
  }) => React.ReactNode;

  /** * Custom render for the Cancel button.
   */
  renderCancel?: (props: {
    disabled?: boolean;
    onClick: () => void;
  }) => React.ReactNode;
}

const Dialog = ({
  type,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
  isDanger = false,
  confirmLabel,
  cancelLabel,
  renderConfirm,
  renderCancel,
  renderContent,
}: DialogProps) => {
  const defaultConfirmLabel = type === 'confirm' ? 'Confirm' : 'Got it';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative w-[95vw] min-w-[320px] max-w-md overflow-hidden bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Content */}

      <div className="p-6">
        <h3 className="text-xl font-bold text-white tracking-tight leading-snug wrap-break-word">
          {title}
        </h3>
        {renderContent ? (
          <div className="mt-4">{renderContent}</div>
        ) : (
          <p className="mt-4 text-gray-400 text-[15px] leading-relaxed wrap-break-word opacity-90">
            {message}
          </p>
        )}{' '}
      </div>

      {/* Action */}
      <div className="flex items-center justify-end gap-3 p-4 bg-white/2 border-t border-white/5">
        {/* Cancel */}
        {type === 'confirm' &&
          (renderCancel ? (
            renderCancel({ disabled: isLoading, onClick: onCancel! })
          ) : (
            <Button onClick={onCancel} disabled={isLoading} ghost size="md">
              {cancelLabel || 'Cancel'}
            </Button>
          ))}

        {/* Confirm */}
        {renderConfirm ? (
          renderConfirm({ isLoading, onClick: onConfirm })
        ) : (
          <Button
            onClick={onConfirm}
            danger={isDanger}
            primary={!isDanger}
            isLoading={isLoading}
            size="md"
            className="min-w-25">
            {confirmLabel || defaultConfirmLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Dialog;
