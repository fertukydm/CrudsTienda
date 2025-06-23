// src/pages/AdminReviews.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // Importa toast para mostrar notificaciones
import './ReviewA.css'; // Aquí puedes agregar tus estilos personalizados

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Obtener todas las reseñas
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/reviews');
        if (!response.ok) throw new Error('Error al obtener reseñas');
        const data = await response.json();
        setReviews(data.reviews); // Suponiendo que la respuesta tiene una propiedad "reviews"
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar las reseñas");
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4001/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar la reseña");
      }

      setReviews(reviews.filter(review => review._id !== id)); // Filtra la reseña eliminada
      toast.success("Reseña eliminada con éxito");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la reseña");
    }
  };

  return (
    <div className="admin-reviews">
      <h2>Gestión de Reseñas</h2>

      <div className="reviews-container">
        {reviews.map(review => (
          <div className="review-card" key={review._id}>
            <div className="review-header">
              <h3>{review.title || "Sin título"}</h3>
              <span>Producto: {review.productId?.productName || 'Producto desconocido'}</span>
            </div>
            <div className="review-rating">
              <span>Calificación: {review.rating}</span>
            </div>
            <div className="review-comment">
              <p>{review.comment || "No hay comentario"}</p>
            </div>
            <div className="review-actions">
              <button onClick={() => handleDelete(review._id)} className="delete-btn">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;

