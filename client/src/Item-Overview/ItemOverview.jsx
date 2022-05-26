/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../../config.js';

// Subcomponent/Context imports
import mockData from './mockData.json';
import mockStyles from './mockStyles.json';
import Gallery from './subcomponents/Gallery.jsx';
import Checkout from './subcomponents/Checkout.jsx';
import { ProductIdContext } from '../index.jsx';

// On top level id change -> rerender whole

function ItemOverview() {
  const [loading, toogleLoading] = useState(true);

  const [item, setItem] = useState(mockData);
  const [styles, setStyles] = useState(mockStyles);
  const [styleIndex, setStyleIndex] = useState(0);

  const { itemId } = useContext(ProductIdContext);
  // Feed live data(TODO: read id from props)
  useEffect(() => {
    axios.get(`/products/${itemId}`, { headers: {
      Authorization: config.TOKEN,
    } })
      .then((itemData) => {
        axios.get(`/products/${itemId}/styles`, { headers: {
          Authorization: config.TOKEN,
        } })
          .then((stylesRes) => {
            // Get rating info
            axios.get(`/reviews/${itemId}/reviewsMeta`, { headers: {
              Authorization: config.TOKEN,
            } })
              .then((ratingsRes) => {
                const { ratings } = ratingsRes.data;
                let sum = 0;
                let amount = 0;
                const stars = Object.keys(ratings);
                for (let i = 0; i < stars.length; i += 1) {
                  sum += ratings[stars[i]] * stars[i];
                  amount += parseInt(ratings[stars[i]], 10);
                }
                setItem({ ...itemData.data, rating: sum / amount });
                setStyles(stylesRes.data.results);
                toogleLoading(false);
              });
          });
      });
  }, [itemId]);

  if (!loading) {
    return (
      <>
        <section className="item-overview-section">
          <Gallery data={{ item, styles, styleIndex }} />
          <Checkout data={{ item, styles, styleIndex, setStyleIndex }} />
        </section>
        <section className="description-subsection">
          <div className="description">
            <h5>{item.slogan}</h5>
            <p>{item.description}</p>
          </div>
          <div className="features">
            <ul>
              {item.features.map((feature) => <li key={feature.value}>{feature.value}</li>)}
            </ul>
          </div>
        </section>
      </>
    );
  // eslint-disable-next-line no-else-return
  } else {
    return (
      <section className="item-overview-section">
        <div>Loading...</div>
      </section>
    );
  }
}

export default ItemOverview;
