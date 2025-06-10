import React, { useState } from "react";
import "./home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", searchTerm);
  };

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
            <button className="search-button" onClick={handleSearch}>Buscar</button>
          </div>
        </div>

        <div className="featured-products">
          <h3 className="featured-title">Productos destacados</h3>
          <div className="products-container">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="product-item">
                <img
                  src={item === 1 ? "../public/8.8.png" : 
                      item === 2 ? "../public/9.9.png" : 
                      item === 3 ? "../public/10.10.png" : 
                      "../public/11.11.png"} 
                  alt={`Producto destacado ${item}`}
                  className="product-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home