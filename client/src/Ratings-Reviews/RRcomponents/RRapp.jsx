import React from 'react';
import RatingReviewContainer from '../RR-styled-components/RRsectionContainerStyle';
import RatingSummary from './RatingSummary/RatingSummary';
import ProductBreakdown from './ProductBreakdown/ProductBreakdown';
import ReviewList from './ReviewList/ReviewList';

export default function RatingReviews() {
  return (
    <RatingReviewContainer>
      <h3>Ratings and Reviews</h3>
      <RatingSummary />
      <ProductBreakdown />
      <ReviewList />
    </RatingReviewContainer>
  );
}
