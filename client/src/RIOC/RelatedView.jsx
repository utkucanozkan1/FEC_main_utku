import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import RelatedCard from './RelatedCard';
import CardContainer from './RIOC-styled-components/CardContainer';
import config from '../../../config';

const fakeArray = [1, 2, 3, 4, 5, 6];

function RelatedView() {
  const [products, setProducts] = useState(fakeArray);
  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', {
      headers: {
        Authorization: config.TOKEN,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        setProducts(prevProducts => data.data);
        // console.log(products);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div>
      <h6>RELATED PRODUCTS</h6>
      <CardContainer>
        <LeftArrow />
        {products.map((product, i) => (
          <RelatedCard key={fakeArray[i]} cardNum={product.name} />
        ))}
        <RightArrow />
      </CardContainer>
    </div>
  );
}

export default RelatedView;
