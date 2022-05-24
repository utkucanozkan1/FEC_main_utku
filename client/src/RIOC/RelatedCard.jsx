import React, { useState, useEffect, useContext } from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';
import StarRating from '../shared/StarRating';
import ModalButton from './RIOC-styled-components/ModalButton';
import CompareModal from './CompareModal';
import '../../dist/styles/styles-val.css';

export const ModalContext = React.createContext();

function RelatedCard({ cardProduct, cardStyle, cardRating }) {
  const [modal, setModal] = useState(false);
  const productImage = cardStyle ? cardStyle.results[0].photos[0].thumbnail_url : '';
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <CardDiv onClick={() => { console.log('Should go to product page'); }}>
        <div className="prodImg" style={{ backgroundImage: `url(${productImage})` }}>
          <ModalButton type="button" onClick={() => { setModal(!modal); console.log(modal); }}>⭐️</ModalButton>
        </div>
        {modal ? <CompareModal /> : <> </>}
        <p>{cardProduct.category}</p>
        <h6>{cardProduct.name}</h6>
        <p>{cardProduct.default_price}</p>
        <StarRating rating={cardRating} />
      </CardDiv>
    </ModalContext.Provider>
  );
}

export default RelatedCard;
