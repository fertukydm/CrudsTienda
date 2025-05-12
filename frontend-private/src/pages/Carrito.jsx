import React from 'react';
import './Carrito.css';

const albums = [
  {
    title: 'i love you',
    artist: 'The neighbourhood',
    price: '$40.00',
    img: '',
  },
  {
    title: 'reputation',
    artist: 'Taylor Swift',
    price: '$97.00',
    img: '',
  },
  {
    title: 'orquídeas',
    artist: 'Kali Uchis',
    price: '$59.00',
    img: '',
  },
  {
    title: 'after hours',
    artist: 'The weeknd',
    price: '$62.00',
    img: '',
  },
  {
    title: 'cinema',
    artist: 'the marías',
    price: '$46.00',
    img: '',
  },
  {
    title: 'dangerous women',
    artist: 'ariana grande',
    price: '$50.00',
    img: '',
  },
  {
    title: 'am',
    artist: 'arctic monkeys',
    price: '$47.00',
    img: '',
  },
  {
    title: 'sour',
    artist: 'olivia rodrigo',
    price: '$46.80',
    img: '',
  },
];

const Carrito = () => {
  return (
    <div className="music-store">
      <div className="banner">
        <img
          src=""
          alt="Banner"
        />
        <button className="btn-add">Agregar productos</button>
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
              <button className="btn-small">Editar</button>
              <button className="btn-small">Elegir este producto</button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Carrito;
