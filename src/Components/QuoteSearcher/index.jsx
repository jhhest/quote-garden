import React, { Component, Fragment } from "react";
import Quote from "./Quote";

export class QuoteSearcher extends Component {
  state = {
    fetching: false,
    quotes: [],
    searchValue: "",
    initialStart: "Yes"
  };

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

  handleChange = event => this.setState({ searchValue: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ fetching: true }, () => {
      this.searchQuote(this.state.searchValue);
    });
  };

  searchQuote = keyword => {
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${keyword}`)
      .then(resolve => resolve.json())
      .then(fetchedQuotes => {
        const tempArr = JSON.parse(JSON.stringify(fetchedQuotes.results));
        console.log("tempArr", tempArr);
        tempArr.reduce((acc, cv) => {
          console.log("acc boolean:", acc.some(element => element.quoteText !== cv.quoteText))
          console.log("cv.quotetext:",cv.quoteText);
          console.log("acc is:", acc)
          console.log("cv is", cv);
          
          if (acc.some(element => element.quoteText !== cv.quoteText)) {
            return [...acc, cv];
          }
          return acc;
        }, []);
        console.log("this is the tempArr:", tempArr);
        this.setState({
          quotes: fetchedQuotes.results.map(quote => {
            return {
              id: quote._id,
              quoteAuthor: quote.quoteAuthor,
              quoteText: quote.quoteText,
              numLike: null
            };
          }),
          fetching: false,
          error: false,
          initialStart: "No"
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true, initialStart: "No" });
      });
  };

  evaluateInput = () => {
    const { error, searchValue, quotes, initialStart } = this.state;
    if (error === true && searchValue === "") {
      return "Please fill in a keyword in the searchbar and press the searchbutton";
    }
    if (error === false && quotes === []) {
      return (
        <p>
          Your keyword to search for quotes is {searchValue}. We did not found
          any results. Please try again with another Keyword
        </p>
      );
    }
    if (initialStart !== "Yes") {
      return (
        <p>
          We found {quotes.length} result(s) with your keyword {searchValue}
        </p>
      );
    }
  };
  render() {
    const { fetching, quotes, searchValue } = this.state;
    return (
      <Fragment>
        <h1 style={{ textAlign: "center" }}>QuoteSearcher.</h1>
        <form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
          <input
            type="text"
            name="searchValue"
            placeholder="Search Quotes"
            onChange={this.handleChange}
            value={searchValue}
          />
          <input type="submit" value="search" />
        </form>
        {this.evaluateInput()}

        <p>
          Liked:<i className="fa fa-thumbs-up"></i>
          {quotes.filter(quote => quote.numLike === true).length}
        </p>
        <p>
          Disliked:<i className="fa fa-thumbs-down"></i>
          {quotes.filter(quote => quote.numLike === false).length}
        </p>
        <p>
          {" "}
          Total of not liked/disliked:{" "}
          {quotes.filter(quote => quote.numLike === null).length}
        </p>
        <p>
          Total of not liked/disliked:{" "}
          {quotes.filter(quote => !(quote.numLike === null)).length}
        </p>
        {fetching && <p>Loading...</p>}
        <section id="center-quotes">
          {!fetching && this.showQuotes(quotes)}
        </section>
      </Fragment>
    );
  }
}

export default QuoteSearcher;
