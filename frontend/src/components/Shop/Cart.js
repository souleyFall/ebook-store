// Cart.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const Cart = () => {
  const { cart, total, quantityOfArticles, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  if (quantityOfArticles === 0) {
    return (
      <div className="cart-container container">
        <h1>Votre Panier</h1>
        <div className="cart-empty">
          <p>Votre panier est vide.</p>
          <Link to="/" className="btn">Continuer vos achats</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container container">
      <h1>Votre Panier</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image || '/placeholder-ebook.jpg'} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">{item.price.toFixed(2)} €</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-input">
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="btn-danger" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-sidebar">
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <Link to="/checkout" className="btn checkout-btn">
              Procéder au paiement
            </Link>
            <button 
              className="btn btn-secondary" 
              onClick={clearCart}
              style={{ marginTop: '10px', width: '100%' }}
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;