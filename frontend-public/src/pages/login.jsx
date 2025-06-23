import React, { useState } from 'react';
import './login.css';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Lógica para login
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
          mail: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Inicio de sesión exitoso');
        // Aquí puedes redirigir al usuario o guardar un token si lo necesitas
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
      <Toaster position="top-center" reverseOrder={false} />

      <div className="login-section">
        <div className="login-card">
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

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Cargando...' : 'Conectar'}
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
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
