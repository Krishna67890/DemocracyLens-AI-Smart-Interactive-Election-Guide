import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Vote, LayoutDashboard, HelpCircle, Map, Info, ChevronRight, Mic, Send, ShieldCheck, Landmark } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import JourneyMap from './components/JourneyMap';
import AIMentor from './components/AIMentor';
import EVMSimulator from './components/EVMSimulator.jsx';
import Timeline from './components/Timeline';
import RoleAdventure from './components/RoleAdventure';
import QuickFacts from './components/QuickFacts';
import About from './components/About';
import AuthModal from './components/AuthModal';
import Profile from './components/Profile';
import DocumentVerifier from './components/DocumentVerifier';
import { useAuth } from './context/AuthContext';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDocumentVerifierOpen, setIsDocumentVerifierOpen] = useState(false);
  const { user, updateProgress } = useAuth();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (user) {
      setXp(user.xp || 0);
      setLevel(user.level || 1);
    }
  }, [user]);

  const addXP = (amount) => {
    if (user) {
      updateProgress(amount);
    } else {
      setXp(prev => {
        const newXp = prev + amount;
        const newLevel = Math.floor(newXp / 500) + 1;
        if (newLevel > level) setLevel(newLevel);
        return newXp;
      });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-gradient text-gray-100 selection:bg-cyber-purple selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-blue/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-purple/10 blur-[120px] rounded-full animate-pulse-slow"></div>
      </div>

      <Navigation
        level={level}
        xp={xp}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      <main className="relative z-10 pt-20 px-4 md:px-8 max-w-7xl mx-auto space-y-32 pb-20">
        <Hero onStart={() => user ? document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }) : setIsAuthModalOpen(true)} onVerifyDocuments={() => {
          console.log('Setting document verifier modal to open');
          setIsDocumentVerifierOpen(true);
        }} />

        {user ? (
          <>
            <section id="journey" className="scroll-mt-24">
              <JourneyMap onCompleteStep={(points) => addXP(points)} />
            </section>

            <section id="adventure" className="scroll-mt-24">
              <RoleAdventure onExperienceGained={addXP} />
            </section>

            <section id="simulator" className="scroll-mt-24">
              <EVMSimulator onVoteCast={() => addXP(150)} />
            </section>

            <section id="facts" className="scroll-mt-24">
              <QuickFacts />
            </section>

            <section id="timeline" className="scroll-mt-24">
              <Timeline />
            </section>
          </>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="py-20 text-center glass rounded-[3rem] border border-white/10 max-w-4xl mx-auto overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5"></div>
            <div className="relative z-10 p-12">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
                <ShieldCheck className="w-10 h-10 text-cyber-blue animate-pulse" />
              </div>
              <h2 className="text-4xl font-black mb-6 font-orbitron tracking-tight">Access <span className="text-cyber-blue">Portal Locked</span></h2>
              <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                Our high-fidelity civic simulations and real-time 2026 data require an authenticated identity for session persistence and XP tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-10 py-4 bg-cyber-blue text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-105 transition-all"
                >
                  Sign In / Register
                </button>
              </div>
            </div>
          </motion.section>
        )}

        <About />
      </main>

      {user && (
        <AIMentor
          onQuery={() => addXP(20)}
          onAction={(action) => {
            if (action === 'open-login') setIsAuthModalOpen(true);
            if (action === 'open-profile') setIsProfileOpen(true);
            if (action === 'scroll-evm') document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
            if (action === 'scroll-journey') document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* For anonymous users to still have access to the Voice Guide/About Us */}
      {!user && (
        <AIMentor
          onQuery={() => {}}
          onAction={(action) => {
            if (action === 'open-login') setIsAuthModalOpen(true);
            if (action === 'scroll-facts') document.getElementById('facts')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        )}
        {isProfileOpen && (
          <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        )}
        {isDocumentVerifierOpen && (
          <DocumentVerifier onClose={() => setIsDocumentVerifierOpen(false)} />
        )}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/10 py-10 glass">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Landmark className="text-cyber-blue w-6 h-6" />
            <span className="font-orbitron font-bold text-lg text-white">
              Democracy<span className="text-cyber-blue">Lens</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm">&copy; 2026 DemocracyLens AI. Built for Hack2skill Challenge. 2026</p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const text = "🗳️ Master the elections with DemocracyLens AI! Futuristic civic education with AI Mentors and EVM Simulators. \n\nJoin the revolution: " + window.location.href;
                if (navigator.share) {
                  navigator.share({ title: 'DemocracyLens AI', text: text, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(text);
                  alert("Link copied to clipboard!");
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-cyber-blue/20 rounded-xl text-xs font-bold transition-all border border-white/10"
            >
              <Send className="w-3 h-3" /> Share Platform
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
