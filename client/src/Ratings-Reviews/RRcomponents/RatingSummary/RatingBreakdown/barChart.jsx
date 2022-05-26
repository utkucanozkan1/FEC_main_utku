import React from 'react';
import styled from 'styled-components';

const OuterBar = styled.div`
  height: 10px;
  width: 90%;
  background-color: gray;
  margin: 10px;
  &:hover {
    border: 2px solid red;
    background-color: white;
  }
`;

const Bars = styled.div`
  height: 100%;
  width: ${({ length }) => (length)}%;
  background-color: gray;
  text-align: right;
`;

export default function BarChart({ length }) {
  return (
    <OuterBar>
      <Bars length={length} />
    </OuterBar>
  );
}
