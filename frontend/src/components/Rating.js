import React from "react";

export const Rating = ({ numReviews, rating, color }) =>
  <div className="rating">
    {[...Array(5).keys()].map(i => (
      <span key={i}>
        <i style={{ color: color }}
           className={
             rating >= i + 1
               ? 'fas fa-star'
               : rating >= i + 0.5
               ? 'fas fa-star-half-alt'
               : 'far fa-star'
           }
        />
     </span>
    ))}
    <span>{numReviews && numReviews} reviews</span>
  </div>

Rating.defaultProps = {
  color: "blue"
}
