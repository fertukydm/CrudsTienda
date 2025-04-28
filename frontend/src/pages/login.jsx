import React, { useState } from 'react';
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', email, password);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribe with email:', subscribeEmail);
  };

  return (
    <div className="ok-records-container">
      {/* Login section */}
      <div className="login-section">
        <div className="login-card">
          {/* Form side */}
          <div className="form-side">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                Conectar
              </button>
              
              <div className="links-row">
                <a href="#" className="auth-link">¿Olvidó su contraseña?</a>
                <a href="#" className="auth-link">¿Nuevo cliente?</a>
              </div>
            </form>
          </div>
          
         
          <div className="image-side">
            <img 
              src="21.jpg" 
              alt="" 
              className="vinyl-image" 
            />
            <div className="image-overlay">
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;