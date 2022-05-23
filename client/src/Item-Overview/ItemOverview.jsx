/* eslint-disable import/extensions */
import React from 'react';

// Subcomponent imports
import Gallery from './subcomponents/Gallery.jsx';
import Checkout from './subcomponents/Checkout.jsx';

function ItemOverview() {
  return (
    <section className="item-overview-section">
      <Gallery />
      <Checkout />
    </section>
  );
}

export default ItemOverview;
