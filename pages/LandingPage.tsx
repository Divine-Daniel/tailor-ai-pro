
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, Play, Box, Scissors, Plus, Star, ArrowRight,
  Ruler, Users, Lightbulb, FileText, Hammer, Lock, Shield, 
  Clock, Award, Layout, BookOpen, Database, X, Sparkles,
  Camera, Globe, Cpu, Smartphone, Check, HelpCircle,
  AlertCircle, Target, Shirt, ShoppingBag, Layers,
  Activity, Thermometer, Briefcase, Sun, Moon, Instagram,
  Twitter, Linkedin, Github, Mail, Facebook, ChevronLeft,
  ShieldCheck, Zap, Download, Menu, CheckCircle2
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
      subtitle: "Precision Neural Reconstruction v2.0"
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

    // Neural Background Animation
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
        <Skeleton className="h-10 w-64 rounded-full mx-auto" />
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8"><Skeleton className="h-40" /><Skeleton className="h-20" /><Skeleton className="h-16 w-48" /></div>
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
      
      {/* 1. Hero Section (Split Layout) */}
      <section className="min-h-screen flex items-center pt-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="z-10 animate-in fade-in slide-in-from-left-10 duration-1000 text-left">
            <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-sm font-semibold text-blue-400 mb-10 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="tracking-tight uppercase text-xs">{heroSlides[currentSlide].subtitle}</span>
            </div>
            <h1 className="text-5xl md:text-[6.5rem] font-black leading-[0.9] mb-8 bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent dark:from-white dark:via-white dark:to-white/40 tracking-tighter uppercase">
              {heroSlides[currentSlide].title}
            </h1>
            <p className={`text-xl md:text-2xl mb-12 max-w-xl font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Revolutionary Photometry-to-Mesh protocol for master tailors. Generate accurate biometric patterns in under 4 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg transition-all transform hover:scale-105 shadow-2xl active:scale-95"
              >
                Get Started Free
              </button>
              <button className={`w-full sm:w-auto px-12 py-5 rounded-2xl border border-slate-700/50 font-bold text-lg transition-all flex items-center justify-center space-x-3 backdrop-blur-xl group ${isDarkMode ? 'bg-slate-900/60 text-white hover:bg-slate-800' : 'bg-white text-slate-900 shadow-md hover:bg-slate-50'}`}>
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl bg-slate-950 aspect-[4/5] md:aspect-[4/3]">
              {heroSlides.map((slide, idx) => (
                <img 
                  key={idx}
                  src={slide.img} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-80' : 'opacity-0'}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                 {heroSlides.map((_, i) => (
                   <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 transition-all duration-300 rounded-full ${currentSlide === i ? 'w-12 bg-blue-600' : 'w-6 bg-white/20'}`} />
                 ))}
              </div>
            </div>
            {/* Floating Metric Card */}
            <div className={`absolute -bottom-6 -left-6 md:-left-12 p-6 rounded-3xl border border-white/10 shadow-3xl hidden md:block animate-bounce-slow ${isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-xl`}>
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500"><CheckCircle2 className="w-6 h-6" /></div>
                  <div><p className="text-[10px] font-black uppercase text-slate-500">Neural Accuracy</p><p className="text-xl font-black">99.85%</p></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl aspect-square bg-slate-950">
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-red-600/20"></div>
          </div>
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Manual Measuring is <span className="text-red-500">History.</span></h2>
            <div className="space-y-8">
              {[{ t: "Average 45 mins per client session", i: Clock }, { t: "±3cm margin for human error", i: AlertCircle }, { t: "Expensive physical pattern storage", i: Database }].map((p, idx) => (
                <div key={idx} className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform"><p.i className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold">{p.t}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className={`py-40 px-6 border-y border-white/5 ${isDarkMode ? 'bg-slate-900/20' : 'bg-blue-50/30'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase">The Neural Solution</h2>
          <p className="text-xl max-w-3xl mx-auto mb-20 opacity-60 font-medium">Standard photometry data converted into a surgical-grade 3D biometric mesh in milliseconds.</p>
          <div className="grid md:grid-cols-3 gap-10">
             {[
               { t: "Fast Scan", d: "One photo, zero hardware.", i: Camera },
               { t: "Precision AI", d: "99.8% anatomical accuracy.", i: Target },
               { t: "CAD Direct", d: "Export to block patterns instantly.", i: Ruler }
             ].map((s, i) => (
               <div key={i} className={`p-10 rounded-[3rem] border border-white/5 transition-all group ${isDarkMode ? 'bg-slate-950' : 'bg-white shadow-xl hover:shadow-2xl'}`}>
                 <div className="w-20 h-20 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all"><s.i className="w-10 h-10" /></div>
                 <h4 className="text-2xl font-black uppercase mb-4">{s.t}</h4>
                 <p className="opacity-60">{s.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works (Protocol) */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-center mb-32 tracking-tighter uppercase">The Protocol.</h2>
          <div className="grid md:grid-cols-4 gap-12 relative">
             <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-white/5"></div>
             {[{ s: "01", t: "Upload" }, { s: "02", t: "Reconstruct" }, { s: "03", t: "Calibrate" }, { s: "04", t: "Cut" }].map((step, i) => (
               <div key={i} className="text-center group relative">
                 <div className="text-6xl font-black text-slate-800 mb-8 group-hover:text-blue-500 transition-colors">{step.s}</div>
                 <div className="w-24 h-24 bg-slate-900 rounded-[2rem] border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                   <div className="w-8 h-8 bg-blue-600 rounded-full" />
                 </div>
                 <h4 className="text-xl font-black uppercase">{step.t}</h4>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Core Features */}
      <section className={`py-40 px-6 ${isDarkMode ? 'bg-slate-900/10' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-center mb-32 tracking-tighter uppercase">Core Modules.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Virtual Draping", i: Shirt, d: "Simulate fit for 500+ fabric types." },
              { t: "Anatomy Heatmap", i: Target, d: "Identify pressure points instantly." },
              { t: "Fabric Yield AI", i: Hammer, d: "Optimize yardage, zero waste." },
              { t: "3D Cloud Vault", i: Database, d: "Securely store client mesh data." },
              { t: "Global Sync", i: Globe, d: "Scan in London, tailor in Milan." },
              { t: "Enterprise API", i: ShieldCheck, d: "Integrate with your existing ERP." }
            ].map((f, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border border-white/5 transition-all hover:border-blue-500/30 ${isDarkMode ? 'bg-slate-950' : 'bg-white shadow-lg'}`}>
                <f.i className="w-12 h-12 text-blue-500 mb-8" />
                <h4 className="text-2xl font-black uppercase mb-4">{f.t}</h4>
                <p className="opacity-60">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trust & Credibility */}
      <section className="py-32 px-6 border-y border-white/5 opacity-40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-16 items-center">
          <span className="text-2xl md:text-4xl font-black tracking-widest uppercase grayscale hover:grayscale-0 transition-all">Savile Row Academy</span>
          <span className="text-2xl md:text-4xl font-black tracking-widest uppercase grayscale hover:grayscale-0 transition-all">Milan Design Institute</span>
          <span className="text-2xl md:text-4xl font-black tracking-widest uppercase grayscale hover:grayscale-0 transition-all">Paris Fashion Hub</span>
        </div>
      </section>

      {/* 9. Visual Demo */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl bg-slate-950 relative group">
             <img src="https://images.unsplash.com/photo-1520004434532-668416a08753?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[4s]" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-3xl cursor-pointer hover:scale-110 transition-transform"><Play className="w-8 h-8 fill-current ml-1" /></div>
                <h3 className="text-4xl font-black mt-10 uppercase">Neural Interface v2.0</h3>
             </div>
          </div>
        </div>
      </section>

      {/* 10. Benefits vs Traditional */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-center mb-32 tracking-tighter uppercase leading-none">The Competitive Edge.</h2>
          <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl">
            <div className={`p-16 ${isDarkMode ? 'bg-slate-950/80' : 'bg-slate-200/50'}`}>
               <h4 className="text-2xl font-black text-slate-500 mb-10 uppercase tracking-widest">Manual Method</h4>
               <ul className="space-y-6 font-bold opacity-60">
                 <li className="flex items-center"><X className="w-5 h-5 mr-4 text-red-500" /> 45 minutes / scan</li>
                 <li className="flex items-center"><X className="w-5 h-5 mr-4 text-red-500" /> ±5cm inaccuracy</li>
                 <li className="flex items-center"><X className="w-5 h-5 mr-4 text-red-500" /> Physical data siloes</li>
               </ul>
            </div>
            <div className="p-16 bg-blue-600/10">
               <h4 className="text-2xl font-black text-blue-500 mb-10 uppercase tracking-widest">TailorAI Neural</h4>
               <ul className="space-y-6 font-bold">
                 <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-4 text-emerald-500" /> 3 seconds / scan</li>
                 <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-4 text-emerald-500" /> 99.8% precision</li>
                 <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-4 text-emerald-500" /> Global cloud sync</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQs */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-center mb-32 tracking-tighter uppercase">FAQs.</h2>
          <div className="space-y-6">
            {[
              { q: "How accurate is the 3D mesh?", a: "Our proprietary algorithm provides 99.8% anatomical accuracy compared to master tailors." },
              { q: "Is it secure for clients?", a: "Yes. All biometric data is end-to-end encrypted and stripped of personal ID markers." },
              { q: "What hardware is required?", a: "None. Just a standard smartphone camera with 1080p resolution." }
            ].map((faq, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border border-white/5 ${isDarkMode ? 'bg-slate-950' : 'bg-white shadow-md'}`}>
                <h5 className="text-xl font-black mb-4 uppercase flex items-center"><HelpCircle className="w-6 h-6 mr-3 text-blue-500" /> {faq.q}</h5>
                <p className="opacity-60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Pricing Preview */}
      <section className={`py-40 px-6 border-y border-white/5 ${isDarkMode ? 'bg-slate-900/20' : 'bg-blue-50/20'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-center mb-32 tracking-tighter uppercase">Plans.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "Independent", p: "49", d: "For solo artisans." },
              { n: "Professional", p: "149", d: "For full design ateliers.", pop: true },
              { n: "Enterprise", p: "Custom", d: "For luxury fashion houses." }
            ].map((p, i) => (
              <div key={i} className={`p-12 rounded-[4rem] border transition-all ${p.pop ? 'bg-blue-600 border-blue-400 shadow-3xl scale-105' : 'bg-slate-950 border-white/5'}`}>
                 <h4 className="text-2xl font-black uppercase mb-2">{p.n}</h4>
                 <div className="flex items-baseline mb-8">
                    <span className="text-6xl font-black">${p.p}</span>
                    {p.p !== "Custom" && <span className="text-xl ml-2 opacity-50">/mo</span>}
                 </div>
                 <p className="opacity-60 mb-12">{p.d}</p>
                 <button className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest ${p.pop ? 'bg-white text-blue-600 shadow-xl' : 'bg-blue-600 text-white'}`}>Select Protocol</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Blog / Insights */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-center mb-32 tracking-tighter uppercase">Insights.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden mb-8 border border-white/10 shadow-xl bg-slate-950">
                  <img src={`https://images.unsplash.com/photo-1594932224828-b4b059b6f6f9?auto=format&fit=crop&q=80&w=800&sig=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60" />
                </div>
                <h4 className="text-2xl font-black group-hover:text-blue-500 transition-colors uppercase tracking-tighter">The Future of AI Fit v3.0</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call-to-Action */}
      <section className="py-80 px-6 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-[9rem] font-black mb-16 tracking-tighter uppercase leading-[0.8]">INITIALIZE <br /> ATELIER.</h2>
          <button 
            onClick={onGetStarted}
            className="px-16 py-7 rounded-[2.5rem] bg-blue-600 hover:bg-blue-500 text-white font-black text-2xl transition-all shadow-3xl hover:scale-105 active:scale-95"
          >
            Deploy Protocol Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-40 px-12 border-t border-white/5 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950/90' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="space-y-8">
            <h3 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">TailorAI</h3>
            <p className="opacity-60 text-lg font-medium">Revolutionizing bespoke fashion with high-precision neural reconstruction engines.</p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Instagram].map((I, idx) => (
                <button key={idx} className="p-4 rounded-xl bg-slate-900 border border-white/5 hover:bg-blue-600 transition-all shadow-lg"><I className="w-5 h-5 text-slate-400" /></button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-10">Protocol</h4>
            <ul className="space-y-4 font-bold opacity-60"><li>Neural Scanning</li><li>CAD Mapping</li><li>API Bridge</li></ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-10">Company</h4>
            <ul className="space-y-4 font-bold opacity-60"><li>Our Vision</li><li>Security Hub</li><li>Atelier Partners</li></ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Updates</h4>
            <div className="relative">
              <input type="email" placeholder="tailor@atelier.com" className="w-full p-6 rounded-2xl bg-slate-900 border border-white/5 outline-none" />
              <button className="absolute right-2 top-2 p-4 bg-blue-600 rounded-xl"><Mail className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-40 pt-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-widest opacity-40">
          © 2024 TailorAI Inc. Built for Master Artisans.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
