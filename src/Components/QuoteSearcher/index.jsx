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
        setLike={() => this.setLike(quote.id)}
        setDislike={() => this.setDislike(quote.id)}
        numLike={quote.numLike}
      />
    ));

  setLike = id => {
    console.log("this is id:", id);

    const copyOfState = { ...this.state };
    console.log("this is a copy of state", copyOfState);
    const copyOfQuotesArr = [...this.state.quotes];
    console.log(
      "this is a copy quotes array that is in state",
      copyOfQuotesArr
    );

    const mutateFetchedQuotes = copyOfQuotesArr.map(quote =>
      quote.id === id ? { ...quote, numLike: true } : quote
    );
    console.log(
      "this is a copy quotes array that is in state",
      mutateFetchedQuotes
    );
    this.setState({ quotes: mutateFetchedQuotes });
      //Works!
  };

  setDislike = (id) => {
    console.log("this is id:", id);

    const copyOfState = { ...this.state };
    console.log("this is a copy of state", copyOfState);
    const copyOfQuotesArr = [...this.state.quotes];
    console.log(
      "this is a copy quotes array that is in state",
      copyOfQuotesArr
    );

    const mutateFetchedQuotes = copyOfQuotesArr.map(quote =>
      quote.id === id ? { ...quote, numLike: false } : quote
    );
    console.log(
      "this is a copy quotes array that is in state",
      mutateFetchedQuotes
    );
    this.setState({ quotes: mutateFetchedQuotes });
      //Works!
  };

  render() {
    const { fetching, quotes } = this.state;

    return (
      <Fragment>
        <h1 style={{ textAlign: "center" }}>QuoteSearcher.</h1>
        {fetching && <p>Loading...</p>}
        <section id="center-quotes">
          {!fetching && this.showQuotes(quotes)}
        </section>
      </Fragment>
    );
  }
}

export default QuoteSearcher;
