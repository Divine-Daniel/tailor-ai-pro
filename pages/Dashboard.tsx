
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
  ChevronLeft, Lock, Sparkles, Video, ImageIcon, Send, Loader2, X,
  Shirt, Layers, Target, Thermometer
} from 'lucide-react';
import { generateFashionImage, generateFashionVideo, analyzeVisualData } from '../services/geminiService';

interface DashboardProps {
  role: UserRole;
  onLogout: () => void;
}

// Added React.FC type to Skeleton to correctly handle 'key' and other React props when used in map functions
const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-slate-800/30 rounded-2xl ${className}`} />
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
    { id: 5, title: 'Visual Demo', active: true, desc: 'Interactive interface preview' },
    { id: 6, title: 'Pricing Matrix', active: true, desc: 'Plan selection architecture' },
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
    if (confirm("Are you sure you want to purge this section from the landing architecture?")) {
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

  const renderSkeleton = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-48" />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Skeleton className="lg:col-span-2 h-[400px] rounded-[3rem]" />
              <Skeleton className="h-[400px] rounded-[3rem]" />
            </div>
          </div>
        );
      case 'measurements':
      case 'history':
        return (
          <div className="space-y-10">
            <Skeleton className="h-20 w-1/3" />
            <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 p-10 space-y-6">
              {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-16 w-full rounded-2xl" />)}
            </div>
          </div>
        );
      case 'preview':
        return (
          <div className="grid lg:grid-cols-4 gap-8">
            <Skeleton className="lg:col-span-3 aspect-video rounded-[3rem]" />
            <Skeleton className="h-[600px] rounded-[3rem]" />
          </div>
        );
      case 'ai-studio':
        return (
          <div className="space-y-12">
            <div className="flex space-x-4 mb-8">
              {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-40 rounded-2xl" />)}
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="h-[500px] rounded-[3.5rem]" />
              <Skeleton className="h-[500px] rounded-[3.5rem]" />
            </div>
          </div>
        );
      default:
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
  };

  const renderContent = () => {
    if (isLoading) return renderSkeleton();

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

      // CMS Management Flow
      case 'cms': return <CMSPage sections={cmsSections} onToggle={handleToggleCMS} onDelete={handleDeleteCMS} onEdit={handleEditCMS} onAddNew={() => setActiveTab('cms-add')} />;
      case 'cms-add': return <CMSAddPage onBack={() => setActiveTab('cms')} onAdd={handleAddCMS} />;
      case 'cms-edit': return <CMSEditPage section={currentEditingSection} onBack={() => setActiveTab('cms')} onSave={handleSaveCMS} />;

      // Role-Specific Views
      case 'clients': return <ClientsList onRegister={() => setActiveTab('client-register')} />;
      case 'client-register': return <ClientRegister onBack={() => setActiveTab('clients')} />;
      case 'measurements': return <MeasurementsTable role={role} onViewHistory={() => setActiveTab('history')} onExport={() => setActiveTab('pdf-viewer')} />;
      case 'upload': return <UploadSection />;
      case 'preview': return <ThreeDPreview />;
      case 'estimator': return <FabricEstimator />;
      case 'advice': case 'style': return <StyleAdvice />;
      case 'storage': return <StorageMonitoring />;
      case 'ai-logs': return <AILogsView />;
      case 'reports': return <ReportsView />;
      case 'pdf-viewer': return <PDFViewer onBack={() => setActiveTab('measurements')} />;
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

/* --- CMS PAGES (MANAGEMENT LAYER) --- */

const CMSPage: React.FC<{ 
  sections: any[], 
  onToggle: (id: number) => void, 
  onDelete: (id: number) => void, 
  onEdit: (section: any) => void,
  onAddNew: () => void
}> = ({ sections, onToggle, onDelete, onEdit, onAddNew }) => (
  <div className="space-y-10">
    <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl font-black tracking-tighter uppercase">Landing Page Architecture</h3>
        <button 
          onClick={onAddNew}
          className="px-6 py-3 bg-blue-600 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Create New Section
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map(s => (
          <div key={s.id} className="p-8 bg-slate-800/40 border border-white/5 rounded-[2.5rem] flex justify-between items-start group hover:border-blue-500/30 transition-all shadow-inner">
            <div className="flex-1">
              <h4 className="text-xl font-black mb-2">{s.title}</h4>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">{s.desc}</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => onEdit(s)}
                  className="p-3 bg-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-all active:scale-90"
                  title="Edit Section Parameters"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete(s.id)}
                  className="p-3 bg-red-500/10 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/20 transition-all active:scale-90"
                  title="Delete Section Forever"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button 
              onClick={() => onToggle(s.id)}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 shadow-inner ${s.active ? 'bg-blue-600' : 'bg-slate-700'}`}
              title={s.active ? "Section is Visible" : "Section is Hidden"}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm ${s.active ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CMSAddPage: React.FC<{ onBack: () => void, onAdd: (section: any) => void }> = ({ onBack, onAdd }) => {
  const [formData, setFormData] = useState({ title: '', desc: '' });
  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
        <button onClick={onBack} className="mb-10 flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
          <ChevronLeft className="w-4 h-4 mr-2" /> Discard Draft
        </button>
        <h3 className="text-4xl font-black tracking-tighter uppercase mb-12">Initialize Section</h3>
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architectural Title</label>
            <input 
              type="text" 
              className="w-full bg-slate-800/60 border border-white/5 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-bold" 
              placeholder="e.g. Testimonials Cloud"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Descriptor Meta</label>
            <textarea 
              className="w-full bg-slate-800/60 border border-white/5 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 h-40 text-slate-300 font-medium" 
              placeholder="Describe the neural logic of this section..."
              value={formData.desc}
              onChange={e => setFormData({...formData, desc: e.target.value})}
            />
          </div>
          <button 
            disabled={!formData.title}
            onClick={() => onAdd(formData)}
            className="w-full py-6 bg-blue-600 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 mt-6 active:scale-95 transition-all disabled:opacity-30"
          >
            Deploy Section
          </button>
        </div>
      </div>
    </div>
  );
};

const CMSEditPage: React.FC<{ section: any, onBack: () => void, onSave: (section: any) => void }> = ({ section, onBack, onSave }) => {
  const [formData, setFormData] = useState({ title: section?.title || '', desc: section?.desc || '' });
  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
        <button onClick={onBack} className="mb-10 flex items-center text-slate-400 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">
          <ChevronLeft className="w-4 h-4 mr-2" /> Cancel Changes
        </button>
        <h3 className="text-4xl font-black tracking-tighter uppercase mb-12">Modify Parameters</h3>
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architectural Title</label>
            <input 
              type="text" 
              className="w-full bg-slate-800/60 border border-white/5 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-bold" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Descriptor Meta</label>
            <textarea 
              className="w-full bg-slate-800/60 border border-white/5 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 h-40 text-slate-300 font-medium" 
              value={formData.desc}
              onChange={e => setFormData({...formData, desc: e.target.value})}
            />
          </div>
          <button 
            onClick={() => onSave({ ...section, ...formData })}
            className="w-full py-6 bg-blue-600 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 mt-6 active:scale-95 transition-all"
          >
            Commit Modifications
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- CORE SHARED DASHBOARD VIEWS --- */

const Overview: React.FC<{ role: UserRole }> = ({ role }) => {
  const stats = [
    { label: 'Inference Velocity', value: '42ms', change: 'Optimal', icon: Activity, color: 'text-emerald-400' },
    { label: 'Active Patterns', value: '1,024', change: '+12%', icon: Scissors, color: 'text-blue-400' },
    { label: 'Neural Accuracy', value: '99.8%', change: 'Target', icon: Ruler, color: 'text-indigo-400' },
    { label: 'Storage State', value: 'Healthy', change: '92%', icon: Database, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-slate-800/80 ${stat.color} shadow-inner`}><stat.icon className="w-8 h-8" /></div>
              <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/5">{stat.change}</span>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-4xl font-black mt-2 text-white tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <h3 className="font-black text-2xl mb-12 tracking-tighter uppercase">Anatomical Feed</h3>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 shadow-inner">
                  <User className="w-8 h-8 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-lg text-slate-200">Session Calibration #{i}20x</p>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Status: Reconstructed • Oct 15, 2024</p>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group cursor-pointer">
           <Zap className="w-48 h-48 absolute top-0 right-0 text-white/10 group-hover:scale-125 transition-transform duration-1000" />
           <div className="relative z-10">
              <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Pro Extension</h4>
              <p className="text-blue-100 font-medium mb-12">Unlock volumetric fabric simulation for high-fidelity custom gowns.</p>
              <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 shadow-2xl">Upgrade Node</button>
           </div>
        </div>
      </div>
    </div>
  );
};

const SettingsSection: React.FC<{ role: UserRole }> = ({ role }) => (
  <div className="max-w-4xl mx-auto py-10">
    <div className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
      <h3 className="text-4xl font-black tracking-tighter uppercase mb-10">Neural Parameters</h3>
      <div className="space-y-10">
        <div className="p-8 bg-slate-800/40 rounded-3xl border border-white/5 flex justify-between items-center">
           <div><p className="font-bold text-white text-lg">Biometric obfuscation</p><p className="text-sm text-slate-500">Protect client data with quantum-ready hashing</p></div>
           <button className="w-14 h-7 bg-blue-600 rounded-full relative"><div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-sm"/></button>
        </div>
        <div className="p-8 bg-slate-800/40 rounded-3xl border border-white/5 flex justify-between items-center">
           <div><p className="font-bold text-white text-lg">Automatic Mesh Backup</p><p className="text-sm text-slate-500">Sync reconstruction logs to private S3 cluster</p></div>
           <button className="w-14 h-7 bg-slate-700 rounded-full relative"><div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"/></button>
        </div>
      </div>
    </div>
  </div>
);

const NotificationsView: React.FC<{ onSelect: () => void }> = ({ onSelect }) => (
  <div className="max-w-4xl mx-auto py-10">
    <div className="bg-slate-900/40 p-12 rounded-[3rem] border border-white/5 shadow-2xl">
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-10">System Alerts</h3>
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} onClick={onSelect} className="p-8 bg-slate-800/40 rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all"><Bell className="w-6 h-6" /></div>
              <div><p className="font-bold text-white text-lg">Calibration Confirmed Session #{i}x</p><p className="text-xs text-slate-500 font-black uppercase mt-1">Oct 15, 2024</p></div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-white" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ThreeDPreview: React.FC = () => {
  const [selectedGarment, setSelectedGarment] = useState<string | null>(null);
  const [fittingStage, setFittingStage] = useState<'idle' | 'simulating' | 'applied'>('idle');
  const [viewMode, setViewMode] = useState<'orbit' | 'skeletal' | 'heatmap'>('orbit');
  const [simProgress, setSimProgress] = useState(0);

  const garments = [
    { id: 'suit', name: 'Bespoke Jacket', icon: Shirt },
    { id: 'gown', name: 'Silk Gown', icon: Layers },
    { id: 'coat', name: 'Top Coat', icon: ShoppingBag },
  ];

  const handleTryOn = (id: string) => {
    setSelectedGarment(id);
    setFittingStage('simulating');
    setSimProgress(0);
  };

  useEffect(() => {
    if (fittingStage === 'simulating') {
      const interval = setInterval(() => {
        setSimProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setFittingStage('applied');
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [fittingStage]);

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 aspect-video bg-slate-900 rounded-[3rem] border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl group min-h-[500px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)]"></div>
          {fittingStage === 'simulating' ? (
            <div className="z-10 text-center space-y-6">
              <div className="relative w-32 h-32 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-xl font-black text-white uppercase tracking-tighter">Fitting Simulation: {simProgress}%</p>
            </div>
          ) : (
            <div className="text-center z-10 space-y-8 group-hover:scale-105 transition-transform duration-1000">
              <Box className={`w-32 md:w-56 h-32 md:h-56 ${selectedGarment ? 'text-blue-500/40' : 'text-slate-800'} mx-auto animate-pulse`} />
              <p className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase">
                {fittingStage === 'applied' ? `Applied: ${garments.find(g => g.id === selectedGarment)?.name}` : 'Awaiting Model'}
              </p>
            </div>
          )}
          <div className="absolute top-8 left-8 flex flex-col space-y-4">
             {['orbit', 'skeletal', 'heatmap'].map(m => (
               <button key={m} onClick={() => setViewMode(m as any)} className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === m ? 'bg-blue-600 text-white' : 'bg-slate-800/80 text-slate-400'}`}>{m}</button>
             ))}
          </div>
        </div>
        <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 space-y-6 flex flex-col shadow-2xl">
          <h4 className="text-xl font-black uppercase tracking-tighter">Garment Closet</h4>
          <div className="space-y-4 flex-1">
            {garments.map(g => (
              <button key={g.id} onClick={() => handleTryOn(g.id)} className={`w-full p-6 rounded-[2rem] border flex items-center space-x-4 transition-all ${selectedGarment === g.id ? 'bg-blue-600 border-blue-400' : 'bg-slate-800/40 border-white/5'}`}>
                 <g.icon className="w-6 h-6" />
                 <span className="font-black text-sm uppercase">{g.name}</span>
              </button>
            ))}
          </div>
          <button className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 shadow-2xl">Export Mesh</button>
        </div>
      </div>
    </div>
  );
};

const AIStudio: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'image' | 'video' | 'analysis'>('image');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleExecute = async () => {
    if (activeTool === 'video' || activeTool === 'image') {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    setIsGenerating(true);
    setResult(null);
    try {
      let res: any;
      if (activeTool === 'image') {
        res = await generateFashionImage(prompt, "1K");
      } else if (activeTool === 'video') {
        res = await generateFashionVideo(prompt, "16:9");
      } else {
        res = await analyzeVisualData("", "image/png", prompt || "Analyze the current style trends.");
      }
      setResult(res);
    } catch (e: any) {
      console.error(e);
      if (e?.message?.includes("Requested entity was not found.")) {
        await (window as any).aistudio.openSelectKey();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
        {[
          { id: 'image', icon: ImageIcon, label: 'Design' },
          { id: 'video', icon: Video, label: 'Motion' },
          { id: 'analysis', icon: Search, label: 'Inspect' }
        ].map(tool => (
          <button key={tool.id} onClick={() => setActiveTool(tool.id as any)} className={`px-8 py-4 rounded-2xl flex items-center space-x-3 font-black uppercase text-xs tracking-widest transition-all ${activeTool === tool.id ? 'bg-blue-600 text-white shadow-xl' : 'bg-slate-900/40 text-slate-500'}`}>
            <tool.icon className="w-5 h-5" />
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-slate-900/40 p-10 rounded-[3.5rem] border border-white/5 shadow-2xl">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Neural Prompt</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className="w-full bg-slate-800 border border-white/5 p-5 rounded-2xl outline-none mb-8 h-40 font-medium" placeholder="Describe the pattern or aesthetic..."/>
          <button onClick={handleExecute} disabled={isGenerating || (!prompt && activeTool !== 'analysis')} className="w-full py-6 bg-blue-600 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 active:scale-95 disabled:opacity-50">
            {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
            <span>Execute Generation</span>
          </button>
          
          {(activeTool === 'video' || activeTool === 'image') && (
            <div className="mt-6 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-relaxed">
                Note: This tool uses high-quality Gemini models and requires a paid API key.
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="ml-1 underline">Billing Doc</a>
              </p>
            </div>
          )}
        </div>
        <div className="bg-slate-900/60 rounded-[3.5rem] border border-white/10 shadow-2xl flex items-center justify-center relative min-h-[500px] overflow-hidden">
           {isGenerating ? (
             <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Processing Neural Request...</p>
             </div>
           ) : result ? (
             activeTool === 'video' ? (
               <video src={result} controls className="w-full h-full object-contain rounded-[3.5rem]" />
             ) : (
               <div className="w-full h-full p-6">
                 {result.startsWith('data:') ? (
                    <img src={result} className="w-full h-full object-contain rounded-[2.5rem]" />
                 ) : (
                    <div className="bg-slate-800/40 p-10 rounded-3xl border border-white/5 h-full overflow-y-auto custom-scrollbar font-medium text-slate-300">
                      {result}
                    </div>
                 )}
               </div>
             )
           ) : (
             <div className="text-center">
                <Box className="w-16 h-16 text-slate-800 mx-auto mb-4" />
                <p className="text-slate-600 font-black uppercase text-xs">Awaiting Inference</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

/* --- SYSTEM MONITORING, REPORTS, LOGS (STUBBED FOR UI) --- */
const SystemMetrics = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5 text-center"><p className="text-slate-500 font-black uppercase tracking-widest">System Load: 12% | All Nodes Healthy</p></div>;
const AdminsList = ({ onInvite, onRevoke, onSettings }: any) => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><div className="flex justify-between items-center mb-10"><h3 className="text-2xl font-black uppercase">Operators</h3><button onClick={onInvite} className="px-6 py-2 bg-emerald-600 rounded-xl font-black uppercase text-xs">Invite</button></div><div className="space-y-4"><div className="p-6 bg-slate-800/40 rounded-2xl flex justify-between items-center"><span>Standard Operator (L1)</span><div className="flex space-x-2"><button onClick={onSettings} className="p-2 bg-slate-700 rounded-lg"><Settings className="w-4 h-4"/></button><button onClick={onRevoke} className="p-2 bg-red-500/10 text-red-500 rounded-lg"><Trash2 className="w-4 h-4"/></button></div></div></div></div>;
const StorageMonitoring = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><h3 className="text-2xl font-black uppercase mb-10">Storage fabric</h3><div className="h-4 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-1/3"/></div></div>;
const ReportsView = () => <div className="grid grid-cols-3 gap-6">{[1, 2, 3].map(i => <div key={i} className="p-10 bg-slate-900/40 rounded-3xl border border-white/5 text-center"><FileText className="w-12 h-12 mx-auto mb-6 text-slate-700"/><button className="px-6 py-2 bg-slate-800 rounded-xl text-[10px] font-black uppercase">Download Q{i}</button></div>)}</div>;
const ActivityLog = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5 h-[400px] overflow-y-auto custom-scrollbar font-mono text-xs text-slate-500">{Array.from({length:20}).map((_,i)=><p key={i} className="mb-2">[2024-10-15 14:22:0{i}] ADMIN_ACCESS: SUCCESS | Session: #90{i}</p>)}</div>;
const InfrastructureView = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><p className="text-emerald-400 font-black uppercase">All Clusters Sync: 100%</p></div>;
const UploadSection = () => <div className="p-20 bg-slate-900/40 rounded-[4rem] border-4 border-dashed border-white/5 text-center group cursor-pointer hover:border-blue-500/20 transition-all"><Upload className="w-16 h-16 mx-auto mb-10 text-slate-700 group-hover:text-blue-500 transition-colors"/><h3 className="text-3xl font-black uppercase tracking-tighter">Initialize Reconstruction</h3><p className="text-slate-500 mt-4">Drop front and side photometry here.</p></div>;
const StyleAdvice = () => <div className="p-12 bg-blue-600 rounded-[3rem] text-white relative overflow-hidden"><Lightbulb className="w-48 h-48 absolute top-0 right-0 opacity-10"/><h3 className="text-3xl font-black uppercase mb-6">Neural Stylist</h3><p className="text-blue-100 max-w-xl">Based on your vertical torso alignment, we recommend structured peak lapels and a 2.5cm trouser taper.</p></div>;
const ClientsList = ({ onRegister }: any) => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><div className="flex justify-between items-center mb-10"><h3 className="text-2xl font-black uppercase tracking-tighter">Identity Directory</h3><button onClick={onRegister} className="px-6 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase">Register Identity</button></div><div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="p-6 bg-slate-800/40 rounded-2xl flex justify-between items-center"><span>Client ID: #TX-90{i}</span><ChevronRight className="w-5 h-5 text-slate-700"/></div>)}</div></div>;
const HelpSupport = ({onLiveBridge, onDoc, onRequestFeature}: any) => <div className="grid md:grid-cols-2 gap-10"><div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5 text-center"><LifeBuoy className="w-12 h-12 mx-auto mb-6 text-blue-400"/><button onClick={onLiveBridge} className="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-xs">Bridge Technician</button></div><div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5 text-center"><BookOpen className="w-12 h-12 mx-auto mb-6 text-slate-500"/><button onClick={onDoc} className="w-full py-4 bg-slate-800 text-white rounded-xl font-black uppercase text-xs">Knowledge Base</button></div></div>;
const FabricEstimator = () => <div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5"><h3 className="text-3xl font-black uppercase mb-10">Material Estimator</h3><div className="p-10 bg-slate-800/40 rounded-[2rem] text-center"><p className="text-6xl font-black">3.85<span className="text-2xl text-blue-500 ml-2">m</span></p><p className="text-slate-500 font-bold uppercase text-[10px] mt-4">Required for Standard Tuxedo</p></div></div>;
const MeasurementHistory = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><h3 className="text-2xl font-black uppercase mb-10">Historical Matrix</h3><div className="space-y-4">{[1, 2].map(i => <div key={i} className="p-6 bg-slate-800/40 rounded-2xl flex justify-between items-center"><span>Scan Oct {i+10}, 2024</span><Download className="w-5 h-5 text-slate-700"/></div>)}</div></div>;
const OrdersView = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><h3 className="text-2xl font-black uppercase mb-10">Active Projects</h3><div className="p-8 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex justify-between items-center"><p className="font-bold">Bespoke Collection #99x</p><span className="text-[10px] font-black text-emerald-400 uppercase">CALIBRATED</span></div></div>;
const FabricSuggestions = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><h3 className="text-2xl font-black uppercase mb-10">Suggested Bolt Yields</h3><div className="grid grid-cols-2 gap-6"><div className="p-6 bg-slate-800/40 rounded-2xl">Luxe Merino Silk</div><div className="p-6 bg-slate-800/40 rounded-2xl">Italian Heavy Linen</div></div></div>;
const MeasurementsTable = ({ role, onViewHistory, onExport }: any) => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><div className="flex justify-between items-center mb-10"><h3 className="text-2xl font-black uppercase">Extracted Biometrics</h3><button onClick={onExport} className="px-6 py-2 bg-blue-600 rounded-xl font-black uppercase text-xs">Export PDF</button></div><div className="grid grid-cols-2 gap-4">{Array.from({length:6}).map((_,i)=><div key={i} className="p-4 bg-slate-800/40 rounded-xl flex justify-between"><span>Metric #{i+1}</span><span className="font-bold text-white">9{i}.2cm</span></div>)}</div></div>;

const AILogsView = () => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><h3 className="text-2xl font-black uppercase mb-10">AI Inference Logs</h3><div className="space-y-4 font-mono text-xs text-slate-500">{Array.from({length:10}).map((_,i)=><p key={i}>[PROMPT_TOKEN_SYNC] GEMINI-3-PRO: SUCCESS ({Math.floor(Math.random()*1000)}ms)</p>)}</div></div>;
const TailorMonitoring = ({ onMonitor }: any) => <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-white/5"><div className="flex justify-between items-center mb-10"><h3 className="text-2xl font-black uppercase">Tailor Activity</h3><button onClick={onMonitor} className="px-6 py-2 bg-blue-600 rounded-xl font-black uppercase text-xs">Live Feed</button></div><div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="p-6 bg-slate-800/40 rounded-2xl flex justify-between items-center"><span>Tailor Node #{i}</span><span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Active</span></div>)}</div></div>;

const LiveBridgeView = ({onBack}: any) => <div className="p-20 bg-slate-900/60 rounded-[3rem] border border-white/5 text-center"><button onClick={onBack} className="mb-10 text-slate-500 font-black uppercase text-[10px]">Terminate</button><p className="text-2xl font-black animate-pulse">ESTABLISHING NEURAL LINK...</p></div>;
const DocView = ({onBack}: any) => <div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5"><button onClick={onBack} className="mb-10 text-slate-500 font-black uppercase text-[10px]">Exit</button><h3 className="text-3xl font-black uppercase mb-6">Archives</h3><p className="text-slate-500">Search technical specs here...</p></div>;
const NotificationDetail = ({onBack}: any) => <div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5"><button onClick={onBack} className="mb-10 text-slate-500 font-black uppercase text-[10px]">Back</button><h3 className="text-3xl font-black uppercase">System Calibration V3.2</h3><p className="mt-4 text-slate-500">Calibration successful on all nodes.</p></div>;
const ClientRegister = ({onBack}: any) => <div className="p-12 bg-slate-900/40 rounded-[3.5rem] border border-white/5 max-w-2xl mx-auto"><button onClick={onBack} className="mb-10 text-slate-500 uppercase text-[10px] font-black">Discard</button><h3 className="text-3xl font-black uppercase mb-10">Register Client</h3><input className="w-full bg-slate-800 p-5 rounded-2xl outline-none mb-4" placeholder="Full Name"/><button className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase">Initialize</button></div>;
const PDFViewer = ({onBack}: any) => <div className="p-20 bg-slate-900/60 rounded-[3rem] border border-white/5 text-center"><button onClick={onBack} className="mb-10 text-slate-500 uppercase text-[10px] font-black">Close</button><p className="text-2xl font-black">PREVIEWING BIOMETRIC MATRIX PDF...</p></div>;
const InviteAdmin = ({onBack}: any) => <div className="p-12 bg-slate-900/40 rounded-[3rem] max-w-xl mx-auto"><button onClick={onBack} className="mb-8 font-black uppercase text-[10px]">Cancel</button><h3 className="text-3xl font-black uppercase mb-8">Invite Operator</h3><input className="w-full bg-slate-800 p-5 rounded-2xl mb-4" placeholder="Email Address"/><button className="w-full py-5 bg-emerald-600 rounded-2xl font-black uppercase">Send Invite</button></div>;
const AdminSettings = ({onBack}: any) => <div className="p-12 bg-slate-900/40 rounded-[3rem] max-w-xl mx-auto"><button onClick={onBack} className="mb-8 font-black uppercase text-[10px]">Cancel</button><h3 className="text-3xl font-black uppercase mb-8">Operator Control</h3><div className="space-y-4"><div className="p-4 bg-slate-800 rounded-xl">Toggle H100 GPU Burst</div></div></div>;
const RevokeConfirm = ({onBack}: any) => <div className="p-12 bg-red-600 rounded-[3rem] max-w-xl mx-auto text-center"><ShieldAlert className="w-16 h-16 mx-auto mb-6"/><h3 className="text-3xl font-black uppercase mb-6">Revoke Access?</h3><p className="mb-8">This will immediately terminate all neural session tokens.</p><div className="flex space-x-4"><button onClick={onBack} className="flex-1 py-4 bg-white text-black font-black uppercase rounded-2xl">Abort</button><button className="flex-1 py-4 bg-black text-white font-black uppercase rounded-2xl">Confirm</button></div></div>;
const WeightInspector = ({onBack}: any) => <div className="p-12 bg-slate-900/40 rounded-[3rem]"><button onClick={onBack} className="mb-8 font-black uppercase text-[10px]">Back</button><h3 className="text-3xl font-black uppercase">Weight distribution</h3><div className="h-64 bg-slate-950 rounded-2xl p-10 flex items-end space-x-2">{Array.from({length:10}).map((_,i)=><div key={i} className="flex-1 bg-blue-500/40 rounded-t" style={{height:`${Math.random()*100}%`}}/>)}</div></div>;
const DeploymentManager = ({onBack}: any) => <div className="p-12 bg-slate-900/40 rounded-[3rem]"><button onClick={onBack} className="mb-8 font-black uppercase text-[10px]">Back</button><h3 className="text-3xl font-black uppercase mb-10">Neural Rollout</h3><div className="p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl"><p className="text-emerald-400 font-bold uppercase">Ready for Deployment: Stable v3.4.1</p><button className="mt-8 px-10 py-4 bg-emerald-600 rounded-2xl font-black uppercase text-xs">Execute Push</button></div></div>;
const TailorFeed = ({onBack}: any) => <div className="p-20 bg-slate-900/60 rounded-[3rem] text-center"><button onClick={onBack} className="mb-10 uppercase text-[10px] font-black">Disconnect</button><Activity className="w-24 h-24 mx-auto text-blue-500 animate-pulse mb-8"/><p className="text-2xl font-black">MONITORING ATELIER TELEMETRY...</p></div>;
const SecurityPortal = () => <div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5"><h3 className="text-3xl font-black uppercase mb-10">Security Portal</h3><div className="p-8 bg-slate-800 rounded-2xl border border-white/5 flex justify-between items-center"><p className="font-bold">Active Shield: High Strength</p><Lock className="w-6 h-6 text-blue-500"/></div></div>;
const AIOversight = ({onInspect, onDeploy}: any) => <div className="grid grid-cols-2 gap-8"><div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5 text-center"><Target className="w-12 h-12 mx-auto mb-6 text-blue-400"/><button onClick={onInspect} className="w-full py-4 bg-blue-600 rounded-xl font-black uppercase text-xs">Tensor Inspector</button></div><div className="p-12 bg-slate-900/40 rounded-[3rem] border border-white/5 text-center"><Activity className="w-12 h-12 mx-auto mb-6 text-emerald-400"/><button onClick={onDeploy} className="w-full py-4 bg-emerald-600 rounded-xl font-black uppercase text-xs">Rollout Hub</button></div></div>;

export default Dashboard;
