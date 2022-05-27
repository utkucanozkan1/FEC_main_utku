import React, { useState, useContext } from 'react';
import axios from 'axios';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView'
import { ProductIdContext } from '../index';

function RightArrow() {
  const { viewable, setViewable, position, setPosition, related } = useContext(ViewableContext);
  const { itemId } = useContext(ProductIdContext);
  const [end, setEnd] = useState(false);
  function scrollRight() {
    // if the list of ALL related products is greater than
    // what is currently viewed (including previous cards)
    console.log(related);
    if (related.length > viewable.length) {
      const nextId = related[position + 4];
      setPosition((prevPosition) => (prevPosition + 1));
      if (position + 4 === viewable.length) {
        setEnd(true);
      }
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
      { end ? '' : '>' }
    </CarouselButton>
  );
}

export default RightArrow;
