/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
  // Clicker listener added?
  // const [clickerActive, setClickerActive] = useState(false);

  const [cart, setCart] = useState([]);

  // Handle shopping cart popup -> 0.8 Functional, with minor bugs
  const getShoppingCart = (e) => {
    e.preventDefault();
    const cartModal = document.querySelector('.cart-modal');
    if (cartModal.style.display === 'none') {
      cartModal.style.display = 'block';
    }
    axios.get(('/cart'))
      .then((res) => {
        // Conversion of object to array for setCart
        const responseObject = res.data;
        const newCart = Object.keys(responseObject).map((key) => {
          const product = {};
          product[key] = responseObject[key];
          return product;
        });
        setCart(newCart);
      })
      .catch();
  };
  // Delete item from shopping cart
  const cartDeleteProduct = (e) => {
    e.preventDefault();
    // Read the item name
    const name = e.target.getAttribute('data-name-pointer');
    axios.delete('/cart', { data: { name } })
      .then(() => {
        document.querySelector(`[data-name='${name}']`).style.display = 'none';
      })
      .catch((err) => {
        console.log('Failed to delete cart item:', name, err);
      });
  };
  // Fills up shopping cart modal with products
  const cartProducts = cart.map((product, i) => {
    const name = Object.keys(product)[0];
    const sizes = Object.entries(product[name]);
    const { thumbnail } = Object.values(product)[0];

    return (
      <div className="cart-product" data-name={name} key={i}>
        <div className="cart-product-header">
          <div className="cart-product-thumbnail-wrap">
            <div style={{ backgroundImage: `url('${thumbnail}')` }} className="cart-product-thumbnail" />
          </div>
          <span className="cart-name">{name}</span>
          <button className="cart-delete-button" type="button" data-name-pointer={name} onClick={cartDeleteProduct}>
            <i className="fa-solid fa-xmark" data-name-pointer={name} />
          </button>
        </div>
        <ul>
          {sizes.map((entry, j) => {
            const [size, quantity] = entry;
            if (size !== 'thumbnail') {
              return (
                <li key={j}>
                  <span className="cart-product-size">{`size${size}:`}</span>
                  <span className="cart-product-quantity">{`x${quantity}`}</span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  });

  // Timer for hiding checkout popup (addToOutfitter, addToCart)
  let checkoutPopupSeconds = 0;
  const hideCheckoutPopup = () => {
    setTimeout(() => {
      if (checkoutPopupSeconds > 6) {
        const popupEl = document.querySelector('.checkout-popup');
        popupEl.classList.remove('checkout-popup-display');
        checkoutPopupSeconds = 0;
        popupEl.style.color = 'white';
        // eslint-disable-next-line no-useless-return
        return;
      } else {
        checkoutPopupSeconds += 1;
        hideCheckoutPopup();
      }
    }, 1000);
  };

  // Reusable functions
  const reqErr429 = () => {
    const popupEl = document.querySelector('.checkout-popup');
    popupEl.innerText = 'Too many requests, try later!';
    popupEl.style.color = 'crimson';
    popupEl.classList.add('checkout-popup-display');
    hideCheckoutPopup();
  };
  // featchData was being reused by me until refactor,
  // I've left it in here for better UseEffect readability
  // and potenial reuse in the future.
  const fetchData = (id) => {
    // Get item info
    axios.get(`/products/${id}`)
      .then((itemRes) => {
        // Get styles info
        axios.get(`/products/${id}/styles`)
          .then((stylesRes) => {
            // Get rating info
            axios.get(`/reviews/${id}/reviewsMeta`)
              .then((ratingsRes) => {
                // Data object to pass to provider
                setData({
                  ...itemRes.data, ...stylesRes.data, ...ratingsRes.data, itemId: id, setItemId,
                });
                toogleLoading(false);
              })
              .catch((err) => {
                if (err.toJSON()?.status === 429) {
                  reqErr429();
                } else {
                  console.error(err);
                }
              });
          })
          .catch((err) => {
            if (err.toJSON()?.status === 429) {
              reqErr429();
            } else {
              console.error(err);
            }
          });
      })
      .catch((err) => {
        if (err.toJSON()?.status === 429) {
          reqErr429();
        } else {
          console.error(err);
        }
      });
  };

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

    const popupEl = document.querySelector('.checkout-popup');
    axios.post('/outfitter', starredItem)
      .then(() => {
        popupEl.innerText = 'Added to outfitter...';
        popupEl.classList.add('checkout-popup-display');
        hideCheckoutPopup();
        triggerOutfitterListener(new Date());
      })
      .catch((err) => {
        // TODO: if
        if (err.toJSON()?.status === 400) {
          popupEl.innerText = 'Item already in outfitter!';
          popupEl.style.color = 'crimson';
          popupEl.classList.add('checkout-popup-display');
          hideCheckoutPopup();
          console.log('--> 🚫Err: Outfit already exists in shoppingData.json!\nP.S. I 💛 My Little Pony 🥺\n');
        } else {
          console.error(err);
        }
      });
  };

  const switchProductPage = (e) => {
    e.preventDefault();
    const inputEl = document.querySelector('.search-itemId-input');
    const inputId = parseInt(inputEl.value.trim(), 10);
    if (!!inputId && inputId !== itemId) {
      axios.get(`/products/${inputId}`)
        .then(() => {
          // If Id is valid, spread the data to components
          setItemId(inputId);
        })
        .catch((err) => {
          if (err.toJSON()?.status === 404) {
            // TODO: replace with popup
            alert(`Item with the id ${inputId} was not found`);
          }
          console.log(err);
        });
    } else {
      inputEl.classList.add('search-itemId-input-err');
      inputEl.value = '';
      if (inputId === itemId) {
        inputEl.placeholder = 'Already Viewing Id';
      } else {
        inputEl.placeholder = 'Invalid Id';
      }
    }
  };

  let lastY = 0;
  useEffect(() => {
    fetchData(itemId);
    // header hide/show on scroll
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const initialHeight = window.innerHeight;
      const header = document.querySelector('.header');
      if (y <= initialHeight || y < lastY) {
        header.classList.remove('header-hide');
      } else if (y > lastY) {
        header.classList.add('header-hide');
      }
      lastY = y;
    });
    // Add clicker listener : unfinished
    // if (!clickerActive) {
    //   const clickListener = (e) => {
    //     e.preventDefault();
    //     const id = e.target.id;
    //     let className = '';
    //     for (let i = 0; i < e.target.classList.length; i += 1) {
    //       className += e.target.classList[i];
    //     }
    //     const clickMetaBody = { id, className, time: new Date() };
    //     console.log(clickMetaBody);
    //   };
    //   document.querySelector('#root').addEventListener('click', clickListener);
    //   setClickerActive(true);
    // }
  }, [itemId]);

  if (!loading) {
    return (
      <div className="main">
        <ProductIdContext.Provider value={
          {
            ...data, outfitterListener, triggerOutfitterListener, addToOutfitter, hideCheckoutPopup,
          }
          }
        >
          {/* Header */}
          <header>
            <div className="header">
              {/* Brand */}
              <h1>Atelier</h1>
              {/* Search bar/Website nav */}
              <div className="search-bar">
                <input
                  className="search-itemId-input"
                  type="text"
                  placeholder="Input ID..."
                  onKeyPress={(e) => {
                    e.target.classList.remove('search-itemId-input-err');
                    e.target.placeholder = 'Input ID...';
                    if (e.key === 'Enter') {
                      switchProductPage(e);
                    }
                  }}
                />
                <button id="search-itemId" type="button" onClick={switchProductPage}>
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
                <button type="button" onClick={getShoppingCart} className="cart-button">
                  <i className="fa-solid fa-cart-shopping" role="button" />
                </button>
              </div>
            </div>
          </header>

          {/* Shopping cart modal */}
          <div className="cart-modal" style={{ display: 'none' }}>
            <div className="cart-modal-content">
              {/* Modal Header */}
              <div className="cart-modal-header">
                <h3>
                  Shopping Cart
                </h3>
                {/* Close cart button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('.cart-modal').style.display = 'none';
                  }}
                >
                  <i className="fa-solid fa-xmark cart-modal-close" />
                </button>
              </div>

              <div className="cart-products">
                {cartProducts.map((product) => product)}
              </div>

              {/* Display session cookie */}
              <p style={{
                color: 'red',
                paddingTop: '1vw',
                fontSize: '24px',
              }}
              >
                {document.cookie}
              </p>
            </div>
          </div>

          {/* Widgets */}
          <ItemOverview />
          <RelatedOutfitView />
          <QuestionsAndAnswers />
          <RatingReviews />
        </ProductIdContext.Provider>
      </div>
    );
  } else {
    return (
      <section className="loading">
        <div className="loading-spinner"> </div>
      </section>
    );
  }
}

// render the root element with the provided component
root.render(<App />);
