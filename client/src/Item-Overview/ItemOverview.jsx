/* eslint-disable no-loop-func */
/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../../config.js';
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
  const { itemId } = useContext(ProductIdContext);
  const headers = { headers: {
    Authorization: config.TOKEN,
  } };

  // "427 - too many requests" handler
  // let secondsLeft = 30;
  const reqErr427 = () => {
    // const errorEl = document.querySelector('.request-err');
    // errorEl.display = 'block';
    // const errorMsgEl = document.querySelector('.request-err-msg');
    // errorMsgEl.innerText = `Server request limit breached, please wait: ${secondsLeft}`;
    // console.log(secondsLeft);
    // secondsLeft -= 1;
    // errorEl.display = 'none';
    // secondsLeft = 30;
    alert('Too many requests: wait 30-60 seconds!');
  };

  useEffect(() => {
    axios.get(`/products/${itemId}`, headers)
      .then((itemData) => {
        axios.get(`/products/${itemId}/styles`, headers)
          .then((stylesRes) => {
            // Get rating info
            axios.get(`/reviews/${itemId}/reviewsMeta`, headers)
              .then((ratingsRes) => {
                const ratings = Object.entries(ratingsRes.data.ratings);
                const rating = getAverageRating(ratings);
                setItem({ ...itemData.data, rating });
                setStyles(stylesRes.data.results);
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

  // let reqCount = 0;
  // const mockGetClicker = (e) => {
  //   e.preventDefault();
  //   axios.get(`/products/${itemId}`, headers)
  //     .then(() => {
  //       axios.get(`/products/${itemId}/styles`, headers)
  //         .then(() => {
  //           // Get rating info
  //           axios.get(`/reviews/${itemId}/reviewsMeta`, headers)
  //             .then(() => {
  //               console.log(reqCount += 3);
  //             })
  //             .catch(() => {
  //               reqErr427();
  //             });
  //         })
  //         .catch(() => {
  //           reqErr427();
  //         });
  //     })
  //     .catch(() => {
  //       reqErr427();
  //     });
  // };

  if (!loading) {
    return (
      <>
        <section className="item-overview-section">
          {/* <button onClick={mockGetClicker} type="button">
            Make a Get request
          </button> */}
          <div className="request-err" style={{ display: 'none' }}>
            <p className="request-err-msg">Server request limit breached, please wait: </p>
          </div>
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
