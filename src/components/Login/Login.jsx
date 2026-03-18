import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = ({ users, setCurrentUser }) => {
  const [form, setForm] = useState({ user: '', pass: '' });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const found = users.find(u => u.user === form.user && u.pass === form.pass);
    if (found) {
      setCurrentUser(found);
      found.role === 'admin' ? navigate('/admin') : navigate('/chat');
    } else {
      alert("Xato!");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Gokki AI</h2>
        <input type="text" placeholder="Login" required onChange={e => setForm({...form, user: e.target.value})} />
        <div className="password-field">
          <input 
            type={showPass ? "text" : "password"} 
            placeholder="Parol" 
            required 
            onChange={e => setForm({...form, pass: e.target.value})} 
          />
          <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
            {showPass ? "⏹" : "⏺"}
          </button>
        </div>
        <button type="submit">Kirish</button>
        <p>Akkount yo'qmi? <Link to="/register">Yaratish</Link></p>
      </form>
    </div>
  );
};

export default Login;