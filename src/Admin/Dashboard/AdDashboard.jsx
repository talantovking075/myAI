import React from 'react';
import Statistika from '../Static/Statistika'; // Yo'l to'g'riligini tekshiring
import './AdDashboard.css'; // FAYL NOMIGA E'TIBOR BERING!

const AddDash = ({ users }) => {
  return (
    <div className="dash-wrapper">
      <div className="dash-header">
        <h1>Dashboard Ko'rsatkichlari</h1>
        <p>Tizimning umumiy holati va jonli statistika</p>
      </div>

      <Statistika userCount={users?.length} />

      <div className="dash-grid-secondary">
        <div className="activity-panel">
          <div className="panel-head">
            <h3>So'nggi harakatlar</h3>
            <button className="btn-mini">Hammasi</button>
          </div>
          <div className="activity-list">
            <div className="act-item">
              <div className="act-dot blue"></div>
              <p>Yangi foydalanuvchi ro'yxatdan o'tdi: <b>behruz_dev</b></p>
              <span>12 min oldin</span>
            </div>
            <div className="act-item">
              <div className="act-dot red"></div>
              <p>Foydalanuvchi o'chirildi: <b>test_user</b></p>
              <span>1 soat oldin</span>
            </div>
            <div className="act-item">
              <div className="act-dot green"></div>
              <p>Server holati: <b>Optimal</b></p>
              <span>3 soat oldin</span>
            </div>
          </div>
        </div>

        <div className="quick-stats">
          <h3>Tizim Yuklamasi</h3>
          <div className="progress-container">
            <div className="progress-info">
              <span>CPU</span>
              <span>42%</span>
            </div>
            <div className="progress-bar">
                <div className="bar-fill" style={{width: '42%'}}></div>
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-info">
              <span>RAM</span>
              <span>68%</span>
            </div>
            <div className="progress-bar">
                <div className="bar-fill" style={{width: '68%', background: '#ff4d4d'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDash; // BU QISMI JUDA MUHIM!