import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2, Zap, Shield, BarChart3, Clock, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    const phrases = [
      "OS",
      "MANAGEMENT",
      "HUB",
      "DASHBOARD",
      "OPERATIONS"
    ];
    let i = 0;
    let phraseIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, i - 1));
        i--;
        typingSpeed = 50;
      } else {
        setTypedText(currentPhrase.substring(0, i + 1));
        i++;
        typingSpeed = 100;
      }

      if (!isDeleting && i === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, []);

  const f1Teams = [
    { name: 'Red Bull', img: '/red_bull_logo.png' },
    { name: 'Mercedes', img: '/Mercedes_Logo.png' },
    { name: 'Ferrari', img: '/ferrari_logo.png' },
    { name: 'McLaren', img: '/McLaren_logo.svg' },
    { name: 'Aston Martin', img: '/aston_martin_logo.svg' },
    { name: 'Alpine', img: '/alpine_logo.png' },
    { name: 'Williams', img: '/williams_logo.svg' },
    { name: 'VCARB', img: '/VCARB_logo.png' },
    { name: 'Haas', img: '/haas_logo.png' },
    { name: 'Audi', img: '/audi_logo.svg' },
    { name: 'Cadillac', img: '/cadillac_logo.png' },
  ];
  const faqs = [
    { q: 'How does ApexGrid handle live telemetry?', a: 'ApexGrid integrates directly with standard garage telemetry servers via secure WebSockets, providing sub-millisecond latency for critical data streams during race weekends.' },
    { q: 'Can we migrate our existing component lifecycle data?', a: 'Yes. Our enterprise onboarding team provides white-glove migration services to port all historical component usage and lifecycle data into ApexGrid.' },
    { q: 'Is the platform FIA compliant for data security?', a: 'Absolutely. ApexGrid uses end-to-end encryption and meets all stringent FIA data protection and access logging requirements.' },
    { q: 'Do you offer on-premise deployments?', a: 'For top-tier enterprise clients, we offer air-gapped on-premise deployments that run entirely within your team\'s private infrastructure.' }
  ];

  return (
    <div className="min-h-screen font-sans text-textPrimary overflow-hidden selection:bg-accent selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ApexGrid" className="h-12 w-auto object-contain" />
            <span className="text-2xl font-bold tracking-tight text-white">ApexGrid</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-textSecondary">
            <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">Log in</Link>
            <Link to="/register" className="btn-primary text-sm px-5 py-2.5 shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-[0_0_25px_rgba(225,6,0,0.5)] hidden md:block">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16 px-6 relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center pt-10">
          <div className="space-y-6 z-10 relative">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surfaceHighlight border border-white/10 text-xs font-medium text-textSecondary">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span>v1.0.0 Alpha is now live</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-titillium font-black italic uppercase tracking-tighter leading-[1.1] min-h-[160px] sm:min-h-[200px] lg:min-h-[260px] flex flex-col justify-end">
              <span>The Ultimate</span>
              <span className="text-white">MOTORSPORT</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-textSecondary">
                {typedText}<span className="animate-pulse text-white">_</span>
              </span>
            </h1>
            
            <p className="text-lg text-textSecondary max-w-xl leading-relaxed">
              Enterprise-grade operations, logistics, and telemetry management platform built specifically for high-performance racing teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-base shadow-[0_0_30px_rgba(225,6,0,0.25)] hover:shadow-[0_0_40px_rgba(225,6,0,0.4)] hover:-translate-y-0.5 transition-transform duration-300">
                <span>Access Dashboard</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-4 text-sm text-textSecondary">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surfaceHighlight flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-500">
                  {'★★★★★'}
                </div>
                <span>Trusted by 500+ race engineers</span>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[16/10] flex items-center justify-center mt-8 lg:mt-0 lg:ml-8">
            <div className="relative w-full max-w-2xl mx-auto bg-[#0f0f11] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform rotate-1 md:hover:rotate-0 transition-transform duration-500">
              <div className="h-10 bg-[#18181b] border-b border-white/5 flex items-center px-4 space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto flex-1 flex justify-center">
                  <div className="h-5 w-48 bg-[#27272a] rounded text-[10px] text-textSecondary flex items-center justify-center px-2">
                    app.apexgrid.com/dashboard
                  </div>
                </div>
              </div>
              
              <div className="w-full relative bg-[#0a0a0a]">
                <img src="/hero.png" alt="ApexGrid Dashboard" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Partners Section */}
      <section className="border-y border-white/5 bg-surfaceHighlight/20 py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <p className="text-sm font-medium text-textSecondary whitespace-nowrap">
            Trusted by elite teams
          </p>
          <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max animate-infinite-scroll">
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8">
                {f1Teams.map((team, index) => (
                  <li key={index} className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 w-32 h-16 whitespace-nowrap">
                    <img src={team.img} alt={team.name} className="max-w-full max-h-full object-contain" />
                  </li>
                ))}
              </ul>
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8" aria-hidden="true">
                {f1Teams.map((team, index) => (
                  <li key={`clone-${index}`} className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 w-32 h-16 whitespace-nowrap">
                    <img src={team.img} alt={team.name} className="max-w-full max-h-full object-contain" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits (Bento Box Design) */}
      <section id="benefits" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-titillium font-black italic uppercase tracking-tighter mb-4">Unfair advantage, delivered.</h2>
            <p className="text-textSecondary max-w-2xl mx-auto text-lg">
              We focus on one thing: making your team faster by eliminating operational bottlenecks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
            <div className="md:col-span-2 card bg-gradient-to-br from-surface to-surfaceHighlight border-white/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Zap className="text-accent mb-4" size={32} />
                  <h3 className="text-2xl font-bold mb-2">Real-time Component Tracking</h3>
                  <p className="text-textSecondary max-w-md">Never guess the remaining lifespan of an engine or gearbox. Know exactly when to swap parts before catastrophic failure.</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-24 bg-white/5 rounded-full animate-pulse"></div>
                  <div className="h-8 w-32 bg-white/5 rounded-full animate-pulse delay-75"></div>
                  <div className="h-8 w-16 bg-white/5 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
            
            <div className="card border-white/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <img src="/FIA_logo.png" alt="FIA Logo" className="h-10 mb-4 opacity-90 object-contain" />
                <h3 className="text-xl font-bold mb-2">FIA Compliant</h3>
                <p className="text-textSecondary">Audit-ready logs and secure access controls built-in.</p>
              </div>
            </div>

            <div className="card border-white/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Clock className="text-green-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Logistics Sync</h3>
                <p className="text-textSecondary">Track cargo, hotels, and flights seamlessly.</p>
              </div>
            </div>

            <div className="md:col-span-2 card bg-gradient-to-tl from-surface to-surfaceHighlight border-white/5 overflow-hidden relative group">
               <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <BarChart3 className="text-accent mb-4" size={32} />
                  <h3 className="text-2xl font-bold mb-2">Telemetry Insights</h3>
                  <p className="text-textSecondary max-w-md">Connect your garage sensors directly to ApexGrid for real-time race engineering decisions.</p>
                </div>
                <div className="w-full h-24 mt-4 border-t border-white/5 flex items-end gap-1 pt-4">
                   {[...Array(20)].map((_, i) => (
                     <div key={i} className="flex-1 bg-white/10 rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%` }}></div>
                   ))}
                </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 border-y border-white/5 bg-surfaceHighlight/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-titillium font-black italic uppercase tracking-tighter mb-4">From sign-up to pole position.</h2>
            <p className="text-textSecondary max-w-2xl mx-auto text-lg">
              Get your entire operation running on ApexGrid in three simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent -z-10"></div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 mx-auto bg-surface border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-white/50 mb-6 shadow-xl">1</div>
              <h3 className="text-xl font-bold mb-3">Onboard your team</h3>
              <p className="text-textSecondary">Import your mechanics, engineers, and current component inventory via CSV or API.</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 mx-auto bg-surface border border-accent/30 rounded-2xl flex items-center justify-center text-3xl font-black text-accent mb-6 shadow-[0_0_30px_rgba(225,6,0,0.2)]">2</div>
              <h3 className="text-xl font-bold mb-3">Sync Telemetry</h3>
              <p className="text-textSecondary">Connect your garage servers to our secure WebSockets for real-time data flow.</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 mx-auto bg-surface border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-white/50 mb-6 shadow-xl">3</div>
              <h3 className="text-xl font-bold mb-3">Win Races</h3>
              <p className="text-textSecondary">Make faster decisions on the pit wall with unified data at your fingertips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-titillium font-black italic uppercase tracking-tighter mb-4">Loved by people worldwide</h2>
            <p className="text-textSecondary max-w-2xl mx-auto text-lg">
              Don't just take our word for it. Hear from the race engineers who use ApexGrid every weekend.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "ApexGrid completely eliminated our logistics spreadsheets. We now know exactly where every front wing is, anywhere in the world.", author: "James V.", role: "Chief Mechanic" },
              { text: "The live telemetry integration saved us from an engine failure in Monaco. The dashboard flagged a thermal anomaly 2 laps before it became critical.", author: "Sarah L.", role: "Race Engineer" },
              { text: "Transitioning our entire 300-person operation took less than a week. The UI is incredibly intuitive even in high-stress pit wall environments.", author: "Marcus T.", role: "Team Principal" }
            ].map((test, i) => (
              <div key={i} className="card border-white/5 bg-surface/50 backdrop-blur-sm">
                <div className="text-accent mb-4">{'★★★★★'}</div>
                <p className="text-textSecondary mb-6 italic">"{test.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surfaceHighlight border border-border overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt={test.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{test.author}</h4>
                    <p className="text-xs text-textSecondary">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-titillium font-black italic uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card border-white/5 p-1 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:text-accent transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`transform transition-transform duration-200 ${openFaq === i ? 'rotate-180 text-accent' : 'text-textSecondary'}`} size={20} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-textSecondary leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="card relative overflow-hidden text-center py-16 px-6 border-white/10 shadow-[0_0_50px_rgba(225,6,0,0.1)]">
            <div className="absolute inset-0 bg-carbon-fiber opacity-[0.05] mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-titillium font-black italic uppercase tracking-tighter mb-6">Ready to upgrade your paddock?</h2>
              <p className="text-textSecondary text-lg mb-8 max-w-2xl mx-auto">
                Join the top racing teams currently using ApexGrid to dominate the championship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-[#050505] pt-16 pb-8 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-carbon-fiber opacity-100 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/5 via-background/80 to-[#050505] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-accent/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="ApexGrid" className="h-12 w-auto object-contain" />
              <span className="text-2xl font-titillium font-bold tracking-tight text-white">ApexGrid <span className="text-accent italic">OS</span></span>
            </div>
            <p className="text-sm text-textSecondary mb-6 font-medium leading-relaxed">
              The premier operations and telemetry platform for elite motorsport teams worldwide.
            </p>
            <div className="flex items-center gap-4 mb-6 text-textSecondary text-sm font-medium">
              <span>Approved by</span>
              <img src="/FIA_logo.png" alt="FIA" className="h-10 w-auto object-contain opacity-70" />
            </div>
            <div className="flex items-center gap-4">
            </div>
          </div>
          
          <div>
            <h4 className="font-titillium font-bold uppercase tracking-widest text-white mb-6 text-sm">Platform</h4>
            <ul className="space-y-3 text-sm text-textSecondary font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Telemetry API</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Security & FIA</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-titillium font-bold uppercase tracking-widest text-white mb-6 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-textSecondary font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Partnerships</a></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-titillium font-bold uppercase tracking-widest text-white mb-6 text-sm">Paddock Insider</h4>
            <p className="text-sm text-textSecondary mb-4">Get the latest platform updates and motorsport engineering insights.</p>
            <div className="flex shadow-lg rounded-lg overflow-hidden border border-white/10 focus-within:border-accent transition-colors">
              <input type="email" placeholder="engineer@team.com" className="w-full bg-surface/80 text-white px-4 py-3 outline-none text-sm placeholder-white/30 backdrop-blur-md" />
              <button className="bg-accent hover:bg-red-700 text-white px-5 py-3 transition-colors text-sm font-bold uppercase tracking-wide">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-textSecondary font-medium relative z-10">
          <p>© 2026 ApexGrid Systems Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
