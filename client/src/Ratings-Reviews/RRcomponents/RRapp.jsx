import React, { useState } from 'react';
import RatingSummary from './RatingSummary/RatingSummary';
import ReviewList from './ReviewList/ReviewList';

export default function RatingReviews() {
  const [ratingFilter, setRatingFilter] = useState('');

  function filterByRating(event) {
    event.preventDefault();
    console.log('still working on this filter');
  }

  return (
    <>
      <div className="outer-review">
        <section id="reviews" className="reviews-section">
          <RatingSummary setRatingFilter={filterByRating} />
          <ReviewList ratingFilter={ratingFilter} />
        </section>
      </div>
      <br />
    </>
  );
}
