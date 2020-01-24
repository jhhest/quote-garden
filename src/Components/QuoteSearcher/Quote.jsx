import React, { Component, Fragment } from "react";

export class Quote extends Component {
  render() {
    return (
      <Fragment>
        <blockquote>
          <p>{this.props.text}</p>
          <footer>
            By: <em>{this.props.author}</em>
          </footer>
        </blockquote>
      </Fragment>
    );
  }
}

export default Quote;
