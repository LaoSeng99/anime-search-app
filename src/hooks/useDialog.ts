import { useContext } from 'react';
import type { DialogProps } from '../components/ui/Dialog';
import DialogContext from '../context/DialogContext';

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
            context.hide();
          } catch (error) {
            console.error('Dialog Action Failed:', error);
          } finally {
            context.setLoading(false);
          }
        } else {
          context.hide();
        }
      },
      onCancel: () => {
        options?.onCancel?.();
        context.hide();
      },
    });
  };

  const info = (title: string, message: string, options?: ConfirmOptions) => {
    context.show({
      type: 'info',
      title,
      message,
      ...options,
      onConfirm: () => context.hide(),
    });
  };

  return { confirm, info, hide: context.hide };
};
