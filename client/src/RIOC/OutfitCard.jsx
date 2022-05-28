import React, { useContext } from 'react';
import axios from 'axios';
import StarRating from '../shared/StarRating';
import CardDiv from './RIOC-styled-components/CardDiv';
import CardButton from './RIOC-styled-components/CardButton';
import { OutfitContext } from './OutfitView';
import { ProductIdContext } from '../index';

function OutfitCard({card}) {
  const { outfit, setOutfit } = useContext(OutfitContext);
  const { setItemId } = useContext(ProductIdContext);

  function clickHanlder() {
    setItemId(card.productId);
  }

  function deleteCard(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    axios.delete('/outfitter', {
      data: {
        productId: card.productId,
        cards: outfit,
      },
    })
      .then(() => {
        axios.get('/outfitter')
          .then((outfitItems) => {
            setOutfit(outfitItems.data);
          });
      });
  }

  return (
    <CardDiv onClick={clickHanlder}>
      <div className="prodImg" style={{ backgroundImage: `url(${card.imageUrl})` }}>
        <CardButton type="button" onClick={deleteCard}>X</CardButton>
      </div>
      <p>{card.category}</p>
      <h6>{card.title}</h6>
      <p>{card.original_price}</p>
      <StarRating rating={card.rating} className="relatedStars" />
    </CardDiv>
  );
}

export default OutfitCard;
