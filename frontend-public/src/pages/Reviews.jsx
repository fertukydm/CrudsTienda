import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Reviews.css';
import { Toaster, toast } from 'react-hot-toast';

const Reviews = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    //  Fetch correcto para obtener producto específico
    fetch(`http://localhost:4001/api/products`) //  Cambio: obtener todos y filtrar
      .then(res => res.json())
      .then(products => {
        const foundProduct = products.find(p => p._id === id);
        setProduct(foundProduct);
      })
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
          userId: 'user123' // Cambio: userId genérico
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        toast.success("¡Review enviada con éxito!");
        setRating(5);
        setComment('');
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
    <div className="review-page" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Toaster position="top-right" />

      <h2>Agregar Review</h2>

      {/* Card del producto simplificada */}
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>{product.productName}</h3>
        <p><strong>Autor:</strong> {product.authorName}</p>
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Género:</strong> {product.genre}</p>
        {product.imageUrl && (
          <img 
            src={product.imageUrl} 
            alt={product.productName}
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
          />
        )}
      </div>

      {submitted ? (
        <div style={{ textAlign: 'center', color: 'green' }}>
          <p> ¡Gracias por tu reseña!</p>
          <button onClick={() => setSubmitted(false)}>Agregar otra review</button>
        </div>
      ) : (
        <form className="review-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Calificación (1‑5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={e => setRating(+e.target.value)}
              required
              style={{ padding: '8px', marginLeft: '10px' }}
            />
          </div>

          <div>
            <label>Comentario:</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows="4"
              required
              style={{ padding: '8px', width: '100%', marginTop: '5px' }}
            />
          </div>

          <button type="submit" style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Enviar Review
          </button>
        </form>
      )}
    </div>
  );
};

export default Reviews;