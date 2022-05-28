/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, CloseButton } from './q&a-styled-components/q&aSectionContainerStyle';
import NewQuestion from './NewQuestion.jsx';

export default function QuestionModal({ show, handleExit, itemId }) {
  return (
    <Modal show={show}>
      <div>
        <CloseButton>
          <button className="close-btn" type="button" onClick={handleExit}>X</button>
        </CloseButton>
        <NewQuestion itemId={itemId} />
      </div>
    </Modal>
  );
}
