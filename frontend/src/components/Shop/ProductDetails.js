import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductAndComments = async () => {
      try {
        // Fetch du produit
        const productResponse = await fetch(`http://localhost:8000/api/products.php?action=get&id=${id}`);
        const productData = await productResponse.json();
        if (productData.success) {
          setProduct(productData.product);
        }else{
          setError(productData.message);
        }
        
        // Fetch des commentaires
        const commentsResponse = await fetch(`http://localhost:8000/api/comments.php?action=list&productId=${id}`);
        const commentsData = await commentsResponse.json();
        if(commentsData.success){
          setComments(commentsData.comments);
        }else{
          setError(commentsData.message);
        }
        
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndComments();
  }, [id]);
  
  if (loading) return <div>Chargement...</div>;
  if (!product) return <div>Produit introuvable</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-details-container">
      <div className="product-main-info">
        <img
          className="product-image"
          src={product.image || '/placeholder-ebook.jpg'}
          alt={product.title}
        />
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-author">Par {product.author}</p>
          <div className="product-rating">
            <StarRating rating={product.rating} />
            <span className="rating-count">({product.ratingCount} avis)</span>
          </div>
          <p className="product-price">{product.price} €</p>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
        </div>
      </div>

      <div className="product-comments-section">
        <h2>Commentaires</h2>
        {Array.isArray(comments) && comments.length === 0 ? (
          <p>Aucun commentaire pour cet ebook.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <strong>{comment.userName}</strong> - {new Date(comment.createdAt).toLocaleDateString()}
              </div>
              <div className="comment-rating">
                <StarRating rating={comment.rating} />
              </div>
              <p className="comment-content">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
