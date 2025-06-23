import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { Login, loading } = useAuth(); //  Obtener loading del contexto


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const success = await Login(email, password);
  
    if (success) {
      navigate("/"); // Redirigir al home
    }
    // Los errores ya se muestran en el contexto via toast
  };

  return (
    <div className="login-background">
      <Toaster />
      <div className="overlay"></div>
      <div className="login-container">
        <div className="login-image-container">
          <div className="image-wrapper">
            <img
              src="/25.25.png"
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
            disabled={loading} // Deshabilitar durante carga
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Deshabilitar durante carga
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Conectando..." : "Conectar"} {/*  Mostrar estado de carga */}
          </button>

          <div className="forgot-password">
            <Link to="/recuperar">¿Olvidó su contraseña?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;