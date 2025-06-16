import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { Link } from "react-router-dom";

const Carrito = () => {
  const [albums, setAlbums] = useState([]);  // Estado para productos
  const [editingAlbumIndex, setEditingAlbumIndex] = useState(null);  // Para identificar cuál producto editar
  const [formData, setFormData] = useState({
    productName: '',
    authorName: '',
    price: '',
    imageUrl: '',
  });  // Datos del producto en el formulario

  // Cargar productos desde la API (MongoDB)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setAlbums(data);  // Guardar productos en el estado
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Abrir modal de edición
  const openEditModal = (index) => {
    setEditingAlbumIndex(index);
    setFormData({ ...albums[index] });  // Rellenar el formulario con los datos del producto seleccionado
  };

  // Cerrar modal de edición
  const closeEditModal = () => {
    setEditingAlbumIndex(null);
  };

  // Manejar cambios en el formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  

  // Guardar cambios de un producto editado
  const handleSave = async () => {
    if (!albums[editingAlbumIndex]?._id) {
      console.error("ID del producto no válido");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4001/api/products/${albums[editingAlbumIndex]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      const updatedProduct = await response.json();
      console.log(updatedProduct);  // Verifica la respuesta

      const updatedAlbums = [...albums];
      updatedAlbums[editingAlbumIndex] = updatedProduct.product; // Asegúrate de que la respuesta tenga un `product`
      setAlbums(updatedAlbums);  // Actualizar el estado de los productos

      closeEditModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  // Eliminar un producto
  const handleDelete = async (index) => {
    try {
      const productId = albums[index]._id;
      if (!productId) {
        console.error("No se pudo obtener el ID del producto");
        return;
      }

      const response = await fetch(`http://localhost:4001/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      const updatedAlbums = albums.filter((_, i) => i !== index);
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un problema al eliminar el producto.");
    }
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
              <img src={album.imageUrl || '/default.png'} alt={album.productName} />
              <div className="card-title">
                <span>{album.productName}</span>
                <button className="btn-delete" onClick={() => handleDelete(i)}>Borrar</button>
              </div>
              <div className="card-text">{album.authorName}</div>
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
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />
            </label>

            <label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
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
