import React, { useState, useEffect, useRef } from 'react';
import './AdminChat.css';

const AdminChat = ({ currentUser }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gokki_admin_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem('gokki_admin_chat', JSON.stringify(messages));
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: currentUser.user,
      avatar: currentUser.avatar,
      msg: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setText('');
  };

  return (
    <div className="chat-container-responsive">
      <div className="chat-header-info">
        <h3>Admin Chat 🔒</h3>
        <p>Xabarlar faqat adminlar orasida ko'rinadi</p>
      </div>
      <div className="chat-messages-area">
        {messages.map((m) => (
          <div key={m.id} className={`message-row ${m.sender === currentUser.user ? 'my-msg' : 'other-msg'}`}>
            <img src={m.avatar} alt="" className="chat-mini-avatar" />
            <div className="msg-bubble">
              <span className="msg-author">{m.sender}</span>
              <p>{m.msg}</p>
              <span className="msg-time">{m.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input-wrapper" onSubmit={handleSend}>
        <input 
          type="text" 
          placeholder="Xabar yozing..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Yuborish</button>
      </form>
    </div>
  );
};

export default AdminChat;