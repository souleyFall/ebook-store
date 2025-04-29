import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user, isAdmin, loading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && isAdmin) { 
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/products.php?action=list');
          const data = await response.json();
          
          if (data.success) {
            setProducts(data.products);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('Erreur lors du chargement des produits');
          console.error(error);
        } finally {
          setDataLoading(false);
        }
      };
      
      fetchProducts();
    }
  }, [loading, isAdmin]);

  const handleDelete = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/products.php?action=delete&id=${productId}`, {
          method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
          setProducts(products.filter(product => product.id !== productId));
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        alert('Une erreur est survenue lors de la suppression du produit.');
      }
    }
  };

  // Si l'utilisateur n'est pas connecté ou n'est pas admin, rediriger vers la page d'accueil
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/" replace />;
  }

  if (loading || dataLoading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Administrateur</h1>
      
      <div className="admin-actions">
        <Link to="/admin/product/add" className="btn add-product-btn">
          Ajouter un nouveau e-book
        </Link>
      </div>
      
      <div className="products-management">
        <h2>Gérer les e-books</h2>
        
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Titre</th>
                <th>Prix</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-products">Aucun produit disponible.</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img 
                        src={product.image || '/placeholder-ebook.jpg'} 
                        alt={product.title}
                        className="product-thumbnail" 
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price.toFixed(2)} €</td>
                    <td>{product.rating} ★ ({product.ratingCount})</td>
                    <td className="actions-cell">
                      <Link to={`/admin/product/edit/${product.id}`} className="btn edit-btn">
                        Modifier
                      </Link>
                      <button 
                        className="btn delete-btn"
                        onClick={() => handleDelete(product.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
