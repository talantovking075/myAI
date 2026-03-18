import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputArea from './components/InputArea/InputArea';
import Settings from './components/Settings/Settings';
import About from './components/About/About';
import Profile from './components/Profile/Profile';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  // Xotiradan eski xabarlarni yuklash
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gokki_messages');
    return saved ? JSON.parse(saved) : [{ role: 'ai', text: 'Salom! Men Gokki AI man. Sizga qanday yordam bera olaman?' }];
  });
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chatHistory] = useState([{ id: 1, title: "Asosiy suhbat" }]);

  const API_KEY = "AIzaSyBeS1rJbT8veMkgPmJtMYmzvnNeUxRixas";

  // Xabarlar o'zgarganda xotiraga saqlash
  useEffect(() => {
    localStorage.setItem('gokki_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const userPrompt = input;
    setInput('');
    setLoading(true);

    try {
      // 404 xatosini yechimi: Model nomidan keyin :generateContent bo'lishi shart!
      const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Sening isming Gokki AI. Seni Talantov Behruz 2026-yilda yaratgan (u 2010-yilda tug'ilgan). 
              Har doim o'zbek tilida javob ber. Foydalanuvchi: ${userPrompt}`
            }]
          }]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0].content) {
        const aiText = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      } else {
        throw new Error("API xatosi");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Kechirasiz, ulanishda xato bo'ldi. Internetni tekshiring." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar
          chatHistory={chatHistory}
          onNewChat={() => {
            setMessages([{ role: 'ai', text: 'Yangi suhbat boshlandi!' }]);
            localStorage.removeItem('gokki_messages');
          }}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

        {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}

        <main className="main-content">
          <header className="chat-header">
            <h1 className='chat-title'>Gokki AI</h1>
          </header>

          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={
              <>
                <ChatWindow messages={messages} />
                <InputArea input={input} setInput={setInput} onSend={handleSend} />
                {loading && <div style={{textAlign: 'center', color: '#00f2ff', paddingBottom: '10px'}}>Gokki yozmoqda...</div>}
              </>
            } />
            <Route path="/chat/:id" element={
              <>
                <ChatWindow messages={messages} />
                <InputArea input={input} setInput={setInput} onSend={handleSend} />
              </>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;