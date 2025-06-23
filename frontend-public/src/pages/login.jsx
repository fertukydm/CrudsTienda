import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await fetch('http://localhost:4001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Inicio de sesión exitoso');
        // Guardar token si es necesario
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        // Opcional: redirigir después del login exitoso
        // navigate('/dashboard');
      } else {
        toast.error(data.message || 'Error al hacer login');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      toast.error('Error de red o del servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ok-records-container">
      <Toaster position="top-center" />
      
      <div className="login-section">
        <div className="login-card">
          <div className="form-side">
            <h1 className="site-title">OK RECORDS</h1>
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email</label>
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

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="links-row">
              <a href="/crear-cuenta" className="auth-link">
                Crear cuenta
              </a>
              <a href="#" className="auth-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div className="image-side">
            <div className="vinyl-image"></div>
            <div className="image-overlay">
              <h2 className="session-text">Inicia Sesión</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="newsletter-section">
        <div className="newsletter-container">
          <h3 className="newsletter-title">
            Suscríbete para recibir actualizaciones sobre nuevos lanzamientos
          </h3>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="newsletter-input"
            />
            <button className="newsletter-button">Suscribirse</button>
          </div>
          <p className="newsletter-info">
            Al suscribirte, aceptas recibir correos de marketing de OK RECORDS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;