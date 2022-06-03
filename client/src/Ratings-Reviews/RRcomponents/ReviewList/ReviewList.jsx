import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormStyle } from '../../RR-styled-components/RRsectionContainerStyle';
import ReviewCard from './ReviewCard';
import ModalPopup from './Modal';
import Form from './Form';
import { ProductIdContext } from '../../../index';
import { retrieve2Reviews } from './serverAction';

// require('dotenv').config();

export default function ReviewList() {
  const { itemId, ratings } = useContext(ProductIdContext);
  const [reviews, setReviews] = useState([]);
  const [showModalForm, setShowModalForm] = useState('false');
  const [sort, setSort] = useState('relevant');
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);

  function retrieveReviews() {
    return retrieve2Reviews(itemId, page, count, sort)
      .then((res) => {
        setReviews([...res.data.results]);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, retrieve', err);
      });
  }

  function add(accumulator, a) {
    return accumulator + Number(a);
  }

  function clickMoreReviews() {
    return retrieve2Reviews(itemId, page + 1, count, sort)
      .then((res) => {
        setReviews((r) => r.concat(res.data.results));
      })
      .then(() => {
        setPage(page + 1);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, clickMore', err);
      });
  }

  function changeSort(e) {
    setSort(e.target.value);
  }

  const showModal = () => {
    setShowModalForm('true');
  };

  const hideModal = () => {
    setShowModalForm('false');
  };

  useEffect(() => {
    const allReviews = Object.values(ratings).reduce(add, 0);
    setTotalReviews(allReviews);
  }, [itemId]);

  useEffect(() => {
    setPage(1);
    retrieveReviews();
  }, [itemId, sort]);

  return (
    <div className="review-list-container">
      {/* Attempting to render message when no reviews */}
      {/* {{reviews}.length ? */}
      <div className="sort-bar">
        {totalReviews} reviews
        <select onChange={changeSort} className="sort-button">
          <option value="relevant">Sort by Relevance</option>
          <option value="newest">Sort by Newest</option>
          <option value="helpful">Sort by Helpful</option>
        </select>
      </div>
      <div className="review-list">
        {reviews.map((review) => (
          <ReviewCard key={review.review_id} review={review} />
        ))}
      </div>
      {/* : <div>No reviews. Be the first to submit! Click "Add Review"</div>> } */}
      <div className="bottom-buttons">
        <button className="text-border-btn" onClick={clickMoreReviews}>More Reviews</button>
        <button className="text-border-btn" type="button" onClick={showModal}>Add Review</button>
      </div>
      <ModalPopup show={showModalForm} handleExit={hideModal}>
        <FormStyle><Form /></FormStyle>
      </ModalPopup>
    </div>
  );
}
