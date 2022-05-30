import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Modal, Chart, CompareContainer, RowContainer,
} from './RIOC-styled-components/ModalStyles';
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
  // useEffect(() => {
  //   axios.get(`/products/${product.id}`)
  //     .then((compProduct) => {
  //       setFeatures([...data.features, ...compProduct.data.features]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function closeModal(event) {
    event.stopPropagation();
    setModal(!modal);
  }
  return (
    <Modal>
      <Chart>
        <RowContainer>
          <h5>Comparing</h5>
          <button type="button" onClick={closeModal}>X</button>
        </RowContainer>
        <CompareContainer>
          <RowContainer>
            <h6 className="left">{data.name}</h6>
            <p> </p>
            <h6 className="right">{product.name}</h6>
          </RowContainer>
          {data.features.map((trait) => (
            <RowContainer>
              <p className="modalItem">{trait.value ? trait.value : '✓'}</p>
              <p className="modalItem">{trait.feature}</p>
              <p className="modalItem">{handleSharedTrait(trait, features)}</p>
            </RowContainer>
          ))}
          {features.map((trait, i) => (
            Object.entries(data.features[i])[0][1] === trait.feature ? <> </>
              : (
                <RowContainer>
                  <p className="modalItem">{handleSharedTrait(trait, data.features)}</p>
                  <p className="modalItem">{trait.feature}</p>
                  <p className="modalItem">{trait.value ? trait.value : '✓'}</p>
                </RowContainer>
              )
          ))}
        </CompareContainer>
      </Chart>
    </Modal>
  );
}

export default CompareModal;
