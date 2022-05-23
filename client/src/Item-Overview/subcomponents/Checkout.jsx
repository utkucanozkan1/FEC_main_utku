/* eslint-disable import/extensions */
import React from 'react';

// Subcomponent imports
import StarRating from '../../shared/StarRating.jsx';

function Checkout() {
  // Replace with mock/real data
  const styles = [];
  for (let i = 1; i <= 7; i += 1) {
    let style = (
      <li>
        <a className="style-thumbnail" href="https://www.google.com/"> </a>
      </li>
    );

    if (i === 3) {
      style = (
        <li>
          <a className="style-thumbnail style-selected-anchor" href="https://www.google.com/"> </a>
        </li>
      );
    }

    styles.push(style);
  }

  return (
    <section className="checkout-section">
      {/* Rating and Title */}
      <div className="rating-title">
        <div className="reviews-wrapper">
          <StarRating rating={5} />
          <a href="https://www.google.com/" className="reviews-link" target="_blank" rel="noreferrer">
            Read all reviews
          </a>
        </div>
        <p className="category">{'category'.toUpperCase()}</p>
        <h2 className="category-title">Expanded Product Name</h2>
        <p className="price">$369</p>
      </div>

      {/* Style */}
      <div className="style">
        <strong>
          {'STYLE > '}
          <span className="style-selected-span">{'selected style'.toUpperCase()}</span>
        </strong>
        <ul className="style-list">
          {styles.map((style, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {style}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Checkout Options */}
      <div className="checkout">
        <select className="size">
          <option>SELECT SIZE</option>
          {/* add sizes */}
        </select>
        <select className="quantity">
          <option>1</option>
          <option>{/* add quantities */}</option>
        </select>
        <button className="checkout-button" type="button">ADD TO BAG</button>
        <button type="button" className="to-outfitter-button">⭐</button>
      </div>
    </section>
  );
}

export default Checkout;
