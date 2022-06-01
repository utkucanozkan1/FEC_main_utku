import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ModalContext } from './RelatedCard';
import { ProductIdContext } from '../index';
import { CardProductContext } from './RelatedView';

function CompareModal() {
  const data = useContext(ProductIdContext);
  const { modal, setModal } = useContext(ModalContext);
  const { product } = useContext(CardProductContext);
  const [features, setFeatures] = useState([]);
  // INFO FOR COMP PRODUCT
  useEffect(() => {
    axios.get(`/products/${product.id}`)
      .then((compProduct) => {
        setFeatures(compProduct.data.features);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSharedTrait(trait, featureList) {
    let sharedValue = featureList.reduce((prev, cur, i) => {
      if (cur.feature === trait.feature) {
        return cur.value;
      }
      return prev;
    }, '');
    return sharedValue;
  }

  function closeModal(event) {
    event.stopPropagation();
    setModal(!modal);
  }
  return (
    <div className="modalBG" onClick={closeModal}>
      <div className="modal" onClick={(event) => { event.stopPropagation(); }}>
        <div className="rowContainer">
          <h5>COMPARING</h5>
          <button type="button" className="modalButton" onClick={closeModal}>X</button>
        </div>
        <div className="chartContainer">
          <div className="rowContainer">
            <h6 className="left">{data.name}</h6>
            <p> </p>
            <h6 className="right">{product.name}</h6>
          </div>
          {data.features.map((trait) => (
            <div className="rowContainer">
              <p className="modalItem">{trait.value ? trait.value : '✓'}</p>
              <p className="modalItem">{trait.feature}</p>
              <p className="modalItem">{handleSharedTrait(trait, features)}</p>
            </div>
          ))}
          {features.map((trait, i) => {
            if (data.features.length > i) {
              return Object.entries(data.features[i])[0][1] === trait.feature ? <> </>
                : (
                  <div className="rowContainer">
                    <p className="modalItem">{handleSharedTrait(trait, data.features)}</p>
                    <p className="modalItem">{trait.feature}</p>
                    <p className="modalItem">{trait.value ? trait.value : '✓'}</p>
                  </div>
                );
            }
            return (
              <div className="rowContainer">
                <p className="modalItem">{handleSharedTrait(trait, data.features)}</p>
                <p className="modalItem">{trait.feature}</p>
                <p className="modalItem">{trait.value ? trait.value : '✓'}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CompareModal;
