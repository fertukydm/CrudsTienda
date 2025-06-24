import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contranew.css";

const Contranuevaa = () => {
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const navigate = useNavigate();

  // Función simulada para enviar código a email o teléfono
  const sendVerificationCode = () => {
    // Aquí podrías llamar un API para enviar código real
    alert("Código de verificación enviado a tu correo o teléfono.");
    setCodeSent(true);
  };

  // Validar el código ingresado (simulación)
  const verifyCode = () => {
    // Aquí deberías verificar contra backend
    if (verificationCode === "123456") {  // Por ejemplo, el código correcto es 123456
      alert("Código verificado con éxito.");
      setCodeValid(true);
    } else {
      alert("Código incorrecto, intenta de nuevo.");
      setCodeValid(false);
    }
  };

  // Guardar nueva contraseña solo si el código es válido
  const handleSave = () => {
    if (!codeValid) {
      alert("Por favor verifica el código antes de guardar la contraseña.");
      return;
    }
    alert(`Nueva contraseña guardada: ${password}`);
    setPassword("");
    setVerificationCode("");
    setCodeSent(false);
    setCodeValid(false);

    navigate("/login");
  };

  return (
    <div className="password-container">
      <h1 className="password-title">Restablecer contraseña de cuenta</h1>

      <div className="password-box">
        <div className="password-image-container">
          <img
            src="/18.18.png"
            alt="Recuperación"
            className="password-image"
          />
        </div>

        <div className="password-form">
          {/* Botón para enviar código */}
          {!codeSent && (
            <button onClick={sendVerificationCode} className="btn-send-code">
              Enviar código de verificación
            </button>
          )}

          {/* Campo para ingresar código */}
          {codeSent && !codeValid && (
            <>
              <label htmlFor="verificationCode" className="password-label">
                Código de verificación
              </label>
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Ingresa el código"
                className="password-input"
              />
              <button onClick={verifyCode} className="btn-verify-code">
                Verificar código
              </button>
            </>
          )}

          {/* Mostrar campo contraseña solo si el código es válido */}
          {codeValid && (
            <>
              <label htmlFor="password" className="password-label">
                Nueva contraseña
              </label>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contranuevaa;
