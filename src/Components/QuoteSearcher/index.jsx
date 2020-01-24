import React, { Component, Fragment } from "react";
import Quote from "./Quote";

export class QuoteSearcher extends Component {
  state = {
    fetching: true,
    quotes: []
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(resolve => resolve.json())
      .then(fetchedQuotes =>
        this.setState({ quotes: fetchedQuotes.results, fetching: false })
      );
  }

  showQuotes = quotesArray =>
    quotesArray.map(quote => (
      <Quote
        text={quote.quoteText}
        author={quote.quoteAuthor}
        key={quote._id}
      />
    ));

  render() {
    const { loading, quotes } = this.state;

    return (
      <Fragment>
        <h1 style={{ textAlign: "center" }}>QuoteSearcher.</h1>
        {loading && <p>Loading...</p>}
        <section id="center-quotes">
          {!loading && this.showQuotes(quotes)}
        </section>
      </Fragment>
    );
  }
}

export default QuoteSearcher;
