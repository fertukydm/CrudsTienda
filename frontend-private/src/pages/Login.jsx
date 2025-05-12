 import React from 'react';
 import { Link } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  return (
    <div className="login-background">
      <div className="overlay"></div>

      <div className="login-container">
        {/* Imagen lateral */}
        <div className="login-image-container">
          <div className="image-wrapper">
            <img
              src="/public/25.25.png"
              className="login-image"
            />
           
          </div>
        </div>

        {/* Formulario */}
        <form className="login-form">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" placeholder="Correo Electrónico" />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Contraseña" />

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
