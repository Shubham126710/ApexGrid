import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#050505] font-sans text-textPrimary">
      {/* Left Column: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 py-12 relative z-10">
        <div className="w-full max-w-md mx-auto">
          {/* Logo header */}
          <Link to="/" className="inline-flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="ApexGrid" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-titillium font-bold tracking-tight text-white">
              ApexGrid <span className="text-accent italic">OS</span>
            </span>
          </Link>

          <Outlet />
          
        </div>
      </div>

      {/* Right Column: Hero Graphic */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#111] items-center justify-center overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-carbon-fiber opacity-40 mix-blend-overlay z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent z-0 pointer-events-none"></div>
        
        <div className="relative z-10 p-16 flex flex-col items-start max-w-2xl">
          <div className="w-16 h-2 bg-accent mb-8"></div>
          <h2 className="text-5xl font-titillium font-black italic uppercase tracking-tighter text-white mb-6 leading-tight">
            The unfair advantage.
          </h2>
          <p className="text-xl text-textSecondary font-medium leading-relaxed max-w-lg mb-12">
            Connect your telemetry, optimize your logistics, and dominate the track with the premier motorsport operations platform.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surfaceHighlight flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover opacity-80 grayscale" />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium text-textSecondary">
              Trusted by world championship teams
            </div>
          </div>
        </div>

        {/* Abstract decorative graphic */}
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] border border-white/5 rounded-full z-0 flex items-center justify-center opacity-30">
          <div className="w-[400px] h-[400px] border border-accent/20 rounded-full"></div>
          <div className="absolute w-[800px] h-[1px] bg-white/10 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
