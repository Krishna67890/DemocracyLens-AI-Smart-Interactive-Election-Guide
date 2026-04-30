import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(formData.email, formData.password);
      if (result.success) onClose();
      else setError(result.message);
    } else {
      const result = register(formData.name, formData.email, formData.password);
      if (result.success) onClose();
      else setError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md glass border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>

        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cyber-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyber-blue/20">
            <ShieldCheck className="w-8 h-8 text-cyber-blue" />
          </div>
          <h2 className="text-2xl font-black font-orbitron uppercase tracking-tighter">
            {isLogin ? (
              <>Welcome <span className="text-cyber-blue">Back, Elector</span></>
            ) : (
              <>Welcome to <span className="text-cyber-purple">The Vanguard</span></>
            )}
          </h2>
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] mt-2">
            {isLogin ? 'Re-establishing secure civic link...' : 'Initializing new democratic footprint...'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyber-blue/50 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyber-blue/50 transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyber-blue/50 transition-colors"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-cyber-blue text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyber-blue font-bold ml-2 hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
