import React, { useState, useContext } from 'react';
import axios from 'axios';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView'
import { ProductIdContext } from '../index';

function RightArrow() {
  const { viewable, setViewable, position, setPosition, related, end, setEnd } = useContext(ViewableContext);
  const { itemId } = useContext(ProductIdContext);

  function scrollRight() {
    // if the list of ALL related products is greater than
    // what is currently viewed (including previous cards)
    console.log(related);
    console.log(position);
    console.log(viewable);
    console.log(end);

    setPosition((prevPosition) => (prevPosition + 1));
    if (position + 5 === related.length) {
      setEnd(true);
    }
    if (related.length > viewable.length) {
      const nextId = related[position + 4];
      axios.get(`/products/${nextId}`)
        .then((nextProduct) => {
          axios.get(`/products/${nextProduct.data.id}/styles`)
            .then((nextStyle) => {
              setViewable((prevViewable) => (
                [...prevViewable, Object.assign(nextProduct.data, nextStyle.data)]
              ));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('no more items');
    }
  }
  return (
    <CarouselButton onClick={scrollRight}>
      {console.log(related)}
      {console.log(position)}
      {console.log(viewable)}
      {console.log(end)}
      { end ? '' : '>' }
    </CarouselButton>
  );
}

export default RightArrow;
