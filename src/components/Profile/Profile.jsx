import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, updateUser }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Local state - foydalanuvchi ma'lumotlarini vaqtincha ushlab turadi
  const [formData, setFormData] = useState({
    user: user?.user || 'Foydalanuvchi',
    email: user?.email || 'user@gokki.ai',
    avatar: user?.avatar || null,
    plan: user?.plan || 'Free'
  });

  const plans = [
    { name: 'Pro', price: '3.99$', features: ['GPT-4o kirish', '100 ta rasm/kun', 'Tezkor javob'] },
    { name: 'Best', price: '10.99$', features: ['Cheksiz xabarlar', 'DALL-E 3', 'Priority Support'], popular: true },
    { name: 'Cosmic', price: '29.99$', features: ['Hamma narsa cheksiz', 'API kirish', 'Maxsus model'] }
  ];

  // Rasm yuklash va Base64 formatga o'tkazish
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Tarifni tanlash
  const selectPlan = (planName) => {
    setFormData(prev => ({ ...prev, plan: planName }));
  };

  // Ma'lumotlarni asosiy App state-iga va localStorage-ga yuborish
  const handleSave = () => {
    updateUser(formData); // Bu funksiya App.js orqali Admin panelni ham yangilaydi
    alert("Ma'lumotlar saqlandi va tarif yangilandi!");
    navigate(-1);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>← Ortga</button>
        <h2>Profil va Tariflar</h2>
      </div>

      <div className="profile-content-card">
        <div className="profile-avatar-section">
          <div className="avatar-display" onClick={() => fileInputRef.current.click()}>
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar" className="avatar-img" />
            ) : (
              <div className="avatar-letter">{formData.user.charAt(0).toUpperCase()}</div>
            )}
            <div className="avatar-overlay">📸</div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <button className="change-avatar-btn" onClick={() => fileInputRef.current.click()}>
            Rasmni o'zgartirish
          </button>
        </div>

        <div className="profile-form">
          <div className="input-field">
            <label>Ism</label>
            <input 
              type="text" 
              value={formData.user} 
              onChange={(e) => setFormData({...formData, user: e.target.value})} 
            />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="profile-actions">
            <button className="cancel-btn" onClick={() => navigate(-1)}>Bekor qilish</button>
            <button className="save-profile-btn" onClick={handleSave}>Saqlash</button>
          </div>
        </div>
      </div>

      <h3 className="section-title">Tarifingizni tanlang</h3>
      <div className="pricing-container">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`pricing-card ${plan.popular ? 'popular' : ''} ${formData.plan === plan.name ? 'active' : ''}`}
          >
            {plan.popular && <span className="popular-badge">Eng ommabop</span>}
            <h4>{plan.name}</h4>
            <div className="price">{plan.price}<span>/oy</span></div>
            <ul className="features">
              {plan.features.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
            <button 
              className={`plan-btn ${formData.plan === plan.name ? 'current-plan' : ''}`} 
              onClick={() => selectPlan(plan.name)}
            >
              {formData.plan === plan.name ? 'Tanlangan' : 'O’tish'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;