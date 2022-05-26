import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import RelatedCard from './RelatedCard';
import CardContainer from './RIOC-styled-components/CardContainer';
import getAverageRating from '../../../server/utils/helpers';
import { ProductIdContext } from '../index';

export const ViewableContext = React.createContext('default');
export const CardProductContext = React.createContext();

function RelatedView() {
  const { itemId, setItemId } = useContext(ProductIdContext);
  const [loading, toogleLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productStyles, setStyles] = useState([]);
  const [productRatings, setRatings] = useState([]);
  const [viewable, setViewable] = useState([]);

  useEffect(() => {
    axios.get(`/related/${itemId}`)
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
  }, [itemId]);

  useEffect(() => {
    setViewable(products.slice(0, 4));
    const stylesPromises = products.map((product) => (
      axios.get(`/products/${product.id}/styles`)
    ));
    Promise.all(stylesPromises)
      .then((data) => {
        setStyles(data.map((style) => (
          style.data
        )));
        toogleLoading(false);
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

  if (!loading) {
    return (
      <section>
        <h6>RELATED PRODUCTS</h6>
        <CardContainer>
          <ViewableContext.Provider value={{ products, viewable, setViewable }}>
            <LeftArrow />
            {viewable.map((product, i) => (
              <CardProductContext.Provider value={{ viewable, itemId, setItemId, product }}>
                <RelatedCard key={product.id} cardStyle={productStyles[i]} cardRating={productRatings[i]} />
              </CardProductContext.Provider>
            ))}
            <RightArrow />
          </ViewableContext.Provider>
        </CardContainer>
      </section>
    );
  } else {
    return (
      <section>
        <div>Loading...</div>
      </section>
    );
  }
}

export default RelatedView;
