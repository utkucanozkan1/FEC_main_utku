/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-else-return */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import { ProductIdContext } from '../index.jsx';
import QuestionModal from './QuestionModal.jsx';
import NewQuestion from './NewQuestion.jsx';
import { FormStyle } from './q&a-styled-components/q&aSectionContainerStyle';

let questionsArray;
let searchingArray;
function QuestionsAndAnswers() {
  // need live data

  // console.log(useContext(ProductIdContext));
  const { itemId, name } = useContext(ProductIdContext);
  const [searchQuestions, setSearchQuestions] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [questionArray, setQuestionArray] = useState([]);
  const [loading, toogleLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState({ search: '' });
  const [showModalForm, setShowModalForm] = useState('false');
  const [noQuestions, setNoQuestions] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [loadQuestions, setLoadQuestions] = useState(true);
  const [sliceCount, setSliceCount] = useState(2);

  useEffect(() => {
    // let's just use 37311 for now
    axios.get(`/questions/${itemId}`).then((questions) => {
      questionsArray = [];
      questions.data.results.forEach((question) => {
        if (Object.keys(question.answers).length) {
          // check here for seller answer and put it in front of the list
          questionsArray.push(question);
        }
      });
      setQuestionArray([...questionsArray]);
      // console.log(questionsArray);
      toogleLoading(false);
      !questionsArray.length ? setNoQuestions(true) : setNoQuestions(false);
      setQuestionCount(questionsArray.length - 2);
      // questionCount >= 2 ? setLoadQuestions(true) : setLoadQuestions(false);
      // setLoadQuestions(false);
      setSliceCount(2);
    })
      .then()
      .catch((err) => console.log(err));
  }, [itemId]);

  useEffect(() => {
    // searchingArray = [];
    if (searchTerm.search.length > 3) {
      searchingArray = questionArray.filter((el) => el.question_body.toLowerCase().includes(searchTerm.search));
      setSearchArray([...searchingArray]);
      setSearchQuestions(true);
    } else {
      setSearchArray([]);
      setSearchQuestions(false);
    }
  }, [searchTerm.search]);

  useEffect(() => {
    questionCount >= 2 ? setLoadQuestions(true) : setLoadQuestions(false);
  }, [questionCount]);

  const handleChange = function (e) {
    setSearchTerm({ ...searchTerm, search: e.target.value });
  };
  const showModal = () => {
    setShowModalForm('true');
  };

  const hideModal = () => {
    setShowModalForm('false');
  };
  const adjustQuestionCount = () => {
    setQuestionCount((prev) => prev - 2);
    setSliceCount((prev) => {
      if (prev !== 8) {
        prev + 2;
      }
    });
  };

  if (!loading) {
    return (
      <section className="question-section">
        <div className="title-div">Q & A</div>
        <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass" />
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="header-search"
                placeholder="Have a question? Search for answers..."
                name="search"
                value={searchTerm.search}
                onChange={(e) => handleChange(e)}
              />
            </form>
          </div>
        </div>
        <div>
          {noQuestions ? <h2>Looks like no answered questions are available for this product, please add a new question</h2> : null}
        </div>
        {searchQuestions ? (
          <div className="main-div">
            {searchArray.slice(0, 4).map((question, i) => (
              <QuestionList question={question} key={i} name={name} />
            ))}
          </div>
        ) : (
          <div className="main-div">
            {questionArray.slice(0, sliceCount).map((question, i) => (
              <QuestionList question={question} key={i} name={name} />
            ))}
          </div>
        )}
        <div className="bottom-buttons-div">
          <div style={{backgroundColor:'white'}}>
            {loadQuestions && <button className="text-border-btn" onClick={adjustQuestionCount}>MORE ANSWERED QUESTIONS</button>}
          </div>
          <div style={{backgroundColor:'white'}}>
            <button type="button" className="text-border-btn" onClick={showModal}>
              ADD A QUESTION +
              {' '}
            </button>
            <div className="modal-popup">
              <QuestionModal
                show={showModalForm}
                handleExit={hideModal}
                itemId={itemId}
                name={name}
              >
                <FormStyle>
                  <NewQuestion> </NewQuestion>
                </FormStyle>
              </QuestionModal>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div> Questions Loading...</div>
      </section>
    );
  }
}
export default QuestionsAndAnswers;
