import { Search, ArrowLeftRight, X } from 'lucide-react';
import React from 'react';

const KeyboardShortcutContent = () => {
  const guides = [
    { key: 'S', desc: 'Focus Search', icon: <Search size={14} /> },
    {
      key: '← →',
      desc: 'Prev/Next Page',
      icon: <ArrowLeftRight size={14} />,
    },
    {
      key: 'Ctrl + ← / →',
      desc: 'Switch Pages',
      icon: <ArrowLeftRight size={14} />,
    },
    {
      key: 'ESC',
      desc: 'Close Dialog/ Unfocus searchbox',
      icon: <X size={14} />,
    },
  ];
  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-[auto_1fr] gap-y-6 gap-x-10 items-center">
        {guides.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 opacity-80">{item.icon}</span>
              <kbd className="min-w-10.5 h-9 flex items-center justify-center bg-zinc-800 border-b-[3px] border-black rounded-lg px-2 font-mono text-sm font-extrabold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.3)]">
                {item.key}
              </kbd>
            </div>

            <div className="flex flex-col">
              <span className="text-zinc-200 text-sm font-semibold tracking-wide">
                {item.desc}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default KeyboardShortcutContent;
