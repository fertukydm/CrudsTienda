import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';

function CarritoC() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderInstructions, setOrderInstructions] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ Cargar items del carrito desde localStorage al montar el componente
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // ✅ Actualizar localStorage cuando cambie el carrito
  useEffect(() => {
    if (!isUpdating) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // Disparar evento para notificar cambios
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [cartItems, isUpdating]);

  // ✅ Escuchar cambios en el carrito desde otros componentes
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCartFromStorage();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // ✅ Función para cargar carrito desde localStorage
  const loadCartFromStorage = () => {
    try {
      setIsUpdating(true);
      const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      console.log('📦 Carrito cargado desde localStorage:', savedCart);
      setCartItems(savedCart);
    } catch (error) {
      console.error('❌ Error al cargar carrito:', error);
      setCartItems([]);
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ Manejar cambio de cantidad con validación mejorada
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // No permitir cantidades menores a 1
    
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { 
            ...item, 
            cantidad: newQuantity,
            quantity: newQuantity // Mantener compatibilidad
          };
          console.log('📝 Cantidad actualizada:', {
            producto: item.nombre || item.name,
            cantidadAnterior: item.cantidad || item.quantity,
            cantidadNueva: newQuantity
          });
          return updatedItem;
        }
        return item;
      })
    );
  };

  // ✅ Eliminar item del carrito
  const handleRemoveItem = (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    if (window.confirm(`¿Estás seguro de eliminar "${itemToRemove?.nombre || itemToRemove?.name}" del carrito?`)) {
      setCartItems((prevItems) => {
        const newItems = prevItems.filter((item) => item.id !== id);
        console.log('🗑️ Producto eliminado del carrito:', {
          eliminado: itemToRemove?.nombre || itemToRemove?.name,
          itemsRestantes: newItems.length
        });
        return newItems;
      });
    }
  };

  // ✅ Calcular total del carrito con manejo robusto de datos
  const calculateTotal = () => {
    const total = cartItems.reduce((total, item) => {
      const precio = item.precio || item.price || 0;
      const cantidad = item.cantidad || item.quantity || 1;
      return total + (precio * cantidad);
    }, 0);
    
    console.log('💰 Total calculado:', total, 'de', cartItems.length, 'items');
    return total;
  };

  // ✅ Obtener cantidad total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.cantidad || item.quantity || 1);
    }, 0);
  };

  // ✅ Limpiar todo el carrito
  const clearCart = () => {
    if (window.confirm('¿Estás seguro de vaciar todo el carrito?')) {
      setCartItems([]);
      setOrderInstructions('');
      localStorage.removeItem('cartItems');
      console.log('🧹 Carrito vaciado completamente');
    }
  };

  // ✅ Proceder al pago
  const handlePagar = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Guardar instrucciones del pedido
    if (orderInstructions.trim()) {
      localStorage.setItem('orderInstructions', orderInstructions);
    }

    console.log('💳 Procediendo al pago:', {
      items: cartItems.length,
      total: calculateTotal(),
      instrucciones: orderInstructions
    });

    navigate('/ProcesodePago');
  };

  // ✅ Continuar comprando
  const continueShopping = () => {
    navigate('/producto');
  };

  // ✅ Función auxiliar para obtener el valor de una propiedad con fallbacks
  const getItemProperty = (item, primaryProp, fallbackProp, defaultValue = '') => {
    return item[primaryProp] || item[fallbackProp] || defaultValue;
  };

  // Si el carrito está vacío, mostrar mensaje
  if (cartItems.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
        padding: '2rem',
        paddingTop: '1rem'
      }}>
        <div className="shopping-cart-container">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h2 style={{ color: '#333', marginBottom: '1rem' }}>Tu carrito está vacío</h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
              ¡Descubre nuestros increíbles productos y comienza a agregar tus favoritos!
            </p>
            <button 
              onClick={continueShopping}
              className="checkout-button"
              style={{ marginRight: '1rem' }}
            >
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: '2rem',
      paddingTop: '1rem'
    }}>
      <div className="shopping-cart-container">
        {/* Header del carrito */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333', margin: 0 }}>
            🛒 Mi Carrito ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})
          </h2>
          <div>
            <button 
              onClick={continueShopping}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                marginRight: '1rem',
                cursor: 'pointer'
              }}
            >
              Continuar Comprando
            </button>
            <button 
              onClick={clearCart}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Vaciar Carrito
            </button>
          </div>
        </div>

        <div className="cart-items">
          <div className="cart-header">
            <h3>Producto</h3>
            <h3>Cantidad</h3>
            <h3>Total</h3>
          </div>
          
          {cartItems.map((item) => {
            const nombre = getItemProperty(item, 'nombre', 'name', 'Producto sin nombre');
            const precio = getItemProperty(item, 'precio', 'price', 0);
            const imagen = getItemProperty(item, 'imagen', 'image', '/default.png');
            const formato = getItemProperty(item, 'formato', 'format', 'LP');
            const fechaLlegada = getItemProperty(item, 'fechaLlegada', 'arrivalDate', 'Pronto disponible');
            const cantidad = getItemProperty(item, 'cantidad', 'quantity', 1);

            return (
              <div className="cart-item" key={item.id}>
                <div className="item-details">
                  <img
                    src={imagen}
                    alt={nombre}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = '/default.png';
                    }}
                  />
                  <div className="item-info">
                    <div className="item-name">
                      <strong>${Number(precio).toFixed(2)}</strong> {nombre}
                    </div>
                    <div className="item-format">
                      📀 {formato}
                    </div>
                    <div className="item-arrival">
                      🚚 {fechaLlegada}
                    </div>
                    {/* Información adicional si está disponible */}
                    {item.artista && (
                      <div className="item-artist" style={{ color: '#666', fontSize: '0.9rem' }}>
                        🎵 {item.artista}
                      </div>
                    )}
                    {item.genero && (
                      <div className="item-genre" style={{ color: '#666', fontSize: '0.9rem' }}>
                        🎭 {item.genero}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, Number(cantidad) - 1)}
                    disabled={cantidad <= 1}
                    style={{ 
                      opacity: cantidad <= 1 ? 0.5 : 1,
                      cursor: cantidad <= 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ color: '#333', fontWeight: 'bold', margin: '0 1rem' }}>
                    {cantidad}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, Number(cantidad) + 1)}
                  >
                    +
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ marginLeft: '1rem' }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
                
                <div className="item-total" style={{ color: '#333', fontWeight: 'bold' }}>
                  ${(Number(precio) * Number(cantidad)).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-instructions">
          <h3>📝 Instrucciones del pedido</h3>
          <textarea 
            placeholder="Escribe instrucciones especiales para tu pedido (empaque especial, horario de entrega, etc.)..."
            value={orderInstructions}
            onChange={(e) => setOrderInstructions(e.target.value)}
            rows={4}
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>

        <div className="cart-summary">
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Subtotal ({getTotalItems()} productos):</span>
              <span style={{ fontWeight: 'bold' }}>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="total" style={{ 
              color: '#333', 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              borderTop: '2px solid #eee',
              paddingTop: '1rem'
            }}>
              Total: ${calculateTotal().toFixed(2)}
            </div>
          </div>
          
          <div className="shipping-info" style={{ 
            color: '#666',
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            📦 Los impuestos y gastos de envío se calculan en la pantalla de pago
          </div>
          
          <button 
            className="checkout-button" 
            onClick={handlePagar}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            💳 Proceder al Pago - ${calculateTotal().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarritoC;