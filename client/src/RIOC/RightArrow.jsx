import React, { useContext } from 'react';
import axios from 'axios';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView';

function RightArrow() {
  const { viewable, setViewable, position, setPosition, related, end, setEnd } = useContext(ViewableContext);

  function getNextItem() {
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
  }

  function scrollRight() {
    // if the list of ALL related products is greater than
    // what is currently viewed (including previous cards)
    setPosition((prevPosition) => (prevPosition + 1));
    if (position + 5 === related.length) {
      setEnd(true);
    }
    if (related.length > viewable.length && position === viewable.length) {
      getNextItem();
    }
  }
  return (
    <CarouselButton onClick={scrollRight}>
      { end ? '' : '>' }
    </CarouselButton>
  );
}

export default RightArrow;
