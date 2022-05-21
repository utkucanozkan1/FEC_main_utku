/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

function StarRating(props) {
  const rating = props?.rating || 0;

  // Storage for generated stars
  const stars = [];
  // subrating is used for class naming -> (fa-star-fill-{subrating})
  let subrating = (rating % 1) * 100; // Given operation => 3.63 -> (rating % 1) * 100 -> 63
  if (subrating < 50) {
    subrating = 25;
  } else if (subrating < 75) {
    subrating = 50;
  } else if (subrating < 100) {
    subrating = 75;
  } else {
    subrating = 100;
  }
  // Generate filled stars
  for (let starCount = 1; starCount <= 5; starCount += 1) {
    let star = null;
    if (starCount === Math.floor(rating)) {
      // At rating (subrated)
      star = <i className={`fa-star fa-star-fill-${subrating}`} />;
    } else if (starCount < Math.floor(rating)) {
      // Below rating (full)
      star = <i className="fa-star fa-star-fill-100" />;
    } else {
      // Above rating (empty)
      star = <i className="fa-star fa-star-fill-0" />;
    }
    stars.push(star);
  }

  return (
    <>
      {stars.map((star, index) => (
        // Add key to an already existing component
        <React.Fragment key={index}>
          {star}
        </React.Fragment>
      ))}
    </>
  );
}

export default StarRating;
