import { useState, useEffect } from 'react';

const useDataProduct = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/products');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return { albums };
};

export default useDataProduct;
