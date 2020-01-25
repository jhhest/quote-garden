import React, { Component, Fragment } from "react";
import Quote from "./Quote";

export class QuoteSearcher extends Component {
  state = {
    fetching: true,
    quotes: [],
    searchValue: ""
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(resolve => resolve.json())
      .then(fetchedQuotes =>
        this.setState({
          quotes: fetchedQuotes.results.map(quote => {
            return {
              id: quote._id,
              quoteAuthor: quote.quoteAuthor,
              quoteText: quote.quoteText,
              numLike: null
            };
          }),
          fetching: false
        })
      );
  }

  showQuotes = quotesArray =>
    quotesArray.map(quote => (
      <Quote
        text={quote.quoteText}
        author={quote.quoteAuthor}
        key={quote.id}
        setLike={() => this.setLiked(quote.id, true)}
        setDislike={() => this.setLiked(quote.id, false)}
        numLike={quote.numLike}
      />
    ));

  setLiked = (id, like) => {
    const mutateFetchedQuotes = [...this.state.quotes].map(quote =>
      quote.id === id ? { ...quote, numLike: like } : quote
    );
    this.setState({ quotes: mutateFetchedQuotes });
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  render() {
    const { fetching, quotes } = this.state;

    return (
      <Fragment>
        <h1 style={{ textAlign: "center" }}>QuoteSearcher.</h1>
        <form>
          <input
            type="text"
            name="searchValue"
            placeholder="Search Quotes"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <input type="submit" value="search" />
        </form>
        <p>
          Liked:<i className="fa fa-thumbs-up"></i>
          {quotes.filter(quote => quote.numLike === true).length}
        </p>
        <p>
          Disliked:<i className="fa fa-thumbs-down"></i>
          {quotes.filter(quote => quote.numLike === false).length}
        </p>
        <p>Total of Quotes: {quotes.length}</p>
        <p>
          Total of not liked/disliked:{" "}
          {quotes.filter(quote => quote.numLike === null).length}
        </p>
        <p>
          Total of not liked/disliked:{" "}
          {quotes.filter(quote => !(quote.numLike === null)).length}
        </p>
        {/* TODO:Make it look nicer */}
        {fetching && <p>Loading...</p>}
        <section id="center-quotes">
          {!fetching && this.showQuotes(quotes)}
        </section>
      </Fragment>
    );
  }
}

export default QuoteSearcher;
