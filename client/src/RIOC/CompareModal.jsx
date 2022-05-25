import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Modal, Chart, CompareContainer, RowContainer,
} from './RIOC-styled-components/ModalStyles';
import { ModalContext } from './RelatedCard';

function CompareModal() {
  const { modal, setModal } = useContext(ModalContext);
  const [features, setFeatures] = useState([]);
  // NEED TO SWITCH STARTER PRODUCT
  useEffect(() => {
    axios.get(`/products/${37311}`)
      .then((product) => {
        setFeatures(product.data.features);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Modal>
      <Chart>
        <h5>Comparing</h5>
        <button type="button" onClick={() => { setModal(!modal); }}>X</button>
        <CompareContainer>
          <RowContainer>
            <h6>Cur Product Name</h6>
            <p> </p>
            <h6>Comp Product Name</h6>
          </RowContainer>
          {features.map((trait) => (
            <RowContainer>
              <p>{trait.value}</p>
              <p>{trait.feature}</p>
              <p>Other product placeholder</p>
            </RowContainer>
          ))}
        </CompareContainer>
      </Chart>
    </Modal>
  );
}

export default CompareModal;
