import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!token) {
      setError('Missing reset token');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      await api.auth.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Token may be invalid or expired.');
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
        <h1 className="text-3xl font-bold mb-3 text-white">Password Reset!</h1>
        <p className="text-textSecondary mb-8">
          Your password has been successfully changed.
        </p>
        <p className="text-sm text-textSecondary animate-pulse">
          Redirecting you to login...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-white">Set New Password</h1>
        <p className="text-textSecondary">Please enter your new password below.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-textSecondary uppercase tracking-wider block">New Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
              placeholder="••••••••"
              minLength={6}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-textSecondary uppercase tracking-wider block">Confirm Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
              placeholder="••••••••"
              minLength={6}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || !password || !confirmPassword}
          className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 text-base font-bold uppercase tracking-wider disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Updating...</span>
          ) : (
            <>
              Reset Password <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-textSecondary">
        Changed your mind?{' '}
        <Link to="/login" className="text-white hover:text-accent font-medium transition-colors">
          Return to login
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
