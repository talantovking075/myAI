import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsModal.css';

const Settings = ({ user, updateUser, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');
  const [enterToSend, setEnterToSend] = useState(() => localStorage.getItem('enterToSend') !== 'false');
  const [creativity, setCreativity] = useState(() => localStorage.getItem('creativity') || 0.7);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  const handleToggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const handleToggleEnter = () => {
    const newValue = !enterToSend;
    setEnterToSend(newValue);
    localStorage.setItem('enterToSend', newValue);
  };

  const handleCreativity = (val) => {
    setCreativity(val);
    localStorage.setItem('creativity', val);
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
                  <div className="avatar-circle">
                    <img src={user.avatar} alt="User" className="avatar-img" />
                  </div>
                  <div className="profile-details">
                    <h4>{user.user}</h4>
                    <p>ID: #00001</p>
                    <span className="status-online">● Onlayn</span>
                  </div>
                </div>
                <button className="edit-profile-btn" onClick={() => { onClose(); navigate('/profile'); }}>
                  👤 Profilni tahrirlash
                </button>
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
                <input type="checkbox" className="simple-switch" checked={isDarkMode} onChange={handleToggleTheme} />
              </div>
              <div className="setting-item">
                <span>Enter orqali yuborish</span>
                <input type="checkbox" className="simple-switch" checked={enterToSend} onChange={handleToggleEnter} />
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="tab-content">
              <h3>AI Parametrlari</h3>
              <div className="setting-item column">
                <span>Ijodiylik (Creativity)</span>
                <div className="range-wrapper">
                  <input type="range" min="0" max="1" step="0.1" value={creativity} onChange={(e) => handleCreativity(e.target.value)} className="custom-range" />
                  <span className="value-badge">{creativity}</span>
                </div>
              </div>
              <button className="clear-history-btn" onClick={() => { localStorage.removeItem('gokki_messages'); window.location.reload(); }}>🗑️ Chatni tozalash</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;