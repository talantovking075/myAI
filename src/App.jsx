import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputArea from './components/InputArea/InputArea';
import Settings from './components/Settings/Settings';
import About from './components/About/About';
import Login from './components/Login/Login'; 
import Register from './Register/Register'; 
import Admin from './Admin/Admin'; 
import Profile from './components/Profile/Profile'; // <-- 1. IMPORT QILINDI
import { getAIResponse } from './ChatLogic';
import './App.css';

const App = () => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('gokki_users');
    const adminAccount = { user: 'behruz', pass: 'admin777', role: 'admin' };
    return saved ? JSON.parse(saved) : [adminAccount];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gokki_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gokki_messages');
    return saved ? JSON.parse(saved) : [{ role: 'ai', text: 'Salom! Men Gokki AI. Sizga qanday yordam bera olaman?' }];
  });

  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('gokki_users', JSON.stringify(users));
    localStorage.setItem('gokki_messages', JSON.stringify(messages));
    if (currentUser) localStorage.setItem('gokki_current_user', JSON.stringify(currentUser));
    else localStorage.removeItem('gokki_current_user');
  }, [users, messages, currentUser]);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiText = getAIResponse(currentInput);
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setLoading(false);
    }, 600);
  };

  const logout = () => {
    setCurrentUser(null);
    setMessages([{ role: 'ai', text: 'Tizimdan chiqildi. Qaytadan kiring!' }]);
  };

  const deleteUser = (username) => {
    if (username === 'behruz') return alert("Adminni o'chirib bo'lmaydi!");
    if (window.confirm(`${username}ni o'chirmoqchimisiz?`)) {
      setUsers(users.filter(u => u.user !== username));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          !currentUser ? <Login users={users} setCurrentUser={setCurrentUser} /> : 
          (currentUser.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/chat" />)
        } />

        <Route path="/register" element={<Register setUsers={setUsers} users={users} />} />

        <Route path="/admin" element={
          currentUser?.role === 'admin' ? (
            <Admin users={users} logout={logout} onDelete={deleteUser} />
          ) : <Navigate to="/" />
        } />

        {/* PROFILE YO'NALISHI QO'SHILDI */}
        <Route path="/profile" element={
          currentUser ? <Profile user={currentUser} /> : <Navigate to="/" />
        } />

        <Route path="/chat" element={
          currentUser ? (
            <div className="app-container">
              <Sidebar 
                userName={currentUser.user}
                onLogout={logout}
                onNewChat={() => setMessages([{ role: 'ai', text: 'Yangi suhbat boshlandi!' }])}
                onSettingsClick={() => setIsSettingsOpen(true)}
                chatHistory={messages.length > 1 ? [{id: 1, title: "Joriy suhbat"}] : []}
              />
              {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}
              <main className="main-content">
                <header className="chat-header">
                  <h1 className='chat-title'>Gokki AI</h1>
                </header>
                <ChatWindow messages={messages} />
                <InputArea input={input} setInput={setInput} onSend={handleSend} />
                {loading && <div className="loading-bar">Gokki o'ylamoqda...</div>}
              </main>
            </div>
          ) : <Navigate to="/" />
        } />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;