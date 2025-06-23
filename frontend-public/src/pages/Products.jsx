import React, { useState, useEffect } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';

const Producto = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para filtros
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedArtist, setSelectedArtist] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [albums, selectedGenre, selectedArtist, priceRange, searchTerm, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Intentando conectar con el backend...');
      
      const response = await fetch('http://localhost:4001/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📦 Productos recibidos:', data.length);

      setAlbums(data);

      // Extraer géneros únicos
      const uniqueGenres = [...new Set(data.map(album => album.genre).filter(Boolean))];
      setGenres(uniqueGenres);

      // Extraer artistas únicos
      const uniqueArtists = [...new Set(data.map(album => album.authorName).filter(Boolean))];
      setArtists(uniqueArtists);

      setError(null);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
      
      // Determinar el tipo de error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError("No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en el puerto 4001.");
      } else if (error.message.includes('CORS')) {
        setError("Error de CORS. El servidor no permite conexiones desde este origen.");
      } else {
        setError(`Error al cargar productos: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...albums];

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(album =>
        album.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (album.description && album.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por género
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(album => album.genre === selectedGenre);
    }

    // Filtro por artista
    if (selectedArtist !== 'all') {
      filtered = filtered.filter(album => album.authorName === selectedArtist);
    }

    // Filtro por rango de precio
    if (priceRange.min) {
      filtered = filtered.filter(album => album.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(album => album.price <= parseFloat(priceRange.max));
    }

    // Ordenamiento
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'artist':
        filtered.sort((a, b) => a.authorName.localeCompare(b.authorName));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredAlbums(filtered);
  };

  const clearFilters = () => {
    setSelectedGenre('all');
    setSelectedArtist('all');
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
    setSortBy('name');
  };

  const addToCart = (product) => {
    try {
      // Obtener carrito actual del localStorage
      const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      // Verificar si el producto ya está en el carrito
      const existingProduct = currentCart.find(item => item.id === product._id);
      
      if (existingProduct) {
        // Si existe, aumentar la cantidad
        const updatedCart = currentCart.map(item =>
          item.id === product._id 
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      } else {
        // Si no existe, agregar nuevo producto
        const cartProduct = {
          id: product._id,
          nombre: product.productName,
          precio: product.price,
          imagen: product.imageUrl || '/default.png',
          formato: 'LP',
          fechaLlegada: 'Arrives by 25 feb - 3 mar',
          cantidad: 1
        };
        currentCart.push(cartProduct);
        localStorage.setItem('cartItems', JSON.stringify(currentCart));
      }
      
      alert(`"${product.productName}" agregado al carrito!`);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar producto al carrito');
    }
  };

  if (loading) {
    return (
      <div className="music-store">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="music-store">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchProducts} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="music-store">
      <div className="banner">
        <img src="/18.png" alt="Banner" />
        <div className="banner-overlay">
          <h1>Catálogo de Productos</h1>
          <p>Descubre nuestra selección de álbumes</p>
        </div>
      </div>

      {/* Barra de búsqueda y filtros principales */}
      <div className="filters-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos, artistas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="quick-filters">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Ordenar por Nombre</option>
            <option value="artist">Ordenar por Artista</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="newest">Más Recientes</option>
          </select>
          
          <button onClick={clearFilters} className="clear-filters-btn">
            Limpiar Filtros
          </button>
        </div>
      </div>

      <div className="store-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Filtros</h3>
          </div>

          {/* Filtro por Género */}
          <div className="filter-section">
            <h4>Género</h4>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los géneros ({albums.length})</option>
              {genres.map((genre, index) => {
                const count = albums.filter(album => album.genre === genre).length;
                return (
                  <option key={index} value={genre}>
                    {genre} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Filtro por Artista */}
          <div className="filter-section">
            <h4>Artista</h4>
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los artistas</option>
              {artists.map((artist, index) => {
                const count = albums.filter(album => album.authorName === artist).length;
                return (
                  <option key={index} value={artist}>
                    {artist} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Filtro por Precio */}
          <div className="filter-section">
            <h4>Rango de Precio</h4>
            <div className="price-filter">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                className="price-input"
              />
            </div>
          </div>

          {/* Información de resultados */}
          <div className="results-info">
            <p>
              {filteredAlbums.length} de {albums.length} productos
            </p>
          </div>
        </aside>

        <main className="products-main">
          {filteredAlbums.length === 0 ? (
            <div className="no-results">
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar tus filtros de búsqueda</p>
              <button onClick={clearFilters} className="clear-filters-btn">
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="grid">
              {filteredAlbums.map((album, i) => (
                <div className="card" key={album._id || i}>
                  <div className="card-image">
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
                    <div className="card-artist">{album.authorName}</div>
                    {album.genre && (
                      <div className="card-genre">{album.genre}</div>
                    )}
                    <div className="card-price">${album.price}</div>
                    {album.description && (
                      <div className="card-description" title={album.description}>
                        {album.description.length > 80 
                          ? `${album.description.substring(0, 80)}...` 
                          : album.description
                        }
                      </div>
                    )}
                  </div>

                  <div className="card-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(album)}
                    >
                      Agregar al Carrito
                    </button>
                    
                    <button
                      className="review-button"
                      onClick={() => navigate(`/Review/${album._id}`)}
                    >
                      Agregar Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Producto;