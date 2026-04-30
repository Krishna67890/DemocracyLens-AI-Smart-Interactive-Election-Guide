import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Cpu, Database, Layout, Sparkles, Terminal, Code2, Rocket, BrainCircuit, Globe } from 'lucide-react';
import krishnaPhoto from '../../assets/Krishna Patil Rajput.jpg';

const About = () => {
  const techStack = [
    { name: 'React 18', icon: <Layout className="w-5 h-5 text-cyber-blue" />, desc: 'Vite-powered modular architecture' },
    { name: 'Framer Motion', icon: <Sparkles className="w-5 h-5 text-cyber-purple" />, desc: 'Physics-based interaction layer' },
    { name: 'Tailwind CSS', icon: <Cpu className="w-5 h-5 text-green-400" />, desc: 'Atomic design system for Cyber-Civic UI' },
    { name: 'Prompt Engineering', icon: <Terminal className="w-5 h-5 text-red-400" />, desc: 'CoT & Few-Shot logic orchestration' },
  ];

  const journey = [
    { step: 'Conceptualization', desc: 'Identified the 968M voter information gap.', icon: <Code2 className="w-4 h-4" /> },
    { step: 'AI Logic Mapping', desc: 'Developed the Chain-of-Thought mentor engine.', icon: <Terminal className="w-4 h-4" /> },
    { step: 'Simulator Beta', desc: 'Built the first 7-second VVPAT verification logic.', icon: <Database className="w-4 h-4" /> },
    { step: 'Challenge 2 Entry', desc: 'Final deployment for Hack2skill PromptWars.', icon: <Rocket className="w-4 h-4" /> },
  ];

  return (
    <section id="about" className="py-24 scroll-mt-24 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-cyber-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
        {/* Left: Project Vision & Journey */}
        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyber-blue font-orbitron text-sm tracking-widest uppercase flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" /> The Mission
            </span>
            <h2 className="text-4xl md:text-6xl font-black mt-2 mb-6 tracking-tighter leading-tight">
              Architecting the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">Civic-Tech Revolution</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg max-w-xl">
              DemocracyLens AI is a high-fidelity educational platform designed for <strong>Virtual PromptWars Challenge 2</strong>.
              Our mission is to replace voter anxiety with confidence through AI-driven simulations that adhere to
              official ECI guidelines and constitutional frameworks.
            </p>
          </motion.div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold font-orbitron flex items-center gap-2">
              <span className="w-8 h-px bg-cyber-blue"></span> Development Journey
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-4 rounded-2xl border-white/5 flex gap-4 items-start group hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  <div className="mt-1 p-2 bg-white/5 rounded-lg text-cyber-blue group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-cyber-blue transition-colors">{item.step}</div>
                    <div className="text-xs text-gray-500 mt-1 leading-snug">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Developer Bento Box */}
        <div className="w-full lg:w-[450px] space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2rem] border-white/10 text-center relative overflow-hidden group shadow-2xl"
          >
            {/* Animated border/glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-tr from-cyber-blue to-cyber-purple rounded-full mx-auto mb-6 p-1 shadow-[0_0_30px_rgba(0,210,255,0.2)]">
                <div className="w-full h-full bg-cyber-dark rounded-full flex items-center justify-center border-4 border-cyber-dark overflow-hidden">
                   <img src={krishnaPhoto} alt="Krishna Patil Rajput" className="w-full h-full object-cover" />
                </div>
              </div>

              <h3 className="text-2xl font-black tracking-tight group-hover:text-cyber-blue transition-colors">Krishna Patil Rajput</h3>
              <p className="text-cyber-blue text-xs uppercase tracking-[0.3em] font-bold mt-2">Lead AI Architect & Full-Stack Developer</p>

              <div className="flex justify-center gap-3 mt-8">
                 <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/Krishna67890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-2xl hover:bg-cyber-blue hover:text-black transition-all shadow-lg cursor-pointer z-30 relative"
                    title="GitHub Profile"
                 >
                   <Github className="w-5 h-5" />
                 </motion.a>
                 <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/krishna-patil-rajput-b66b03340"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-2xl hover:bg-cyber-purple hover:text-white transition-all shadow-lg cursor-pointer z-30 relative"
                    title="LinkedIn Profile"
                 >
                   <Linkedin className="w-5 h-5" />
                 </motion.a>
                 <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/Krishna67890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all shadow-lg cursor-pointer z-30 relative"
                    title="Portfolio"
                 >
                   <Globe className="w-5 h-5 text-gray-400 group-hover:text-white" />
                 </motion.a>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                viewport={{ once: true }}
                className="glass p-5 rounded-2xl border-white/5 flex flex-col items-center text-center group hover:border-cyber-blue/30 transition-all duration-300"
              >
                <div className="mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{tech.icon}</div>
                <div className="text-xs font-bold text-gray-200">{tech.name}</div>
                <div className="text-[10px] text-gray-500 mt-1 leading-tight">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Proof of Engineering */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 pt-12 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-12">
            <div className="group cursor-default">
              <div className="text-3xl font-black font-orbitron text-white group-hover:text-cyber-blue transition-colors">100%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Local Data Hub</div>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl font-black font-orbitron text-cyber-blue group-hover:text-white transition-colors">0ms</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">AI Latency</div>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl font-black font-orbitron text-cyber-purple group-hover:text-cyber-blue transition-colors">7sec</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">VVPAT Accuracy</div>
            </div>
          </div>

          <div className="glass px-6 py-3 rounded-2xl border-white/10 flex items-center gap-4 group">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
             <span className="text-xs font-mono text-gray-400 group-hover:text-gray-200 transition-colors">System Status: Optimized for Hack2skill Submission</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
