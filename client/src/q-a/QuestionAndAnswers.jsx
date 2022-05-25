import React ,{useState} from 'react';
import questionArray from './dummydata';
import QuestionList from './QuestionList.jsx';
import Search from './Search.jsx';
function QuestionsAndAnswers() {
  return (
    <>
      <div>
        Questions & Answers
      </div>
      <div>
        <Search />
      </div>
      <div className="main-div">
        {questionArray.map((question,i) => {
        return <QuestionList key={i} question={question} ></QuestionList>
        })}
      </div>
    </>

  );
}
export default QuestionsAndAnswers;
