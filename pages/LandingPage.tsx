
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, Play, Box, Scissors, Plus, Star, ArrowRight,
  Ruler, Users, Lightbulb, FileText, Hammer, Lock, Shield, 
  Clock, Award, Layout, BookOpen, Database, X, Sparkles,
  Camera, Globe, Cpu, Smartphone, Check, HelpCircle,
  AlertCircle, Target, Shirt, ShoppingBag, Layers,
  Activity, Thermometer, Briefcase, Sun, Moon, Instagram,
  Twitter, Linkedin, Github, Mail, Facebook, ChevronLeft
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-800/40 rounded-3xl ${className}`} />
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, isDarkMode, toggleTheme }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=2400",
      title: "THE FUTURE OF BESPOKE FIT.",
      subtitle: "Precision Neural Reconstruction Engine v2.0"
    },
    {
      img: "https://images.unsplash.com/photo-1594932224828-b4b059b6f6f9?auto=format&fit=crop&q=80&w=2400",
      title: "CRAFTED BY DATA.",
      subtitle: "Sub-millimeter Anatomical Accuracy"
    },
    {
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2400",
      title: "MASTER YOUR ATELIER.",
      subtitle: "Digital Workflow for Modern Artisans"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 1200);
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);

    // Neural Background Animation Logic
    const canvas = document.getElementById('neural-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 80;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.2)';
      ctx.strokeStyle = isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.05)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
      window.removeEventListener('resize', init);
    };
  }, [isDarkMode]);

  if (isInitialLoad) {
    return (
      <div className="pt-32 px-8 max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col items-center space-y-8 text-center">
          <Skeleton className="h-10 w-64 rounded-full" />
          <Skeleton className="h-24 w-full max-w-3xl" />
          <Skeleton className="h-12 w-2/3 max-w-xl" />
          <div className="flex space-x-4">
            <Skeleton className="h-16 w-48" />
            <Skeleton className="h-16 w-48" />
          </div>
        </div>
        <Skeleton className="h-[500px] w-full rounded-[4rem]" />
      </div>
    );
  }

  return (
    <div className={`relative selection:bg-blue-500/30 transition-colors duration-500 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
      
      {/* 1. Hero Section with Slider */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center overflow-hidden relative">
        <div className="max-w-6xl mx-auto z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-sm font-semibold text-blue-400 mb-10 shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-tight uppercase text-xs">{heroSlides[currentSlide].subtitle}</span>
          </div>
          <h1 className="text-6xl md:text-[8rem] font-black leading-[0.9] mb-12 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-900 bg-clip-text text-transparent dark:from-white dark:via-white dark:to-white/40 tracking-tighter uppercase">
            {heroSlides[currentSlide].title.split(' ').map((word, i) => <React.Fragment key={i}>{word} <br className="hidden md:block" /></React.Fragment>)}
          </h1>
          <p className={`text-xl md:text-3xl mb-16 max-w-4xl mx-auto font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Generate 50+ accurate anatomical measurements from a single photometry scan. No tape. No errors. Just perfect results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onGetStarted}
              className="px-16 py-6 rounded-3xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xl transition-all transform hover:scale-105 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.6)] active:scale-95 flex items-center"
            >
              Get Started Free <ChevronRight className="w-6 h-6 ml-2" />
            </button>
            <button className={`px-16 py-6 rounded-3xl border border-slate-700/50 font-bold text-xl transition-all flex items-center space-x-3 backdrop-blur-xl group shadow-2xl ${isDarkMode ? 'bg-slate-900/60 text-white hover:bg-slate-800' : 'bg-white text-slate-900 hover:bg-slate-50'}`}>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white fill-current ml-1" />
              </div>
              <span>Experience Demo</span>
            </button>
          </div>
        </div>
        
        <div className="mt-32 relative w-full max-w-7xl mx-auto px-4 perspective-1000 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_60px_150px_-30px_rgba(0,0,0,0.6)] bg-slate-950 aspect-video md:aspect-[21/9]">
            {heroSlides.map((slide, idx) => (
              <img 
                key={idx}
                src={slide.img} 
                alt="High Definition Tailoring" 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-70 scale-100' : 'opacity-0 scale-110'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4">
               {heroSlides.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => setCurrentSlide(i)}
                   className={`h-2 transition-all duration-300 rounded-full ${currentSlide === i ? 'w-20 bg-blue-600' : 'w-12 bg-white/20 hover:bg-white/40'}`} 
                 />
               ))}
            </div>
            
            <button 
              onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-60 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl aspect-[4/5] lg:aspect-auto bg-slate-950">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" alt="The Struggle of Manual Measurement" className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-transparent to-red-600/20"></div>
            <div className="absolute bottom-12 left-12">
               <div className="px-6 py-2 bg-red-600/20 border border-red-500/50 rounded-xl text-red-400 font-black text-xs uppercase mb-4 tracking-widest">Inefficient Method</div>
               <h3 className="text-4xl font-black text-white">45-Minute Sessions. <br /> Human Errors. <br /> Costly Re-works.</h3>
            </div>
          </div>
          <div className="space-y-16">
            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-none">Traditional <br /> Methods are <br /> <span className="text-red-600">Obsolete.</span></h2>
            <div className="space-y-12">
              {[
                { text: "Tape measurements vary by 2-5cm per session", icon: AlertCircle, color: "text-red-400" },
                { text: "High client drop-off due to length of fitting", icon: Users, color: "text-orange-400" },
                { text: "Manual data entry is prone to transcription error", icon: Database, color: "text-yellow-400" },
                { text: "Logistical nightmare for global bespoke orders", icon: Globe, color: "text-blue-400" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-8 group">
                  <div className={`w-16 h-16 rounded-[2rem] bg-slate-900 border border-white/5 flex items-center justify-center ${item.color} shadow-2xl group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold leading-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.text}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className={`py-60 px-4 border-y border-white/5 ${isDarkMode ? 'bg-slate-900/20' : 'bg-blue-50/30'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-sm font-semibold text-blue-400 mb-12">
            <Cpu className="w-4 h-4" />
            <span className="tracking-tight uppercase text-xs">Spatial Neural Architecture</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter uppercase leading-none">THE NEURAL <br /> SOLUTION.</h2>
          <p className={`text-2xl max-w-4xl mx-auto mb-24 font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Our proprietary Photometry-to-Mesh algorithm reconstructs a high-fidelity 3D human model from a standard photo, extracting every metric instantly.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
             {[
               { title: "One-Click Scan", desc: "No sensors needed. Just any smartphone camera.", icon: Camera, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800" },
               { title: "99.8% Precision", desc: "Sub-millimeter accuracy for surgical precision.", icon: Target, img: "https://images.unsplash.com/photo-1594932224828-b4b059b6f6f9?auto=format&fit=crop&q=80&w=800" },
               { title: "Instant Pattern", desc: "Directly export to CAD or manual block tools.", icon: Ruler, img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800" }
             ].map((sol, i) => (
               <div key={i} className={`p-2 rounded-[3.5rem] border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-white shadow-xl'}`}>
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden mb-10 relative">
                    <img src={sol.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" />
                    <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="px-10 pb-12">
                    <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-400 mx-auto mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all"><sol.icon className="w-10 h-10" /></div>
                    <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter">{sol.title}</h4>
                    <p className={`font-medium text-lg leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{sol.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className={`py-40 px-12 border-t border-white/5 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950/80 backdrop-blur-3xl' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                 <Scissors className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">TailorAI</h3>
            </div>
            <p className={`text-lg font-medium leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              Revolutionizing the bespoke fashion industry with precision neural reconstruction. The digital bridge between tradition and future.
            </p>
            <div className="flex items-center space-x-6">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, idx) => (
                <button key={idx} className={`p-4 rounded-2xl transition-all hover:scale-110 ${isDarkMode ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-blue-600 shadow-md'}`}>
                  <Icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-12 text-blue-500">Product Protocol</h4>
            <ul className={`space-y-6 text-lg font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> Neural Scanning
              </li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> CAD Integration
              </li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> Enterprise API
              </li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> Security Sharding
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-12 text-blue-500">Company Grid</h4>
            <ul className={`space-y-6 text-lg font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> Vision Statement
              </li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> Master Artisans
              </li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> Neural Lab
              </li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center group">
                <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" /> Careers Node
              </li>
            </ul>
          </div>

          <div className="space-y-12">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">Initialize Updates</h4>
            <p className={`text-lg font-medium leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
              Receive the latest neural updates and atelier insights.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="tailor@atelier.com" 
                className={`w-full p-6 rounded-2xl outline-none border transition-all ${isDarkMode ? 'bg-slate-900 border-white/5 focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500 shadow-sm'}`} 
              />
              <button className="absolute right-2 top-2 p-4 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-all active:scale-95">
                <Mail className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">© 2024 TailorAI Inc. Neural Reconstruction Protocol Active.</p>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Shield</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security Audit</span>
            <span className="hover:text-white cursor-pointer transition-colors">Status: Nominal</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
