import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReviewListContainer, BottomButtons } from '../../RR-styled-components/RRsectionContainerStyle';
import ReviewCard from './ReviewCard';
import { retrieve2Reviews } from './serverAction';

// require('dotenv').config();

export default function ReviewList({ productId, reviews }) {
  const [moreReviews, setMoreReviews] = useState('false');
  const [showModalForm, setShowModalForm] = useState('false');

  function clickMoreReviews() {
    return retrieve2Reviews(productId, page + 1)
      .then((res) => {
        setReviews([...res.data.results]);
      })
      .then(() => {
        setPage(page + 1);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, clickMore', err);
      });
  }

  const showModal = () => {
    setShowModalForm('true');
  };

  return (
    <ReviewListContainer>
      Reviews, sort by
      {reviews.map((review) => (
        <ReviewCard key={review.review_id} review={review} />
      ))}
      <BottomButtons>
        <button onClick={clickMoreReviews}>MoreReviews</button><button type="button" onClick={showModal}>Add Review</button>
      </BottomButtons>
    </ReviewListContainer>
  );
}
