import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReviewListContainer } from '../../RR-styled-components/RRsectionContainerStyle';
import ReviewCard from './ReviewCard';
import { retrieve2Reviews } from './serverAction';

// require('dotenv').config();

export default function ReviewList({ productId, reviews }) {
  const [moreReviews, setMoreReviews] = useState('false');
  const [showModalForm, setShowModalForm] = useState('false');


  return (
    <ReviewListContainer>
      {reviews.map((review) => (
        <ReviewCard key={review.review_id} review={review} />
      ))}
    </ReviewListContainer>
  );
}

