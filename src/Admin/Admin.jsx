import React, { useState } from 'react';
import './Admin.css';
import AddDash from '../Admin/Dashboard/AdDashboard';
import AdminChat from '../AdminChat/AdminChat';

const Admin = ({ users, currentUser, logout, onDelete }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('users');

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Foydalanuvchilar', icon: '👤' },
    { id: 'chat', label: 'Admin Chat', icon: '💬' },
  ];

  return (
    <div className="gokki-admin-wrapper">
      <div className="admin-layout">
        <aside className="sidebar-container">
          <div className="sidebar-glass-card">
            <div className="brand-section">
              <h1 className="neon-logo">GOKKI <span>ADMIN</span></h1>
            </div>

            <div className="admin-profile-box">
              <div className="avatar-glow">
                <img src={currentUser.avatar} alt="admin" />
              </div>
              <h3>{currentUser.user}</h3>
              <p>Boshqaruvchi</p>
            </div>

            <nav className="side-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <button className="nav-btn logout-btn" onClick={logout}>
                <span className="nav-icon">🚪</span> Chiqish
              </button>
            </nav>
          </div>
        </aside>

        <main className="content-area">
          <div className="content-glass-card">
            {activeTab === 'dash' && <AddDash users={users} />}
            
            {activeTab === 'chat' && <AdminChat currentUser={currentUser} />}

            {activeTab === 'users' && (
              <section className="users-section">
                <div className="section-header">
                  <div className="title-group">
                    <h2 className="neon-title">FOYDALANUVCHILAR</h2>
                    <div className="title-line"></div>
                  </div>
                  <div className="stats-badge">Jami: <b>{users.length}</b></div>
                </div>

                <div className="table-responsive">
                  <table className="neon-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>FOYDALANUVCHI</th>
                        <th>ROLI</th>
                        <th>AMALLAR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, index) => (
                        <tr key={index}>
                          <td>#{index + 1}</td>
                          <td>
                            <div className="user-flex">
                              <div className="mini-avatar-wrapper">
                                <img src={u.avatar} alt="" className="mini-img" />
                              </div>
                              <span>{u.user}</span>
                            </div>
                          </td>
                          <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                          <td>
                            <div className="action-btns">
                              <button className="view-link" onClick={() => setSelectedUser(u)}>👁️</button>
                              {u.role !== 'admin' && (
                                <button className="del-link" onClick={() => onDelete(u.user)}>🗑️</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        </main>

        {/* VIEW MODAL OYNASI */}
        {selectedUser && (
          <div className="neon-modal-overlay" onClick={() => setSelectedUser(null)}>
            <div className="neon-modal-card" onClick={e => e.stopPropagation()}>
              <div className="modal-close-icon" onClick={() => setSelectedUser(null)}>×</div>
              
              <div className="modal-profile-header">
                <div className="modal-avatar-glow">
                  <img src={selectedUser.avatar} alt="user" />
                </div>
                <h2 className="modal-username">{selectedUser.user}</h2>
                <span className={`modal-badge ${selectedUser.role}`}>{selectedUser.role}</span>
              </div>

              <div className="modal-info-grid">
                <div className="info-box">
                  <label>Foydalanuvchi ID</label>
                  <span>#834{Math.floor(Math.random() * 100)}</span>
                </div>
                <div className="info-box">
                  <label>Holati</label>
                  <span className="status-online">● Onlayn</span>
                </div>
                <div className="info-box">
                  <label>A'zolik</label>
                  <span>Bepul</span>
                </div>
                <div className="info-box">
                  <label>Xabarlar soni</label>
                  <span>124 ta</span>
                </div>
              </div>

              <button className="modal-btn-close" onClick={() => setSelectedUser(null)}>
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;