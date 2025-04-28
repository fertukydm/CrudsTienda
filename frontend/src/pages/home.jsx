import React from 'react';
import './home.css';


//Codigo de inicio de sesion 
//La barra de busqueda o funciona 
const Home = () => {
  return (
    <div className="background-image">
        <img src="/12.pn" alt="" />
      
    <div className="home-container">
      <div className="relative">
        
        <img
          src="../public/OK RECORDS.png"
          alt="Fondo de discos de vinilo"
          className="background-img"
        />
      </div>

      
      <div className="search-section">
        <h2 className="search-title">Encuentra tu álbum favorito</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar"
            className="search-input"
          />
          <button className="search-button">Buscar</button>
        </div>
      </div>

      
      <div className="featured-products">
        <h3 className="featured-title">Productos destacados</h3>
        <div className="products-container">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-item">
             
              <img
                src={item === 1 ? "../public/8.png" : 
                     item === 2 ? "../public/31.png" : 
                     item === 3 ? "../public/32.png" : 
                     "../public/34.png"} 
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

export default Home;

