import React, { useState, useEffect } from "react";
import "./Home.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Home = ({ agregarAlCarrito, esAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch("http://localhost:4001/api/products");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregar = () => {
    if (productoSeleccionado) {
      agregarAlCarrito({ ...productoSeleccionado, quantity: 1 });
      toast.success(`✅ "${productoSeleccionado.productName}" fue agregado al carrito.`);
      setProductoSeleccionado(null);
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="cargando">Cargando productos...</div>;

  return (
    <div className="background-image">
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
          </div>
        </div>

        <div className="featured-products">
          <h3 className="featured-title">Productos destacados</h3>
          <div className="products-container">
            {productosFiltrados.map((item) => (
              <div
                key={item._id}
                className="product-item"
                onClick={() => setProductoSeleccionado(item)}
              >
                <img
                  src={item.imageUrl || "/default.png"}
                  alt={item.productName}
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
            <h3>{productoSeleccionado.productName}</h3>
            <p>{productoSeleccionado.description}</p>
            <p><strong>Precio:</strong> ${productoSeleccionado.price.toFixed(2)}</p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
              {esAdmin ? (
                <button
                  className="btn-editar"
                  onClick={() => navigate(`/editar-producto/${productoSeleccionado._id}`)}
                >
                  Editar producto
                </button>
              ) : (
                <button onClick={handleAgregar} className="btn-agregar">
                  Agregar al carrito
                </button>
              )}
              <button onClick={() => setProductoSeleccionado(null)} className="btn-cancelar">
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
