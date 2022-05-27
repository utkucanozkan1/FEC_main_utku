/* eslint-disable react/jsx-no-useless-fragment */
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

function QuestionList(props) {
  const [answerArr, setAnswerArr] = useState([]);
  const [loading, toogleLoading] = useState(true);
  const [answerReported, setAnswerReported] = useState(false);
  const [answerReported2, setAnswerReported2] = useState(false);
  const [showModalForm, setShowModalForm] = useState('false');
  const [answer1Helpful, setAnswer1Helpful] = useState(false);
  const [answer2Helpful, setAnswer2Helpful] = useState(false);
  const [questionHelpful, setQuestionHelpful] = useState(false);
  const [moreAnswers, setMoreAnswers] = useState(Object.keys(props.question.answers).length > 1);
  const [addAnswer, setAddAnswer] = useState(false);

  useEffect(() => {
    axios
      .get(`/answers/${props.question.question_id}`)
      .then((result) => {
        if (result.data.results) {
          const newAnswerArray = result.data.results.reduce((acc,answer) => {
            answer.answerer_name.toLowerCase() === 'seller' ? acc.unshift(answer) : acc.push(answer);
            return acc;
          }, []);
          setAnswerArr(newAnswerArray);
          toogleLoading(false);
          setAnswer1Helpful(false);
          setAnswer2Helpful(false);
          setQuestionHelpful(false);
          setAnswerReported(false);
          setAnswerReported2(false);
          setAddAnswer(false);
          setMoreAnswers(Object.keys(props.question.answers).length > 1);
        }
      })
      .then()
      .catch((err) => console.log(err));
  }, [props.question.question_id]);

  function reportAnswer() {
    const answerId = answerArr[0].answer_id;
    axios
      .put(`/answer/report/${answerId}`)
      .then(setAnswerReported(true))
      .then((res) => console.log('answer reported'))
      .catch((err) => console.log(err));
  }
  function reportAnswerDos() {
    const answerId = answerArr[1].answer_id;
    axios
      .put(`/answer/report/${answerId}`)
      .then(setAnswerReported2(true))
      .then((res) => console.log('answer reported'))
      .catch((err) => console.log(err));
  }
  function helpfulAnswer(obj) {
    console.log(obj);
    const answerId = obj.answer_id;
    axios
      .put(`/answer/helpful/${answerId}`)
      .then(setAnswer1Helpful(true))
      .then((res) => console.log('answer helpful'))
      .catch((err) => console.log(err));
  }
  function helpfulAnswerDos(obj) {
    console.log(obj);
    const answerId = obj.answer_id;
    axios
      .put(`/answer/helpful/${answerId}`)
      .then(setAnswer2Helpful(true))
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

  const handleAnswers = () => {
    setMoreAnswers(false);
    setAddAnswer(true);
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
                <i style={{ fontSize: 'small' }}>Helpful?</i>
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
        <div>
          {answerArr[0].photos.map((photo, i) => (
            <ImageComponent key={i} photo={photo} />
          ))}
        </div>

        <div>
          <span style={{ fontSize: 'small' }}>
            by &nbsp;
            <span>{answerArr[0].answerer_name.toLowerCase() === 'seller' ? <b>Seller</b> : <>{answerArr[0].answerer_name}</>}</span>, &nbsp;
            {moment(answerArr[0].date.slice(0, 10)).format('MMM Do YY')}
          </span>
          {answer1Helpful ? (
            <button type="button" className="astext-btn">
              This Answer has been marked Helpful
            </button>
          ) : (
            <button
              type="button"
              className="astext-btn"
              onClick={() => {
					        helpfulAnswer(answerArr[0]);
              }}
            >
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <i style={{ fontSize: 'small' }}>Helpful?</i>
							&nbsp;
              <mark style={{ textDecoration: 'underline', fontSize: 'small' }}>
                Yes
              </mark>
              ({answerArr[0].helpfulness})
            </button>
          )}
          &nbsp;&nbsp; | &nbsp;&nbsp;
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
        <div>
          {moreAnswers ? <button onClick={() => handleAnswers()}>LOAD MORE ANSWERS</button> : null}
        </div>
        <div>
          {addAnswer
            ? (
              <>
                <div>
                  <b>A:</b>
                  <span className="answer-text">{answerArr[1].body}</span>
                </div>
                <div>
                  {answerArr[1].photos.map((photo, i) => (
                    <ImageComponent key={i} photo={photo} />
                  ))}
                </div>

                <div>
                  <span style={{ fontSize: 'small' }}>
                    by &nbsp;
                    <span>{answerArr[1].answerer_name.toLowerCase() === 'seller' ? <b>Seller</b> : <>{answerArr[1].answerer_name}</>}</span>, &nbsp;
                    {moment(answerArr[1].date.slice(0, 10)).format('MMM Do YY')}
                  </span>
                  {answer2Helpful ? (
                    <button type="button" className="astext-btn">
                      This Answer has been marked Helpful
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="astext-btn"
                      onClick={() => {
                        helpfulAnswerDos(answerArr[1]);
                      }}
                    >
    &nbsp;&nbsp; | &nbsp;&nbsp;
                      <i style={{ fontSize: 'small' }}>Helpful?</i>
    &nbsp;
                      <mark style={{ textDecoration: 'underline', fontSize: 'small' }}>
                        Yes
                      </mark>
                      ({answerArr[1].helpfulness})
                    </button>
                  )}
&nbsp;&nbsp; | &nbsp;&nbsp;
                  {answerReported2 ? (
                    <button type="button" className="astext-btn-answer">
                      This Answer has been Reported
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="astext-btn-answer"
                      onClick={reportAnswerDos}
                    >
                      Report
                    </button>
                  )}
                </div>
              </>
            )

            : null }
        </div>
      </div>
    );
    // eslint-disable-next-line no-else-return
  } else {
    <section>
      <div> Questions Loading...</div>
    </section>;
  }
}
export default QuestionList;
