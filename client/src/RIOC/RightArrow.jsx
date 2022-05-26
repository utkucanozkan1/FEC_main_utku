import React, { useContext } from 'react';
import axios from 'axios';
import CarouselButton from './RIOC-styled-components/CarouselButtons';
import { ViewableContext } from './RelatedView'
import { ProductIdContext } from '../index';

function RightArrow() {
  const { viewable, setViewable } = useContext(ViewableContext);
  const { itemId } = useContext(ProductIdContext);
  function scrollRight() {
    axios.get(`/related/${itemId}`)
      .then((relatedIds) => {
        // if the list of ALL related products is greater than
        // what is currently viewed (including previous cards)
        if (relatedIds.data.length > viewable.length) {

        }

        const nextId = relatedIds.data[viewable.length];
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CarouselButton onClick={scrollRight}>
      &#62;
    </CarouselButton>
  );
}

export default RightArrow;
