import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ProductIdContext } from '../../index';
import { RatingReviewContainer, BottomButtons } from '../RR-styled-components/RRsectionContainerStyle';
import RatingSummary from './RatingSummary/RatingSummary';
import ReviewList from './ReviewList/ReviewList';
import { retrieve2Reviews, retrieveMeta } from './ReviewList/serverAction';

export default function RatingReviews() {
  const { itemId } = useContext(ProductIdContext);
  const [ ratingFilter, setRatingFilter ] = useState('');

  return (
    <>
      <h3>Ratings and Reviews</h3>
      <RatingReviewContainer>
        <RatingSummary setRatingFilter={setRatingFilter} />
        <ReviewList ratingFilter={ratingFilter} />
      </RatingReviewContainer>
    </>
  );
}
