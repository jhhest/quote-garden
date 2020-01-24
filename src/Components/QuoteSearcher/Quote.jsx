import React, { Component, Fragment } from "react";

export class Quote extends Component {
  render() {
    return (
      <Fragment>
        <blockquote>
          <p>{this.props.text}</p>
          <footer>
            By: <em>{this.props.author}</em> <button><i class="fa fa-thumbs-up"></i></button><button><i class="fa fa-thumbs-down"></i></button>
          </footer>
        </blockquote>
      </Fragment>
    );
  }
}

export default Quote;
