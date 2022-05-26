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
  border-top-color: darkGray;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

const TriangleContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: space-between;
  flex-direction: row;
`;

const Top = styled.div`
  position: relative;
`;

const InnerContainer = styled.div`
  height: 10 px;
  width: 18%;
  background-color: lightGray;
`;

export default function Arrow({ average }) {
  return (
    <div>
      <Top>
        <TriangleContainer>
          <InnerContainer />
          <InnerContainer />
          <InnerContainer />
          <InnerContainer />
          <InnerContainer />
          <TriangleMarker average={average} />
        </TriangleContainer>
      </Top>
    </div>
  );
}
