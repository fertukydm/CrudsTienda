import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';

function CarritoC() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // ✅ Cargar items del carrito desde localStorage al montar el componente
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(savedCart);
  }, []);

  // ✅ Actualizar localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.precio || item.price || 0) * (item.cantidad || item.quantity || 1),
      0
    );
  };

  const handlePagar = () => {
    navigate('/ProcesodePago');
  };

  // ✅ Función para agregar productos desde el backend
  const addProductFromBackend = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4001/api/products`);
      if (response.ok) {
        const products = await response.json();
        const product = products.find(p => p._id === productId);
        
        if (product) {
          const cartProduct = {
            id: product._id,
            nombre: product.productName,
            precio: product.price,
            imagen: product.imageUrl || '/default.png',
            formato: 'LP',
            fechaLlegada: 'Arrives by 25 feb - 3 mar',
            cantidad: 1
          };
          
          setCartItems(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
              return prev.map(item =>
                item.id === productId 
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              );
            } else {
              return [...prev, cartProduct];
            }
          });
        }
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // Si el carrito está vacío, mostrar mensaje
  if (cartItems.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
        padding: '2rem',
        paddingTop: '1rem' // ✅ Menos padding arriba para respetar navbar
      }}>
        <div className="shopping-cart-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#ffffff' }}>Tu carrito está vacío</h2>
            <p style={{ color: '#ffffff', marginBottom: '2rem' }}>
              Agrega algunos productos desde la página de productos
            </p>
            <button 
              onClick={() => navigate('/producto')}
              className="checkout-button"
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
      paddingTop: '1rem' // ✅ Menos padding arriba para respetar navbar
    }}>
      <div className="shopping-cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <h3>Producto</h3>
            <h3>Cantidad</h3>
            <h3>Total</h3>
          </div>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-details">
                <img
                  src={item.imagen || item.image || '/default.png'}
                  alt={item.nombre || item.name}
                  className="item-image"
                />
                <div className="item-info">
                  <div className="item-name">
                    ${(item.precio || item.price || 0).toFixed(2)} {item.nombre || item.name}
                  </div>
                  <div className="item-format">{item.formato || item.format || 'LP'}</div>
                  <div className="item-arrival">{item.fechaLlegada || item.arrivalDate || 'Arrives by 25 feb - 3 mar'}</div>
                </div>
              </div>
              <div className="item-quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, (item.cantidad || item.quantity || 1) - 1)
                  }
                >
                  -
                </button>
                <span style={{ color: '#ffffff' }}>{item.cantidad || item.quantity || 1}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, (item.cantidad || item.quantity || 1) + 1)
                  }
                >
                  +
                </button>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
              <div className="item-total" style={{ color: '#ffffff' }}>
                ${((item.precio || item.price || 0) * (item.cantidad || item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="order-instructions">
          <h3>Instrucciones del pedido</h3>
          <textarea placeholder="Escribe instrucciones especiales para tu pedido..."></textarea>
        </div>

        <div className="cart-summary">
          <div className="total" style={{ color: '#ffffff' }}>
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <div className="shipping-info">
            Los impuestos y gastos de envío se calculan en la pantalla de pago
          </div>
          <button className="checkout-button" onClick={handlePagar}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarritoC;