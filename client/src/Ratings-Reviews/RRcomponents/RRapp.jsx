import React from 'react';
import styled from 'styled-components';
import RatingSummary from './RatingSummary/RatingSummary.jsx';
import ProductBreakdown from './ProductBreakdown/ProductBreakdown.jsx';
import ReviewList from './ReviewList/ReviewList.jsx';

const RatingReview = styled.section`
display: flex;
flex-flow: column wrap;
align-items: flex-start;
align-self: flex-start;
max-width: 100%;
`;

export default function RatingReviews() {
  return (
    <>
      <h3>Ratings and Reviews</h3>
      <RatingReview className="RRsection">
        <RatingSummary />
        <ProductBreakdown />
        <ReviewList />
      </RatingReview>
    </>
  );
}
