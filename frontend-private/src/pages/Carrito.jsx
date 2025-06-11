import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Carrito.css';
import ListProduct from '../components/products/ListProducts';
import useDataProduct from '../components/products/hook/useDataProduct';

const Carrito = () => {
  const navigate = useNavigate(); // Importamos useNavigate
  const { albums, editingAlbumIndex, formData, openEditModal, closeEditModal, handleChange, handleSave } = useDataProduct();

  // Función para agregar productos al backend
  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:4001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      // Redirigir al carrito después de guardar el producto
      navigate("/carrito");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="music-store">
      <div className="store-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span>Artista</span>
            <button className="btn-small">Editar</button>
          </div>
          <ul>
            <li>ac/dc (5)</li>
            <li>aerosmith (3)</li>
            <li>arcade fire (10)</li>
            <li>arctic monkeys (9)</li>
            <li>ariana grande (5)</li>
            <li className="mostrar">mostrar más</li>
          </ul>
        </aside>

        <ListProduct albums={albums} onEdit={openEditModal} />
      </div>

      {/* Modal para editar */}
      {editingAlbumIndex !== null && (
        <div className="modal-overlay-edit">
          <div className="modal-edit-card">
            <h2>Editar Producto</h2>
            <label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
              <input type="text" name="artist" value={formData.artist} onChange={handleChange} />
            </label>
            <label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} />
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
