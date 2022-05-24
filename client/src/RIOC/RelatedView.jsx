import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import RelatedCard from './RelatedCard';
import CardContainer from './RIOC-styled-components/CardContainer';
import config from '../../../config';
import getAverageRating from '../../../server/helpers';

function RelatedView() {
  const [products, setProducts] = useState([]);
  const [productStyles, setStyles] = useState([]);
  const [productRatings, setRatings] = useState([]);
  function getStyles(id) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/styles`, {
      headers: {
        Authorization: config.TOKEN,
        'Content-Type': 'application/json',
      },
    });
  }
  function getRatings(id) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews?product_id=${id}`, {
      headers: {
        Authorization: config.TOKEN,
        'Content-Type': 'application/json',
      },
    });
  }
  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', {
      headers: {
        Authorization: config.TOKEN,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        setProducts(prevProducts => data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const stylesPromises = products.map((product) => (
      getStyles(product.id)
    ));
    Promise.all(stylesPromises)
      .then((data) => {
        setStyles(data.map((style) => (
          style.data
        )));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products]);

  useEffect(() => {
    const ratingsPromises = products.map((product) => (
      getRatings(product.id)
    ));
    Promise.all(ratingsPromises)
      .then((data) => {
        setRatings(data.map((ratedProduct) => (
          getAverageRating(ratedProduct.data.results.map((review) => (
            review.rating
          )))
        )));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products]);
  return (
    <section>
      <h6>RELATED PRODUCTS</h6>
      <CardContainer>
        <LeftArrow />
        {products.map((product, i) => (
          <RelatedCard key={product.id} cardProduct={product} cardStyle={productStyles[i]} cardRating={productRatings[i]} />
        ))}
        <RightArrow />
      </CardContainer>
    </section>
  );
}

export default RelatedView;
