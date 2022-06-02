/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { FormStyle } from './q&a-styled-components/q&aSectionContainerStyle';

export default function Form({ questionId ,productName, handleExit }) {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoList, setPhotos] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const onSubmit = (event) => {
    const photos = photoList.toString().split(',');

    axios
      .post(`/answers/${questionId.question_id}`, {
        body, name, email, photos,
      })
      .then(() => console.log('post success'))
      .catch((err) => console.log(err));
    setIsClicked(true);
    event.preventDefault();
  };

  return (
    <FormStyle>
      <div className="answer-header">
        <div>
          <button type="button" onClick={handleExit} className="closeQuestion-btn">
          <i className="fa-solid fa-xmark cart-modal-close"></i>
          </button>
        </div>
        &nbsp; &nbsp;
        <h1> Submit Your Answer</h1>
        &nbsp; &nbsp;
        <h3>
          [ {productName.toUpperCase()} ] :
          {' '}
        [ {questionId.question_body} ]
        </h3>
      </div>
      <div className="whole-answer-text">
        {isClicked ? <h2>Your Answer Has Been Submitted</h2> : (
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="body-text">
              <textarea
                maxLength="1000"
                rows="5"
                cols="50"
                value={body}
                placeholder="Place your Answer Here"
                required
                autoComplete="off"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            &nbsp; &nbsp;
            <div className="form-group">
              <span htmlFor="name">Nickname: </span>
              <input className="form-control" id="nickName" placeholder="Example:jack453" value={name} onChange={(e) => setName(e.target.value)} />
              <div>
                <mark>
                  <em>
                    "For privacy reasons,
                    do not use your full name or email address”
                    {' '}
                  </em>
                </mark>
              </div>
            </div>
            &nbsp; &nbsp;
            <div className="form-group">
              <span>Email address: </span>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <mark><em>“For authentication reasons, you will not be emailed”  </em></mark>
              </div>
            </div>
            &nbsp; &nbsp;
            <div>
              <h3>Add Photo Urls: </h3>
              <textarea
                rows="5"
                cols="50"
                className="form-control"
                id="photo"
                value={photoList}
                placeholder="Add up to 3 photo Urls , separated by comma"
                onChange={(e) => setPhotos(e.target.value)}
              />
            </div>
            &nbsp; &nbsp;
            <div className="form-group">
              <button className="text-border-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </FormStyle>

  );
}
