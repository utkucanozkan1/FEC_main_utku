import React, { useState, useEffect, useContext } from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';
import StarRating from '../shared/StarRating';
import CardButton from './RIOC-styled-components/CardButton';
import CompareModal from './CompareModal';
import '../../dist/styles/styles-val.css';
import { CardProductContext } from './RelatedView';

export const ModalContext = React.createContext();

function RelatedCard({ cardRating }) {
  const { setItemId, product } = useContext(CardProductContext);
  const [modal, setModal] = useState(false);
  // const productImage = product ? product.results[0].photos[0].thumbnail_url
  //   : '../../dist/assets/images/placeholder.png';
  const productImage = product.results[0].photos[0].thumbnail_url
    ? product.results[0].photos[0].thumbnail_url
    : '../assets/Images/placeholder.png';

  function clickHanlder() {
    setItemId(product.id);
    document.documentElement.scrollTop = 0;
  }
  function modalHandler(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    setModal(!modal);
  }
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <div className="card" onClick={clickHanlder}>
        <div className="prodImg" style={{ backgroundImage: `url(${productImage})` }}>
          <CardButton type="button" onClick={modalHandler}>
            <i className="fa-star fa-star-fill-100" />
          </CardButton>
        </div>
        <p>{product.category}</p>
        <h6>{product.name}</h6>
        {product.results[0].sale_price
          ? (
            <p style={{ color: 'red' }}>
              {product.results[0].sale_price}
              &nbsp;&nbsp;
              <strike style={{ color: 'black' }}>{product.default_price}</strike>
            </p>
          )
          : <p>{product.default_price}</p>}
        {cardRating ? <StarRating rating={cardRating} className="relatedStars" /> : <> </>}
      </div>
      {modal ? <CompareModal /> : <> </>}
    </ModalContext.Provider>
  );
}

export default RelatedCard;
