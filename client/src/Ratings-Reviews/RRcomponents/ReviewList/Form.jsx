import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProductIdContext } from '../../../index';
import styled from 'styled-components';
import {
  FormStyle, Header, GridContainer, FormButtonRow, RadioButtonLabel,
} from '../../RR-styled-components/RRsectionContainerStyle';
// import withRangeOption from "./withRangeOption.jsx"

export default function Form() {
  const { itemId, characteristics } = useContext(ProductIdContext);
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoList, setPhotos] = useState([]);
  const chars = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };
  const product_id = itemId
  const initialCharacteristics = {
    Comfort: false,
    Fit: false,
    Length: false,
    Quality: false,
    Size: false,
    Width: false,
  };
  const [reviewCharacteristics, setCharacteristics] = useState(initialCharacteristics);

  useEffect(() => {
    setCharacteristics(initialCharacteristics);
    const newChars = { ...initialCharacteristics };
    for(let key in characteristics) {
      newChars[key] = true;
    }
    setCharacteristics(newChars);
  }, [itemId]);

  const handleCheck = () => {
    setRecommend(!recommend);
  };

  const handleSubmit = () => {
    axios.post('/reviews', {
      product_id, rating, summary, body, recommend, name, email, photos, reviewCharacteristics,
    })
      .then(() => {
        console.log('Added a review! ');
      })
      .catch((err) => {
        console.log('axios post reviews error', err);
      });
  };

  return (
    <div className="reviewForm">
      <header>
        <h2>What do you think of this product?</h2>
      </header>
      <form>
        <Header>
          <h3>
            <label>
              <span>Overall rating</span>
              <select required name="overall" defaultValue="5" onChange={(e) => setRating(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
          </h3>
        </Header>
        <hr />
        <Header>
          <label>
            <span>Recommend this product</span>
            {' '}
            <small>Yes</small>
            {' '}
            <input required name="status" type="checkbox" onChange={handleCheck} />
          </label>
        </Header>
        <hr />
        <Header>
          <h3>
            <label>
              <span>Characteristics</span>
            </label>
          </h3>
          {Object.keys(chars).map((char) => (
            <GridContainer key={char}>
              <span>{char}</span>
              {' '}
              {chars[char].map((elem, i) => (
                <FormButtonRow key={i}>
                  <RadioButtonLabel key={i + 10} htmlFor={elem}>
                    <input type="radio" key={i} value={i + 1} name={char} />
                    {elem}
                  </RadioButtonLabel>
                </FormButtonRow>
              ))}
            </GridContainer>
            // setChar to update state
          ))}
        </Header>
        <hr />
        <Header>
          <h3>
            <label>
              <span>Review summary</span>
            </label>
          </h3>
        </Header>
        <div>
          <label>
            <textarea
              value={summary}
              maxLength="60"
              rows="3"
              cols="50"
              placeholder="Summary"
              onChange={(e) => setSummary(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <Header>
          <h3>
            <label>
              <span>Review body</span>
            </label>
          </h3>
        </Header>
        <div>
          <label>
            <textarea
              maxLength="1000"
              minLength="250"
              rows="5"
              cols="50"
              value={body}
              placeholder="Body"
              required
              autoComplete="off"
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <Header>
          <h3>
            <label>
              <span>Upload photos</span>
            </label>
          </h3>
        </Header>
        <div>
          <textarea
            rows="5"
            cols="50"
            className="form-control"
            id="photo"
            value={photoList}
            placeholder="Add up to 5 photo Urls , separated by comma"
            onChange={(e) => setPhotos(photoList => [...photoList, e.target.value])}
          />
        </div>
        <hr />
        <Header>
          <h3>
            <label>
              <span>Name?</span>
            </label>
          </h3>
          <span> Use nickname </span>
        </Header>
        <div>
          <label>
            <input
              value={name}
              maxLength="60"
              width="100%"
              placeholder="username"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <Header>
          <h3>
            <label>
              <span>Your email</span>
            </label>
          </h3>
          <span> email will be not be used for any other purpose</span>
        </Header>
        <div>
          <label>
            <input
              type="email"
              value={email}
              maxLength="60"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              />
          </label>
        </div>
        <hr />
        <div>
          <button type="button" onClick={handleSubmit}>
            <span>Submit review</span>
          </button>
        </div>
      </form>
    </div>
  );
}
