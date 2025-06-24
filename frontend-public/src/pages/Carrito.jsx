import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';

function CarritoC() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderInstructions, setOrderInstructions] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // --- Carga inicial y sincronización con localStorage ---
  useEffect(() => {
    const storedInstructions = localStorage.getItem('orderInstructions');
    if (storedInstructions) setOrderInstructions(storedInstructions);
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    if (!isUpdating) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdated'));
      console.log('💾 cartItems saved', cartItems);
    }
  }, [cartItems, isUpdating]);

  useEffect(() => {
    const onCartUpdate = () => loadCartFromStorage();
    window.addEventListener('cartUpdated', onCartUpdate);
    return () => window.removeEventListener('cartUpdated', onCartUpdate);
  }, []);

  const loadCartFromStorage = () => {
    setIsUpdating(true);
    try {
      const saved = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(saved);
      console.log('📦 Loaded cart', saved);
    } catch (e) {
      console.error('❌ Error loading cart', e);
      setCartItems([]);
    } finally {
      setIsUpdating(false);
    }
  };

  // --- Helpers de cálculo ---
  const calculateTotal = () => cartItems.reduce((s, i) => {
    const p = i.precio || i.price || 0;
    const q = i.cantidad || i.quantity || 1;
    return s + p * q;
  }, 0);

  const getTotalItems = () => cartItems.reduce((s, i) => s + (i.cantidad || i.quantity || 1), 0);

  const getItemProp = (item, prop, fallback, def = '') => item[prop] || item[fallback] || def;

  // --- Actions sobre el carrito ---
  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: newQty, quantity: newQty }
          : item
      )
    );
  };

  const handleRemove = id => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    if (window.confirm(`¿Eliminar "${item.nombre || item.name}"?`)) {
      setCartItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const clearCart = () => {
    if (window.confirm('¿Vaciar carrito completo?')) {
      setCartItems([]);
      setOrderInstructions('');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('orderInstructions');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    if (orderInstructions.trim()) {
      localStorage.setItem('orderInstructions', orderInstructions);
    }
    navigate('/ProcesodePago');
  };

  const continueShopping = () => navigate('/producto');

  // --- Renderizado ---

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart-container">
        <div className="empty-cart">
          <div className="empty-cart__emoji">🛒</div>
          <h2 className="empty-cart__title">Tu carrito está vacío</h2>
          <p className="empty-cart__subtitle">¡Descubre productos increíbles!</p>
          <button className="checkout-button" onClick={continueShopping}>Ver Productos</button>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      <header className="cart-header">
        <h2>🛒 Mi Carrito ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})</h2>
        <div className="cart-header__actions">
          <button onClick={continueShopping}>Continuar Comprando</button>
          <button onClick={clearCart}>Vaciar Carrito</button>
        </div>
      </header>

      <div className="cart-items">
        <div className="cart-items__titles">
          <span>Producto</span>
          <span>Cantidad</span>
          <span>Total</span>
        </div>

        {cartItems.map(item => {
          const nombre = getItemProp(item, 'nombre', 'name', 'Sin nombre');
          const precio = getItemProp(item, 'precio', 'price', 0);
          const cantidad = item.cantidad || item.quantity || 1;
          const imagen = getItemProp(item, 'imagen', 'image', '/default.png');
          const formato = getItemProp(item, 'formato', 'format', 'LP');
          const fecha = getItemProp(item, 'fechaLlegada', 'arrivalDate', 'Pronto disponible');

          return (
            <div key={item.id} className="cart-item">
              <div className="cart-item__details">
                <img
                  src={imagen}
                  alt={nombre}
                  onError={e => (e.target.src = '/default.png')}
                  className="cart-item__image"
                />
                <div className="cart-item__info">
                  <strong>${precio.toFixed(2)}</strong> {nombre}
                  <div className="cart-item__meta">📀 {formato}</div>
                  <div className="cart-item__meta">🚚 {fecha}</div>
                  {item.artista && <div className="cart-item__meta">🎵 {item.artista}</div>}
                  {item.genero && <div className="cart-item__meta">🎭 {item.genero}</div>}
                </div>
              </div>

              <div className="cart-item__quantity">
                <button onClick={() => handleQtyChange(item.id, cantidad - 1)} disabled={cantidad <= 1}>-</button>
                <span>{cantidad}</span>
                <button onClick={() => handleQtyChange(item.id, cantidad + 1)}>+</button>
                <button className="remove-button" onClick={() => handleRemove(item.id)}>🗑️ Eliminar</button>
              </div>

              <div className="cart-item__total">
                ${(precio * cantidad).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="order-section">
        <h3>📝 Instrucciones del pedido</h3>
        <textarea
          className="order-section__textarea"
          placeholder="Instrucciones especiales..."
          value={orderInstructions}
          onChange={e => setOrderInstructions(e.target.value)}
          rows={4}
        />

        <div className="order-section__summary">
          <div>
            Subtotal ({getTotalItems()} productos): <strong>${calculateTotal().toFixed(2)}</strong>
          </div>
          <div className="order-section__total">
            Total: <strong>${calculateTotal().toFixed(2)}</strong>
          </div>
        </div>

        <button className="checkout-button" onClick={handleCheckout}>
          💳 Proceder al Pago - ${calculateTotal().toFixed(2)}
        </button>
        <div className="order-section__note">
          📦 Impuestos y envío se calculan en la pantalla de pago
        </div>
      </div>
    </div>
  );
}

export default CarritoC;
