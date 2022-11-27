import './App.css';
import React from 'react';
import Select from 'react-select';

class App extends React.Component {
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
    return (
      
      <div className="container-fluid">
        <div className="bg"/>
        <div className="bg bg2"/>
        <div className="bg bg3"/>
        <div className="text-center w-75 content">
          <div id="heading" className="mb-3">
             <h1><u>Quote generator</u></h1>
          </div>
          <div id="quote-box" className="mx-auto">
            <blockquote id="text" className="blockquote mx-auto mb-4">
              <h3>
              "{this.props.storedQuotes[this.props.viewedQuote].quote}"
              </h3>
            </blockquote>
            <figcaption  id="author" className="mx-auto mb-4">
              <h4>
                <cite>
                {this.props.storedQuotes[this.props.viewedQuote].author}, {this.props.storedQuotes[this.props.viewedQuote].genre}
                </cite>
              </h4>
            </figcaption >
            {/* https://reactgo.com/react-disable-button/ */}
          
            {/* https://react-select.com */}
          </div>
          <div id="button-box"className="d-flex justify-content-center mb-4">
            <button onClick={this.getPrevQuote} id="prev-quote" className="btn btn-success mx-auto" 
            disabled={this.props.viewedQuote === 1 ? true : false }>
              <i className="bi bi-arrow-left"></i> previus
            </button>
            <button onClick={this.getNextQuote} id="next-quote" className="btn btn-success mx-auto"
            disabled={this.props.storedQuotesNumber === this.props.viewedQuote ? true : false}>
              next <i className="bi bi-arrow-right"></i>
            </button>
            <Select className="w-50 mx-auto" options={this.props.genres}  isClearable={true} onChange={(choice) => this.handleChoice(choice)} placeholder="Select genre"/>
            <button onClick={this.newQuote} id="new-quote" className="btn btn-primary mx-auto">
              new quote <i className="bi bi-quote"></i>
            </button>
            <button className="btn btn-secondadry mx-auto">
              <a id="tweet-quote" href={tweetHref} target="_blank" rel="noreferrer"> 
                <i className="bi bi-twitter"></i>
              </a>
            </button>
          </div>
          <div id="credits" className="d-flex justify-center-left mb-0">
            <p>Created by: <a href="https://github.com/michaelkozin" target="_blank" rel="noreferrer">Michael Kozin</a>, quotes from: <a href="https://github.com/pprathameshmore/QuoteGarden" target="_blank" rel="noreferrer">Quote garden</a></p>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
