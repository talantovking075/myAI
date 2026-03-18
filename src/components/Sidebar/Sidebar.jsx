import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  

const Sidebar = ({ chatHistory = [], onNewChat, onSettingsClick }) => {
  return (
    <aside className="sidebar">
      <div>
        <div className="Sidebar_title">Gokki AI</div>

      <button className="new-chat-btn" onClick={onNewChat}>
        + Yangi suhbat
      </button>

      <div className="chat-list">
        {chatHistory.map((chat) => (
          <Link key={chat.id} to={`/chat/${chat.id}`} className="chat-item">
            {chat.title || `Suhbat ${chat.id}`}
          </Link>
        ))}
      </div>
      </div>

      <div className="sidebar-footer">
        <Link to="/about" className="chat-item">
          ℹ️ Haqida
        </Link>
        <div className="chat-item" onClick={onSettingsClick} style={{ cursor: 'pointer' }}>
          ⚙️ Sozlamalar
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;