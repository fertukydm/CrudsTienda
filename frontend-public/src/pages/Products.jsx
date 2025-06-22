import React, { useState, useEffect } from 'react';
import './Products.css';
import { Link } from "react-router-dom";

const Producto = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="music-store">
      <div className="banner">
        <img src="/21.png" alt="Banner" />
        {/* <Link to="/agregar-producto" className="btn-add">
          Agregar productos
        </Link> */}
      </div>

      <div className="store-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span>Artista</span>
            {/* <button className="btn-small">Editar</button> */}
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
          {albums.map((album, i) => (
            <div className="card" key={i}>
              <img src={album.imageUrl || '/default.png'} alt={album.productName} />
              <div className="card-title">
                <span>{album.productName}</span>
                {/* botones eliminados */}
              </div>
              <div className="card-text">{album.authorName}</div>
              <div className="card-price">{album.price}</div>
              {/* botones eliminados */}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Producto;
