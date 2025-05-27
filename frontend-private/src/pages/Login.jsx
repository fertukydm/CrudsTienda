import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // URL del API
  const API = "http://localhost:4000/api/login"; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!email || !password) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Hacer la solicitud POST al servidor
      const res = await fetch(API, {
        method: "POST",
        credentials: "include", // Enviar cookies para autenticación si se requiere
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Procesar la respuesta
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Inicio de sesión exitoso.");
        navigate("/"); // Redirige a la página principal o al dashboard
      } else {
        toast.error(data.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      toast.error("Error en la conexión con el servidor. :(");
      console.error(error);
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
