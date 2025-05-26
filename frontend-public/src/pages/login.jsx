import React, { useState } from 'react';
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga


 //Logica para login 
 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);  // Activar carga
  setError(''); // Limpiar posibles errores

  try {
    const response = await fetch('http://localhost:3000/api/login', {
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
    // Si el login es exitoso, mostrar mensaje
    console.log('Login exitoso:', data);
    alert('Login exitoso!');
  } else {
    // Si hay algún error, mostrar mensaje
    setError(data.message || 'Error al hacer login');
  }
} catch (error) {
  console.error('Error de conexión:', error);
  setError('Error de red o del servidor');
} finally {
  setLoading(false);  // Desactivar carga
}
};

// Código de formulario de iniciar sesión
return (
<div className="ok-records-container">
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

          {error && <div className="error-message">{error}</div>} {/* Mostrar error si lo hay */}
          
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
          alt="Imagen de login" 
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