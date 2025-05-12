import React, { useState } from "react";
import "./Recucontra.css";

const Recucontraa = () => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    alert(`Enviaremos un correo a: ${email}`);
  };

  const handleCancel = () => {
    setEmail("");
  };

  return (
    <div className="reset-container">
      <h1 className="reset-title">Restablecer contraseña de cuenta</h1>

      <div className="reset-box">
        {/* Imagen */}
        <div className="reset-image-container">
          <img
            src="/ruta-a-tu-imagen.jpg"
            alt="Recuperación"
            className="reset-image"
          />
        </div>

        {/* Formulario */}
        <div className="reset-form">
          <p className="reset-description">
            Te enviaremos un email para restablecer tu contraseña.
          </p>

          <label htmlFor="email" className="reset-label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@dominio.com"
            className="reset-input"
          />

          <div className="reset-buttons">
            <button onClick={handleSend} className="btn-activate">
              Activar
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recucontraa;
