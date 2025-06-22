import React, { useState } from 'react';
import './home.css';

const Home = () => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const productos = [
    {
      id: 1,
      nombre: "I love you",
      descripcion: "Es el álbum debut de la banda estadounidense The Neighbourhood, y fue lanzado mundialmente el 22 de abril de 2013 por la compañía discográfica Columbia Records.",
      precio: 49,
      imagen: "/8.png"
    },
    {
      id: 2,
      nombre: "Kenia Os - Pink Aura",
      descripcion: "Tercer álbum de estudio de la cantante mexicana Kenia Os. Se lanzó el 24 de abril de 2024",
      precio: 67,
      imagen: "/31.png"
    },
    {
      id: 3,
      nombre: "VICE VERSA - Rauw Alejandro",
      descripcion: "Es el segundo álbum de estudio del cantante puertorriqueño Rauw Alejandro. Fue publicado el 25 de junio de 2021 a través del sello discográfico Sony Music",
      precio: 59,
      imagen: "/32.png"
    },
    {
      id: 4,
      nombre: "Short n' Sweet - Sabrina Carpenter",
      descripcion: "Es el sexto álbum de estudio de la cantante estadounidense Sabrina Carpenter, publicado el 23 de agosto de 2024 por el sello Island Records.",
      precio: 62,
      imagen: "/34.png"
    },
  ];

  const agregarAlCarrito = (producto) => {
    setCartItems((prev) => {
      // Verificar si ya está el producto en el carrito
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        // Aumentar cantidad si ya existe
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Agregar producto con cantidad 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
    alert(`Agregaste "${producto.nombre}" al carrito.`);
    setProductoSeleccionado(null); // Cerrar modal después de agregar
  };

  return (
    <div className="background-image">
      <img src="/12.pn" alt="" />

      <div className="home-img">
        <div className="relative">
          <img
            src="/OK RECORDS.png"
            alt="Fondo de discos de vinilo"
            className="background-img"
          />
        </div>

        <div className="search-section">
          <h2 className="search-title">Encuentra tu álbum favorito</h2>
          <div className="search-container">
            <input type="text" placeholder="Buscar" className="search-input" />
            <button className="search-button">Buscar</button>
          </div>
        </div>

        <div className="featured-products">
          <h3 className="featured-title">Productos destacados</h3>
          <div className="products-container">
            {productos.map((item) => (
              <div key={item.id} className="product-item">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="product-img"
                  onClick={() => setProductoSeleccionado(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {productoSeleccionado && (
        <div className="modal-overlay" onClick={() => setProductoSeleccionado(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{productoSeleccionado.nombre}</h3>
            <p>{productoSeleccionado.descripcion}</p>
            <p><strong>Precio:</strong> ${productoSeleccionado.precio.toFixed(2)}</p>
            <button
              onClick={() => agregarAlCarrito(productoSeleccionado)}
              style={{
                marginTop: "15px",
                padding: "10px 18px",
                backgroundColor: "#007bff",
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
                marginTop: "10px",
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
      )}
    </div>
  );
};

export default Home;
