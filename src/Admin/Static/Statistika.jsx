import React from 'react';
import './Statistika.css';

const Statistika = ({ userCount }) => {
  const stats = [
    {
      id: 1,
      title: 'Jami Foydalanuvchilar',
      value: userCount || 0,
      icon: '👥',
      color: '#00f2ff'
    },
    {
      id: 2,
      title: 'Faol Seanslar',
      value: '24',
      icon: '⚡',
      color: '#39ff14'
    },
    {
      id: 3,
      title: 'Xabarlar Statistikasi',
      value: '1,284',
      icon: '💬',
      color: '#ff4d4d'
    }
  ];

  return (
    <div className="stat-grid">
      {stats.map((item) => (
        <div 
          key={item.id} 
          className="stat-card" 
          style={{ '--clr': item.color }}
        >
          <div className="stat-icon">{item.icon}</div>
          <div className="stat-info">
            <h3>{item.title}</h3>
            <p className="stat-value">{item.value}</p>
          </div>
          <div className="card-glow"></div>
        </div>
      ))}
    </div>
  );
};

export default Statistika;