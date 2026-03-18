import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ setUsers, users }) => {
  const [form, setForm] = useState({ user: '', pass: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (users.find(u => u.user === form.user)) {
      return alert("Bu login band!");
    }

    const newUser = { ...form, role: 'user' };
    setUsers(prev => [...prev, newUser]);
    alert("Ro'yxatdan o'tdingiz! Endi login qiling.");
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Yangi hisob yaratish</h2>
        <input 
          type="text" 
          placeholder="Login tanlang" 
          required 
          onChange={e => setForm({...form, user: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Parol yarating" 
          required 
          onChange={e => setForm({...form, pass: e.target.value})} 
        />
        <button type="submit">Ro'yxatdan o'tish</button>
      </form>
    </div>
  );
};

export default Register;