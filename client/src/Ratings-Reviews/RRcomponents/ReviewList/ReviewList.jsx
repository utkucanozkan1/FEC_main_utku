import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReviewListContainer, BottomButtons, FormStyle } from '../../RR-styled-components/RRsectionContainerStyle';
import ReviewCard from './ReviewCard';
import ModalPopup from './Modal';
import Form from './Form';
import { retrieve2Reviews } from './serverAction';

// require('dotenv').config();

export default function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [showModalForm, setShowModalForm] = useState('false');
  const [sort, setSort] = useState('relevant');
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(1);

  function retrieveReviews() {
    return retrieve2Reviews(productId)
      .then((res) => {
        setReviews([...res.data.results]);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, retrieve', err);
      });
  }

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
  useEffect(() => {
    retrieveReviews();
  }, [count, page, sort, productId]);

  const showModal = () => {
    setShowModalForm('true');
  };

  const hideModal = () => {
    setShowModalForm('false');
  };

  return (
    <ReviewListContainer>
      <select>Reviews, sort by</select>
      {reviews.map((review) => (
        <ReviewCard key={review.review_id} review={review} />
      ))}
      <BottomButtons>
        <button onClick={clickMoreReviews}>More Reviews</button>
        <button type="button" onClick={showModal}>Add Review</button>
      </BottomButtons>
      <ModalPopup show={showModalForm} handleExit={hideModal}>
        <FormStyle><Form productId={productId}/></FormStyle>
      </ModalPopup>
    </ReviewListContainer>
  );
}
