import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Komponentlar importi
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputArea from './components/InputArea/InputArea';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login'; 
import Register from './Register/Register'; 
import Admin from './Admin/Admin'; 
import Admin2 from './Admin2/Admin2'; 
import Profile from './components/Profile/Profile'; 
import About from './components/About/About'; // About sahifasini import qilish

// Logika va Stillar
import { getAIResponse } from './ChatLogic';
import './App.css';

const App = () => {
  // --- STATE VA LOGIKA ---
  
  // Foydalanuvchilar ro'yxati (LocalStorage bilan)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('gokki_users');
    const initialAccounts = [
      { user: 'behruz', pass: 'admin777', role: 'admin', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
      { user: 'Sakura', pass: 'pink777', role: 'assistant', avatar: 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png' }
    ];
    if (!saved) return initialAccounts;
    const parsed = JSON.parse(saved);
    const merged = [...parsed];
    initialAccounts.forEach(init => {
      if (!merged.find(u => u.user.toLowerCase() === init.user.toLowerCase())) {
        merged.push(init);
      }
    });
    return merged;
  });

  // Joriy login qilgan foydalanuvchi
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gokki_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Chat xabarlari
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gokki_messages');
    return saved ? JSON.parse(saved) : [{ role: 'ai', text: 'Salom! Men Gokki AI 🌸' }];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // --- EFFECTLAR (LocalStorage yangilash) ---
  useEffect(() => {
    localStorage.setItem('gokki_users', JSON.stringify(users));
    localStorage.setItem('gokki_messages', JSON.stringify(messages));
    if (currentUser) {
      localStorage.setItem('gokki_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gokki_current_user');
    }
  }, [users, messages, currentUser]);

  // --- FUNKSIYALAR ---
  const updateUser = (updatedData) => {
    const newCurrentUser = { ...currentUser, ...updatedData };
    setCurrentUser(newCurrentUser);
    setUsers(prev => prev.map(u => u.user === currentUser.user ? { ...u, ...updatedData } : u));
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: getAIResponse(input) }]);
      setLoading(false);
    }, 600);
  };

  const logout = () => setCurrentUser(null);

  const deleteUser = (username) => {
    if (username === 'behruz') return alert("Asosiy adminni o'chirib bo'lmaydi!");
    if (window.confirm(`${username}ni o'chirmoqchimisiz?`)) {
      setUsers(prev => prev.filter(u => u.user !== username));
    }
  };

  // --- RENDER ---
  return (
    <Router>
      <Routes>
        {/* Asosiy sahifa: Login holatiga qarab yo'naltiradi */}
        <Route path="/" element={
          !currentUser ? <Login users={users} setCurrentUser={setCurrentUser} /> : 
          (currentUser.role === 'admin' ? <Navigate to="/admin" /> : 
           currentUser.role === 'assistant' ? <Navigate to="/admin2" /> : <Navigate to="/chat" />)
        } />

        {/* Ro'yxatdan o'tish */}
        <Route path="/register" element={<Register setUsers={setUsers} users={users} />} />

        {/* Admin panellari */}
        <Route path="/admin" element={currentUser?.role === 'admin' ? <Admin users={users} currentUser={currentUser} logout={logout} onDelete={deleteUser} /> : <Navigate to="/" />} />
        <Route path="/admin2" element={currentUser?.role === 'assistant' ? <Admin2 users={users} currentUser={currentUser} logout={logout} /> : <Navigate to="/" />} />
        
        {/* Profil sahifasi */}
        <Route path="/profile" element={currentUser ? <Profile user={currentUser} updateUser={updateUser} /> : <Navigate to="/" />} />

        {/* About sahifasi (Gokki haqida) */}
        <Route path="/about" element={<About />} />

        {/* Chat sahifasi */}
        <Route path="/chat" element={
          currentUser ? (
            <div className={`app-container ${localStorage.getItem('theme') === 'dark' ? 'dark' : ''}`}>
              <Sidebar 
                userName={currentUser.user} 
                userAvatar={currentUser.avatar} 
                onLogout={logout} 
                onSettingsClick={() => setIsSettingsOpen(true)} 
              />
              {isSettingsOpen && (
                <Settings 
                  user={currentUser} 
                  updateUser={updateUser} 
                  onClose={() => setIsSettingsOpen(false)} 
                />
              )}
              <main className="main-content">
                <ChatWindow messages={messages} />
                <InputArea input={input} setInput={setInput} onSend={handleSend} />
              </main>
            </div>
          ) : <Navigate to="/" />
        } />

        {/* Noto'g'ri URL yozilsa bosh sahifaga otadi */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;