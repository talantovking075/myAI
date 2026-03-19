import React, { useState } from 'react';
import './Admin.css';
import AddDash from '../Admin/Dashboard/AdDashboard'; // Yangi Dashboard

const Admin = ({ users, logout, onDelete }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('users'); // 'users' yoki 'dash'

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">Gokki Admin</div>
        <nav className="admin-nav">
          {/* Dashboard tugmasi qo'shildi */}
          <button 
            className={`nav-item ${activeTab === 'dash' ? 'active' : ''}`}
            onClick={() => setActiveTab('dash')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👤 Foydalanuvchilar
          </button>
          <button className="nav-item logout" onClick={logout}>🚪 Chiqish</button>
        </nav>
      </aside>

      <main className="admin-main">
        {activeTab === 'dash' ? (
          <AddDash users={users} /> // Dashboard bo'limi
        ) : (
          <>
            <header className="admin-header">
              <h2>Barcha Foydalanuvchilar</h2>
              <div className="stats-bar">
                Jami: <span>{users.length}</span> ta foydalanuvchi
              </div>
            </header>

            <div className="table-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>ROLI</th>
                    <th>AMALLAR</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={index} className="table-row">
                      <td>{index + 1}</td>
                      <td className="user-name-cell">
                        <div className="user-info-wrapper">
                          <img 
                            src={u.avatar || 'https://via.placeholder.com/35'} 
                            alt="avatar" 
                            className="admin-mini-avatar" 
                          />
                          <span>{u.user}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge ${u.role}`}>{u.role}</span>
                      </td>
                      <td className="actions-cell">
                        <button className="btn-view" onClick={() => setSelectedUser(u)}>
                          👁️ Ko'rish
                        </button>
                        {u.role !== 'admin' ? (
                          <button className="btn-delete" onClick={() => onDelete(u.user)}>
                            O'chirish
                          </button>
                        ) : (
                          <span className="admin-lock">🔒 Tizim</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Modal qismi o'zgarishsiz qoladi */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="profile-card" onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <div className="avatar-big-container">
                <img 
                  src={selectedUser.avatar || 'https://via.placeholder.com/100'} 
                  alt="User avatar" 
                  className="avatar-big-img"
                />
              </div>
              <h3>{selectedUser.user}</h3>
              <span className="badge">{selectedUser.role}</span>
            </div>
            <div className="card-body">
              <div className="info-item">
                <label>Username:</label>
                <span>{selectedUser.user}</span>
              </div>
              <div className="info-item">
                <label>Parol:</label>
                <span className="pass-text">{selectedUser.pass}</span>
              </div>
            </div>
            <button className="btn-close" onClick={() => setSelectedUser(null)}>Yopish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;