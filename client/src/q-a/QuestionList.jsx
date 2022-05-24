import React, {useState} from 'react';
import moment from 'moment';
import ImageComponent from './ImageComponent.jsx';

const QuestionList = function(props) {
  const answerArray = [];
  // answerArray = Object.keys(props.question.answers)
  for(let key in props.question.answers){
    answerArray.push(props.question.answers[key])
    }
  console.log(answerArray)
  console.log(props.question)
  const ButtonTitle = (
    <>
      <text style={{fontSize: 'small' }}>Helpful?</text>
      &nbsp;
      <text style={{textDecoration: 'underline', fontSize: 'small' }}>Yes</text>
    </>
  );

  return (
    <div>
    &nbsp;
        &nbsp;
      <div>
        <b>
      Q: {props.question.question_body}
      </b>
      <div className='top-btn'>
      <button className="astext-btn">{ButtonTitle} ({props.question.question_helpfulness})</button>
        &nbsp;
        &nbsp;
        |
        &nbsp;
        &nbsp;
        <button className="astext-btn-answer">Add Answer</button>
      </div>
    </div>
    &nbsp;
    <div>
    <b>
      A:
    </b>
    <span className="answer-text">
    {answerArray[0].body}
    </span>
    </div>
        &nbsp;
    <div>
      {answerArray[0].photos.map((photo, i) => (
        <ImageComponent key={i} photo={photo} />
      ))}
    </div>
        &nbsp;
        &nbsp;
    <div>
      <span style={{fontSize:'small'}}>
        by
        &nbsp;
        {answerArray[0].answerer_name},
        &nbsp;
        {moment(answerArray[0].date.slice(0,10)).format("MMM Do YY")}
      </span>
      &nbsp;
      &nbsp;
      |
      &nbsp;
      &nbsp;
      <button type="button" className="astext-btn">{ButtonTitle} ({answerArray[0].helpfulness})</button>
      &nbsp;
      &nbsp;
      |
      &nbsp;
      &nbsp;
      <button type="button" className="astext-btn-answer">Report</button>
      </div>
  </div>
  )
};
export default QuestionList;



