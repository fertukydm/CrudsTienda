import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Importar useNavigate
import "./Contranew.css";


const Contranuevaa = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ⬅️ Inicializar

  const handleSave = () => {
    alert(`Nueva contraseña: ${password}`);
    setPassword("");

    // Redirigir al login después de guardar
    navigate("/login");
  };

  return (
    <div className="password-container">
      <h1 className="password-title">Restablecer contraseña de cuenta</h1>

      <div className="password-box">
        {/* Imagen */}
        <div className="password-image-container">
          <img
            src="/18.18.png"
            alt="Recuperación"
            className="password-image"
          />
        </div>

        {/* Formulario */}
        <div className="password-form">
          <label htmlFor="password" className="password-label">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nueva contraseña"
            className="password-input"
          />

          <button onClick={handleSave} className="btn-save">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contranuevaa;
