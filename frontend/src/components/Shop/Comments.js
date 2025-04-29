
// Comments.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import StarRating from './StarRating';

const Comments = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments.php?action=list&productId=${productId}`);
        const data = await response.json();
        
        if (data.success) {
          setComments(data.comments);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Erreur lors du chargement des commentaires');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Vous devez être connecté pour laisser un commentaire.");
      return;
    }
    
    if (!newComment.trim()) {
      alert("Veuillez entrer un commentaire.");
      return;
    }
    
    try {
      const response = await fetch('/api/comments.php?action=add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          comment: newComment,
          rating: newRating,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Ajouter le nouveau commentaire à la liste
        setComments([
          {
            id: data.commentId,
            userId: user.id,
            userName: user.name,
            comment: newComment,
            rating: newRating,
            createdAt: new Date().toISOString(),
          },
          ...comments,
        ]);
        setNewComment('');
        setNewRating(5);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      alert('Une erreur est survenue lors de l\'ajout du commentaire.');
    }
  };

  if (loading) return <div className="loading">Chargement des commentaires...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="comments-section">
      <h3>Commentaires et avis</h3>
      
      {user && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <h4>Laisser un avis</h4>
          <div className="rating-input">
            <label>Votre note:</label>
            <StarRating 
              rating={newRating} 
              editable={true} 
              onChange={setNewRating} 
            />
          </div>
          <div className="comment-input">
            <label htmlFor="comment">Votre commentaire:</label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-comment-btn">Publier</button>
        </form>
      )}
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">Aucun commentaire pour le moment. Soyez le premier à donner votre avis !</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.userName}</span>
                <StarRating rating={comment.rating} />
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-content">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments