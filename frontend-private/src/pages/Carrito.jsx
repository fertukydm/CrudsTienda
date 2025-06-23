import React from 'react';
import './Carrito.css';
import { Link } from "react-router-dom";

const Carrito = ({ carrito, setCarrito }) => {
  const incrementarCantidad = (index) => {
    const actualizado = [...carrito];
    actualizado[index].quantity += 1;
    setCarrito(actualizado);
  };

  const disminuirCantidad = (index) => {
    const actualizado = [...carrito];
    if (actualizado[index].quantity > 1) {
      actualizado[index].quantity -= 1;
      setCarrito(actualizado);
    }
  };

  const eliminarProducto = (index) => {
    const actualizado = carrito.filter((_, i) => i !== index);
    setCarrito(actualizado);
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <div className="music-store">
      <div className="banner">
        <img src="/26.26.png" alt="Banner" />
        <Link to="/agregar-producto" className="btn-add">
          Agregar productos
        </Link>
      </div>

      <div className="store-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span>Artista</span>
            <button className="btn-small">Editar</button>
          </div>
          <ul>
            <li>ac/dc (5)</li>
            <li>achile (4)</li>
            <li>aerosmith (3)</li>
            <li>africa keys (4)</li>
            <li>arcade fire (10)</li>
            <li>arctic monkeys (9)</li>
            <li>ariana grande (5)</li>
            <li>avril lavigne (5)</li>
            <li className="mostrar">mostrar más</li>
          </ul>
          <ul>
            <li>classical (10)</li>
            <li>dance (10)</li>
          </ul>
        </aside>

        <main className="grid">
          {carrito.length === 0 ? (
            <p style={{ margin: 'auto', fontSize: '1.2rem' }}>🛒 El carrito está vacío.</p>
          ) : (
            carrito.map((item, i) => (
              <div className="card" key={i}>
                <img src={item.imagen || '/default.png'} alt={item.nombre} />
                <div className="card-title">
                  <span>{item.nombre}</span>
                  <button className="btn-delete" onClick={() => eliminarProducto(i)}>Eliminar</button>
                </div>
                <div className="card-text">{item.descripcion}</div>
                <div className="card-price">${(item.precio * item.quantity).toFixed(2)}</div>
                <div className="cantidad-control">
                  <button onClick={() => disminuirCantidad(i)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementarCantidad(i)}>+</button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      <div className="total-carrito">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Carrito;
