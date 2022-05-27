import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  ReviewEntryStyle, SmallSum, Date, Paragraph, TopOfReview
} from '../../RR-styled-components/RRsectionContainerStyle';
import StarRating from '../../../shared/StarRating';

export default function ReviewEntry({ review, retrieveReviews }) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  const [showAll, setShowAll] = useState(review.body.length < 250);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);
  const shortBody = review.body.substring(0, 250);

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
      <StarRating rating={review.rating}/>
      <TopOfReview>
        <h2>
          {review.reviewer_name}
        </h2>
        <Date>
          {format(parseISO(review.date), 'MMMM do, yyyy')}
        </Date>
      </TopOfReview>
      <SmallSum>{review.summary}</SmallSum>
      {{ showAll } ? <Paragraph>{review.body}</Paragraph> : <Paragraph>{shortBody} </Paragraph>}
      {({ showAll } && review.body.length > 250 )? <a href="#" type="button" onClick={showLess}>Show Less</a>
        : (review.body.length > 250) ? <a href="#" type="button" onClick={showMore}>Show More</a> : <a></a> }
      {review.recommend ? <p> Recommend Product </p> : <p> </p>}
      {review.response ? <SmallSum>{review.response}</SmallSum> : <p> </p>}
      <div>
        {
          review.photos.length !== 0
            ? review.photos.map((photo, i) => (
              <img
                key={i}
                src={photo.url}
                width="100"
                alt="header img"
              />
            )) : (null)
        }
      </div>
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
