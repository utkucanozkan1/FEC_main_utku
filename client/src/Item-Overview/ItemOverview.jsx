/* eslint-disable no-loop-func */
/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import getAverageRating from '../../../server/utils/helpers.js';

// Subcomponent/Context imports
import mockData from './mockData.json';
import mockStyles from './mockStyles.json';
import Gallery from './subcomponents/Gallery.jsx';
import Checkout from './subcomponents/Checkout.jsx';
import { ProductIdContext } from '../index.jsx';

function ItemOverview() {
  // Toogle - A lil boy who thinks he knows everything about anything. But know not a lot.
  const [loading, toogleLoading] = useState(true);

  const [item, setItem] = useState(mockData);
  const [styles, setStyles] = useState(mockStyles);
  const [styleIndex, setStyleIndex] = useState(0);

  // Feed live data
  const dataContext = useContext(ProductIdContext);

  useEffect(() => {
    const rating = getAverageRating(Object.entries(dataContext.ratings));
    setItem({ ...dataContext, rating });
    setStyles(dataContext.results);
    toogleLoading(false);
  }, [dataContext.itemId]);

  if (!loading) {
    return (
      <>
        <section className="item-overview-section">
          <div className="request-err" style={{ display: 'none' }}>
            <p className="request-err-msg">Server request limit breached, please wait: </p>
          </div>
          <Gallery data={{ item, styles, styleIndex }} />
          <Checkout data={{ item, styles, styleIndex, setStyleIndex }} />
        </section>
        <section className="description-subsection">
          <div className="description">
            <h5 className="slogan">{item.slogan}</h5>
            <p className="description-text">{item.description}</p>
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
      <section className="item-overview-section loading">
        <div>Loading...</div>
      </section>
    );
  }
}

export default ItemOverview;
