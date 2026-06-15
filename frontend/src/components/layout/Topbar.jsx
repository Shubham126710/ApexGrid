import { useState } from 'react';
import { LayoutDashboard, Plus, Share2, Sparkles, User, Menu, LogOut, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewComponentModal from '../modals/NewComponentModal';
import AddEventModal from '../modals/AddEventModal';

const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/').pop();
  const pageTitle = path === 'app' ? 'Dashboard' : path.charAt(0).toUpperCase() + path.slice(1);
  
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-[#0a0a0a] border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3 text-white font-medium">
        <button onClick={toggleSidebar} className="md:hidden text-textSecondary hover:text-white transition-colors">
          <Menu size={20} />
        </button>
        <LayoutDashboard size={18} className="text-textSecondary hidden md:block" />
        <span className="truncate">{pageTitle}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Profile and basic tools */}
        <div className="flex items-center gap-3 pr-4 border-r border-border">
          <div className="relative">
            <div 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-surfaceHighlight hover:bg-surface border border-border px-3 py-1.5 rounded-lg cursor-pointer transition-colors text-sm"
            >
              <User size={14} className="text-textSecondary" />
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#121212] border border-border rounded-xl shadow-2xl py-2 z-50">
                <div className="px-4 py-3 border-b border-border mb-2">
                  <div className="font-bold text-white truncate">{user?.name || 'Engineer'}</div>
                  <div className="text-xs text-textSecondary truncate">{user?.email}</div>
                  {user?.teamId && (
                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                      <Shield size={12} /> Team ID: {user.teamId}
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-teal-500/5 hover:from-teal-500/20 text-teal-400 border border-teal-500/20 px-3 py-1.5 rounded-lg text-sm transition-all shadow-[0_0_10px_rgba(20,184,166,0.1)] hidden sm:flex">
            <Sparkles size={14} /> Ask AI
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={() => setShowEventModal(true)} className="flex items-center gap-2 bg-transparent hover:bg-surfaceHighlight border border-border text-white px-3 py-1.5 rounded-lg text-sm transition-colors shadow-sm hidden sm:flex">
            <Plus size={14} /> Add Event
          </button>
          <button onClick={() => setShowComponentModal(true)} className="flex items-center gap-2 bg-surfaceHighlight hover:bg-white/10 border border-border text-white px-3 py-1.5 rounded-lg text-sm transition-colors shadow-sm">
            <Plus size={14} /> <span className="hidden sm:inline">New Component</span>
          </button>
        </div>
      </div>

      <NewComponentModal isOpen={showComponentModal} onClose={() => setShowComponentModal(false)} onRefresh={() => window.location.reload()} />
      <AddEventModal isOpen={showEventModal} onClose={() => setShowEventModal(false)} onRefresh={() => window.location.reload()} />
    </header>
  );
};

export default Topbar;
