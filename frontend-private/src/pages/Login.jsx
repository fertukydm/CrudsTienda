import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // Importar contexto de autenticación
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { Login } = useAuth(); // Usamos la función Login del contexto

  fetch("http://localhost:4001/api/login")
  .then(res => res.text()) // Cambia `.json()` a `.text()` para ver si es HTML
  .then(data => console.log(data));


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
  
    const success = await Login(email, password); // Usar Login del contexto
  
    if (success) {
      toast.success("¡Inicio de sesión exitoso! Bienvenido.");
      console.log("Redirigiendo a Home...");
      navigate("/"); 
    } else {
      toast.error("Credenciales incorrectas o error en el servidor.");
    }
  };
  

  return (
    <div className="login-background">
      <Toaster />
      <div className="overlay"></div>
      <div className="login-container">
        <div className="login-image-container">
          <div className="image-wrapper">
            <img
              src="/25.25.png" // El archivo de imagen de login
              alt="Login visual"
              className="login-image"
            />
          </div>
        </div>

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
