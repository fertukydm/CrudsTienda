import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Reviews.css';
import { Toaster, toast } from 'react-hot-toast';

const Reviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    obtenerProducto();
    obtenerReviews();
  }, [id]);

  const obtenerProducto = async () => {
    try {
      setLoadingProduct(true);
      const response = await fetch(`http://localhost:4001/api/products`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      
      const products = await response.json();
      const foundProduct = products.find(p => p._id === id);
      
      if (!foundProduct) {
        throw new Error('Producto no encontrado');
      }
      
      setProduct(foundProduct);
    } catch (error) {
      console.error('Error al cargar producto:', error);
      toast.error("Error al cargar el producto");
      setTimeout(() => navigate('/producto'), 3000);
    } finally {
      setLoadingProduct(false);
    }
  };

  const obtenerReviews = async () => {
    try {
      setLoadingReviews(true);
      console.log('🔍 Obteniendo reviews para producto:', id);
      
      const response = await fetch(`http://localhost:4001/api/reviews/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // No hay reviews para este producto
          setReviews([]);
          return;
        }
        throw new Error(`Error HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📝 Reviews obtenidas:', data);
      
      if (data.success) {
        setReviews(data.reviews || []);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error('Error al cargar reviews:', error);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('Por favor escribe un comentario');
      return;
    }
    
    if (comment.trim().length < 5) {
      toast.error('El comentario debe tener al menos 5 caracteres');
      return;
    }
    
    setSubmitting(true);

    try {
      console.log('📝 Enviando review al backend...');
      console.log('📦 Datos a enviar:', {
        productId: id,
        rating: parseInt(rating),
        comment: comment.trim(),
        userId: `usuario_${Date.now()}`
      });

      const response = await fetch('http://localhost:4001/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          productId: id,
          rating: parseInt(rating),
          comment: comment.trim(),
          userId: `usuario_${Date.now()}`
        }),
      });

      console.log(' Respuesta del servidor:', response.status, response.statusText);

      // Verificar si la respuesta es JSON válida
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`El servidor devolvió ${contentType}.`);
      }

      const data = await response.json();
      console.log('📦 Datos recibidos:', data);
      
      if (response.ok && data.success) {
        setSubmitted(true);
        toast.success(data.message || "¡Review enviada con éxito!");
        setRating(5);
        setComment('');
        
        // Recargar las reviews para mostrar la nueva
        setTimeout(() => {
          obtenerReviews();
          setSubmitted(false);
        }, 2000);
      } else {
        throw new Error(data.message || `Error HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('❌ Error al enviar review:', error);
      
      // Manejar diferentes tipos de errores
      if (error.message.includes('Failed to fetch')) {
        toast.error(' Verifica que el backend esté ejecutándose en el puerto 4001.');
      } else if (error.message.includes('404')) {
        toast.error(' Verifica la configuración del backend.');
      } else if (error.message.includes('CORS')) {
        toast.error(' Verifica la configuración del servidor.');
      } else {
        toast.error(`Error al enviar la review: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const calcularPromedioCalificacion = () => {
    if (reviews.length === 0) return 0;
    const suma = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (suma / reviews.length).toFixed(1);
  };

  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span 
          key={i} 
          style={{ 
            color: i <= calificacion ? '#ffc107' : '#e0e0e0',
            fontSize: '16px'
          }}
        >
          ★
        </span>
      );
    }
    return estrellas;
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loadingProduct) {
    return (
      <div style={{ 
        padding: '20px', 
        maxWidth: '800px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <Toaster position="top-right" />
        <h2>Cargando producto...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        padding: '20px', 
        maxWidth: '800px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <Toaster position="top-right" />
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/producto')}>
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <Toaster position="top-right" />

      {/* Información del Producto */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          {product.imageUrl && (
            <img 
              src={product.imageUrl} 
              alt={product.productName}
              style={{ 
                width: '120px', 
                height: '120px', 
                objectFit: 'cover', 
                borderRadius: '8px'
              }}
              onError={(e) => e.target.src = '/default.png'}
            />
          )}
          <div>
            <h2 style={{ margin: '0 0 10px 0' }}>{product.productName}</h2>
            <p><strong>Autor:</strong> {product.authorName}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Género:</strong> {product.genre}</p>
          </div>
        </div>
      </div>

      {/* Resumen de Reviews */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Reseñas ({reviews.length})</h3>
        {reviews.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {calcularPromedioCalificacion()}
            </span>
            <div>{renderEstrellas(Math.round(calcularPromedioCalificacion()))}</div>
            <span style={{ color: '#666' }}>
              ({reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'})
            </span>
          </div>
        ) : (
          <p style={{ color: '#666' }}>No hay reseñas aún. ¡Sé el primero en reseñar!</p>
        )}
      </div>

      {/* Lista de Reviews */}
      {loadingReviews ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Cargando reseñas...</p>
        </div>
      ) : (
        <div style={{ marginBottom: '30px' }}>
          {reviews.map((review, index) => (
            <div 
              key={review.id || index}
              style={{
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: '1px solid #eee'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>{renderEstrellas(review.rating)}</div>
                  <span style={{ fontWeight: 'bold' }}>
                    {review.rating}/5
                  </span>
                </div>
                <small style={{ color: '#666' }}>
                  {formatearFecha(review.fechaCreacion || review.createdAt)}
                </small>
              </div>
              <p style={{ 
                margin: '0',
                lineHeight: '1.5',
                color: '#333'
              }}>
                {review.comment}
              </p>
              <small style={{ color: '#888', fontSize: '12px' }}>
                Por: {review.userId || 'Usuario anónimo'}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* Formulario para Agregar Review */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Agregar una Reseña</h3>
        
        {submitted ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            backgroundColor: '#d1ecf1',
            borderRadius: '8px',
            border: '1px solid #bee5eb'
          }}>
            <p style={{ color: '#0c5460', margin: '0' }}>
              ¡Gracias por tu reseña! Se ha agregado exitosamente.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Calificación:
              </label>
              <select
                value={rating}
                onChange={e => setRating(parseInt(e.target.value))}
                required
                style={{ 
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              >
                <option value={1}>⭐ (1 estrella) - Muy malo</option>
                <option value={2}>⭐⭐ (2 estrellas) - Malo</option>
                <option value={3}>⭐⭐⭐ (3 estrellas) - Regular</option>
                <option value={4}>⭐⭐⭐⭐ (4 estrellas) - Bueno</option>
                <option value={5}>⭐⭐⭐⭐⭐ (5 estrellas) - Excelente</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Comentario:
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows="4"
                required
                placeholder="Comparte tu experiencia con este producto..."
                style={{ 
                  padding: '12px',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
              <small style={{ color: '#666' }}>
                {comment.length}/500 caracteres
              </small>
            </div>

            <button 
              type="submit" 
              disabled={submitting || !comment.trim()}
              style={{
                padding: '12px 20px',
                backgroundColor: (submitting || !comment.trim()) ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: (submitting || !comment.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {submitting ? 'Enviando...' : 'Enviar Reseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reviews;