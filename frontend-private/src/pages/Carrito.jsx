import React from 'react';
import './Carrito.css';
import { Link } from 'react-router-dom';

const Carrito = ({ carrito, setCarrito }) => {
  const incrementarCantidad = (id) => {
    setCarrito(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(prev =>
      prev.map(p =>
        p.id === id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="carrito-lista">
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <img src={item.imagen || '/default.png'} alt={item.nombre} width={80} />
              <div>
                <h4>{item.nombre}</h4>
                <p>{item.descripcion}</p>
                <p>Precio: ${item.precio}</p>
                <div className="carrito-controles">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementarCantidad(item.id)}>+</button>
                </div>
                <button onClick={() => eliminarProducto(item.id)} className="btn-eliminar">Eliminar</button>
              </div>
            </div>
          ))}
          <div className="carrito-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <Link to="/metodop" className="btn-pagar">Ir al pago</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
