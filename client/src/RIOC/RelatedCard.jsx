import React, { useState, useEffect, useContext } from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';
import StarRating from '../shared/StarRating';
import ModalButton from './RIOC-styled-components/ModalButton';
import CompareModal from './CompareModal';
import '../../dist/styles/styles-val.css';
import { CardProductContext } from './RelatedView';
import axios from 'axios';

export const ModalContext = React.createContext();

function RelatedCard({ cardStyle, cardRating }) {
  const { itemId, setItemId, product } = useContext(CardProductContext);
  const [modal, setModal] = useState(false);
  const productImage = cardStyle ? cardStyle.results[0].photos[0].thumbnail_url : '';

  function clickHanlder() {
    // Move to a new page with a specified id instead
    // window.location.replace(`/${product.id}`);
    setItemId(product.id);
  }
  function modalHandler(event) {
    event.stopPropagation();
    setModal(!modal);
  }
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <CardDiv onClick={clickHanlder}>
        <div className="prodImg" style={{ backgroundImage: `url(${productImage})` }}>
          <ModalButton type="button" onClick={modalHandler}>⭐️</ModalButton>
        </div>
        {modal ? <CompareModal /> : <> </>}
        <p>{product.category}</p>
        <h6>{product.name}</h6>
        <p>{product.default_price}</p>
        <StarRating rating={cardRating} className="relatedStars" />
      </CardDiv>
    </ModalContext.Provider>
  );
}

export default RelatedCard;
