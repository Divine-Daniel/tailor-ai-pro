import React from 'react';
import { 
  LayoutDashboard, Users, User, Camera, Ruler, Box, 
  Scissors, Lightbulb, Bell, Settings, LifeBuoy, LogOut,
  ShieldCheck, Activity, Key, Server, Database, FileText, BarChart3, Hammer,
  History, Layout, X, Sparkles
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onLogout, isOpen, onClose }) => {
  const getNavItems = () => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'metrics', label: 'System Metrics', icon: Activity },
          { id: 'admins', label: 'Admins', icon: ShieldCheck },
          { id: 'tailors', label: 'Tailors', icon: Scissors },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'activity', label: 'Activity Logs', icon: FileText },
          { id: 'security', label: 'Security & Sessions', icon: Key },
          { id: 'ai-oversight', label: 'AI Oversight', icon: Lightbulb },
          { id: 'infrastructure', label: 'Storage & Infrastructure', icon: Database },
          { id: 'cms', label: 'CMS (Landing)', icon: Layout },
          { id: 'ai-studio', label: 'AI Studio', icon: Sparkles },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'settings', label: 'Global Settings', icon: Settings },
        ];
      case UserRole.ADMIN:
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'tailors', label: 'Tailors', icon: Scissors },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'measurements', label: 'Measurements', icon: Ruler },
          { id: 'storage', label: 'Uploads & Storage', icon: Server },
          { id: 'ai-logs', label: 'AI Logs', icon: FileText },
          { id: 'cms', label: 'CMS (Landing)', icon: Layout },
          { id: 'ai-studio', label: 'AI Studio', icon: Sparkles },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'settings', label: 'Admin Settings', icon: Settings },
        ];
      case UserRole.TAILOR:
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'upload', label: 'Upload Photo', icon: Camera },
          { id: 'ai-studio', label: 'AI Studio', icon: Sparkles },
          { id: 'measurements', label: 'Measurements', icon: Ruler },
          { id: 'preview', label: '3D Preview', icon: Box },
          { id: 'estimator', label: 'Fabric Estimator', icon: Hammer },
          { id: 'advice', label: 'Style Advice', icon: Lightbulb },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case UserRole.CLIENT:
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'measurements', label: 'My Measurements', icon: Ruler },
          { id: 'history', label: 'Measurement History', icon: History },
          { id: 'preview', label: '3D Body Preview', icon: Box },
          { id: 'orders', label: 'My Orders', icon: Scissors },
          { id: 'style', label: 'Style Recommendations', icon: Lightbulb },
          { id: 'fabric', label: 'Fabric Suggestions', icon: Hammer },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'profile', label: 'Profile Settings', icon: User },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/90 backdrop-blur-2xl border-r border-slate-800 flex flex-col h-screen transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">TailorAI</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-widest">{role.replace('_', ' ')}</p>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <button
            onClick={() => handleNavClick('help')}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all group"
          >
            <LifeBuoy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-sm tracking-tight">Help & Support</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm tracking-tight">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;