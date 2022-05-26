/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import ImageComponent from './ImageComponent.jsx';
import ModalPopup from './Modal.jsx';
import Form from './Form.jsx';
import { FormStyle } from './q&a-styled-components/q&aSectionContainerStyle';


const answerArray = [];
const QuestionList = function (props) {
  // console.log("this is the props question:", props.question);
  const [answerArr, setAnswerArr] = useState([]);
  const [loading, toogleLoading] = useState(true);
  const [answerReported, setAnswerReported] = useState(false);
  const [showModalForm, setShowModalForm] = useState('false');
  const [answerHelpful, setAnswerHelpful] = useState(false);
  const [questionHelpful, setQuestionHelpful] = useState(false);

  useEffect(() => {
    axios
      .get(`/answers/${props.question.question_id}`)
      .then((result) => {
        if (result.data.results) {
          setAnswerArr(result.data.results);
          toogleLoading(false);
          setAnswerHelpful(false);
          setQuestionHelpful(false);
          setAnswerReported(false);
        }
      })
      .then()
      .catch((err) => console.log(err));
  }, [props.question.question_id]);

  function reportAnswer() {
    const answerId = answerArr[0].answer_id;
    console.log(answerId);
    axios
      .put(`/answer/report/${answerId}`)
      .then(setAnswerReported(true))
      .then((res) => console.log('answer reported'))
      .catch((err) => console.log(err));
  }
  function helpfulAnswer() {
    const answerId = answerArr[0].answer_id;
    axios
      .put(`/answer/helpful/${answerId}`)
      .then(setAnswerHelpful(true))
      .then((res) => console.log('answer helpful'))
      .catch((err) => console.log(err));
  }
  function helpfulQuestion() {
    const questionId = props.question.question_id;
    axios
      .put(`/question/helpful/${questionId}`)
      .then(setQuestionHelpful(true))
      .then((res) => console.log('question helpful'))
      .catch((err) => console.log(err));
  }
  const showModal = () => {
    setShowModalForm('true');
  };

  const hideModal = () => {
    setShowModalForm('false');
  };

  if (!loading) {
    return (
      <div className="qa-main-div">
				&nbsp; &nbsp;
        <div className="question-div">
          <div className="flex-child">
            <b>Q: {props.question.question_body}</b>
          </div>
          <div className="flex-child">
            {/* <button type="button" className="astext-btn">
              {ButtonTitle} ({props.question.question_helpfulness})
            </button> */}
            {questionHelpful ? (
              <button type="button" className="astext-btn">
                This Question has been marked Helpful
              </button>
            ) : (
              <button
                type="button"
                className="astext-btn"
                onClick={() => {
								  helpfulQuestion();
                }}
              >
                <text style={{ fontSize: 'small' }}>Helpful?</text>
								&nbsp;
                <mark
                  style={{ textDecoration: 'underline', fontSize: 'small' }}
                >
                  Yes
                </mark>
                ({props.question.question_helpfulness})
              </button>
            )}
						&nbsp; &nbsp; | &nbsp; &nbsp;
            <button type="button" className="astext-btn-answer" onClick={showModal}>
              Add Answer
            </button>
            <div className="modal-popup">
            <ModalPopup show={showModalForm} handleExit={hideModal} questionId={props.question}>
              <FormStyle><Form questionId={props.question} /></FormStyle>
            </ModalPopup>
            </div>
          </div>
        </div>
        <div>
          <b>A:</b>
          <span className="answer-text">{answerArr[0].body}</span>
        </div>
				&nbsp;
        <div>
          {answerArr[0].photos.map((photo, i) => (
            <ImageComponent key={i} photo={photo} />
          ))}
        </div>
				&nbsp; &nbsp;
        <div>
          <span style={{ fontSize: 'small' }}>
            by &nbsp;
            {answerArr[0].answerer_name}, &nbsp;
            {moment(answerArr[0].date.slice(0, 10)).format('MMM Do YY')}
          </span>
					&nbsp; &nbsp; | &nbsp; &nbsp;
          {answerHelpful ? (
            <button type="button" className="astext-btn">
              This Answer has been marked Helpful
            </button>
          ) : (
            <button
              type="button"
              className="astext-btn"
              onClick={() => {
					        helpfulAnswer();
              }}
            >
              <text style={{ fontSize: 'small' }}>Helpful?</text>
							&nbsp;
              <mark style={{ textDecoration: 'underline', fontSize: 'small' }}>
                Yes
              </mark>
              ({answerArr[0].helpfulness})
            </button>
          )}
          {/* <button type="button" className="astext-btn">
            {ButtonTitle} ({answerArr[0].helpfulness})
          </button> */}
					&nbsp; &nbsp; | &nbsp; &nbsp;
          {answerReported ? (
            <button type="button" className="astext-btn-answer">
              This Answer has been Reported
            </button>
          ) : (
            <button
              type="button"
              className="astext-btn-answer"
              onClick={reportAnswer}
            >
              Report
            </button>
          )}
        </div>
      </div>
    );
    // eslint-disable-next-line no-else-return
  } else {
    <section>
      <div> Questions Loading...</div>
    </section>;
  }
};
export default QuestionList;
