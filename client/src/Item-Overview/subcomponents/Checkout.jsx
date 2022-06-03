/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

// Subcomponent/Context imports
import StarRating from '../../shared/StarRating.jsx';
import { ProductIdContext } from '../../index.jsx';

function Checkout(props) {
  const {
    item, styles, styleIndex, setStyleIndex,
  } = { ...props }.data;

  const {
    addToOutfitter, itemId, hideCheckoutPopup, ratings,
  } = useContext(ProductIdContext);

  const ratingsAmount = Object.values(ratings)
    .reduce((prev, curr) => parseInt(prev, 10) + parseInt(curr, 10), 0);

  // Fill style thumbnails
  const styleThumbs = styles.map((dataStyle, index) => {
    const classList = index !== styleIndex
      ? 'style-thumbnail' : 'style-thumbnail style-thumbnail-selected';

    // Replace with placeholder, if image doesn't exist
    let thumbnailUrl = dataStyle.photos[index]?.thumbnail_url ? dataStyle.photos[index]?.thumbnail_url : '';
    if (thumbnailUrl.length > 0 && thumbnailUrl[0] !== 'h') {
      thumbnailUrl = thumbnailUrl.substring(1, thumbnailUrl.length);
    } else if (thumbnailUrl === '' || !thumbnailUrl) {
      thumbnailUrl = '../../assets/Images/placeholder.png';
    }

    return (
      <li>
        <button className={classList} style={{ backgroundImage: `url('${thumbnailUrl}')` }} data-index={index} type="button"> </button>
      </li>
    );
  }) || [];
  // Fill size options for current style
  const sizeOptions = Object.entries(styles[styleIndex].skus).map(([sku, data]) => (
    <option data-sku={sku}>
      {data.size}
    </option>
  )) || [];
  // Define quantity options
  const [quantityOptions, setQuantityOptions] = useState([]);

  // Event Handlers
  const styleChange = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('style-thumbnail')) {
      // Reassign selected style
      const index = e.target.getAttribute('data-index' || 0);
      document.querySelector('.style-thumbnail-selected')
        .classList.remove('style-thumbnail-selected');
      e.target.classList.add('style-thumbnail-selected');
      setStyleIndex(index);
      setQuantityOptions([]);
      document.querySelector('.size').value = 'SELECT SIZE';
      document.querySelector('.quantity').value = '0';
    }
  };
  const sizeChange = (e) => {
    e.preventDefault();
    const sku = e.target.options[e.target.selectedIndex].getAttribute('data-sku');
    const quantityAvailable = styles[styleIndex].skus[sku]?.quantity;
    const newQuantityOptions = [];
    for (let i = 1; i <= quantityAvailable; i += 1) {
      newQuantityOptions.push(<option>{i}</option>);
    }
    document.querySelector('.quantity').value = 0;
    setQuantityOptions(newQuantityOptions);
  };
  const addToCart = (e) => {
    e.preventDefault();
    const sizeEl = document.querySelector('.size');
    const size = sizeEl.value.trim();
    const quantityEl = document.querySelector('.quantity');
    const quantity = parseInt(quantityEl.value.trim(), 10);
    if (size === 'SELECT SIZE' || quantity === 0) {
      // If size or quantity are not selected, warn the user
      if (size === 'SELECT SIZE') {
        sizeEl.classList.add('select-error');
      }
      if (quantity === 0) {
        quantityEl.classList.add('select-error');
      }
    } else {
      // If valid data is collected, attempt to update shopping cart
      axios.post('/cart', {
        name: item.name,
        thumbnail: styles[0].photos[0].thumbnail_url || styles[0].photos[0].url,
        size,
        quantity,
      })
        .then(() => {
          // Display success popup
          const popupEl = document.querySelector('.checkout-popup');
          popupEl.innerText = 'Added to cart...';
          popupEl.classList.add('checkout-popup-display');
          hideCheckoutPopup();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Scroll to reviews
  const scrollToReviews = (e) => {
    e.preventDefault();
    const reviewsEl = document.querySelector('#reviews');
    const { top, left } = reviewsEl.getBoundingClientRect();

    window.scroll({ top, left, behavior: 'smooth' });
  };

  useEffect(() => {
    // Reset selected style to be the first style
    document.querySelector('.style-thumbnail-selected')
      .classList.remove('style-thumbnail-selected');
    document.querySelectorAll('.style-thumbnail')[0]
      .classList.add('style-thumbnail-selected');
    setStyleIndex(0);
  }, [itemId]);

  console.log(styles[styleIndex]);

  return (
    <section className="checkout-section">
      <p className="checkout-popup">Added to cart...</p>
      {/* Rating and Title */}
      <div className="rating-title">
        {/* Conditional rewiews link */}
        { ratingsAmount > 0 ? (
          <div className="reviews-wrapper">
            <StarRating rating={item.rating} className="checkout-star-rating" />
            <a href="#reviews" className="reviews-link" onClick={scrollToReviews}>
              {`Read all ${ratingsAmount} reviews`}
            </a>
          </div>
        ) : ''}
        <p className="category">{item.category.toUpperCase()}</p>
        <h2 className="category-title">{item.name}</h2>
        {/* Price +- Sale */}
        {styles[styleIndex].sale_price === null || styles[styleIndex].sale_price === undefined
          ? <p className="price">{`$${Math.round(styles[styleIndex].original_price)}`}</p>
          : (
            <>
              <span className="sale-price">{`$${Math.round(styles[styleIndex].sale_price)} `}</span>
              <span className="price price-cross-out">
                {`${Math.round(styles[styleIndex].original_price)}`}
              </span>
            </>
          )}
      </div>

      {/* Style */}
      <div className="style">
        <strong>
          {'STYLE > '}
          <span className="style-selected-span">{styles[styleIndex].name.toUpperCase()}</span>
        </strong>
        <ul className="style-list" onClick={styleChange}>
          {styleThumbs.map((style, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {style}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Checkout Options */}
      <div className="checkout">
        <select className="size" onChange={sizeChange} defaultValue="SELECT SIZE" onClick={(e) => e.target.classList.remove('select-error')}>
          <option disabled>SELECT SIZE</option>
          {sizeOptions.map((size, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {size}
            </React.Fragment>
          ))}
        </select>
        <i className="fa-solid fa-caret-down select-icon select-icon-quantity" />
        <select className="quantity" defaultValue="0" onClick={(e) => e.target.classList.remove('select-error')}>
          <option disabled>0</option>
          {quantityOptions.map((quantity, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {quantity}
            </React.Fragment>
          ))}
        </select>
        <i className="fa-solid fa-caret-down select-icon select-icon-size" />

        <button className="checkout-button" type="button" onClick={addToCart}>ADD TO BAG</button>
        <button type="button" className="outfitter-add-button" onClick={addToOutfitter}>
          <i className="fa-solid fa-heart" />
        </button>
      </div>
    </section>
  );
}

export default Checkout;
