import React, { Component, Fragment } from "react";

export class Quote extends Component {
  state = {
    like: null
  };
  likeButton = () => {
    return null;
  };

  dislikeButton = () => {
    return null;
  };

  componentDidMount() {}

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
    const { like } = this.state;
    return (
      <Fragment>
        <blockquote className={this.likeColor(like)}>
          <p>{this.props.text}</p>
          <footer>
            <section>
              By: <em>{this.props.author}</em>
            </section>
            <section style={{ marginTop: "1em" }}>
              <button onClick={() => {this.setState({like: true})}}>
                <i className="fa fa-thumbs-up"></i>
              </button>
              <button onClick={() => {this.setState({like: false})}}>
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
