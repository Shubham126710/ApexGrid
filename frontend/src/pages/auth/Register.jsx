import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Shield, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    teamName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await api.auth.register(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Failed to register');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-white">Join the Grid</h1>
        <p className="text-textSecondary">Create your engineer account to access team telemetry.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Full Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
              placeholder="Ayrton Senna"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Racing Team <span className="text-white/20 ml-1">(Optional)</span></label>
          <div className="relative group">
            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <select
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-textSecondary">Select a team</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Red Bull Racing">Red Bull Racing</option>
              <option value="McLaren">McLaren</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Alpine">Alpine</option>
              <option value="Williams">Williams</option>
              <option value="VCARB">VCARB</option>
              <option value="Stake F1 Team Kick Sauber">Stake F1 Team Kick Sauber</option>
              <option value="Haas">Haas</option>
              <option value="Andretti Global">Andretti Global</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-textSecondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
              placeholder="engineer@team.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-textSecondary uppercase tracking-wider block">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
              placeholder="••••••••"
            />
          </div>
          <p className="text-[11px] text-textSecondary mt-1">Must be at least 8 characters and contain a symbol.</p>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full btn-primary py-3.5 mt-2 flex justify-center items-center gap-2 text-base font-bold uppercase tracking-wider disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Provisioning Workspace...</span>
          ) : (
            <>
              Create Account <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-textSecondary">
        Already have an account?{' '}
        <Link to="/login" className="text-white hover:text-accent font-medium transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
