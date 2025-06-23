import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './ReviewA.css';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // 'todas', 'producto', 'calificacion'
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [calificacionFiltro, setCalificacionFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      await Promise.all([cargarReviews(), cargarProductos()]);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarReviews = async () => {
    try {
      console.log('🔄 Cargando todas las reviews...');
      const response = await fetch('http://localhost:4001/api/reviews');
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📝 Reviews cargadas:', data);
      
      if (data.success) {
        setReviews(data.reviews || []);
        toast.success(`${data.reviews?.length || 0} reseñas cargadas`);
      } else {
        setReviews([]);
        toast.info('No se encontraron reseñas');
      }
    } catch (error) {
      console.error('Error al cargar reviews:', error);
      toast.error('Error al cargar las reseñas');
      setReviews([]);
    }
  };

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/products');
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      
      const productosData = await response.json();
      setProducts(productosData || []);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      toast.error('Error al cargar productos');
    }
  };

  const eliminarReview = async (reviewId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      return;
    }

    try {
      console.log('🗑️ Eliminando review:', reviewId);
      const response = await fetch(`http://localhost:4001/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setReviews(reviews.filter(review => review.id !== reviewId));
        toast.success('Reseña eliminada exitosamente');
      } else {
        throw new Error(data.message || 'Error al eliminar');
      }
    } catch (error) {
      console.error('Error al eliminar review:', error);
      toast.error(`Error al eliminar la reseña: ${error.message}`);
    }
  };

  const obtenerNombreProducto = (productId) => {
    const producto = products.find(p => p._id === productId);
    return producto ? producto.productName : 'Producto no encontrado';
  };

  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span 
          key={i} 
          style={{ 
            color: i <= calificacion ? '#ffc107' : '#e0e0e0',
            fontSize: '18px'
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filtrarReviews = () => {
    let reviewsFiltradas = [...reviews];

    // Filtro por búsqueda de texto
    if (busqueda.trim()) {
      reviewsFiltradas = reviewsFiltradas.filter(review =>
        review.comment.toLowerCase().includes(busqueda.toLowerCase()) ||
        obtenerNombreProducto(review.productId).toLowerCase().includes(busqueda.toLowerCase()) ||
        review.userId.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro por producto
    if (filtro === 'producto' && productoSeleccionado) {
      reviewsFiltradas = reviewsFiltradas.filter(review => 
        review.productId === productoSeleccionado
      );
    }

    // Filtro por calificación
    if (filtro === 'calificacion' && calificacionFiltro) {
      reviewsFiltradas = reviewsFiltradas.filter(review => 
        review.rating === parseInt(calificacionFiltro)
      );
    }

    return reviewsFiltradas;
  };

  const calcularEstadisticas = () => {
    const reviewsFiltradas = filtrarReviews();
    const total = reviewsFiltradas.length;
    
    if (total === 0) {
      return {
        total: 0,
        promedio: 0,
        distribucion: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const suma = reviewsFiltradas.reduce((acc, review) => acc + review.rating, 0);
    const promedio = (suma / total).toFixed(1);
    
    const distribucion = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewsFiltradas.forEach(review => {
      distribucion[review.rating]++;
    });

    return { total, promedio, distribucion };
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Toaster position="top-right" />
        <h2>Cargando reseñas...</h2>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const estadisticas = calcularEstadisticas();
  const reviewsFiltradas = filtrarReviews();

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <Toaster position="top-right" />
      
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>
          Gestión de Reseñas
        </h1>
        <p style={{ textAlign: 'center', color: '#666', margin: '0' }}>
          Administra y modera todas las reseñas de productos
        </p>
      </div>

      {/* Estadísticas */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: '0' }}>Estadísticas</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          <div>
            <h4>Total de Reseñas</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
              {estadisticas.total}
            </p>
          </div>
          <div>
            <h4>Calificación Promedio</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                {estadisticas.promedio}
              </span>
              <div>{renderEstrellas(Math.round(estadisticas.promedio))}</div>
            </div>
          </div>
          <div>
            <h4>Distribución</h4>
            {Object.entries(estadisticas.distribucion).map(([estrella, cantidad]) => (
              <div key={estrella} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{estrella}★</span>
                <span>{cantidad}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: '0' }}>Filtros</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '15px',
          marginBottom: '15px'
        }}>
          {/* Búsqueda */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Buscar:
            </label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar en comentarios, productos o usuarios..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Tipo de filtro */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Filtrar por:
            </label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="todas">Todas las reseñas</option>
              <option value="producto">Por producto</option>
              <option value="calificacion">Por calificación</option>
            </select>
          </div>

          {/* Filtro por producto */}
          {filtro === 'producto' && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Producto:
              </label>
              <select
                value={productoSeleccionado}
                onChange={(e) => setProductoSeleccionado(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="">Seleccionar producto</option>
                {products.map((producto) => (
                  <option key={producto._id} value={producto._id}>
                    {producto.productName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro por calificación */}
          {filtro === 'calificacion' && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Calificación:
              </label>
              <select
                value={calificacionFiltro}
                onChange={(e) => setCalificacionFiltro(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="">Todas las calificaciones</option>
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="2">2 estrellas</option>
                <option value="1">1 estrella</option>
              </select>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              setBusqueda('');
              setFiltro('todas');
              setProductoSeleccionado('');
              setCalificacionFiltro('');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Limpiar Filtros
          </button>
          <button
            onClick={cargarReviews}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Lista de Reviews */}
      <div>
        <h3>
          Reseñas ({reviewsFiltradas.length})
        </h3>
        
        {reviewsFiltradas.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <p>No se encontraron reseñas con los filtros aplicados.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {reviewsFiltradas.map((review, index) => (
              <div 
                key={review.id || index}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #eee'
                }}
              >
                {/* Header de la review */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 5px 0', 
                      color: '#333',
                      fontSize: '18px'
                    }}>
                      {obtenerNombreProducto(review.productId)}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div>{renderEstrellas(review.rating)}</div>
                      <span style={{ fontWeight: 'bold', color: '#333' }}>
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <small style={{ color: '#666', display: 'block' }}>
                      {formatearFecha(review.fechaCreacion || review.createdAt)}
                    </small>
                    <small style={{ color: '#888', fontSize: '12px' }}>
                      ID: {review.id}
                    </small>
                  </div>
                </div>

                {/* Comentario */}
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ 
                    margin: '0',
                    lineHeight: '1.6',
                    color: '#333',
                    backgroundColor: '#f8f9fa',
                    padding: '12px',
                    borderRadius: '4px',
                    borderLeft: '3px solid #007bff'
                  }}>
                    "{review.comment}"
                  </p>
                </div>

                {/* Info del usuario y acciones */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <small style={{ color: '#666' }}>
                      <strong>Usuario:</strong> {review.userId || 'Usuario anónimo'}
                    </small>
                    <br />
                    <small style={{ color: '#666' }}>
                      <strong>Producto ID:</strong> {review.productId}
                    </small>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => eliminarReview(review.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón para volver arriba */}
      {reviewsFiltradas.length > 5 && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ⬆️ Volver arriba
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;