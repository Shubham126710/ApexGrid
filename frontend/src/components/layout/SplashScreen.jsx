import { useEffect, useState } from 'react';

const QUOTES = [
  { text: "To achieve anything in this game, you must be prepared to dabble in the boundary of disaster.", author: "Stirling Moss" },
  { text: "If everything seems under control, you're not going fast enough.", author: "Mario Andretti" },
  { text: "Aerodynamics are for people who can't build engines.", author: "Enzo Ferrari" },
  { text: "Racing is life. Anything before or after is just waiting.", author: "Steve McQueen" },
  { text: "To finish first, you must first finish.", author: "Juan Manuel Fangio" },
  { text: "I am an artist, the track is my canvas, and the car is my brush.", author: "Graham Hill" },
  { text: "The closer you are to death, the more alive you feel.", author: "James Hunt" }
];

const SplashScreen = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    // Select random quote on mount
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    // Run loader for 3 seconds before fading out
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 800); // Trigger route transition after fade out completes
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center transition-opacity duration-700 ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Texture */}
      <div className="absolute inset-0 bg-carbon-fiber opacity-100"></div>
      
      {/* Subtle Glow & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background/80 to-[#050505] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-lg text-center px-4">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-16 animate-pulse" style={{ animationDuration: '3s' }}>
          <img src="/logo.png" alt="ApexGrid" className="w-24 h-24 mb-6 object-contain" />
          <h1 className="text-4xl md:text-5xl font-titillium font-bold tracking-tighter text-white">
            ApexGrid <span className="text-accent italic font-black">OS</span>
          </h1>
          <p className="text-textSecondary mt-2 font-mono text-sm tracking-widest uppercase">Telemetry & Operations</p>
        </div>

        {/* User Provided Loader */}
        <div className="loader drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-12 transform scale-75 md:scale-100">
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="text font-titillium tracking-widest text-xl"><span>Loading</span></div>
          <div className="line bg-accent"></div>
        </div>

        {/* Quote */}
        <div className="mt-8 px-6">
          <p className="text-textSecondary/60 italic font-serif text-lg md:text-xl">
            "{quote.text}"
          </p>
          <p className="text-textSecondary/40 text-sm mt-3 font-medium uppercase tracking-wider">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
