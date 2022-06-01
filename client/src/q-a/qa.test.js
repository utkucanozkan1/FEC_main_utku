
import React from 'react';
import axios from 'axios';
import { render, cleanup, screen, waitForElement, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom'
import 'regenerator-runtime/runtime';
import userEvent from '@testing-library/user-event';
import App from '../index.jsx';
import QuestionsAndAnswers from './QuestionAndAnswers.jsx';
import QuestionList from './QuestionList.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

afterEach(cleanup);

describe ('Questions and Answers Component', () => {

  it('should render App', async () => {
    render(<App />);
    const user = userEvent.setup();
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
    const resolvedDiv = await waitFor(() => screen.getByTestId("resolved"));
  });
})

// describe('App component', () => {
//  test('it renders', () => {
//    render(<App />);
//  });
// });

// describe('Q&A component',  () => {
//   render(<App />);
//   test('it renders',  () => {
//      render(<QuestionsAndAnswers />);
//   });
//  });

//  test('renders Questions Loading' , () => {
//   render(<QuestionsAndAnswers />);
//   const linkElement = screen.getByText(/Questions Loading.../i);
//   expect(linkElement).toBeInTheDocument();
//  })
//  test('should check if search component is rendered', () => {
//    render(<QuestionsAndAnswers />);
//    const searchBar = screen.getByTestId('search-bar');
//    expect(searchBar).toBeInTheDocument();
//  });