import React from 'react';
import './Pago.css';

const FormularioPago = () => {
  return (
    <div className="formulario-pago">
      <div className="contenedor">
        <form className="formulario">
          <div className="grupo-input">
            <label htmlFor="email">Correo Electrónico</label>
            <input id="email" type="email" placeholder="Correo Electrónico" />
            <button type="button">Editar</button>
          </div>
          <div className="grupo-checkbox">
            <input type="checkbox" id="news" />
            <label htmlFor="news">
              Enviarme novedades y ofertas por correo electrónico
            </label>
          </div>
          <div className="grupo-entrega">
            <span>Entrega</span>
            <button type="button">Editar</button>
          </div>
          <div className="grupo-radio">
            <input type="radio" id="envio" name="entrega" defaultChecked />
            <label htmlFor="envio">Envío</label>
          </div>
          <div className="grupo-radio">
            <input type="radio" id="retiro" name="entrega" />
            <label htmlFor="retiro">Retiro en la tienda</label>
            <img
              src="https://storage.googleapis.com/a1aa/image/a67b3257-b002-4621-42e2-e6f34606110a.jpg"
              alt="Icono tienda"
            />
            <span className="eliminar">Eliminar</span>
          </div>
          <div className="grupo-select">
            <select name="pais-region" aria-label="País o Región">
              <option>El Salvador</option>
            </select>
            <button type="button">Editar</button>
          </div>
          <div className="grupo-nombre">
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellidos" />
            <button type="button">Editar</button>
          </div>
          <div className="grupo-direccion">
            <input type="text" placeholder="Dirección" />
            <button type="button">Editar</button>
          </div>
          <div className="grupo-ciudad">
            <div className="campo-con-x">
              <input type="text" placeholder="Ciudad" />
              <span>X</span>
            </div>
            <div className="campo-con-x">
              <input type="text" placeholder="Código Postal" />
              <span>X</span>
            </div>
            <div className="campo-con-x">
              <input type="text" placeholder="Región" />
              <span>X</span>
            </div>
          </div>
          <div className="grupo-telefono">
            <input type="text" placeholder="Teléfono" />
            <button type="button">Editar</button>
          </div>
          <div className="grupo-checkbox">
            <input type="checkbox" id="guardar" />
            <label htmlFor="guardar">
              Guardar mi información y consultar más rápidamente la próxima vez
            </label>
          </div>
        </form>

        <div className="resumen">
          <img
            src=""
            alt="Imagen Proceso de pago"
          />
          <div className="texto-resumen">
            <p className="titulo">Pago</p>
            <p className="descripcion">
              Todas las transacciones son seguras y están encriptadas.
            </p>
          </div>
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
