import React, { Component, Fragment } from "react";
import Quote from "./Quote";

export class QuoteSearcher extends Component {
  state = {
    loading: true,
    quotes: []
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(resolve => resolve.json())
      .then(fetchedQuotes =>
        this.setState({ quotes: fetchedQuotes.results, loading: false })
      );
  }

  showQuotes = quotesArray =>
    quotesArray.map(quote => (
      <Quote text={quote.quoteText} author={quote.quoteAuthor} />
    ));

  render() {
    const { loading, quotes } = this.state;

    return (
      <Fragment>
        <h1 style={{ textAlign: "center" }}>QuoteSearcher.</h1>
        {loading && <p>Loading...</p>}
        {!loading && this.showQuotes(quotes)}
      </Fragment>
    );
  }
}

export default QuoteSearcher;
