/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, CloseButton } from './q&a-styled-components/q&aSectionContainerStyle';
import Form from './Form.jsx';

export default function ModalPopup({ show, handleExit, questionId, productName }) {
  return (
    <Modal show={show}>
      <div>
        <CloseButton>
          <button className="close-btn" type="button" onClick={handleExit}>X</button>
        </CloseButton>
        <Form questionId={questionId} productName={productName} />
      </div>
    </Modal>
  );
}
