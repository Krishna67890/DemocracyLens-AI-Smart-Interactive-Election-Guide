import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('democracy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('democracy_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        name: foundUser.name,
        level: foundUser.level || 1,
        xp: foundUser.xp || 0,
        photo: foundUser.photo || null,
        address: foundUser.address || '',
        phone: foundUser.phone || '',
        votesCount: foundUser.votesCount || 0,
        lastVoteTime: foundUser.lastVoteTime || null,
        votedYears: foundUser.votedYears || [],
        dailyProgress: foundUser.dailyProgress || {}
      };
      setUser(userData);
      localStorage.setItem('democracy_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('democracy_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      name,
      email,
      password,
      level: 1,
      xp: 0,
      photo: null,
      address: '',
      phone: '',
      votesCount: 0,
      lastVoteTime: null,
      votedYears: [],
      dailyProgress: {}
    };
    users.push(newUser);
    localStorage.setItem('democracy_users', JSON.stringify(users));

    const userData = { ...newUser };
    delete userData.password;
    setUser(userData);
    localStorage.setItem('democracy_user', JSON.stringify(userData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('democracy_user');
  };

  const updateUser = (data) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('democracy_user', JSON.stringify(updated));

      const users = JSON.parse(localStorage.getItem('democracy_users') || '[]');
      const userIndex = users.findIndex(u => u.email === prev.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem('democracy_users', JSON.stringify(users));
      }
      return updated;
    });
  };

  const addVote = (year = new Date().getFullYear()) => {
    setUser(prev => {
      if (!prev) return prev;
      const now = new Date().getTime();
      const todayDate = new Date(now).toDateString();

      let newVotesCount = (prev.votesCount || 0);
      const lastDate = prev.lastVoteTime ? new Date(prev.lastVoteTime).toDateString() : null;

      if (lastDate && lastDate !== todayDate) {
        newVotesCount = 1;
      } else {
        newVotesCount += 1;
      }

      // Update daily progress history
      const newDailyProgress = { ...(prev.dailyProgress || {}) };
      newDailyProgress[todayDate] = (newDailyProgress[todayDate] || 0) + 1;

      const newVotedYears = [...(prev.votedYears || [])];
      if (!newVotedYears.includes(year)) {
        newVotedYears.push(year);
      }
      const data = {
        votesCount: newVotesCount,
        votedYears: newVotedYears,
        lastVoteTime: now,
        dailyProgress: newDailyProgress
      };
      const updated = { ...prev, ...data };

      localStorage.setItem('democracy_user', JSON.stringify(updated));
      const users = JSON.parse(localStorage.getItem('democracy_users') || '[]');
      const userIndex = users.findIndex(u => u.email === prev.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem('democracy_users', JSON.stringify(users));
      }
      return updated;
    });
  };

  const updateProgress = (xpAmount) => {
    setUser(prev => {
      if (!prev) return prev;
      const newXp = (prev.xp || 0) + xpAmount;
      const newLevel = Math.floor(newXp / 500) + 1;
      const data = { xp: newXp, level: newLevel };
      const updated = { ...prev, ...data };

      localStorage.setItem('democracy_user', JSON.stringify(updated));
      const users = JSON.parse(localStorage.getItem('democracy_users') || '[]');
      const userIndex = users.findIndex(u => u.email === prev.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem('democracy_users', JSON.stringify(users));
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateProgress, updateUser, addVote }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
