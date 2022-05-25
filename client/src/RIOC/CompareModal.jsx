import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Modal, Chart, CompareContainer, RowContainer,
} from './RIOC-styled-components/ModalStyles';
import { ModalContext } from './RelatedCard';
import { ProductIdContext } from '../index';
import { CardProductContext } from './RelatedView';

function CompareModal() {
  const { modal, setModal } = useContext(ModalContext);
  const { itemId, setItemId} = useContext(ProductIdContext);
  const { product } = useContext(CardProductContext);
  const [features, setFeatures] = useState([]);
  // INFO FOR 2 PRODUCTS
  useEffect(() => {
    axios.get(`/products/${itemId}`)
      .then((featProduct) => {
        axios.get(`/products/${product.id}`)
          .then((compProduct) => {
            setFeatures([...featProduct.data.features, ...compProduct.data.features]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function closeModal(event) {
    event.stopPropagation();
    setModal(!modal);
  }
  return (
    <Modal>
      <Chart>
        {console.log(features)}
        <h5>Comparing</h5>
        <button type="button" onClick={closeModal}>X</button>
        <CompareContainer>
          <RowContainer>
            <h6>Cur Product Name</h6>
            <p> </p>
            <h6>{product.name}</h6>
          </RowContainer>
          {features.map((trait) => (
            <RowContainer>
              <p className="modalItem">{trait.value ? trait.value : '✓'}</p>
              <p className="modalItem">{trait.feature}</p>
              <p className="modalItem">{trait.value ? trait.value : '✓'}</p>
            </RowContainer>
          ))}
        </CompareContainer>
      </Chart>
    </Modal>
  );
}

export default CompareModal;
