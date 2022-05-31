import styled from 'styled-components';

const CardButton = styled.button`
background-color: white;
font-size: 15px;
border-radius: 50%;
height: 30px;
width: 30px;
&:hover {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
color: #D8315B;
font-weight: bold;
`;

export default CardButton;
