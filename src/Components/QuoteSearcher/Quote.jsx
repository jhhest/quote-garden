import React, { Component, Fragment } from "react";

export class Quote extends Component {
  render() {
    return (
      <Fragment>
        <blockquote
          style={{
            backgroundColor: "lightblue",
            margin: "2rem",
            padding: "1rem"
          }}
        >
          <p style={{ marginTop: "0px" }}>{this.props.text}</p>
          <footer>
            By: <em>{this.props.author}</em>
          </footer>
        </blockquote>
      </Fragment>
    );
  }
}

export default Quote;
