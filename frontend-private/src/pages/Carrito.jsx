
import React, { useState } from 'react';
import './Carrito.css';
import { Link } from "react-router-dom";

const albumsData = [
  {
    title: 'i love you',
    artist: 'The neighbourhood',
    price: '$40.00',
    img: '/8.8.png',
  },
  {
    title: 'reputation',
    artist: 'Taylor Swift',
    price: '$97.00',
    img: '/45.45.png',
  },
  {
    title: 'orquídeas',
    artist: 'Kali Uchis',
    price: '$59.00',
    img: '/9.9.png',
  },
  {
    title: 'after hours',
    artist: 'The weeknd',
    price: '$62.00',
    img: '/10.10.png',
  },
  {
    title: 'cinema',
    artist: 'the marías',
    price: '$46.00',
    img: '/11.11.png',
  },
  {
    title: 'dangerous woman',
    artist: 'ariana grande',
    price: '$50.00',
    img: '/12.12.png',
  },
  {
    title: 'am',
    artist: 'arctic monkeys',
    price: '$47.00',
    img: '/13.13.png',
  },
  {
    title: 'sour',
    artist: 'olivia rodrigo',
    price: '$46.80',
    img: '/14.14.png',
  },
];

const Carrito = () => {
  const [albums, setAlbums] = useState(albumsData);
  const [editingAlbumIndex, setEditingAlbumIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    price: '',
    img: '',
  });

  const openEditModal = (index) => {
    setEditingAlbumIndex(index);
    setFormData({ ...albums[index] });
  };

  const closeEditModal = () => {
    setEditingAlbumIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setAlbums(prev => {
      const updated = [...prev];
      updated[editingAlbumIndex] = formData;
      return updated;
    });
    closeEditModal();
  };

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
          {albums.map((album, i) => (
            <div className="card" key={i}>
              <img src={album.img} alt={album.title} />
              <div className="card-title">
                <span>{album.title}</span>
                <button className="btn-delete">Borrar</button>
              </div>
              <div className="card-text">{album.artist}</div>
              <div className="card-price">{album.price}</div>
              <button className="btn-small" onClick={() => openEditModal(i)}>Editar</button>
              <button className="btn-small">Elegir este producto</button>
            </div>
          ))}
        </main>
      </div>

      {/* Modal para editar */}
      {editingAlbumIndex !== null && (
        <div className="modal-overlay-edit">
          <div className="modal-edit-card">
            <h2>Editar Producto</h2>

            <label>
          
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label>
       
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
              />
            </label>

            <label>
    
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>

            <div className="modal-buttons-edit">
              <button className="btn-save" onClick={handleSave}>Guardar</button>
              <button className="btn-cancel" onClick={closeEditModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
