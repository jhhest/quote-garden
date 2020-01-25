import React, { Component, Fragment } from "react";

export class Quote extends Component {
// TODO: implement propTypes

  likeColor = input => {
    if (input === true) {
      return "like";
    }
    if (input === false) {
      return "dislike";
    }
    return "neutral";
  };

  render() {
    const { author, text, numLike, setLike, setDislike } = this.props;
      return (
      <Fragment>
        <blockquote className={this.likeColor(numLike)}>
          <p>{text}</p>
          <footer>
            <section style={{ marginTop: "1rem" }}>
              By: <em>{author}</em>
            </section>
            <section style={{ marginTop: "1rem" }}>
              <button onClick={setLike}>
                <i className="fa fa-thumbs-up"></i>
              </button>
              <button onClick={setDislike}>
                <i className="fa fa-thumbs-down"></i>
              </button>
            </section>
          </footer>
        </blockquote>
      </Fragment>
    );
  }
}

export default Quote;
