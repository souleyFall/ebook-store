import React from 'react';

const StarRating = ({ rating, editable = false, onChange }) => {
  const stars = [1, 2, 3, 4, 5];
  
  const handleStarClick = (value) => {
    if (editable && onChange) {
      onChange(value);
    }
  };
  
  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span 
          key={star}
          className={`star ${star <= rating ? 'filled' : 'empty'} ${editable ? 'editable' : ''}`}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;