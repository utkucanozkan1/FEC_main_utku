import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReviewEntryStyle from '../../RR-styled-components/ReviewEntryStyle';
import StarRating from '../../../shared/StarRating';

export default function ReviewEntry({ review, retrieveReviews }) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  function clickFunction(e) {
    let clickURL = '';
    let stateFunction;
    if (e.target.innerHTML === 'Yes') {
      clickURL = `/reviews/${review.review_id}/helpful`;
      stateFunction = setIsHelpful;
    }
    if (e.target.innerHTML === 'Report') {
      clickURL = `/reviews${review.review_id}/report`;
      stateFunction = setReported;
    }

    axios.put(clickURL)
      .then(() => {
        retrieveReviews()
          .then(() => {
            stateFunction(true);
          });
      })
      .catch((err) => {
        console.log(`error setting ${e.target.innerHTML}`, err);
      });
  }

  return (
    <ReviewEntryStyle>
      <hr />
      <StarRating />
      <span>
        {review.reviewer_name}
        ,
        {format(parseISO(review.date), 'MMMM do, yyyy')}
      </span>
      <h3>{review.summary}</h3>
      <p>{review.body}</p>
      {review.recommend ? <p> I recommend this product </p> : <p> </p>}
      {review.response ? <p>{review.response}</p> : <p> </p>}
      <span>
        Helpful?
        {isHelpful ? 'Yes ' : <a href="#" role="button" onClick={clickFunction}>Yes</a>}
        (
        {review.helpfulness}
        )
        |
        {reported ? ' Report' : <a href="#" role="button" onClick={clickFunction}>Report</a>}
      </span>
      <hr />
    </ReviewEntryStyle>
  );
}

ReviewEntry.propTypes = {
  review: PropTypes.object.isRequired,
  retrieveReviews: PropTypes.func.isRequired,
};
