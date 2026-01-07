
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Snowfall from './components/Snowfall';
import { UserRole } from './types';
import { Key, Shield, User, Scissors, Users, Plus, ShieldCheck, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    setRole(null);
  };

  const handleGetStarted = () => {
    setShowRoleSelector(true);
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Snowfall />
      
      {role ? (
        <Dashboard role={role} onLogout={handleLogout} />
      ) : (
        <div className="relative overflow-x-hidden">
          {/* Navigation Bar */}
          <nav className={`fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center transition-all duration-500 border-b ${isDarkMode ? 'bg-slate-950/60 backdrop-blur-2xl border-white/5' : 'bg-white/80 backdrop-blur-2xl border-slate-200 shadow-sm'}`}>
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setShowRoleSelector(false)}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                 <Scissors className="w-6 h-6 text-white" />
              </div>
              <h1 className={`text-2xl font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                TailorAI
              </h1>
            </div>
            
            <div className={`hidden md:flex items-center space-x-10 text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Features</span>
              <span className="hover:text-blue-500 cursor-pointer transition-colors">How it works</span>
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Enterprise</span>
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Pricing</span>
            </div>

            <div className="flex items-center space-x-5">
              <button 
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all ${isDarkMode ? 'bg-slate-900 text-yellow-400 hover:bg-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setShowRoleSelector(true)}
                className={`font-bold text-sm transition-colors ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'}`}
              >
                Log In
              </button>
              <button 
                onClick={handleGetStarted}
                className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95 ${isDarkMode ? 'bg-white text-black hover:bg-slate-200' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
              >
                Get Started
              </button>
            </div>
          </nav>

          <LandingPage onGetStarted={handleGetStarted} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

          {/* Role Selection Modal */}
          {showRoleSelector && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 max-w-xl w-full shadow-[0_0_100px_rgba(37,99,235,0.1)] relative">
                <button 
                  onClick={() => setShowRoleSelector(false)}
                  className="absolute top-8 right-8 text-slate-500 hover:text-white"
                >
                  <Plus className="w-8 h-8 rotate-45" />
                </button>
                <h2 className="text-3xl font-bold mb-2 text-center text-white">Welcome Back</h2>
                <p className="text-slate-500 text-center mb-10">Select your access portal to continue</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { r: UserRole.SUPER_ADMIN, label: 'System Owner', desc: 'Full platform administration', icon: Shield, color: 'text-red-400' },
                    { r: UserRole.ADMIN, label: 'Standard Admin', desc: 'Operations & Monitoring', icon: ShieldCheck, color: 'text-orange-400' },
                    { r: UserRole.TAILOR, label: 'Professional Tailor', desc: 'Design & Measurement Tools', icon: Scissors, color: 'text-blue-400' },
                    { r: UserRole.CLIENT, label: 'End Client', desc: 'View Measurements & Orders', icon: User, color: 'text-emerald-400' },
                  ].map((item) => (
                    <button
                      key={item.r}
                      onClick={() => setRole(item.r)}
                      className="flex items-center space-x-5 p-6 rounded-2xl border border-slate-800 bg-slate-800/20 hover:bg-blue-600/10 hover:border-blue-500 transition-all text-left group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white group-hover:text-blue-400">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Analytics />
    </div>
  );
};

export default App;
