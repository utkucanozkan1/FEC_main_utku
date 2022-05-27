import React, { useContext } from 'react';
import StarRating from '../shared/StarRating';
import CardDiv from './RIOC-styled-components/CardDiv';
import CardButton from './RIOC-styled-components/CardButton';
import { OutfitContext } from './OutfitView';

function OutfitCard({card}) {
  const { outfit, setOutfit } = useContext(OutfitContext);
  return (
    <CardDiv onClick={() => { console.log('Should go to product page'); }}>
      <div className="prodImg" style={{ backgroundImage: `url(${card.imageUrl})` }}>
        <CardButton type="button" onClick={() => { console.log('should delete outfit'); }}>X</CardButton>
      </div>
      <p>{card.category}</p>
      <h6>{card.title}</h6>
      <p>{card.original_price}</p>
      <StarRating rating={card.rating} className="relatedStars" />
    </CardDiv>
  );
}

export default OutfitCard;
