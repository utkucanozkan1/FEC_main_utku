import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView';

function RightArrow() {
  const {
    viewable, setViewable, position, setPosition,
    related, end, setEnd,
  } = useContext(ViewableContext);

  function getNextItem() {
    console.log('getting next Item at position:', position);
    console.log(related);
    const nextId = related[position + 3];
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
  }

  useEffect(() => {
    if (related) {
      if (position + 4 >= related.length && related.length > 0) {
        setEnd(true);
      }
      if (related.length > viewable.length && position + 3 === viewable.length) {
        getNextItem();
      }
    }
  }, [position]);

  return (
    <CarouselButton onClick={scrollRight}>
      { end ? '' : '>' }
    </CarouselButton>
  );
}

export default RightArrow;
