import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputArea from './components/InputArea/InputArea';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login'; 
import Register from './Register/Register'; 
import Admin from './Admin/Admin'; 
import Admin2 from './Admin2/Admin2'; 
import Profile from './components/Profile/Profile'; 
import { getAIResponse } from './ChatLogic';
import './App.css';

const App = () => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('gokki_users');
    const initialAccounts = [
      { 
        user: 'behruz', 
        pass: 'admin777', 
        role: 'admin', 
        avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' 
      },
      { 
        user: 'Sakura', 
        pass: 'pink777', 
        role: 'assistant', 
        avatar: 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png' 
      }
    ];

    if (!saved) return initialAccounts;
    const parsed = JSON.parse(saved);
    
    // Initial accounts har doim bo'lishini ta'minlash
    const merged = [...parsed];
    initialAccounts.forEach(init => {
      if (!merged.find(u => u.user.toLowerCase() === init.user.toLowerCase())) {
        merged.push(init);
      }
    });
    return merged;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gokki_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gokki_messages');
    return saved ? JSON.parse(saved) : [{ role: 'ai', text: 'Salom! Men Gokki AI 🌸' }];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('gokki_users', JSON.stringify(users));
    localStorage.setItem('gokki_messages', JSON.stringify(messages));
    if (currentUser) {
      localStorage.setItem('gokki_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gokki_current_user');
    }
  }, [users, messages, currentUser]);

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          !currentUser ? <Login users={users} setCurrentUser={setCurrentUser} /> : 
          (currentUser.role === 'admin' ? <Navigate to="/admin" /> : 
           currentUser.role === 'assistant' ? <Navigate to="/admin2" /> : <Navigate to="/chat" />)
        } />
        <Route path="/register" element={<Register setUsers={setUsers} users={users} />} />
        <Route path="/admin" element={currentUser?.role === 'admin' ? <Admin users={users} currentUser={currentUser} logout={logout} onDelete={deleteUser} /> : <Navigate to="/" />} />
        <Route path="/admin2" element={currentUser?.role === 'assistant' ? <Admin2 users={users} currentUser={currentUser} logout={logout} /> : <Navigate to="/" />} />
        <Route path="/profile" element={currentUser ? <Profile user={currentUser} setUser={setCurrentUser} /> : <Navigate to="/" />} />
        <Route path="/chat" element={
          currentUser ? (
            <div className="app-container">
              <Sidebar userName={currentUser.user} userAvatar={currentUser.avatar} onLogout={logout} onSettingsClick={() => setIsSettingsOpen(true)} />
              {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}
              <main className="main-content">
                <ChatWindow messages={messages} />
                <InputArea input={input} setInput={setInput} onSend={handleSend} />
              </main>
            </div>
          ) : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
};

export default App;