import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsModal.css';

const Settings = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userName] = useState(localStorage.getItem('userName') || 'Foydalanuvchi');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  const handleEditProfile = () => {
    onClose(); 
    navigate('/profile'); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-sidebar">
          <h3>Sozlamalar</h3>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>👤 Profil</button>
          <button className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>⚙️ Umumiy</button>
          <button className={activeTab === 'ai' ? 'active' : ''} onClick={() => setActiveTab('ai')}>🤖 AI Modeli</button>
          <button className="close-sidebar-btn" onClick={onClose}>Yopish</button>
        </div>

        <div className="modal-body">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h3>Profil ma'lumotlari</h3>
              <div className="profile-preview-card">
                <div className="profile-info-main">
                  <div className="profile-avatar">{userName.charAt(0).toUpperCase()}</div>
                  <div className="profile-details">
                    <h4>{userName}</h4>
                    <p>ID: #83429</p>
                    <span className="status-online">Onlayn</span>
                  </div>
                </div>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  👤 Profilni tahrirlash
                </button>
              </div>
              <div className="profile-stats">
                <div className="stat-item"><span>Xabarlar</span><strong>124</strong></div>
                <div className="stat-item"><span>A'zolik</span><strong>Bepul</strong></div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="tab-content">
              <h3>Umumiy sozlamalar</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <span>Tungi rejim</span>
                  <p>Mavzuni qorong'u holatga o'tkazish</p>
                </div>
                <input type="checkbox" className="switch" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span>Enter orqali yuborish</span>
                  <p>Xabarni tezkor yuborish rejimi</p>
                </div>
                <input type="checkbox" className="switch" defaultChecked />
              </div>
              <div className="setting-item">
                <span>Interfeys tili</span>
                <select className="custom-select">
                  <option>O'zbekcha</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="tab-content">
              <h3>AI Parametrlari</h3>
              <div className="setting-item">
                <span>Model</span>
                <select className="custom-select">
                  <option>Gokki-GPT 4o</option>
                  <option>Gokki-Lite</option>
                </select>
              </div>
              <div className="setting-item column">
                <div className="label-row"><span>Creativity</span><span className="value-badge">0.7</span></div>
                <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="custom-range" />
              </div>
              <button className="clear-history-btn">🗑️ Chatni tozalash</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Settings;