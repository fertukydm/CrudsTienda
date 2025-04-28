import React from 'react';
import './Carrito.css';


function CarritoC() {
    const [cartItems, setCartItems] = useState([
      {
        id: 1,
        name: 'I love you',
        price: 49.00,
        format: 'LP',
        arrivalDate: 'Arrives by 25 feb - 3 mar',
        quantity: 1,
        image: '30.jpg',
      },
      {
        id: 2,
        name: 'reputation',
        price: 67.00,
        format: 'LP',
        arrivalDate: 'Arrives by 25 feb - 3 mar',
        quantity: 1,
        image: 'record2.jpg', 
      },
      {
        id: 3,
        name: 'orquídeas',
        price: 59.00,
        format: 'LP',
        arrivalDate: 'Arrives by 25 feb - 3 mar',
        quantity: 1,
        image: 'record3.jpg', 
      },
    ]);
  
    const handleQuantityChange = (id, newQuantity) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        )
      );
    };
  
    const handleRemoveItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
  
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    return (
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
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <div className="item-name">${item.price.toFixed(2)} {item.name}</div>
                  <div className="item-format">{item.format}</div>
                  <div className="item-arrival">{item.arrivalDate}</div>
                </div>
              </div>
              <div className="item-quantity">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                  Eliminar
                </button>
              </div>
              <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
  
        <div className="order-instructions">
          <h3>Instrucciones del pedido</h3>
          <textarea placeholder=""></textarea>
        </div>
  
        <div className="cart-summary">
          <div className="total">Total: ${calculateTotal().toFixed(2)}</div>
          <div className="shipping-info">los impuestos y gastos de envío se calculan en la pantalla de pago</div>
          <button className="checkout-button">Pagar</button>
        </div>
      </div>
    );
  }
  
  export default CarritoC;
