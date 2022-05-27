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
  const [productRatings, setRatings] = useState([]);
  const [related, setRelated] = useState([]);
  const [viewable, setViewable] = useState([]);
  const [position, setPosition] = useState(0);
  const [end, setEnd] = useState(false);
  useEffect(() => {
    axios.get(`/related/${itemId}`)
      .then((relatedIds) => {
        setRelated(relatedIds.data);
        setPosition(0);
        const viewableRelatedIds = relatedIds.data.slice(0, 4);
        const relatedPromises = viewableRelatedIds.map((id) => (
          axios.get(`/products/${id}`)
        ));
        Promise.all(relatedPromises)
          .then((relatedProducts) => {
            const stylesPromises = relatedProducts.map((product) => (
              axios.get(`/products/${product.data.id}/styles`)
            ));
            Promise.all(stylesPromises)
              .then((productStyles) => {
                setViewable(productStyles.map((style, i) => (
                  Object.assign(relatedProducts[i].data, style.data)
                )));
              })
              .catch((err) => {
                console.log(err);
              });
          });
        setEnd(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [itemId]);

  useEffect(() => {
    const ratingsPromises = viewable.map((product) => (
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
    if (related.length <= 4 && related.length > 0) {
      setEnd(true);
    }
    toogleLoading(false);
  }, [viewable]);

  if (!loading) {
    return (
      <section>
        <h6>RELATED PRODUCTS</h6>
        <CardContainer>
          <ViewableContext.Provider value={{ viewable, setViewable, position, setPosition, related, end, setEnd }}>
            <LeftArrow />
            {viewable.slice(position, position + 4).map((product, i) => (
              <CardProductContext.Provider value={{ setItemId, product }}>
                <RelatedCard key={product.id} cardRating={productRatings[i]} />
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
