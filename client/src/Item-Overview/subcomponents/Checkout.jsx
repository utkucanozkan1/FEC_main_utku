/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
import React, { useState, useContext } from 'react';
import axios from 'axios';

// Subcomponent/Context imports
import StarRating from '../../shared/StarRating.jsx';
import { ProductIdContext } from '../../index.jsx';

function Checkout(props) {
  const {
    item, styles, styleIndex, setStyleIndex,
  } = { ...props }.data;

  const { outfitterListener, addToOutfitter } = useContext(ProductIdContext);
  // Fill style thumbnails
  const styleThumbs = styles.map((dataStyle, index) => {
    const classList = index !== styleIndex
      ? 'style-thumbnail' : 'style-thumbnail style-thumbnail-selected';

    return (
      <li>
        <button className={classList} style={{ backgroundImage: `url(${dataStyle.photos[0].thumbnail_url})` }} data-index={index} type="button"> </button>
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
      document.querySelector('.style-thumbnail-selected')
        .classList.remove('style-thumbnail-selected');
      e.target.classList.add('style-thumbnail-selected');
      setStyleIndex(e.target.getAttribute('data-index' || 0));
      setQuantityOptions([]);
      document.querySelector('.size').value = 'SELECT SIZE';
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
  // const addToOutfitter = (e) => {
  //   e.preventDefault();
  //   console.log(item);
  //   // Props to add to new outfitter item
  //   const {
  //     category, name: title, default_price: original_price, rating,
  //   } = item;
  //   let imageUrl = styles[0]?.photos[0]?.thumbnail_url || '';
  //   let sale_price = styles[0]?.sale_price;
  //   for (let i = 0; i < styles.length; i += 1) {
  //     if (styles[i]['default?'] && styles[i]?.photos[0]?.thumbnail_url) {
  //       imageUrl = styles[i].photos[0].thumbnail_url;
  //       sale_price = styles[i]?.sale_price;
  //     }
  //   }
  //   const starred = {
  //     productId: item.id, title, category, original_price, sale_price, rating, imageUrl,
  //   };
  //   axios.post('/outfitter', starred)
  //     .then(() => {
  //       triggerOutfitterListener(new Date());
  //     })
  //     .catch((err) => {
  //       // TODO: 427 if
  //       console.log('--> 🚫Err: Outfit already exists in outfitter.json!\nP.S. I 💛 My Little Pony 🥺\n');
  //       console.log(err);
  //     });
  // };

  return (
    <section className="checkout-section">
      {/* Rating and Title */}
      { console.log(outfitterListener) }
      <div className="rating-title">
        <div className="reviews-wrapper">
          <StarRating rating={item.rating} className="checkout-star-rating" />
          <a href="https://www.google.com/" className="reviews-link" target="_blank" rel="noreferrer">
            Read all reviews
          </a>
        </div>
        <p className="category">{item.category.toUpperCase()}</p>
        <h2 className="category-title">{item.name}</h2>
        <p className="price">{`$${Math.round(styles[styleIndex].original_price)}`}</p>
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
        <select className="size" onChange={sizeChange} defaultValue="SELECT SIZE">
          <option disabled>SELECT SIZE</option>
          {sizeOptions.map((size, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {size}
            </React.Fragment>
          ))}
        </select>
        <select className="quantity">
          <option>0</option>
          {quantityOptions.map((quantity, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {quantity}
            </React.Fragment>
          ))}
        </select>
        <button className="checkout-button" type="button">ADD TO BAG</button>
        <button type="button" className="outfitter-add-button" onClick={addToOutfitter}>⭐</button>
      </div>
    </section>
  );
}

export default Checkout;
