const ADD = 'ADD';
const NEW_QUOTE = 'NEW_QUOTE';
const FETCHING = 'FETCHING';
const FETCHED = 'FETCHED';
const ERROR = 'ERROR';
const AUTHORS = 'AUTHORS';
const GENRES = 'GENRES';
const PREV = 'PREV';
const NEXT = 'NEXT';
const GENRE_CHOICE = 'GENRE_CHOICE';


const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const fetching = () => {
  return {
    type: FETCHING
  }
};

const nextQuote = () => {
  return {
    type: NEXT
  };
};

const prevQuote = () => {
  return {
    type: PREV
  };
};

const genreChoice = (choice) => {
  return {
    type: GENRE_CHOICE,
    choice
  };
};

// https://reactjs.org/docs/faq-ajax.html
// https://reactgo.com/redux-fetch-data-api/
// https://stackoverflow.com/questions/40003574/using-thunks-in-mapdispatchtoprops
// general method to be call the same with different calls
const fetchGeneral = (link, type, genre = "") => {
  const updatedLink = genre != "" ? link + `?genre=${genre}` : link;
  return dispatch => {
    dispatch(fetching());
    fetch(updatedLink, {method: 'GET'})
    .then(res => res.json()).then(res => dispatch({ type: type, payload: res })).catch(err => {dispatch({
  type: ERROR,
  message: `Unable to fetch ${link}`})});
};
};

const newQuote = (genre = "", link = 'https://quote-garden.herokuapp.com/api/v3/quotes/random',
type = FETCHED) => {return fetchGeneral(link = link, type = type, genre = genre)};

const getAuthors = (link = 'https://quote-garden.herokuapp.com/api/v3/authors',
type = AUTHORS) => {return fetchGeneral(link = link, type = type)};

const getGenres = (link = 'https://quote-garden.herokuapp.com/api/v3/genres',
type = GENRES) => {return fetchGeneral(link = link, type = type)};

const defaultState = {
  messages : [],
  currentQuoteData: {order: 0},
  previousQuotesData: [{}],
  fetching: false,
  error: '',
  storedQuotesNumber:  0,
  viewedQuote: 0,
  storedQuotes: [{}],
  genresLoaded: false,
  authorsLoaded: false,
  authors: [],
  genres: [],
  genreChoice: ""
};

const messageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return Object.assign({}, state,
         {messages: [
        ...state.messages,
        action.message
      ]});
    case AUTHORS:
      // https://contactmentor.com/javascript-map-array-of-objects/
      const authorList = action.payload.data.map(x => {return {value: x, label: x}});
      return Object.assign({}, state, {authorsLoaded: true},{authors: authorList});
    case GENRES:
      const genreList = action.payload.data.map(x => {return {value: x, label: x}});
      return Object.assign({}, state, {genresLoaded: true},{genres: genreList});
    case FETCHING:
      return Object.assign({}, state, {fetching: true});
    case FETCHED:
      const lastQuote = {
        order: state.currentQuoteData.order + 1,
        quote: action.payload.data[0].quoteText,
        genre: action.payload.data[0].quoteGenre,
        author: action.payload.data[0].quoteAuthor};
      const updatedState = Object.assign({}, 
        state, 
        {fetching: false}, 
        {previousQuotesData: [...state.previousQuotesData, state.currentQuoteData]},
        {currentQuoteData: lastQuote},
        {storedQuotesNumber: state.storedQuotesNumber + 1},
        {viewedQuote: state.storedQuotesNumber + 1},
         //https://reactgo.com/javascript-variable-object-key/
        {storedQuotes: [...state.storedQuotes, lastQuote]});
      return updatedState;
    case NEXT:
      return Object.assign({}, state, {viewedQuote: Math.min(state.viewedQuote + 1, state.storedQuotesNumber)});
    case PREV:
      return Object.assign({}, state, {viewedQuote: Math.max(state.viewedQuote - 1, 1)});
    case ERROR:
      return Object.assign({}, {error: action.message});
    case GENRE_CHOICE:
      return Object.assign({}, state, {genreChoice: action.choice});
    default:
      return state;
  }
};

export {addMessage, newQuote, messageReducer, fetching, getAuthors, getGenres, nextQuote, prevQuote, genreChoice};