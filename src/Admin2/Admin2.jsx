import React, { useState } from 'react';
import AdminChat from '../AdminChat/AdminChat';
import './Admin2.css';

const Admin2 = ({ users, currentUser, logout }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobil menyu uchun

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="asst-container">
      {/* Mobil menyu tugmasi (faqat telefonda ko'rinadi) */}
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <aside className={`asst-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="asst-logo-area">
          <span className="asst-logo-text">Sakura Panel 🌸</span>
        </div>

        <div className="asst-profile-card">
          <img src={currentUser?.avatar} className="asst-avatar-img" alt="avatar" />
          <h4 className="asst-username">{currentUser?.user}</h4>
          <span className="asst-role-label">Moderator</span>
        </div>

        <nav className="asst-nav">
          <button 
            className={`asst-menu-btn ${activeTab === 'users' ? 'active' : ''}`} 
            onClick={() => {setActiveTab('users'); setIsMenuOpen(false)}}
          >
            👥 Foydalanuvchilar
          </button>
          <button 
            className={`asst-menu-btn ${activeTab === 'chat' ? 'active' : ''}`} 
            onClick={() => {setActiveTab('chat'); setIsMenuOpen(false)}}
          >
            💬 Admin Chat
          </button>
          <div className="nav-spacer"></div>
          <button className="asst-menu-btn logout-special" onClick={logout}>🚪 Chiqish</button>
        </nav>
      </aside>

      {/* Menyu ochiqligida fonni qoplab turuvchi qatlam */}
      {isMenuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}

      <main className="asst-main-content">
        <header className="asst-header">
          <h1>{activeTab === 'users' ? 'Foydalanuvchilar' : 'Chat'}</h1>
          <div className="status-indicator">● Online</div>
        </header>

        <div className="asst-render-area">
          {activeTab === 'users' ? (
            <div className="asst-table-container">
              <div className="table-responsive">
                <table className="asst-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Foydalanuvchi</th>
                      <th>Roli</th>
                      <th>Amal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td className="user-td">
                          <img src={u.avatar} alt="" className="mini-avatar" />
                          <span>{u.user}</span>
                        </td>
                        <td><span className={`role-pill ${u.role}`}>{u.role}</span></td>
                        <td><button className="asst-action-btn">👁️</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <AdminChat currentUser={currentUser} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin2;