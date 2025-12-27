import React, { useState } from 'react';
import { 
  CheckCircle2, ChevronRight, Play, Upload, BarChart, 
  Box, Scissors, FileDown, ShieldCheck, Mail, Info, 
  Plus, Minus, Star, ArrowRight, UserCheck, Zap, Repeat,
  Ruler, Users, Lightbulb, FileText, Hammer, Lock, Shield, 
  Clock, Award, Layout, BookOpen, Database, X, Sparkles,
  Camera, Globe, Cpu, Smartphone, Check, HelpCircle
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  return (
    <div className="relative selection:bg-blue-500/30">
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center overflow-hidden relative">
        <div className="max-w-5xl mx-auto z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-sm font-semibold text-blue-400 mb-10 shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-tight uppercase text-xs">Precision Engineering for Modern Ateliers</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] mb-10 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent tracking-tighter">
            Get Perfect Client Measurements From Just a Photo.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
            TailorAI uses artificial intelligence to generate accurate body measurements from full-body photos — saving tailors time, reducing errors, and improving fit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onGetStarted}
              className="px-12 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg transition-all transform hover:scale-105 shadow-[0_15px_40px_-10px_rgba(37,99,235,0.5)] active:scale-95"
            >
              Get Started Free
            </button>
            <button className="px-12 py-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 text-white font-bold text-lg transition-all flex items-center space-x-3 backdrop-blur-xl group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Play className="w-4 h-4 text-white fill-current ml-0.5" />
              </div>
              <span>See How It Works</span>
            </button>
          </div>
        </div>
        
        <div className="mt-28 relative w-full max-w-6xl mx-auto px-4 perspective-1000 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] group">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2000" 
              alt="TailorAI 3D Scanning Interface" 
              className="w-full h-auto opacity-90 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-40 px-4 bg-slate-950/40 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200" alt="Manual Measuring Frustrations" className="w-full h-auto grayscale opacity-50 contrast-125" />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-blue-600/10"></div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-12 leading-[1.1] tracking-tighter">Measuring Clients Is Slow, Stressful, and Error-Prone.</h2>
            <div className="space-y-10">
              {[
                { text: "Manual measurements take too long", icon: Clock },
                { text: "Clients move or get tired", icon: Users },
                { text: "Inconsistent results between tailors", icon: Repeat },
                { text: "Re-sewing costs time and money", icon: Scissors }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 transition-all group-hover:text-white">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-200">{item.text}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className="py-40 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">One Photo. Accurate Measurements. Better Fits.</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              TailorAI analyzes a client’s full-body photo using advanced AI to generate a complete, editable measurement chart in seconds.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "No tape measure required", icon: Ruler },
              { title: "Consistent, repeatable accuracy", icon: CheckCircle2 },
              { title: "Works for men and women", icon: Users },
              { title: "Designed for professional tailors", icon: Award },
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all text-center group">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 mx-auto mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-40 px-4 bg-blue-600/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-24 tracking-tighter">How TailorAI Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Upload Photo", desc: "Upload a client’s full-body photo from any smartphone or camera.", icon: Upload },
              { step: "02", title: "AI Analysis", desc: "TailorAI analyzes body proportions using proprietary algorithms.", icon: Cpu },
              { step: "03", title: "Get Report", desc: "Get a complete measurement report including chest, waist, hips, and more.", icon: FileText },
              { step: "04", title: "Save & Edit", desc: "Save, edit, or download instantly to start your pattern drafting.", icon: FileDown },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-8xl font-black text-blue-500/10 absolute -top-10 -left-6 group-hover:text-blue-500/20 transition-colors">{item.step}</div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section className="py-40 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-24 tracking-tighter">Everything You Need to Measure Smarter</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI Body Measurement Extraction", icon: Ruler, desc: "Ultra-fast extraction of 50+ points." },
              { title: "Client Profile Management", icon: Users, desc: "Keep track of measurement history and orders." },
              { title: "3D Body Preview", icon: Box, desc: "Visualize the client's anatomy in a high-fidelity 3D space." },
              { title: "Fabric Quantity Estimator", icon: Hammer, desc: "Calculate exactly how much material you need." },
              { title: "AI Style Suggestions", icon: Lightbulb, desc: "Recommend styles that suit the client's silhouette." },
              { title: "PDF Measurement Downloads", icon: FileDown, desc: "Professional reports ready for the workshop floor." },
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[3rem] bg-slate-900/60 border border-white/10 hover:border-blue-500/30 transition-all group">
                <item.icon className="w-12 h-12 text-blue-500 mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Who It's For Section */}
      <section className="py-40 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">Built for Modern Tailors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Fashion designers", "Bespoke tailors", "Alteration shops", 
                "Sewing studios", "Clothing brands", "Costume designers"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" alt="Professional Bespoke Tailor" className="rounded-[3rem] shadow-2xl border border-white/10" />
            <div className="absolute inset-0 bg-blue-600/10 rounded-[3rem]"></div>
          </div>
        </div>
      </section>

      {/* 7. Trust & Credibility Section */}
      <section className="py-40 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">Designed With Accuracy, Privacy, and Security in Mind</h2>
          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {[
              { title: "Secure image storage", icon: Lock, desc: "End-to-end encryption for all uploaded media." },
              { title: "Your data is never shared", icon: Shield, desc: "Strict privacy protocols that keep your business private." },
              { title: "Built on Supabase", icon: Database, desc: "Enterprise-grade infrastructure for 99.9% uptime." },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-8">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Visual Demo Section */}
      <section className="py-40 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">See TailorAI in Action</h2>
          <p className="text-2xl text-slate-400 mb-20 font-medium">From upload to measurement in seconds.</p>
          <div className="aspect-video w-full rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative bg-slate-900 group">
             <img src="https://images.unsplash.com/photo-1520004434532-668416a08753?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" alt="Demo UI" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-3xl cursor-pointer hover:scale-110 transition-transform">
                   <Play className="w-12 h-12 text-white fill-current ml-2" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 11. Benefits vs Traditional Method */}
      <section className="py-40 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-24 tracking-tighter">Why TailorAI Beats Manual Measuring</h2>
          <div className="rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900/60 shadow-2xl">
             <table className="w-full text-left">
                <thead>
                   <tr className="border-b border-white/10">
                      <th className="p-10 text-xl font-bold text-slate-500">Feature</th>
                      <th className="p-10 text-xl font-bold text-slate-500">Manual</th>
                      <th className="p-10 text-xl font-bold text-blue-500 bg-blue-500/5">TailorAI</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                      { f: "Processing Time", m: "30-45 Minutes", t: "Instant (Seconds)" },
                      { f: "Error Probability", m: "High (Human Error)", t: "AI-Assisted (Ultra Low)" },
                      { f: "Consistency", m: "Varies by Tailor", t: "100% Consistent" },
                      { f: "Client Stress", m: "High (Long Standing)", t: "Low (One Photo)" }
                   ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                         <td className="p-10 font-bold text-slate-300">{row.f}</td>
                         <td className="p-10 text-slate-500">{row.m}</td>
                         <td className="p-10 font-black text-white bg-blue-500/5">{row.t}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </section>

      {/* 14. Pricing Preview Section */}
      <section className="py-40 px-4 bg-blue-600/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Simple Pricing That Grows With You</h2>
            <p className="text-xl text-slate-400">Choose the plan that fits your atelier's output.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Solo", price: "$49", desc: "For independent bespoke tailors." },
              { name: "Atelier", price: "$149", desc: "For professional design studios.", popular: true },
              { name: "Enterprise", price: "Custom", desc: "For global luxury brands." },
            ].map((plan, i) => (
              <div key={i} className={`p-12 rounded-[3.5rem] border transition-all ${plan.popular ? 'bg-blue-600 border-blue-400 shadow-2xl scale-105' : 'bg-slate-900 border-white/5 hover:border-white/20'}`}>
                {plan.popular && <div className="inline-block px-4 py-1 bg-white text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                   <span className="text-5xl font-black">{plan.price}</span>
                   {plan.price !== "Custom" && <span className="text-lg opacity-60 ml-2">/mo</span>}
                </div>
                <p className={`mb-10 font-medium ${plan.popular ? 'text-blue-50' : 'text-slate-400'}`}>{plan.desc}</p>
                <button className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${plan.popular ? 'bg-white text-blue-600 hover:scale-105' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQs Section */}
      <section className="py-40 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-24 tracking-tighter">FAQs</h2>
          <div className="space-y-6">
            {[
              { q: "How accurate is TailorAI?", a: "TailorAI consistently achieves over 99% accuracy in comparative tests against master tailors, with a typical margin of error under 0.5cm." },
              { q: "What photo is required?", a: "One front-facing full body photo and one side-profile photo in well-lit conditions with relatively fitted clothing." },
              { q: "Can I edit measurements?", a: "Absolutely. All AI-generated data is fully editable, allowing you to apply custom tolerances and style adjustments." },
              { q: "Is my data safe?", a: "Yes. We use military-grade encryption and never share or sell your client's imagery or biometric data." }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/20 transition-all">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 text-blue-500 mr-3" /> {faq.q}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Blog / Education Section */}
      <section className="py-40 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
             <div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Learning Tailoring Technology</h2>
                <p className="text-xl text-slate-400">Discover how AI is transforming the bespoke fashion industry.</p>
             </div>
             <button className="flex items-center space-x-2 text-blue-500 font-black uppercase text-sm tracking-widest hover:text-blue-400 transition-colors">
                <span>View All Articles</span> <ArrowRight className="w-4 h-4" />
             </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&q=80&w=800", title: "The Future of Custom Clothing", date: "Oct 12, 2024" },
              { img: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=800", title: "AI in Pattern Drafting", date: "Oct 08, 2024" },
              { img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", title: "Reducing Fabric Waste", date: "Sep 28, 2024" }
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 border border-white/5">
                   <img src={blog.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                </div>
                <p className="text-blue-500 font-black uppercase text-[10px] tracking-widest mb-4">{blog.date}</p>
                <h3 className="text-2xl font-black group-hover:text-blue-400 transition-colors mb-2">{blog.title}</h3>
                <p className="text-slate-500 font-medium">Read more about this technological breakthrough...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Testimonials (Enhanced Stage) */}
      <section className="py-40 px-4">
        <div className="max-w-6xl mx-auto bg-blue-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10"><Scissors className="w-64 h-64 rotate-12" /></div>
          <div className="relative z-10">
            <div className="flex justify-center space-x-1 mb-10 text-white">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-12 tracking-tighter">
              “TailorAI reduced my measurement time by 70%. It's the biggest technological jump my shop has ever made.”
            </p>
            <div>
              <p className="text-xl font-black text-white">Alessandro Rossi</p>
              <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mt-1">Creative Director, Rossi Bespoke</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Primary Call-to-Action Section */}
      <section className="py-60 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter">Start Measuring Smarter Today</h2>
          <button 
            onClick={onGetStarted}
            className="px-16 py-7 rounded-3xl bg-blue-600 hover:bg-blue-500 text-white font-black text-2xl transition-all shadow-[0_20px_60px_-15px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95"
          >
            Create Free Account
          </button>
          <p className="mt-8 text-slate-500 font-bold uppercase text-sm tracking-widest flex items-center justify-center">
            <Check className="w-4 h-4 mr-2" /> No credit card required.
          </p>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="py-32 px-8 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Scissors className="w-6 h-6 text-white" />
                 </div>
                 <h2 className="text-3xl font-black tracking-tighter">TailorAI</h2>
              </div>
              <p className="text-slate-500 text-lg max-w-sm mb-10 font-medium leading-relaxed">The future of bespoke tailoring is digital. Join thousands of master tailors already using our AI core.</p>
              <div className="flex space-x-6">
                <Mail className="w-6 h-6 text-slate-700 hover:text-blue-500 cursor-pointer transition-colors" />
                <Globe className="w-6 h-6 text-slate-700 hover:text-blue-500 cursor-pointer transition-colors" />
                <Smartphone className="w-6 h-6 text-slate-700 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-black mb-10 uppercase text-xs tracking-widest">Platform</h3>
              <ul className="space-y-6 text-slate-500 font-bold">
                <li className="hover:text-blue-500 cursor-pointer transition-colors">AI Measurements</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">3D Visualization</li>
                <li onClick={() => setIsFeatureModalOpen(true)} className="hover:text-blue-500 cursor-pointer transition-colors text-blue-400">Request Feature</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Partner Program</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-black mb-10 uppercase text-xs tracking-widest">Resources</h3>
              <ul className="space-y-6 text-slate-500 font-bold">
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">API Docs</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-700 text-[10px] font-black uppercase tracking-widest">
            <p>© 2024 TailorAI Inc. Built on Supabase infrastructure.</p>
            <div className="flex items-center space-x-8">
               <span>ENCRYPTED PORTAL</span>
               <span>GDPR COMPLIANT</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Feature Request Modal */}
      {isFeatureModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-12 max-w-xl w-full shadow-3xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Feature Request</h2>
              <button onClick={() => setIsFeatureModalOpen(false)}><X className="w-8 h-8 text-slate-500 hover:text-white" /></button>
            </div>
            <p className="text-slate-400 mb-10">Describe the technological advancement you want to see in TailorAI.</p>
            <div className="space-y-6">
              <input type="text" placeholder="Title of suggestion" className="w-full bg-slate-800 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="Tell us how this would transform your atelier's workflow..." className="w-full bg-slate-800 border border-white/5 p-5 rounded-2xl text-white font-medium h-40 outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => setIsFeatureModalOpen(false)} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Submit Neural Proposal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
