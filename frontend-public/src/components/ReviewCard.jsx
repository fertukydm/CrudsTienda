import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Reviews.css';
import { Toaster, toast } from 'react-hot-toast';

const Reviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    obtenerProducto();
  }, [id]);

  const obtenerProducto = async () => {
    try {
      setCargando(true);
      console.log('🔍 Buscando producto con ID:', id);
      
      const response = await fetch(`http://localhost:4001/api/products`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }
      
      const productos = await response.json();
      console.log('📦 Productos recibidos:', productos.length);
      
      const productoEncontrado = productos.find(p => p._id === id);
      
      if (!productoEncontrado) {
        throw new Error('Producto no encontrado');
      }
      
      setProducto(productoEncontrado);
      console.log('✅ Producto encontrado:', productoEncontrado.productName);
      
    } catch (error) {
      console.error('❌ Error al cargar producto:', error);
      toast.error(`Error al cargar el producto: ${error.message}`);
      
      // Redirigir a la página de productos después de un tiempo
      setTimeout(() => {
        navigate('/producto');
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (!comentario.trim()) {
      toast.error('Por favor escribe un comentario');
      return;
    }
    
    if (comentario.trim().length < 5) {
      toast.error('El comentario debe tener al menos 5 caracteres');
      return;
    }
    
    setEnviando(true);

    try {
      console.log('📝 Enviando reseña...');
      
      const response = await fetch('http://localhost:4001/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          productId: id,
          rating: parseInt(calificacion),
          comment: comentario.trim(),
          userId: `usuario_${Date.now()}` // Generar un ID de usuario simple
        }),
      });

      // Verificar si la respuesta es JSON
      const tipoContenido = response.headers.get('content-type');
      if (!tipoContenido || !tipoContenido.includes('application/json')) {
        throw new Error('El servidor no devolvió una respuesta JSON válida. Verifica que el endpoint /api/reviews esté configurado.');
      }

      const data = await response.json();
      
      if (response.ok && data.success) {
        setEnviado(true);
        toast.success(data.message || "¡Reseña enviada con éxito!");
        setCalificacion(5);
        setComentario('');
        console.log('✅ Reseña enviada exitosamente');
      } else {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('❌ Error al enviar reseña:', error);
      
      if (error.message.includes('Failed to fetch')) {
        toast.error('Error de conexión. Verifica que el backend esté ejecutándose en el puerto 4001.');
      } else if (error.message.includes('404')) {
        toast.error('Endpoint de reseñas no encontrado. Verifica la configuración del backend.');
      } else {
        toast.error(`Error al enviar la reseña: ${error.message}`);
      }
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <div className="review-page" style={{ 
        padding: '20px', 
        maxWidth: '600px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <Toaster position="top-right" />
        <div style={{ padding: '2rem' }}>
          <h2>Cargando producto...</h2>
          <div style={{ 
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="review-page" style={{ 
        padding: '20px', 
        maxWidth: '600px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <Toaster position="top-right" />
        <div style={{ padding: '2rem' }}>
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <button 
            onClick={() => navigate('/producto')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Volver a Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-page" style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9'
    }}>
      <Toaster position="top-right" />

      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Agregar Reseña
      </h2>

      {/* Tarjeta del Producto */}
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          {producto.imageUrl && (
            <img 
              src={producto.imageUrl} 
              alt={producto.productName}
              style={{ 
                width: '120px', 
                height: '120px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                border: '1px solid #eee'
              }}
              onError={(e) => {
                e.target.src = '/default.png';
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{producto.productName}</h3>
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Autor:</strong> {producto.authorName}
            </p>
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Precio:</strong> ${producto.price}
            </p>
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Género:</strong> {producto.genre}
            </p>
            {producto.description && (
              <p style={{ margin: '10px 0 0 0', color: '#555', fontSize: '14px' }}>
                {producto.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {enviado ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: '#d1ecf1',
          borderRadius: '8px',
          border: '1px solid #bee5eb'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ color: '#0c5460', marginBottom: '1rem' }}>
            ¡Gracias por tu reseña!
          </h3>
          <p style={{ color: '#0c5460', marginBottom: '2rem' }}>
            Tu opinión es muy valiosa para otros usuarios y nos ayuda a mejorar.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setEnviado(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Agregar otra reseña
            </button>
            <button 
              onClick={() => navigate('/producto')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Ver más productos
            </button>
          </div>
        </div>
      ) : (
        <form 
          className="review-form" 
          onSubmit={manejarEnvio} 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Calificación (1-5 estrellas):
            </label>
            <select
              value={calificacion}
              onChange={e => setCalificacion(parseInt(e.target.value))}
              required
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                width: '200px'
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
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Comentario:
            </label>
            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              rows="5"
              required
              placeholder="Comparte tu experiencia con este producto... ¿Qué te gustó? ¿Qué mejorarías?"
              style={{ 
                padding: '12px', 
                width: '100%', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '100px',
                boxSizing: 'border-box'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#666', fontSize: '14px' }}>
                Mínimo 5 caracteres
              </small>
              <small style={{ 
                color: comentario.length > 400 ? '#dc3545' : '#666', 
                fontSize: '14px' 
              }}>
                {comentario.length}/500 caracteres
              </small>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={enviando || comentario.trim().length < 5}
            style={{
              padding: '12px 20px',
              backgroundColor: (enviando || comentario.trim().length < 5) ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: (enviando || comentario.trim().length < 5) ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            {enviando ? 'Enviando reseña...' : 'Enviar Reseña'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Reviews;