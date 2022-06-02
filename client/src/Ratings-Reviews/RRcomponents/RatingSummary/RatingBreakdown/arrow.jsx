import React from 'react';
import styled from 'styled-components';

const TriangleMarker = styled.div`
  position: absolute;
  margin: 10px
  width: 90%;
  height: 100%;
  top: 0;
  left: ${({ average }) => (average)}%;
  background-color: transparent;
  border-style: solid;
  border-left-width: 10px;
  border-right-width: 10px;
  border-top-width: 20px;
  border-bottom-width: 0px;
  border-top-color: black;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
`;


export default function Arrow({ average }) {
  return (
    <div className="outer-char-breakdown">
      <div className="triangle-container">
        <div className="inner-triangle-container" />
        <div className="inner-triangle-container" />
        <div className="inner-triangle-container" />
        <div className="inner-triangle-container" />
        <div className="inner-triangle-container" />
        <TriangleMarker average={average} />
      </div>
    </div>
  );
}
