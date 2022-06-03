import styled from "styled-components";

const Modal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: ${({ show }) => (show === "true" ? "block" : "none")};
	border: 2px solid red;
	z-index: 1001;
`;

const FormContainer = styled.div`
	margin-top: 50vh;
	width: 90%;
	height: 50%;
	margin: 10px auto;
	top: 10;
	left: 10;
`;

const FormStyle = styled.div`
	border: 2px solid black;
	width: 50%;
	background: white;
	position: fixed;
	left: 25%;
	top: 15%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const CloseButton = styled.div`
	top: 30%;
	left: 73.7%;
	position: absolute;
`;
export { CloseButton, Modal, FormStyle, FormContainer };
