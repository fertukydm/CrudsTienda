
 import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevenir que recargue la página

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login exitoso:', data);
        // Aquí podrías redirigir o guardar token, etc.
      } else {
        console.error('Error en login:', data.message);
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <div className="login-background">
      <div className="overlay"></div>

      <div className="login-container">
        {/* Imagen lateral */}
        <div className="login-image-container">
          <div className="image-wrapper">
            <img
              src="/25.25.png" // Nota: quita `/public` del src si estás en Vite
              className="login-image"
              alt="Login"
            />
          </div>
        </div>

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Conectar</button>

          <div className="forgot-password">
            <Link to="/recuperar">¿Olvidó su contraseña?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



