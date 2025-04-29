import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image || '/placeholder-ebook.jpg'} alt={product.title} />
        </div>
        <h3 className="product-title">{product.title}</h3>
      </Link>
      <div className="product-rating">
        <StarRating rating={product.rating} />
        <span className="rating-count">({product.ratingCount} avis)</span>
      </div>
      <div className="product-price">{product.price.toFixed(2)} €</div>
      <p className="product-description">{product.description.substring(0, 100)}...</p>
      <button 
        className="add-to-cart-btn"
        onClick={() => addToCart(product)}
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;