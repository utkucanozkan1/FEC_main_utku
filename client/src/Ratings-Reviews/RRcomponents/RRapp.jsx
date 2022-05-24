import React from 'react';
import RatingReviewContainer from '../RR-styled-components/RRsectionContainerStyle';
import RatingSummary from './RatingSummary/RatingSummary';
import ReviewList from './ReviewList/ReviewList';

export default function RatingReviews() {
  return (
    <>
      <h3>Ratings and Reviews</h3>
      <RatingReviewContainer>
        <RatingSummary productId="37311" />
        <ReviewList productId="37311" />
      </RatingReviewContainer>
    </>
  );
}
