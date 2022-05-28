/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import getAverageRating from '../../server/utils/helpers';

// Major component imports
import { createRoot } from 'react-dom/client';
import ItemOverview from './Item-Overview/ItemOverview';
import RelatedOutfitView from './RIOC/RelatedOutfitView';
import QuestionsAndAnswers from './q-a/QuestionAndAnswers';
import RatingReviews from './Ratings-Reviews/RRcomponents/RRapp';

// create the root of the app by selection where the app should be mounted in the dom
const root = createRoot(document.getElementById('root'));

// eslint-disable-next-line import/prefer-default-export
export const ProductIdContext = React.createContext('default');
// Scum😎 -> /products/${itemId}: all, /products/${itemId}/styles: all, /reviews/${itemId}/reviewsMeta: ratings array
// Utz🦃 -> /qa/questions?product_id=${itemId}&count=100 , qa/questions/${questionId}/answers
// The Amazing Camera-Man🦸‍♂️ -> /reviews/${itemId}/reviewsMeta, /reviews/
// Mr Pizzo🍕 -> From /related/${itemId}: all data, From:  /product/${itemId}: name, category, features,
// price From /product/${itemId}/styles: sale price. From /reviews/${itemId}/reviewMeta: average rating

// Individual component use counts
// /products/${itemId}: 2
// /products/${itemId}/styles: 2
// /reviews/${itemId}/reviewsMeta: 2

// Initial req count: 27

function App() {
  // Read id from url
  const [loading, toogleLoading] = useState(true);
  const [itemId, setItemId] = useState(37316);
  // Data object to pass to provider
  const [data, setData] = useState({});
  const [outfitterListener, triggerOutfitterListener] = useState('🍕');

  const reqErr427 = () => {
    alert('Too many requests: wait 30-60 seconds!');
  };

  useEffect(() => {
    // Get item info
    axios.get(`/products/${itemId}`)
      .then((itemRes) => {
        // Get styles info
        axios.get(`/products/${itemId}/styles`)
          .then((stylesRes) => {
            // Get rating info
            axios.get(`/reviews/${itemId}/reviewsMeta`)
              .then((ratingsRes) => {
                // Data object to pass to provider
                setData({
                  ...itemRes.data, ...stylesRes.data, ...ratingsRes.data, itemId, setItemId,
                });
                toogleLoading(false);
              })
              .catch(() => {
                reqErr427();
              });
          })
          .catch(() => {
            reqErr427();
          });
      })
      .catch(() => {
        reqErr427();
      });
  }, [itemId]);

  if (!loading) {
    return (
      <div>
        <ProductIdContext.Provider value={{ ...data, outfitterListener, triggerOutfitterListener }}>
          <ItemOverview />
          <RelatedOutfitView />
          <QuestionsAndAnswers />
          <RatingReviews />
        </ProductIdContext.Provider>
      </div>
    );
  } else {
    return (
      <section className="item-overview-section">
        <div>Loading...</div>
      </section>
    );
  }
}

// render the root element with the provided component
root.render(<App />);
