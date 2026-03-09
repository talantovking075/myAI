import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Ortga qaytish</button>
      
      <h2>Gokki AI haqida</h2>
      <div className="contener">
        <div className="about-section">
        <h3>Versiya va Yaratilgan yili</h3>
        <p><strong>Versiya:</strong> 1.0.0 (Beta)</p>
        <p><strong>Yaratilgan yili:</strong> 2026-yil</p>
        <p><strong>Yaratuvchi:</strong> Talantov Behruz</p>
      </div>

      <div className="about-section">
        <h3>Texnologik stek</h3>
        <p>Gokki AI zamonaviy veb-texnologiyalar asosida qurilgan:</p>
        <ul>
          <li><strong>Frontend:</strong> React.js</li>
          <li><strong>Router:</strong> React Router v7</li>
          <li><strong>Stilizatsiya:</strong> CSS3 (Custom Variables)</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>O'ziga xos xususiyatlari</h3>
        <ul>
          <li><strong>Neon Minimalist Dizayn:</strong> Ko'zga qulay va zamonaviy interfeys.</li>
          <li><strong>Moslashuvchanlik:</strong> Mobil va desktop qurilmalarda birdek ishlaydi.</li>
          <li><strong>Interaktivlik:</strong> Foydalanuvchi bilan real vaqtda suhbatlashish qobiliyati.</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default About;