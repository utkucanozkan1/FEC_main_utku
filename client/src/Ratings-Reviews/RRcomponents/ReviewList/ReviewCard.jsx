// eslint-disable jsx-a11y/no-noninteractive-element-interactions
// eslint-disable react/no-access-state-in-setstate
// eslint-disable react/destructuring-assignment
// eslint-disable react/prop-types
// eslint-disable jsx-a11y/img-redundant-alt
// eslint-disable jsx-a11y/click-events-have-key-events
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import ImageComponent from '../../../q-a/ImageComponent';
import StarRating from '../../../shared/StarRating';
import { putIsHelpful, putReported } from './serverAction';

export default function ReviewEntry({ review }) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  const [showAll, setShowAll] = useState(review.body.length < 250);

  const shortBody = review.body.substring(0, 250);

  function showMore(e) {
    e.preventDefault();
    setShowAll(!showAll)
  }

  function clickHelpFunction(e) {
    e.preventDefault();
    if (!isHelpful) {
      putIsHelpful(review.review_id)
        .then(() => {
          setIsHelpful(true);
        });
    }
  }

  function clickReportFunction(e) {
    e.preventDefault();
    if (!reported) {
      putReported(review.review_id)
        .then(() => {
          setReported(true);
        });
    }
  }

  return (
    <div className="review-card">
      <hr />
      <StarRating rating={review.rating}/>
      <div className="top-of-review">
        <h2 className="reviewer">
          {review.reviewer_name}
        </h2>
        <span className="date">
          {format(parseISO(review.date), 'MMMM do, yyyy')}
        </span>
      </div>
      <span className="review-summary">{review.summary}</span>
      {showAll ? <p className="review-body">{review.body}</p> : <p className="review-body">{shortBody}...</p>}
      {(showAll && review.body.length > 250 )? <a href="#" type="button" onClick={showMore}>Show Less</a>
        : (review.body.length > 250) ? <a href="#" type="button" onClick={showMore}>Show More</a> : <a></a> }
      {review.recommend ? <p> Recommend Product </p> : <p> </p>}
      {review.response ? <span className="review-summary">{review.response}</span> : <p> </p>}
      <div className="answerer-smallBreak">
        {
          review.photos.length !== 0
            ? review.photos.map((photo, i) => (
              <ImageComponent
                key={i}
                photo={photo}
              />
            )) : (null)
        }
      </div>
      <span className="span-helpful-btn">
        Helpful?
        {isHelpful ? 'Yes ' : <a href="#" role="button" onClick={clickHelpFunction}>Yes</a>}
        (
        {review.helpfulness}
        )
        |
        {reported ? ' Report' : <a href="#" role="button" onClick={clickReportFunction}>Report</a>}
      </span>
      <hr />
    </div>
  );
}
