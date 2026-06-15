import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await api.auth.forgotPassword(email);
      setSuccess(true);
      if (response.debugToken) {
        console.log("DEMO MODE: Copy this token to use for reset:", response.debugToken);
      }
    } catch (err) {
      setError(err.message || 'Failed to request password reset');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-white">Check your email</h1>
        <p className="text-textSecondary mb-8">
          If an account exists for <span className="text-white font-medium">{email}</span>, we have sent password reset instructions.
        </p>
        <p className="text-sm text-textSecondary">
          Check the browser console for the token if running in demo mode!
        </p>
        <Link 
          to="/login"
          className="mt-8 inline-block w-full btn-secondary py-3 text-sm font-bold uppercase tracking-wider"
        >
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-white">Reset Password</h1>
        <p className="text-textSecondary">Enter your email and we'll send you instructions to reset your password.</p>
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

        <button 
          type="submit" 
          disabled={isSubmitting || !email}
          className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 text-base font-bold uppercase tracking-wider disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Sending...</span>
          ) : (
            <>
              Send Reset Link <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-textSecondary">
        Remembered your password?{' '}
        <Link to="/login" className="text-white hover:text-accent font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
