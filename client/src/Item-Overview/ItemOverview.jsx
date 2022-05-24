/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Subcomponent imports
import mockData from './mockData.json';
import mockStyles from './mockStyles.json';
import Gallery from './subcomponents/Gallery.jsx';
import Checkout from './subcomponents/Checkout.jsx';

// TODO: Replace with live data

// On top level id change -> rerender whole

function ItemOverview() {
  const [item, setItem] = useState(mockData);
  const [styles, setStyles] = useState(mockStyles);
  const [styleIndex, setStyleIndex] = useState(0);

  // Feed live data(TODO: read id from props)
  useEffect(() => {
    const itemUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37313/';
    axios.get(itemUrl, { headers: {
      Authorization: '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',
    } })
      .then((itemData) => {
        axios.get(`${itemUrl}styles`, { headers: {
          Authorization: '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',
        } })
          .then((stylesRes) => {
            setItem({ ...itemData.data });
            setStyles(stylesRes.data.results);
          });
      });
  }, []);

  return (
    <section className="item-overview-section">
      <Gallery data={{ item, styles, styleIndex }} />
      <Checkout data={{ item, styles, styleIndex, setStyleIndex }} />
    </section>
  );
}

export default ItemOverview;
