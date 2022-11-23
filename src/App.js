import logo from './logo.svg';
import './App.css';
import React from 'react';
import Select from 'react-select';

class 
App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      currentQuoteData : '',
      previousQuotesData : [],
      quote: '',
      author: '',
      genre: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.newQuote = this.newQuote.bind(this);
    this.getNextQuote = this.getNextQuote.bind(this);
    this.getPrevQuote = this.getPrevQuote.bind(this);
    this.callLoadAuthors = this.callLoadAuthors.bind(this);
    this.callLoadGenres = this.callLoadGenres.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.callLoadGenreChoice = this.callLoadGenreChoice.bind(this);


  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  };


  submitMessage() {
    this.props.submitNewMessage(this.state.input);
    this.setState(() => ({
      input: ''
    }));
  }

  // button passes unwanted data onclick passed to button_var whcih is not used on purpose
  async newQuote(button_var, genreChoice = this.props.genreChoice) {
    this.props.getNewQuote(genreChoice);
  };

  async callLoadAuthors() {
    this.props.loadAuthors();
  }

  async callLoadGenres() {
    this.props.loadGenres();
  }

  callLoadGenreChoice(value) {
    this.props.loadGenreChoice(value);
  };

  
  handleChoice(choice) {
    const sendValue = !choice ? "" : choice.value;
    this.callLoadGenreChoice(sendValue);
  };


  componentDidMount() {
    this.callLoadGenres();
    this.newQuote();
  }

  getNextQuote() {
    this.props.loadNextQuote();
  }

  getPrevQuote() {
    this.props.loadPrevQuote();
  }

  //previousQuote() {

  //}

  render() {
    const tweetHref = `https://twitter.com/intent/tweet?text="${this.props.currentQuoteData.quote}"- ${this.props.currentQuoteData.author}`
    const previousQuotesList = this.props.previousQuotesData.filter(x=> x.order != 0).map((x, idx) => x!={}?<li key={idx*2}>{x.order}</li>:<li key="001">"test"</li>);
    const authorList = this.props.authors.map((x, idx) => <li key={idx*5}>{x.value}</li>)
    return (
      <div className="container-fluid">
        <div className="text-center">
          <h1>quote machine</h1>
          <div id="quote-box">
            <div id="text">
              {this.props.storedQuotes[this.props.viewedQuote].quote}

            </div><br/>
            <div id="author">
              author: {this.props.storedQuotes[this.props.viewedQuote].author}
            </div><br/>
            <div id="genre">
              genre: {this.props.storedQuotes[this.props.viewedQuote].genre}
            </div><br/>
            <button onClick={this.getPrevQuote} id="prev-quote" className="btn btn-primary" 
            disabled={this.props.viewedQuote == 1 ? true : false }>
              previues quote
            </button><br/>
            <button onClick={this.getNextQuote} id="next-quote" className="btn btn-primary"
            disabled={this.props.storedQuotesNumber == this.props.viewedQuote ? true : false}>
              next quote
            </button><br/>
            <button onClick={this.newQuote} id="new-quote" className="btn btn-primary">
              new quote
            </button><br/>
            {/* <button onClick={this.previousQuote} id="previous-quote">
              previous quote
            </button><br/> */}
            <button>
              <a id="tweet-quote" href={tweetHref} target="_blank"> 
                <i className="bi bi-twitter"></i>
              </a>
            </button>
            <Select options={this.props.genres}  isClearable={true} onChange={(choice) => this.handleChoice(choice)}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
