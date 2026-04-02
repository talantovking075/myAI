import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminChat from '../AdminChat/AdminChat';
import './Admin2.css';

const Admin2 = ({ users, currentUser, logout, onDeleteUser }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // O'chirish funksiyasi
  const handleDeleteClick = (username) => {
    if (window.confirm(`${username}ni o'chirishni xohlaysizmi?`)) {
      onDeleteUser(username);
    }
  };

  return (
    <div className="sakura-container">
      <button className="mobile-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <aside className={`sakura-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sakura-logo">Sakura Panel 🌸</div>

        <div className="sakura-profile" onClick={() => navigate('/profile')}>
          <img src={currentUser?.avatar} className="sakura-avatar" alt="avatar" />
          <div className="sakura-profile-details">
            <h4>{currentUser?.user}</h4>
            <span>Admin</span>
          </div>
        </div>

        <nav className="sakura-nav">
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} 
            onClick={() => {setActiveTab('users'); setIsMenuOpen(false)}}
          >
            👥 Foydalanuvchilar
          </button>
          <button 
            className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`} 
            onClick={() => {setActiveTab('chat'); setIsMenuOpen(false)}}
          >
            💬 Admin Chat
          </button>
          <div className="nav-spacer"></div>
          <button className="nav-item logout-btn" onClick={logout}>🚪 Chiqish</button>
        </nav>
      </aside>

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <main className="sakura-main">
        <header className="sakura-header">
          <h1>{activeTab === 'users' ? 'Foydalanuvchilar' : 'Chat'}</h1>
          <div className="user-count">Jami: {users.length}</div>
        </header>

        <div className="sakura-content">
          {activeTab === 'users' ? (
            <div className="table-wrapper">
              <table className="sakura-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Foydalanuvchi</th>
                    <th>Roli</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td>#{i + 1}</td>
                      <td className="user-cell">
                        <img src={u.avatar} alt="" className="table-avatar" />
                        <span>{u.user}</span>
                      </td>
                      <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                      <td className="actions">
                        <button className="btn-view" onClick={() => setSelectedUser(u)}>👁️</button>
                        {u.user !== currentUser?.user && (
                          <button className="btn-delete" onClick={() => handleDeleteClick(u.user)}>🗑️</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <AdminChat currentUser={currentUser} />
          )}
        </div>
      </main>

      {/* View Modal */}
      {selectedUser && (
        <div className="sakura-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="sakura-modal-card" onClick={e => e.stopPropagation()}>
            <img src={selectedUser.avatar} alt="" className="modal-img" />
            <h2>{selectedUser.user}</h2>
            <div className="modal-info">
              <p><strong>Roli:</strong> {selectedUser.role}</p>
              <p><strong>Holati:</strong> Onlayn</p>
              <p><strong>Tarifi:</strong> {selectedUser.plan || 'Free'}</p>
            </div>
            <button className="modal-close" onClick={() => setSelectedUser(null)}>Yopish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin2;