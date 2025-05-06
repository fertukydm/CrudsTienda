import React, { useState } from 'react';
import './ProcesodePago.css';

const ProcesoPago = () => {
    const [formData, setFormData] = useState({
      email: "",
      nombre: "",
      apellidos: "",
      direccion: "",
      ciudad: "",
      codigoPostal: "",
      region: "",
      telefono: "",
      pais: "El Salvador",
      envio: "envio",
      aceptarOfertas: true,
      guardarInfo: false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Datos de pago:", formData);
      alert("Procesando pago...");
    };
  
    return (
      <div className="proceso-pago-container">
        <div className="form-section-pago">
          <form onSubmit={handleSubmit} className="formulario-pago">
            <h2>Correo Electrónico</h2>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              className="input-pago"
              required
            />
  
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="aceptarOfertas"
                checked={formData.aceptarOfertas}
                onChange={handleChange}
              />
              <label>Enviarme novedades y ofertas por correo electrónico</label>
            </div>
  
            <h2>Entrega</h2>
  
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="envio"
                  value="envio"
                  checked={formData.envio === "envio"}
                  onChange={handleChange}
                />
                Envío
              </label>
              <label>
                <input
                  type="radio"
                  name="envio"
                  value="retiro"
                  checked={formData.envio === "retiro"}
                  onChange={handleChange}
                />
                Retiro en tienda
              </label>
            </div>
  
            <select
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="input-pago"
            >
              <option value="El Salvador">El Salvador</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Honduras">Honduras</option>
            </select>
  
            <div className="nombre-apellidos">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="input-pago"
                required
              />
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="input-pago"
                required
              />
            </div>
  
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              className="input-pago"
              required
            />
  
            <div className="direccion-extra">
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="input-pago"
                required
              />
              <input
                type="text"
                name="codigoPostal"
                placeholder="Código Postal"
                value={formData.codigoPostal}
                onChange={handleChange}
                className="input-pago"
                required
              />
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="input-pago"
                required
              >
                <option value="">Selecciona Región</option>
                <option value="San Salvador">San Salvador</option>
                <option value="Santa Ana">Santa Ana</option>
                <option value="La Libertad">La Libertad</option>
              </select>
            </div>
  
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="input-pago"
              required
            />
  
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="guardarInfo"
                checked={formData.guardarInfo}
                onChange={handleChange}
              />
              <label>
                Guardar mi información y consultar más rápidamente la próxima vez
              </label>
            </div>
  
            <button type="submit" className="boton-pago">Conectar</button>
          </form>
        </div>
  
        <div className="image-pago1">
          <div className="overlay-pago">
            <h2>Proceso de Pago</h2>
            <p>Todas las transacciones son seguras y están encriptadas.</p>
            <img
              src="./frontend/public/40.png"
              alt="Método de pago"
              className="image-pago1"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProcesoPago;