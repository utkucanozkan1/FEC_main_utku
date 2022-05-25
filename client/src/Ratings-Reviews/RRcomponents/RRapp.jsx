import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { RatingReviewContainer } from '../RR-styled-components/RRsectionContainerStyle';
import RatingSummary from './RatingSummary/RatingSummary';
import ReviewList from './ReviewList/ReviewList';
import { retrieve2Reviews, retrieveMeta } from './ReviewList/serverAction';

export default function RatingReviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [ productId, setProductId, setLoading ] = useState(37313);
  const [meta, setMeta] = useState({});
  const [sort, setSort] = useState('relevant');
  const [count, setCount] = useState(2);
  const [showModalForm, setShowModalForm] = useState('false');

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

  const showModal = () => {
    setShowModalForm('true');
  };

  useEffect(() => {
    retrieveReviews();
  }, [count, page, sort, productId]);

  useEffect(() => {
    axios.get(`/reviews/${productId}/reviewsMeta`)
      .then((res) => {
        setMeta(res.data);
      })
      .catch((err) => {
        console.log('Error, could not retrieve meta', err);
      });
  }, [productId]);

  return (
    <>
      <h3>Ratings and Reviews</h3>
      <RatingReviewContainer>
        <RatingSummary meta={meta} />
        Reviews, sort by
        <ReviewList productId={productId} reviews={reviews} />
      </RatingReviewContainer>
        <div>
          <button onClick={clickMoreReviews}>MoreReviews</button><button type="button" onClick={showModal}>Add Review</button>
        </div>
    </>
  );
}

