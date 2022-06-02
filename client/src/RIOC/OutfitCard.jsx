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
    document.documentElement.scrollTop = 0;
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
    <div className="card" onClick={clickHanlder}>
      <div className="prodImg" style={{ backgroundImage: `url(${card.imageUrl})` }}>
        <CardButton type="button" onClick={deleteCard}>X</CardButton>
      </div>
      <p>{card.category}</p>
      <h6>{card.title}</h6>
      {card.sale_price
        ? (
          <p style={{ color: 'red' }}>
            {card.sale_price}
            &nbsp;&nbsp;
            <strike style={{ color: 'black' }}>{card.original_price}</strike>
          </p>
        )
        : <p>{card.original_price}</p>}
      {card.rating ? <StarRating rating={card.rating} className="relatedStars" /> : <> </>}
    </div>
  );
}

export default OutfitCard;
