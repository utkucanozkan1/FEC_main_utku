import React from 'react';
import CardDiv from './RIOC-styled-components/CardDiv';
import StarRating from '../shared/StarRating';
import ModalButton from './RIOC-styled-components/ModalButton';
import '../../dist/styles/styles-val.css';

function RelatedCard({ cardProduct, cardStyle, cardRating }) {
  const productImage = cardStyle ? cardStyle.results[0].photos[0].thumbnail_url : '';
  return (
    <CardDiv onClick={() => { console.log('Should go to product page'); }}>
      <div className="prodImg" style={{ backgroundImage: `url(${productImage})` }}>
        <ModalButton type="button">⭐️</ModalButton>
      </div>
      <p>{cardProduct.category}</p>
      <h6>{cardProduct.name}</h6>
      <p>{cardProduct.default_price}</p>
      <StarRating rating={cardRating} />
    </CardDiv>
  );
}

export default RelatedCard;
