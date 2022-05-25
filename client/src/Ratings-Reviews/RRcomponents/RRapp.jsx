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
  const [productId, setProductId, setLoading ] = useState(itemId);
  const [meta, setMeta] = useState({});

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
        <ReviewList productId={productId} />
      </RatingReviewContainer>
    </>
  );
}
