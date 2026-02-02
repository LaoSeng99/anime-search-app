import { useContext } from 'react';
import type { DialogProps } from '../components/ui/Dialog';
import DialogContext from '../context/DialogContext';
import { useKeyboardAccessibility } from './useKeyboardAccessibility';

type ConfirmOptions = Pick<
  DialogProps,
  | 'isDanger'
  | 'confirmLabel'
  | 'cancelLabel'
  | 'renderConfirm'
  | 'renderCancel'
  | 'onCancel'
>;

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error('useDialog must be used within DialogProvider');

  const hide = context.hide;
  useKeyboardAccessibility({
    onEscape: hide,
    enabled: context.isOpen,
  });
  /**
   * @param title - Dialog Title
   * @param message - Dialog Content
   * @param action - Async or sync function to execute on confirm
   * @param options - Optional: isDanger, labels, or custom renderers
   */
  const confirm = (
    title: string,
    message: string,
    action: () => Promise<void> | void,
    options?: ConfirmOptions,
  ) => {
    context.show({
      type: 'confirm',
      title,
      message,
      ...options,
      onConfirm: async () => {
        const result = action();

        if (result instanceof Promise) {
          context.setLoading(true);
          try {
            await result;
            hide();
          } catch (error) {
            console.error('Dialog Action Failed:', error);
          } finally {
            context.setLoading(false);
          }
        } else {
          hide();
        }
      },
      onCancel: () => {
        options?.onCancel?.();
        hide();
      },
    });
  };

  const info = (title: string, message: string, options?: ConfirmOptions) => {
    context.show({
      type: 'info',
      title,
      message,
      ...options,
      onConfirm: () => hide(),
    });
  };

  const custom = (
    title: string,
    content: React.ReactNode,
    options?: ConfirmOptions,
  ) => {
    context.show({
      type: 'info',
      title,
      ...options,
      renderContent: content,
      onConfirm: () => hide(),
    });
  };

  return { confirm, info, custom, hide: context.hide };
};
