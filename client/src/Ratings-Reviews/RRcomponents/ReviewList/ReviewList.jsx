import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  ReviewListContainer, BottomButtons, FormStyle, Button,
} from '../../RR-styled-components/RRsectionContainerStyle';
import ReviewCard from './ReviewCard';
import ModalPopup from './Modal';
import Form from './Form';
import { ProductIdContext } from '../../../index';
import { retrieve2Reviews, retrieveAllReviews } from './serverAction';

// require('dotenv').config();

export default function ReviewList() {
  const { itemId } = useContext(ProductIdContext);
  const [reviews, setReviews] = useState([]);
  const [showModalForm, setShowModalForm] = useState('false');
  const [sort, setSort] = useState('relevant');
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);

  function retrieveReviews() {
    return retrieve2Reviews(itemId, page, count, sort)
      .then((res) => {
        setReviews([...res.data.results]);
        setTotalReviews(res.data.count);
      })
      .catch((err) => {
        console.log('Error, could not retrieve reviews, retrieve', err);
      });
  }

  function add(accumulator, a) {
    return accumulator + Number(a);
  }

  useEffect(() => {
    axios.get(`/reviews/${itemId}/reviewsMeta`)
      .then((res) => {
        setMeta(res.data);
        const allReviews = Object.values(res.data.ratings).reduce(add, 0);
        setTotalReviews(allReviews);
      })
      .catch((err) => {
        console.log('Error, could not retrieve meta', err);
      });
  }, [itemId]);

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
    retrieveReviews();
  }, [itemId, sort]);

  // useEffect(() => {
  //   retrieveTotalReviews();
  // }, [itemId]);

  return (
    <ReviewListContainer>
      <br />
      {/* Attempting to render message when no reviews */}
      {/* {{reviews}.length ? */}
      <Button>
        {totalReviews} reviews
        <select onChange={changeSort}>
          <option value="relevant">Sort by Relevant</option>
          <option value="newest">Sort by Newest</option>
          <option value="helpful">Sort by Helpful</option>
        </select>
      </Button>
      {reviews.map((review) => (
        <ReviewCard key={review.review_id} review={review} />
      ))}
      {/* : <div>No reviews. Be the first to submit! Click "Add Review"</div>> } */}
      <BottomButtons>
        <button onClick={clickMoreReviews}>More Reviews</button>
        <button type="button" onClick={showModal}>Add Review</button>
      </BottomButtons>
      <ModalPopup show={showModalForm} handleExit={hideModal}>
        <FormStyle><Form productId={itemId} /></FormStyle>
      </ModalPopup>
    </ReviewListContainer>
  );
}
