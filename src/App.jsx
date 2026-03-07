import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState(null);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Salom! Men Gokki AI man. Siz bilan suhbatlashishga tayyorman.' }
  ]);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let aiText = "";

      if (lowerInput.includes('mening ismim') || lowerInput.includes('ismim ')) {
        const nameParts = input.split(' ');
        const name = nameParts[nameParts.length - 1];
        setUserName(name);
        aiText = `${name} zorakanu! Nma ish qlas ${name}?`;
      } 
      else if (lowerInput.includes('salom')) {
        aiText = "Assalomu alaykum! Ishlaringiz yaxshimi?";
      } 
      else if (lowerInput.includes('isming') || lowerInput.includes('ismingiz') || lowerInput.includes('ismin')) {
        aiText = "Nma gap ! Mening ismim Gokki AI, sizniki nima?";
      } 
      else if (lowerInput.includes('zor')) {
        aiText = "O'o'o'o nma boldi bugun km xursand qildi ";
      } 
      else if (lowerInput.includes('qale') || lowerInput.includes('qalesan') || lowerInput.includes('qalesiz') || lowerInput.includes('nma gap')) {
        aiText = "Vapshe mazza, oziz qalesiz?";
      } 
      else {
        aiText = `"${input}" yo torisi bu mavzuda bilmasakanman organb kelaman mani yaratgan odam ja unchali zooor Dasturchi mas lkn mani yarati siz manga salom , isming , qale kabi savollar bersangiz javob beraman`;
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="Sidebar_title">Gokki AI</div>
        <button className="new-chat-btn" onClick={() => { setMessages([]); setUserName(null); }}>+ New Chat</button>
      </aside>

      <main className="main-content">
        <header className="chat-header"><h1>Gokki AI</h1></header>
        
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="bubble">{msg.text}</div>
            </div>
          ))}
          {loading && <div className="message ai"><div className="bubble">Gokki yozmoqda...</div></div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message AI..." 
            />
            <button className="send-btn" onClick={handleSend}>➔</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App; 