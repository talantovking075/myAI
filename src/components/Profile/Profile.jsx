        import React, { useState, useRef } from 'react';
        import { useNavigate } from 'react-router-dom';
        import './Profile.css';

        const Profile = () => {
        const navigate = useNavigate();
        const fileInputRef = useRef(null);
        
        const [name, setName] = useState(localStorage.getItem('userName') || 'Foydalanuvchi');
        const [email, setEmail] = useState(localStorage.getItem('userEmail') || 'user@gokki.ai');
        const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || null);
        const [activePlan, setActivePlan] = useState(localStorage.getItem('userPlan') || 'Free');

        const plans = [
            { name: 'Pro', price: '3.99$', features: ['GPT-4o kirish', '100 ta rasm/kun', 'Tezkor javob'] },
            { name: 'Best', price: '10.99$', features: ['Cheksiz xabarlar', 'DALL-E 3', 'Priority Support'], popular: true },
            { name: 'Cosmic', price: '29.99$', features: ['Hamma narsa cheksiz', 'API kirish', 'Maxsus model'] }
        ];

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
            }
        };

        const selectPlan = (planName) => {
            setActivePlan(planName);
            localStorage.setItem('userPlan', planName);
        };

        const handleSave = () => {
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            if (avatar) localStorage.setItem('userAvatar', avatar);
            alert("Ma'lumotlar saqlandi!");
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
                <div className="avatar-display">
                    {avatar ? <img src={avatar} alt="Avatar" className="avatar-img" /> : <span>{name.charAt(0).toUpperCase()}</span>}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
                <button className="change-avatar-btn" onClick={() => fileInputRef.current.click()}>Rasmni o'zgartirish</button>
                </div>

                <div className="profile-form">
                <div className="input-field"><label>Ism</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="input-field"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div className="profile-actions">
                    <button className="cancel-btn" onClick={() => navigate(-1)}>Bekor qilish</button>
                    <button className="save-profile-btn" onClick={handleSave}>Saqlash</button>
                </div>
                </div>
            </div>

            <h3 className="section-title">Tarifingizni tanlang</h3>
            <div className="pricing-container">
                {plans.map((plan) => (
                <div key={plan.name} className={`pricing-card ${plan.popular ? 'popular' : ''} ${activePlan === plan.name ? 'active' : ''}`}>
                    {plan.popular && <span className="popular-badge">Eng ommabop</span>}
                    <h4>{plan.name}</h4>
                    <div className="price">{plan.price}<span>/oy</span></div>
                    <ul className="features">
                    {plan.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                    </ul>
                    <button className="plan-btn" onClick={() => selectPlan(plan.name)}>
                    {activePlan === plan.name ? 'Tanlangan' : 'O’tish'}
                    </button>
                </div>
                ))}
            </div>
            </div>
        );
        };

        export default Profile;