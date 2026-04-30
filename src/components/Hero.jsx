import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight, Landmark } from 'lucide-react';

const Hero = ({ onStart, onVerifyDocuments }) => {
  return (
    <section className="relative pt-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="px-4 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue text-xs font-bold uppercase tracking-widest mb-6 inline-block">
          Next-Gen Civic Education
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[1.1]">
          CLARIFY THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-white to-cyber-purple glitch">
            FUTURE VOTE
          </span>
        </h1>
        <p className="max-w-2xl text-gray-400 text-base md:text-xl mb-10 mx-auto px-4">
          Overcome voter anxiety and misinformation. Master the election process through
          AI-driven simulations, roleplay adventures, and real-time guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-4 bg-cyber-blue text-black font-bold rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.4)]"
          >
            Launch Election Simulator <ChevronRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onClick={() => {
              console.log('Verify Documents button clicked');
              onVerifyDocuments();
            }}
            className="px-8 py-4 border border-white/20 rounded-xl font-bold flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-cyber-purple" /> Verify My Documents
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-20 relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
        <img
          src="https://images.unsplash.com/photo-1540910419892-f0e6d2bb18a2?q=80&w=2070"
          alt="Abstract Election Visual"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-cyber-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Landmark className="w-10 h-10 text-cyber-blue" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Interactive Simulation Mode</h3>
            <p className="text-gray-400 text-sm">Step into a virtual polling booth and practice your right.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
