import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> Ortga qaytish
        </button>
        <h2 className="about-title">Gokki AI haqida</h2>
      </div>
      
      <div className="about-container">
        <div className="about-card">
          <div className="card-icon">🏗️</div>
          <h3>Loyiha ma'lumotlari</h3>
          <div className="card-content">
            <p><strong>Versiya:</strong> 1.0.0 (Beta)</p>
            <p><strong>Yaratilgan yili:</strong> 2026-yil</p>
            <p><strong>Dasturchi:</strong> Talantov Behruz</p>
          </div>
        </div>

        <div className="about-card">
          <div className="card-icon">🚀</div>
          <h3>Texnologik stek</h3>
          <div className="card-content">
            <ul>
              <li><strong>Frontend:</strong> React.js 19</li>
              <li><strong>Router:</strong> React Router v7</li>
              <li><strong>Dizayn:</strong> CSS Variables & Glassmorphism</li>
            </ul>
          </div>
        </div>

        <div className="about-card">
          <div className="card-icon">✨</div>
          <h3>Imkoniyatlar</h3>
          <div className="card-content">
            <ul>
              <li>Neon Minimalist & Modern UI</li>
              <li>Adaptive (Mobile First) Dizayn</li>
              <li>Real-time AI interaktivligi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;