import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VOTE_LIMIT = 5;

const EVMSimulator = ({ onVoteCast }) => {
  const { user, addVote } = useAuth();
  const [voted, setVoted] = useState(false);
  const [beeping, setBeeping] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFullInfo, setShowFullInfo] = useState(false);
  const [activePractice, setActivePractice] = useState('evm'); // 'evm' or 'ballot'
  const [showCongrats, setShowCongrats] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const todayStr = new Date().toDateString();
  const currentVotes = user?.dailyProgress?.[todayStr] || 0;

  useEffect(() => {
    const checkLock = () => {
      if (currentVotes >= VOTE_LIMIT) {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const diff = tomorrow.getTime() - now.getTime();

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(null);
        }
      } else {
        setTimeLeft(null);
      }
    };

    checkLock();
    const timer = setInterval(checkLock, 1000);
    return () => clearInterval(timer);
  }, [currentVotes]);

  const isLocked = currentVotes >= VOTE_LIMIT && timeLeft !== null;

  const playBeep = (duration = 1.2, frequency = 800) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log("Audio play blocked by browser");
    }
  };

  const evmCandidates = [
    { id: 1, name: 'Bharatiya Janata Party (BJP)', symbol: '🪷', party: 'BJP' },
    { id: 2, name: 'Indian National Congress (INC)', symbol: '✋', party: 'INC' },
    { id: 3, name: 'Aam Aadmi Party (AAP)', symbol: '🧹', party: 'AAP' },
    { id: 4, name: 'Communist Party (CPIM)', symbol: '🛠️', party: 'CPIM' },
    { id: 5, name: 'Bahujan Samaj Party (BSP)', symbol: '🐘', party: 'BSP' },
    { id: 6, name: 'Shiv Sena (UBT)', symbol: '🔥', party: 'SS' },
  ];

  const ballotCandidates = [
    { id: 1, name: 'Gram Vikas Party', symbol: '🚜', party: 'Local' },
    { id: 2, name: 'Panchayat Ekta', symbol: '💡', party: 'Local' },
    { id: 3, name: 'Kisan Shakti', symbol: '🌾', party: 'Local' },
    { id: 4, name: 'Yuva Pragati', symbol: '⚽', party: 'Local' },
  ];

  const handleVote = (candidate) => {
    if (voted || beeping || isLocked) return;
    setSelectedCandidate(candidate);

    if (activePractice === 'evm') {
      setBeeping(true);
      playBeep(1.5, 850);

      setTimeout(() => {
        setBeeping(false);
        setVoted(true);
        addVote();
        onVoteCast();

        // Check if quota reached after this vote
        if (currentVotes + 1 >= VOTE_LIMIT) {
          setTimeout(() => {
            playBeep(0.5, 1000);
            setTimeout(() => playBeep(0.8, 1200), 600);
            setShowCongrats(true);
          }, 2000);
        } else {
          // Auto-reset after 4 seconds to allow for 5-vote practice flow
          setTimeout(() => {
            setVoted(false);
            setSelectedCandidate(null);
          }, 4000);
        }
      }, 2000);
    } else {
      // Ballot paper logic
      setVoted(true);
      addVote();
      onVoteCast();

      if (currentVotes + 1 >= VOTE_LIMIT) {
        setTimeout(() => setShowCongrats(true), 1500);
      } else {
        // Auto-reset for Ballot too
        setTimeout(() => {
          setVoted(false);
          setSelectedCandidate(null);
        }, 3000);
      }
    }
  };

  const resetPractice = () => {
    setVoted(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-4 font-orbitron uppercase tracking-tighter">EVM & Ballot <span className="text-cyber-blue">Arena</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">Master the mechanics of Indian democracy. Choose between the high-tech EVM system used in General Elections or the traditional Ballot system used in Local Bodies.</p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            <button
              onClick={() => { setActivePractice('evm'); resetPractice(); }}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activePractice === 'evm' ? 'bg-cyber-blue text-black shadow-[0_0_20px_rgba(0,210,255,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              EVM Simulator (National)
            </button>
            <button
              onClick={() => { setActivePractice('ballot'); resetPractice(); }}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activePractice === 'ballot' ? 'bg-cyber-purple text-black shadow-[0_0_20px_rgba(255,0,193,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              Ballot Paper (Panchayat)
            </button>
          </div>

          <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLocked ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Quota: {currentVotes}/{VOTE_LIMIT} Votes Used</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
          >
            <div className="glass p-10 rounded-[3rem] border-cyber-blue/30 max-w-lg text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>
              <div className="w-24 h-24 bg-cyber-blue/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyber-blue/30 shadow-[0_0_30px_rgba(0,210,255,0.2)]">
                <CheckCircle2 className="w-12 h-12 text-cyber-blue" />
              </div>
              <h3 className="text-4xl font-black font-orbitron mb-4 text-white uppercase tracking-tighter">Mastery Achieved!</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Congratulations! You've successfully completed your voter training quota. Your civic knowledge is now at 100%.
                <br /><br />
                <span className="text-cyber-blue font-bold">See you at the 2026 Elections!</span>
              </p>
              <button
                onClick={() => setShowCongrats(false)}
                className="w-full py-4 bg-cyber-blue text-black font-black rounded-2xl shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:scale-105 transition-transform uppercase tracking-widest"
              >
                Close Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Interaction Area */}
        <div className={`relative transition-all duration-500 ${isLocked ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
          {activePractice === 'evm' ? (
            /* EVM Unit */
            <div className="glass rounded-[2.5rem] p-8 border-4 border-gray-800 shadow-2xl relative">
              <div className="bg-gray-800 rounded-xl p-4 mb-8 text-center border border-gray-600 shadow-inner">
                <span className="text-xs uppercase tracking-[0.3em] font-black text-gray-400">Electronic Voting Machine Unit (BU)</span>
              </div>

              <div className="space-y-3">
                {evmCandidates.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 bg-gray-900/80 p-3 rounded-2xl border border-white/5 group hover:border-cyber-blue/30 transition-all">
                    <span className="w-6 text-center font-black text-cyber-blue text-[10px]">{String(c.id).padStart(2, '0')}</span>
                    <div className="flex-1">
                      <div className="font-bold text-gray-200 uppercase text-[11px] tracking-tight">{c.name}</div>
                      <div className="text-[9px] text-gray-500 font-bold">{c.party}</div>
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">{c.symbol}</div>
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full border border-red-900/50 transition-all duration-300 ${beeping && selectedCandidate?.id === c.id ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-red-950'}`}></div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleVote(c)}
                        disabled={voted || beeping || isLocked}
                        className="w-12 h-9 bg-blue-700 border-b-4 border-blue-900 rounded-lg shadow-lg active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 relative overflow-hidden group/btn"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>

              {beeping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-red-600/5 backdrop-blur-[2px] flex items-center justify-center pointer-events-none rounded-[2.5rem]"
                >
                  <div className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black tracking-widest animate-pulse shadow-2xl border-2 border-white/20">RECORDING VOTE...</div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Ballot Paper Unit */
            <div className="bg-[#f4f1ea] rounded-[2.5rem] p-10 border-8 border-[#d4d1ca] shadow-2xl relative text-black font-serif">
              <div className="text-center mb-8 border-b-2 border-black/10 pb-6">
                <h4 className="text-xl font-bold uppercase tracking-tighter">Election Commission of India</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Ballot Paper - Gram Panchayat Election 2026</p>
              </div>

              <div className="space-y-1 border-2 border-black">
                {ballotCandidates.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 border-b-2 border-black divide-x-2 divide-black h-20 items-center">
                    <div className="col-span-1 text-center font-bold">{c.id}</div>
                    <div className="col-span-6 px-4 font-bold uppercase text-xs">{c.name}</div>
                    <div className="col-span-2 flex items-center justify-center text-3xl">{c.symbol}</div>
                    <div className="col-span-3 h-full flex items-center justify-center relative">
                      {!voted ? (
                        <button
                          onClick={() => handleVote(c)}
                          className="w-12 h-12 rounded-full border-2 border-dashed border-black/20 hover:border-black/50 hover:bg-black/5 transition-all flex items-center justify-center group"
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </button>
                      ) : (
                        selectedCandidate?.id === c.id && (
                          <motion.div
                            initial={{ scale: 2, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: -15 }}
                            className="text-purple-800 opacity-80"
                          >
                            <svg className="w-14 h-14" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                              <path d="M30 50 L70 50 M50 30 L50 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                            </svg>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center text-[9px] font-bold uppercase opacity-40">
                <span>Constituency: Local-04</span>
                <span>Serial No: {Math.floor(Math.random() * 1000000)}</span>
              </div>
            </div>
          )}

          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[4px] rounded-[2.5rem] z-20">
               <Lock className="w-16 h-16 text-red-500 mb-4" />
               <p className="text-xl font-bold font-orbitron text-white uppercase tracking-widest">Quota Reached</p>
               <p className="text-sm text-gray-400 mt-2">Practice resets in: <span className="text-cyber-blue font-mono">{timeLeft}</span></p>
               <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-[0.2em]">Next session available tomorrow</p>
            </div>
          )}
        </div>

        {/* Verification Display */}
        <div className="space-y-8">
          <div className={`glass p-8 rounded-[2.5rem] border-l-4 transition-colors ${activePractice === 'evm' ? 'border-cyber-blue' : 'border-cyber-purple'} relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity ${activePractice === 'evm' ? 'bg-cyber-blue/10' : 'bg-cyber-purple/10'}`}></div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 relative z-10 font-orbitron">
              <CheckCircle2 className={activePractice === 'evm' ? 'text-cyber-blue' : 'text-cyber-purple'} />
              {activePractice === 'evm' ? 'VVPAT Verification' : 'The Swastik Mark'}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed relative z-10">
              {activePractice === 'evm'
                ? 'After voting, the VVPAT slip appears for 7 seconds. This visual confirmation ensures your electronic vote matches your intent before dropping into the storage box.'
                : 'In the ballot system, you use a special "Arrow Cross" stamp. Ensure the mark is clearly within the candidate\'s box. Folding it correctly (vertically then horizontally) prevents ink transfer to other symbols.'}
            </p>
          </div>

          <div className="h-80 bg-gray-900/90 rounded-[2.5rem] border-4 border-gray-800 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-${activePractice === 'evm' ? 'cyber-blue' : 'cyber-purple'}/20 to-transparent`}></div>
            <AnimatePresence mode="wait">
              {voted ? (
                <motion.div
                  key="slip"
                  initial={{ y: -150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 200, opacity: 0 }}
                  className={`bg-white text-black p-6 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-56 text-center font-mono border-x-4 border-gray-100 ${activePractice === 'ballot' ? 'rotate-2' : ''}`}
                >
                  <div className="text-[10px] uppercase font-black border-b-2 border-dashed border-gray-300 mb-4 pb-2">
                    {activePractice === 'evm' ? 'VVPAT Audit Slip' : 'Ballot Receipt'}
                  </div>
                  <div className="text-5xl mb-3">{selectedCandidate?.symbol}</div>
                  <div className="font-black text-lg uppercase tracking-tight">{selectedCandidate?.name}</div>
                  <div className="text-[9px] mt-6 text-gray-400 font-sans font-bold uppercase">{activePractice === 'evm' ? 'ECI Verified' : 'Panchayat Recorded'}</div>
                  <div className="mt-4 pt-2 border-t border-dashed border-gray-300 text-[8px] text-gray-500 uppercase">UID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 text-center flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-dashed border-gray-800 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm italic font-medium">
                    {activePractice === 'evm'
                      ? 'VVPAT window will display \n verified slip after voting'
                      : 'Audit receipt will generate \n after ballot marking'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {voted && !beeping && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={resetPractice}
                disabled={isLocked}
                className="absolute bottom-6 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 transition-all"
              >
                Reset for Next Practice
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass rounded-[3rem] border border-white/5 overflow-hidden"
      >
        <div className="p-8 md:p-12 border-b border-white/5 bg-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cyber-blue/20 rounded-2xl flex items-center justify-center">
              <Info className="text-cyber-blue w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black font-orbitron uppercase">Democracy <span className="text-cyber-blue">Encyclopaedia</span></h3>
              <p className="text-gray-500 text-sm">Deep dive: Paper Ballots vs Electronic Voting in India.</p>
            </div>
          </div>
          <button
            onClick={() => setShowFullInfo(!showFullInfo)}
            className="px-6 py-3 bg-white/5 hover:bg-cyber-blue hover:text-black font-bold rounded-xl transition-all text-sm border border-white/10"
          >
            {showFullInfo ? 'Show Less' : 'Open Knowledge Base'}
          </button>
        </div>

        <div className={`p-8 md:p-12 transition-all duration-700 overflow-hidden ${showFullInfo ? 'max-h-[8000px] opacity-100' : 'max-h-[300px] opacity-60'}`}>
          <div className="prose prose-invert max-w-none space-y-12 text-gray-400 leading-relaxed text-lg">

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-white font-bold text-2xl font-orbitron flex items-center gap-2">
                   <div className="w-1 h-8 bg-cyber-blue"></div> 1. The Ballot System
                </h4>
                <p>
                  In India, the **Ballot System** was the traditional method from 1952 until 2004. It involves physical paper, a manual "Arrow Cross Mark" stamp, and sealed boxes. While EVMs rule national polls, ballots remain crucial for **Panchayat elections** and **Postal Ballots**.
                </p>
                <div className="bg-white/5 p-6 rounded-2xl space-y-4">
                  <h5 className="text-cyber-blue font-bold uppercase text-xs tracking-widest">How it works:</h5>
                  <ul className="text-sm space-y-2">
                    <li className="flex gap-2"><span>•</span> <span>**The Marking:** Voter uses a rubber stamp inside the box next to the symbol.</span></li>
                    <li className="flex gap-2"><span>•</span> <span>**The Secret:** The paper is folded vertically then horizontally to hide the choice.</span></li>
                    <li className="flex gap-2"><span>•</span> <span>**The Count:** Manual counting often takes 24–48 hours, ensuring every paper is verified by hand.</span></li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold text-2xl font-orbitron flex items-center gap-2">
                   <div className="w-1 h-8 bg-cyber-purple"></div> 2. Major Parties (2026)
                </h4>
                <p>India classifies parties as **National** (reserved symbols nationwide) or **State** (dominant in specific regions). Here is the landscape for the 2026 cycle:</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyber-blue/20 transition-all">
                    <div className="text-cyber-blue font-black text-sm uppercase">BJP</div>
                    <div className="text-[10px] text-gray-500">Lotus | Right-wing</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyber-blue/20 transition-all">
                    <div className="text-cyber-blue font-black text-sm uppercase">INC</div>
                    <div className="text-[10px] text-gray-500">Hand | Centrist</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyber-blue/20 transition-all">
                    <div className="text-cyber-blue font-black text-sm uppercase">AAP</div>
                    <div className="text-[10px] text-gray-500">Broom | Welfare</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyber-blue/20 transition-all">
                    <div className="text-cyber-blue font-black text-sm uppercase">CPIM</div>
                    <div className="text-[10px] text-gray-500">Hammer | Left</div>
                  </div>
                </div>
              </div>
            </div>

            {showFullInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <div className="p-8 bg-cyber-blue/5 rounded-[2.5rem] border border-cyber-blue/20">
                   <h4 className="text-cyber-blue font-bold mb-6 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5" /> ADVANCED ELECTORAL PROTOCOLS
                   </h4>
                   <div className="grid md:grid-cols-3 gap-8 text-sm">
                      <div className="space-y-2">
                        <div className="font-bold text-white uppercase tracking-tighter">Anti-Tamper Mesh</div>
                        <p>EVMs use a "fused-one-time-programmable" chip. Once the code is burnt, it cannot be changed or read via any wireless interface (Wi-Fi/Bluetooth).</p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-bold text-white uppercase tracking-tighter">Mock Poll Audit</div>
                        <p>At 5:30 AM, 50 mock votes are cast in presence of party agents to verify totalizer accuracy. The machine is then cleared and sealed.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-bold text-white uppercase tracking-tighter">Form 17C Tracking</div>
                        <p>This is the account of votes recorded. Agents receive a copy, ensuring the number of votes in the machine matches the tally at the count center.</p>
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 text-sm leading-relaxed mt-12">
                   <div className="space-y-4">
                      <h5 className="text-white font-bold uppercase tracking-widest text-xs">VVPAT Technicals</h5>
                      <div className="space-y-2 text-gray-400">
                        <p><span className="text-cyber-blue font-bold">Paper Trail:</span> A thermal printer creates a 10cm x 5.6cm slip with candidate name and symbol.</p>
                        <p><span className="text-cyber-blue font-bold">Visibility:</span> Glass window with internal LED allows viewing for exactly 7 seconds before auto-cutting.</p>
                        <p><span className="text-cyber-blue font-bold">Storage:</span> Slips are kept for 1 year post-election unless challenged in High Court.</p>
                      </div>
                   </div>
                   <div className="p-6 bg-cyber-purple/5 rounded-2xl border border-cyber-purple/20">
                      <h5 className="text-cyber-purple font-bold uppercase tracking-widest text-xs mb-3">Model Code of Conduct (MCC)</h5>
                      <p>MCC is not a law but an agreement between parties. However, violations under **Section 123 of RPA 1951** (Corrupt Practices) can lead to disqualification of the candidate and imprisonment.</p>
                   </div>
                </div>
              </motion.div>
            )}
          </div>

          {!showFullInfo && (
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyber-dark to-transparent pointer-events-none"></div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default EVMSimulator;
