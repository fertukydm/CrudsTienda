import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Importar para redirigir
import "./Verificarcod.css";

const Verificarcodd = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate(); // ⬅️ Hook de navegación

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Enfocar el siguiente input
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join("");

    if (enteredCode.length < 6 || code.includes("")) {
      alert("Por favor ingresa los 6 dígitos del código.");
      return;
    }

    alert(`Código ingresado: ${enteredCode}`);

    // Simular validación y redirigir
    setTimeout(() => {
      navigate("/ContraNew"); // ⬅️ Redirigir a la vista para crear nueva contraseña
    }, 500);
  };

  return (
    <div className="verify-container">
      <h1 className="verify-title">Código de restablecer contraseña de cuenta</h1>

      <div className="verify-box">
        {/* Imagen */}
        <div className="verify-image-container">
          <img
            src="/18.18.png"
            alt="Código de recuperación"
            className="verify-image"
          />
        </div>

        {/* Formulario */}
        <div className="verify-form">
          <p className="verify-description">
            Te enviaremos un código a tu email para restablecer tu contraseña.
          </p>

          <label className="verify-label">Código</label>
          <div className="verify-inputs">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="verify-input"
              />
            ))}
          </div>

          <button onClick={handleVerify} className="btn-verify">
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verificarcodd;