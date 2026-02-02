import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dialog, { type DialogProps } from '../components/ui/Dialog';

type DialogConfig = Omit<DialogProps, 'isLoading'>;

interface DialogContextType {
  show: (options: DialogConfig) => void;
  hide: () => void;
  setLoading: (loading: boolean) => void;
  isOpen: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<DialogProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const show = useCallback((options: DialogConfig) => {
    setConfig({ ...options } as DialogProps);
    setIsLoading(false);
    setIsOpen(true);
  }, []);

  const hide = useCallback(() => {
    if (!isLoading) setConfig(null);

    setIsOpen(false);
  }, [isLoading]);

  return (
    <DialogContext.Provider
      value={{ show, hide, setLoading: setIsLoading, isOpen }}>
      {children}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {config && (
              <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                {/* Overlay  */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={hide}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Dialog UI */}
                <Dialog
                  {...config}
                  isLoading={isLoading}
                  onCancel={() => {
                    config.onCancel?.();
                    hide();
                  }}
                  onConfirm={() => {
                    config.onConfirm();
                  }}
                />
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </DialogContext.Provider>
  );
};

export default DialogContext;
