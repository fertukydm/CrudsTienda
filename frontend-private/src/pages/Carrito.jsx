import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { Link } from "react-router-dom";

const Carrito = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [editingGenre, setEditingGenre] = useState(false);
  const [genres, setGenres] = useState([]);  // <-- Aquí vacio inicialmente
  const [newGenre, setNewGenre] = useState("");
  const [genreProducts, setGenreProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/products');
        const data = await response.json();
        setAlbums(data);

        const grouped = data.reduce((acc, album) => {
          const genre = album.genre || "Sin género";
          if (!acc[genre]) acc[genre] = [];
          acc[genre].push(album);
          return acc;
        }, {});
        setGenreProducts(grouped);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddGenre = () => {
    if (newGenre && !genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
      setNewGenre("");
    }
  };

  const handleDeleteGenre = (genreToRemove) => {
    setGenres(genres.filter(g => g !== genreToRemove));
    if (selectedGenre === genreToRemove) {
      setSelectedGenre(null);
    }
  };

  return (
    <div className="music-store">
      <div className="banner">
        <img src="/26.26.png" alt="Banner" />
        <Link to="/agregar-producto" className="btn-add">Agregar productos</Link>
      </div>

      <div className="store-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span>Artista</span>
            <button className="btn-small" onClick={() => setEditingGenre(true)}>Editar</button>
          </div>
          <ul>
            <li
              style={{ cursor: 'pointer', fontWeight: !selectedGenre ? 'bold' : 'normal' }}
              onClick={() => setSelectedGenre(null)}
            >
              Todos ({albums.length})
            </li>

            {genres.length === 0 ? (
              <li style={{ fontStyle: 'italic', color: '#666' }}>
                No hay géneros agregados
              </li>
            ) : (
              genres.map((genre, index) => (
                <li
                  key={index}
                  style={{ cursor: 'pointer', fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre} ({genreProducts[genre]?.length || 0})
                </li>
              ))
            )}
          </ul>
        </aside>

        <main className="grid">
          {albums
            .filter(album => !selectedGenre || album.genre === selectedGenre)
            .map((album, i) => (
              <div className="card" key={i}>
                <img src={album.imageUrl || '/default.png'} alt={album.productName} />
                <div className="card-title">
                  <span>{album.productName}</span>
                  <button className="btn-delete">Borrar</button>
                </div>
                <div className="card-text">{album.authorName}</div>
                <div className="card-price">${album.price}</div>
                <button className="btn-small">Editar</button>
                <button className="btn-small">Elegir este producto</button>
              </div>
            ))}
        </main>
      </div>

      {editingGenre && (
        <div className="modal-overlay-edit">
          <div className="modal-edit-card">
            <h2>Editar Géneros</h2>

            <input
              type="text"
              placeholder="Nuevo género"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
            />
            <button onClick={handleAddGenre} className="btn-save">Agregar</button>

            <ul style={{ marginTop: '10px' }}>
              {genres.map((genre, idx) => (
                <li key={idx}>
                  {genre}
                  <button className="btn-delete" onClick={() => handleDeleteGenre(genre)}>X</button>
                </li>
              ))}
            </ul>

            <button onClick={() => setEditingGenre(false)} className="btn-cancel">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
