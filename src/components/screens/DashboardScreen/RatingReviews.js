import React from 'react';

const RatingReviews = ({ rating, reviews }) => {
  return (
    <div className="rating-reviews">
      <div className="rating">
        <span className="rating-number">{rating}</span>
        <span className="rating-star">★</span>
      </div>
      <div className="reviews">
        <span className="reviews-number">{reviews} reviews</span>
      </div>
    </div>
  );
};

export default RatingReviews;
