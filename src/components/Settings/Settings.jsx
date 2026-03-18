import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsModal.css';

const Settings = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Ma'lumotlarni yuklash
  const userName = localStorage.getItem('userName') || 'Foydalanuvchi';
  const userAvatar = localStorage.getItem('userAvatar') || 'https://via.placeholder.com/80';
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');
  const [enterToSend, setEnterToSend] = useState(true);
  const [creativity, setCreativity] = useState(0.7);

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
          {/* PROFIL TAB */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h3>Profil ma'lumotlari</h3>
              <div className="profile-preview-card">
                <div className="profile-info-main">
                  {/* DOIRA ICHIDA RASM */}
                  <div className="avatar-circle">
                    <img src={userAvatar} alt="User" className="avatar-img" />
                  </div>
                  <div className="profile-details">
                    <h4>{userName}</h4>
                    <p>ID: #83429</p>
                    <span className="status-online">● Onlayn</span>
                  </div>
                </div>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  👤 Profilni tahrirlash
                </button>
              </div>
            </div>
          )}

          {/* UMUMIY TAB */}
          {activeTab === 'general' && (
            <div className="tab-content">
              <h3>Umumiy sozlamalar</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <span>Tungi rejim</span>
                  <p>Mavzuni qorong'u holatga o'tkazish</p>
                </div>
                <input type="checkbox" className="simple-switch" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              </div>
              <div className="setting-item">
                <span>Enter orqali yuborish</span>
                <input type="checkbox" className="simple-switch" checked={enterToSend} onChange={() => setEnterToSend(!enterToSend)} />
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="tab-content">
              <h3>AI Parametrlari</h3>
              <div className="setting-item column">
                <span>Ijodiylik (Creativity)</span>
                <div className="range-wrapper">
                  <input type="range" min="0" max="1" step="0.1" value={creativity} onChange={(e) => setCreativity(e.target.value)} className="custom-range" />
                  <span className="value-badge">{creativity}</span>
                </div>
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