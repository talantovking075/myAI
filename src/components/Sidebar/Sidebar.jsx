import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ chatHistory, onNewChat, onSettingsClick }) => (
  <aside className="sidebar">
    <div className="Sidebar_title">Gokki AI</div>
    <button className="new-chat-btn" onClick={onNewChat}>+ Yangi chat</button>
    
    <div className="menu-section">
      {chatHistory.map(chat => (
        <Link key={chat.id} to={`/chat/${chat.id}`} className="chat-item">
          💬 {chat.title}
        </Link>
      ))}
    </div>

    <div className="menu-footer">
      <Link to="/about" className="chat-item">ℹ️ Gokki AI haqida</Link>
      
      <div className="chat-item" onClick={onSettingsClick} style={{ cursor: 'pointer' }}>
        ⚙️ Sozlamalar
      </div>
    </div>
  </aside>
);

export default Sidebar;