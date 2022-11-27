import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, connect } from 'react-redux'
import './index.css';
import reportWebVitals from './reportWebVitals';
import {addMessage, newQuote, fetching, getAuthors, getGenres, nextQuote, prevQuote, genreChoice} from './store/quotes';
import store from './store';


const mapStateToProps = (state) => {
  return {messages: state.messages,
         currentQuoteData: state.currentQuoteData,
         previousQuotesData: state.previousQuotesData,
         storedQuotesNumber:  state.storedQuotesNumber,
         viewedQuote: state.viewedQuote,
         storedQuotes: state.storedQuotes,
         authors: state.authors,
         genres: state.genres,
         genreChoice: state.genreChoice}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    },
    getNewQuote: (genre) => {
      dispatch(newQuote(genre));
    },
    loadAuthors: () => {
      dispatch(getAuthors());
    },
    loadGenres: () => {
      dispatch(getGenres());
    },
    loadNextQuote: () => {
      dispatch(nextQuote());
    },
    loadPrevQuote: () => {
      dispatch(prevQuote());
    },
    loadGenreChoice: (value) => {
      dispatch(genreChoice(value))
    }
};
};


const Container = connect(mapStateToProps, mapDispatchToProps)(App);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Container />
  </Provider>
);

reportWebVitals();
