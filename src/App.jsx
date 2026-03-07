import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
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
      let aiText = "Tushunmadim, qaytadan ayta olasizmi?";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('salom')) aiText = "Assalomu alaykum! Ishlaringiz yaxshimi?";
      else if (lowerInput.includes('isming')) aiText = "Mening ismim - Gokki AI.";
      else if (lowerInput.includes('qale')) aiText = "Men ajoyibman, o'zingiz-chi?";
      else aiText = `Siz "${input}" dedingiz. Bu qiziq mavzu ekan!`;

      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="Sidebar_title">Gokki AI</div>
        <button className="new-chat-btn" onClick={() => setMessages([])}>+ New Chat</button>
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