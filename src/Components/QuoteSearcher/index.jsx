import React, { Component, Fragment } from "react";
import Quote from "./Quote";

export class QuoteSearcher extends Component {
  state = {
    quotes: [
      {
        _id: "5d91b45d9980192a317c8acc",
        quoteText:
          "Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind.",
        quoteAuthor: "Bruce Lee"
      },
      {
        _id: "5d91b45d9980192a317c8abe",
        quoteText:
          "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
        quoteAuthor: "Abraham Lincoln"
      },
      {
        _id: "5d91b45d9980192a317c8955",
        quoteText:
          "Good timber does not grow with ease; the stronger the wind, the stronger the trees.",
        quoteAuthor: "J. Willard Marriott"
      }
    ]
  };

  render() {
    return (
      <Fragment>
        <h1>QuoteSearcher.</h1>
        <Quote
          quote="Empty your mind. Be formless, shapeless, like water. If you put water in a cup, it becomes the cup. You put water in a bottle, it becomes the bottle. You put it in a teapot, it becomes the teapot. Water can flow or it can crash. Be water, my friend."
          author="Bruce Lee"
        />
      </Fragment>
    );
  }
}

export default QuoteSearcher;
