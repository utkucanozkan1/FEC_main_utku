import React from 'react';
import RatingSummary from './RatingSummary/RatingSummary.jsx';
import ProductBreakdown from './ProductBreakdown/ProductBreakdown.jsx';
import ReviewList from './ReviewList/ReviewList.jsx';

export default function RatingReviews() {
  return (
    <>
      <h3>Ratings and Reviews</h3>
      <RatingSummary />
      <ProductBreakdown />
      <ReviewList />
    </>
  );
}
