import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Flag, Package, Truck, Receipt, Database, Inbox, Calendar, Folder, FileText, ChevronRight, Search as SearchIcon } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { path: '/app', label: 'Dashboard', icon: Home },
    { path: '/app/database', label: 'Database', icon: Database },
    { path: '/app/teams', label: 'Teams', icon: Users },
    { path: '/app/races', label: 'Races', icon: Flag },
    { path: '/app/components', label: 'Components', icon: Package },
    { path: '/app/logistics', label: 'Logistics', icon: Truck },
    { path: '/app/expenses', label: 'Expenses', icon: Receipt },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`w-64 bg-[#0a0a0a] border-r border-border h-full flex flex-col font-sans fixed md:static z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-4">
        <h1 className="text-xl font-bold tracking-tighter text-white flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="ApexGrid" className="h-12 w-auto object-contain" />
          <span className="text-2xl">ApexGrid Inc</span>
        </h1>

        <label className="penumbra-search w-full mb-4">
          <svg
            className="penumbra-search__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
          <input
            className="penumbra-search__input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd className="penumbra-search__kbd">⌘ K</kbd>
        </label>
      </div>
      
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {filteredMenuItems.length > 0 && <div className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 px-2">Main</div>}
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/app' 
            ? location.pathname === '/app' 
            : location.pathname.startsWith(item.path);
            
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all text-sm ${
                isActive 
                  ? 'bg-surfaceHighlight text-white font-medium border border-border shadow-sm' 
                  : 'text-textSecondary hover:text-white hover:bg-surface/50 border border-transparent'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-accent' : 'text-textSecondary'} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {!searchQuery && (
        <div className="mt-8">
            <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Workgroups</span>
                <span className="text-textSecondary text-xs flex gap-2">
                    <SearchIcon size={14} className="hover:text-white cursor-pointer"/>
                    <span className="hover:text-white cursor-pointer">+</span>
                </span>
            </div>
            
            <div className="space-y-1">
                <div className="flex items-center space-x-2 px-3 py-1.5 text-sm text-white cursor-pointer rounded-lg hover:bg-surfaceHighlight transition-colors">
                    <Folder size={14} className="text-accent" />
                    <span>All Work</span>
                </div>
                <div className="ml-4 border-l border-border pl-2 space-y-1 my-1">
                    <div className="flex items-center space-x-2 px-2 py-1 text-sm text-textSecondary hover:text-white cursor-pointer transition-colors">
                        <Folder size={14} />
                        <span>Car Development</span>
                    </div>
                    <div className="ml-4 space-y-1">
                        <div className="flex items-center space-x-2 px-2 py-1 text-sm text-textSecondary hover:text-white cursor-pointer transition-colors">
                            <FileText size={14} />
                            <span>Aero Package v2</span>
                        </div>
                        <div className="flex items-center space-x-2 px-2 py-1 text-sm text-textSecondary hover:text-white cursor-pointer transition-colors">
                            <FileText size={14} />
                            <span>Chassis Specs</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 text-sm text-textSecondary cursor-pointer rounded-lg hover:bg-surfaceHighlight hover:text-white transition-colors">
                    <Folder size={14} className="text-blue-400" />
                    <span>R&D Research</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 text-sm text-textSecondary cursor-pointer rounded-lg hover:bg-surfaceHighlight hover:text-white transition-colors">
                    <Folder size={14} className="text-green-400" />
                    <span>Sponsorships</span>
                </div>
            </div>
        </div>
        )}
        
        {filteredMenuItems.length === 0 && (
          <div className="text-center py-8 text-textSecondary text-sm">
            No results found for "{searchQuery}"
          </div>
        )}
      </nav>
      
      <div className="p-4 mt-auto">
        <Link to="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-textSecondary hover:text-white hover:bg-surfaceHighlight transition-all border border-transparent hover:border-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
