import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Award, Menu, X, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navigation = ({ level, xp, onAuthClick, onProfileClick }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Journey', href: '#journey' },
    { name: 'Adventure', href: '#adventure' },
    { name: 'Simulator', href: '#simulator' },
    { name: 'Live Dashboard', href: '#timeline' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="text-cyber-blue w-8 h-8" aria-hidden="true" />
          <span className="font-orbitron font-bold text-xl tracking-tighter text-white">
            Democracy<span className="text-cyber-blue">Lens</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-bold text-gray-400 uppercase tracking-widest">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => {
                if (!user && link.href !== '#about') {
                  onAuthClick();
                } else {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-cyber-blue transition-all hover:scale-105 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-blue transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Voter Rank</span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="font-bold text-cyber-blue">Level {level}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-white/10 hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:block text-right">
                <div className="text-xs font-bold text-white leading-none">{user.name}</div>
                <button
                  onClick={logout}
                  className="text-[10px] text-gray-500 hover:text-red-400 transition-colors"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </div>
              <button
                onClick={onProfileClick}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-blue to-cyber-purple p-px hover:scale-105 transition-transform"
              >
                <div className="w-full h-full bg-cyber-dark rounded-[10px] flex items-center justify-center font-bold text-cyber-blue overflow-hidden">
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    (user?.name || 'U').charAt(0)
                  )}
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all"
              aria-label="Sign in"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-cyber-dark/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (!user && link.href !== '#about') {
                      onAuthClick();
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-left text-lg font-medium text-gray-300 hover:text-cyber-blue transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                {user ? (
                  <>
                    <button
                      onClick={() => { setIsMenuOpen(false); onProfileClick(); }}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-blue to-cyber-purple p-px"
                    >
                      <div className="w-full h-full bg-cyber-dark rounded-[10px] flex items-center justify-center font-bold text-cyber-blue overflow-hidden">
                        {user?.photo ? (
                          <img src={user.photo} alt={user.name || 'User'} className="w-full h-full object-cover" />
                        ) : (
                          (user?.name || 'U').charAt(0)
                        )}
                      </div>
                    </button>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Voter Rank</span>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-cyber-blue">Level {level}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => { onAuthClick(); setIsMenuOpen(false); }}
                    className="w-full py-4 bg-cyber-blue text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                  >
                    Sign In to Unlock Journey
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navigation;
