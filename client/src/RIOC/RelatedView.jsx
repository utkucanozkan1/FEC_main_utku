import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import RelatedCard from './RelatedCard';
import CardContainer from './RIOC-styled-components/CardContainer';
import config from '../../../config';
import getAverageRating from '../../../server/utils/helpers';

function RelatedView() {
  const [products, setProducts] = useState([]);
  const [productStyles, setStyles] = useState([]);
  const [productRatings, setRatings] = useState([]);
  function getStyles(id) {
    return axios.get(`/products/${id}/styles`);
  }
  function getRatings(id) {
    return axios.get(`/reviews/${id}/reviewsMeta`);
  }

  function getRelatedProducts(id) {
    return axios.get(`/products/${id}`);
  }

  useEffect(() => {
    axios.get(`/related/${37311}`)
      .then((relatedIds) => {
        const relatedPromises = relatedIds.data.map((id) => (
          axios.get(`/products/${id}`)
        ));
        Promise.all(relatedPromises)
          .then((relatedProducts) => {
            setProducts(relatedProducts.map((product) => (
              product.data
            )));
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const stylesPromises = products.map((product) => (
      axios.get(`/products/${product.id}/styles`)
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
      axios.get(`/reviews/${product.id}/reviewsMeta`)
    ));
    Promise.all(ratingsPromises)
      .then((allProducts) => {
        setRatings(allProducts.map((ratedProduct) => {
          const ratingCounts = Object.entries(ratedProduct.data.ratings);
          return getAverageRating(ratingCounts);
        }));
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
