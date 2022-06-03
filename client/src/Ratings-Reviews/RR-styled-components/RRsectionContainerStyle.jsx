import styled from 'styled-components';

// Main view container

// Review entry settings.
// main container for each review

// used for add filter drop-down on review list
const Button = styled.div`
width: 50%;
flex-flow: row nowrap;
align-self: center;
`;

const BottomButtons = styled.div`
align-self: center;
`;

/*-------------------*/
// main container for the ratings summary
const SummaryLeft = styled.div`
grid-column-start: 2;
display: flex;
flex-flow: column wrap;
justify-content: flex-start;
width: 100%;
`;

/*-----------------*/
//  product characterstic breakdown format

// Container for characteristic breakdown
const ProductBreakdownContainer = styled.div`
  display: grid;
  /* width: 100%;
  padding-top: 30px;
  gap: 20px; */
`;

// Top portion of ratings and summary with the average rating

// formatting for characteristic breakdown graph
const CharacterGraph = styled.div`
  display: grid;
  grid-template-rows: 30px 20px 20px;
`;

// formatting for each characteristic breakdown
const Character = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 15px;
`;

// used for % of recommend and total reviews in ratings summary
const Recommend = styled.div`
display: flex;
flex-flow: column wrap;
font-size: 15px;
`;

/*--------------------*/
// Form and modal settings
const FormContainer = styled.div`
width: 75%;
  margin: 10px auto;
  top: 10;
  left: 10;
`;

const FormStyle = styled.div`
  width: 90%;
  background: slategray;
  margin: 10px auto;
  top: 10;
  left: 10;
`;

const FormElement = styled.div`
width: 25%;
`;

const Header = styled.div`
width: 100%;
color: white;
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 2%;
  grid-template-columns: 15% 15% 15% 15% 15% 15%;
  text-align: center;
`;

const FormButtonRow = styled.div`

  float: left;
  padding: 0 1%;
  text-align: center;
  &:hover {
    background-color: #6291dd;
  }
  `;

const RadioButtonLabel = styled.label`
  display: grid;
  justify-items: center;
  font-size: 15px;
  `;

const Modal = styled.div`
  position: fixed;
  padding: 0.5em;
  top: 15%;
  left: 25%;
  width: 60%;
  height: 75%;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ show }) => (show === 'true' ? 'block' : 'none')};
  overflow-y: auto;
`;

const CloseButton = styled.div`
  top:1%;
  left:93%;
  position: relative;
`;
/*-------------------*/
// Star rating breakdown settings.

const OuterBarGraph = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const InnerBarGraph = styled.label`
margin: 5px;
&:hover {
  color: red;
}
`;

export {
  SummaryLeft, ProductBreakdownContainer,
  Recommend, BottomButtons, FormStyle,
  FormElement, Header, FormContainer, CloseButton, Modal, Button,
  OuterBarGraph, InnerBarGraph, Character, CharacterGraph, GridContainer,
  FormButtonRow, RadioButtonLabel,
};
