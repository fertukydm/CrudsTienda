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
      console.log('🔐 Iniciando login para:', email);
      
      const response = await fetch('http://localhost:4001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      // Verificar si la respuesta es JSON válida
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`El servidor devolvió ${contentType} en lugar de JSON. Verifica que el endpoint /api/login exista.`);
      }

      const data = await response.json();
      console.log('📦 Datos recibidos:', data);

      if (response.ok && data.success) {
        toast.success(data.message || 'Inicio de sesión exitoso');
        
        // Guardar token y datos del usuario
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        
        console.log('✅ Login exitoso, usuario:', data.user);
        
        // Opcional: redirigir después del login exitoso
        // setTimeout(() => {
        //   window.location.href = '/dashboard';
        // }, 1500);
        
      } else {
        throw new Error(data.message || `Error HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      
      // Manejar diferentes tipos de errores
      if (error.message.includes('Failed to fetch')) {
        toast.error('No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en el puerto 4001.');
      } else if (error.message.includes('404')) {
        toast.error('El endpoint de login no existe. Verifica la configuración del backend.');
      } else if (error.message.includes('CORS')) {
        toast.error('Error de CORS. Verifica la configuración del servidor.');
      } else if (error.message.includes('Credenciales incorrectas')) {
        toast.error('Email o contraseña incorrectos');
      } else {
        toast.error(error.message || 'Error al iniciar sesión');
      }
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
                  placeholder="usuario@ejemplo.com"
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
                  placeholder="Tu contraseña"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={loading || !email.trim() || !password}
                style={{
                  opacity: (loading || !email.trim() || !password) ? 0.7 : 1,
                  cursor: (loading || !email.trim() || !password) ? 'not-allowed' : 'pointer'
                }}
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
    
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;