import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, User, Mail, MapPin, Phone, Award, Vote, Calendar, CheckCircle, LogOut, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = ({ onClose }) => {
  const { user, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    photo: null
  });

  const VOTE_LIMIT = 5;
  const todayStr = new Date().toDateString();
  const currentDailyVotes = user?.dailyProgress?.[todayStr] || 0;
  const voteProgress = (currentDailyVotes / VOTE_LIMIT) * 100;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        phone: user.phone || '',
        photo: user.photo || null
      });
    }
  }, [user]);

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] glass border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-blue animate-gradient-x z-20"></div>

        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-30">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
          {/* Left Sidebar - Visual Stats */}
          <div className="w-full md:w-80 bg-white/5 p-8 border-r border-white/10 flex flex-col items-center text-center md:overflow-y-auto flex-shrink-0">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cyber-blue to-cyber-purple p-1 shadow-lg overflow-hidden">
                {formData.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <div className="w-full h-full bg-cyber-dark rounded-2xl flex items-center justify-center">
                    <User className="w-16 h-16 text-cyber-blue/30" />
                  </div>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-2 right-2 p-2 bg-cyber-blue text-black rounded-xl shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                className="hidden"
                accept="image/*"
              />
            </div>

            <h3 className="text-xl font-bold font-orbitron text-white mb-1">{user?.name}</h3>
            <p className="text-cyber-blue text-xs uppercase tracking-widest font-bold mb-6">Voter Rank: Level {user?.level}</p>

            <div className="w-full space-y-4">
              {/* Level Progress */}
              <div className="glass p-5 rounded-3xl border-white/5 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-blue/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Rank Progress</span>
                  </div>
                  <span className="text-[10px] font-black text-cyber-blue">{(user?.xp % 500) / 5}%</span>
                </div>

                {/* Advanced Segmented Progress Bar */}
                <div className="flex gap-1 mb-4">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-sm transition-all duration-700 ${
                        i < ((user?.xp % 500) / 25)
                        ? 'bg-cyber-blue shadow-[0_0_10px_rgba(0,210,255,0.6)] animate-pulse'
                        : 'bg-white/5'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xl font-black font-orbitron text-white">{user?.xp}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase">Total XP Points</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-cyber-purple uppercase italic">Level {user?.level}</div>
                  </div>
                </div>
              </div>

              {/* Civic Intelligence Matrix (Mini Graph) */}
              <div className="glass p-5 rounded-3xl border-white/5 text-left relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-cyber-blue" />
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Intelligence Matrix</span>
                </div>

                <div className="flex items-end justify-between h-24 gap-2 mb-4">
                  {[
                    { label: 'REG', val: user?.xp > 100 ? 85 : 30, colorClass: 'bg-cyber-blue' },
                    { label: 'VFY', val: user?.votesCount > 0 ? 90 : 20, colorClass: 'bg-cyber-purple' },
                    { label: 'SIM', val: (currentDailyVotes / 5) * 100 || 10, colorClass: 'bg-cyber-blue' },
                    { label: 'LAW', val: user?.level > 1 ? 70 : 40, colorClass: 'bg-cyber-purple' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                      <div className="w-full bg-white/5 rounded-t-lg relative flex items-end overflow-hidden h-full">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${bar.val}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className={`w-full ${bar.colorClass} opacity-80 rounded-t-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                        />
                      </div>
                      <span className="text-[8px] font-black text-gray-500 tracking-tighter">{bar.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[8px] text-gray-500 font-bold uppercase text-center border-t border-white/5 pt-3">Constitutional Awareness Index</p>
              </div>

              {/* Advanced EVM Practice Tracker */}
              <div className="glass p-5 rounded-3xl border-white/5 text-left relative overflow-hidden group border-l-4 border-l-cyber-blue">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-blue/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyber-blue/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-cyber-blue animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black text-gray-200 tracking-tighter">EVM Simulation</span>
                      <div className="text-[8px] text-cyber-blue font-bold uppercase tracking-widest">Mastery Level: {currentDailyVotes >= 5 ? 'VOTING PRO' : 'LEARNER'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-white">{currentDailyVotes}/{VOTE_LIMIT}</span>
                  </div>
                </div>

                <div className="flex gap-1.5 mb-4">
                  {[...Array(VOTE_LIMIT)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        i < currentDailyVotes
                          ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple shadow-[0_0_8px_rgba(0,210,255,0.3)]'
                          : 'bg-white/5'
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Vote className="w-3 h-3 text-gray-400" />
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Verification Slips</span>
                    </div>
                    <span className="text-[9px] font-black text-white uppercase">{currentDailyVotes} ISSUED</span>
                  </div>
                </div>
              </div>

              {/* History Block with Graph */}
              <div className="glass p-5 rounded-3xl border-white/5 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-purple/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyber-purple/10 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-cyber-purple" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black text-gray-200 tracking-widest block">Daily Progress</span>
                      <span className="text-[7px] text-cyber-purple font-bold uppercase tracking-[0.2em]">7-Day Activity Graph</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Daily Activity Graph */}
                <div className="flex items-end justify-between h-24 gap-2 mb-6 px-1 relative z-10">
                  {(() => {
                    const days = [];
                    for (let i = 6; i >= 0; i--) {
                      const d = new Date();
                      d.setDate(d.getDate() - i);
                      const dateStr = d.toDateString();
                      const count = user?.dailyProgress?.[dateStr] || 0;
                      days.push({ date: dateStr, count });
                    }
                    return days.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full group/bar">
                        <div className="w-full bg-white/5 rounded-t-xl relative flex items-end overflow-hidden h-full border border-white/5 group-hover/bar:border-cyber-blue/30 transition-colors">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max((day.count / 5) * 100, 4)}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className={`w-full relative transition-all duration-500 ${
                              day.count >= 5
                                ? 'bg-gradient-to-t from-cyber-blue to-green-400 shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                                : day.count > 0
                                  ? 'bg-cyber-blue/60 shadow-[0_0_10px_rgba(0,210,255,0.2)]'
                                  : 'bg-white/10'
                            }`}
                          >
                            {day.count >= 5 && (
                              <div className="absolute top-1 left-1/2 -translate-x-1/2">
                                <Zap className="w-2 h-2 text-white animate-pulse" />
                              </div>
                            )}
                          </motion.div>
                        </div>
                        <span className={`text-[7px] font-black uppercase tracking-tighter ${day.date === new Date().toDateString() ? 'text-cyber-blue' : 'text-gray-600'}`}>
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                      </div>
                    ));
                  })()}
                </div>

                <div className="space-y-2 relative z-10">
                  {user?.dailyProgress && Object.keys(user.dailyProgress).length > 0 ? (
                    Object.entries(user.dailyProgress)
                      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                      .slice(0, 3) // Show last 3 days for compact view
                      .map(([date, count]) => (
                        <div key={date} className="flex items-center justify-between p-2.5 bg-white/5 rounded-2xl border border-white/5 group/item hover:border-white/10 transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${count >= 5 ? 'bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]' : 'bg-gray-700'}`}></div>
                            <span className="text-[9px] text-gray-300 font-bold uppercase tracking-tighter">
                              {date === new Date().toDateString() ? 'Today' : new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1 h-1 rounded-full ${i < count ? 'bg-cyber-blue' : 'bg-white/10'}`}></div>
                              ))}
                            </div>
                            <span className={`text-[9px] font-black ${count >= 5 ? 'text-green-400' : 'text-gray-500'}`}>
                              {count}/5
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-dashed border-white/10">
                       <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest italic">Initialize training to track data</p>
                    </div>
                  )}
                </div>
              </div>

              {/* History Block (Voted Years) */}
              <div className="glass p-4 rounded-3xl border-white/5 text-left bg-white/5">
                <div className="flex flex-wrap gap-2">
                  {user?.votedYears?.length > 0 ? (
                    user.votedYears.map(year => (
                      <div key={year} className="px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/20 rounded-xl text-[10px] text-cyber-purple font-black shadow-inner flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3" /> {year}
                      </div>
                    ))
                  ) : null}
                </div>
              </div>

              {/* Advanced Knowledge Matrix */}
              <div className="glass p-5 rounded-3xl border-white/5 text-left relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-4 h-4 text-cyber-blue" />
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Election Intel Access</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-cyber-blue/30 transition-all cursor-help">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black text-white uppercase">EVM Technicals</span>
                      <span className="text-[8px] text-cyber-blue font-bold tracking-tighter">AUTHENTICATED</span>
                    </div>
                    <p className="text-[8px] text-gray-500 leading-tight">Mastery of M3 Gen-3 EVM hardware, Anti-tamper mesh protocols, and VVPAT 7-second verification window specs.</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-cyber-purple/30 transition-all cursor-help">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black text-white uppercase">Constitutional Law</span>
                      <span className="text-[8px] text-cyber-purple font-bold tracking-tighter">VETTING ACTIVE</span>
                    </div>
                    <p className="text-[8px] text-gray-500 leading-tight">Access to Section 123 (RPA 1951) and Model Code of Conduct (MCC) digital library protocols.</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-cyber-blue/30 transition-all cursor-help">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black text-white uppercase">Electoral Intel</span>
                      <span className="text-[8px] text-cyber-blue font-bold tracking-tighter">SYNCED 2026</span>
                    </div>
                    <p className="text-[8px] text-gray-500 leading-tight">Knowledge of Form 17C tracking, Mock Poll Audits (5:30 AM), and totalizer verification algorithms.</p>
                  </div>
                </div>
              </div>

              {/* Improved Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-2 flex items-center justify-center gap-3 p-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl border border-red-500/20 transition-all font-black text-[10px] uppercase tracking-[0.3em] group shadow-lg"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Terminate Session
              </button>
            </div>
          </div>

          {/* Right Section - Form/Details */}
          <div className="flex-1 p-8 md:p-12 md:overflow-y-auto bg-cyber-dark/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-black font-orbitron">Voter <span className="text-cyber-blue">Identity</span></h2>
                <div className="flex items-center gap-2 mt-1">
                  <ShieldCheck className="w-3 h-3 text-cyber-blue" />
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-gray-500">Official ECI Digital Credentials</span>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:border-cyber-blue/30"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="glass p-6 rounded-[2rem] border-white/5 relative overflow-hidden group hover:border-cyber-blue/20 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <ShieldCheck className="w-12 h-12 text-cyber-blue" />
                </div>
                <h4 className="text-[10px] uppercase font-black text-cyber-blue mb-4 tracking-widest flex items-center gap-2">
                  <div className="w-1 h-3 bg-cyber-blue rounded-full"></div> Verification Status
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-white/5 pb-3">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase">Voter ID Status</div>
                      <div className="text-sm font-black text-white uppercase">Digitally Verified</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-400 mb-1" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase">Biometric Link</div>
                      <div className="text-sm font-black text-white uppercase">Secure-Face-ID</div>
                    </div>
                    <Zap className="w-4 h-4 text-cyber-blue mb-1" />
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-[2rem] border-white/5 relative overflow-hidden group hover:border-cyber-purple/20 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Award className="w-12 h-12 text-cyber-purple" />
                </div>
                <h4 className="text-[10px] uppercase font-black text-cyber-purple mb-4 tracking-widest flex items-center gap-2">
                  <div className="w-1 h-3 bg-cyber-purple rounded-full"></div> Civic Badges
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentDailyVotes >= 5 && (
                    <div className="px-3 py-1.5 bg-cyber-blue/10 border border-cyber-blue/20 rounded-xl text-[8px] font-black text-cyber-blue uppercase tracking-widest animate-pulse">
                      EVM Master
                    </div>
                  )}
                  {user?.level > 1 && (
                    <div className="px-3 py-1.5 bg-cyber-purple/10 border border-cyber-purple/20 rounded-xl text-[8px] font-black text-cyber-purple uppercase tracking-widest">
                      Civic Scholar
                    </div>
                  )}
                  <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    Early Adopter
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-blue" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all ${isEditing ? 'focus:border-cyber-blue/50 bg-white/10' : 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-blue" />
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all ${isEditing ? 'focus:border-cyber-blue/50 bg-white/10' : 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 block">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-blue" />
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all ${isEditing ? 'focus:border-cyber-blue/50 bg-white/10' : 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 block">Residential Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-cyber-blue" />
                    <textarea
                      disabled={!isEditing}
                      placeholder="Street, City, State, Zip"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 h-24 outline-none resize-none transition-all ${isEditing ? 'focus:border-cyber-blue/50 bg-white/10' : 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-cyber-blue text-black font-bold rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        address: user?.address || '',
                        phone: user?.phone || '',
                        photo: user?.photo || null
                      });
                      setIsEditing(false);
                    }}
                    className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
