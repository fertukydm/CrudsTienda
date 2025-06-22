import React, { useState } from "react";
import "./home.css";

const Home = ({ agregarAlCarrito }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensajeAgregado, setMensajeAgregado] = useState(""); // Cambiado a string

  const productosInfo = {
    1: {
      id: 1,
      nombre: "I love you",
      descripcion: "Álbum debut de The Neighbourhood",
      precio: 49,
      imagen: "../public/8.8.png"
    },
    2: {
      id: 2,
      nombre: "Orquídeas",
      descripcion: "Álbum de Kali Uchis lanzado en 2024",
      precio: 67,
      imagen: "../public/9.9.png"
    },
    3: {
      id: 3,
      nombre: "After Hours",
      descripcion: "Álbum de The Weeknd lanzado en 2020",
      precio: 59,
      imagen: "../public/10.10.png"
    },
    4: {
      id: 4,
      nombre: "CINEMA",
      descripcion: "Álbum debut de The Marías (2021)",
      precio: 62,
      imagen: "../public/11.11.png"
    }
  };

  const handleAgregar = () => {
    if (productoSeleccionado) {
      agregarAlCarrito({ ...productoSeleccionado, quantity: 1 });
      setMensajeAgregado(`✅ "${productoSeleccionado.nombre}" fue agregado al carrito.`);
      setProductoSeleccionado(null);

      setTimeout(() => setMensajeAgregado(""), 2500);
    }
  };

  const productosFiltrados = Object.entries(productosInfo).filter(
    ([, producto]) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="background-image">
      {mensajeAgregado && (
        <div className="mensaje-agregado">
          {mensajeAgregado}
        </div>
      )}

      <div className="home-img">
        <div className="relative">
          <img src="/1.1.png" alt="" className="background-img" />
        </div>

        <div className="search-section">
          <h2 className="search-title">Encuentra tu álbum favorito</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Buscar</button>
          </div>
        </div>

        <div className="featured-products">
          <h3 className="featured-title">Productos destacados</h3>
          <div className="products-container">
            {productosFiltrados.map(([key, item]) => (
              <div
                key={key}
                className="product-item"
                onClick={() => setProductoSeleccionado(item)}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="product-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {productoSeleccionado && (
        <div className="modal-overlay" onClick={() => setProductoSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{productoSeleccionado.nombre}</h3>
            <p>{productoSeleccionado.descripcion}</p>
            <p><strong>Precio:</strong> ${productoSeleccionado.precio.toFixed(2)}</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
              <button
                onClick={handleAgregar}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => setProductoSeleccionado(null)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
