import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { Link } from "react-router-dom";

const Carrito = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [editingGenre, setEditingGenre] = useState(false);
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [genreProducts, setGenreProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchGenres();
  }, []);
  const addProductFromBackend = async (productId) => {
  try {
    const response = await fetch(`http://localhost:4001/api/products`);
    if (response.ok) {
      const products = await response.json();
      const product = products.find(p => p._id === productId);
      
      if (product) {
        const cartProduct = {
          id: product._id,
          nombre: product.productName,
          precio: product.price, // ✅ Consistente
          imagen: product.imageUrl || '/default.png',
          formato: 'LP',
          fechaLlegada: 'Arrives by 25 feb - 3 mar',
          cantidad: 1 // ✅ Consistente
        };
        
        setCartItems(prev => {
          const existing = prev.find(item => item.id === productId);
          if (existing) {
            return prev.map(item =>
              item.id === productId 
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            );
          } else {
            return [...prev, cartProduct];
          }
        });
      }
    }
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
};

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4001/api/products');
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      setAlbums(data);

      // Agrupar productos por género
      const grouped = data.reduce((acc, album) => {
        const genre = album.genre || "Sin género";
        if (!acc[genre]) acc[genre] = [];
        acc[genre].push(album);
        return acc;
      }, {});
      setGenreProducts(grouped);
      setError(null);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/genres');
      if (response.ok) {
        const data = await response.json();
        setGenres(data);
      }
    } catch (error) {
      console.error("Error al cargar géneros:", error);
    }
  };

  const handleAddGenre = async () => {
    if (newGenre && !genres.includes(newGenre)) {
      try {
        const response = await fetch('http://localhost:4001/api/genres', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newGenre })
        });

        if (response.ok) {
          setGenres([...genres, newGenre]);
          setNewGenre("");
        }
      } catch (error) {
        console.error("Error al agregar género:", error);
        // Agregar localmente si falla el servidor
        setGenres([...genres, newGenre]);
        setNewGenre("");
      }
    }
  };

  const handleDeleteGenre = async (genreToRemove) => {
    try {
      const response = await fetch(`http://localhost:4001/api/genres/${encodeURIComponent(genreToRemove)}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setGenres(genres.filter(g => g !== genreToRemove));
        if (selectedGenre === genreToRemove) {
          setSelectedGenre(null);
        }
      }
    } catch (error) {
      console.error("Error al eliminar género:", error);
      // Eliminar localmente si falla el servidor
      setGenres(genres.filter(g => g !== genreToRemove));
      if (selectedGenre === genreToRemove) {
        setSelectedGenre(null);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const response = await fetch(`http://localhost:4001/api/products/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Actualizar la lista de productos
          setAlbums(albums.filter(album => album._id !== productId));
          alert("Producto eliminado exitosamente");
          
          // Recargar productos para actualizar los conteos
          fetchProducts();
        } else {
          throw new Error('Error al eliminar producto');
        }
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto");
      }
    }
  };

  const handleEditProduct = (productId) => {
    // Aquí puedes implementar la navegación a la página de edición
    // navigate(`/editar-producto/${productId}`);
    console.log(`Editar producto: ${productId}`);
    alert(`Función de editar producto ${productId} - Por implementar`);
  };

  const getProductCount = (genre) => {
    if (genre === null) return albums.length;
    return genreProducts[genre]?.length || 0;
  };

  if (loading) {
    return (
      <div className="music-store">
        <div className="loading-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          fontSize: '18px',
          color: '#666'
        }}>
          Cargando productos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="music-store">
        <div className="error-container" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          color: '#dc3545'
        }}>
          <p>{error}</p>
          <button onClick={fetchProducts} style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '15px'
          }}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="music-store">
      <div className="banner">
        <img src="/26.26.png" alt="Banner" />
        <div className="banner-actions">
          <Link to="/agregar-producto" className="btn-add">Agregar Producto</Link>
          <span className="products-count">Total: {albums.length} productos</span>
        </div>
      </div>

      <div className="store-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span>Géneros</span>
            <button className="btn-small" onClick={() => setEditingGenre(true)}>
              Gestionar
            </button>
          </div>
          <ul>
            <li
              className={!selectedGenre ? 'active-genre' : ''}
              style={{ cursor: 'pointer', fontWeight: !selectedGenre ? 'bold' : 'normal' }}
              onClick={() => setSelectedGenre(null)}
            >
              Todos ({getProductCount(null)})
            </li>

            {genres.length === 0 ? (
              <li style={{ fontStyle: 'italic', color: '#666' }}>
                No hay géneros agregados
              </li>
            ) : (
              genres.map((genre, index) => (
                <li
                  key={index}
                  className={selectedGenre === genre ? 'active-genre' : ''}
                  style={{ cursor: 'pointer', fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre} ({getProductCount(genre)})
                </li>
              ))
            )}
          </ul>
        </aside>

        <main className="grid">
          {albums
            .filter(album => !selectedGenre || album.genre === selectedGenre)
            .map((album, i) => (
              <div className="card" key={album._id || i}>
                <div className="product-image">
                  <img 
                    src={album.imageUrl || '/default.png'} 
                    alt={album.productName}
                    onError={(e) => {
                      e.target.src = '/default.png';
                    }}
                  />
                </div>
                <div className="card-content">
                  <div className="card-title">
                    <span title={album.productName}>{album.productName}</span>
                  </div>
                  <div className="card-text">{album.authorName}</div>
                  <div className="card-genre">{album.genre}</div>
                  <div className="card-price">${album.price}</div>
                  {album.description && (
                    <div className="card-description" title={album.description}>
                      {album.description.length > 100 
                        ? `${album.description.substring(0, 100)}...` 
                        : album.description
                      }
                    </div>
                  )}
                </div>
                <div className="card-actions">
                  <button 
                    className="btn-small btn-edit"
                    onClick={() => handleEditProduct(album._id)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-small btn-delete"
                    onClick={() => handleDeleteProduct(album._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </main>
      </div>

      {editingGenre && (
        <div className="modal-overlay-edit">
          <div className="modal-edit-card">
            <h2>Gestionar Géneros</h2>

            <div className="add-genre-section">
              <input
                type="text"
                placeholder="Nuevo género"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddGenre()}
              />
              <button onClick={handleAddGenre} className="btn-save">
                Agregar
              </button>
            </div>

            <div className="genres-list">
              <h3>Géneros existentes:</h3>
              {genres.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: '#666' }}>
                  No hay géneros registrados
                </p>
              ) : (
                <ul style={{ marginTop: '10px' }}>
                  {genres.map((genre, idx) => (
                    <li key={idx} className="genre-item">
                      <span>{genre}</span>
                      <span className="genre-count">
                        ({getProductCount(genre)} productos)
                      </span>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDeleteGenre(genre)}
                        title="Eliminar género"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button onClick={() => setEditingGenre(false)} className="btn-cancel">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;