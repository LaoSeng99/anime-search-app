import { motion, AnimatePresence } from 'framer-motion';

const InitialLayer = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              when: 'afterChildren',
            },
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.2] pointer-events-none" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#ffffff05,transparent)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
            <motion.h1
              className="text-white text-3xl md:text-5xl font-black leading-none tracking-[1px]  text-center"
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: 1,
                y: 0,
                textShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 15px rgba(255,255,255,0.35)',
                  '0 0 0px rgba(255,255,255,0)',
                ],
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: { duration: 0.8 },
                textShadow: {
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                },
              }}>
              AnimeSearch
            </motion.h1>

            <div className="w-32 md:w-48 h-px bg-white/10 mt-6 md:mt-8 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: isLoading ? '100%' : '0%' }}
                transition={{
                  x: {
                    repeat: isLoading ? Infinity : 0,
                    duration: isLoading ? 1.5 : 0.4,
                    ease: 'easeInOut',
                  },
                }}
                className="absolute inset-0 bg-white"
              />
            </div>

            <div className="mt-4 md:mt-6 h-4 overflow-hidden relative w-full flex justify-center">
              <motion.span
                key={isLoading ? 'loading' : 'ready'}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] ${
                  isLoading ? 'text-zinc-500' : 'text-blue-400 font-bold'
                }`}>
                {isLoading ? 'Syncing Metadata...' : 'System Ready.'}
              </motion.span>
            </div>
          </div>

          <div className="absolute inset-4 md:inset-12 border border-white/5 pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/30" />

            <div className="hidden md:block absolute top-1/2 left-0 w-2 h-px bg-white/10 -translate-x-1/2" />
            <div className="hidden md:block absolute top-1/2 right-0 w-2 h-px bg-white/10 translate-x-1/2" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 md:bottom-16 text-[9px] text-white/60 font-mono tracking-widest uppercase">
            v1.0 // Secured Connection
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLayer;
