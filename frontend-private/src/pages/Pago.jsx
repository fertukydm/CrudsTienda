import React, { useState } from 'react';
import './Pago.css';

const FormularioPago = () => {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellidos: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    region: '',
    telefono: '',
    metodoEntrega: 'envio',
    novedades: false,
    guardarInfo: false,
  });

  const [editableFields, setEditableFields] = useState({
    email: false,
    nombre: false,
    apellidos: false,
    direccion: false,
    ciudad: false,
    codigoPostal: false,
    region: false,
    telefono: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEditar = (campo) => {
    setEditableFields((prev) => ({
      ...prev,
      [campo]: true,
    }));
  };

  const handlePago = async () => {
    try {
      const res = await fetch("http://localhost:4001/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethod: "Wompi" }),
      });

      const data = await res.json();
      console.log(data);
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

          <div className="grupo-input">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editableFields.email}
              placeholder="Correo Electrónico"
            />
            <button type="button" onClick={() => handleEditar("email")}>Editar</button>
          </div>

          <div className="grupo-checkbox">
            <input
              type="checkbox"
              id="news"
              name="novedades"
              checked={formData.novedades}
              onChange={handleInputChange}
            />
            <label htmlFor="news">Enviarme novedades y ofertas por correo electrónico</label>
          </div>

          <div className="grupo-radio">
            <input
              type="radio"
              id="envio"
              name="metodoEntrega"
              value="envio"
              checked={formData.metodoEntrega === 'envio'}
              onChange={handleInputChange}
            />
            <label htmlFor="envio">Envío</label>

            <input
              type="radio"
              id="retiro"
              name="metodoEntrega"
              value="retiro"
              checked={formData.metodoEntrega === 'retiro'}
              onChange={handleInputChange}
            />
            <label htmlFor="retiro">Retiro en tienda</label>
          </div>

          <div className="grupo-nombre">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              disabled={!editableFields.nombre}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              disabled={!editableFields.apellidos}
              placeholder="Apellidos"
            />
            <button
              type="button"
              onClick={() => {
                handleEditar("nombre");
                handleEditar("apellidos");
              }}
            >Editar</button>
          </div>

          <div className="grupo-direccion">
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              disabled={!editableFields.direccion}
              placeholder="Dirección"
            />
            <button type="button" onClick={() => handleEditar("direccion")}>Editar</button>
          </div>

          <div className="grupo-ciudad">
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
              disabled={!editableFields.ciudad}
              placeholder="Ciudad"
            />
            <input
              type="text"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleInputChange}
              disabled={!editableFields.codigoPostal}
              placeholder="Código Postal"
            />
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              disabled={!editableFields.region}
              placeholder="Región"
            />
            <button
              type="button"
              onClick={() => {
                handleEditar("ciudad");
                handleEditar("codigoPostal");
                handleEditar("region");
              }}
            >Editar</button>
          </div>

          <div className="grupo-telefono">
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              disabled={!editableFields.telefono}
              placeholder="Teléfono"
            />
            <button type="button" onClick={() => handleEditar("telefono")}>Editar</button>
          </div>

          <div className="grupo-checkbox">
            <input
              type="checkbox"
              id="guardar"
              name="guardarInfo"
              checked={formData.guardarInfo}
              onChange={handleInputChange}
            />
            <label htmlFor="guardar">
              Guardar mi información y consultar más rápidamente la próxima vez
            </label>
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
              Después de hacer clic en "Pagar ahora", serás redirigido a Wompi El Salvador para completar tu compra de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPago;
