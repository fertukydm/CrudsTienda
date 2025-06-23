import React, { useState, useEffect } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';

const Producto = () => {
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreProducts, setGenreProducts] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       
        const response = await fetch('http://localhost:4001/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setAlbums(data);

        const grouped = data.reduce((acc, album) => {
          const genre = album.genre || 'Sin género';
          if (!acc[genre]) acc[genre] = [];
          acc[genre].push(album);
          return acc;
        }, {});
        setGenreProducts(grouped);
        setGenres(Object.keys(grouped));
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="music-store">
      <div className="banner">
        <img src="/18.png" alt="Banner" />
      </div>

      <div className="store-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span>Géneros</span>
          </div>
          <ul>
            <li
              style={{ cursor: 'pointer', fontWeight: !selectedGenre ? 'bold' : 'normal' }}
              onClick={() => setSelectedGenre(null)}
            >
              Todos ({albums.length})
            </li>
            {genres.map((genre, index) => (
              <li
                key={index}
                style={{ cursor: 'pointer', fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre} ({genreProducts[genre]?.length || 0})
              </li>
            ))}
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
                </div>
                <div className="card-text">{album.authorName}</div>
                <div className="card-price">${album.price}</div>

                <button
                  className="review-button"
                  onClick={() => navigate(`/Review/${album._id}`)} 
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px"
                  }}
                >
                  Agregar Review
                </button>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
};

export default Producto;