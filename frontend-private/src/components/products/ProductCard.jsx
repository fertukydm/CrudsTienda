import React from 'react';

const ProductCard = ({ album, onEdit }) => {
  return (
    <div className="card">
      <img src={album.img} alt={album.title} />
      <div className="card-title">
        <span>{album.title}</span>
        <button className="btn-delete">Borrar</button>
      </div>
      <div className="card-text">{album.artist}</div>
      <div className="card-price">{album.price}</div>
      <button className="btn-small" onClick={onEdit}>Editar</button>
      <button className="btn-small">Elegir este producto</button>
    </div>
  );
};

export default ProductCard;
