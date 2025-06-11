import React from 'react';
import ProductCard from './ProductCard';

const ListProduct = ({ albums, onEdit }) => {
  return (
    <main className="grid">
      {albums.map((album, i) => (
        <ProductCard key={i} album={album} onEdit={() => onEdit(i)} />
      ))}
    </main>
  );
};

export default ListProduct;
