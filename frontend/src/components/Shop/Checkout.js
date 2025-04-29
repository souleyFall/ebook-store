import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : '',
    lastName: user ? (user.name.split(' ')[1] || '') : '',
    email: user ? user.email : '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    paymentMethod: 'card',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Rediriger vers la page d'accueil si le panier est vide
  if (cart.length === 0) {
    navigate('/');
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Effacer l'erreur pour ce champ s'il est modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.address.trim()) newErrors.address = 'Adresse requise';
    if (!formData.city.trim()) newErrors.city = 'Ville requise';
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Code postal requis';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulation d'une requête API pour finaliser la commande
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Réinitialiser le panier
      clearCart();
      
      // Rediriger vers une page de confirmation
      navigate('/checkout/success');
    } catch (error) {
      console.error('Erreur lors de la finalisation de la commande:', error);
      setErrors({
        submit: 'Une erreur est survenue lors de la finalisation de votre commande. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="checkout-container container">
      <div className="checkout-form-container">
        <h1>Finaliser votre commande</h1>
        
        {errors.submit && (
          <div className="error">{errors.submit}</div>
        )}
        
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Informations personnelles</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Prénom *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nom *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <h2>Adresse de facturation</h2>
          <div className="form-group">
            <label htmlFor="address">Adresse *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Ville *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Code postal *</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
              {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Pays *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Canada">Canada</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          
          <h2>Mode de paiement</h2>
          <div className="payment-options">
            <div className="payment-option">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
              />
              <label htmlFor="card">Carte bancaire</label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleChange}
              />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
          
          {formData.paymentMethod === 'card' && (
            <div className="card-details">
              <div className="form-group">
                <label htmlFor="cardNumber">Numéro de carte *</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Date d'expiration *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/AA"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="form-actions">
            <button
              type="submit"
              className="btn submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="checkout-summary">
        <h2>Récapitulatif</h2>
        <div className="checkout-items">
          {cart.map(item => (
            <div key={item.id} className="checkout-item">
              <span>{item.title} x{item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
        </div>
        <div className="checkout-total">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;