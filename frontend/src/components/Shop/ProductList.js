import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Filter from './Filter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products.php?action=list');
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Erreur lors du chargement des produits');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    // Appliquer les filtres
    let result = [...products];
    
    switch (filter) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Par défaut, tri par date d'ajout (du plus récent au plus ancien)
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredProducts(result);
  }, [filter, products]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading) return <div className="loading">Chargement des produits...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list-container">
      <h1>Nos E-books informatiques</h1>
      
      <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
      
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-products">Aucun produit disponible.</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;