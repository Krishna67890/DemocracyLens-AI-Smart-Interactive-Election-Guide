import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Mic, X, MessageSquare, Sparkles, ShieldCheck, Trophy } from 'lucide-react';
import { INDIA_ELECTION_CONTEXT } from '../data/electionData';
import { useAuth } from '../context/AuthContext';

const AIMentor = ({ onQuery }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: "Namaste! I am **Matdaata Sahayak**, your advanced AI Election Concierge. 🗳️\n\nI'm here to simplify the ECI process for you. To provide the best guidance, could you tell me: Are you a **First-Time Voter**, a **Migrant Elector (Kashmir)**, an **NRI**, or looking for **Correction/Deletion**?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (user?.name && messages.length === 1 && messages[0].text.includes("Namaste!")) {
      setMessages([
        {
          type: 'ai',
          text: `Namaste, **${user.name}**! Welcome back to your secure Election Command Center. 🗳️\n\nI have synchronized with your latest civic progress. You are currently at **Level ${user.level || 1}**. Would you like to see your full **Progress Dossier**, or do you have specific questions about the **2026 Electoral Cycle**?`
        }
      ]);
    }
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getMatdaataResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    // Comprehensive User Data & Progress Response with AI Analysis
    if (q.includes('progress') || q.includes('my stats') || q.includes('score') || q.includes('achievement') || q.includes('xp') || q.includes('data')) {
      if (!user) {
        return `### 🔒 ACCESS RESTRICTED\n\n**Identity not verified.** Please authenticate your profile to synchronize your civic progress with my neural network. Once signed in, I can generate your full **Democracy Intelligence Quotient (DIQ)**.`;
      }

      const votes = user?.votesCount || 0;
      const todayStr = new Date().toDateString();
      const todayVotes = user?.dailyProgress?.[todayStr] || 0;
      const totalXP = user?.xp || 0;
      const rank = user?.level || 1;
      const xpToNext = 500 - (totalXP % 500);
      const activityLevel = (user?.dailyProgress ? Object.keys(user.dailyProgress).length : 0);

      // Advanced DQ Calculation
      const dqScore = Math.min(100, (votes * 10) + (rank * 5) + (activityLevel * 2));

      let status = "";
      let analysis = "";
      let quote = "";

      if (dqScore > 80) {
        status = "CONSTITUTIONAL TITAN";
        analysis = "Your participation metrics are exceptional. You have demonstrated a master-level understanding of both mechanical voting protocols and procedural civic duties. You are among the top 1% of simulated electors.";
        quote = '"The ballot is stronger than the bullet." - Abraham Lincoln. You are proving this true through your preparation.';
      } else if (dqScore > 50) {
        status = "VETERAN ELECTOR";
        analysis = "You have transitioned from a learner to a practitioner. Your muscle memory for the EVM interface is solidified, and your XP trajectory suggests a high level of civic awareness.";
        quote = '"A citizen of a republic for whom it is enough to vote is a citizen of a republic for whom it is not enough." - This doesn\'t apply to you. You are doing more.';
      } else {
        status = "CIVIC APPRENTICE";
        analysis = "You are in the vital first phase of your electoral journey. Every simulation you complete reduces the 'Anxiety Coefficient' for the 2026 polls. Your potential for growth is high.";
        quote = '"The ignorance of one voter in a democracy impairs the security of all." - JFK. Your training here is the antidote to that ignorance.';
      }

      return `### 📊 CIVIC INTELLIGENCE DOSSIER: ${user.name.toUpperCase()}\n\n**DIQ SCORE (Democracy Intelligence Quotient): ${dqScore}/100**\n\n**MATDAATA SAHAYAK AI ANALYSIS:**\n"**STATUS: ${status}** — ${analysis}"\n\n**CORE METRICS HARVESTED:**\n* **Current Rank:** Level ${rank}\n* **Experience Points:** ${totalXP} XP\n* **Next Evolution In:** ${xpToNext} XP\n* **Simulation Saturation:** ${votes} total sessions\n* **Consistency Index:** ${activityLevel} days active\n* **Daily Optimization:** ${todayVotes}/5 sessions\n\n**REFLECTIVE PASSAGE:**\n${quote}\n\n**STRATEGIC RECOMMENDATION:**\n${votes < 10 ? "Initiate 5 more **EVM Simulations** to reach 'Professional' handling status." : "Engage with the **Timeline & Facts** section to sharpen your knowledge of Constitutional Law."}`;
    }

    if (q.includes('who am i') || q.includes('profile') || q.includes('my info')) {
      if (!user) return "You are an anonymous citizen currently exploring the DemocracyLens portal. Sign in to establish your digital voter identity!";

      return `### 🆔 DIGITAL IDENTITY VERIFIED\n\n**Name:** ${user.name}\n**Email:** ${user.email}\n**Assigned Level:** ${user.level}\n**Status:** ${user.votesCount > 0 ? 'Active Participant' : 'Observer'}\n\nYour profile is synchronized with our local **Blockchain Mock-Registry**. Any training you complete here earns you XP that reflects in your Voter Rank.`;
    }

    // Step 1: Identification & Redirection Logic
    if (q.includes('first time') || q.includes('new voter') || q.includes('register')) {
      return `### 🆕 New Voter Registration (Form 6)\n\nGreat! To get started, you'll need:\n* **Age Proof**: Aadhaar/Birth Certificate\n* **Address Proof**: Electricity bill/Rent agreement\n* **Photo**: Recent passport size\n\n**Action Path:**\n1. Visit [voters.eci.gov.in](https://voters.eci.gov.in/)\n2. Login & Select **Form 6**\n3. Upload documents & Submit.\n\n*Pro-Tip: Track your application status using the 'Reference ID' provided after submission.*`;
    }

    if (q.includes('kashmir') || q.includes('migrant')) {
      return `### 🏔️ Kashmiri Migrant Services\n\nYou have two primary options for the 2026 cycle:\n\n1. **Form M**: To vote in person at special polling stations in **Delhi, Jammu, or Udhampur**.\n2. **Form 12C**: To vote via **Postal Ballot** from your current location.\n\n**Which one would you like to explore?** I can provide the checklist for either.`;
    }

    if (q.includes('form m')) {
      return `### 📍 Form M Checklist (Voting at Special Station)\n\n* **Eligibility**: Registered in Kashmir but residing in Delhi/Jammu/Udhampur.\n* **Process**: Download Form M from ECI portal > Get it attested by a Gazetted Officer > Submit to your Zonal Officer.\n* **Deadline**: Usually 10 days before the poll date.`;
    }

    if (q.includes('form 12c') || q.includes('postal')) {
      return `### ✉️ Form 12C Checklist (Postal Ballot)\n\n* **Purpose**: Cast your vote without traveling to a polling station.\n* **Process**: Apply via Form 12C > Assistant Returning Officer (ARO) verifies > Ballot arrives at your address via post.\n* **Key**: Ensure your address on the roll is current!`;
    }

    if (q.includes('delete') || q.includes('form 7') || q.includes('remove')) {
      return `### ⚠️ Voter Deletion (Form 7)\n\nForm 7 is a serious legal request. It is used only for:\n1. **Permanent Shifting** to a new constituency.\n2. **Death** of a family member.\n3. **Disqualification**.\n\n**Warning:** Accidental deletion can lead to loss of voting rights. Ensure you have the 'Death Certificate' or 'Address Proof of New Residence' ready.`;
    }

    if (q.includes('sir') || q.includes('revision') || q.includes('2026')) {
      return `### ⏳ SIR 2026: The Golden Window\n\nThe **Special Intensive Revision (SIR) – 2026** is the most critical window for citizens. \n\n* **Why it matters:** This is when the ECI cleans the rolls. \n* **Action:** Search your name in the **'Last SIR Deletion'** list. If found incorrectly, fill **Form 6** immediately to restore your name.`;
    }

    if (q.includes('nri') || q.includes('overseas')) {
      return `### 🌐 NRI Voter Registration (Form 6A)\n\nIf you are an Indian citizen living abroad:\n* You need **Form 6A**.\n* **Requirement:** A valid Indian Passport showing your residence in India.\n* **Note:** Currently, NRIs must be physically present at their polling station in India to vote.`;
    }

    if (q.includes('who to vote') || q.includes('party') || q.includes('candidate')) {
      return `I am programmed to be a neutral **Constitutional Guide**. ⚖️\n\nI cannot suggest parties or candidates. However, I highly recommend checking the **'Know Your Candidate (KYC)'** section on the ECI website to view candidate affidavits, educational backgrounds, and criminal records. This ensures you make an informed choice!`;
    }

    if (q.includes('mcc') || q.includes('conduct')) {
      return `### 📜 Model Code of Conduct (MCC)\n\nThe MCC is the 'Grammar of Democracy'. It ensures a level playing field. \n\n* **No New Projects:** Governments cannot announce new schemes once dates are out.\n* **No Misuse:** Official machinery/vehicles cannot be used for campaigning.\n* **Silence Period:** All campaigning stops 48 hours before the poll.`;
    }

    // Default Fallback with Hinglish touch
    return `I understand you're asking about "${userQuery}". As your **Matdaata Sahayak**, I want to make sure you have the right info.\n\n### ⚡ QUICK SUGGESTIONS:\n* **Check My Progress**: For your personalized 2026 readiness score.\n* **Registration (Form 6)**: For first-time voter guidance.\n* **Kashmiri Migrant**: For special voting protocols (M/12C).\n* **SIR 2026**: To check the latest roll revision status.\n\nKya aap inme se kisi ke baare mein jaanna chahte hain?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    onQuery();

    setTimeout(() => {
      const response = getMatdaataResponse(userMsg);
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isOpen ? 'bg-cyber-purple rotate-90' : 'bg-cyber-blue hover:shadow-[0_0_30px_rgba(0,210,255,0.5)]'
          }`}
        >
          {isOpen ? <X className="text-white" /> : <Bot className="text-black" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-cyber-purple flex items-center justify-center text-[10px] font-bold text-white">1</span>
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            className="fixed bottom-24 right-4 left-4 md:left-auto md:right-8 md:w-[400px] h-[70vh] md:h-[600px] glass rounded-[2rem] md:rounded-[2.5rem] z-[100] flex flex-col overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border-b border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyber-blue/20 flex items-center justify-center border border-cyber-blue/30 shadow-inner">
                <Bot className="text-cyber-blue w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-sm font-orbitron tracking-tight">MATDAATA <span className="text-cyber-blue">SAHAYAK</span></h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Election Concierge v2.0</span>
                </div>
              </div>
              <ShieldCheck className="text-cyber-blue/40 w-5 h-5" />
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide bg-black/20">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap relative group ${
                    msg.type === 'ai'
                      ? 'bg-white/5 border border-white/10 rounded-tl-none shadow-[0_4px_15px_rgba(0,0,0,0.2)] text-gray-200'
                      : 'bg-gradient-to-br from-cyber-blue to-blue-600 text-black font-bold rounded-tr-none shadow-[0_5px_15px_rgba(0,210,255,0.3)]'
                  }`}>
                    {msg.type === 'ai' && (
                      <div className="absolute -left-2 top-0 w-1 h-8 bg-cyber-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                    {/* Enhanced Rendering */}
                    {msg.text.split('\n').map((line, index) => {
                      if (line.startsWith('###')) return <h4 key={index} className="text-cyber-blue font-black mt-4 mb-2 uppercase text-[10px] tracking-[0.2em] border-b border-cyber-blue/20 pb-1">{line.replace('###', '')}</h4>;
                      if (line.startsWith('**')) return <p key={index} className="font-bold text-white mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
                      if (line.startsWith('*')) return (
                        <div key={index} className="flex items-start gap-2 ml-2 mt-1">
                          <div className="w-1 h-1 rounded-full bg-cyber-blue mt-2"></div>
                          <span className="text-gray-300 text-xs">{line.replace('*', '').trim()}</span>
                        </div>
                      );
                      if (line.startsWith('"') && line.endsWith('"')) return <p key={index} className="italic text-cyber-blue/80 bg-cyber-blue/5 p-3 rounded-xl border-l-2 border-cyber-blue my-3 text-xs">“{line.replace(/"/g, '')}”</p>;

                      // Link parsing logic
                      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                      if (linkRegex.test(line)) {
                        const parts = [];
                        let lastIndex = 0;
                        let match;
                        linkRegex.lastIndex = 0;
                        while ((match = linkRegex.exec(line)) !== null) {
                          parts.push(line.substring(lastIndex, match.index));
                          parts.push(
                            <a
                              key={match.index}
                              href={match[2]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyber-blue hover:underline font-bold inline-flex items-center gap-1"
                            >
                              {match[1]} <Sparkles className="w-3 h-3" />
                            </a>
                          );
                          lastIndex = linkRegex.lastIndex;
                        }
                        parts.push(line.substring(lastIndex));
                        return <p key={index} className={index > 0 ? 'mt-1 text-gray-400' : ''}>{parts}</p>;
                      }

                      return <p key={index} className={index > 0 ? 'mt-1 text-gray-400' : ''}>{line}</p>;
                    })}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5 border border-white/5">
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-xl">
              <div className="flex gap-3">
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Matdaata Sahayak..."
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-cyber-blue transition-all placeholder:text-gray-600 shadow-inner"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-cyber-blue transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  className="bg-cyber-blue text-black px-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] flex items-center justify-center group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
                {[
                  { label: 'My Progress', icon: '🏆' },
                  { label: 'My Stats', icon: '📊' },
                  { label: 'Register (Form 6)', icon: '📝' },
                  { label: 'SIR 2026', icon: '⏳' }
                ].map(tag => (
                  <button
                    key={tag.label}
                    onClick={() => { setInput(tag.label); }}
                    className="text-[10px] whitespace-nowrap px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:border-cyber-blue/50 hover:text-white hover:bg-white/10 transition-all font-bold flex items-center gap-2"
                  >
                    <span>{tag.icon}</span> {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIMentor;
