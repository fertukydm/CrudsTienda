import React, { useState } from 'react';
import './Pago.css';

const FormularioPago = () => {
  const [formData, setFormData] = useState({
    metodoEntrega: 'envio',
    novedades: false,
    guardarInfo: false,
  });

  const [customFields, setCustomFields] = useState({
    nombre: { label: "Nombre", value: "", editable: false },
    apellidos: { label: "Apellidos", value: "", editable: false },
    direccion: { label: "Dirección", value: "", editable: false },
    ciudad: { label: "Ciudad", value: "", editable: false },
    codigoPostal: { label: "Código Postal", value: "", editable: false },
    region: { label: "Región", value: "", editable: false },
    pais: { label: "País", value: "", editable: false },
    telefono: { label: "Teléfono", value: "", editable: false },
    email: { label: "Correo Electrónico", value: "", editable: false },
  });

  const [deliveryLabels, setDeliveryLabels] = useState({
    envio: { text: "Envío", editable: false },
    retiro: { text: "Retiro en tienda", editable: false },
  });

  const handleCustomChange = (key, value) => {
    setCustomFields(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      }
    }));
  };

  const handleEditLabel = (key, newLabel) => {
    setCustomFields(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        label: newLabel || prev[key].label,
      }
    }));
  };

  const toggleFieldEditable = (key) => {
    setCustomFields(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        editable: !prev[key].editable,
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleDeliveryEditable = (tipo) => {
    setDeliveryLabels(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        editable: !prev[tipo].editable,
      }
    }));
  };

  const handleEditDeliveryLabel = (tipo, newText) => {
    setDeliveryLabels(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        text: newText || prev[tipo].text,
      }
    }));
  };

  const handlePago = async () => {
    try {
      const datosPago = {
        ...formData,
        ...Object.fromEntries(
          Object.entries(customFields).map(([key, field]) => [key, field.value])
        ),
      };

      const res = await fetch("http://localhost:4001/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPago),
      });

      const data = await res.json();
      console.log("Respuesta del servidor:", data);
      window.location.href = "https://checkout.wompi.sv";
    } catch (error) {
      console.error("Error al enviar método de pago:", error);
    }
  };

  return (
    <div className="formulario-pago">
      <div className="contenedor">
        <form className="formulario">
          <img src="/16.16.png" alt="Encabezado" className="imagen-encabezado" />

          {Object.entries(customFields).map(([key, field]) => (
            <div key={key} className="grupo-input">
              <label>{field.label}</label>
              <input
                type="text"
                name={key}
                value={field.value}
                onChange={(e) => handleCustomChange(key, e.target.value)}
                placeholder={`Ingresa ${field.label.toLowerCase()}`}
              />
              {field.editable && (
                <input
                  type="text"
                  placeholder="Cambiar nombre del campo"
                  onBlur={(e) => handleEditLabel(key, e.target.value)}
                />
              )}
              <button type="button" onClick={() => toggleFieldEditable(key)}>
                {field.editable ? "Bloquear etiqueta" : "Editar etiqueta"}
              </button>
            </div>
          ))}

          <div className="grupo-checkbox">
            <input
              type="checkbox"
              id="news"
              name="novedades"
              checked={formData.novedades}
              onChange={handleInputChange}
            />
            <label htmlFor="news">Enviarme novedades y ofertas por correo</label>
          </div>

          <div className="grupo-radio">
            <div style={{ marginBottom: '0.5rem' }}>
              <input
                type="radio"
                id="envio"
                name="metodoEntrega"
                value="envio"
                checked={formData.metodoEntrega === 'envio'}
                onChange={handleInputChange}
              />
              <label htmlFor="envio">{deliveryLabels.envio.text}</label>
              {deliveryLabels.envio.editable && (
                <input
                  type="text"
                  placeholder="Editar texto"
                  onBlur={(e) => handleEditDeliveryLabel("envio", e.target.value)}
                />
              )}
              <button type="button" onClick={() => toggleDeliveryEditable("envio")}>
                {deliveryLabels.envio.editable ? "Bloquear texto" : "Editar texto"}
              </button>
            </div>

            <div>
              <input
                type="radio"
                id="retiro"
                name="metodoEntrega"
                value="retiro"
                checked={formData.metodoEntrega === 'retiro'}
                onChange={handleInputChange}
              />
              <label htmlFor="retiro">{deliveryLabels.retiro.text}</label>
              {deliveryLabels.retiro.editable && (
                <input
                  type="text"
                  placeholder="Editar texto"
                  onBlur={(e) => handleEditDeliveryLabel("retiro", e.target.value)}
                />
              )}
              <button type="button" onClick={() => toggleDeliveryEditable("retiro")}>
                {deliveryLabels.retiro.editable ? "Bloquear texto" : "Editar texto"}
              </button>
            </div>
          </div>

          <div className="grupo-checkbox">
            <input
              type="checkbox"
              id="guardar"
              name="guardarInfo"
              checked={formData.guardarInfo}
              onChange={handleInputChange}
            />
            <label htmlFor="guardar">Guardar mi información para próxima vez</label>
          </div>
        </form>

        <div className="resumen">
          <button type="button" onClick={handlePago} className="btn-pago">
            Pagar ahora
          </button>

          <div className="metodo-pago">
            <div className="bancos">
              <span>Wompi El Salvador</span>
              <span className="visa">VISA</span>
              <span className="mastercard">Mastercard</span>
            </div>
            <div className="cuadro-tarjeta"></div>
            <p className="descripcion">
              Serás redirigido a Wompi para completar tu compra de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPago;
