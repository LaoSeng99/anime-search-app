import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import {
  FileQuestion,
  ChevronLeft,
  Home,
  AlertTriangle,
  ZapOff,
  WifiOff,
} from 'lucide-react';
import Button from '../components/ui/Button';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  const getErrorContent = () => {
    // 1. Handle Route Response Errors (404, 401, etc.)
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return {
          code: '404',
          title: "Isekai'd to Nowhere?",
          desc: "You've been hit by the 404-Truck and ended up in a world where this page doesn't exist.",
          subDesc:
            "This link is filler at best. Let's get you back to the main plot.",
          icon: <FileQuestion className="w-12 h-12 text-blue-400/50" />,
          glow: 'bg-blue-500/20',
        };
      }
      if (error.status === 401) {
        return {
          code: '401',
          title: 'Entry Denied: Low Power',
          desc: "Your clearance level isn't high enough to access this Restricted Sector.",
          subDesc: 'Level up your account or login to break the seal.',
          icon: <ZapOff className="w-12 h-12 text-yellow-400/50" />,
          glow: 'bg-yellow-500/20',
        };
      }
    }

    // 2. Handle Network Errors (Offline)
    if (error instanceof Error && error.message.includes('fetch')) {
      return {
        code: 'OFFLINE',
        title: 'Communication Interrupted',
        desc: 'The connection to the mainframe has been severed. Are you in a dead zone?',
        subDesc:
          'Check your router or wait for the signal to return to the Wired.',
        icon: <WifiOff className="w-12 h-12 text-zinc-400/50" />,
        glow: 'bg-zinc-500/20',
      };
    }

    // 3. Handle Render/Logic Crashes (The "null" pointer case)
    return {
      code: '500',
      title: 'Simulation Critical Error',
      desc: 'A digital anomaly has corrupted the current timeline. The Database is screaming.',
      subDesc:
        "Even the best protagonists fail sometimes. Let's try a System Reboot.",
      icon: <AlertTriangle className="w-12 h-12 text-red-500/50" />,
      glow: 'bg-red-500/20',
    };
  };

  const content = getErrorContent();

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden relative">
      {/* Dynamic Background Code */}
      <div className="absolute font-black text-[25vw] text-white/2 select-none pointer-events-none uppercase tracking-tighter">
        {content.code}
      </div>

      <div className="max-w-md w-full p-12 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-8 text-center animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="relative">
          <div className="p-6 bg-white/5 rounded-full relative z-10 border border-white/5">
            {content.icon}
          </div>
          <div
            className={`absolute inset-0 ${content.glow} blur-3xl -z-1 animate-pulse`}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight  uppercase">
            {content.title}
          </h2>
          <div className="space-y-1">
            <p className="text-zinc-300 text-sm md:text-base font-medium">
              {content.desc}
            </p>
            <p className="text-zinc-500 text-xs md:text-sm italic">
              {content.subDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            secondary
            icon={<ChevronLeft size={18} />}
            onClick={() => navigate(-1)}>
            Go Back
          </Button>

          <Button icon={<Home size={18} />} onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* Technical Detail Toggle (Optional - for debugging) */}
        {!isRouteErrorResponse(error) && (
          <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest mt-4">
            Err_Log:{' '}
            {error instanceof Error ? error.message : 'Unknown_Anomaly'}
          </p>
        )}
      </div>
    </section>
  );
};

export default ErrorPage;
