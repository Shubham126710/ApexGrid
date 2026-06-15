import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await api.auth.login({ email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Failed to login');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-white">Welcome back</h1>
        <p className="text-textSecondary">Enter your credentials to access the paddock.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-textSecondary uppercase tracking-wider block">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
              placeholder="engineer@team.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-textSecondary uppercase tracking-wider block">Password</label>
            <a href="#" className="text-xs text-accent hover:text-red-400 transition-colors font-medium">Forgot password?</a>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 text-base font-bold uppercase tracking-wider disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Authenticating...</span>
          ) : (
            <>
              Sign In <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-textSecondary">
        Don't have an account?{' '}
        <Link to="/register" className="text-white hover:text-accent font-medium transition-colors">
          Request access
        </Link>
      </p>
    </div>
  );
};

export default Login;
