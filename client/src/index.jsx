/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Major component imports
import { createRoot } from 'react-dom/client';
import ItemOverview from './Item-Overview/ItemOverview';
import RelatedOutfitView from './RIOC/RelatedOutfitView';
import QuestionsAndAnswers from './q-a/QuestionAndAnswers';
import RatingReviews from './Ratings-Reviews/RRcomponents/RRapp';
import getAverageRating from '../../server/utils/helpers';

const root = createRoot(document.getElementById('root'));

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

// Initial req count: 27 -> 22, 19% cutdown

function App() {
  // Read id from url
  const [loading, toogleLoading] = useState(true);
  const [itemId, setItemId] = useState(37316);
  // Data object to pass to provider
  const [data, setData] = useState({});
  const [outfitterListener, triggerOutfitterListener] = useState('🍕');

  // Add item to outfitter
  const addToOutfitter = (e) => {
    e.preventDefault();
    // Props to add to new outfitter item
    const {
      category, name: title, default_price: original_price,
      id: productId, results: styles,
    } = data;
    const rating = getAverageRating(Object.entries(data.ratings));
    // TODO -> replace '' with placeholder image
    let imageUrl = styles[0]?.photos[0]?.thumbnail_url || '../dist/assets/images/placeholder.png';
    let sale_price = styles[0]?.sale_price;
    for (let i = 0; i < styles.length; i += 1) {
      if (styles[i]['default?'] && styles[i]?.photos[0]?.thumbnail_url) {
        imageUrl = styles[i].photos[0].thumbnail_url;
        sale_price = styles[i]?.sale_price;
      }
    }
    const starredItem = {
      productId, title, category, original_price, sale_price, rating, imageUrl,
    };
    axios.post('/outfitter', starredItem)
      .then(() => {
        triggerOutfitterListener(new Date());
      })
      .catch((err) => {
        // TODO: if
        if (err.toJSON()?.status === 400) {
          console.log('--> 🚫Err: Outfit already exists in outfitter.json!\nP.S. I 💛 My Little Pony 🥺\n');
        } else {
          console.error(err);
        }
      });
  };

  const reqErr427 = () => {
    alert('Request overload😱: wait 30-60 seconds!\nP.S. I blame the API...');
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
        <ProductIdContext.Provider value={
          {
            ...data, outfitterListener, triggerOutfitterListener, addToOutfitter,
          }
          }
        >
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
