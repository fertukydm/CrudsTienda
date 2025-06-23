
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ReviewCard';
import './Reviews.css';
import { Toaster, toast } from 'react-hot-toast'; // ✅ Importación añadida

const Reviews = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4001/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch((err) => {
        console.error(err);
        toast.error("Error al cargar el producto");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          rating,
          comment,
          title,
          userId: 'teste'
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success("¡Review enviada con éxito!");
      } else {
        toast.error(data.message || "Error al enviar la review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al enviar la review");
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="review-page">
      <Toaster position="top-right" /> {/* ✅ Componente necesario para mostrar los toasts */}

      <h2>Agregar Review</h2>

      <ProductCard product={product} />

      {submitted ? (
        <p>✅ Gracias por tu reseña!</p>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <label>Calificación (1‑5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={e => setRating(+e.target.value)}
            required
          />

          <label>Título (opcional):</label>
          <input  
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <label>Comentario:</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows="4"
            required
          />

          <button type="submit">Enviar Review</button>
        </form>
      )}
    </div>
  );
};

export default Reviews;
