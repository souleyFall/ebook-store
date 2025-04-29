import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useContext(AuthContext);
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    author: '',
  });
  
  const [formLoading, setFormLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si en mode édition, charger les données du produit
    if (isEditing && !loading && isAdmin) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/products.php?action=get&id=${id}`);
          const data = await response.json();
          
          if (data.success) {
            setFormData({
              title: data.product.title,
              description: data.product.description,
              price: data.product.price.toString(),
              image: data.product.image || '',
              category: data.product.category || '',
              author: data.product.author || '',
            });
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('Erreur lors du chargement du produit');
          console.error(error);
        } finally {
          setFormLoading(false);
        }
      };
      
      fetchProduct();
    } else {
      setFormLoading(false);
    }
  }, [id, isEditing, loading, isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.title.trim() || !formData.description.trim() || !formData.price) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    try {
      const endpoint = isEditing 
        ? `http://localhost:8000/api/products.php?action=update&id=${id}` 
        : 'http://localhost:8000/api/products.php?action=add';
      
      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(isEditing ? 'Produit modifié avec succès!' : 'Produit ajouté avec succès!');
        navigate('/admin');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du produit:', error);
      alert('Une erreur est survenue lors de l\'enregistrement du produit.');
    }
  };

  // Si l'utilisateur n'est pas connecté ou n'est pas admin, rediriger vers la page d'accueil
  /*if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/" replace />;
  }*/

  if (loading || formLoading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-form-container">
      <h1>{isEditing ? 'Modifier un e-book' : 'Ajouter un e-book'}</h1>
      
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Prix (€) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image">URL de l'image</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Auteur</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn cancel-btn" onClick={() => navigate('/admin')}>
            Annuler
          </button>
          <button type="submit" className="btn submit-btn">
            {isEditing ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;