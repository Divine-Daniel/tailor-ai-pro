
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { UserRole } from '../types';
import { 
  BarChart3, Users, Scissors, ShieldCheck, Ruler, 
  Database, Activity, Clock, Plus, Search, Download, MoreHorizontal,
  Box, Lightbulb, Hammer, AlertCircle, Upload, Key, 
  ShieldAlert, Settings, Bell, User, History, ShoppingBag,
  Shield, Zap, ChevronRight, ArrowRightLeft, Server, FileText,
  LifeBuoy, BookOpen, Menu, Layout, Trash2, Edit2, Check, ExternalLink,
  ChevronLeft, Lock, Sparkles, Video, ImageIcon, Send, Loader2, X
} from 'lucide-react';
import { generateFashionImage, generateFashionVideo, analyzeVisualData } from '../services/geminiService';

interface DashboardProps {
  role: UserRole;
  onLogout: () => void;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-800/50 rounded-xl ${className}`} />
);

const Dashboard: React.FC<DashboardProps> = ({ role, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  // CMS State management
  const [cmsSections, setCmsSections] = useState([
    { id: 1, title: 'Hero Section', active: true, desc: 'Primary landing section' },
    { id: 2, title: 'Problem Awareness', active: true, desc: 'Explains the manual measure pain' },
    { id: 3, title: 'Solution Pitch', active: true, desc: 'AI introduction' },
    { id: 4, title: 'Features Grid', active: true, desc: 'Core value propositions' },
  ]);
  const [currentEditingSection, setCurrentEditingSection] = useState<any>(null);

  // Simulate global data fetching
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleToggleCMS = (id: number) => {
    setCmsSections(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleDeleteCMS = (id: number) => {
    if (confirm("Are you sure you want to purge this section from the architecture?")) {
      setCmsSections(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleEditCMS = (section: any) => {
    setCurrentEditingSection(section);
    setActiveTab('cms-edit');
  };

  const handleSaveCMS = (updated: any) => {
    setCmsSections(prev => prev.map(s => s.id === updated.id ? updated : s));
    setActiveTab('cms');
  };

  const handleAddCMS = (newSection: any) => {
    setCmsSections(prev => [...prev, { ...newSection, id: Date.now(), active: true }]);
    setActiveTab('cms');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <Skeleton className="lg:col-span-2 h-[500px]" />
            <Skeleton className="h-[500px]" />
          </div>
        </div>
      );
    }

    switch (activeTab) {
      // Shared Pages
      case 'overview': return <Overview role={role} />;
      case 'settings': case 'profile': return <SettingsSection role={role} />;
      case 'notifications': return <NotificationsView onSelect={() => setActiveTab('notification-detail')} />;
      case 'help': return <HelpSupport onLiveBridge={() => setActiveTab('live-bridge')} onDoc={() => setActiveTab('documentation')} onRequestFeature={() => setIsFeatureModalOpen(true)} />;
      case 'live-bridge': return <LiveBridgeView onBack={() => setActiveTab('help')} />;
      case 'documentation': return <DocView onBack={() => setActiveTab('help')} />;
      case 'notification-detail': return <NotificationDetail onBack={() => setActiveTab('notifications')} />;
      case 'ai-studio': return <AIStudio />;

      // Tailor & Admin Shared
      case 'clients': return <ClientsList onRegister={() => setActiveTab('client-register')} />;
      case 'client-register': return <ClientRegister onBack={() => setActiveTab('clients')} />;
      case 'measurements': return <MeasurementsTable role={role} onViewHistory={() => setActiveTab('history')} onExport={() => setActiveTab('pdf-viewer')} />;
      
      // Tailor Specific
      case 'upload': return <UploadSection />;
      case 'preview': return <ThreeDPreview />;
      case 'estimator': return <FabricEstimator />;
      case 'advice': case 'style': return <StyleAdvice />;

      // Admin Specific
      case 'storage': return <StorageMonitoring />;
      case 'ai-logs': return <AILogsView />;
      case 'reports': return <ReportsView />;
      case 'cms': return <CMSPage sections={cmsSections} onToggle={handleToggleCMS} onDelete={handleDeleteCMS} onEdit={handleEditCMS} onAddNew={() => setActiveTab('cms-add')} />;
      case 'cms-add': return <CMSAddPage onBack={() => setActiveTab('cms')} onAdd={handleAddCMS} />;
      case 'cms-edit': return <CMSEditPage section={currentEditingSection} onBack={() => setActiveTab('cms')} onSave={handleSaveCMS} />;
      case 'audit-report': return <ReportsView />;
      case 'modules-store': return <StyleAdvice />;
      case 'pdf-viewer': return <PDFViewer onBack={() => setActiveTab('measurements')} />;

      // Super Admin Specific
      case 'metrics': return <SystemMetrics />;
      case 'admins': return <AdminsList onInvite={() => setActiveTab('invite-admin')} onRevoke={() => setActiveTab('revoke-confirm')} onSettings={() => setActiveTab('admin-settings')} />;
      case 'invite-admin': return <InviteAdmin onBack={() => setActiveTab('admins')} />;
      case 'admin-settings': return <AdminSettings onBack={() => setActiveTab('admins')} />;
      case 'revoke-confirm': return <RevokeConfirm onBack={() => setActiveTab('admins')} />;
      case 'tailors': return <TailorMonitoring onMonitor={() => setActiveTab('tailor-feed')} />;
      case 'tailor-feed': return <TailorFeed onBack={() => setActiveTab('tailors')} />;
      case 'activity': return <ActivityLog />;
      case 'security': return <SecurityPortal />;
      case 'ai-oversight': return <AIOversight onInspect={() => setActiveTab('weight-inspector')} onDeploy={() => setActiveTab('deployment-manager')} />;
      case 'weight-inspector': return <WeightInspector onBack={() => setActiveTab('ai-oversight')} />;
      case 'deployment-manager': return <DeploymentManager onBack={() => setActiveTab('ai-oversight')} />;
      case 'infrastructure': return <InfrastructureView />;

      // Client Specific
      case 'history': return <MeasurementHistory />;
      case 'orders': return <OrdersView />;
      case 'fabric': return <FabricSuggestions />;

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full py-20 text-slate-500">
            <AlertCircle className="w-20 h-20 mb-6 opacity-10" />
            <h2 className="text-2xl font-black text-slate-300">Module Calibrating</h2>
            <p className="max-w-xs text-center mt-2">The "{activeTab}" neural link is being established for your current role authority.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950/20 backdrop-blur-sm">
      <Sidebar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <main className="flex-1 overflow-y-auto relative min-w-0">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-3 bg-slate-900/60 border border-white/5 rounded-2xl text-slate-400">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <div className="flex items-center space-x-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                  <Shield className="w-3 h-3" />
                  <span>Neural Link Active</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white capitalize tracking-tighter">{activeTab.replace('-', ' ')}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative group hidden sm:block flex-1 md:flex-initial">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  className="bg-slate-900/40 border border-white/5 rounded-2xl pl-11 pr-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-64 backdrop-blur-2xl transition-all"
                />
              </div>
              <button onClick={() => setActiveTab('notifications')} className="p-3.5 bg-slate-900/60 border border-white/5 rounded-2xl relative hover:bg-slate-800 transition-all active:scale-95">
                 <Bell className="w-5 h-5 text-slate-400" />
                 <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-slate-900"></span>
              </button>
              <div onClick={() => setActiveTab('profile')} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center font-black text-white border border-blue-400/20 shadow-2xl cursor-pointer hover:scale-105 transition-transform">
                {role[0]}
              </div>
            </div>
          </header>
          {renderContent()}
        </div>
      </main>

      {/* Feature Request Modal */}
      {isFeatureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black tracking-tighter uppercase text-white">Request New Feature</h3>
              <button onClick={() => setIsFeatureModalOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Subject</label>
                <input type="text" className="w-full bg-slate-800 border border-white/5 p-4 rounded-xl outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. AR Virtual Fitting" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
                <textarea className="w-full bg-slate-800 border border-white/5 p-4 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 h-32" placeholder="Tell us what you need..." />
              </div>
              <button onClick={() => setIsFeatureModalOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Submit Feedback</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- SHARED COMPONENTS --- */

const Overview: React.FC<{ role: UserRole }> = ({ role }) => {
  const isTailorOrClient = role === UserRole.TAILOR || role === UserRole.CLIENT;
  
  const stats = isTailorOrClient ? [
    { label: 'Total Clients', value: '48', change: '+3', icon: Users, color: 'text-blue-400' },
    { label: 'Recent Scans', value: '12', change: 'Optimal', icon: Activity, color: 'text-indigo-400' },
    { label: 'Active Projects', value: '7', change: 'Live', icon: Scissors, color: 'text-emerald-400' },
    { label: 'Storage Used', value: '1.2GB', change: '8%', icon: Database, color: 'text-amber-400' },
  ] : [
    { label: 'Platform Load', value: 'Low', change: 'Stable', icon: Activity, color: 'text-emerald-400' },
    { label: 'Active Sessions', value: '1,204', change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: 'AI Accuracy', value: '99.9%', change: 'Optimal', icon: Ruler, color: 'text-indigo-400' },
    { label: 'Infrastructure', value: 'Online', change: '100%', icon: Database, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-3xl p-6 md:p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all group shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-slate-800/80 ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/5">
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-3xl md:text-4xl font-black mt-2 text-white tracking-tighter">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-3xl p-6 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center mb-12">
            <h3 className="font-black text-xl md:text-2xl tracking-tighter uppercase">Recent Client Activity</h3>
            <button className="px-5 py-2.5 bg-slate-800/80 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Audit Logs</button>
          </div>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 md:space-x-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors shadow-inner flex-shrink-0">
                  <User className="w-6 h-6 md:w-8 md:h-8 text-slate-500 group-hover:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-lg text-slate-200 tracking-tight truncate">Sarah Jenkins Profile Updated</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">2m AGO • RECONSTRUCTION V2.0</p>
                </div>
                <div className="hidden sm:block text-right">
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Success</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-10">
          {!isTailorOrClient && (
            <div className="bg-slate-900/40 backdrop-blur-3xl p-6 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl">
              <h3 className="font-black text-xl md:text-2xl mb-10 tracking-tighter uppercase">AI Core Health</h3>
              <div className="space-y-10">
                <HealthItem label="Inference Engine" status="Optimal" level={98} color="emerald" />
                <HealthItem label="Storage Gateway" status="Healthy" level={72} color="blue" />
                <HealthItem label="Auth Layer" status="Secure" level={100} color="emerald" />
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-500/20 relative overflow-hidden group cursor-pointer">
             <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:scale-125 transition-transform duration-1000">
               <Zap className="w-48 h-48" />
             </div>
             <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tighter uppercase">Pro Upgrade</h4>
                <p className="text-blue-100 text-sm leading-relaxed font-bold">Enhance your patterns with 3D kinematic fitting simulations for premium bespoke projects.</p>
                <button className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">Explore Modules</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsSection: React.FC<{ role: UserRole }> = ({ role }) => (
  <div className="max-w-4xl mx-auto py-10">
    <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
      <h3 className="text-4xl font-black tracking-tighter uppercase mb-10">Account Parameters</h3>
      <div className="space-y-10">
        <div className="flex items-center justify-between p-6 bg-slate-800/40 rounded-2xl border border-white/5">
          <div>
            <p className="text-white font-bold text-lg">Identity Credentials</p>
            <p className="text-sm text-slate-500">Manage your neural authentication keys</p>
          </div>
          <button className="px-6 py-2.5 bg-blue-600 rounded-xl text-[10px] font-black uppercase text-white hover:bg-blue-500 transition-colors">Update</button>
        </div>
        <div className="flex items-center justify-between p-6 bg-slate-800/40 rounded-2xl border border-white/5">
          <div>
            <p className="text-white font-bold text-lg">Privacy Layers</p>
            <p className="text-sm text-slate-500">Enable biometric data obfuscation</p>
          </div>
          <button className="w-12 h-6 bg-blue-600 rounded-full relative">
            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
          </button>
        </div>
        <div className="pt-6 border-t border-white/5">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Role Authority</p>
           <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 border border-white/5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase">{role.replace('_', ' ')}</span>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const NotificationsView: React.FC<{ onSelect: () => void }> = ({ onSelect }) => (
  <div className="max-w-4xl mx-auto py-10">
    <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Intelligence Feed</h3>
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            onClick={onSelect} 
            className="flex items-center justify-between p-6 bg-slate-800/40 rounded-2xl border border-white/5 group hover:border-blue-500/20 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">System Calibration Event #{i}</p>
                <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">OCT {14+i}, 2024 • BIOMETRICS VERIFIED</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-all" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HealthItem: React.FC<{ label: string, status: string, level: number, color: string }> = ({ label, status, level, color }) => (
  <div className="group">
    <div className="flex justify-between text-[10px] mb-4 font-black uppercase tracking-[0.2em]">
      <span className="text-slate-500">{label}</span>
      <span className={`text-${color}-400`}>{status}</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
      <div className={`h-full bg-${color}-500 transition-all duration-1000 group-hover:brightness-125`} style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

/* --- CMS PAGES --- */

const CMSPage: React.FC<{ 
  sections: any[], 
  onToggle: (id: number) => void, 
  onDelete: (id: number) => void, 
  onEdit: (section: any) => void,
  onAddNew: () => void
}> = ({ sections, onToggle, onDelete, onEdit, onAddNew }) => {
  return (
    <div className="space-y-10">
      <div className="bg-slate-900/40 p-6 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-black tracking-tighter uppercase">Landing Architecture</h3>
          <button 
            onClick={onAddNew}
            className="px-6 py-3 bg-blue-600 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Section
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map(s => (
            <div key={s.id} className="p-8 bg-slate-800/40 border border-white/5 rounded-3xl flex justify-between items-start group hover:border-blue-500/20 transition-all shadow-inner">
              <div>
                <h4 className="text-xl font-black mb-2">{s.title}</h4>
                <p className="text-slate-500 text-sm font-medium mb-6">{s.desc}</p>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => onEdit(s)}
                    className="p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => onDelete(s.id)}
                    className="p-3 bg-red-500/10 rounded-xl text-red-500/60 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => onToggle(s.id)}
                className={`w-12 h-6 rounded-full relative transition-colors ${s.active ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${s.active ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CMSAddPage: React.FC<{ onBack: () => void, onAdd: (section: any) => void }> = ({ onBack, onAdd }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
          <ChevronLeft className="w-4 h-4 mr-2" /> Cancel
        </button>
        <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Create Neural Section</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Section Title</label>
            <input 
              type="text" 
              className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50" 
              placeholder="e.g. Testimonials Section"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description Meta</label>
            <textarea 
              className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 h-32" 
              placeholder="Internal descriptor..."
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <button 
            onClick={() => onAdd({ title, desc })}
            className="w-full py-5 bg-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 mt-10 active:scale-95"
          >
            Initialize Section
          </button>
        </div>
      </div>
    </div>
  );
};

const CMSEditPage: React.FC<{ section: any, onBack: () => void, onSave: (section: any) => void }> = ({ section, onBack, onSave }) => {
  const [title, setTitle] = useState(section?.title || '');
  const [desc, setDesc] = useState(section?.desc || '');

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
          <ChevronLeft className="w-4 h-4 mr-2" /> Discard Changes
        </button>
        <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Reconfigure Section</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Section Title</label>
            <input 
              type="text" 
              className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50" 
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description Meta</label>
            <textarea 
              className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 h-32" 
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <button 
            onClick={() => onSave({ ...section, title, desc })}
            className="w-full py-5 bg-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 mt-10 active:scale-95"
          >
            Commit Modifications
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- TAILOR VIEWS --- */

const UploadSection: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-20">
      <div className="bg-slate-900/40 backdrop-blur-3xl p-16 rounded-[4rem] border-4 border-dashed border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer shadow-2xl relative">
        <div className="relative z-10 text-center">
          {isProcessing ? (
            <div className="flex flex-col items-center">
               <Activity className="w-24 h-24 text-blue-500 animate-pulse mb-8" />
               <h2 className="text-4xl font-black mb-6 text-white tracking-tighter uppercase">Analyzing Anatomy...</h2>
               <div className="w-full max-w-sm h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]" />
               </div>
            </div>
          ) : (
            <>
              <div className="w-32 h-32 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform shadow-inner group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-6">
                <Upload className="w-12 h-12 text-blue-500 group-hover:text-white" />
              </div>
              <h2 className="text-5xl font-black mb-6 text-white tracking-tighter uppercase">Neural Body Scan</h2>
              <p className="text-slate-500 text-xl mb-12 max-w-md mx-auto font-medium leading-relaxed">Drop your client's front and side photos here. Our AI will reconstruct a 3D anatomical map instantly.</p>
              <button 
                onClick={handleUpload}
                className="px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-xl cursor-pointer transition-all shadow-2xl shadow-blue-500/40 inline-flex items-center space-x-4 active:scale-95"
              >
                <Scissors className="w-6 h-6" />
                <span>Begin Reconstruction</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MeasurementsTable: React.FC<{ role: UserRole, onViewHistory?: () => void, onExport?: () => void }> = ({ role, onViewHistory, onExport }) => (
  <div className="space-y-10">
    <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
      <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-3xl font-black tracking-tighter uppercase">AI Extraction Matrix</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Live calibration based on latest session</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {onViewHistory && (
            <button 
              onClick={onViewHistory}
              className="px-6 py-3 bg-slate-800/80 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center hover:bg-slate-700 transition-all active:scale-95"
            >
              <History className="w-4 h-4 mr-3" /> History
            </button>
          )}
          <button onClick={onExport} className="px-6 py-3 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 active:scale-95 flex items-center">
            <Download className="w-4 h-4 mr-3" /> Workshop PDF
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
        {[
          { label: 'Chest Circumference', val: '102.4 cm', score: 99.8, icon: Activity }, 
          { label: 'Waist Alignment', val: '86.1 cm', score: 99.5, icon: Ruler },
          { label: 'Hip Volumetric', val: '98.5 cm', score: 99.9, icon: Database }, 
          { label: 'Inside Leg', val: '81.2 cm', score: 99.7, icon: Scissors },
          { label: 'Bi-Acromial', val: '46.7 cm', score: 99.4, icon: Ruler }, 
          { label: 'Sleeve Length', val: '64.1 cm', score: 99.6, icon: Scissors },
          { label: 'Neck Circumference', val: '41.2 cm', score: 99.9, icon: Activity }, 
          { label: 'Vertical Torso', val: '72.5 cm', score: 99.2, icon: Ruler },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-white/5 group hover:border-blue-500/20 transition-all hover:-translate-y-1 shadow-inner">
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-slate-700/50 rounded-xl text-slate-500 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                  <item.icon className="w-5 h-5" />
               </div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.score}%</span>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2 truncate">{item.label}</p>
            <p className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tighter">{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ThreeDPreview: React.FC = () => (
  <div className="aspect-video bg-slate-900 rounded-[4rem] border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl group min-h-[400px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)]"></div>
    <div className="text-center z-10 space-y-8 group-hover:scale-105 transition-transform duration-1000">
      <div className="relative">
         <Box className="w-32 md:w-56 h-32 md:h-56 text-slate-800 mx-auto animate-pulse" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600/10 blur-3xl"></div>
      </div>
      <div>
         <p className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase">Spatial Mesh Generation</p>
         <p className="text-[10px] text-slate-500 mt-3 font-mono uppercase tracking-[0.3em] px-4">Processing vertex density: 1.2M points/cm²</p>
      </div>
    </div>
    <div className="absolute top-6 left-6 md:top-12 md:left-12 flex flex-col space-y-4">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95">Orbit</button>
      <button className="px-6 py-3 bg-slate-800/80 backdrop-blur-xl text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 active:scale-95">Skeletal</button>
    </div>
  </div>
);

const FabricEstimator: React.FC = () => (
  <div className="bg-slate-900/40 p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
    <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter">Material Intelligence</h3>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Garment Archetype</label>
          <select className="w-full bg-slate-800 border border-white/5 p-4 rounded-xl outline-none text-white font-bold">
            <option>Standard Two-Piece</option>
            <option>Italian Peak Tuxedo</option>
            <option>Heavy Overcoat</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Bolt Width (cm)</label>
          <select className="w-full bg-slate-800 border border-white/5 p-4 rounded-xl outline-none text-white font-bold">
            <option>150cm (Standard)</option>
            <option>140cm (Luxury Silk)</option>
          </select>
        </div>
        <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
          Generate Estimate
        </button>
      </div>
      <div className="bg-slate-800/40 rounded-[2rem] p-8 border border-white/5 flex flex-col items-center justify-center text-center">
        <Hammer className="w-12 h-12 text-blue-400 mb-6" />
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Calculated Yield</p>
        <p className="text-6xl font-black text-white tracking-tighter">3.85<span className="text-2xl ml-2 text-blue-500">m</span></p>
        <p className="text-slate-500 text-xs mt-6 font-medium">Confidence: 98.4% based on 3D reconstruction volume.</p>
      </div>
    </div>
  </div>
);

const StyleAdvice: React.FC = () => (
  <div className="space-y-12">
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 text-white/10"><Lightbulb className="w-48 h-48" /></div>
      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Neural Stylist Agent</h3>
        <p className="text-blue-100 text-lg max-w-xl font-medium leading-relaxed">Based on your anatomical silhouette, we recommend structured shoulders and a tapered waist line to optimize visual symmetry.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { title: "Lapel Index", d: "Opt for 9.5cm peak lapels to balance broad chest measurements." },
        { title: "Trouser Taper", d: "Recommended 17.5cm opening based on calf volume detection." },
        { title: "Seam Placement", d: "Shift shoulder seams 0.5cm forward for anatomical posture correction." }
      ].map((s, i) => (
        <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-xl hover:border-blue-500/20 transition-all group">
          <Zap className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
          <h4 className="text-xl font-black mb-4 uppercase tracking-tight">{s.title}</h4>
          <p className="text-slate-500 font-medium leading-relaxed">{s.d}</p>
        </div>
      ))}
    </div>
  </div>
);

/* --- ADMIN VIEWS --- */

const StorageMonitoring: React.FC = () => (
  <div className="space-y-12">
    <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
       <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Neural Storage Fabric</h3>
       <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          <div className="h-full bg-blue-500 w-[60%] border-r border-slate-900"></div>
          <div className="h-full bg-emerald-500 w-[25%] border-r border-slate-900"></div>
          <div className="h-full bg-purple-500 w-[15%]"></div>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <div className="space-y-2"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Photometry</p><p className="text-2xl font-black">6.2 TB</p></div>
          <div className="space-y-2"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Meshes</p><p className="text-2xl font-black">1.4 TB</p></div>
          <div className="space-y-2"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Patterns</p><p className="text-2xl font-black">0.8 TB</p></div>
          <div className="space-y-2"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Health</p><p className="text-2xl font-black text-emerald-400">99%</p></div>
       </div>
    </div>
  </div>
);

const AILogsView: React.FC = () => (
  <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
    <div className="p-10 border-b border-white/5 bg-slate-900/20"><h3 className="text-2xl font-black tracking-tighter uppercase">Inference Stream</h3></div>
    <div className="p-10 font-mono text-[10px] space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
       {Array.from({ length: 20 }).map((_, i) => (
         <div key={i} className="text-slate-400 flex items-start space-x-4 border-l-2 border-blue-500/40 pl-6">
            <span className="text-slate-600 whitespace-nowrap">[2024-10-15 14:22:{10+i}]</span> 
            <span className="text-emerald-500 font-bold uppercase">OK</span>
            <span className="text-slate-300">Proc: spatial_recon_v3 | Load: 0.42 | Session: #99{i}x2</span>
         </div>
       ))}
    </div>
  </div>
);

const ReportsView: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {[1, 2, 3].map(i => (
       <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl group hover:border-blue-500/30 transition-all">
          <FileText className="w-12 h-12 text-slate-600 mb-8 group-hover:text-blue-500 transition-colors" />
          <h4 className="text-xl font-black tracking-tighter uppercase mb-2">Ops Report Q{i}_24</h4>
          <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-10">Neural Velocity: 99.2%</p>
          <button className="w-full py-4 bg-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" /> Download
          </button>
       </div>
     ))}
  </div>
);

/* --- FUNCTIONAL PAGES & MODALS --- */

const AIStudio: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'image' | 'video' | 'analysis'>('image');
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('');

  const ensureApiKey = async () => {
    if (!(await (window as any).aistudio.hasSelectedApiKey())) {
      await (window as any).aistudio.openSelectKey();
    }
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      await ensureApiKey();
      const url = await generateFashionImage(prompt, size);
      setResult(url);
    } catch (e) {
      console.error(e);
      alert("Generation failed. Please ensure you have a valid API key selected.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    try {
      await ensureApiKey();
      const url = await generateFashionVideo(prompt, aspectRatio, uploadedFile || undefined);
      setResult(url);
    } catch (e) {
      console.error(e);
      alert("Requested entity was not found. Please re-select your API key.");
      await (window as any).aistudio.openSelectKey();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsGenerating(true);
    try {
      const text = await analyzeVisualData(uploadedFile, mimeType, prompt || "Analyze this fashion item for construction details.");
      setResult(text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => setUploadedFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
        {[
          { id: 'image', icon: ImageIcon, label: 'Design Generation' },
          { id: 'video', icon: Video, label: 'Video Animation' },
          { id: 'analysis', icon: Search, label: 'Neural Analysis' }
        ].map(tool => (
          <button 
            key={tool.id} 
            onClick={() => { setActiveTool(tool.id as any); setResult(null); }}
            className={`px-8 py-4 rounded-2xl flex items-center space-x-3 font-black uppercase text-xs tracking-widest transition-all whitespace-nowrap ${activeTool === tool.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-slate-900/40 text-slate-500 border border-white/5 hover:border-white/20'}`}
          >
            <tool.icon className="w-5 h-5" />
            <span>{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-slate-900/40 p-10 rounded-[3.5rem] border border-white/5 shadow-2xl h-fit">
          <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Parameters</h3>
          <div className="space-y-8">
            {activeTool !== 'analysis' && (
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Aesthetic Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-slate-800 border border-white/5 p-4 rounded-2xl outline-none focus:ring-1 focus:ring-blue-500 h-32 font-medium" 
                  placeholder="Describe the fashion design or movement..." 
                />
              </div>
            )}

            {activeTool === 'image' && (
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Precision Resolution</label>
                <div className="flex space-x-4">
                  {['1K', '2K', '4K'].map(s => (
                    <button key={s} onClick={() => setSize(s as any)} className={`px-6 py-2 rounded-xl text-xs font-black border transition-all ${size === s ? 'border-blue-500 text-blue-400 bg-blue-600/10' : 'border-white/5 text-slate-500'}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {activeTool === 'video' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Frame Geometry</label>
                  <div className="flex space-x-4">
                    {['16:9', '9:16'].map(r => (
                      <button key={r} onClick={() => setAspectRatio(r as any)} className={`px-6 py-2 rounded-xl text-xs font-black border transition-all ${aspectRatio === r ? 'border-blue-500 text-blue-400 bg-blue-600/10' : 'border-white/5 text-slate-500'}`}>{r}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Reference Frame (Optional)</label>
                  <input type="file" onChange={onFileChange} className="w-full text-xs text-slate-500" />
                </div>
              </>
            )}

            {activeTool === 'analysis' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Analysis Target</label>
                  <input type="file" onChange={onFileChange} className="w-full text-xs text-slate-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Neural Query</label>
                  <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-slate-800 border border-white/5 p-4 rounded-2xl outline-none"
                    placeholder="e.g. Extract stitching pattern detail..."
                  />
                </div>
              </>
            )}

            <button 
              disabled={isGenerating}
              onClick={activeTool === 'image' ? handleGenerateImage : activeTool === 'video' ? handleGenerateVideo : handleAnalyze}
              className="w-full py-5 bg-blue-600 rounded-3xl font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-500/30 flex items-center justify-center space-x-3 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
              <span>{isGenerating ? 'Neural Processing...' : `Execute ${activeTool.toUpperCase()}`}</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-white/5 opacity-50" />
          {result ? (
            activeTool === 'analysis' ? (
              <div className="p-10 z-10 w-full h-full overflow-y-auto custom-scrollbar">
                 <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">{result}</p>
              </div>
            ) : activeTool === 'video' ? (
              <video src={result} controls className="z-10 w-full h-full object-contain" />
            ) : (
              <img src={result} className="z-10 w-full h-full object-contain" />
            )
          ) : (
            <div className="text-center z-10">
               <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Zap className="w-10 h-10 text-slate-600" />
               </div>
               <p className="text-slate-600 font-black uppercase text-xs tracking-widest">Awaiting Neural Link</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* --- SHARED COMPONENTS --- */

const ClientsList: React.FC<{ onRegister: () => void }> = ({ onRegister }) => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <h3 className="text-3xl font-black tracking-tighter uppercase">Client Directory</h3>
      <button onClick={onRegister} className="px-6 py-3 bg-blue-600 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 flex items-center space-x-2">
        <Plus className="w-4 h-4" /> <span>Register New Identity</span>
      </button>
    </div>
    <div className="grid gap-4">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="bg-slate-900/40 p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-blue-500/20 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-blue-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">Identity #TX-{i}04</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Last Calibrated: 2 days ago</p>
            </div>
          </div>
          <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
            <button className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-all lg:hidden" />
        </div>
      ))}
    </div>
  </div>
);

const AdminsList: React.FC<{ onInvite: () => void, onRevoke: () => void, onSettings: () => void }> = ({ onInvite, onRevoke, onSettings }) => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <h3 className="text-3xl font-black tracking-tighter uppercase">Operator Management</h3>
      <button onClick={onInvite} className="px-6 py-3 bg-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest text-white">Invite Admin</button>
    </div>
    <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden">
       {[1, 2, 3].map(i => (
         <div key={i} className="p-8 border-b border-white/5 flex items-center justify-between last:border-0 group">
            <div className="flex items-center space-x-6">
               <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div>
                  <p className="font-bold text-white text-lg">Admin Operator {i}</p>
                  <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Level 2 Authority • Active Now</p>
               </div>
            </div>
            <div className="flex space-x-2">
               <button onClick={onSettings} className="p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
               <button onClick={onRevoke} className="p-3 bg-red-500/10 rounded-xl text-red-500/60 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const TailorMonitoring: React.FC<{ onMonitor: () => void }> = ({ onMonitor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl group hover:border-blue-500/30 transition-all">
        <div className="flex justify-between items-start mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-all">
            <Scissors className="w-8 h-8" />
          </div>
          <div className="flex items-center space-x-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Link</span>
          </div>
        </div>
        <h4 className="text-2xl font-black tracking-tighter uppercase mb-2 text-white">Atelier Node {i}</h4>
        <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-10">Paris HQ • Unit 0{i}</p>
        <button onClick={onMonitor} className="w-full py-4 bg-blue-600/10 text-blue-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">
          Monitor Live Feed
        </button>
      </div>
    ))}
  </div>
);

const ClientRegister: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto py-10">
    <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
      <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
        <ChevronLeft className="w-4 h-4 mr-2" /> Return to Directory
      </button>
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Identity Registry</h3>
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Registry Label</label>
          <input type="text" className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. Sarah Jenkins" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Hash (Email)</label>
          <input type="email" className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="sarah.j@example.com" />
        </div>
        <button className="w-full py-5 bg-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 mt-10">Initialize Provision</button>
      </div>
    </div>
  </div>
);

const HelpSupport: React.FC<{ onLiveBridge: () => void, onDoc: () => void, onRequestFeature: () => void }> = ({ onLiveBridge, onDoc, onRequestFeature }) => (
  <div className="space-y-12">
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl text-center group">
         <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
           <LifeBuoy className="w-10 h-10" />
         </div>
         <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase">Support Bridge</h3>
         <p className="text-slate-400 font-medium mb-12 leading-relaxed">Connect instantly with our master technicians via encrypted neural audio bridge.</p>
         <button onClick={onLiveBridge} className="w-full py-5 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest active:scale-95 shadow-2xl">Open Live Link</button>
      </div>
      <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl text-center group">
         <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-10 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
           <BookOpen className="w-10 h-10" />
         </div>
         <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase">Knowledge Base</h3>
         <p className="text-slate-400 font-medium mb-12 leading-relaxed">Detailed technical documentation on spatial reconstruction and landmark precision.</p>
         <button onClick={onDoc} className="w-full py-5 bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 active:scale-95">Browse Archives</button>
      </div>
    </div>
    <div className="bg-blue-600/10 p-10 rounded-[3rem] border border-blue-500/20 text-center">
       <p className="text-blue-400 font-black uppercase text-[10px] tracking-widest mb-6">Have an architectural enhancement idea?</p>
       <button onClick={onRequestFeature} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/40 active:scale-95 transition-all">Request New Feature</button>
    </div>
  </div>
);

const LiveBridgeView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="h-[600px] bg-slate-900/40 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl flex flex-col">
    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl">
       <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white font-bold uppercase text-[10px] tracking-widest">
         <ChevronLeft className="w-4 h-4 mr-2" /> Terminate Link
       </button>
       <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-[10px] font-black text-white uppercase tracking-widest">Bridge Active</p>
       </div>
    </div>
    <div className="flex-1 p-10 flex flex-col justify-end items-center">
       <div className="w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center animate-ping">
          <Video className="w-12 h-12 text-blue-400" />
       </div>
       <p className="text-slate-500 mt-10 font-black uppercase text-xs tracking-widest">Establishing high-fidelity stream...</p>
    </div>
  </div>
);

const DocView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-4xl mx-auto py-10">
    <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
      <button onClick={onBack} className="mb-10 flex items-center text-slate-400 hover:text-white font-bold uppercase text-xs tracking-widest">
        <ChevronLeft className="w-4 h-4 mr-2" /> Exit Archives
      </button>
      <h3 className="text-4xl font-black tracking-tighter uppercase mb-10">Neural API Reference</h3>
      <div className="space-y-12">
        <section>
          <h4 className="text-xl font-black text-blue-400 mb-4 uppercase tracking-widest">Spatial Extraction</h4>
          <p className="text-slate-500 leading-relaxed font-medium">Detailed guide on capturing optimal photometry for the Gemini spatial reconstruction pipeline.</p>
        </section>
        <section>
          <h4 className="text-xl font-black text-blue-400 mb-4 uppercase tracking-widest">Landmark Mapping</h4>
          <div className="p-6 bg-slate-950/40 rounded-2xl font-mono text-xs text-slate-400 border border-white/5">
            // Neural Layer Calibration <br/>
            threshold_confidence = 0.9998;
          </div>
        </section>
      </div>
    </div>
  </div>
);

const NotificationDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-4xl mx-auto py-10">
    <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
      <button onClick={onBack} className="mb-10 flex items-center text-slate-400 hover:text-white font-bold uppercase text-xs tracking-widest">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Intelligence Feed
      </button>
      <div className="w-20 h-20 bg-emerald-600/10 rounded-3xl flex items-center justify-center text-emerald-400 mb-8">
        <Check className="w-10 h-10" />
      </div>
      <h3 className="text-4xl font-black tracking-tighter uppercase mb-6">Calibration Confirmed</h3>
      <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
        The biometric reconstruction for Client #TX-9021 passed all anatomical validation layers with a 0.002% margin of error. 
        Pattern drafts are now ready for material estimation.
      </p>
      <button onClick={onBack} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 active:scale-95">Mark as Read</button>
    </div>
  </div>
);

const InviteAdmin: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto py-10">
    <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
      <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
        <ChevronLeft className="w-4 h-4 mr-2" /> Abort Invitation
      </button>
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Provision Operator</h3>
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operator Email</label>
          <input type="email" className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none" placeholder="admin@tailor.ai" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Protocol</label>
          <select className="w-full bg-slate-800/60 border border-white/5 p-4 rounded-xl outline-none text-white">
            <option>Standard Operations (L1)</option>
            <option>AI Oversight (L2)</option>
            <option>Infrastructure Ownership (L3)</option>
          </select>
        </div>
        <button className="w-full py-5 bg-emerald-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 mt-10">Dispatch Invite Token</button>
      </div>
    </div>
  </div>
);

const AdminSettings: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-2xl mx-auto py-10">
     <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-white font-black uppercase text-xs tracking-widest">
           <ChevronLeft className="w-4 h-4 mr-2" /> Cancel Changes
        </button>
        <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Operator Prefs</h3>
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <div><p className="font-bold text-white">Neural Speed Up</p><p className="text-xs text-slate-500">Accelerate parsing via H100 boost</p></div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative"><div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"/></button>
           </div>
           <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div><p className="font-bold text-white">Privacy Shield</p><p className="text-xs text-slate-500">Anonymize clientimetry logs</p></div>
              <button className="w-12 h-6 bg-slate-700 rounded-full relative"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"/></button>
           </div>
        </div>
     </div>
  </div>
);

const RevokeConfirm: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-xl mx-auto py-20 text-center">
     <div className="bg-red-500/5 p-16 rounded-[4rem] border-4 border-dashed border-red-500/20 shadow-2xl">
        <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-10" />
        <h3 className="text-4xl font-black tracking-tighter uppercase text-white mb-6">Terminate Authority</h3>
        <p className="text-slate-500 font-medium mb-12">Immutable Action: Revoking access will purge all active neural sessions and invalidate invitation keys associated with this identity.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button onClick={onBack} className="px-10 py-4 bg-slate-800 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-700 transition-all">Abort Action</button>
           <button className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-red-500/40 hover:bg-red-500 transition-all">Confirm Purge</button>
        </div>
     </div>
  </div>
);

const WeightInspector: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="space-y-10">
    <div className="bg-slate-900/40 p-12 rounded-[3rem] border border-white/5 shadow-2xl">
      <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-white font-bold uppercase text-xs tracking-widest">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Oversight
      </button>
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Tensor Analysis</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-40 bg-slate-800/60 rounded-2xl border border-white/5 flex flex-col items-center justify-end p-4">
            <div className="w-full bg-blue-500/40 rounded-t-lg" style={{ height: `${Math.random() * 80 + 20}%` }} />
            <p className="text-[10px] font-black mt-4 text-slate-500 uppercase">Layer {i+1}</p>
          </div>
        ))}
      </div>
      <p className="text-slate-400 font-medium leading-relaxed">Neural weights are perfectly distributed for volumetric reconstruction. Convergence detected at epoch 421.</p>
    </div>
  </div>
);

const DeploymentManager: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-4xl mx-auto py-10">
    <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
      <button onClick={onBack} className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
        <ChevronLeft className="w-4 h-4 mr-2" /> Cancel Push
      </button>
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">Fleet Rollout: Stable V3.3</h3>
      <div className="space-y-8">
        <div className="flex items-center space-x-6 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
           <Check className="w-10 h-10 text-emerald-400" />
           <div>
              <p className="font-black text-xl text-white">Pre-Flight Logic Passed</p>
              <p className="text-slate-500 text-sm font-bold">Latency: 12ms | Cluster Sync: 100%</p>
           </div>
        </div>
        <button className="w-full py-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-blue-500/40 group active:scale-95 transition-all">
          <span className="group-hover:scale-105 transition-transform block">Execute Deployment</span>
        </button>
      </div>
    </div>
  </div>
);

const TailorFeed: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="h-[600px] bg-slate-900/40 rounded-[3rem] border border-white/5 flex items-center justify-center shadow-2xl relative overflow-hidden">
     <div className="absolute inset-0 bg-grid-white/5" />
     <div className="relative z-10 text-center">
        <button onClick={onBack} className="absolute -top-32 left-1/2 -translate-x-1/2 flex items-center text-slate-500 hover:text-white font-black uppercase text-xs tracking-widest">
           <ChevronLeft className="w-4 h-4 mr-2" /> Terminate Feed
        </button>
        <Activity className="w-24 h-24 text-blue-500 mx-auto mb-8 animate-pulse" />
        <h3 className="text-3xl font-black uppercase tracking-tighter">Atelier Telemetry</h3>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-4">Connecting to remote H100 instances...</p>
     </div>
  </div>
);

const PDFViewer: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-4xl mx-auto h-[800px] bg-slate-900/60 rounded-[3rem] border border-white/10 flex flex-col shadow-2xl">
    <div className="p-8 border-b border-white/5 flex justify-between items-center">
       <button onClick={onBack} className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors tracking-widest">Close</button>
       <button className="px-6 py-3 bg-blue-600 rounded-xl font-black text-[10px] uppercase text-white shadow-xl shadow-blue-500/20">Download Matrix</button>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
       <FileText className="w-32 h-32 text-slate-800 mb-10" />
       <p className="text-slate-500 font-black uppercase text-xs tracking-widest">Generating high-fidelity biometric matrix PDF...</p>
    </div>
  </div>
);

/* --- SYSTEM MONITORING COMPONENTS --- */

const SystemMetrics: React.FC = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { label: 'CPU Load', value: '14%', color: 'emerald' },
        { label: 'Memory', value: '4.2GB / 16GB', color: 'blue' },
        { label: 'Latency', value: '18ms', color: 'indigo' }
      ].map((m, i) => (
        <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{m.label}</p>
          <p className={`text-4xl font-black text-${m.color}-400 tracking-tighter`}>{m.value}</p>
          <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
             <div className={`h-full bg-${m.color}-500 w-1/2`} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ActivityLog: React.FC = () => (
  <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
    <div className="p-10 border-b border-white/5 bg-slate-900/20"><h3 className="text-2xl font-black tracking-tighter uppercase">Audit Stream</h3></div>
    <div className="p-10 space-y-6">
       {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
         <div key={i} className="flex items-start space-x-6 group">
            <div className="p-3 bg-slate-800 rounded-xl text-slate-500">
               <Activity className="w-5 h-5" />
            </div>
            <div>
               <p className="text-white font-bold leading-tight">System configuration modified by SuperAdmin</p>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Oct 15, 2024 • 14:42:0{i} • Node-Paris-01</p>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const SecurityPortal: React.FC = () => (
  <div className="space-y-12">
    <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Access Shield</h3>
      <div className="grid md:grid-cols-2 gap-12">
         <div className="space-y-8">
            <div className="p-8 bg-slate-800/40 rounded-3xl border border-white/5 shadow-inner">
               <div className="flex items-center space-x-4 mb-6">
                  <Lock className="w-6 h-6 text-blue-400" />
                  <p className="font-black uppercase text-xs tracking-widest">Quantum Encryption</p>
               </div>
               <button className="w-full py-4 bg-blue-600 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-500/20">Verify Keys</button>
            </div>
            <div className="p-8 bg-slate-800/40 rounded-3xl border border-white/5 shadow-inner">
               <div className="flex items-center space-x-4 mb-6">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <p className="font-black uppercase text-xs tracking-widest">Session Control</p>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">12 Active Devices</span>
                  <button className="text-red-400 font-black uppercase text-[10px] tracking-widest hover:text-red-300 transition-colors">Terminate All</button>
               </div>
            </div>
         </div>
         <div className="bg-slate-950/40 rounded-3xl p-10 border border-white/5">
            <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-6 text-slate-500">Threat Matrix</h4>
            <div className="space-y-6">
               <div className="flex justify-between items-center"><span className="text-sm font-bold">SQL Injection Shield</span><span className="text-emerald-400 text-xs font-black">ACTIVE</span></div>
               <div className="flex justify-between items-center"><span className="text-sm font-bold">Neural Prompt Guard</span><span className="text-blue-400 text-xs font-black">ACTIVE</span></div>
               <div className="flex justify-between items-center"><span className="text-sm font-bold">Hardware Attestation</span><span className="text-slate-500 text-xs font-black">OFF</span></div>
            </div>
         </div>
      </div>
    </div>
  </div>
);

const AIOversight: React.FC<{ onInspect: () => void, onDeploy: () => void }> = ({ onInspect, onDeploy }) => (
  <div className="space-y-12">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl group hover:border-blue-500/20 transition-all">
           <Zap className="w-12 h-12 text-blue-400 mb-8" />
           <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Model Inspector</h3>
           <p className="text-slate-500 font-medium mb-10 leading-relaxed">Deep dive into tensor distributions and landmark weighting across global ateliers.</p>
           <button onClick={onInspect} className="w-full py-5 bg-slate-800 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-700 transition-all">Launch Inspector</button>
        </div>
        <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl group hover:border-emerald-500/20 transition-all">
           <Activity className="w-12 h-12 text-emerald-400 mb-8" />
           <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Fleet Ops</h3>
           <p className="text-slate-500 font-medium mb-10 leading-relaxed">Global rollout of biometric reconstruction updates to edge processing clusters.</p>
           <button onClick={onDeploy} className="w-full py-5 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Manage Fleet</button>
        </div>
     </div>
  </div>
);

const InfrastructureView: React.FC = () => (
  <div className="space-y-12">
    <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
       <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Global Clusters</h3>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { region: 'US-EAST', load: '42%', status: 'Online' },
            { region: 'EU-WEST', load: '68%', status: 'Online' },
            { region: 'ASIA-PAC', load: '12%', status: 'Online' },
            { region: 'BR-SOUTH', load: '0%', status: 'Offline' }
          ].map((n, i) => (
            <div key={i} className="p-6 bg-slate-800/40 rounded-3xl border border-white/5 shadow-inner">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{n.region}</p>
               <p className="text-2xl font-black text-white">{n.load}</p>
               <p className={`text-[10px] font-black uppercase tracking-widest mt-4 ${n.status === 'Online' ? 'text-emerald-400' : 'text-red-400'}`}>{n.status}</p>
            </div>
          ))}
       </div>
       <div className="p-8 bg-slate-950/40 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
             <Server className="w-10 h-10 text-blue-500" />
             <div>
                <p className="font-bold text-white">Database Cluster V3</p>
                <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Replicated: 2m ago</p>
             </div>
          </div>
          <button className="px-10 py-3 bg-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Purge Global Cache</button>
       </div>
    </div>
  </div>
);

/* --- CLIENT VIEWS --- */

const MeasurementHistory: React.FC = () => (
  <div className="space-y-8">
     <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">Timeline Evolution</h3>
        <div className="space-y-6">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center justify-between p-6 bg-slate-800/40 rounded-2xl border border-white/5 group hover:border-blue-500/20 transition-all shadow-inner">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                      <History className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="font-bold text-white text-lg">Reconstruction Oct {i+10}, 2024</p>
                      <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Identity: #TX-9021 • Validated</p>
                   </div>
                </div>
                <button className="px-6 py-2.5 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Extract Data</button>
             </div>
           ))}
        </div>
     </div>
  </div>
);

const OrdersView: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      { id: 'ORD-7721', item: 'Bespoke Tuxedo', status: 'Drafting', color: 'blue' },
      { id: 'ORD-6612', item: 'Navy Evening Gown', status: 'Reconstructing', color: 'indigo' },
      { id: 'ORD-5541', item: 'Business Collection', status: 'Calibrated', color: 'emerald' }
    ].map((order, i) => (
      <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl group hover:border-blue-500/20 transition-all">
        <div className="flex justify-between items-start mb-10">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-all shadow-inner"><ShoppingBag className="w-8 h-8" /></div>
          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-${order.color}-500/10 text-${order.color}-400 border border-${order.color}-500/20`}>{order.status}</span>
        </div>
        <h4 className="text-2xl font-black tracking-tighter uppercase mb-2">{order.item}</h4>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-10">UUID: {order.id}</p>
        <button className="w-full py-4 bg-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all active:scale-95">Track Progress</button>
      </div>
    ))}
  </div>
);

const FabricSuggestions: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {[
       { title: "Merino Silk 150s", d: "Neural weighting suggests this drape for your vertical silhouette." },
       { title: "Irish Heavy Linen", d: "Ideal structure for the biometric torso metrics detected." },
       { title: "Midnight Vicuña", d: "Premium evening selection based on anatomical proportions." }
     ].map((f, i) => (
       <div key={i} className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl group">
          <Hammer className="w-12 h-12 text-slate-700 mb-8 group-hover:text-blue-500 transition-all shadow-inner" />
          <h4 className="text-2xl font-black tracking-tighter mb-4 uppercase">{f.title}</h4>
          <p className="text-slate-500 font-medium leading-relaxed mb-10">{f.d}</p>
          <div className="flex space-x-3">
             <span className="px-4 py-1.5 bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest">Luxe</span>
             <span className="px-4 py-1.5 bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest">Neural+</span>
          </div>
       </div>
     ))}
  </div>
);

export default Dashboard;
